import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';

interface FAQPageProps {
  t: any;
  initialTab?: 'general' | 'shipping' | 'returns';
}

const FAQPage: React.FC<FAQPageProps> = ({ t, initialTab = 'general' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'shipping' | 'returns'>(initialTab);

  const sr = t.shippingReturns;
  
  const generalFaqs = t.communityPage.faq.items;
  const shippingFaqs = sr.faq.items;

  const filteredGeneral = generalFaqs.filter((item: any) => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredShipping = shippingFaqs.filter((item: any) => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/20 rounded-full text-neon-green text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
          >
            <HelpCircle size={14} /> Help Center
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display uppercase mb-6"
          >
            How can we help?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--color-text-primary)]/60 text-lg max-w-2xl mx-auto"
          >
            Find answers to common questions about our products, shipping, and sports protection technology.
          </motion.p>
        </header>

        {/* Search Bar */}
        <div className="relative mb-12 max-w-2xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input 
            type="text" 
            placeholder="Search for a question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] py-6 pl-16 pr-6 text-sm outline-none focus:border-neon-green transition-all"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { id: 'general', label: 'General' },
            { id: 'shipping', label: 'Shipping' },
            { id: 'returns', label: 'Returns' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all border ${
                activeTab === tab.id 
                  ? 'bg-neon-green text-dodowa-black border-neon-green' 
                  : 'bg-transparent text-[var(--color-text-primary)]/40 border-[var(--color-border-subtle)] hover:border-neon-green/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {activeTab === 'general' && (
            <>
              {filteredGeneral.length > 0 ? (
                filteredGeneral.map((item: any, index: number) => (
                  <FAQItem 
                    key={`gen-${index}`}
                    item={item}
                    isOpen={activeFaq === `gen-${index}`}
                    onToggle={() => setActiveFaq(activeFaq === `gen-${index}` ? null : `gen-${index}`)}
                  />
                ))
              ) : (
                <NoResults query={searchQuery} />
              )}
            </>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-12">
              {/* Structured Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: sr.shipping.processing.title, desc: sr.shipping.processing.desc },
                  { title: sr.shipping.delivery.title, desc: sr.shipping.delivery.desc },
                  { title: sr.shipping.tracking.title, desc: sr.shipping.tracking.desc },
                  { title: sr.shipping.notes.title, desc: sr.shipping.notes.desc }
                ].map((info, i) => (
                  <div key={i} className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neon-green mb-2">{info.title}</h4>
                    <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">{info.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-neon-green/10 border border-neon-green/20">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neon-green mb-2">{sr.freeShipping.title}</h4>
                <p className="text-sm text-[var(--color-text-primary)]/80">{sr.freeShipping.desc}</p>
              </div>

              {/* Shipping FAQs */}
              <div className="space-y-4">
                <h3 className="text-xl font-display uppercase tracking-wider mb-6">Shipping FAQ</h3>
                {filteredShipping.map((item: any, index: number) => (
                  <FAQItem 
                    key={`ship-${index}`}
                    item={item}
                    isOpen={activeFaq === `ship-${index}`}
                    onToggle={() => setActiveFaq(activeFaq === `ship-${index}` ? null : `ship-${index}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-12">
              {/* Structured Returns Info */}
              <div className="space-y-4">
                {[
                  { title: 'Return Window', desc: sr.returns.window },
                  { title: 'Condition', desc: sr.returns.condition },
                  { title: 'Non-Returnable', desc: sr.returns.nonReturnable },
                  { title: sr.exchanges.title, desc: sr.exchanges.desc },
                  { title: sr.refunds.title, desc: `${sr.refunds.approval} ${sr.refunds.timing}` }
                ].map((info, i) => (
                  <div key={i} className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-hot-pink mb-2">{info.title}</h4>
                    <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">{info.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-[var(--color-bg-secondary)] border border-hot-pink/20">
                <h4 className="text-sm font-bold uppercase tracking-widest text-hot-pink mb-4">{sr.orderIssues.title}</h4>
                <p className="text-sm text-[var(--color-text-primary)]/60 mb-4">{sr.orderIssues.desc}</p>
                <ul className="space-y-2">
                  {sr.orderIssues.items.map((item: string, i: number) => (
                    <li key={i} className="text-xs text-[var(--color-text-primary)]/80 flex items-center gap-2">
                      <div className="w-1 h-1 bg-hot-pink rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FAQItem: React.FC<{ item: any, isOpen: boolean, onToggle: () => void }> = ({ item, isOpen, onToggle }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/30 overflow-hidden"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-8 text-left hover:bg-white/5 transition-colors"
    >
      <span className="font-bold uppercase tracking-wide text-sm md:text-base pr-8">{item.q}</span>
      <ChevronDown 
        size={20} 
        className={`text-neon-green flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="p-8 pt-0 text-[var(--color-text-primary)]/60 text-sm md:text-base leading-relaxed border-t border-[var(--color-border-subtle)]/50">
            {item.a}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const NoResults = ({ query }: { query: string }) => (
  <div className="text-center py-20 border border-dashed border-white/10">
    <p className="text-white/40 uppercase tracking-widest text-xs">No results found for "{query}"</p>
  </div>
);

export default FAQPage;
