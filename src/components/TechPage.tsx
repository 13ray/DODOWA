import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Wind, 
  Activity, 
  Scissors, 
  Target, 
  Palette,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';

interface TechPageProps {
  t: any;
  onShop?: () => void;
}

const TechPage: React.FC<TechPageProps> = ({ t, onShop }) => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const icons = [
    <Shield className="text-neon-green" size={24} />,
    <Zap className="text-hot-pink" size={24} />,
    <Wind className="text-neon-green" size={24} />,
    <Activity className="text-hot-pink" size={24} />,
    <Scissors className="text-neon-green" size={24} />,
    <Target className="text-hot-pink" size={24} />,
    <Palette className="text-neon-green" size={24} />
  ];

  const images = [
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1476531131144-cbb11034992e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1520156584141-24bd239789c6?auto=format&fit=crop&q=80&w=800"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const currentSection = sectionRefs.current.findIndex((ref) => {
        if (!ref) return false;
        const top = ref.offsetTop;
        const bottom = top + ref.offsetHeight;
        return scrollPosition >= top && scrollPosition < bottom;
      });
      if (currentSection !== -1 && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (index: number) => {
    const ref = sectionRefs.current[index];
    if (ref) {
      window.scrollTo({
        top: ref.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-32 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-32">
        <div className="max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-neon-green font-bold uppercase tracking-[0.4em] text-xs mb-6 block"
          >
            Engineering Excellence
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-display uppercase mb-8 leading-none"
          >
            {t.techPage.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-[var(--color-text-primary)]/60 leading-relaxed max-w-2xl"
          >
            {t.techPage.intro}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Sticky Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-4">Core Technologies</p>
                {t.techPage.sections.map((section: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className={`group flex items-center gap-4 w-full text-left py-2 transition-all ${activeSection === index ? 'text-neon-green' : 'text-white/40 hover:text-white'}`}
                  >
                    <span className={`w-1 h-1 rounded-full transition-all ${activeSection === index ? 'bg-neon-green scale-[3]' : 'bg-white/20 group-hover:bg-white/40'}`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{section.title}</span>
                  </button>
                ))}
              </div>

              <div className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Info size={14} className="text-hot-pink" /> Tech Specs
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                    <span className="opacity-40">Breathability</span>
                    <span className="text-neon-green">98%</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                    <span className="opacity-40">Durability</span>
                    <span className="text-neon-green">High</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                    <span className="opacity-40">Weight</span>
                    <span className="text-neon-green">Ultra-Light</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-40">
            {t.techPage.sections.map((section: any, index: number) => (
              <section 
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="scroll-mt-32"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                  {/* Visual Content */}
                  <div className="md:col-span-7">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] group">
                      <img 
                        src={images[index]} 
                        alt={section.title} 
                        className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Hotspot Simulation */}
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-neon-green rounded-full shadow-[0_0_20px_rgba(156,255,26,0.5)]"
                      />
                      
                      <div className="absolute bottom-8 left-8 flex items-center gap-4">
                        <div className="w-12 h-12 bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center">
                          {icons[index]}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Innovation {index + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Textual Content */}
                  <div className="md:col-span-5 space-y-6 pt-4">
                    <h2 className="text-4xl font-display uppercase leading-tight">
                      {section.title}
                    </h2>
                    <div className="h-1 w-12 bg-hot-pink" />
                    <p className="text-lg text-[var(--color-text-primary)]/60 leading-relaxed">
                      {section.content}
                    </p>
                    
                    <ul className="space-y-4 pt-4">
                      <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/40">
                        <CheckCircle2 size={16} className="text-neon-green" /> Precision Engineered
                      </li>
                      <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/40">
                        <CheckCircle2 size={16} className="text-neon-green" /> Athlete Tested
                      </li>
                      <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/40">
                        <CheckCircle2 size={16} className="text-neon-green" /> Maximum Durability
                      </li>
                    </ul>

                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neon-green hover:translate-x-2 transition-transform pt-4">
                      Learn More <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="container mx-auto px-6 mt-40">
        <div className="bg-neon-green p-16 md:p-24 text-dodowa-black text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-black/10 rotate-45 translate-x-1/2 -translate-y-1/2" />
          <h2 className="text-5xl md:text-7xl font-display uppercase mb-8 relative z-10">Experience the Tech</h2>
          <button 
            onClick={onShop}
            className="bg-dodowa-black text-neon-green px-12 py-5 font-bold uppercase tracking-[0.2em] text-sm hover:glow-green transition-all relative z-10"
          >
            Shop the Collection
          </button>
        </div>
      </section>
    </div>
  );
};

export default TechPage;
