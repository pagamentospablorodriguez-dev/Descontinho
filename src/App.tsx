import { useState, useEffect, useMemo, useCallback } from 'react';
import { PackageOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { FALLBACK_PRODUCTS } from '@/fallbackData';
import type { Product, Store } from '@/types';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { SearchBar } from '@/components/SearchBar';
import type { SortOption } from '@/components/SearchBar';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { FeaturedSection } from '@/components/FeaturedSection';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  // Filters
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [sort, setSort] = useState<SortOption>('biggest_discount');
  const [storeFilter, setStoreFilter] = useState<Store | 'all'>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Fetch products from Supabase; fall back to local data on error.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('is_featured', { ascending: false });

        if (cancelled) return;

        if (error || !data || data.length === 0) {
          setProducts(FALLBACK_PRODUCTS);
          setUsingFallback(true);
        } else {
          setProducts(data as Product[]);
          setUsingFallback(false);
        }
      } catch {
        if (cancelled) return;
        setProducts(FALLBACK_PRODUCTS);
        setUsingFallback(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleQueryChange = useCallback((q: string) => setQuery(q), []);

  // Filter + sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== 'Todos') {
      result = result.filter((p) => p.category === category);
    }

    // Store
    if (storeFilter !== 'all') {
      result = result.filter((p) => p.store === storeFilter);
    }

    // Sort
    switch (sort) {
      case 'biggest_discount':
        result.sort((a, b) => b.original_price - b.price - (a.original_price - a.price));
        break;
      case 'lowest_price':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'highest_discount':
        result.sort((a, b) => b.discount_percent - a.discount_percent);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return result;
  }, [products, query, category, storeFilter, sort]);

  const featuredProducts = useMemo(
    () => products.filter((p) => p.is_featured),
    [products]
  );

  const topDeal = useMemo<Product | null>(() => {
    if (products.length === 0) return null;
    return [...products].sort(
      (a, b) => b.discount_percent - a.discount_percent
    )[0];
  }, [products]);

  const stats = useMemo(() => {
    const totalSavings = products.reduce(
      (sum, p) => sum + (p.original_price - p.price),
      0
    );
    const avgDiscount =
      products.length > 0
        ? products.reduce((sum, p) => sum + p.discount_percent, 0) / products.length
        : 0;
    const storeCount = new Set(products.map((p) => p.store)).size;
    return {
      totalProducts: products.length,
      totalSavings,
      avgDiscount,
      storeCount,
    };
  }, [products]);

  const scrollToOffers = () => {
    document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      <ScrollProgress />
      <Header onSearchClick={scrollToOffers} favoritesCount={favorites.size} />

      <Hero
        totalProducts={stats.totalProducts}
        totalSavings={stats.totalSavings}
        avgDiscount={stats.avgDiscount}
        topDeal={topDeal}
      />

      <main>
    

        {/* How it works */}
        <HowItWorks />

        {/* Featured */}
        {!loading && featuredProducts.length > 0 && (
          <FeaturedSection products={featuredProducts} favorites={favorites} onToggleFavorite={toggleFavorite} />
        )}

        {/* All offers with search/filter */}
        <section id="ofertas" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="mb-1 text-2xl font-extrabold tracking-tight text-[#174b39] sm:text-3xl">
              Todas as ofertas
            </h2>
            <p className="text-sm text-gray-500">
              {loading
                ? 'Carregando as pechinchas...'
                : `${filteredProducts.length} produto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="mb-6">
            <SearchBar
              query={query}
              onQueryChange={handleQueryChange}
              category={category}
              onCategoryChange={setCategory}
              sort={sort}
              onSortChange={setSort}
              storeFilter={storeFilter}
              onStoreChange={setStoreFilter}
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 text-center shadow-sm ring-1 ring-gray-900/5">
              <PackageOpen className="h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-bold text-gray-900">Nada encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">
                Tenta outra busca ou muda os filtros. Tem pechincha nova todo dia!
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setCategory('Todos');
                  setStoreFilter('all');
                }}
                className="mt-4 rounded-xl bg-[#075b3b] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#064b31]"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} isFavorite={favorites.has(product.id)} onToggleFavorite={toggleFavorite} index={index} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {usingFallback && !loading && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900/90 px-4 py-2 text-xs font-medium text-gray-300 shadow-lg backdrop-blur-sm">
          Mostrando ofertas de demonstração
        </div>
      )}
    </div>
  );
}
