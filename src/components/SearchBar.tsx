import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Flame, TrendingDown, Clock } from 'lucide-react';
import { CATEGORIES, STORES } from '@/types';
import type { Store } from '@/types';

export type SortOption = 'biggest_discount' | 'lowest_price' | 'highest_discount' | 'newest';

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  category: string;
  onCategoryChange: (c: string) => void;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  storeFilter: Store | 'all';
  onStoreChange: (s: Store | 'all') => void;
}

const SORT_LABELS: Record<SortOption, string> = {
  biggest_discount: 'Maior desconto',
  lowest_price: 'Menor preço',
  highest_discount: 'Maior % OFF',
  newest: 'Chegou agora',
};

export function SearchBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  storeFilter,
  onStoreChange,
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    const t = setTimeout(() => onQueryChange(localQuery), 250);
    return () => clearTimeout(t);
  }, [localQuery, onQueryChange]);

  return (
    <div id="categorias" className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Buscar oferta... ex: fone, tênis, cafeteira"
            className="w-full rounded-2xl border-2 border-[#e5e9dc] bg-white py-3.5 pl-12 pr-4 text-sm font-medium text-[#174b39] shadow-sm transition-all placeholder:text-[#89968d] focus:border-[#075b3b] focus:outline-none focus:ring-4 focus:ring-[#075b3b]/10"
          />
          {localQuery && (
            <button
              onClick={() => setLocalQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none rounded-2xl border-2 border-[#e5e9dc] bg-white py-3.5 pl-4 pr-10 text-sm font-medium text-[#174b39] shadow-sm transition-all focus:border-[#075b3b] focus:outline-none focus:ring-4 focus:ring-[#075b3b]/10"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
              <option key={key} value={key}>{SORT_LABELS[key]}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-5 py-3.5 text-sm font-semibold transition-all ${
            showFilters || storeFilter !== 'all'
              ? 'border-[#075b3b] bg-[#e8f3e4] text-[#075b3b]'
              : 'border-[#e5e9dc] bg-white text-[#174b39] hover:border-[#b9d7ad]'
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Lojas
        </button>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
              category === cat
                ? 'bg-[#075b3b] text-white shadow-md'
                : 'bg-white text-[#174b39] ring-1 ring-[#e5e9dc] hover:bg-[#f1f6eb]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Store filters */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-gray-50 p-3 ring-1 ring-gray-200">
          <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Filtrar por loja:</span>
          <button
            onClick={() => onStoreChange('all')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
              storeFilter === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
            }`}
          >
            Todas
          </button>
          {STORES.map((store) => (
            <button
              key={store}
              onClick={() => onStoreChange(store)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                storeFilter === store
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
              }`}
            >
              {store}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
