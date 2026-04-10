import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  Heart, 
  Trash2, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Plus,
  Minus
} from 'lucide-react';

interface CartPageProps {
  t: any;
  onNavigate: (type: string, params?: any) => void;
}

type CartSection = 'cart' | 'orders' | 'track' | 'saved';

const CartPage: React.FC<CartPageProps> = ({ t, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<CartSection>('cart');

  const tabs = [
    { id: 'cart', label: t.cart.shoppingCart, icon: ShoppingBag },
    { id: 'orders', label: t.cart.orders, icon: Package },
    { id: 'track', label: t.cart.track, icon: Truck },
    { id: 'saved', label: t.cart.saved, icon: Heart },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'cart': return <ShoppingCartSection t={t} onNavigate={onNavigate} />;
      case 'orders': return <OrdersSection t={t} />;
      case 'track': return <TrackOrderSection t={t} />;
      case 'saved': return <SavedItemsSection t={t} onNavigate={onNavigate} />;
      default: return <ShoppingCartSection t={t} onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg-primary)]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-display text-neon-green mb-4">{t.cart.title}</h1>
            
            {/* Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-[var(--color-border-subtle)]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as CartSection)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 ${
                    activeSection === tab.id 
                      ? 'bg-neon-green text-dodowa-black shadow-[0_10px_20px_rgba(156,255,26,0.2)]' 
                      : 'text-[var(--color-text-primary)]/40 hover:text-neon-green hover:bg-white/5'
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Shopping Cart Section ---
const ShoppingCartSection = ({ t, onNavigate }: { t: any, onNavigate: (type: string) => void }) => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'DODOWA Pro Knee Support', price: 45.00, color: 'Neon Green', size: 'M', quantity: 1, image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=800' },
    { id: '2', name: 'Kinesiology Recovery Tape', price: 12.90, color: 'Pink', size: 'Standard', quantity: 2, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800' },
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 60 ? 0 : 5.00;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] rounded-3xl">
        <ShoppingBag size={64} className="mx-auto text-[var(--color-text-primary)]/10 mb-6" />
        <h2 className="text-2xl font-display mb-4">{t.cart.empty}</h2>
        <button 
          onClick={() => onNavigate('all')}
          className="bg-neon-green text-dodowa-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:glow-green transition-all inline-flex items-center gap-2"
        >
          {t.cart.continueShopping} <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-6 rounded-2xl flex gap-6 group">
            <div className="w-24 h-32 shrink-0 bg-[var(--color-bg-primary)] rounded-xl overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-1">{item.name}</h3>
                  <p className="text-[10px] text-[var(--color-text-primary)]/40 uppercase tracking-widest font-bold">
                    {item.color} / {item.size}
                  </p>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-[var(--color-text-primary)]/40 hover:text-hot-pink transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="flex items-center bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-lg px-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:text-neon-green transition-colors"><Minus size={14} /></button>
                  <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:text-neon-green transition-colors"><Plus size={14} /></button>
                </div>
                <p className="text-lg font-display text-neon-green">SGD {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-8 rounded-3xl space-y-6 sticky top-32">
          <h3 className="text-lg font-display mb-6">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-xs uppercase tracking-widest font-bold text-[var(--color-text-primary)]/60">
              <span>{t.cart.subtotal}</span>
              <span>SGD {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest font-bold text-[var(--color-text-primary)]/60">
              <span>{t.cart.shipping}</span>
              <span>{shipping === 0 ? 'FREE' : `SGD ${shipping.toFixed(2)}`}</span>
            </div>
            <div className="pt-4 border-t border-[var(--color-border-subtle)] flex justify-between items-end">
              <span className="text-sm font-bold uppercase tracking-widest">{t.cart.total}</span>
              <span className="text-2xl font-display text-neon-green">SGD {total.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-neon-green text-dodowa-black py-5 rounded-xl font-bold uppercase tracking-widest text-xs hover:glow-green transition-all shadow-[0_15px_30px_rgba(156,255,26,0.2)]">
            {t.cart.checkout}
          </button>
          <p className="text-[9px] text-center text-[var(--color-text-primary)]/40 uppercase tracking-widest font-bold">
            Secure Checkout Powered by DODOWA
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Orders Section ---
const OrdersSection = ({ t }: { t: any }) => {
  const orders = [
    { id: 'DDW-8291', date: '2024-03-15', status: 'delivered', total: 124.50, items: 2 },
    { id: 'DDW-7102', date: '2024-02-28', status: 'shipped', total: 45.00, items: 1 },
    { id: 'DDW-6543', date: '2024-01-10', status: 'delivered', total: 89.90, items: 3 },
  ];

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden">
          <div className="p-6 flex flex-wrap items-center justify-between gap-6">
            <div className="flex gap-8">
              <div>
                <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40 block mb-1">{t.account.orders.orderNo}</label>
                <span className="text-sm font-bold">{order.id}</span>
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40 block mb-1">{t.account.orders.date}</label>
                <span className="text-sm font-bold">{order.date}</span>
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40 block mb-1">{t.account.orders.total}</label>
                <span className="text-sm font-bold">SGD {order.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40 block mb-1">{t.account.orders.status}</label>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  order.status === 'delivered' ? 'bg-neon-green/10 text-neon-green' : 
                  order.status === 'shipped' ? 'bg-blue-500/10 text-blue-500' :
                  order.status === 'cancelled' ? 'bg-hot-pink/10 text-hot-pink' : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {t.account.orders.statuses[order.status as keyof typeof t.account.orders.statuses]}
                </span>
              </div>
              <button className="bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-neon-green transition-colors">
                {t.account.orders.viewDetails}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Track Order Section ---
const TrackOrderSection = ({ t }: { t: any }) => {
  const trackingData = {
    id: 'DDW-7102',
    trackingNo: 'SG-9281-0021-X',
    status: 'shipped',
    currentStep: 2,
    timeline: [
      { step: 0, label: t.account.track.timeline.placed, date: 'Feb 28, 2024', time: '10:30 AM', completed: true },
      { step: 1, label: t.account.track.timeline.packed, date: 'Feb 29, 2024', time: '02:15 PM', completed: true },
      { step: 2, label: t.account.track.timeline.shipped, date: 'Mar 01, 2024', time: '09:00 AM', completed: true },
      { step: 3, label: t.account.track.timeline.delivery, date: 'Expected Mar 03', time: '-', completed: false },
      { step: 4, label: t.account.track.timeline.delivered, date: '-', time: '-', completed: false },
    ]
  };

  return (
    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-8 rounded-3xl">
      <div className="flex flex-wrap items-center justify-between gap-8 mb-12 pb-8 border-b border-[var(--color-border-subtle)]">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40 block mb-1">Order Number</label>
          <span className="text-lg font-display">{trackingData.id}</span>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40 block mb-1">{t.account.track.trackingNo}</label>
          <div className="flex items-center gap-3">
            <span className="text-lg font-display text-neon-green">{trackingData.trackingNo}</span>
            <button className="text-[var(--color-text-primary)]/40 hover:text-neon-green transition-colors"><ExternalLink size={16} /></button>
          </div>
        </div>
      </div>

      <div className="relative max-w-xl mx-auto">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--color-border-subtle)]" />
        <div className="space-y-10 relative">
          {trackingData.timeline.map((item, i) => (
            <div key={i} className="flex gap-8 group">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                item.completed ? 'bg-neon-green text-dodowa-black shadow-[0_0_15px_rgba(156,255,26,0.5)]' : 'bg-[var(--color-bg-primary)] border-2 border-[var(--color-border-subtle)] text-[var(--color-text-primary)]/20'
              }`}>
                {item.completed ? <CheckCircle2 size={16} /> : <Clock size={16} />}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-xs font-bold uppercase tracking-widest ${item.completed ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-primary)]/30'}`}>
                    {item.label}
                  </h4>
                  <span className="text-[10px] font-bold text-[var(--color-text-primary)]/40">{item.time}</span>
                </div>
                <p className={`text-[10px] ${item.completed ? 'text-[var(--color-text-primary)]/60' : 'text-[var(--color-text-primary)]/20'}`}>
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Saved Items Section ---
const SavedItemsSection = ({ t, onNavigate }: { t: any, onNavigate: (type: string, params?: any) => void }) => {
  const savedItems = [
    { id: '1', name: 'DODOWA Pro Knee Support', price: 45.00, image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=800' },
    { id: '2', name: 'Kinesiology Recovery Tape', price: 12.90, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800' },
    { id: '3', name: 'Professional Waist Guard', price: 59.00, image: 'https://images.unsplash.com/photo-1582719201931-76395b09e209?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedItems.map((item) => (
        <div key={item.id} className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden group">
          <div className="aspect-[4/5] relative overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
              referrerPolicy="no-referrer"
            />
            <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-hot-pink hover:bg-hot-pink hover:text-white transition-all">
              <Trash2 size={18} />
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-1">{item.name}</h3>
              <p className="text-lg font-display text-neon-green">SGD {item.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-neon-green text-dodowa-black py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:glow-green transition-all flex items-center justify-center gap-2">
                <ShoppingBag size={14} /> {t.account.saved.moveToCart}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
