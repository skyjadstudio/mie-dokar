import React, { useState } from 'react';
import { 
  Star, 
  MessageSquareQuote, 
  Sparkles, 
  CheckCircle2, 
  ZoomIn, 
  X, 
  User, 
  Eye
} from 'lucide-react';
import { TESTIMONIALS } from '../data/productKnowledgeData';

export default function TestimonialsSection() {
  const [activeScreenshotModal, setActiveScreenshotModal] = useState(null);

  return (
    <section className="py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#A3D99B]/60 mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Ulasan & Pengalaman Pelanggan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3F33] tracking-tight mb-3 font-display">
            Testimonial Mitra & Konsumen
          </h2>
          <p className="text-sm sm:text-base text-[#4F6359]">
            Kepuasan nyata dari Google Local Guide, media peliput kuliner, dan konsumen mie sehat di seluruh Indonesia.
          </p>
        </div>

        {/* 5 Sleek Native Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div 
              key={item.id}
              className="card-soft p-6 bg-white border border-[#EADBCC] shadow-sm hover:shadow-xl hover:border-[#A3D99B] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F0E8DC]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EBF7E9] text-[#1E3F33] border border-[#CFE8CA] flex items-center justify-center font-extrabold text-sm shrink-0">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-[#1E3F33]">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#5C7368]">
                        {item.role}
                      </div>
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex text-[#F59E0B] text-xs">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-[#F59E0B]" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-[#385145] leading-relaxed italic mb-5">
                  "{item.quote}"
                </p>
              </div>

              {/* Card Footer: Verified Badge & Screenshot Trigger */}
              <div className="pt-3 border-t border-[#F0E8DC] flex items-center justify-between">
                <span className="badge-pill bg-[#EBF7E9] text-[#234E3E] text-[10px] font-bold">
                  ✓ Review Terverifikasi
                </span>

                <button
                  onClick={() => setActiveScreenshotModal(item)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#234E3E] hover:text-[#1E3F33] hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Bukti SS</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Screenshot Proof Modal */}
        {activeScreenshotModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fadeIn"
            onClick={() => setActiveScreenshotModal(null)}
          >
            <div 
              className="relative max-w-lg w-full bg-white rounded-3xl p-5 shadow-2xl border border-[#EADBCC]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveScreenshotModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#ECE2D2] flex items-center justify-center text-[#5C7368] hover:text-[#1E3F33] hover:bg-[#F4EFEA] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-3 pr-8">
                <div className="text-xs font-bold uppercase tracking-wider text-[#5C7368]">
                  Bukti Tangkapan Layar Asli
                </div>
                <div className="text-base font-extrabold text-[#1E3F33]">
                  {activeScreenshotModal.name} ({activeScreenshotModal.role})
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden bg-[#FAF7F2] p-2 border border-[#ECE2D2]">
                <img
                  src={activeScreenshotModal.image}
                  alt={`Screenshot ${activeScreenshotModal.name}`}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
