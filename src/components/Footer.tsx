import { useState, type FormEvent } from 'react';
import { Heart, Instagram, Mail, Send, ShieldCheck, Tag, TrendingDown } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="mt-20 bg-[#063e2d] text-emerald-100/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 overflow-hidden rounded-[1.75rem] bg-[#f6c900] p-7 text-[#174b39] shadow-[0_15px_40px_rgba(7,91,59,0.18)] sm:p-10">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-xl"><p className="mb-2 text-xs font-extrabold uppercase tracking-[0.15em] text-[#ef7d00]">Clube da pechincha</p><h3 className="mb-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Receba só o que vale a pena.</h3><p className="text-sm font-semibold text-[#174b39]/75">Ofertas boas, preço baixo e zero spam. A gente manda o garimpo e você decide.</p></div>
            {subscribed ? <div className="flex w-full max-w-md items-center gap-3 rounded-xl bg-white/80 px-5 py-4 text-sm font-extrabold text-[#075b3b]"><Heart className="h-5 w-5 fill-[#ef7d00] text-[#ef7d00]" /> Você entrou para o clube da pechincha.</div> : <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2"><div className="relative flex-1"><Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#075b3b]/45" /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="seu@email.com" aria-label="Seu email" className="w-full rounded-xl border-2 border-transparent bg-white py-3.5 pl-12 pr-4 text-sm font-semibold text-[#174b39] shadow-sm placeholder:text-[#6d786f] focus:border-[#075b3b] focus:outline-none" /></div><button type="submit" className="flex items-center gap-1.5 rounded-xl bg-[#075b3b] px-5 py-3.5 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#064b31] active:scale-95">Entrar <Send className="h-4 w-4" /></button></form>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1"><div className="mb-4 flex items-center gap-2"><img src="/assets/branding/image.png" alt="" className="h-10 w-10 object-contain" /><span className="text-xl font-extrabold tracking-tight text-white">Descontinho<span className="text-[#f6c900]">.pro</span></span></div><p className="max-w-xs text-sm leading-relaxed">A cara do povo, o preço que cabe no bolso. As melhores pechinchas do Brasil em um só lugar.</p></div>
          <div><h4 className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#f6c900]">Categorias</h4><ul className="space-y-2 text-sm"><li><a href="#ofertas" className="transition-colors hover:text-white">Eletrônicos</a></li><li><a href="#ofertas" className="transition-colors hover:text-white">Casa</a></li><li><a href="#ofertas" className="transition-colors hover:text-white">Moda</a></li><li><a href="#ofertas" className="transition-colors hover:text-white">Beleza</a></li></ul></div>
          <div><h4 className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#f6c900]">Confiança</h4><ul className="space-y-3 text-sm"><li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#f6c900]" />Lojas verificadas</li><li className="flex items-center gap-2"><TrendingDown className="h-4 w-4 text-[#f6c900]" />Preços comparados</li><li className="flex items-center gap-2"><Heart className="h-4 w-4 text-[#f6c900]" />Feito pro Brasil</li></ul></div>
          <div><h4 className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#f6c900]">Siga o garimpo</h4><p className="mb-4 max-w-[15rem] text-sm leading-relaxed">Desconto bom não fica escondido. Compartilhe com quem também ama economizar.</p><div className="flex gap-2"><a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-[#ef7d00]"><Instagram className="h-4 w-4" /></a><a href="#" aria-label="Telegram" className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-[#ef7d00]"><Send className="h-4 w-4" /></a><a href="#" aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-[#ef7d00]"><Mail className="h-4 w-4" /></a></div></div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left"><p className="text-xs text-emerald-100/45">© {new Date().getFullYear()} Descontinho.pro. Preços sujeitos a confirmação nas lojas.</p><div className="flex items-center gap-2 text-xs font-semibold text-emerald-100/55"><Tag className="h-3.5 w-3.5" />Só as melhores pechinchas do Brasil</div></div>
      </div>
    </footer>
  );
}
