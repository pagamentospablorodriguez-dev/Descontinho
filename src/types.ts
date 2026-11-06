export type Store = 'Amazon' | 'Shopee' | 'Mercado Livre' | 'Magalu' | 'AliExpress';

export const STORES: Store[] = [
  'Amazon',
  'Shopee',
  'Mercado Livre',
  'Magalu',
  'AliExpress',
];

export const CATEGORIES = [
  'Todos',
  'Eletrônicos',
  'Casa',
  'Moda',
  'Beleza',
  'Games',
  'Acessórios',
  'Geral',
] as const;

export interface StoreColor {
  badge: string;
}

export const STORE_COLORS: Record<string, StoreColor> = {
  Amazon: { badge: 'bg-[#232f3e] text-[#ff9900]' },
  Shopee: { badge: 'bg-[#ee4d2d] text-white' },
  'Mercado Livre': { badge: 'bg-[#fff159] text-[#333]' },
  Magalu: { badge: 'bg-[#0086ff] text-white' },
  AliExpress: { badge: 'bg-[#e62e04] text-white' },
};

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  original_price: number;
  discount_percent: number;
  store: string;
  category: string;
  affiliate_url: string;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  created_at: string;
  // Campos de oferta dinâmica (opcionais — compatibilidade com dados antigos)
  source?: string;
  external_id?: string | null;
  permalink?: string | null;
  last_checked_at?: string | null;
  is_active?: boolean;
}
