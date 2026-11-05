import { Heart, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSearchClick?: () => void;
  favoritesCount?: number;
}

export function Header({ onSearchClick, favoritesCount = 0 }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#fffdf7]/95 backdrop-blur-xl">
      <div className="bg-[#075b3b] px-4 py-2 text-center text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#f6c900] sm:text-xs">
        Garimpo atualizado • preço baixo de verdade • compartilhe com a galera
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a href="#topo" className="group flex items-center gap-2.5" aria-label="Descontinho.pro início">
          <img
            src="/assets/branding/image.png"
            alt=""
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="text-[1.2rem] font-extrabold tracking-[-0.04em] text-[#075b3b] sm:text-[1.35rem]">
              Descontinho<span className="text-[#f6c900]">.pro</span>
            </span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#ef7d00]">
              só as melhores pechinchas
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          <a href="#ofertas" className="text-sm font-bold text-[#174b39] transition-colors hover:text-[#ef7d00]">Ofertas</a>
          <a href="#destaques" className="text-sm font-bold text-[#174b39] transition-colors hover:text-[#ef7d00]">Bombando</a>
          <a href="#categorias" className="text-sm font-bold text-[#174b39] transition-colors hover:text-[#ef7d00]">Categorias</a>
          <a href="#sobre" className="text-sm font-bold text-[#174b39] transition-colors hover:text-[#ef7d00]">Como funciona</a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#ofertas"
            className="relative hidden items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold text-[#075b3b] transition-colors hover:bg-[#e8f3e4] sm:flex"
            aria-label={`Favoritos: ${favoritesCount}`}
          >
            <Heart className={`h-5 w-5 ${favoritesCount > 0 ? 'fill-[#f6c900] text-[#f6c900]' : ''}`} />
            {favoritesCount > 0 && <span className="text-xs font-extrabold">{favoritesCount}</span>}
          </a>
          <button
            onClick={onSearchClick}
            aria-label="Buscar ofertas"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#075b3b] transition-colors hover:bg-[#e8f3e4] md:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
          <a
            href="#ofertas"
            className="hidden rounded-xl bg-[#075b3b] px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_6px_16px_rgba(7,91,59,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#064b31] active:translate-y-0 sm:block"
          >
            Quero desconto
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#075b3b] transition-colors hover:bg-[#e8f3e4] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-emerald-950/10 bg-[#fffdf7] px-4 py-3 md:hidden" aria-label="Menu mobile">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {[
              ['#ofertas', 'Ofertas'],
              ['#destaques', 'Ofertas bombando'],
              ['#categorias', 'Categorias'],
              ['#sobre', 'Como funciona'],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={closeMenu} className="rounded-xl px-3 py-3 text-sm font-bold text-[#174b39] transition-colors hover:bg-[#e8f3e4] hover:text-[#ef7d00]">
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
