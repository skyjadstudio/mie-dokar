import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileCheck, 
  ZoomIn, 
  X, 
  CheckCircle2
} from 'lucide-react';
import { CERTIFICATES } from '../data/productKnowledgeData';

export default function CertificatesSection() {
  const [activeModalCert, setActiveModalCert] = useState(null);

  return (
    <section id="legalitas" className="py-16 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFEA] to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#A3D99B]/60 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Legalitas & Jaminan Resmi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3F33] tracking-tight mb-3 font-display">
            Dokumen Sertifikasi & Legalitas
          </h2>
          <p className="text-sm sm:text-base text-[#4F6359]">
            Keabsahan hukum dan kepatuhan standar mutu pangan nasional yang menjamin keamanan konsumen dan mitra bisnis.
          </p>
        </div>

        {/* 3 Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert) => (
            <div 
              key={cert.id}
              className="card-soft p-5 sm:p-6 bg-white border border-[#EADBCC] shadow-sm flex flex-col justify-between group hover:border-[#A3D99B] hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Image Container with precise pure blur effect for Halal rows 2 & 3 */}
                <div 
                  onClick={() => setActiveModalCert(cert)}
                  className="relative rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#ECE2D2] cursor-pointer mb-5 h-80 flex items-center justify-center p-2"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="max-h-full max-w-full object-contain shadow-2xs transition-transform duration-300 group-hover:scale-102"
                    />

                    {/* Precise Pure Frosted Blur Overlay without any text/borders */}
                    {cert.hasBlurOverlay && (
                      <div 
                        className="absolute left-[6.5%] right-[6.5%] top-[56.6%] h-[4.6%] backdrop-blur-md bg-white/60 pointer-events-none"
                      />
                    )}
                  </div>

                  {/* Zoom hint overlay */}
                  <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="btn-curved bg-white text-[#1E3F33] px-4 py-2 text-xs font-bold shadow-md flex items-center gap-1.5">
                      <ZoomIn className="w-4 h-4" />
                      <span>Lihat Dokumen</span>
                    </span>
                  </div>
                </div>

                <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#CFE8CA] text-[10px] font-extrabold mb-2">
                  No: {cert.number}
                </div>

                <h3 className="text-base font-bold text-[#1E3F33] font-display mb-1.5 leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs text-[#5C7368] leading-relaxed mb-3">
                  {cert.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0E8DC] text-[11px] text-[#234E3E] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Masa Berlaku: {cert.validUntil}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Modal View */}
        {activeModalCert && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fadeIn"
            onClick={() => setActiveModalCert(null)}
          >
            <div 
              className="card-soft bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden border border-[#EADBCC] shadow-2xl relative text-[#1E3F33] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalCert(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#ECE2D2] flex items-center justify-center text-[#5C7368] hover:text-[#1E3F33] hover:bg-[#F4EFEA] transition-all shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                <div className="mb-4 pr-10">
                  <span className="badge-pill bg-[#EBF7E9] text-[#1E3F33] text-xs font-bold mb-2">
                    No: {activeModalCert.number}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#1E3F33]">
                    {activeModalCert.title}
                  </h3>
                  <p className="text-xs text-[#5C7368] mt-1">
                    Penerbit: {activeModalCert.issuer} • Masa Berlaku: {activeModalCert.validUntil}
                  </p>
                </div>

                {/* Document Display with Pure Blur Mask */}
                <div className="relative rounded-2xl overflow-hidden bg-[#FAF7F2] p-4 border border-[#ECE2D2] flex items-center justify-center">
                  <div className="relative max-w-lg w-full">
                    <img
                      src={activeModalCert.image}
                      alt={activeModalCert.title}
                      className="w-full h-auto rounded-xl shadow-md"
                    />

                    {activeModalCert.hasBlurOverlay && (
                      <div 
                        className="absolute left-[6.5%] right-[6.5%] top-[56.6%] h-[4.6%] backdrop-blur-md bg-white/60 pointer-events-none"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-[#5C7368]">
                    Dokumen resmi terverifikasi Republik Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
