import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Package, 
  Truck, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

interface UserAccountPageProps {
  t: any;
  onNavigate: (type: string, params?: any) => void;
}

type AccountSection = 'dashboard' | 'profile' | 'addresses' | 'settings';

const UserAccountPage: React.FC<UserAccountPageProps> = ({ t, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<AccountSection>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: t.account.title, icon: User },
    { id: 'profile', label: t.account.sidebar.profile, icon: User },
    { id: 'addresses', label: t.account.sidebar.addresses, icon: MapPin },
    { id: 'settings', label: t.account.sidebar.settings, icon: Settings },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardSection t={t} setActiveSection={setActiveSection} onNavigate={onNavigate} />;
      case 'profile': return <ProfileSection t={t} />;
      case 'addresses': return <AddressesSection t={t} />;
      case 'settings': return <SettingsSection t={t} />;
      default: return <DashboardSection t={t} setActiveSection={setActiveSection} onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg-primary)]">
      <div className="container mx-auto px-4">
        {/* Mobile Header */}
        <div className="lg:hidden mb-8">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-4 flex items-center justify-between rounded-xl"
          >
            <div className="flex items-center gap-3">
              {React.createElement(menuItems.find(m => m.id === activeSection)?.icon || User, { size: 20, className: "text-neon-green" })}
              <span className="font-bold uppercase tracking-widest text-sm">
                {menuItems.find(m => m.id === activeSection)?.label}
              </span>
            </div>
            <ChevronRight size={20} className={`transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-[var(--color-bg-secondary)] border-x border-b border-[var(--color-border-subtle)] rounded-b-xl"
              >
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id as AccountSection);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full p-4 flex items-center gap-3 text-sm font-bold uppercase tracking-widest border-t border-[var(--color-border-subtle)] ${activeSection === item.id ? 'text-neon-green bg-neon-green/5' : 'text-[var(--color-text-primary)]/60'}`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
                <button className="w-full p-4 flex items-center gap-3 text-sm font-bold uppercase tracking-widest border-t border-[var(--color-border-subtle)] text-hot-pink">
                  <LogOut size={18} />
                  {t.account.sidebar.logout}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-2">
              <div className="mb-8 px-4">
                <h2 className="text-2xl font-display text-neon-green mb-1">{t.account.title}</h2>
                <p className="text-[10px] text-[var(--color-text-primary)]/40 uppercase tracking-[0.2em] font-bold">Member since 2024</p>
              </div>
              
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as AccountSection)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                      activeSection === item.id 
                        ? 'bg-neon-green text-dodowa-black font-bold shadow-[0_10px_20px_rgba(156,255,26,0.2)]' 
                        : 'text-[var(--color-text-primary)]/60 hover:text-neon-green hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={20} className={activeSection === item.id ? 'text-dodowa-black' : 'group-hover:text-neon-green'} />
                    <span className="text-xs uppercase tracking-widest">{item.label}</span>
                    {activeSection === item.id && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 bg-dodowa-black rounded-full" />}
                  </button>
                ))}
                
                <div className="pt-4 mt-4 border-t border-[var(--color-border-subtle)]">
                  <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-hot-pink hover:bg-hot-pink/5 transition-all group">
                    <LogOut size={20} />
                    <span className="text-xs uppercase tracking-widest">{t.account.sidebar.logout}</span>
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
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
          </main>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Section ---
const DashboardSection = ({ t, setActiveSection, onNavigate }: { t: any, setActiveSection: (s: AccountSection) => void, onNavigate: (type: string) => void }) => {
  const recentOrders = [
    { id: 'DDW-8291', date: '2024-03-15', status: 'delivered', total: 124.50, items: 2 },
    { id: 'DDW-7102', date: '2024-02-28', status: 'shipped', total: 45.00, items: 1 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-8 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-neon-green/10 transition-colors duration-700" />
        <div className="relative z-10">
          <h1 className="text-3xl font-display mb-2">{t.account.welcome} <span className="text-neon-green">Alex</span></h1>
          <p className="text-[var(--color-text-primary)]/60 text-sm max-w-md">{t.account.dashboard.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button onClick={() => onNavigate('cart')} className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-6 rounded-2xl text-left hover:border-neon-green transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-neon-green/10 rounded-full flex items-center justify-center text-neon-green group-hover:scale-110 transition-transform">
              <Package size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40">Total Orders</span>
          </div>
          <p className="text-3xl font-display">12</p>
        </button>
        <button onClick={() => onNavigate('cart')} className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-6 rounded-2xl text-left hover:border-neon-green transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-hot-pink/10 rounded-full flex items-center justify-center text-hot-pink group-hover:scale-110 transition-transform">
              <Heart size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40">Saved Items</span>
          </div>
          <p className="text-3xl font-display">8</p>
        </button>
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
              <MapPin size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40">Saved Addresses</span>
          </div>
          <p className="text-3xl font-display">2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest">{t.account.dashboard.recentOrders}</h3>
            <button onClick={() => onNavigate('cart')} className="text-[10px] font-bold uppercase tracking-widest text-neon-green hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} onClick={() => onNavigate('cart')} className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-4 rounded-xl flex items-center justify-between group hover:border-neon-green/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--color-bg-primary)] rounded-lg flex items-center justify-center text-[var(--color-text-primary)]/20">
                    <Package size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest">{order.id}</h4>
                    <p className="text-[10px] text-[var(--color-text-primary)]/40">{order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-neon-green/10 text-neon-green' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {order.status}
                  </span>
                  <p className="text-xs font-bold mt-1">SGD {order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest">{t.account.dashboard.quickActions}</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => onNavigate('cart')} className="p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] rounded-xl text-left hover:border-neon-green transition-all group">
              <Package size={20} className="text-neon-green mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest block">{t.account.dashboard.viewOrders}</span>
            </button>
            <button onClick={() => onNavigate('cart')} className="p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] rounded-xl text-left hover:border-neon-green transition-all group">
              <Truck size={20} className="text-neon-green mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest block">{t.account.dashboard.trackShipment}</span>
            </button>
            <button onClick={() => setActiveSection('addresses')} className="p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] rounded-xl text-left hover:border-neon-green transition-all group">
              <MapPin size={20} className="text-neon-green mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest block">{t.account.dashboard.editAddress}</span>
            </button>
            <button onClick={() => setActiveSection('settings')} className="p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] rounded-xl text-left hover:border-neon-green transition-all group">
              <Settings size={20} className="text-neon-green mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest block">{t.account.dashboard.manageAccount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Profile Section ---
const ProfileSection = ({ t }: { t: any }) => {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-2xl font-display mb-2">{t.account.profile.title}</h2>
        <p className="text-[var(--color-text-primary)]/40 text-xs uppercase tracking-widest font-bold">Manage your personal information</p>
      </div>

      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-8 rounded-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40">{t.account.profile.fullName}</label>
            <input 
              type="text" 
              defaultValue="Alex Richardson"
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] px-4 py-3 text-sm rounded-xl focus:border-neon-green outline-none transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40">{t.account.profile.email}</label>
            <input 
              type="email" 
              defaultValue="alex.r@example.com"
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] px-4 py-3 text-sm rounded-xl focus:border-neon-green outline-none transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40">{t.account.profile.phone}</label>
            <input 
              type="tel" 
              defaultValue="+65 8123 4567"
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] px-4 py-3 text-sm rounded-xl focus:border-neon-green outline-none transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40">{t.account.profile.dob}</label>
            <input 
              type="date" 
              defaultValue="1992-05-20"
              className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] px-4 py-3 text-sm rounded-xl focus:border-neon-green outline-none transition-all" 
            />
          </div>
        </div>

        <div className="pt-4">
          <button className="bg-neon-green text-dodowa-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:glow-green transition-all">
            {t.account.profile.save}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Addresses Section ---
const AddressesSection = ({ t }: { t: any }) => {
  const addresses = [
    { id: '1', name: 'Alex Richardson', address: '123 Marina Bay Sands, Tower 1, #45-01', city: 'Singapore', postal: '018971', phone: '+65 8123 4567', isDefault: true },
    { id: '2', name: 'Alex Richardson', address: '88 Orchard Road, ION Orchard, #04-12', city: 'Singapore', postal: '238801', phone: '+65 8123 4567', isDefault: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display mb-2">{t.account.addresses.title}</h2>
          <p className="text-[var(--color-text-primary)]/40 text-xs uppercase tracking-widest font-bold">Manage your shipping destinations</p>
        </div>
        <button className="bg-neon-green text-dodowa-black px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:glow-green transition-all flex items-center gap-2">
          <Plus size={16} /> {t.account.addresses.addNew}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className={`bg-[var(--color-bg-secondary)] border p-6 rounded-2xl space-y-4 relative group ${addr.isDefault ? 'border-neon-green' : 'border-[var(--color-border-subtle)]'}`}>
            {addr.isDefault && (
              <div className="absolute top-4 right-4 bg-neon-green text-dodowa-black px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">
                {t.account.addresses.default}
              </div>
            )}
            <div className="space-y-1">
              <h4 className="text-sm font-bold uppercase tracking-widest">{addr.name}</h4>
              <p className="text-xs text-[var(--color-text-primary)]/60 leading-relaxed">
                {addr.address}<br />
                {addr.city}, {addr.postal}<br />
                {addr.phone}
              </p>
            </div>
            <div className="pt-4 flex items-center gap-4 border-t border-[var(--color-border-subtle)]">
              <button className="text-[10px] font-bold uppercase tracking-widest text-neon-green flex items-center gap-1.5 hover:underline">
                <Edit2 size={12} /> {t.account.addresses.edit}
              </button>
              <button className="text-[10px] font-bold uppercase tracking-widest text-hot-pink flex items-center gap-1.5 hover:underline">
                <Trash2 size={12} /> {t.account.addresses.delete}
              </button>
              {!addr.isDefault && (
                <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]/40 ml-auto hover:text-neon-green transition-colors">
                  {t.account.addresses.setDefault}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Settings Section ---
const SettingsSection = ({ t }: { t: any }) => {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-2xl font-display mb-2">{t.account.settings.title}</h2>
        <p className="text-[var(--color-text-primary)]/40 text-xs uppercase tracking-widest font-bold">Preferences and security</p>
      </div>

      <div className="space-y-6">
        {/* Security */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-6 rounded-2xl flex items-center justify-between group hover:border-neon-green/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-[var(--color-text-primary)]/40 group-hover:text-neon-green transition-colors">
              <Settings size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest">{t.account.settings.changePassword}</h4>
              <p className="text-[10px] text-[var(--color-text-primary)]/40">Last changed 3 months ago</p>
            </div>
          </div>
          <button className="text-[var(--color-text-primary)]/40 hover:text-neon-green transition-colors"><ChevronRight size={20} /></button>
        </div>

        {/* Communication */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-6 rounded-2xl flex items-center justify-between group hover:border-neon-green/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-[var(--color-text-primary)]/40 group-hover:text-neon-green transition-colors">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest">{t.account.settings.commPrefs}</h4>
              <p className="text-[10px] text-[var(--color-text-primary)]/40">Email, SMS, and Push notifications</p>
            </div>
          </div>
          <button className="text-[var(--color-text-primary)]/40 hover:text-neon-green transition-colors"><ChevronRight size={20} /></button>
        </div>

        {/* Language */}
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] p-6 rounded-2xl flex items-center justify-between group hover:border-neon-green/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-[var(--color-text-primary)]/40 group-hover:text-neon-green transition-colors">
              <Settings size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest">{t.account.settings.langPrefs}</h4>
              <p className="text-[10px] text-[var(--color-text-primary)]/40">English (Singapore)</p>
            </div>
          </div>
          <button className="text-[var(--color-text-primary)]/40 hover:text-neon-green transition-colors"><ChevronRight size={20} /></button>
        </div>

        {/* Danger Zone */}
        <div className="pt-8 mt-8 border-t border-[var(--color-border-subtle)]">
          <button className="text-[10px] font-bold uppercase tracking-widest text-hot-pink/40 hover:text-hot-pink transition-colors flex items-center gap-2">
            <Trash2 size={14} /> {t.account.settings.deleteAccount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
