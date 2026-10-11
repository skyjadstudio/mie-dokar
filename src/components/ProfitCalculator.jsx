import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Scale
} from 'lucide-react';

export default function ProfitCalculator({ onOpenContact }) {
  const [numPackages, setNumPackages] = useState(5); // 5 packages = 25 kg
  const [sellingPricePerPortion, setSellingPricePerPortion] = useState(15000); // Rp 15.000 / porsi
  const pricePerPackage = 120000; // Rp 120.000 (Harga Eceran Tertinggi) per 5kg

  const portionsPerPackage = 100; // ±100 porsi per 5kg
  const costPerPortion = Math.round(pricePerPackage / portionsPerPackage); // Rp 1.200

  const totalKg = numPackages * 5;
  const totalPortions = numPackages * portionsPerPackage;
  const totalCost = numPackages * pricePerPackage;
  const totalRevenue = totalPortions * sellingPricePerPortion;
  const estimatedGrossProfit = totalRevenue - totalCost;

  const formatRp = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="kalkulator" className="py-14 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#A3D99B]/60 mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Simulasi Usaha Warung & Catering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3F33] tracking-tight mb-3 font-display">
            Kalkulator Porsi & Modal Usaha
          </h2>
          <p className="text-sm sm:text-base text-[#4F6359]">
            Hitung efisiensi modal bahan baku Mie Losspack 5Kg dan potensi laba kotor untuk usaha kuliner Anda.
          </p>
        </div>

        {/* Calculator Main Container */}
        <div className="card-soft p-6 sm:p-10 bg-white border border-[#EADBCC] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Inputs (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Product Info Banner */}
              <div className="p-4 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#1E3F33]">Produk Acuan: Mie Losspack 5Kg</div>
                  <div className="text-[11px] text-[#5C7368]">Standar Warung Bakmi Jawa (±100 porsi/bal)</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-sm text-[#234E3E]">
                    Rp 120.000 / 5Kg
                  </div>
                  <div className="text-[10px] font-extrabold text-[#5C7368] uppercase">
                    Harga Eceran Tertinggi
                  </div>
                </div>
              </div>

              {/* Slider 1: Jumlah Kemasan 5Kg */}
              <div className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#ECE2D2]">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#1E3F33]">
                    1. Kebutuhan Kemasan 5Kg
                  </label>
                  <span className="px-3 py-1 rounded-full bg-[#234E3E] text-white text-xs font-extrabold">
                    {numPackages} Bal ({totalKg} Kg)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={numPackages}
                  onChange={(e) => setNumPackages(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#DFD6C9] rounded-lg appearance-none cursor-pointer accent-[#234E3E] my-2"
                />
                <div className="flex justify-between text-[11px] text-[#7D7061] font-semibold">
                  <span>1 Bal (5 Kg)</span>
                  <span>25 Bal (125 Kg)</span>
                  <span>50 Bal (250 Kg)</span>
                </div>
              </div>

              {/* Slider 2: Target Harga Jual Menu */}
              <div className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#ECE2D2]">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#1E3F33]">
                    2. Target Harga Jual Menu per Porsi
                  </label>
                  <span className="px-3 py-1 rounded-full bg-[#234E3E] text-white text-xs font-extrabold">
                    {formatRp(sellingPricePerPortion)} / porsi
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="35000"
                  step="1000"
                  value={sellingPricePerPortion}
                  onChange={(e) => setSellingPricePerPortion(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#DFD6C9] rounded-lg appearance-none cursor-pointer accent-[#234E3E] my-2"
                />
                <div className="flex justify-between text-[11px] text-[#7D7061] font-semibold">
                  <span>Rp 10.000 (Warung Gerobak)</span>
                  <span>Rp 20.000 (Resto / Kafe)</span>
                  <span>Rp 35.000</span>
                </div>
              </div>

              {/* Mini Notes */}
              <div className="p-4 rounded-2xl bg-[#F7FAF6] border border-[#E0ECE0] text-xs text-[#4F6359] space-y-1">
                <div className="font-bold text-[#1E3F33] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#234E3E]" />
                  <span>Dukungan Negosiasi Harga:</span>
                </div>
                <p>
                  Untuk pemesanan rutin minimal <strong>50 pcs (Bal 5Kg)</strong>, harga Rp 120.000 (HET) masih dapat dinegosiasikan khusus langsung bersama tim manajemen.
                </p>
              </div>

            </div>

            {/* Right Output Dashboard (6 cols) */}
            <div className="lg:col-span-6 bg-[#1E3F33] text-white p-6 sm:p-8 rounded-3xl border border-[#2D5A49] shadow-inner space-y-5">
              
              <div className="flex items-center justify-between border-b border-[#2D5A49] pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#A3D99B]" />
                  <span className="font-extrabold text-sm sm:text-base text-white">
                    Hasil Proyeksi Usaha
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#A3D99B]/20 text-[#A3D99B] border border-[#A3D99B]/30">
                  ± 100 Porsi / Bal
                </span>
              </div>

              {/* Highlight: Modal Mie per Porsi */}
              <div className="p-5 rounded-3xl bg-[#234E3E] border border-[#2F6551] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#A3D99B] mb-1">Modal Mie per Porsi:</div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-display">
                    {formatRp(costPerPortion)}
                    <span className="text-xs font-normal text-[#A3D99B]/80"> / porsi matang</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold text-[#1E3F33] bg-[#A3D99B] px-3 py-1 rounded-full">
                    Sangat Irit
                  </div>
                </div>
              </div>

              {/* 4 Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                
                <div className="p-4 rounded-2xl bg-[#234E3E] border border-[#2F6551]">
                  <div className="text-[11px] text-[#A3D99B] font-semibold mb-1">Total Porsi Matang</div>
                  <div className="text-lg sm:text-xl font-extrabold text-white">
                    ± {totalPortions.toLocaleString('id-ID')} <span className="text-xs font-medium text-[#A3D99B]/80">Porsi</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#234E3E] border border-[#2F6551]">
                  <div className="text-[11px] text-[#A3D99B] font-semibold mb-1">Total Modal Mie</div>
                  <div className="text-lg sm:text-xl font-extrabold text-white">
                    {formatRp(totalCost)}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#234E3E] border border-[#2F6551]">
                  <div className="text-[11px] text-[#A3D99B] font-semibold mb-1">Potensi Omzet Penjualan</div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#A3D99B]">
                    {formatRp(totalRevenue)}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#A3D99B] text-[#1E3F33] border border-[#A3D99B]">
                  <div className="text-[11px] font-bold mb-1">Estimasi Laba Kotor</div>
                  <div className="text-lg sm:text-xl font-black">
                    {formatRp(estimatedGrossProfit)}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenContact(`Konsultasi Pemesanan ${numPackages} Bal (${totalKg} Kg) Mie Losspack 5Kg`)}
                className="w-full btn-curved btn-matcha-primary py-3 text-xs sm:text-sm font-extrabold shadow-lg flex items-center justify-center gap-2"
              >
                <span>Ajukan Kemitraan & Pembelian Partai</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
