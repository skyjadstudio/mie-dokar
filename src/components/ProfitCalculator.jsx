import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  UtensilsCrossed,
  PackageCheck,
  Store,
  HelpCircle
} from 'lucide-react';

export default function ProfitCalculator({ onOpenContact }) {
  const [mode, setMode] = useState('kuliner'); // 'kuliner' | 'reseller'

  // Mode Kuliner States
  const [portionsPerDay, setPortionsPerDay] = useState(50); // 50 porsi/hari
  const [daysPerMonth, setDaysPerMonth] = useState(26); // 26 hari kerja
  const [costPerBalKuliner, setCostPerBalKuliner] = useState(120000); // Estimasi modal beli per bal 5Kg (fleksibel)
  const [sellingPricePerPortion, setSellingPricePerPortion] = useState(16000); // Rp 16.000 / porsi

  // 1 Bal (5Kg) menghasilkan perkiraan ±100 porsi matang standar
  const calculatedCostPerPortion = costPerBalKuliner > 0 ? Math.round(costPerBalKuliner / 100) : 0;

  // Mode Reseller States
  const [resellerMonthlyVolume, setResellerMonthlyVolume] = useState(30); // 30 Bal / bulan
  const [resellerBuyPrice, setResellerBuyPrice] = useState(100000); // Estimasi modal beli per bal (fleksibel)
  const [resellerSellPrice, setResellerSellPrice] = useState(135000); // Target harga jual per bal

  const formatRp = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(Math.max(0, val));
  };

  // Kalkulasi Mode Kuliner
  const totalMonthlyPortions = portionsPerDay * daysPerMonth;
  const estimatedPackages = Math.ceil(totalMonthlyPortions / 100); // 1 bal 5kg menghasilkan ±100 porsi
  const estimatedKg = estimatedPackages * 5;
  const totalCostKuliner = estimatedPackages * costPerBalKuliner; // Modal pembelian bal mie
  const totalRevenueKuliner = totalMonthlyPortions * sellingPricePerPortion;
  const grossProfitKuliner = totalRevenueKuliner - totalCostKuliner;
  const marginKuliner = sellingPricePerPortion > 0 
    ? Math.round(((sellingPricePerPortion - calculatedCostPerPortion) / sellingPricePerPortion) * 100) 
    : 0;

  // Kalkulasi Mode Reseller
  const totalCostReseller = resellerMonthlyVolume * resellerBuyPrice;
  const totalRevenueReseller = resellerMonthlyVolume * resellerSellPrice;
  const profitReseller = totalRevenueReseller - totalCostReseller;
  const marginReseller = resellerSellPrice > 0 
    ? Math.round(((resellerSellPrice - resellerBuyPrice) / resellerSellPrice) * 100) 
    : 0;

  const currentProfit = mode === 'kuliner' ? grossProfitKuliner : profitReseller;
  const currentMargin = mode === 'kuliner' ? marginKuliner : marginReseller;
  const currentRevenue = mode === 'kuliner' ? totalRevenueKuliner : totalRevenueReseller;
  const currentCost = mode === 'kuliner' ? totalCostKuliner : totalCostReseller;

  const handleConsultation = () => {
    if (mode === 'kuliner') {
      onOpenContact(
        `Konsultasi Usaha Kuliner: Target ${portionsPerDay} porsi/hari (${estimatedPackages} Bal Losspack 5Kg/bulan), estimasi modal ${formatRp(costPerBalKuliner)}/bal (~${formatRp(calculatedCostPerPortion)}/porsi), proyeksi laba ${formatRp(grossProfitKuliner)}/bulan. Mohon info penawaran harga grosir pabrik.`
      );
    } else {
      onOpenContact(
        `Konsultasi Reseller: Target penjualan ${resellerMonthlyVolume} Bal/bulan, proyeksi laba ${formatRp(profitReseller)}/bulan. Mohon katalog harga modal distributor.`
      );
    }
  };

  return (
    <section id="kalkulator" className="py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#A3D99B]/60 mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Kalkulator Simulasi Bisnis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3F33] tracking-tight mb-3 font-display">
            Hitung Potensi Keuntungan Usaha Anda
          </h2>
          <p className="text-sm sm:text-base text-[#4F6359]">
            Simulasikan kebutuhan modal, omzet, dan estimasi keuntungan usaha secara fleksibel sesuai target dan pasar Anda.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="p-1.5 bg-[#EAE2D5] rounded-2xl sm:rounded-full inline-flex flex-col sm:flex-row gap-1.5 shadow-inner border border-[#D8CABE]">
            <button
              onClick={() => setMode('kuliner')}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                mode === 'kuliner'
                  ? 'bg-[#1E3F33] text-white shadow-md'
                  : 'text-[#4F6359] hover:text-[#1E3F33]'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4 text-[#A3D99B]" />
              <span>Peluang Usaha Kuliner (Kedai / Catering)</span>
            </button>
            <button
              onClick={() => setMode('reseller')}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                mode === 'reseller'
                  ? 'bg-[#1E3F33] text-white shadow-md'
                  : 'text-[#4F6359] hover:text-[#1E3F33]'
              }`}
            >
              <Store className="w-4 h-4 text-[#A3D99B]" />
              <span>Peluang Reseller & Agen Kemasan</span>
            </button>
          </div>
        </div>

        {/* Calculator Main Container */}
        <div className="card-soft p-4 sm:p-8 lg:p-10 bg-white border border-[#EADBCC] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Interactive Flexible Inputs */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">

              {mode === 'kuliner' ? (
                <>
                  {/* Slider 1: Target Porsi per Hari */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#ECE2D2] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1E3F33]">
                        1. Target Penjualan Menu per Hari
                      </label>
                      <span className="px-3 py-1 rounded-full bg-[#234E3E] text-white text-xs font-extrabold">
                        {portionsPerDay} Porsi / Hari
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="5"
                      value={portionsPerDay}
                      onChange={(e) => setPortionsPerDay(Number(e.target.value))}
                      className="w-full h-2.5 bg-[#DFD6C9] rounded-lg appearance-none cursor-pointer accent-[#234E3E]"
                    />
                    <div className="flex justify-between text-[11px] text-[#7D7061] font-semibold">
                      <span>10 Porsi (Rintisan)</span>
                      <span>100 Porsi (Ramai)</span>
                      <span>200 Porsi (Resto Besar)</span>
                    </div>

                    {/* Operational Days Toggle */}
                    <div className="pt-2 flex items-center justify-between text-xs text-[#4F6359] border-t border-[#E8DFD3] mt-3">
                      <span>Hari Operasional Sebulan:</span>
                      <div className="flex gap-2">
                        {[25, 26, 30].map((days) => (
                          <button
                            key={days}
                            type="button"
                            onClick={() => setDaysPerMonth(days)}
                            className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                              daysPerMonth === days
                                ? 'bg-[#234E3E] text-white shadow-sm'
                                : 'bg-[#EAE2D5] text-[#5C7368] hover:bg-[#DFD6C9]'
                            }`}
                          >
                            {days} Hari
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Input 2: Estimasi Harga Modal Beli per Bal (5Kg) */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#ECE2D2] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1E3F33]">
                        2. Estimasi Harga Modal Beli per Bal (5Kg)
                      </label>
                      <span className="text-[11px] text-[#5C7368]">Dapat diubah bebas</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#5C7368]">
                        Rp
                      </span>
                      <input
                        type="number"
                        min="10000"
                        max="300000"
                        step="5000"
                        value={costPerBalKuliner}
                        onChange={(e) => setCostPerBalKuliner(Math.max(0, Number(e.target.value)))}
                        className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-[#D5C7B7] text-[#1E3F33] text-sm font-extrabold focus:outline-none focus:ring-2 focus:ring-[#234E3E]"
                      />
                    </div>

                    {/* Auto-calculated portion cost from 1 bal = ±100 portions */}
                    <div className="p-3 rounded-2xl bg-[#EBF7E9] border border-[#CFE8CA] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#1E3F33] font-bold">
                        <Sparkles className="w-4 h-4 text-[#234E3E] shrink-0" />
                        <span>Estimasi Modal per Porsi:</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-[#234E3E]">
                          {formatRp(calculatedCostPerPortion)}
                        </span>
                        <span className="text-[10.5px] text-[#5C7368] font-semibold"> / porsi (±100 porsi/bal)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#5C7368] pt-1">
                      <span>Belum tahu harga modal pabrik?</span>
                      <button
                        type="button"
                        onClick={() => onOpenContact('Tanya Harga Modal Grosir Mie Losspack 5Kg')}
                        className="text-[#234E3E] font-bold underline hover:text-[#18392D]"
                      >
                        Tanya Sales via WhatsApp
                      </button>
                    </div>
                  </div>

                  {/* Slider 3: Target Harga Jual Menu per Porsi */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#ECE2D2] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1E3F33]">
                        3. Rencana Harga Jual Menu Jadi
                      </label>
                      <span className="px-3 py-1 rounded-full bg-[#234E3E] text-white text-xs font-extrabold">
                        {formatRp(sellingPricePerPortion)} / porsi
                      </span>
                    </div>
                    <input
                      type="range"
                      min="8000"
                      max="35000"
                      step="1000"
                      value={sellingPricePerPortion}
                      onChange={(e) => setSellingPricePerPortion(Number(e.target.value))}
                      className="w-full h-2.5 bg-[#DFD6C9] rounded-lg appearance-none cursor-pointer accent-[#234E3E]"
                    />
                    <div className="flex justify-between text-[11px] text-[#7D7061] font-semibold">
                      <span>Rp 10.000 (Warung/Kaki Lima)</span>
                      <span>Rp 18.000 (Kedai/Kafe)</span>
                      <span>Rp 30.000+ (Resto)</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Mode Reseller: Target Penjualan Bal per Bulan */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#ECE2D2] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1E3F33]">
                        1. Target Penjualan per Bulan
                      </label>
                      <span className="px-3 py-1 rounded-full bg-[#234E3E] text-white text-xs font-extrabold">
                        {resellerMonthlyVolume} Bal ({resellerMonthlyVolume * 5} Kg)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="200"
                      step="5"
                      value={resellerMonthlyVolume}
                      onChange={(e) => setResellerMonthlyVolume(Number(e.target.value))}
                      className="w-full h-2.5 bg-[#DFD6C9] rounded-lg appearance-none cursor-pointer accent-[#234E3E]"
                    />
                    <div className="flex justify-between text-[11px] text-[#7D7061] font-semibold">
                      <span>5 Bal (Pemula)</span>
                      <span>50 Bal (Agen Wilayah)</span>
                      <span>200 Bal (Distributor)</span>
                    </div>
                  </div>

                  {/* Mode Reseller: Estimasi Modal Beli per Bal */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#ECE2D2] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1E3F33]">
                        2. Estimasi Harga Beli Modal per Bal
                      </label>
                      <span className="text-[11px] text-[#5C7368]">Dapat disesuaikan</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#5C7368]">
                        Rp
                      </span>
                      <input
                        type="number"
                        min="10000"
                        max="200000"
                        step="5000"
                        value={resellerBuyPrice}
                        onChange={(e) => setResellerBuyPrice(Math.max(0, Number(e.target.value)))}
                        className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-[#D5C7B7] text-[#1E3F33] text-sm font-extrabold focus:outline-none focus:ring-2 focus:ring-[#234E3E]"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#5C7368] pt-1">
                      <span>Ingin tahu pricelist resmi distributor?</span>
                      <button
                        type="button"
                        onClick={() => onOpenContact('Minta Katalog Pricelist Distributor & Reseller')}
                        className="text-[#234E3E] font-bold underline hover:text-[#18392D]"
                      >
                        Minta Pricelist ke Sales
                      </button>
                    </div>
                  </div>

                  {/* Mode Reseller: Target Harga Jual ke Konsumen */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#ECE2D2] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1E3F33]">
                        3. Target Harga Jual ke Pelanggan / Konsumen
                      </label>
                      <span className="text-[11px] text-[#5C7368]">Tentukan harga Anda</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#5C7368]">
                        Rp
                      </span>
                      <input
                        type="number"
                        min="10000"
                        max="300000"
                        step="5000"
                        value={resellerSellPrice}
                        onChange={(e) => setResellerSellPrice(Math.max(0, Number(e.target.value)))}
                        className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-[#D5C7B7] text-[#1E3F33] text-sm font-extrabold focus:outline-none focus:ring-2 focus:ring-[#234E3E]"
                      />
                    </div>
                    <div className="text-[11px] text-[#7D7061] font-medium pt-1">
                      Tentukan harga jual yang sesuai dengan kondisi pasar, biaya kirim, dan saluran pemasaran di wilayah Anda.
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Right Column: Live Output Dashboard */}
            <div className="lg:col-span-6 bg-[#1E3F33] text-white p-4 sm:p-7 rounded-3xl border border-[#2D5A49] shadow-inner space-y-4 sm:space-y-5">
              
              <div className="flex items-center justify-between border-b border-[#2D5A49] pb-3 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <TrendingUp className="w-5 h-5 text-[#A3D99B] shrink-0" />
                  <span className="font-extrabold text-sm sm:text-base text-white truncate">
                    Hasil Proyeksi Keuntungan
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#A3D99B]/20 text-[#A3D99B] border border-[#A3D99B]/30 shrink-0 text-center">
                  {mode === 'kuliner' ? 'Simulasi Usaha Kuliner' : 'Simulasi Reseller / Agen'}
                </span>
              </div>

              {/* Big Highlight: Estimasi Keuntungan Bersih/Kotor */}
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#234E3E] border border-[#2F6551] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#A3D99B] mb-1">
                    {mode === 'kuliner' ? 'Estimasi Laba Kotor per Bulan:' : 'Estimasi Keuntungan per Bulan:'}
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-display tracking-tight flex flex-wrap items-baseline gap-1">
                    <span>{formatRp(currentProfit)}</span>
                    <span className="text-xs font-normal text-[#A3D99B]/80"> / bulan</span>
                  </div>
                  {mode === 'kuliner' && (
                    <div className="text-[11px] text-[#A3D99B]/90 mt-1 font-semibold leading-snug">
                      Modal bahan: {formatRp(calculatedCostPerPortion)} / porsi (±100 porsi / bal)
                    </div>
                  )}
                </div>
                <div className="shrink-0 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1 text-xs font-black text-[#1E3F33] bg-[#A3D99B] px-3.5 py-1.5 rounded-full shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    Margin {currentMargin}%
                  </span>
                </div>
              </div>

              {/* 4 Stats Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#234E3E] border border-[#2F6551] flex flex-col justify-between overflow-hidden min-w-0">
                  <div className="text-[10px] sm:text-xs text-[#A3D99B] font-semibold mb-1 leading-tight">
                    {mode === 'kuliner' ? 'Total Porsi per Bulan' : 'Volume Penjualan'}
                  </div>
                  <div className="text-[13px] sm:text-base lg:text-lg font-black text-white tracking-tight break-words">
                    {mode === 'kuliner' ? (
                      <>± {totalMonthlyPortions.toLocaleString('id-ID')} <span className="text-[10px] sm:text-xs font-semibold text-[#A3D99B]/80 block sm:inline">Porsi</span></>
                    ) : (
                      <>{resellerMonthlyVolume} <span className="text-[10px] sm:text-xs font-semibold text-[#A3D99B]/80 block sm:inline">Bal ({resellerMonthlyVolume * 5} Kg)</span></>
                    )}
                  </div>
                </div>

                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#234E3E] border border-[#2F6551] flex flex-col justify-between overflow-hidden min-w-0">
                  <div className="text-[10px] sm:text-xs text-[#A3D99B] font-semibold mb-1 leading-tight">
                    {mode === 'kuliner' ? 'Kebutuhan Bahan Baku' : 'Estimasi Laba per Bal'}
                  </div>
                  <div className="text-[13px] sm:text-base lg:text-lg font-black text-white tracking-tight break-words">
                    {mode === 'kuliner' ? (
                      <>{estimatedPackages} <span className="text-[10px] sm:text-xs font-semibold text-[#A3D99B]/80 block sm:inline">Bal ({estimatedKg} Kg)</span></>
                    ) : (
                      <>{formatRp(resellerSellPrice - resellerBuyPrice)}</>
                    )}
                  </div>
                </div>

                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#234E3E] border border-[#2F6551] flex flex-col justify-between overflow-hidden min-w-0">
                  <div className="text-[10px] sm:text-xs text-[#A3D99B] font-semibold mb-1 leading-tight">
                    Total Modal Pengadaan
                  </div>
                  <div className="text-[13px] sm:text-base lg:text-lg font-black text-white tracking-tight break-words">
                    {formatRp(currentCost)}
                  </div>
                </div>

                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#234E3E] border border-[#2F6551] flex flex-col justify-between overflow-hidden min-w-0">
                  <div className="text-[10px] sm:text-xs text-[#A3D99B] font-semibold mb-1 leading-tight">
                    Potensi Omzet Penjualan
                  </div>
                  <div className="text-[13px] sm:text-base lg:text-lg font-black text-[#A3D99B] tracking-tight break-words">
                    {formatRp(currentRevenue)}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={handleConsultation}
                className="w-full btn-curved btn-matcha-primary px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:scale-[1.01] transition-transform duration-300 text-center leading-snug"
              >
                <span>Konsultasi Simulasi & Minta Penawaran Harga</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
// Updated: Input 2 Bal calculation and auto portion estimate
