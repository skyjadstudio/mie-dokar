import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Calculator, 
  ShieldCheck, 
  HeartPulse, 
  MessageCircle, 
  Menu, 
  X,
  Award,
  ToggleRight,
  ToggleLeft
} from 'lucide-react';
import { BRAND_INFO } from '../data/productKnowledgeData';

export default function Navbar({ activeTab, setActiveTab, onOpenContact, healthyMode, setHealthyMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'tentang', label: 'Tentang Kami', icon: Sparkles },
    { id: 'masalah-solusi', label: 'Nilai Sehat', icon: HeartPulse },
    { id: 'produk', label: 'Produk Utama', icon: BookOpen },
    { id: 'kalkulator', label: 'Kalkulator Porsi', icon: Calculator },
    { id: 'kemitraan', label: 'Kemitraan & Klien', icon: Award },
    { id: 'legalitas', label: 'Sertifikasi', icon: ShieldCheck },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#1E3F33]/98 backdrop-blur-md shadow-xl border-b border-[#2D5A49] py-2.5 text-white' 
        : 'bg-[#1E3F33] py-3.5 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => { setActiveTab('tentang'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            {/* Official Dokar Logo Image */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0 border border-[#7A9C78]/50">
              <img
                src="/images/dokar_logo_official.png"
                alt="Logo Resmi Mie Reshik Cap Dokar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Typography Header */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-base tracking-tight text-white group-hover:text-[#A3D99B] transition-colors whitespace-nowrap font-display">
                  MIE RESHIK
                </span>
                <span className="text-[9.5px] uppercase font-black tracking-wider px-1.5 py-0.5 rounded-full bg-[#7A9C78]/30 text-[#A3D99B] border border-[#7A9C78]/60 whitespace-nowrap">
                  CAP DOKAR
                </span>
              </div>
              <p className="text-[10.5px] text-[#A3D99B]/90 font-medium whitespace-nowrap hidden 2xl:block">
                Makanan Sehat untuk Harimu
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-[#234E3E] p-1 rounded-full border border-[#2D5E4C] shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`btn-curved px-2.5 py-1.5 text-[11.5px] font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#7A9C78] text-white shadow-sm font-extrabold'
                      : 'text-[#D5E8D0] hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-3 h-3 ${isActive ? 'text-white' : 'text-[#A3D99B]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Slogan Switch Toggle - desktop only */}
            <button
              onClick={() => setHealthyMode(!healthyMode)}
              className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold transition-all duration-300 shrink-0 bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
              title="Klik untuk mengaktifkan mode sehat"
            >
              <div className={`w-2 h-2 rounded-full ${healthyMode ? 'bg-[#FAF7F2] animate-pulse' : 'bg-stone-400'}`} />
              <span className="whitespace-nowrap">Mode Sehat</span>
              {healthyMode ? (
                <ToggleRight className="w-3.5 h-3.5 text-white" />
              ) : (
                <ToggleLeft className="w-3.5 h-3.5 text-white/60" />
              )}
            </button>

            {/* Desktop Only CTA Hubungi Sales */}
            <button
              onClick={() => onOpenContact('Pemesanan & Kerjasama Mie Reshik Cap Dokar')}
              className="hidden xl:inline-flex btn-curved bg-[#7A9C78] hover:bg-[#688A66] text-white px-3.5 py-1.5 text-xs font-black shadow-md border border-[#8FB58D] whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Hubungi Sales / WA</span>
            </button>

            {/* Mobile / Tablet: Hamburger Menu Button ONLY */}
            <div className="flex xl:hidden items-center shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-full bg-[#234E3E] border border-[#2D5E4C] flex items-center justify-center text-white hover:bg-[#2A5C4A] shadow-md transition-all active:scale-95 shrink-0"
                aria-label="Menu Navigasi"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 p-4 bg-[#234E3E] rounded-3xl border border-[#2D5E4C] shadow-2xl animate-fadeIn">
            {/* Mobile Mode Sehat Toggle */}
            <div className="mb-3 pb-3 border-b border-[#2D5E4C]">
              <button
                onClick={() => setHealthyMode(!healthyMode)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all ${
                  healthyMode ? 'bg-[#7A9C78] text-white' : 'bg-[#1E3F33] text-white'
                }`}
              >
                <span>Aktifkan Mode Sehatmu</span>
                {healthyMode ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl text-xs font-semibold text-left transition-all ${
                      isActive
                        ? 'bg-[#7A9C78] text-white font-bold shadow-xs'
                        : 'bg-[#1E3F33] text-[#D5E8D0] hover:bg-[#2A5C4A]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#A3D99B]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact('Pemesanan Produk Mie Dokar');
              }}
              className="w-full btn-curved bg-[#7A9C78] hover:bg-[#688A66] text-white py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Sales (WA Langsung)</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
