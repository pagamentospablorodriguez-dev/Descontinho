import { Check, ExternalLink, Heart, Share2, Star, TrendingDown, Zap } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';
import { STORE_COLORS } from '@/types';

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
  index?: number;
}

export function ProductCard({ product, isFavorite = false, onToggleFavorite, index = 0 }: ProductCardProps) {
  const storeColors = STORE_COLORS[product.store] ?? { badge: 'bg-gray-700 text-white' };
  const savings = product.original_price - product.price;
  const isHotDeal = product.discount_percent >= 50;
  const [shared, setShared] = useState(false);

  const shareDeal = async () => {
    const shareData = { title: product.name, text: `Olha essa pechincha: ${product.name} por R$ ${product.price.toFixed(2).replace('.', ',')}`, url: product.affiliate_url };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(product.affiliate_url);
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    } catch {
      setShared(false);
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[1.35rem] border border-[#e6e8dd] bg-[#fffdf7] shadow-[0_8px_24px_rgba(7,91,59,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b9d7ad] hover:shadow-[0_18px_40px_rgba(7,91,59,0.13)] animate-slide-up" style={{ animationDelay: `${Math.min(index * 50, 600)}ms`, animationFillMode: 'both' }}>
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        <span className="flex items-center gap-1 rounded-full bg-[#075b3b] px-2.5 py-1 text-xs font-extrabold text-white shadow-md"><TrendingDown className="h-3 w-3" />-{product.discount_percent.toFixed(0)}%</span>
        {isHotDeal && <span className="flex items-center gap-1 rounded-full bg-[#ef7d00] px-2.5 py-1 text-[10px] font-extrabold text-white shadow-md"><Zap className="h-3 w-3 fill-white" />OFERTA</span>}
      </div>
      <div className="absolute right-3 top-3 z-10 flex gap-1.5">
        <button type="button" aria-label={shared ? 'Oferta compartilhada' : `Compartilhar ${product.name}`} onClick={shareDeal} className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md backdrop-blur transition-all active:scale-90 ${shared ? 'bg-[#e8f3e4] text-[#075b3b]' : 'bg-white/90 text-[#075b3b] hover:bg-[#f6c900] hover:text-[#174b39]'}`}>
          {shared ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        </button>
        <button type="button" aria-label={isFavorite ? `Remover ${product.name} dos favoritos` : `Salvar ${product.name}`} aria-pressed={isFavorite} onClick={() => onToggleFavorite?.(product.id)} className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md backdrop-blur transition-all active:scale-90 ${isFavorite ? 'bg-[#f6c900] text-[#174b39]' : 'bg-white/90 text-[#075b3b] hover:bg-[#f6c900] hover:text-[#174b39]'}`}>
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="relative aspect-square overflow-hidden bg-[#f0f4e9]">
        <img src={product.image_url} alt={product.name} loading="lazy" className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute bottom-3 right-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow-md ${storeColors.badge}`}>{product.store}</span></div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-1.5"><div className="flex items-center">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`h-3.5 w-3.5 ${star <= Math.round(product.rating) ? 'fill-[#f6c900] text-[#f6c900]' : 'fill-[#e5e8dd] text-[#e5e8dd]'}`} />)}</div><span className="text-[11px] font-bold text-[#6d786f]">{product.rating.toFixed(1)} ({product.reviews_count.toLocaleString('pt-BR')})</span></div>
        <h3 className="mb-1 line-clamp-2 text-sm font-extrabold leading-snug text-[#174b39]">{product.name}</h3>
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-[#6d786f]">{product.description}</p>
        <div className="mt-auto">
          <span className="mb-0.5 block text-xs text-[#9aa59d] line-through">R$ {product.original_price.toFixed(2).replace('.', ',')}</span>
          <div className="mb-1 flex items-baseline gap-1 text-[#075b3b]"><span className="text-sm font-extrabold">R$</span><span className="text-2xl font-extrabold tracking-tight">{Math.floor(product.price)}</span><span className="text-base font-extrabold">,{product.price.toFixed(2).split('.')[1]}</span></div>
          <div className="mb-3 text-xs font-extrabold text-[#16864c]">Você economiza R$ {savings.toFixed(2).replace('.', ',')}</div>
          <a href={product.affiliate_url} target="_blank" rel="noopener noreferrer sponsored" className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#075b3b] px-4 py-2.5 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#064b31] hover:shadow-lg active:scale-95">Pegar desconto <ExternalLink className="h-3.5 w-3.5" /></a>
        </div>
      </div>
    </article>
  );
}
