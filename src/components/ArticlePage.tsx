import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';

interface ArticlePageProps {
  t: any;
  articleId: string;
  onBack: () => void;
  onNavigateToArticle: (id: string) => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ t, articleId, onBack, onNavigateToArticle }) => {
  // Find the article in the translations (search both articles and guides)
  const allItems = [
    ...t.communityPage.articles.items,
    ...t.communityPage.guides.items
  ];
  const article = allItems.find((item: any) => item.id === articleId);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] pt-32">
        <div className="text-center">
          <h2 className="text-2xl font-display mb-4">Article Not Found</h2>
          <button onClick={onBack} className="text-neon-green flex items-center gap-2 mx-auto">
            <ArrowLeft size={18} /> Back to Community
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-text-primary)]/40 hover:text-neon-green transition-colors mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Community
        </button>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-hot-pink">
                <Tag size={12} /> {article.category}
              </span>
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                <Calendar size={12} /> {article.date}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display uppercase leading-tight mb-8">
              {article.title}
            </h1>
          </header>

          {/* Featured Image */}
          <div className="aspect-[21/9] overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] mb-16">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-8">
              {article.content.map((paragraph: string, idx: number) => (
                <p key={idx} className="text-lg text-[var(--color-text-primary)]/70 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              
              <div className="pt-12 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">Share this article</span>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-neon-green hover:text-dodowa-black transition-all">
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-8">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Related Content</h4>
                <div className="space-y-6">
                  {allItems
                    .filter((item: any) => item.id !== articleId)
                    .slice(0, 4)
                    .map((item: any) => (
                      <button 
                        key={item.id}
                        onClick={() => onNavigateToArticle(item.id)}
                        className="group text-left block w-full"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest text-hot-pink mb-2 block">{item.category}</span>
                        <h5 className="text-sm font-bold uppercase tracking-tight group-hover:text-neon-green transition-colors line-clamp-2">{item.title}</h5>
                      </button>
                    ))}
                </div>
              </div>

              <div className="bg-neon-green p-8 text-dodowa-black">
                <h4 className="text-lg font-display uppercase mb-4">Join the Movement</h4>
                <p className="text-sm mb-6 font-medium">Get the latest training tips and recovery guides delivered to your inbox.</p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full bg-white/20 border border-black/10 px-4 py-3 text-xs placeholder:text-black/40 outline-none"
                  />
                  <button className="w-full bg-dodowa-black text-neon-green py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black/90 transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
