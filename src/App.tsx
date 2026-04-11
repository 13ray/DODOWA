/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Search, 
  User, 
  ShoppingBag, 
  MessageSquare, 
  ChevronRight, 
  ArrowRight, 
  Plus, 
  Minus, 
  Send, 
  X,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Menu,
  Info,
  Activity,
  Shield,
  Zap,
  Wind,
  Languages,
  ChevronDown
} from 'lucide-react';
import { translations } from './translations';
import CollectionPage from './components/CollectionPage';
import TechPage from './components/TechPage';
import CommunityPage from './components/CommunityPage';
import ArticlePage from './components/ArticlePage';
import FAQPage from './components/FAQPage';
import SizeGuidePage from './components/SizeGuidePage';
import ProductDetailPage from './components/ProductDetailPage';
import UserAccountPage from './components/UserAccountPage';
import CartPage from './components/CartPage';

// --- Components ---

const AnnouncementBar = ({ t }: { t: any }) => {
  const text = t.announcement;
  return (
    <div className="bg-neon-green text-dodowa-black h-7 flex items-center overflow-hidden whitespace-pre fixed top-0 left-0 right-0 z-[60] border-b border-black/10">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 180, ease: "linear" }}
        className="flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] px-4 flex items-center shrink-0">
          {Array(20).fill(text).join(" ")}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] px-4 flex items-center shrink-0">
          {Array(20).fill(text).join(" ")}
        </span>
      </motion.div>
    </div>
  );
};

const NavDropdown = ({ title, children, isMega = false, onClick }: { title: string, children: React.ReactNode, isMega?: boolean, onClick?: (e: React.MouseEvent) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        onClick={onClick}
        className={`flex items-center gap-1.5 transition-colors py-4 cursor-pointer ${isOpen ? 'text-neon-green' : 'hover:text-neon-green'}`}
      >
        {title}
        <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={`absolute top-full ${isMega ? 'left-[-200px] w-[900px]' : 'left-0 min-w-[220px]'} bg-[var(--color-bg-primary)]/95 backdrop-blur-2xl border border-[var(--color-border-subtle)] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-[70] mt-0`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = ({ 
  t, 
  onNavigate,
  onLogoClick,
  hasShippingUpdates
}: { 
  t: any, 
  onNavigate: (type: string) => void,
  onLogoClick: () => void,
  hasShippingUpdates: boolean
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileAccordion, setActiveMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileAccordion = (id: string) => {
    setActiveMobileAccordion(activeMobileAccordion === id ? null : id);
  };

  const handleNavClick = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    onNavigate(type);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-7 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[var(--color-bg-primary)]/90 backdrop-blur-md py-2 border-b border-[var(--color-border-subtle)]' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <button 
            onClick={(e) => { e.preventDefault(); onLogoClick(); }} 
            className="text-3xl font-display text-neon-green tracking-normal cursor-pointer"
          >
            DODOWA
          </button>
          
          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/70">
            {/* Products Mega Menu */}
            <NavDropdown title={t.nav.products} isMega onClick={(e) => handleNavClick(e, 'all')}>
              <div className="grid grid-cols-3 gap-12">
                <div>
                  <h4 className="text-neon-green text-[10px] tracking-[0.3em] mb-6 border-b border-neon-green/20 pb-2">{t.nav.protection}</h4>
                  <ul className="space-y-4">
                    <li><button onClick={(e) => handleNavClick(e, 'knee')} className="text-sm font-medium hover:text-neon-green transition-colors block text-left w-full">{t.nav.knee}</button></li>
                    <li><button onClick={(e) => handleNavClick(e, 'waist')} className="text-sm font-medium hover:text-neon-green transition-colors block text-left w-full">{t.nav.waist}</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-hot-pink text-[10px] tracking-[0.3em] mb-6 border-b border-hot-pink/20 pb-2">{t.nav.sport}</h4>
                  <ul className="space-y-4">
                    <li><button onClick={(e) => handleNavClick(e, 'running')} className="text-sm font-medium hover:text-neon-green transition-colors block text-left w-full">{t.nav.running}</button></li>
                    <li><button onClick={(e) => handleNavClick(e, 'basketball')} className="text-sm font-medium hover:text-neon-green transition-colors block text-left w-full">{t.nav.basketball}</button></li>
                    <li><button onClick={(e) => handleNavClick(e, 'frisbee')} className="text-sm font-medium hover:text-neon-green transition-colors block text-left w-full">{t.nav.frisbee}</button></li>
                    <li><button onClick={(e) => handleNavClick(e, 'football')} className="text-sm font-medium hover:text-neon-green transition-colors block text-left w-full">{t.nav.football}</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[var(--color-text-primary)] text-[10px] tracking-[0.3em] mb-6 border-b border-[var(--color-border-subtle)] pb-2">{t.nav.taping}</h4>
                  <ul className="space-y-4">
                    <li><button onClick={(e) => handleNavClick(e, 'taping')} className="text-sm font-medium hover:text-neon-green transition-colors block text-left w-full">{t.nav.allTaping}</button></li>
                  </ul>
                </div>
              </div>
            </NavDropdown>

            <button 
              onClick={(e) => handleNavClick(e, 'tech')} 
              className="hover:text-neon-green transition-colors py-4 text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/70"
            >
              {t.nav.tech}
            </button>

            {/* Community Dropdown */}
            <NavDropdown 
              title={t.nav.community}
              onClick={(e) => handleNavClick(e, 'community')}
            >
              <ul className="space-y-4">
                <li><button onClick={(e) => handleNavClick(e, 'faq')} className="text-sm font-medium hover:text-neon-green transition-colors block text-left w-full">{t.nav.faq}</button></li>
                <li><button onClick={(e) => handleNavClick(e, 'community')} className="text-sm font-medium hover:text-neon-green transition-colors block text-left w-full">{t.nav.reviews}</button></li>
                <li><button onClick={(e) => handleNavClick(e, 'community')} className="text-sm font-medium hover:text-neon-green transition-colors block text-left w-full">{t.nav.guides}</button></li>
                <li><button onClick={(e) => handleNavClick(e, 'community')} className="text-sm font-medium hover:text-neon-green transition-colors block text-left w-full">{t.nav.articles}</button></li>
              </ul>
            </NavDropdown>
          </nav>

          {/* Search Bar - Glass Liquid Effect */}
          <div className="relative hidden xl:flex items-center ml-4">
            <Search size={14} className="absolute left-4 text-[var(--color-text-primary)]/60 z-10" />
            <input 
              type="text" 
              placeholder={t.nav.search} 
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full pl-11 pr-6 py-2 text-[10px] uppercase font-bold tracking-widest outline-none focus:border-neon-green/50 focus:bg-white/15 transition-all w-80 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-primary)]/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="xl:hidden hover:text-neon-green transition-colors"><Search size={20} /></button>
          <button 
            onClick={() => onNavigate('account')}
            className="hover:text-neon-green transition-colors"
          >
            <User size={20} />
          </button>
          <button 
            onClick={() => onNavigate('cart')}
            className="relative hover:text-neon-green transition-colors"
          >
            <ShoppingBag size={20} />
            {hasShippingUpdates && (
              <span className="absolute -top-0.5 -right-0.5 bg-hot-pink w-2.5 h-2.5 rounded-full border-2 border-[var(--color-bg-primary)] shadow-[0_0_10px_rgba(232,36,132,0.5)]"></span>
            )}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden hover:text-neon-green transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-[calc(1.75rem+56px)] bg-[var(--color-bg-primary)] z-40 lg:hidden overflow-y-auto"
          >
            <div className="p-6 space-y-4">
              {/* Mobile Products Accordion */}
              <div className="border-b border-[var(--color-border-subtle)] pb-4">
                <button 
                  onClick={() => toggleMobileAccordion('products')}
                  className="flex items-center justify-between w-full text-lg font-bold uppercase tracking-widest py-2"
                >
                  {t.nav.products}
                  <ChevronDown size={20} className={`transition-transform ${activeMobileAccordion === 'products' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeMobileAccordion === 'products' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 mt-4 space-y-6"
                    >
                      <button 
                        onClick={(e) => handleNavClick(e, 'all')} 
                        className="text-sm font-bold text-neon-green hover:underline transition-colors text-left border-b border-neon-green/20 pb-2 mb-2 w-full flex items-center justify-between pr-4"
                      >
                        {t.collection.title}
                        <ArrowRight size={14} />
                      </button>
                      <div>
                        <h4 className="text-neon-green text-[10px] tracking-[0.3em] mb-4 uppercase">{t.nav.protection}</h4>
                        <ul className="space-y-3">
                          <li><button onClick={(e) => handleNavClick(e, 'knee')} className="text-sm text-[var(--color-text-primary)]/70 text-left w-full">{t.nav.knee}</button></li>
                          <li><button onClick={(e) => handleNavClick(e, 'waist')} className="text-sm text-[var(--color-text-primary)]/70 text-left w-full">{t.nav.waist}</button></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-hot-pink text-[10px] tracking-[0.3em] mb-4 uppercase">{t.nav.sport}</h4>
                        <ul className="space-y-3">
                          <li><button onClick={(e) => handleNavClick(e, 'running')} className="text-sm text-[var(--color-text-primary)]/70 text-left w-full">{t.nav.running}</button></li>
                          <li><button onClick={(e) => handleNavClick(e, 'basketball')} className="text-sm text-[var(--color-text-primary)]/70 text-left w-full">{t.nav.basketball}</button></li>
                          <li><button onClick={(e) => handleNavClick(e, 'frisbee')} className="text-sm text-[var(--color-text-primary)]/70 text-left w-full">{t.nav.frisbee}</button></li>
                          <li><button onClick={(e) => handleNavClick(e, 'football')} className="text-sm text-[var(--color-text-primary)]/70 text-left w-full">{t.nav.football}</button></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[var(--color-text-primary)]/40 text-[10px] tracking-[0.3em] mb-4 uppercase">{t.nav.taping}</h4>
                        <ul className="space-y-3">
                          <li><button onClick={(e) => handleNavClick(e, 'taping')} className="text-sm text-[var(--color-text-primary)]/70 text-left w-full">{t.nav.allTaping}</button></li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={(e) => handleNavClick(e, 'tech')} 
                className="block w-full text-left text-lg font-bold uppercase tracking-widest py-4 border-b border-[var(--color-border-subtle)]"
              >
                {t.nav.tech}
              </button>

              {/* Mobile Community Accordion */}
              <div className="border-b border-[var(--color-border-subtle)] pb-4">
                <button 
                  onClick={() => toggleMobileAccordion('community')}
                  className="flex items-center justify-between w-full text-lg font-bold uppercase tracking-widest py-2"
                >
                  {t.nav.community}
                  <ChevronDown size={20} className={`transition-transform ${activeMobileAccordion === 'community' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeMobileAccordion === 'community' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4 mt-4 space-y-4"
                    >
                      <button onClick={(e) => handleNavClick(e, 'faq')} className="block text-sm text-[var(--color-text-primary)]/70 text-left w-full">{t.nav.faq}</button>
                      <button onClick={(e) => handleNavClick(e, 'community')} className="block text-sm text-[var(--color-text-primary)]/70 text-left w-full">{t.nav.reviews}</button>
                      <button onClick={(e) => handleNavClick(e, 'community')} className="block text-sm text-[var(--color-text-primary)]/70 text-left w-full">{t.nav.guides}</button>
                      <button onClick={(e) => handleNavClick(e, 'community')} className="block text-sm text-[var(--color-text-primary)]/70 text-left w-full">{t.nav.articles}</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={(e) => handleNavClick(e, 'community')} 
                className="block w-full text-left text-lg font-bold uppercase tracking-widest py-4 border-b border-[var(--color-border-subtle)]"
              >
                {t.nav.contact}
              </button>

              <button 
                onClick={(e) => handleNavClick(e, 'account')} 
                className="block w-full text-left text-lg font-bold uppercase tracking-widest py-4 border-b border-[var(--color-border-subtle)] text-neon-green"
              >
                {t.account.title}
              </button>

              <button 
                onClick={(e) => handleNavClick(e, 'cart')} 
                className="block w-full text-left text-lg font-bold uppercase tracking-widest py-4 border-b border-[var(--color-border-subtle)] text-hot-pink relative"
              >
                {t.cart.title}
                {hasShippingUpdates && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 bg-hot-pink w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(232,36,132,0.5)]"></span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = ({ t, onExplore }: { t: any, onExplore: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--color-bg-primary)]">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/land.jpg" 
          alt="Ultimate Frisbee Action" 
          className="w-full h-full object-cover opacity-40 grayscale brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-[var(--color-bg-primary)]/50" />
        
        {/* Animated Accents */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-green/20 rounded-full blur-[120px]"
        />
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-display leading-[0.9] mb-6 tracking-normal max-w-4xl mx-auto">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-primary)]/70 max-w-2xl mx-auto mb-10 font-light tracking-wide">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onExplore}
              className="group relative bg-neon-green text-dodowa-black px-10 py-4 font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:glow-green"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.hero.cta} <ArrowRight size={18} />
              </span>
              <motion.div 
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--color-text-primary)]/30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.nav.scroll}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-text-primary)]/30 to-transparent" />
      </motion.div>
    </section>
  );
};

const ProtectionSection = ({ t, onShopKnee, onShopWaist }: { t: any, onShopKnee: () => void, onShopWaist: () => void }) => {
  return (
    <section id="protection" className="py-24 bg-[var(--color-bg-secondary)] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-display tracking-normal mb-4">{t.protection.title}</h2>
          <div className="h-1 w-24 bg-neon-green" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Knee Protection - Larger Emphasis */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-8 relative h-[600px] overflow-hidden group"
          >
            <img 
              src="/landing.jpg" 
              alt="Knee Protection" 
              className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-xl">
              <span className="text-neon-green font-bold uppercase tracking-[0.3em] text-xs mb-4">{t.protection.tag}</span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">{t.protection.knee.title}</h3>
              <p className="text-lg text-white/70 mb-8">{t.protection.knee.desc}</p>
              <button 
                onClick={onShopKnee}
                className="bg-neon-green text-dodowa-black px-8 py-4 font-bold uppercase tracking-widest text-xs w-fit hover:glow-green transition-all"
              >
                {t.protection.knee.cta}
              </button>
            </div>
          </motion.div>

          {/* Waist Protection - Smaller Emphasis */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-4 relative h-[600px] overflow-hidden group"
          >
            <img 
              src="/waisttt.jpg" 
              alt="Waist Protection" 
              className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <h3 className="text-2xl font-bold mb-4">{t.protection.waist.title}</h3>
              <p className="text-sm text-white/60 mb-6">{t.protection.waist.desc}</p>
              <button 
                onClick={onShopWaist}
                className="text-neon-green font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all"
              >
                {t.protection.waist.cta} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TapingSection = ({ t, onShopTaping }: { t: any, onShopTaping: () => void }) => {
  return (
    <section id="taping" className="py-24 bg-[var(--color-bg-primary)] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-square bg-[var(--color-bg-secondary)] p-4">
              <img 
                src="/tape2.jpg" 
                alt="Taping Application" 
                className="w-full h-full object-cover opacity-60 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-10 -right-10 w-40 h-40 border-r border-t border-hot-pink/30" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 border-l border-b border-neon-green/30" />
              
              {/* Floating Product Tags */}
              <div className="absolute top-1/4 left-1/4 bg-black/80 backdrop-blur-md border border-neon-green/30 p-3 text-[10px] font-bold uppercase tracking-widest">
                {t.taping.labels.kinesiology}
              </div>
              <div className="absolute bottom-1/3 right-1/4 bg-black/80 backdrop-blur-md border border-hot-pink/30 p-3 text-[10px] font-bold uppercase tracking-widest">
                {t.taping.labels.bandage}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-hot-pink font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t.taping.subtitle}</span>
            <h2 className="text-5xl md:text-7xl font-display tracking-normal mb-8">{t.taping.title}</h2>
            <p className="text-[var(--color-text-primary)]/60 text-lg mb-12 leading-relaxed">
              {t.taping.desc}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="p-6 border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/30">
                <h4 className="text-neon-green font-bold text-sm mb-2">{t.taping.labels.recovery}</h4>
                <p className="text-xs text-white/40">{t.taping.labels.recoveryDesc}</p>
              </div>
              <div className="p-6 border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/30">
                <h4 className="text-hot-pink font-bold text-sm mb-2">{t.taping.labels.prevention}</h4>
                <p className="text-xs text-white/40">{t.taping.labels.preventionDesc}</p>
              </div>
            </div>
            <button 
              onClick={onShopTaping}
              className="bg-hot-pink text-white px-10 py-4 font-bold uppercase tracking-widest text-xs hover:glow-pink transition-all"
            >
              {t.taping.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SportSection = ({ t, onExploreSport }: { t: any, onExploreSport: (sport: string) => void }) => {
  const sports = [
    { id: 'running', title: t.sports.running, image: "/1.jpg" },
    { id: 'basketball', title: t.sports.basketball, image: "/2.jpg" },
    { id: 'frisbee', title: t.sports.frisbee, image: "/4.jpg" },
    { id: 'football', title: t.sports.football, image: "/5.jpg" },
  ];

  return (
    <section id="sport" className="py-24 bg-[var(--color-bg-secondary)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-display tracking-normal mb-4">{t.sports.title}</h2>
          <p className="text-[var(--color-text-primary)]/40 uppercase tracking-[0.2em] text-xs">{t.sports.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sports.map((sport) => (
            <motion.div
              key={sport.id}
              onClick={() => onExploreSport(sport.id)}
              whileHover={{ y: -10 }}
              className="group relative h-[600px] overflow-hidden cursor-pointer"
            >
              <img 
                src="/1.jpg"
                alt={sport.title} 
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-green transition-colors">{sport.title}</h3>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  {t.sports.explore} <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechSection = ({ t, onExplore }: { t: any, onExplore: () => void }) => {
  const features = [
    { icon: <Zap size={24} />, title: t.tech.features[0].title, desc: t.tech.features[0].desc },
    { icon: <Shield size={24} />, title: t.tech.features[1].title, desc: t.tech.features[1].desc },
    { icon: <Wind size={24} />, title: t.tech.features[2].title, desc: t.tech.features[2].desc },
    { icon: <Activity size={24} />, title: t.tech.features[3].title, desc: t.tech.features[3].desc },
  ];

  return (
    <section className="py-24 bg-[var(--color-bg-secondary)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full border-l border-b border-neon-green/30 rotate-12 translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-hot-pink font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t.tech.tag}</span>
            <h2 className="text-5xl md:text-7xl mb-8">{t.tech.title} <span className="text-neon-green">{t.tech.accent}</span></h2>
            <p className="text-[var(--color-text-primary)]/60 text-lg mb-12 leading-relaxed">
              {t.tech.desc}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {features.map((f, i) => (
                <div key={i} className="group p-6 border border-[var(--color-text-primary)]/5 hover:border-neon-green/30 transition-all bg-[var(--color-bg-primary)]/20">
                  <div className="text-neon-green mb-4 group-hover:scale-110 transition-transform origin-left">{f.icon}</div>
                  <h4 className="text-lg mb-2">{f.title}</h4>
                  <p className="text-sm text-[var(--color-text-primary)]/40">{f.desc}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={onExplore}
              className="bg-[var(--color-bg-primary)] border border-neon-green text-neon-green px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-neon-green hover:text-dodowa-black transition-all"
            >
              {t.tech.cta}
            </button>
          </div>

          <div className="relative">
            <div className="aspect-square bg-[var(--color-bg-primary)] border border-[var(--color-text-primary)]/10 p-4 relative">
              <img 
                src="/7.jpg" 
                alt="Athlete training" 
                className="w-full h-full object-cover opacity-50 grayscale"
                referrerPolicy="no-referrer"
              />
              {/* Tech Hotspots */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-neon-green rounded-full glow-green cursor-pointer group">
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 p-2 bg-[var(--color-bg-primary)] border border-neon-green text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                  Reinforced Patella Stabilizer
                </div>
              </div>
              <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-hot-pink rounded-full glow-pink cursor-pointer group">
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 p-2 bg-[var(--color-bg-primary)] border border-hot-pink text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                  Breathable Mesh Zone
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-l border-b border-hot-pink/30" />
            <div className="absolute -top-10 -right-10 w-40 h-40 border-r border-t border-neon-green/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ArticlesSection = ({ t, onReadArticle }: { t: any, onReadArticle: (id: string) => void }) => {
  // Use the first 3 guides for the landing page preview
  const previewGuides = t.communityPage.guides.items.slice(0, 3);

  return (
    <section className="py-24 bg-[var(--color-bg-primary)] border-t border-[var(--color-border-subtle)]">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl mb-16">{t.communityPage.guides.title} <span className="text-neon-green">{t.communityPage.guides.accent}</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewGuides.map((guide: any, i: number) => (
            <div key={i} className="group cursor-pointer" onClick={() => onReadArticle(guide.id)}>
              <div className="aspect-[16/10] overflow-hidden mb-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]">
                <img 
                  src={guide.image} 
                  alt={guide.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-60 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl mb-3 group-hover:text-neon-green transition-colors uppercase font-bold tracking-tight">{guide.title}</h3>
              <p className="text-[var(--color-text-primary)]/50 text-sm mb-6 line-clamp-2">{guide.desc}</p>
              <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neon-green group-hover:translate-x-2 transition-transform">
                {t.communityPage.guides.readMore} <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = ({ t, onViewMore }: { t: any, onViewMore: () => void }) => {
  const reviews = [
    { 
      id: 1, 
      user: "Jacob K.", 
      text: "I found my knee supports to be comfortable. Enough compression to not restrict movement. Did a...", 
      rating: 5,
      image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=800",
      verified: true
    },
    { 
      id: 2, 
      user: "Simon H.", 
      text: "Following a recent knee injury and with an upcoming trip to the Lake District, I began searching...", 
      rating: 5,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=800",
      verified: true
    },
    { 
      id: 3, 
      user: "Emma M.", 
      text: "Having suffered either soft tissue damage in my foot / a stress fracture, for the first 3 weeks I...", 
      rating: 5,
      image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&q=80&w=800",
      verified: true
    },
    { 
      id: 4, 
      user: "Anonymous", 
      text: "Over trained causing knee pain. I had a race coming up which I didn't want to miss, this...", 
      rating: 5,
      image: "/6.jpg",
      verified: true
    },
  ];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <motion.span 
          key={i} 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className={`text-sm ${i < rating ? 'text-orange-500' : 'text-gray-300'}`}
        >
          ★
        </motion.span>
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-[var(--color-bg-primary)] border-t border-[var(--color-border-subtle)]">
      <div className="container mx-auto px-6">
        {/* Summary Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-orange-500 text-xl">★</span>
              ))}
            </div>
            <span className="text-xl font-bold">4.7/5</span>
            <span className="text-xl text-[var(--color-text-primary)]/40">|</span>
            <span className="text-xl font-bold">5,137</span>
            <span className="text-xl text-[var(--color-text-primary)]/40">Reviews</span>
          </div>
          <h2 className="text-3xl font-display uppercase tracking-widest text-neon-green">{t.reviews.title} <span className="text-[var(--color-text-primary)]">{t.reviews.accent}</span></h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <motion.div 
              key={review.id}
              whileHover={{ y: -5 }}
              className="bg-[var(--color-bg-primary)] rounded-lg overflow-hidden flex flex-col shadow-xl border border-[var(--color-border-subtle)]"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={review.image} 
                  alt={review.user} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[var(--color-bg-primary)] px-4 py-2 rounded-md shadow-lg border border-[var(--color-border-subtle)]">
                  <StarRating rating={review.rating} />
                </div>
              </div>
              
              <div className="pt-8 pb-6 px-6 text-center flex flex-col items-center">
                <div className="flex items-center gap-1 mb-4">
                  <span className="font-bold text-[var(--color-text-primary)]">{review.user}</span>
                  {review.verified && (
                    <div className="w-4 h-4 bg-[var(--color-text-primary)] rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-[var(--color-bg-primary)] fill-current">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-[var(--color-text-primary)]/60 text-sm leading-relaxed line-clamp-3">
                  {review.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button 
            onClick={onViewMore}
            className="group flex items-center gap-4 bg-[var(--color-text-primary)]/5 hover:bg-neon-green hover:text-dodowa-black px-8 py-4 rounded-full transition-all duration-300"
          >
            <span className="text-xs font-bold uppercase tracking-widest">{t.reviews.loadMore}</span>
            <div className="w-8 h-8 rounded-full border border-[var(--color-text-primary)]/20 flex items-center justify-center group-hover:border-dodowa-black">
              <ChevronRight size={16} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

const AIChatbot = ({ t }: { t: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: t.chatbot.botWelcome }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: t.chatbot.botGreeting }]);
    }, 1000);
  };

  const quickPrompts = t.chatbot.prompts;

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[350px] bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[var(--color-bg-primary)] p-4 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neon-green rounded-full flex items-center justify-center text-dodowa-black">
                  <Activity size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest">{t.chatbot.title}</h4>
                  <span className="text-[10px] text-neon-green flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" /> {t.chatbot.online}
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[var(--color-text-primary)]/40 hover:text-[var(--color-text-primary)] transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-[var(--color-bg-primary)]/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 text-xs leading-relaxed ${msg.role === 'user' ? 'bg-neon-green text-dodowa-black font-medium' : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]/80 border border-[var(--color-border-subtle)]'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="p-3 border-t border-[var(--color-border-subtle)] flex gap-2 overflow-x-auto no-scrollbar">
              {quickPrompts.map((p) => (
                <button 
                  key={p} 
                  onClick={() => { setInput(p); handleSend(); }}
                  className="whitespace-nowrap px-3 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] text-[10px] font-bold uppercase tracking-widest hover:border-neon-green transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-[var(--color-bg-primary)] border-t border-[var(--color-border-subtle)] flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.chatbot.placeholder} 
                className="flex-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] px-4 py-2 text-xs outline-none focus:border-neon-green transition-all" 
              />
              <button 
                onClick={handleSend}
                className="bg-neon-green text-dodowa-black p-2 hover:glow-green transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-hot-pink rotate-90' : 'bg-neon-green hover:glow-green'}`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageSquare size={24} className="text-dodowa-black" />}
      </button>
    </div>
  );
};

const Footer = ({ t, onNavigate }: { t: any, onNavigate: (type: string) => void }) => (
  <footer className="bg-[var(--color-bg-primary)] pt-24 pb-12 border-t border-[var(--color-border-subtle)]">
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center text-center mb-20">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-4xl font-display text-neon-green tracking-normal mb-8 block">DODOWA</button>
        <p className="text-[var(--color-text-primary)]/40 text-sm mb-12 max-w-md mx-auto">
          {t.footer.desc}
        </p>
        
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12">
          <button onClick={() => onNavigate('faq')} className="text-xs font-bold uppercase tracking-[0.3em] text-hot-pink hover:text-neon-green transition-colors">{t.nav.faq}</button>
          <button onClick={() => onNavigate('sizeGuide')} className="text-xs font-bold uppercase tracking-[0.3em] text-hot-pink hover:text-neon-green transition-colors">{t.footer.sizeGuide}</button>
        </div>

        <div className="flex gap-8">
          <a href="#" className="text-[var(--color-text-primary)]/20 hover:text-neon-green transition-all transform hover:scale-110"><Instagram size={20} /></a>
          <a href="#" className="text-[var(--color-text-primary)]/20 hover:text-neon-green transition-all transform hover:scale-110"><Twitter size={20} /></a>
          <a href="#" className="text-[var(--color-text-primary)]/20 hover:text-neon-green transition-all transform hover:scale-110"><Facebook size={20} /></a>
          <a href="#" className="text-[var(--color-text-primary)]/20 hover:text-neon-green transition-all transform hover:scale-110"><Youtube size={20} /></a>
        </div>
      </div>

      <div className="pt-12 border-t border-[var(--color-border-subtle)] flex flex-col md:flex-row items-center justify-center gap-8">
        <p className="text-[10px] text-[var(--color-text-primary)]/30 uppercase tracking-widest font-medium">{t.footer.rights}</p>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'landing' | 'collection' | 'tech' | 'community' | 'article' | 'faq' | 'sizeGuide' | 'shippingReturns' | 'product' | 'account' | 'cart'>('landing');
  const [collectionType, setCollectionType] = useState<string>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [faqTab, setFaqTab] = useState<'general' | 'shipping' | 'returns'>('general');
  const [communitySection, setCommunitySection] = useState<string>('faq');
  const [hasShippingUpdates, setHasShippingUpdates] = useState(true);
  const t = translations.en;

  const navigateToCollection = (type: string) => {
    setCollectionType(type);
    setView('collection');
    window.scrollTo(0, 0);
  };

  const navigateToTech = () => {
    setView('tech');
    window.scrollTo(0, 0);
  };

  const navigateToCommunity = (section: string = 'faq') => {
    setCommunitySection(section);
    setView('community');
    window.scrollTo(0, 0);
  };

  const navigateToFAQ = (tab: 'general' | 'shipping' | 'returns' = 'general') => {
    setFaqTab(tab);
    setView('faq');
    window.scrollTo(0, 0);
  };

  const navigateToSizeGuide = () => {
    setView('sizeGuide');
    window.scrollTo(0, 0);
  };

  const navigateToShippingReturns = () => {
    navigateToFAQ('shipping');
  };

  const navigateToArticle = (id: string) => {
    setSelectedArticleId(id);
    setView('article');
    window.scrollTo(0, 0);
  };

  const navigateToLanding = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  const navigateToAccount = () => {
    setView('account');
    window.scrollTo(0, 0);
  };

  const navigateToCart = () => {
    setView('cart');
    window.scrollTo(0, 0);
  };

  const navigateToProduct = (product: any) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo(0, 0);
  };

  const handleNavigation = (type: string, params?: any) => {
    if (type === 'tech') {
      navigateToTech();
    } else if (type === 'community') {
      navigateToCommunity();
    } else if (type === 'faq') {
      navigateToFAQ();
    } else if (type === 'sizeGuide') {
      navigateToSizeGuide();
    } else if (type === 'shippingReturns') {
      navigateToShippingReturns();
    } else if (type === 'account') {
      navigateToAccount();
    } else if (type === 'cart') {
      navigateToCart();
    } else if (type === 'product' && params?.product) {
      navigateToProduct(params.product);
    } else if (type === 'article' && params?.articleId) {
      navigateToArticle(params.articleId);
    } else {
      navigateToCollection(type);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] selection:bg-neon-green selection:text-dodowa-black pt-7">
      <AnnouncementBar t={t} />
      <Header 
        t={t} 
        onNavigate={handleNavigation}
        onLogoClick={navigateToLanding}
        hasShippingUpdates={hasShippingUpdates}
      />
      
      <main>
        {view === 'landing' ? (
          <>
            <Hero t={t} onExplore={() => navigateToCollection('all')} />
            
            <ProtectionSection t={t} onShopKnee={() => navigateToCollection('knee')} onShopWaist={() => navigateToCollection('waist')} />
            <TapingSection t={t} onShopTaping={() => navigateToCollection('taping')} />
            <SportSection t={t} onExploreSport={(sport) => navigateToCollection(sport)} />

            <TechSection t={t} onExplore={navigateToTech} />
            <ArticlesSection t={t} onReadArticle={navigateToArticle} />
            <ReviewsSection t={t} onViewMore={() => navigateToCommunity('reviews')} />
          </>
        ) : view === 'collection' ? (
          <CollectionPage t={t} initialCollection={collectionType} key={collectionType} onNavigate={handleNavigation} />
        ) : view === 'tech' ? (
          <TechPage t={t} onShop={() => navigateToCollection('all')} />
        ) : view === 'community' ? (
          <CommunityPage t={t} onReadArticle={navigateToArticle} initialSection={communitySection} />
        ) : view === 'faq' ? (
          <FAQPage t={t} initialTab={faqTab} key={faqTab} />
        ) : view === 'sizeGuide' ? (
          <SizeGuidePage t={t} onShop={() => navigateToCollection('all')} />
        ) : view === 'article' && selectedArticleId ? (
          <ArticlePage t={t} articleId={selectedArticleId} onBack={navigateToCommunity} onNavigateToArticle={navigateToArticle} />
        ) : view === 'product' && selectedProduct ? (
          <ProductDetailPage t={t} product={selectedProduct} onNavigate={handleNavigation} />
        ) : view === 'account' ? (
          <UserAccountPage t={t} onNavigate={handleNavigation} />
        ) : view === 'cart' ? (
          <CartPage t={t} onNavigate={handleNavigation} />
        ) : null}
      </main>

      <Footer t={t} onNavigate={handleNavigation} />
      <AIChatbot t={t} />
    </div>
  );
}
