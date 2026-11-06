// Cliente da API de ofertas — busca das Netlify Functions ao invés do banco direto.
// Em desenvolvimento (sem Netlify), cai pro fallback local automaticamente.

import type { Product } from '@/types';
import { FALLBACK_PRODUCTS } from '@/fallbackData';

const API_URL = import.meta.env.VITE_DEALS_API_URL ?? '/api/deals';

export interface DealsResponse {
  products: Product[];
  source: 'api' | 'fallback';
}

export async function fetchDeals(): Promise<DealsResponse> {
  try {
    const res = await fetch(API_URL, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) throw new Error(`API ${res.status}`);

    const data = (await res.json()) as Product[];

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Sem ofertas na resposta');
    }

    return { products: data, source: 'api' };
  } catch {
    return { products: FALLBACK_PRODUCTS, source: 'fallback' };
  }
}

// Atualiza ofertas manualmente (chama a function de refresh).
// Útil pra um botão "Garimpar agora" opcional no admin.
export async function refreshDeals(): Promise<{ refreshed: number; deactivated: number } | null> {
  try {
    const res = await fetch('/api/refresh-deals', { method: 'POST' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
