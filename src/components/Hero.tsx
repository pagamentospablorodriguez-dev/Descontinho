import { ArrowRight, Clock3, Flame, Search, Sparkles, Tag, TrendingDown } from 'lucide-react';
import type { Product } from '@/types';

interface HeroProps {
  totalProducts: number;
  totalSavings: number;
  avgDiscount: number;
  topDeal: Product | null;
}

const brl = (value: number) => value.toFixed(2).replace('.', ',');

export function Hero({ totalProducts, totalSavings, avgDiscount, topDeal }: HeroProps) {
  const maxDiscount = topDeal ? Math.round(topDeal.discount_percent) : 60;

  return (
    <section id="topo" className="brand-hero relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-[#f6c900]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-12 h-96 w-96 rounded-full bg-[#ef7d00]/20 blur-3xl" />
      <div className="brand-pattern pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f6c900]/35 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#ffe36a] backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Pechincha boa é compartilhada
          </div>

          <h1 className="mb-5 text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.4rem]">
            Só as melhores
            <span className="block text-[#f6c900]">pechinchas do Brasil.</span>
          </h1>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-emerald-50/85 sm:text-lg">
            A gente garimpa Amazon, Shopee, Mercado Livre e outras lojas para você comprar bem, pagar menos e ainda mandar a descoberta no grupo da família.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#ofertas" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#f6c900] px-5 py-3.5 text-sm font-extrabold text-[#174b39] shadow-[0_10px_24px_rgba(246,201,0,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#ffda21] active:translate-y-0">
              Ver ofertas de hoje
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#sobre" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-extrabold text-white backdrop-blur-sm transition-all hover:bg-white/15">
              Como funciona
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-emerald-50/80">
            <span className="flex items-center gap-2"><Tag className="h-4 w-4 text-[#f6c900]" /><strong className="text-white">{totalProducts}</strong> ofertas ativas</span>
            <span className="flex items-center gap-2"><Flame className="h-4 w-4 text-[#ef7d00]" /><strong className="text-white">até {maxDiscount}%</strong> OFF</span>
            <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#f6c900]" /><strong className="text-white">R$ {totalSavings.toFixed(0)}</strong> em economia</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[430px] lg:ml-auto">
          <div className="absolute -inset-5 rounded-[2rem] bg-[#f6c900]/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
            <div className="rounded-[1.45rem] bg-[#fffdf7] p-5 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/assets/branding/image.png" alt="" className="h-9 w-9 object-contain" />
                  <div>
                    <p className="text-xs font-extrabold text-[#075b3b]">Descontinho.pro</p>
                    <p className="text-[10px] font-semibold text-[#ef7d00]">garimpo do dia</p>
                  </div>
                </div>
                <span className="relative flex items-center gap-1.5 rounded-full bg-[#e8f3e4] px-2.5 py-1 text-[10px] font-extrabold text-[#075b3b]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef7d00] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ef7d00]" />
                  </span>
                  AO VIVO
                </span>
              </div>

              {topDeal ? (
                <a href={topDeal.affiliate_url} target="_blank" rel="noopener noreferrer sponsored" className="group block rounded-2xl bg-gradient-to-br from-[#e8f3e4] via-[#f5fae7] to-[#fff0d8] p-5 transition-transform hover:-translate-y-0.5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#ef7d00]">Maior desconto agora</p>
                      <p className="mt-1 line-clamp-1 text-base font-extrabold tracking-tight text-[#075b3b]">{topDeal.name}</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#ef7d00] px-2.5 py-1 text-xs font-extrabold text-white shadow-md">
                      <TrendingDown className="h-3 w-3" />-{maxDiscount}%
                    </span>
                  </div>
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <span className="block text-xs text-[#9aa59d] line-through">R$ {brl(topDeal.original_price)}</span>
                      <span className="text-2xl font-extrabold tracking-tight text-[#075b3b]">R$ {brl(topDeal.price)}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-[#075b3b] px-3 py-1.5 text-xs font-extrabold text-white transition-colors group-hover:bg-[#064b31]">
                      Pegar <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#075b3b]/10">
                    <div className="h-full rounded-full bg-[#ef7d00]" style={{ width: `${Math.min(maxDiscount, 100)}%` }} />
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#e8f3e4] via-[#f5fae7] to-[#fff0d8] p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6c900] text-[#075b3b] shadow-md">
                    <Search className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#ef7d00]">Garimpando agora</p>
                    <p className="mt-1 text-sm font-extrabold text-[#075b3b]">As melhores ofertas tão chegando...</p>
                  </div>
                </div>
              )}

              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-[#075b3b] px-2 py-3 text-white"><strong className="block text-lg">{totalProducts}</strong><span className="text-[10px] text-emerald-100">ofertas</span></div>
                <div className="rounded-xl bg-[#f6c900] px-2 py-3 text-[#174b39]"><strong className="block text-lg">{avgDiscount.toFixed(0)}%</strong><span className="text-[10px]">desc. médio</span></div>
                <div className="rounded-xl bg-[#ef7d00] px-2 py-3 text-white"><strong className="block text-lg">R$ {totalSavings.toFixed(0)}</strong><span className="text-[10px]">economia</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-12 bg-[#fffdf7]" style={{ clipPath: 'ellipse(75% 100% at 50% 100%)' }} />
    </section>
  );
}
