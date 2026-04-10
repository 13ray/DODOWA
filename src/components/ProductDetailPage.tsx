import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  Truck,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Check
} from 'lucide-react';
import { Product, products } from '../data/products';

interface ProductDetailPageProps {
  t: any;
  product: Product;
  onNavigate: (view: string, params?: any) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ t, product, onNavigate }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>('description');
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const purchaseArea = document.getElementById('purchase-area');
      if (purchaseArea) {
        const rect = purchaseArea.getBoundingClientRect();
        setIsStickyVisible(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const relatedProducts = useMemo(() => {
    return products
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const colorOptions = [
    { id: 'black', hex: '#000000' },
    { id: 'white', hex: '#FFFFFF' },
    { id: 'neon-green', hex: '#9CFF1A' },
    { id: 'pink', hex: '#E82484' },
    { id: 'beige', hex: '#F5F5DC' },
    { id: 'gray', hex: '#808080' }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-primary)]/40 mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-neon-green transition-colors">Home</button>
          <ChevronRight size={10} />
          <button onClick={() => onNavigate('all')} className="hover:text-neon-green transition-colors">Products</button>
          <ChevronRight size={10} />
          <span className="text-[var(--color-text-primary)]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          {/* Left Side: Media Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] bg-[var(--color-bg-secondary)] overflow-hidden group cursor-zoom-in">
              <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              {product.tag && (
                <div className="absolute top-6 left-6 bg-neon-green text-dodowa-black px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest z-10">
                  {product.tag}
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Purchase Area */}
          <div id="purchase-area" className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-neon-green">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <a href="#reviews" className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-primary)]/40 hover:text-neon-green transition-colors">
                  {product.rating} | {product.reviewCount} {t.product.reviews}
                </a>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-display uppercase mb-4 leading-tight">{product.name}</h1>
              <p className="text-2xl font-display text-neon-green mb-8">SGD {product.price.toFixed(2)}</p>
              
              <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-primary)]/40 mb-4">
                {t.product.color}: <span className="text-[var(--color-text-primary)]">{selectedColor}</span>
              </h3>
              <div className="flex flex-wrap gap-4">
                {product.colors.map(colorId => {
                  const color = colorOptions.find(c => c.id === colorId);
                  return (
                    <button
                      key={colorId}
                      onClick={() => setSelectedColor(colorId)}
                      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === colorId ? 'border-neon-green scale-110' : 'border-white/10 hover:border-white/30'}`}
                      style={{ backgroundColor: color?.hex }}
                      title={colorId}
                    >
                      {selectedColor === colorId && (
                        <Check size={16} className={colorId === 'white' || colorId === 'beige' ? 'text-dodowa-black' : 'text-white'} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-[var(--color-border-subtle)] h-14">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-full flex items-center justify-center hover:text-neon-green transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 h-full flex items-center justify-center font-bold text-sm border-x border-[var(--color-border-subtle)]">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-full flex items-center justify-center hover:text-neon-green transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button className="flex-1 h-14 bg-neon-green text-dodowa-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all flex items-center justify-center gap-3">
                  {t.product.addToCart} <ArrowRight size={18} />
                </button>
              </div>

              <button className="w-full h-14 border border-[var(--color-border-subtle)] font-bold uppercase tracking-widest text-sm hover:border-neon-green transition-all">
                {t.product.buyNow}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-8 border-y border-[var(--color-border-subtle)]">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={20} className="text-neon-green" />
                <span className="text-[8px] uppercase font-bold tracking-widest text-[var(--color-text-primary)]/40">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw size={20} className="text-neon-green" />
                <span className="text-[8px] uppercase font-bold tracking-widest text-[var(--color-text-primary)]/40">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={20} className="text-neon-green" />
                <span className="text-[8px] uppercase font-bold tracking-widest text-[var(--color-text-primary)]/40">Secure Payment</span>
              </div>
            </div>

            {/* Expandable Sections */}
            <div className="mt-8 space-y-2">
              <Section 
                id="description" 
                title={t.product.description} 
                isOpen={expandedSection === 'description'} 
                onToggle={() => toggleSection('description')}
              >
                <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">
                  {product.description}
                </p>
              </Section>

              <Section 
                id="features" 
                title={t.product.features} 
                isOpen={expandedSection === 'features'} 
                onToggle={() => toggleSection('features')}
              >
                <ul className="space-y-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-primary)]/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-green mt-1.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Section>

              {product.sizeInfo && (
                <Section 
                  id="size" 
                  title={t.product.sizeInfo} 
                  isOpen={expandedSection === 'size'} 
                  onToggle={() => toggleSection('size')}
                >
                  <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed mb-4">
                    {product.sizeInfo}
                  </p>
                  <button 
                    onClick={() => onNavigate('sizeGuide')}
                    className="text-xs font-bold uppercase tracking-widest text-neon-green hover:underline"
                  >
                    View Full Size Guide
                  </button>
                </Section>
              )}

              {product.howToUse && (
                <Section 
                  id="howToUse" 
                  title={t.product.howToUse} 
                  isOpen={expandedSection === 'howToUse'} 
                  onToggle={() => toggleSection('howToUse')}
                >
                  <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">
                    {product.howToUse}
                  </p>
                </Section>
              )}

              <Section 
                id="shipping" 
                title={t.product.shippingReturns} 
                isOpen={expandedSection === 'shipping'} 
                onToggle={() => toggleSection('shipping')}
              >
                <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed mb-4">
                  {t.product.shippingReturnsDesc}
                </p>
                <button 
                  onClick={() => onNavigate('shippingReturns')}
                  className="text-xs font-bold uppercase tracking-widest text-neon-green hover:underline"
                >
                  Learn More
                </button>
              </Section>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section id="reviews" className="py-24 border-t border-[var(--color-border-subtle)]">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-xs">
              <h2 className="text-3xl font-display uppercase mb-4">{t.product.ratingSummary}</h2>
              <div className="flex items-end gap-4 mb-4">
                <span className="text-6xl font-display text-neon-green leading-none">{product.rating}</span>
                <div className="flex flex-col gap-1">
                  <div className="flex text-neon-green">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-primary)]/40">
                    Based on {product.reviewCount} Reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full space-y-8">
              <h2 className="text-3xl font-display uppercase mb-8">{t.product.customerReviews}</h2>
              <div className="space-y-12">
                {[
                  { name: "Alex R.", rating: 5, text: "The knee support is a game changer for my morning runs. Highly recommend!", sport: "Running", date: "2 days ago" },
                  { name: "Sarah J.", rating: 4, text: "Great quality tape. Stays on even during intense basketball sessions.", sport: "Basketball", date: "1 week ago" },
                  { name: "Michael T.", rating: 5, text: "Excellent waist support for heavy lifting. Feels very secure.", sport: "Recovery", date: "2 weeks ago" }
                ].map((review, i) => (
                  <div key={i} className="border-b border-[var(--color-border-subtle)] pb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center font-bold text-neon-green">
                          {review.name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold uppercase tracking-wider">{review.name}</span>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-neon-green/10 text-neon-green text-[8px] font-bold uppercase tracking-widest rounded-full">
                              <Check size={8} /> {t.product.verifiedBuyer}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex text-neon-green">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />
                              ))}
                            </div>
                            <span className="text-[10px] text-[var(--color-text-primary)]/40 uppercase tracking-widest">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-[var(--color-border-subtle)] text-[var(--color-text-primary)]/40">
                        {review.sport}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 border border-[var(--color-border-subtle)] text-xs font-bold uppercase tracking-widest hover:border-neon-green transition-all">
                {t.product.loadMore}
              </button>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-24 border-t border-[var(--color-border-subtle)]">
          <h2 className="text-3xl font-display uppercase mb-12">{t.product.relatedProducts}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <div 
                key={p.id} 
                className="group cursor-pointer"
                onClick={() => {
                  onNavigate('product', { product: p });
                  window.scrollTo(0, 0);
                }}
              >
                <div className="relative aspect-[4/5] bg-[var(--color-bg-secondary)] overflow-hidden mb-4">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-neon-green transition-colors">{p.name}</h3>
                <p className="text-sm font-display text-neon-green">SGD {p.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Purchase Bar */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 bg-[var(--color-bg-primary)] border-t border-[var(--color-border-subtle)] z-50 py-4 px-6 md:px-12"
          >
            <div className="container mx-auto flex items-center justify-between gap-6">
              <div className="hidden md:flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--color-bg-secondary)] overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-0.5">{product.name}</h4>
                  <p className="text-xs font-display text-neon-green">SGD {product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex-1 md:flex-none flex items-center gap-4">
                <div className="hidden sm:flex items-center border border-[var(--color-border-subtle)] h-12">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center hover:text-neon-green"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 h-full flex items-center justify-center font-bold text-xs border-x border-[var(--color-border-subtle)]">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center hover:text-neon-green"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button className="flex-1 sm:flex-none px-8 h-12 bg-neon-green text-dodowa-black font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all">
                  {t.product.addToCart}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Section = ({ id, title, isOpen, onToggle, children }: { id: string, title: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode }) => (
  <div className="border-b border-[var(--color-border-subtle)] last:border-0">
    <button 
      onClick={onToggle}
      className="w-full py-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]"
    >
      <span>{title}</span>
      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="pb-6">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default ProductDetailPage;
