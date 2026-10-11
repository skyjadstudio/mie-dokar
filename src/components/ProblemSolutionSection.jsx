import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  HeartPulse, 
  Sparkles 
} from 'lucide-react';
import { PROBLEMS_AND_SOLUTIONS } from '../data/productKnowledgeData';

export default function ProblemSolutionSection() {
  return (
    <section id="masalah-solusi" className="py-14 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFEA] to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#A3D99B]/60 mb-3">
            <HeartPulse className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Konteks Kesehatan & Pangan Sehat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3F33] tracking-tight mb-3 font-display">
            Masalah & Solusi Nyata
          </h2>
          <p className="text-sm sm:text-base text-[#4F6359]">
            Mengapa masyarakat dan pengusaha kuliner beralih ke Mie Reshik Cap Dokar sebagai pilihan utama hidup sehat.
          </p>
        </div>

        {/* 2-Column Cards Grid matching User Posters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* 1. Masalah Card (Deep Pine Green with Left Cream Accent) */}
          <div className="rounded-3xl bg-[#1E3F33] text-white p-6 sm:p-10 border border-[#2D5A49] shadow-xl relative overflow-hidden flex flex-col justify-between">
            
            {/* Left accent bar */}
            <div className="absolute top-0 left-0 bottom-0 w-3.5 bg-[#E8D49E]" />

            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pl-2">
                <div className="w-10 h-10 rounded-2xl bg-[#E8D49E]/20 text-[#E8D49E] border border-[#E8D49E]/30 flex items-center justify-center font-bold text-lg shrink-0">
                  ⚠️
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-wide">
                    Masalah
                  </h3>
                  <div className="h-1 w-20 bg-[#E8D49E] rounded-full mt-1" />
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-6 pl-2 text-xs sm:text-sm text-[#D5E5DE] leading-relaxed">
                {PROBLEMS_AND_SOLUTIONS.problems.map((p) => (
                  <div key={p.id} className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E8D49E] shrink-0 mt-1.5" />
                    <p>
                      <strong>{p.title}:</strong> {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2D5A49] pl-2 text-xs text-[#A3D99B] font-semibold flex items-center gap-2">
              <span>Tantangan pola makan modern yang dihadapi jutaan keluarga</span>
            </div>

          </div>

          {/* 2. Solusi Card (Soft Matcha Green with Left Cream Accent) */}
          <div className="rounded-3xl bg-[#A3D99B] text-[#1E3F33] p-6 sm:p-10 border border-[#8ECB85] shadow-xl relative overflow-hidden flex flex-col justify-between">
            
            {/* Left accent bar */}
            <div className="absolute top-0 left-0 bottom-0 w-3.5 bg-[#E8D49E]" />

            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pl-2">
                <div className="w-10 h-10 rounded-2xl bg-[#1E3F33] text-[#A3D99B] flex items-center justify-center font-bold text-lg shrink-0">
                  💡
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1E3F33] tracking-wide">
                    Solusi
                  </h3>
                  <div className="h-1 w-20 bg-[#1E3F33] rounded-full mt-1" />
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-6 pl-2 text-xs sm:text-sm text-[#1A382B] leading-relaxed font-medium">
                {PROBLEMS_AND_SOLUTIONS.solutions.map((s) => (
                  <div key={s.id} className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1E3F33] shrink-0 mt-1.5" />
                    <p>
                      <strong className="text-[#132B20]">{s.title}:</strong> {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#8ECB85] pl-2 text-xs text-[#1E3F33] font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1E3F33]" />
              <span>Solusi sehat & berkelanjutan dari Mie Reshik Cap Dokar</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
