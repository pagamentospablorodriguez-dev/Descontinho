import { Flame, Search, ShieldCheck, Share2 } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Vasculhamos tudo',
      desc: 'A gente reúne ofertas de Amazon, Shopee, Mercado Livre e outras lojas confiáveis em um só lugar.',
      color: 'bg-[#e8f3e4] text-[#075b3b]',
    },
    {
      icon: Flame,
      title: 'Só pechinchas',
      desc: 'Filtramos só o que tá realmente barato — descontos de verdade, abaixo do preço de mercado.',
      color: 'bg-[#fff0d8] text-[#ef7d00]',
    },
    {
      icon: ShieldCheck,
      title: 'Lojas confiáveis',
      desc: 'Todas as ofertas são de lojas verificadas. Você compra direto no site original com segurança.',
      color: 'bg-[#e8f3e4] text-[#174b39]',
    },
    {
      icon: Share2,
      title: 'Compartilha com a galera',
      desc: 'Achou uma oferta boa? Manda no grupo da família. Desconto bom todo mundo ama.',
      color: 'bg-yellow-50 text-[#b88700]',
    },
  ];

  return (
    <section id="sobre" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#174b39] sm:text-4xl">
          Como funciona
        </h2>
        <p className="text-base text-gray-500">
          Simples assim: a gente acha o desconto, você aproveita. Sem cadastro, sem complicação.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="group relative rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-900/5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-3 py-0.5 text-xs font-bold text-white">
                {idx + 1}
              </div>
              <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${step.color}`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-base font-bold text-gray-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
