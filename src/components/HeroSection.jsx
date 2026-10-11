import React from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Scale, 
  Boxes, 
  HeartPulse, 
  Calculator, 
  ToggleRight, 
  ToggleLeft, 
  CheckCircle2 
} from 'lucide-react';
import { BRAND_INFO } from '../data/productKnowledgeData';

export default function HeroSection({ onNavigate, onOpenContact, healthyMode, setHealthyMode }) {
  return (
    <section className="relative bg-[#1E3F33] text-white pt-10 pb-16 overflow-hidden">
      
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7A9C78]/15 blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full bg-[#2E6B52]/20 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Main Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none uppercase font-display text-white">
                MIE RESHIK<br />
                <span className="text-[#A3D99B]">CAP DOKAR</span>
              </h1>
              <p className="text-lg sm:text-2xl font-bold tracking-wide text-[#D8EED4] mt-3 font-display">
                {BRAND_INFO.tagline}
              </p>
            </div>

            {/* Narrative description */}
            <p className="text-sm sm:text-base text-[#D0E2CE] leading-relaxed max-w-xl font-normal">
              Mie sehat alami berbahan <strong>singkong (cassava) asli Indonesia</strong>, bukan tepung terigu. 100% bebas gluten, rendah gula, dan kaya serat alami. Diproses secara semi-modern dengan <em>stainless steel 304 food grade</em> <strong>tanpa pewarna, tanpa pengawet, tanpa pengenyal, dan tanpa bahan kimia apapun</strong>.
            </p>

            {/* Interactive Toggle Switch with Dynamic Glowing & Particle Effects */}
            <div className={`p-4 sm:p-5 rounded-3xl transition-all duration-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-lg relative overflow-hidden ${
              healthyMode
                ? 'bg-gradient-to-r from-[#285A47] via-[#2F6B55] to-[#245240] border-2 border-[#A3D99B] shadow-xl shadow-[#A3D99B]/15'
                : 'bg-[#234E3E]/70 border border-[#2F6551] shadow-inner opacity-80'
            }`}>
              
              {/* Healthy ambient shine */}
              {healthyMode && (
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#A3D99B]/20 rounded-full blur-2xl pointer-events-none animate-pulse" />
              )}

              <div className="flex items-center gap-3.5 relative z-10">
                <div className={`w-12 h-12 rounded-full overflow-hidden shrink-0 transition-all duration-500 border ${
                  healthyMode ? 'border-[#A3D99B] ring-4 ring-[#A3D99B]/30 scale-105' : 'border-[#7A9C78]/50'
                }`}>
                  <img
                    src="/images/dokar_logo_official.png"
                    alt="Official Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-white font-display tracking-tight">
                      Aktifkan mode sehatmu
                    </span>
                    {healthyMode && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#A3D99B] text-[#1E3F33] animate-bounce">
                        <Sparkles className="w-2.5 h-2.5" />
                        Aktif
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#A3D99B] font-medium flex items-center gap-1 mt-0.5">
                    <span>{healthyMode ? '🌿 Bebas Gluten & 16x Lebih Kaya Serat' : 'Klik tombol untuk mengaktifkan gaya hidup sehat'}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Switch Button */}
              <button
                onClick={() => setHealthyMode(!healthyMode)}
                className={`btn-curved px-4 py-2 text-xs font-black transition-all duration-300 relative z-10 shrink-0 ${
                  healthyMode
                    ? 'bg-[#A3D99B] text-[#1E3F33] shadow-lg shadow-[#A3D99B]/30 hover:bg-[#B5E5AD] scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                }`}
              >
                {healthyMode ? (
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1E3F33]" />
                    <span>Mode Sehat Aktif</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#A3D99B]" />
                    <span>Aktifkan Sekarang</span>
                  </span>
                )}
              </button>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('produk')}
                className="btn-curved bg-[#7A9C78] hover:bg-[#688A66] text-white px-7 py-3.5 text-xs sm:text-sm font-black shadow-lg border border-[#8FB58D]"
              >
                <span>Lihat Varian Losspack (5Kg)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('kalkulator')}
                className="btn-curved btn-soft-white px-6 py-3.5 text-xs sm:text-sm font-extrabold"
              >
                <Calculator className="w-4 h-4" />
                <span>Simulasi Porsi & Untung</span>
              </button>
            </div>

          </div>

          {/* Right Product & Dish Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Product Visual Showcase Card */}
              <div className="card-soft overflow-hidden border-2 border-[#7A9C78]/40 bg-white text-[#1E3F33] shadow-2xl p-4 sm:p-5 relative">
                
                {/* High-Resolution Clean Product & Dish Photo */}
                <div className="relative rounded-2xl overflow-hidden mb-4 bg-[#EBF7E9] border border-[#CFE8CA] flex items-center justify-center">
                  <img
                    src="/images/mie_losspack_hero_dish.jpg"
                    alt="Mie Reshik Cap Dokar Losspack 5Kg & Sajian Masak"
                    className="w-full h-auto max-h-[440px] object-cover rounded-2xl shadow-sm hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1E3F33]/90 backdrop-blur-md text-[#A3D99B] text-[10px] uppercase font-black px-3 py-1 rounded-full border border-[#7A9C78]/40 shadow-sm">
                    Pilihan Sehat Alami
                  </div>
                </div>

                {/* Clean Feature Badges */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1E3F33] px-1">
                    <span>Mie Singkong Pilihan Nusantara</span>
                    <span className="text-[#234E3E] font-black">100% Halal MUI</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center pt-1">
                    <div className="p-2.5 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA]">
                      <div className="text-[10px] font-black uppercase text-[#234E3E] mb-0.5">Bahan Baku</div>
                      <div className="text-xs font-extrabold text-[#1E3F33]">Singkong Asli & Tapioka</div>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA]">
                      <div className="text-[10px] font-black uppercase text-[#234E3E] mb-0.5">Higienis Mutu</div>
                      <div className="text-xs font-extrabold text-[#1E3F33]">Stainless 304 & UGM Lab</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 4 Core Hero Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12">
          {BRAND_INFO.heroStats.map((stat, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-3xl bg-[#234E3E]/90 border border-[#2D604D] backdrop-blur-sm flex flex-col items-center text-center shadow-sm hover:border-[#7A9C78] transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-black text-[#A3D99B] font-display mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs font-black text-white mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#A3D99B]/80 font-medium">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
