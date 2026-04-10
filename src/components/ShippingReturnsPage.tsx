import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Truck, 
  RotateCcw, 
  RefreshCw, 
  CreditCard, 
  AlertCircle, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  Package,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface ShippingReturnsPageProps {
  t: any;
}

const ShippingReturnsPage: React.FC<ShippingReturnsPageProps> = ({ t }) => {
  const sr = t.shippingReturns;
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const NavItem = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <a 
      href={`#${id}`}
      className="flex items-center gap-3 px-6 py-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] hover:border-neon-green transition-all group"
    >
      <Icon size={18} className="text-[var(--color-text-primary)]/40 group-hover:text-neon-green transition-colors" />
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </a>
  );

  const SectionHeader = ({ title, icon: Icon, colorClass = "text-neon-green" }: { title: string, icon: any, colorClass?: string }) => (
    <div className="flex items-center gap-4 mb-8">
      <div className={`w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] flex items-center justify-center ${colorClass}`}>
        <Icon size={20} />
      </div>
      <h2 className="text-2xl font-display uppercase tracking-wider">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/20 rounded-full text-neon-green text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
          >
            <ShieldCheck size={14} /> Support Center
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display uppercase mb-6"
          >
            {sr.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--color-text-primary)]/60 text-lg max-w-2xl mx-auto"
          >
            {sr.hero.subtitle}
          </motion.p>
        </header>

        {/* Quick Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          <NavItem id="shipping" label={sr.nav.shipping} icon={Truck} />
          <NavItem id="returns" label={sr.nav.returns} icon={RotateCcw} />
          <NavItem id="exchanges" label={sr.nav.exchanges} icon={RefreshCw} />
          <NavItem id="refunds" label={sr.nav.refunds} icon={CreditCard} />
        </motion.nav>

        <div className="space-y-32">
          {/* Shipping Section */}
          <section id="shipping" className="scroll-mt-32">
            <SectionHeader title={sr.shipping.title} icon={Truck} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] hover:border-neon-green/30 transition-colors">
                <Clock className="text-neon-green mb-4" size={24} />
                <h3 className="text-sm font-bold uppercase tracking-widest mb-3">{sr.shipping.processing.title}</h3>
                <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">{sr.shipping.processing.desc}</p>
              </div>
              <div className="p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] hover:border-neon-green/30 transition-colors">
                <Package className="text-neon-green mb-4" size={24} />
                <h3 className="text-sm font-bold uppercase tracking-widest mb-3">{sr.shipping.delivery.title}</h3>
                <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">{sr.shipping.delivery.desc}</p>
              </div>
              <div className="p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] hover:border-neon-green/30 transition-colors">
                <RefreshCw className="text-neon-green mb-4" size={24} />
                <h3 className="text-sm font-bold uppercase tracking-widest mb-3">{sr.shipping.tracking.title}</h3>
                <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">{sr.shipping.tracking.desc}</p>
              </div>
              <div className="p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] hover:border-neon-green/30 transition-colors">
                <AlertCircle className="text-neon-green mb-4" size={24} />
                <h3 className="text-sm font-bold uppercase tracking-widest mb-3">{sr.shipping.notes.title}</h3>
                <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">{sr.shipping.notes.desc}</p>
              </div>
            </div>

            <div className="p-8 bg-neon-green text-dodowa-black">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-2">{sr.freeShipping.title}</h3>
              <p className="text-lg font-display uppercase">{sr.freeShipping.desc}</p>
            </div>
          </section>

          {/* Returns Section */}
          <section id="returns" className="scroll-mt-32">
            <SectionHeader title={sr.returns.title} icon={RotateCcw} colorClass="text-hot-pink" />
            <div className="space-y-6">
              <div className="flex gap-6 p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]">
                <div className="w-12 h-12 rounded-full bg-hot-pink/10 flex items-center justify-center shrink-0">
                  <Clock className="text-hot-pink" size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Eligibility Window</h4>
                  <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">{sr.returns.window}</p>
                </div>
              </div>
              <div className="flex gap-6 p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]">
                <div className="w-12 h-12 rounded-full bg-hot-pink/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-hot-pink" size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Item Condition</h4>
                  <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">{sr.returns.condition}</p>
                </div>
              </div>
              <div className="flex gap-6 p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]">
                <div className="w-12 h-12 rounded-full bg-hot-pink/10 flex items-center justify-center shrink-0">
                  <AlertCircle className="text-hot-pink" size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Non-Returnable Items</h4>
                  <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">{sr.returns.nonReturnable}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Exchanges & Refunds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section id="exchanges" className="scroll-mt-32">
              <SectionHeader title={sr.exchanges.title} icon={RefreshCw} />
              <div className="space-y-6 text-sm text-[var(--color-text-primary)]/60 leading-relaxed">
                <p>{sr.exchanges.desc}</p>
                <p>{sr.exchanges.process}</p>
              </div>
            </section>

            <section id="refunds" className="scroll-mt-32">
              <SectionHeader title={sr.refunds.title} icon={CreditCard} colorClass="text-hot-pink" />
              <div className="space-y-4">
                {[
                  { label: "Approval", val: sr.refunds.approval },
                  { label: "Destination", val: sr.refunds.destination },
                  { label: "Timing", val: sr.refunds.timing },
                  { label: "Shipping Fees", val: sr.refunds.shippingFees }
                ].map((item, i) => (
                  <div key={i} className="pb-4 border-b border-[var(--color-border-subtle)]">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">{item.label}</span>
                    <p className="text-sm text-[var(--color-text-primary)]/80">{item.val}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Order Issues */}
          <section id="orderIssues" className="scroll-mt-32">
            <div className="p-12 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-hot-pink/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <SectionHeader title={sr.orderIssues.title} icon={AlertCircle} colorClass="text-hot-pink" />
              <p className="text-[var(--color-text-primary)]/60 mb-8 max-w-2xl">{sr.orderIssues.desc}</p>
              <ul className="space-y-4">
                {sr.orderIssues.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/80">
                    <div className="w-1.5 h-1.5 bg-hot-pink rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="scroll-mt-32">
            <SectionHeader title="Common Questions" icon={AlertCircle} />
            <div className="space-y-4">
              {sr.faq.items.map((item: any, i: number) => (
                <div key={i} className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/30">
                  <button 
                    onClick={() => toggleAccordion(`faq-${i}`)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm font-bold uppercase tracking-widest">{item.q}</span>
                    {activeAccordion === `faq-${i}` ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === `faq-${i}` && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm text-[var(--color-text-primary)]/60 leading-relaxed border-t border-[var(--color-border-subtle)] pt-6">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Support */}
          <section id="support" className="scroll-mt-32 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green mx-auto mb-8">
                <Mail size={32} />
              </div>
              <h2 className="text-4xl font-display uppercase mb-6">{sr.support.title}</h2>
              <p className="text-lg text-[var(--color-text-primary)]/60 mb-8">{sr.support.responseTime}</p>
              <div className="inline-block px-8 py-4 bg-[var(--color-bg-secondary)] border border-neon-green text-neon-green text-xl font-display mb-12">
                {sr.support.email}
              </div>
              <br />
              <button className="bg-neon-green text-dodowa-black px-12 py-4 font-bold uppercase tracking-widest text-xs hover:glow-green transition-all">
                {sr.support.cta}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
