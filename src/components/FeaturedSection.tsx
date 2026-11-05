import { Flame, Sparkles } from 'lucide-react';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface FeaturedSectionProps {
  products: Product[];
  favorites: Set<string>;
  onToggleFavorite: (productId: string) => void;
}

export function FeaturedSection({ products, favorites, onToggleFavorite }: FeaturedSectionProps) {
  if (products.length === 0) return null;
  const visible = products.slice(0, 10);

  return (
    <section id="destaques" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ef7d00] to-[#d46500] shadow-[0_8px_20px_rgba(239,125,0,0.3)]">
            <Flame className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#174b39] sm:text-3xl">Ofertas bombando</h2>
            <p className="text-sm text-[#6d786f]">As pechinchas que tão saindo mais agora</p>
          </div>
        </div>
        <div className="hidden items-center gap-1.5 rounded-full bg-[#fff0d8] px-3 py-1.5 text-xs font-extrabold text-[#ef7d00] sm:flex">
          <Sparkles className="h-3.5 w-3.5" />
          {visible.length} em destaque
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {visible.map((product, index) => (
          <ProductCard key={product.id} product={product} isFavorite={favorites.has(product.id)} onToggleFavorite={onToggleFavorite} index={index} />
        ))}
      </div>
    </section>
  );
}
