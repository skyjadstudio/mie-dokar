import React from 'react';
import { 
  Sparkles, 
  Target, 
  Compass, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  Factory
} from 'lucide-react';
import { BRAND_INFO } from '../data/productKnowledgeData';

export default function AboutAndVisionSection() {
  return (
    <section id="tentang" className="py-14 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#A3D99B]/60 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Dedikasi Pangan Sehat Sejak 2014</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3F33] tracking-tight mb-3 font-display">
            Tentang Mie Reshik Cap Dokar
          </h2>
          <p className="text-sm sm:text-base text-[#4F6359]">
            Menghadirkan alternatif mie sehat warisan nusantara dari singkong murni pilihan dengan teknologi higienis semi-modern.
          </p>
        </div>

        {/* Story Banner in Soft Matcha Light */}
        <div className="card-soft p-6 sm:p-10 bg-gradient-to-br from-[#EBF7E9] via-[#F2FAF0] to-[#E3F2E0] border border-[#CFE8CA] mb-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Story Text (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-black uppercase tracking-wider text-[#234E3E] bg-white/70 px-3 py-1 rounded-full inline-block border border-[#CFE8CA]">
                🌱 Singkong Asli Nusantara
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E3F33] font-display">
                Mie Sehat dari Singkong Asli Indonesia, Bukan Tepung Terigu
              </h3>
              <p className="text-sm text-[#385145] leading-relaxed">
                Sejak <strong>2014</strong> kami konsisten menghadirkan mie bebas gluten, rendah gula, dan tinggi serat yang sangat cocok untuk gaya hidup sehat, penderita diabetes, dan yang memiliki alergi terhadap gluten.
              </p>
              <p className="text-sm text-[#385145] leading-relaxed">
                Diproses secara semi-modern dengan mesin berbahan <strong>Stainless Steel 304 Food Grade</strong> <strong>tanpa pewarna, tanpa pengawet, tanpa pengenyal, dan tanpa bahan kimia apapun</strong>.
              </p>
              <p className="text-sm text-[#385145] leading-relaxed">
                Dengan legalitas lengkap (NIB, PIRT, Halal MUI, HAKI), Mie Reshik menjadi pilihan yang aman, alami, dan bergizi tinggi bagi keluarga dan mitra usaha kuliner.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="badge-pill bg-white text-[#1E3F33] border border-[#CFE8CA] text-xs font-bold">
                  ✓ Tanpa Tenaga Sapi
                </span>
                <span className="badge-pill bg-white text-[#1E3F33] border border-[#CFE8CA] text-xs font-bold">
                  ✓ Uji Lab UGM & Puskesmas
                </span>
                <span className="badge-pill bg-white text-[#1E3F33] border border-[#CFE8CA] text-xs font-bold">
                  ✓ Stainless Steel 304
                </span>
              </div>
            </div>

            {/* Visual Photo Card (5 cols) - Updated with Pabrik Mie Dokar */}
            <div className="lg:col-span-5">
              <div className="p-4 rounded-3xl bg-white border border-[#CFE8CA] shadow-md space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-[#EAF2E8]">
                  <div className="w-10 h-10 rounded-2xl bg-[#234E3E] text-white flex items-center justify-center font-bold text-lg">
                    🏛️
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#1E3F33]">Pabrik Mie Dokar</div>
                    <div className="text-[11px] text-[#5C7368]">Gunturgeni, Poncosari, Srandakan, D.I. Yogyakarta</div>
                  </div>
                </div>
                
                <div className="p-3.5 rounded-2xl bg-[#F7FAF6] border border-[#E0ECE0] text-xs text-[#385145] space-y-2">
                  <div className="font-bold text-[#1E3F33] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#234E3E]" />
                    <span>Founder & Pengelola:</span>
                  </div>
                  <div className="text-sm font-extrabold text-[#1E3F33]">
                    FX. Subeno
                  </div>
                  <div className="text-[11px] text-[#5C7368]">
                    Komitmen menghadirkan mie tradisional sehat dengan integritas mutu dan higienitas modern.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Visi & Misi Cards matching User's Poster */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Visi Card */}
          <div className="card-soft p-6 sm:p-8 bg-white border border-[#EADBCC] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA] flex items-center justify-center text-2xl mb-4 text-[#1E3F33]">
                <Target className="w-6 h-6 text-[#234E3E]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#1E3F33] font-display mb-3">
                Visi Kami
              </h3>
              <p className="text-sm text-[#4F6359] leading-relaxed font-medium">
                "{BRAND_INFO.vision}"
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EFE8DC] text-[11px] font-bold text-[#234E3E] uppercase tracking-wider">
              ✦ Standar Global & Warisan Lokal
            </div>
          </div>

          {/* Misi Card */}
          <div className="card-soft p-6 sm:p-8 bg-white border border-[#EADBCC] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA] flex items-center justify-center text-2xl mb-4 text-[#1E3F33]">
                <Compass className="w-6 h-6 text-[#234E3E]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#1E3F33] font-display mb-3">
                Misi Kami
              </h3>
              <div className="space-y-3">
                {BRAND_INFO.mission.map((misi, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4F6359]">
                    <CheckCircle2 className="w-4 h-4 text-[#234E3E] shrink-0 mt-0.5" />
                    <span>{misi}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EFE8DC] text-[11px] font-bold text-[#234E3E] uppercase tracking-wider">
              ✦ Kualitas Bahan & Inovasi Berkelanjutan
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
