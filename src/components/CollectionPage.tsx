import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  X, 
  ArrowRight,
  Heart,
  Eye,
  Check
} from 'lucide-react';
import { products, Product } from '../data/products';

interface CollectionPageProps {
  t: any;
  initialCollection?: string;
  onNavigate: (view: string, params?: any) => void;
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => (
  <label 
    onClick={(e) => {
      e.preventDefault();
      onChange();
    }}
    className="flex items-center gap-3 cursor-pointer group"
  >
    <div className={`w-4 h-4 border transition-all flex items-center justify-center ${checked ? 'bg-neon-green border-neon-green' : 'border-[var(--color-text-primary)]/20 group-hover:border-neon-green'}`}>
      {checked && <Check size={12} className="text-dodowa-black" />}
    </div>
    <span className={`text-xs transition-colors ${checked ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-primary)]/60 group-hover:text-[var(--color-text-primary)]'}`}>
      {label}
    </span>
  </label>
);

const CollectionPage: React.FC<CollectionPageProps> = ({ t, initialCollection = 'all', onNavigate }) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    category: initialCollection !== 'all' && ['protection', 'taping'].includes(initialCollection) ? [initialCollection] : [],
    protectionType: initialCollection === 'knee' || initialCollection === 'waist' ? [initialCollection] : [],
    sport: ['running', 'basketball', 'frisbee', 'football'].includes(initialCollection) ? [initialCollection] : [],
    tapingType: [],
    color: [],
    price: [],
    useCase: []
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['category', 'protectionType', 'sport', 'tapingType', 'color', 'price', 'useCase']);

  const toggleFilterGroup = (group: string) => {
    setExpandedGroups(prev => 
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    );
  };

  const toggleFilter = (group: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[group] || [];
      const next = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      return { ...prev, [group]: next };
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      category: [],
      protectionType: [],
      sport: [],
      tapingType: [],
      color: [],
      price: [],
      useCase: []
    });
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const categoryMatch = activeFilters.category.length === 0 || activeFilters.category.includes(p.category);
      const protectionMatch = activeFilters.protectionType.length === 0 || (p.protectionType && activeFilters.protectionType.includes(p.protectionType));
      const sportMatch = activeFilters.sport.length === 0 || (p.sport && p.sport.some(s => activeFilters.sport.includes(s)));
      const tapingMatch = activeFilters.tapingType.length === 0 || (p.tapingType && activeFilters.tapingType.includes(p.tapingType));
      const colorMatch = activeFilters.color.length === 0 || p.colors.some(c => activeFilters.color.includes(c));
      const useCaseMatch = activeFilters.useCase.length === 0 || p.useCase.some(u => activeFilters.useCase.includes(u));
      
      const priceMatch = activeFilters.price.length === 0 || activeFilters.price.some(range => {
        if (range === 'under10') return p.price < 10;
        if (range === 'tenToTwenty') return p.price >= 10 && p.price <= 20;
        if (range === 'twentyToForty') return p.price > 20 && p.price <= 40;
        if (range === 'aboveForty') return p.price > 40;
        return true;
      });

      return categoryMatch && protectionMatch && sportMatch && tapingMatch && colorMatch && priceMatch && useCaseMatch;
    });

    // Sorting
    if (sortBy === 'priceLow') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'priceHigh') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => (a.tag === 'New' ? -1 : 1));
    if (sortBy === 'bestSelling') result.sort((a, b) => (a.tag === 'Best Seller' ? -1 : 1));

    return result;
  }, [activeFilters, sortBy]);

  const colorOptions = [
    { id: 'black', hex: '#000000' },
    { id: 'white', hex: '#FFFFFF' },
    { id: 'neon-green', hex: '#9CFF1A' },
    { id: 'pink', hex: '#E82484' },
    { id: 'beige', hex: '#F5F5DC' },
    { id: 'gray', hex: '#808080' }
  ];

  const FilterGroup = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <div className="border-b border-[var(--color-border-subtle)] py-4">
      <button 
        onClick={() => toggleFilterGroup(id)}
        className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-widest mb-2"
      >
        <span>{title}</span>
        {expandedGroups.includes(id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence initial={false}>
        {expandedGroups.includes(id) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-24">
      <div className="container mx-auto px-6">
        {/* Collection Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-display uppercase mb-4">{t.collection.title}</h1>
            <p className="text-sm text-[var(--color-text-primary)]/40 uppercase tracking-widest">
              {filteredProducts.length} {t.collection.productCount}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[var(--color-border-subtle)] text-xs font-bold uppercase tracking-widest"
            >
              <Filter size={16} /> {t.collection.filterTitle}
            </button>

            <div className="flex items-center gap-4">
              <span className="hidden md:block text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-primary)]/40">
                {t.collection.sortBy}
              </span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-b border-[var(--color-border-subtle)] py-2 text-xs font-bold uppercase tracking-widest outline-none focus:border-neon-green transition-all cursor-pointer"
              >
                <option value="featured" className="bg-dodowa-black">{t.collection.sortOptions.featured}</option>
                <option value="bestSelling" className="bg-dodowa-black">{t.collection.sortOptions.bestSelling}</option>
                <option value="priceLow" className="bg-dodowa-black">{t.collection.sortOptions.priceLow}</option>
                <option value="priceHigh" className="bg-dodowa-black">{t.collection.sortOptions.priceHigh}</option>
                <option value="newest" className="bg-dodowa-black">{t.collection.sortOptions.newest}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em]">{t.collection.filterTitle}</h2>
                <button 
                  onClick={clearFilters}
                  className="text-[10px] uppercase font-bold tracking-widest text-hot-pink hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2">
                <FilterGroup id="category" title={t.collection.filters.category}>
                  <Checkbox 
                    label={t.nav.protection} 
                    checked={activeFilters.category.includes('protection')} 
                    onChange={() => toggleFilter('category', 'protection')} 
                  />
                  <Checkbox 
                    label={t.nav.taping} 
                    checked={activeFilters.category.includes('taping')} 
                    onChange={() => toggleFilter('category', 'taping')} 
                  />
                </FilterGroup>

                {activeFilters.category.includes('protection') && (
                  <FilterGroup id="protectionType" title={t.collection.filters.protectionType}>
                    <Checkbox 
                      label={t.nav.knee} 
                      checked={activeFilters.protectionType.includes('knee')} 
                      onChange={() => toggleFilter('protectionType', 'knee')} 
                    />
                    <Checkbox 
                      label={t.nav.waist} 
                      checked={activeFilters.protectionType.includes('waist')} 
                      onChange={() => toggleFilter('protectionType', 'waist')} 
                    />
                  </FilterGroup>
                )}

                <FilterGroup id="sport" title={t.collection.filters.sport}>
                  <Checkbox 
                    label={t.nav.running} 
                    checked={activeFilters.sport.includes('running')} 
                    onChange={() => toggleFilter('sport', 'running')} 
                  />
                  <Checkbox 
                    label={t.nav.basketball} 
                    checked={activeFilters.sport.includes('basketball')} 
                    onChange={() => toggleFilter('sport', 'basketball')} 
                  />
                  <Checkbox 
                    label={t.nav.frisbee} 
                    checked={activeFilters.sport.includes('frisbee')} 
                    onChange={() => toggleFilter('sport', 'frisbee')} 
                  />
                  <Checkbox 
                    label={t.nav.football} 
                    checked={activeFilters.sport.includes('football')} 
                    onChange={() => toggleFilter('sport', 'football')} 
                  />
                </FilterGroup>

                {activeFilters.category.includes('taping') && (
                  <FilterGroup id="tapingType" title={t.collection.filters.tapingType}>
                    {Object.entries(t.collection.tapingTypes).map(([key, label]) => (
                      <Checkbox 
                        key={key}
                        label={label as string} 
                        checked={activeFilters.tapingType.includes(key)} 
                        onChange={() => toggleFilter('tapingType', key)} 
                      />
                    ))}
                  </FilterGroup>
                )}

                <FilterGroup id="color" title={t.collection.filters.color}>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map(color => (
                      <button
                        key={color.id}
                        onClick={() => toggleFilter('color', color.id)}
                        className={`w-6 h-6 rounded-full border transition-all ${activeFilters.color.includes(color.id) ? 'border-neon-green scale-125' : 'border-white/10 hover:border-white/30'}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.id}
                      />
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup id="price" title={t.collection.filters.price}>
                  {Object.entries(t.collection.priceRanges).map(([key, label]) => (
                    <Checkbox 
                      key={key}
                      label={label as string} 
                      checked={activeFilters.price.includes(key)} 
                      onChange={() => toggleFilter('price', key)} 
                    />
                  ))}
                </FilterGroup>

                <FilterGroup id="useCase" title={t.collection.filters.useCase}>
                  {Object.entries(t.collection.useCases).map(([key, label]) => (
                    <Checkbox 
                      key={key}
                      label={label as string} 
                      checked={activeFilters.useCase.includes(key)} 
                      onChange={() => toggleFilter('useCase', key)} 
                    />
                  ))}
                </FilterGroup>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {/* Active Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.entries(activeFilters).map(([group, values]) => 
                (values as string[]).map(val => (
                  <button
                    key={`${group}-${val}`}
                    onClick={() => toggleFilter(group, val)}
                    className="flex items-center gap-2 px-3 py-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] text-[10px] font-bold uppercase tracking-widest hover:border-hot-pink transition-all"
                  >
                    {val} <X size={12} />
                  </button>
                ))
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-[var(--color-text-primary)]/40 uppercase tracking-widest mb-6">No products found matching your filters.</p>
                <button 
                  onClick={clearFilters}
                  className="text-neon-green font-bold uppercase tracking-widest text-xs border-b border-neon-green pb-1"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-[var(--color-bg-primary)] z-[120] p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-display uppercase">{t.collection.filterTitle}</h2>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6 pb-24">
                {/* Same filter groups as desktop */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neon-green">{t.collection.filters.category}</h3>
                  <div className="space-y-3">
                    <Checkbox 
                      label={t.nav.protection} 
                      checked={activeFilters.category.includes('protection')} 
                      onChange={() => toggleFilter('category', 'protection')} 
                    />
                    <Checkbox 
                      label={t.nav.taping} 
                      checked={activeFilters.category.includes('taping')} 
                      onChange={() => toggleFilter('category', 'taping')} 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neon-green">{t.collection.filters.sport}</h3>
                  <div className="space-y-3">
                    <Checkbox 
                      label={t.nav.running} 
                      checked={activeFilters.sport.includes('running')} 
                      onChange={() => toggleFilter('sport', 'running')} 
                    />
                    <Checkbox 
                      label={t.nav.basketball} 
                      checked={activeFilters.sport.includes('basketball')} 
                      onChange={() => toggleFilter('sport', 'basketball')} 
                    />
                    <Checkbox 
                      label={t.nav.frisbee} 
                      checked={activeFilters.sport.includes('frisbee')} 
                      onChange={() => toggleFilter('sport', 'frisbee')} 
                    />
                    <Checkbox 
                      label={t.nav.football} 
                      checked={activeFilters.sport.includes('football')} 
                      onChange={() => toggleFilter('sport', 'football')} 
                    />
                  </div>
                </div>

                {/* Add more filter groups for mobile as needed */}
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-6 bg-[var(--color-bg-primary)] border-t border-[var(--color-border-subtle)]">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-neon-green text-dodowa-black py-4 font-bold uppercase tracking-widest text-sm"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onNavigate: (view: string, params?: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={() => onNavigate('product', { product })}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-secondary)] mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        
        {product.tag && (
          <div className="absolute top-4 left-4 bg-neon-green text-dodowa-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
            {product.tag}
          </div>
        )}

        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
          <button 
            onClick={(e) => { e.stopPropagation(); /* Add to wishlist logic */ }}
            className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-neon-green hover:text-dodowa-black transition-all"
          >
            <Heart size={18} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNavigate('product', { product }); }}
            className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-neon-green hover:text-dodowa-black transition-all"
          >
            <Eye size={18} />
          </button>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); /* Add to cart logic */ }}
          className="absolute bottom-0 left-0 right-0 bg-neon-green text-dodowa-black py-4 font-bold uppercase tracking-widest text-[10px] translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2"
        >
          Add to Cart <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-bold uppercase tracking-wider group-hover:text-neon-green transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-display text-neon-green">SGD {product.price.toFixed(2)}</span>
          <div className="flex gap-1">
            {product.colors.map(c => (
              <div 
                key={c} 
                className="w-2 h-2 rounded-full border border-white/10" 
                style={{ backgroundColor: c === 'neon-green' ? '#9CFF1A' : c === 'pink' ? '#E82484' : c }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionPage;
