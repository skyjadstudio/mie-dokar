import React from 'react';
import { 
  X, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  FileText
} from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onOpenContact }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="card-soft bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden border border-[#EADBCC] shadow-2xl relative text-[#1E3F33] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#ECE2D2] flex items-center justify-center text-[#5C7368] hover:text-[#1E3F33] hover:bg-[#F4EFEA] transition-all shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          {/* Modal Header */}
          <div className="mb-6 pb-4 border-b border-[#EFE8DC] pr-10">
          <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#CFE8CA] mb-2">
            <FileText className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Lembar Spesifikasi Resmi</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1E3F33] tracking-tight font-display">
            {product.name}
          </h2>
          <p className="text-xs text-[#5C7368] mt-1">
            Kategori: {product.category} • {product.weight}
          </p>
        </div>

        {/* Overview */}
        <div className="mb-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE2D2]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C7368] mb-1">
            Deskripsi Produk
          </h4>
          <p className="text-xs sm:text-sm text-[#385145] leading-relaxed">
            {product.desc}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA]">
            <div className="text-[10px] font-bold uppercase text-[#234E3E] mb-1">Skema Harga</div>
            <div className="text-sm font-extrabold text-[#1E3F33]">{product.priceDisplay}</div>
            <div className="text-[10px] text-[#5C7368] mt-0.5">Hubungi sales untuk penawaran grosir & partai</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA]">
            <div className="text-[10px] font-bold uppercase text-[#234E3E] mb-1">Daya Hasilkan Porsi</div>
            <div className="text-xs font-bold text-[#1E3F33]">{product.yieldPortion}</div>
            <div className="text-[10px] text-[#5C7368] mt-0.5">Efisiensi: {product.costPerPortion}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA]">
            <div className="text-[10px] font-bold uppercase text-[#234E3E] mb-1">Target Segmen</div>
            <div className="text-xs font-bold text-[#1E3F33]">{product.target}</div>
          </div>
        </div>

        {/* Specs Table */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C7368] mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Spesifikasi Teknis & Mutu</span>
          </h4>
          <div className="space-y-2">
            {Object.entries(product.specs).map(([k, v], idx) => (
              <div key={idx} className="flex justify-between text-xs p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DC]">
                <span className="font-semibold text-[#5C7368]">{k}</span>
                <span className="font-bold text-[#1E3F33] text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C7368] mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Poin Keunggulan Utama</span>
          </h4>
          <div className="space-y-2">
            {product.features.map((f, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#385145]">
                <CheckCircle2 className="w-4 h-4 text-[#234E3E] shrink-0 mt-0.5" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EFE8DC]">
          <button
            onClick={onClose}
            className="btn-curved btn-soft-secondary px-5 py-2.5 text-xs font-bold"
          >
            Tutup
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenContact(product.name);
            }}
            className="btn-curved btn-pine-primary px-6 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hubungi Sales untuk Produk Ini</span>
          </button>
        </div>

        </div>
      </div>
    </div>
  );
}
