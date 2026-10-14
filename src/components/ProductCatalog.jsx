import React, { useState } from 'react';
import { 
  Package, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Scale, 
  Boxes, 
  UtensilsCrossed,
  MessageCircle,
  FileText,
  Store,
  ShoppingBag
} from 'lucide-react';
import { PRODUCTS } from '../data/productKnowledgeData';

export default function ProductCatalog({ onSelectProduct, onOpenContact }) {
  return (
    <section id="produk" className="py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#A3D99B]/60 mb-3">
            <Package className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Katalog & Spesifikasi Resmi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3F33] tracking-tight mb-3 font-display">
            Produk Utama yang Ditawarkan
          </h2>
          <p className="text-sm sm:text-base text-[#4F6359]">
            Solusi bahan baku mie singkong sehat untuk katering, warung bakmi, warung sayur, toko kelontong, hingga konsumsi dapur keluarga.
          </p>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          
          {/* Card 1: Mie Kemasan Losspack 5Kg */}
          {PRODUCTS.filter(p => p.id === 'losspack-5kg').map((product) => (
            <div 
              key={product.id}
              className="card-soft p-5 sm:p-6 pb-8 bg-white border-2 border-[#7A9C78]/50 shadow-lg flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-3 min-h-[32px]">
                  <span className="badge-pill bg-[#1E3F33] text-[#A3D99B] text-[10.5px] font-bold px-2.5 py-0.5 whitespace-nowrap">
                    🌟 {product.badge}
                  </span>
                  <span className="text-[10.5px] font-bold text-[#5C7368] bg-[#EBF7E9] px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                    {product.weight}
                  </span>
                </div>

                <h3 className="h-[52px] flex items-start text-lg sm:text-[19px] font-black text-[#1E3F33] font-display leading-snug mb-1">
                  {product.name}
                </h3>
                
                {/* Partnership Pricing Banner */}
                <div className="h-11 mb-3 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7E9] border border-[#A3D99B]/80 text-xs font-black text-[#1E3F33]">
                      <Sparkles className="w-3.5 h-3.5 text-[#234E3E]" />
                      Harga Khusus Kemitraan
                    </span>
                  </div>
                  <div className="text-[10px] text-[#4F6359] mt-1 font-medium">
                    Grosir & Partai • <button onClick={() => onOpenContact(`Minta Penawaran Grosir ${product.name}`)} className="text-[#234E3E] font-bold underline hover:text-[#18392D] transition-colors">Minta Penawaran Grosir</button>
                  </div>
                </div>

                {/* Equalized Target Box */}
                <div className="h-[108px] p-3.5 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA] mb-6 flex flex-col justify-center">
                  <div className="text-[13px] sm:text-sm font-extrabold flex items-center gap-1.5 text-[#1E3F33] mb-1">
                    <UtensilsCrossed className="w-4 h-4 text-[#234E3E] shrink-0" />
                    <span>Target: Catering & Warung Makan</span>
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#385145] leading-snug">
                    5kg menghasilkan <strong>± 100 porsi</strong> standar warung bakmi (Sangat hemat & menguntungkan).
                  </div>
                </div>

                <p className="h-[60px] text-xs sm:text-[13px] text-[#4F6359] leading-relaxed mb-5 flex items-center">
                  {product.desc}
                </p>

                <div className="min-h-[165px] space-y-2.5 mb-6 flex flex-col justify-start">
                  {product.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#2C4035] leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-[#234E3E] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#EFE8DC] space-y-2.5 mt-auto">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="w-full btn-curved btn-soft-secondary py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Lihat Spesifikasi Lengkap</span>
                </button>
                <button
                  onClick={() => onOpenContact(`Pemesanan ${product.name}`)}
                  className="w-full btn-curved btn-pine-primary py-2.5 text-xs sm:text-sm font-extrabold shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pesan Losspack 5Kg</span>
                </button>
              </div>
            </div>
          ))}

          {/* Card 2: Mie Dokar Kemasan 5Kg (20 x 250gr) - NEW ADDITION */}
          {PRODUCTS.filter(p => p.id === 'kemasan-bal-20pcs').map((product) => (
            <div 
              key={product.id}
              className="card-soft p-5 sm:p-6 pb-8 bg-white border-2 border-[#7A9C78]/50 shadow-lg flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-3 min-h-[32px]">
                  <span className="badge-pill bg-[#7A9C78] text-white text-[10.5px] font-bold px-2.5 py-0.5 whitespace-nowrap">
                    🏪 {product.badge}
                  </span>
                  <span className="text-[10.5px] font-bold text-[#5C7368] bg-[#EBF7E9] px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                    {product.weight}
                  </span>
                </div>

                <h3 className="h-[52px] flex items-start text-lg sm:text-[19px] font-black text-[#1E3F33] font-display leading-snug mb-1">
                  {product.name}
                </h3>
                
                {/* Partnership Pricing Banner */}
                <div className="h-11 mb-3 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7E9] border border-[#A3D99B]/80 text-xs font-black text-[#1E3F33]">
                      <Sparkles className="w-3.5 h-3.5 text-[#234E3E]" />
                      Harga Khusus Kemitraan
                    </span>
                  </div>
                  <div className="text-[10px] text-[#4F6359] mt-1 font-medium">
                    Grosir & Reseller • <button onClick={() => onOpenContact(`Minta Penawaran Reseller ${product.name}`)} className="text-[#234E3E] font-bold underline hover:text-[#18392D] transition-colors">Minta Penawaran Grosir</button>
                  </div>
                </div>

                {/* Equalized Target Box */}
                <div className="h-[108px] p-3.5 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA] mb-6 flex flex-col justify-center">
                  <div className="text-[13px] sm:text-sm font-extrabold flex items-center gap-1.5 text-[#1E3F33] mb-1">
                    <Store className="w-4 h-4 text-[#234E3E] shrink-0" />
                    <span>Target: Warung Sayur & Kelontong</span>
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#385145] leading-snug">
                    Sangat cocok untuk <strong>warung sayur & kelontong</strong> untuk dijual eceran per 250gr.
                  </div>
                </div>

                <p className="h-[60px] text-xs sm:text-[13px] text-[#4F6359] leading-relaxed mb-5 flex items-center">
                  {product.desc}
                </p>

                <div className="min-h-[165px] space-y-2.5 mb-6 flex flex-col justify-start">
                  {product.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#2C4035] leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-[#234E3E] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#EFE8DC] space-y-2.5 mt-auto">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="w-full btn-curved btn-soft-secondary py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Lihat Spesifikasi Lengkap</span>
                </button>
                <button
                  onClick={() => onOpenContact(`Pemesanan ${product.name}`)}
                  className="w-full btn-curved bg-[#7A9C78] hover:bg-[#688A66] text-white py-2.5 text-xs sm:text-sm font-extrabold shadow-sm border border-[#8FB58D]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pesan Bal (20 x 250gr)</span>
                </button>
              </div>
            </div>
          ))}

          {/* Card 3: Mie Singkong Kemasan Retail (Disertai Bumbu) */}
          {PRODUCTS.filter(p => p.id === 'kemasan-retail').map((product) => (
            <div 
              key={product.id}
              className="card-soft p-5 sm:p-6 pb-8 bg-white border-2 border-[#7A9C78]/50 shadow-lg flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-3 min-h-[32px]">
                  <span className="badge-pill bg-[#FAF7F2] text-[#1E3F33] border border-[#EADBCC] text-[10.5px] font-bold px-2.5 py-0.5 whitespace-nowrap">
                    🍜 {product.badge}
                  </span>
                  <span className="text-[10.5px] font-bold text-[#5C7368] bg-[#FAF7F2] px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                    {product.weight}
                  </span>
                </div>

                <h3 className="h-[52px] flex items-start text-lg sm:text-[19px] font-black text-[#1E3F33] font-display leading-snug mb-1">
                  {product.name}
                </h3>
                
                {/* Partnership Pricing Banner */}
                <div className="h-11 mb-3 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7E9] border border-[#A3D99B]/80 text-xs font-black text-[#1E3F33]">
                      <Sparkles className="w-3.5 h-3.5 text-[#234E3E]" />
                      Harga Khusus Kemitraan
                    </span>
                  </div>
                  <div className="text-[10px] text-[#4F6359] mt-1 font-medium">
                    Display & Retail • <button onClick={() => onOpenContact(`Minta Penawaran Retail Display ${product.name}`)} className="text-[#234E3E] font-bold underline hover:text-[#18392D] transition-colors">Minta Penawaran Grosir</button>
                  </div>
                </div>

                {/* Equalized Target Box */}
                <div className="h-[108px] p-3.5 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA] mb-6 flex flex-col justify-center">
                  <div className="text-[13px] sm:text-sm font-extrabold flex items-center gap-1.5 text-[#1E3F33] mb-1">
                    <ShoppingBag className="w-4 h-4 text-[#234E3E] shrink-0" />
                    <span>Target: Dapur Keluarga & Retail</span>
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#385145] leading-snug">
                    Lengkap disertai bumbu alami, praktis untuk santapan <strong>3 - 4 porsi</strong> keluarga di rumah.
                  </div>
                </div>

                <p className="h-[60px] text-xs sm:text-[13px] text-[#4F6359] leading-relaxed mb-5 flex items-center">
                  {product.desc}
                </p>

                <div className="min-h-[165px] space-y-2.5 mb-6 flex flex-col justify-start">
                  {product.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#2C4035] leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-[#234E3E] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#EFE8DC] space-y-2.5 mt-auto">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="w-full btn-curved btn-soft-secondary py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Lihat Spesifikasi Lengkap</span>
                </button>
                <button
                  onClick={() => onOpenContact(`Pemesanan ${product.name}`)}
                  className="w-full btn-curved btn-pine-primary py-2.5 text-xs sm:text-sm font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Tanya Kemasan Retail</span>
                </button>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
