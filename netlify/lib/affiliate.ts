// Helpers de link de afiliado — converte URL original em URL com tracking.
// Cada loja usa um parâmetro diferente; nenhum precisa de API.

export const AFFILIATE_IDS = {
  amazon: 'desconti0a25f-20',
  mercadolivre: 'pr20261105220322896',
  shopee: '18326220848',
} as const;

// Tool ID do Mercado Livre Afiliados (placement fixo — identifica o site Descontinho).
const ML_MATT_TOOL = '36185642';

export function normalizeStore(store: string): string {
  const s = store.toLowerCase().trim();
  if (s === 'amazon') return 'Amazon';
  if (s === 'mercado livre' || s === 'mercadolivre' || s === 'mercadolibre') return 'Mercado Livre';
  if (s === 'shopee') return 'Shopee';
  if (s === 'magalu' || s === 'magazine luiza') return 'Magalu';
  if (s === 'aliexpress') return 'AliExpress';
  return store;
}

/**
 * Recebe a loja + a URL original do produto e devolve a URL com o tag de afiliado.
 * - Amazon:      ?tag=desconti0a25f-20  (funciona em qualquer URL da Amazon, sem API)
 * - Mercado Livre: ?matt_word=...&matt_tool=...  (afiliação manual do ML, sem OAuth)
 * - Shopee:      ?af_id=...  (afiliação manual da Shopee)
 */
export function buildAffiliateUrl(store: string, permalink: string): string {
  try {
    const normalized = normalizeStore(store);
    const url = new URL(permalink);

    switch (normalized) {
      case 'Amazon': {
        url.searchParams.set('tag', AFFILIATE_IDS.amazon);
        url.searchParams.set('linkCode', 'll1');
        url.searchParams.set('language', 'pt_BR');
        return url.toString();
      }
      case 'Mercado Livre': {
        url.searchParams.set('matt_word', AFFILIATE_IDS.mercadolivre);
        url.searchParams.set('matt_tool', ML_MATT_TOOL);
        url.searchParams.set('forceInApp', 'true');
        return url.toString();
      }
      case 'Shopee': {
        url.searchParams.set('af_id', AFFILIATE_IDS.shopee);
        return url.toString();
      }
      default:
        return permalink;
    }
  } catch {
    return permalink;
  }
}
