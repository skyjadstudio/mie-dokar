import React from 'react';
import { 
  HeartPulse, 
  ShieldCheck, 
  Scale, 
  Cpu, 
  FlaskConical, 
  Boxes, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { CORE_ADVANTAGES } from '../data/productKnowledgeData';

export default function HealthNutritionSection() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Cassava':
        return <span className="text-2xl">🌾</span>;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#234E3E]" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#234E3E]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#234E3E]" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-[#234E3E]" />;
      case 'Boxes':
        return <Boxes className="w-6 h-6 text-[#234E3E]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#234E3E]" />;
    }
  };

  return (
    <section className="py-14 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFEA] to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#A3D99B]/60 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Standar Kualitas & Uji Mutu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3F33] tracking-tight mb-3 font-display">
            Keunggulan & Kualitas Teruji
          </h2>
          <p className="text-sm sm:text-base text-[#4F6359]">
            Standar kebersihan semi-modern, uji laboratorium berkala, dan nilai nutrisi alami yang menjamin keamanan konsumen.
          </p>
        </div>

        {/* 6 Grid Advantages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_ADVANTAGES.map((adv, idx) => (
            <div 
              key={idx}
              className="card-soft p-6 sm:p-7 bg-white border border-[#EADBCC] flex flex-col justify-between hover:border-[#A3D99B] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA] flex items-center justify-center text-[#1E3F33]">
                    {getIcon(adv.icon)}
                  </div>
                  <span className="badge-pill bg-[#FAF7F2] text-[#234E3E] border border-[#EADBCC] text-[11px] font-bold">
                    {adv.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1E3F33] mb-2 font-display">
                  {adv.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4F6359] leading-relaxed">
                  {adv.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F0E8DC] flex items-center gap-1.5 text-[11px] font-bold text-[#234E3E]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Terverifikasi Standar Mutu Dokar</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
