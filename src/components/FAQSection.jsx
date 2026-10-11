import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search,
  MessageCircle
} from 'lucide-react';
import { FAQS } from '../data/productKnowledgeData';

export default function FAQSection({ onOpenContact, searchQuery }) {
  const [openIndices, setOpenIndices] = useState({ 0: true, 1: true });
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'Produk & Bahan', 'Penyimpanan & Expired', 'Memasak & Usaha Kuliner', 'Pemesanan & Kerjasama'];

  const toggleAccordion = (idx) => {
    setOpenIndices(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const filteredFaqs = FAQS.filter(faq => {
    if (activeCategory !== 'ALL' && faq.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q) || faq.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section id="faq" className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="badge-pill bg-[#FEF1EC] text-[#D3684B] border border-[#FCD8CD] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pusat Bantuan & Pertanyaan Umum</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2D2A26] tracking-tight mb-3">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6354]">
            Segala hal yang perlu Anda ketahui mengenai kualitas, cara memasak, ketahanan simpan, dan kemitraan pasokan Mie Dokar.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn-curved px-3.5 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#E07A5F] text-white shadow-2xs'
                    : 'bg-[#F4EFE6] text-[#635749] hover:bg-[#EAE1D5] hover:text-[#2D2A26]'
                }`}
              >
                {cat === 'ALL' ? 'Semua Kategori' : cat}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-10">
          {filteredFaqs.length === 0 ? (
            <div className="card-soft p-8 text-center bg-white">
              <div className="text-3xl mb-2">🤔</div>
              <div className="text-xs text-[#7A7063]">Tidak ditemukan jawaban untuk pencarian ini.</div>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = !!openIndices[idx];
              return (
                <div 
                  key={idx}
                  className="card-soft bg-white border border-[#E8DFC8] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#2D2A26] hover:text-[#E07A5F]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#E07A5F] shrink-0" />
                      <span>{faq.q}</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#ECE2D2] flex items-center justify-center shrink-0 text-[#7D7061]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#665B4E] leading-relaxed border-t border-[#F4EFE6] bg-[#FCFAF7]">
                      <div className="pt-3">
                        {faq.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Direct Help Callout */}
        <div className="card-soft p-6 sm:p-8 bg-gradient-to-r from-[#FFFDF9] via-[#FAF3EA] to-[#FFFDF9] border border-[#EADBCC] text-center max-w-xl mx-auto">
          <h3 className="font-bold text-sm sm:text-base text-[#2D2A26] mb-1">
            Punya Pertanyaan Spesifik yang Belum Terjawab?
          </h3>
          <p className="text-xs text-[#7A7063] mb-4">
            Tim konsultan produk dan kemitraan kami siap membantu menjawab pertanyaan Anda melalui WhatsApp.
          </p>
          <button
            onClick={() => onOpenContact('Konsultasi Pertanyaan Khusus Produk Mie Dokar')}
            className="btn-curved btn-soft-primary px-5 py-2.5 text-xs font-bold shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Langsung dengan Tim Mie Dokar</span>
          </button>
        </div>

      </div>
    </section>
  );
}
