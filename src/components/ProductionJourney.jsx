import React, { useState } from 'react';
import { 
  Layers, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';
import { PRODUCTION_JOURNEY } from '../data/productKnowledgeData';

export default function ProductionJourney() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill bg-[#FEF6E4] text-[#A06D12] border border-[#F5E2B8] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Proses Produksi Higienis</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2D2A26] tracking-tight mb-3">
            Dari Ladang Singkong Hingga ke Meja Makan
          </h2>
          <p className="text-sm sm:text-base text-[#6E6354]">
            Enam tahapan terstandarisasi SOP 2026 yang menjaga cita rasa warisan tetap konsisten, bersih, dan berkualitas prima.
          </p>
        </div>

        {/* 6 Steps Grid with Interactive Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {PRODUCTION_JOURNEY.map((item, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`card-soft p-6 cursor-pointer border transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'bg-white border-[#E07A5F] shadow-md ring-2 ring-[#E07A5F]/20 -translate-y-1'
                    : 'bg-white/80 border-[#E8DFC8] hover:border-[#DFD3C3] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-black font-display tracking-tight ${
                    isSelected ? 'text-[#E07A5F]' : 'text-[#A89C8D]'
                  }`}>
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF5ED] border border-[#ECE2D2] flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-bold text-base text-[#2D2A26] mb-2">
                  {item.title}
                </h3>
                
                <p className="text-xs text-[#6B6053] leading-relaxed">
                  {item.desc}
                </p>

                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-[#F5D7C9] flex items-center gap-1.5 text-[11px] font-bold text-[#E07A5F]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tahap Terverifikasi SOP Mutu</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
