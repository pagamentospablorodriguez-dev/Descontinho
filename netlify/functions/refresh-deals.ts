// Função agendada que garimpa ofertas reais do Mercado Livre (API pública),
// converte cada link em link de afiliado, calcula o desconto, salva no banco
// e desativa ofertas que expiraram (o preço voltou ao normal ou o item sumiu).
//
// Roda automaticamente a cada 6h (Netlify Scheduled Functions) e também pode
// ser chamada manualmente: POST /api/refresh-deals

import { createClient } from '@supabase/supabase-js';
import { buildAffiliateUrl } from '../lib/affiliate';

// Agenda: a cada 6 horas (cron UTC)
export const schedule = '0 */6 * * *';

interface MLItem {
  id: string;
  title: string;
  price: number;
  original_price: number | null;
  permalink: string;
  thumbnail: string;
  sold_quantity?: number;
  available_quantity?: number;
  shipping?: { free_shipping?: boolean };
}

interface MLItemWithCat extends MLItem {
  category: string;
}

const QUERIES: { q: string; category: string }[] = [
  { q: 'fone bluetooth', category: 'Eletrônicos' },
  { q: 'smartphone', category: 'Eletrônicos' },
  { q: 'smartwatch', category: 'Eletrônicos' },
  { q: 'caixa de som bluetooth', category: 'Eletrônicos' },
  { q: 'notebook', category: 'Eletrônicos' },
  { q: 'tênis esportivo', category: 'Moda' },
  { q: 'mochila notebook', category: 'Acessórios' },
  { q: 'liquidificador', category: 'Casa' },
  { q: 'cafeteira', category: 'Casa' },
  { q: 'panela antiaderente', category: 'Casa' },
  { q: 'serum vitamina c', category: 'Beleza' },
  { q: 'controle xbox', category: 'Games' },
  { q: 'teclado gamer', category: 'Games' },
  { q: 'geladeira', category: 'Casa' },
  { q: 'air fryer', category: 'Casa' },
  { q: 'aspirador robô', category: 'Casa' },
];

async function fetchMLDeals(q: string, category: string): Promise<MLItemWithCat[]> {
  const url = new URL('https://api.mercadolibre.com/sites/MLB/search');
  url.searchParams.set('q', q);
  url.searchParams.set('limit', '50');
  url.searchParams.set('condition', 'new');

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { results?: MLItem[] };
    return (json.results ?? [])
      .filter(
        (i) =>
          i.original_price != null &&
          i.original_price > i.price &&
          i.available_quantity !== 0
      )
      .map((i) => ({ ...i, category }));
  } catch {
    return [];
  }
}

function upgradeThumb(thumb: string): string {
  return thumb
    .replace('http://', 'https://')
    .replace('-I.jpg', '-F.jpg')
    .replace('-I.webp', '-F.webp');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // 1. Buscar ofertas em paralelo em várias categorias
    const results = await Promise.all(
      QUERIES.map((q) => fetchMLDeals(q.q, q.category))
    );
    const allItems = results.flat();

    // 2. Dedup por ID (mesmo item pode aparecer em buscas diferentes)
    const byId = new Map<string, MLItemWithCat>();
    for (const item of allItems) {
      if (!byId.has(item.id)) byId.set(item.id, item);
    }

    // 3. Ranquear por % de desconto, só fica quem tem >= 20% OFF
    const ranked = [...byId.values()]
      .map((item) => ({
        item,
        pct: ((item.original_price! - item.price) / item.original_price!) * 100,
      }))
      .filter((x) => x.pct >= 20)
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 60);

    const seenIds = new Set<string>();
    const now = new Date().toISOString();

    const rows = ranked.map(({ item, pct }, idx) => {
      const store = 'Mercado Livre';
      seenIds.add(item.id);
      return {
        name: item.title,
        description: item.shipping?.free_shipping
          ? 'Frete grátis. Oferta real do Mercado Livre, preço abaixo do mercado.'
          : 'Oferta real do Mercado Livre, preço abaixo do mercado.',
        image_url: upgradeThumb(item.thumbnail),
        price: Number(item.price.toFixed(2)),
        original_price: Number(item.original_price!.toFixed(2)),
        discount_percent: Number(pct.toFixed(2)),
        store,
        category: item.category,
        affiliate_url: buildAffiliateUrl(store, item.permalink),
        permalink: item.permalink,
        rating: 4.5,
        reviews_count: item.sold_quantity ?? 0,
        is_featured: idx < 10,
        source: 'mercadolivre',
        external_id: item.id,
        last_checked_at: now,
        is_active: true,
      };
    });

    // 4. Upsert (atualiza se já existe, cria se é novo)
    if (rows.length > 0) {
      const { error } = await supabase
        .from('products')
        .upsert(rows, { onConflict: 'source,external_id' });
      if (error) throw error;
    }

    // 5. Desativar ofertas do ML que não apareceram nesta rodada (expiraram)
    const { data: mlActive } = await supabase
      .from('products')
      .select('id, external_id')
      .eq('source', 'mercadolivre')
      .eq('is_active', true);

    const toDeactivate = (mlActive ?? []).filter(
      (p) => p.external_id && !seenIds.has(p.external_id)
    );

    if (toDeactivate.length > 0) {
      await supabase
        .from('products')
        .update({ is_active: false, last_checked_at: now, is_featured: false })
        .in('id', toDeactivate.map((p) => p.id));
    }

    return new Response(
      JSON.stringify({
        refreshed: rows.length,
        deactivated: toDeactivate.length,
        at: now,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};
