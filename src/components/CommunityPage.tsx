import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Star, 
  ArrowRight, 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  Send,
  BookOpen,
  MessageSquare,
  Users,
  HelpCircle
} from 'lucide-react';

interface CommunityPageProps {
  t: any;
  onReadArticle: (id: string) => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ t, onReadArticle }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('faq');

  const navItems = [
    { id: 'faq', label: t.communityPage.nav.faq, icon: <HelpCircle size={18} /> },
    { id: 'reviews', label: t.communityPage.nav.reviews, icon: <Star size={18} /> },
    { id: 'guides', label: t.communityPage.nav.guides, icon: <BookOpen size={18} /> },
    { id: 'articles', label: t.communityPage.nav.articles, icon: <MessageSquare size={18} /> }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveTab(id);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-32 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-16">
        <div className="relative overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-12 md:p-20">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <div className="w-full h-full border-l border-b border-neon-green/30 rotate-12 translate-x-1/2" />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <span className="text-neon-green font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
              {t.communityPage.hero.tag}
            </span>
            <h1 className="text-5xl md:text-7xl font-display uppercase mb-6 leading-tight">
              {t.communityPage.hero.title}
            </h1>
            <p className="text-lg text-[var(--color-text-primary)]/60 leading-relaxed mb-8">
              {t.communityPage.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="sticky top-24 z-30 bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-y border-[var(--color-border-subtle)] mb-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-4 md:gap-12 py-4 overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all px-4 py-2 rounded-full border ${
                  activeTab === item.id 
                    ? 'bg-neon-green text-dodowa-black border-neon-green' 
                    : 'text-[var(--color-text-primary)]/40 border-transparent hover:text-neon-green'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 space-y-40">
        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-40">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-display uppercase mb-4">{t.communityPage.faq.title}</h2>
              <p className="text-neon-green font-bold uppercase tracking-widest text-xs mb-8">{t.communityPage.faq.accent}</p>
              <div className="w-12 h-1 bg-neon-green" />
            </div>
            <div className="md:w-2/3 space-y-4">
              {t.communityPage.faq.items.map((item: any, index: number) => (
                <div 
                  key={index}
                  className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/30 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-bold uppercase tracking-wide text-sm">{item.q}</span>
                    <ChevronDown 
                      size={20} 
                      className={`text-neon-green transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} 
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
                        <div className="p-6 pt-0 text-[var(--color-text-primary)]/60 text-sm leading-relaxed border-t border-[var(--color-border-subtle)]/50">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="scroll-mt-40">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-display uppercase mb-4">{t.communityPage.reviews.title}</h2>
              <p className="text-hot-pink font-bold uppercase tracking-widest text-xs">{t.communityPage.reviews.accent}</p>
            </div>
            <div className="flex items-center gap-4 bg-[var(--color-bg-secondary)] p-4 border border-[var(--color-border-subtle)]">
              <div className="text-3xl font-display text-neon-green">4.9</div>
              <div className="flex flex-col">
                <div className="flex text-neon-green">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">{t.communityPage.reviews.summary}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.communityPage.reviews.items.map((review: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-8 hover:border-neon-green/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex text-neon-green">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 text-white/40">
                    {review.sport}
                  </span>
                </div>
                <p className="text-sm italic text-[var(--color-text-primary)]/70 mb-8 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green font-bold text-xs">
                    {review.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-green hover:text-white transition-colors flex items-center gap-2 mx-auto">
              {t.communityPage.reviews.loadMore} <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* Guides Section */}
        <section id="guides" className="scroll-mt-40">
          <div className="mb-12">
            <h2 className="text-4xl font-display uppercase mb-4">{t.communityPage.guides.title}</h2>
            <p className="text-neon-green font-bold uppercase tracking-widest text-xs">{t.communityPage.guides.accent}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.communityPage.guides.items.map((guide: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => onReadArticle(guide.id)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-bg-secondary)] mb-6 border border-[var(--color-border-subtle)]">
                  <img 
                    src={guide.image} 
                    alt={guide.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-3 group-hover:text-neon-green transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-[var(--color-text-primary)]/40 mb-6 line-clamp-2">
                  {guide.desc}
                </p>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neon-green group-hover:translate-x-2 transition-transform">
                  {t.communityPage.guides.readMore} <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="scroll-mt-40">
          <div className="mb-12">
            <h2 className="text-4xl font-display uppercase mb-4">{t.communityPage.articles.title}</h2>
            <p className="text-hot-pink font-bold uppercase tracking-widest text-xs">{t.communityPage.articles.accent}</p>
          </div>

          <div className="space-y-12">
            {t.communityPage.articles.items.map((article: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center group`}
              >
                <div className="flex-1 w-full aspect-[16/9] overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-40 group-hover:opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-hot-pink">{article.category}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">{article.date}</span>
                  </div>
                  <h3 className="text-3xl font-display uppercase group-hover:text-neon-green transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <button 
                    onClick={() => onReadArticle(article.id)}
                    className="group/btn relative border border-white/10 px-8 py-3 text-[10px] font-bold uppercase tracking-widest overflow-hidden transition-all hover:border-neon-green hover:text-dodowa-black hover:bg-neon-green"
                  >
                    {t.communityPage.articles.readArticle}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Discussion Section */}
        <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Users className="text-neon-green" size={32} />
              <h2 className="text-3xl font-display uppercase">{t.communityPage.discussion.title}</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder={t.communityPage.discussion.name}
                    className="bg-black/40 border border-white/10 p-4 text-sm outline-none focus:border-neon-green transition-colors"
                  />
                </div>
                <textarea 
                  placeholder={t.communityPage.discussion.placeholder}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 p-4 text-sm outline-none focus:border-neon-green transition-colors resize-none"
                />
                <button className="bg-neon-green text-dodowa-black px-8 py-4 font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:glow-green transition-all">
                  {t.communityPage.discussion.submit} <Send size={14} />
                </button>
              </div>

              <div className="pt-12 space-y-8 border-t border-white/5">
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 font-bold">
                      {i === 0 ? 'JD' : 'MK'}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm uppercase tracking-wider">{i === 0 ? 'John Doe' : 'Mark K.'}</span>
                        <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">2 hours ago</span>
                      </div>
                      <p className="text-sm text-[var(--color-text-primary)]/60 leading-relaxed">
                        {i === 0 
                          ? "Really helpful guide on the knee protection. I was confused about the sizing but the FAQ cleared it up perfectly!" 
                          : "Does the kinesiology tape come in different colors? I'm looking for something that matches my team kit."}
                      </p>
                      <div className="flex items-center gap-6 pt-2">
                        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-neon-green transition-colors">
                          <ThumbsUp size={12} /> {t.communityPage.discussion.like}
                        </button>
                        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-hot-pink transition-colors">
                          <MessageCircle size={12} /> {t.communityPage.discussion.reply}
                        </button>
                        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors">
                          <Share2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative overflow-hidden bg-neon-green p-12 md:p-24 text-dodowa-black text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="w-full h-full border-r border-t border-black rotate-12 -translate-x-1/2" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display uppercase mb-6 leading-tight">
              {t.communityPage.cta.title}
            </h2>
            <p className="text-dodowa-black/70 mb-12 font-medium">
              {t.communityPage.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t.communityPage.cta.placeholder}
                className="flex-1 bg-white/20 border border-black/10 px-6 py-4 text-sm placeholder:text-black/40 outline-none focus:bg-white/30 transition-all"
              />
              <button className="bg-dodowa-black text-neon-green px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-black/90 transition-all">
                {t.communityPage.cta.button}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommunityPage;
