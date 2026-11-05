export type Store = 'Amazon' | 'Shopee' | 'Mercado Livre' | 'Magalu' | 'AliExpress';

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  original_price: number;
  discount_percent: number;
  store: Store;
  category: string;
  affiliate_url: string;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  created_at: string;
}

export const CATEGORIES = [
  'Todos',
  'Eletrônicos',
  'Casa',
  'Moda',
  'Beleza',
  'Games',
  'Acessórios',
] as const;

export const STORES: Store[] = [
  'Amazon',
  'Shopee',
  'Mercado Livre',
  'Magalu',
  'AliExpress',
];

export const STORE_COLORS: Record<Store, { bg: string; text: string; badge: string }> = {
  Amazon: { bg: 'bg-[#232F3E]', text: 'text-[#FF9900]', badge: 'bg-[#232F3E] text-[#FF9900]' },
  Shopee: { bg: 'bg-[#EE4D2D]', text: 'text-[#EE4D2D]', badge: 'bg-[#EE4D2D] text-white' },
  'Mercado Livre': { bg: 'bg-[#FFE600]', text: 'text-[#FFE600]', badge: 'bg-[#FFE600] text-[#2D3277]' },
  Magalu: { bg: 'bg-[#0086FF]', text: 'text-[#0086FF]', badge: 'bg-[#0086FF] text-white' },
  AliExpress: { bg: 'bg-[#FF4747]', text: 'text-[#FF4747]', badge: 'bg-[#FF4747] text-white' },
};
