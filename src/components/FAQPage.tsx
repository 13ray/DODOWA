import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';

interface FAQPageProps {
  t: any;
}

const FAQPage: React.FC<FAQPageProps> = ({ t }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const filteredFaqs = t.communityPage.faq.items.filter((item: any) => 
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
        <div className="relative mb-16 max-w-2xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input 
            type="text" 
            placeholder="Search for a question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] py-6 pl-16 pr-6 text-sm outline-none focus:border-neon-green transition-all"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item: any, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/30 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold uppercase tracking-wide text-sm md:text-base pr-8">{item.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-neon-green flex-shrink-0 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
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
            ))
          ) : (
            <div className="text-center py-20 border border-dashed border-white/10">
              <p className="text-white/40 uppercase tracking-widest text-xs">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-24 p-12 bg-neon-green text-dodowa-black text-center">
          <MessageCircle size={40} className="mx-auto mb-6" />
          <h3 className="text-2xl font-display uppercase mb-4">Still have questions?</h3>
          <p className="font-medium mb-8 opacity-80">Our team is here to help you find the right support for your movement.</p>
          <button className="bg-dodowa-black text-neon-green px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-black/90 transition-all flex items-center gap-2 mx-auto">
            Contact Support <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
