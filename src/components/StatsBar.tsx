import { useEffect, useRef, useState } from 'react';
import { Flame, TrendingDown, Sparkles, Percent } from 'lucide-react';

interface StatsBarProps {
  totalProducts: number;
  avgDiscount: number;
  totalSavings: number;
  storeCount: number;
}

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

function StatCard({ icon: Icon, displayValue, label, color, bg }: {
  icon: typeof Flame;
  displayValue: string;
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg}`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div className="min-w-0">
        <div className="text-lg font-extrabold leading-tight text-gray-900 tabular-nums">{displayValue}</div>
        <div className="truncate text-xs font-medium text-gray-500">{label}</div>
      </div>
    </div>
  );
}

export function StatsBar({ totalProducts, avgDiscount, totalSavings, storeCount }: StatsBarProps) {
  const products = useCountUp(totalProducts);
  const discount = useCountUp(avgDiscount);
  const savings = useCountUp(totalSavings);
  const stores = useCountUp(storeCount);

  return (
    <div ref={products.ref} className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      <StatCard icon={TrendingDown} displayValue={`${Math.round(products.value)}`} label="Ofertas ativas" color="text-[#075b3b]" bg="bg-[#e8f3e4]" />
      <StatCard icon={Percent} displayValue={`${discount.value.toFixed(0)}%`} label="Desconto médio" color="text-[#ef7d00]" bg="bg-[#fff0d8]" />
      <div ref={savings.ref}>
        <StatCard icon={Flame} displayValue={`R$ ${savings.value.toFixed(0)}`} label="Economia total" color="text-[#d46500]" bg="bg-[#fff0d8]" />
      </div>
      <div ref={stores.ref}>
        <StatCard icon={Sparkles} displayValue={`${Math.round(stores.value)}`} label="Lojas comparadas" color="text-[#174b39]" bg="bg-[#e8f3e4]" />
      </div>
    </div>
  );
}
