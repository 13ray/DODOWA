import React from 'react';
import { motion } from 'motion/react';
import { Ruler, Info, CheckCircle2, ArrowRight } from 'lucide-react';

interface SizeGuidePageProps {
  t: any;
  onShop?: () => void;
}

const SizeGuidePage: React.FC<SizeGuidePageProps> = ({ t, onShop }) => {
  const sg = t.sizeGuide;
  const [activeTab, setActiveTab] = React.useState<'knee' | 'waist'>('knee');

  const activeChart = activeTab === 'knee' ? sg.kneeChart : sg.waistChart;
  const activeMeasurement = activeTab === 'knee' ? sg.kneeMeasurement : sg.waistMeasurement;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neon-green/10 border border-neon-green/20 rounded-full text-neon-green text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
          >
            <Ruler size={14} /> Fit Guide
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display uppercase mb-6"
          >
            {sg.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--color-text-primary)]/60 text-lg max-w-2xl mx-auto"
          >
            {sg.subtitle}
          </motion.p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab('knee')}
            className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all border ${
              activeTab === 'knee' 
                ? 'bg-neon-green text-dodowa-black border-neon-green' 
                : 'bg-transparent text-[var(--color-text-primary)]/40 border-[var(--color-border-subtle)] hover:border-neon-green/50 hover:text-[var(--color-text-primary)]'
            }`}
          >
            Knee Protection
          </button>
          <button
            onClick={() => setActiveTab('waist')}
            className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all border ${
              activeTab === 'waist' 
                ? 'bg-neon-green text-dodowa-black border-neon-green' 
                : 'bg-transparent text-[var(--color-text-primary)]/40 border-[var(--color-border-subtle)] hover:border-neon-green/50 hover:text-[var(--color-text-primary)]'
            }`}
          >
            Waist Protection
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Size Chart Section */}
          <motion.section 
            key={`${activeTab}-chart`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-neon-green"></div>
              <h2 className="text-2xl font-display uppercase tracking-wider">
                {activeTab === 'knee' ? 'Knee Size Chart' : 'Waist Size Chart'}
              </h2>
            </div>

            <div className="overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/30 backdrop-blur-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-subtle)] bg-white/5">
                    <th className="p-6 font-bold uppercase tracking-widest text-xs text-neon-green">{activeChart.size}</th>
                    <th className="p-6 font-bold uppercase tracking-widest text-xs text-neon-green">
                      {activeTab === 'knee' ? activeChart.thigh : activeChart.waist}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeChart.data.map((item: any, index: number) => (
                    <tr key={index} className="border-b border-[var(--color-border-subtle)] last:border-0 hover:bg-white/5 transition-colors">
                      <td className="p-6 font-display text-xl">{item.size}</td>
                      <td className="p-6 font-mono text-lg text-[var(--color-text-primary)]/80">{item.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-hot-pink/10 border border-hot-pink/20 flex gap-4">
              <Info className="text-hot-pink shrink-0" size={20} />
              <p className="text-sm text-hot-pink/90 leading-relaxed font-medium">
                {activeMeasurement.tip}
              </p>
            </div>
          </motion.section>

          {/* Measurement Method Section */}
          <motion.section 
            key={`${activeTab}-method`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-hot-pink"></div>
              <h2 className="text-2xl font-display uppercase tracking-wider">{activeMeasurement.title}</h2>
            </div>

            <div className="relative aspect-[4/5] bg-black border border-[var(--color-border-subtle)] overflow-hidden flex items-center justify-center p-8">
              {activeTab === 'knee' ? (
                /* SVG Illustration for Knee */
                <svg viewBox="0 0 500 600" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {/* Left Leg Silhouette */}
                  <path d="M100,80 L100,120 Q90,250 110,450 Q115,520 90,530 Q110,550 150,540 Q170,540 175,530 Q165,520 170,450 Q180,250 175,120 L175,80" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  
                  {/* Right Leg Silhouette (The one being measured) */}
                  <path d="M205,80 L205,120 Q200,250 210,450 Q215,520 190,530 Q210,550 250,540 Q270,540 275,530 Q265,520 270,450 Q290,250 280,120 L280,80" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  
                  {/* Kneecap Definition */}
                  <path d="M130,340 Q140,330 150,340" stroke="white" strokeOpacity="0.3" />
                  <path d="M230,340 Q240,330 250,340" stroke="white" strokeOpacity="0.3" />
                  
                  {/* Kneecap Center Mark (Green Dot) */}
                  <circle cx="242" cy="340" r="8" fill="#9CFF1A" stroke="none">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Measurement Point (Green Dot) */}
                  <circle cx="242" cy="180" r="8" fill="#9CFF1A" stroke="none">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Circular Measurement Line (Ellipse) */}
                  <ellipse cx="242" cy="180" rx="60" ry="15" stroke="white" strokeWidth="3" />
                  <path d="M182,180 Q242,160 302,180" stroke="#9CFF1A" strokeWidth="2" strokeOpacity="0.5" />
                  
                  {/* Horizontal Indicator Line for 16cm */}
                  <path d="M255,260 L330,260" stroke="white" strokeWidth="2" />
                  
                  {/* Text Label */}
                  <text x="340" y="272" fill="white" fontSize="36" fontWeight="900" className="font-sans">16cm</text>
                  
                  {/* Subtle vertical indicator of the 16cm span */}
                  <path d="M242,180 L242,340" stroke="white" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.2" />
                </svg>
              ) : (
                /* SVG Illustration for Waist - Based on the provided image */
                <svg viewBox="0 0 500 600" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  {/* Neck */}
                  <path d="M215,60 L215,110" stroke="white" strokeWidth="4" />
                  <path d="M285,60 L285,110" stroke="white" strokeWidth="4" />
                  
                  {/* Shoulders */}
                  <path d="M215,110 Q140,120 130,180" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <path d="M285,110 Q360,120 370,180" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Torso Side Lines */}
                  <path d="M175,220 L175,550" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <path d="M325,220 L325,550" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Arms */}
                  <path d="M130,180 L130,550" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <path d="M370,180 L370,550" stroke="white" strokeWidth="4" strokeLinecap="round" />

                  {/* Measurement Ring - Thick and 3D-ish */}
                  <ellipse cx="250" cy="400" rx="125" ry="22" stroke="white" strokeWidth="8" />
                  <ellipse cx="250" cy="400" rx="125" ry="22" stroke="black" strokeWidth="2" />
                  
                  {/* Green Dot */}
                  <circle cx="250" cy="400" r="15" fill="#9CFF1A" stroke="white" strokeWidth="3">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
                  </circle>

                  {/* *cm text */}
                  <text x="360" y="560" fill="white" fontSize="52" fontWeight="900" className="font-sans">*cm</text>
                </svg>
              )}

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[20px] border-transparent border-t-black border-l-black opacity-50"></div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-neon-green text-dodowa-black flex items-center justify-center font-bold shrink-0">1</div>
                <p className="text-[var(--color-text-primary)]/80 leading-relaxed">
                  {activeMeasurement.instruction}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-bold shrink-0">2</div>
                <p className="text-[var(--color-text-primary)]/60 text-sm italic">
                  {activeMeasurement.note}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-[var(--color-border-subtle)]">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-neon-green">Why Fit Matters</h4>
              <ul className="space-y-4">
                {[
                  "Optimal compression for blood flow",
                  "Prevents slipping during high-impact sports",
                  "Ensures joint stability and structural support",
                  "Maximizes moisture-wicking efficiency"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[var(--color-text-primary)]/70">
                    <CheckCircle2 size={16} className="text-neon-green" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-24 p-12 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-neon-green/10 transition-all duration-700"></div>
          
          <h3 className="text-3xl font-display uppercase mb-4 relative z-10">Ready to choose?</h3>
          <p className="text-[var(--color-text-primary)]/60 mb-8 max-w-xl mx-auto relative z-10">
            Now that you have your measurements, explore our collection of professional knee and waist protection.
          </p>
          <button 
            onClick={onShop}
            className="bg-neon-green text-dodowa-black px-10 py-4 font-bold uppercase tracking-widest text-xs hover:glow-green transition-all flex items-center gap-2 mx-auto relative z-10"
          >
            Shop Collection <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
