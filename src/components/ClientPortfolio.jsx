import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { CLIENT_PORTFOLIO } from '../data/productKnowledgeData';

export default function ClientPortfolio() {
  return (
    <section className="py-14 bg-[#1E3F33] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill bg-[#A3D99B]/20 text-[#A3D99B] border border-[#A3D99B]/30 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Portofolio & Pengalaman Industri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 font-display">
            Dipercaya oleh Mitra & Brand Ternama
          </h2>
          <p className="text-sm sm:text-base text-[#D0E2CE]">
            Kualitas dan higienitas Mie Reshik Cap Dokar telah lolos uji standar hotel berbintang hingga jaringan produk organik nasional.
          </p>
        </div>

        {/* 3 Client Cards Grid (Matching Poster) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLIENT_PORTFOLIO.map((client, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-[#234E3E] border border-[#2F6551] flex flex-col justify-between hover:border-[#A3D99B] transition-all shadow-md"
            >
              <div>
                {/* White Logo Container Box */}
                <div className="w-full h-32 rounded-2xl bg-white flex flex-col items-center justify-center p-5 mb-6 shadow-sm">
                  {client.logoImage ? (
                    <img 
                      src={client.logoImage} 
                      alt={client.name} 
                      className="max-h-16 max-w-[85%] object-contain"
                    />
                  ) : client.name.includes('Lingkar') ? (
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#589632] flex items-center justify-center text-[#589632] font-black text-xs mb-1">
                        🌿
                      </div>
                      <div className="text-sm font-extrabold text-[#2F5E1E] leading-tight">
                        Lingkar Organik
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto bg-[#EE4D2D] rounded-xl flex items-center justify-center text-white font-black text-lg mb-1 shadow-xs">
                        🛍️
                      </div>
                      <div className="text-base font-extrabold text-[#EE4D2D]">
                        Shopee
                      </div>
                    </div>
                  )}
                </div>

                <div className="badge-pill bg-[#A3D99B]/20 text-[#A3D99B] border border-[#A3D99B]/30 text-[10px] font-bold mb-3">
                  {client.badge}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  {client.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#D0E2CE] leading-relaxed">
                  {client.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2F6551] text-[11px] text-[#A3D99B] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A3D99B]" />
                <span>{client.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
