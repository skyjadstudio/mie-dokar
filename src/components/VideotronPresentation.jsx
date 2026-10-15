import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  UtensilsCrossed, 
  Award, 
  TrendingUp, 
  Phone, 
  Globe, 
  MapPin, 
  QrCode,
  Flame,
  Scale,
  HeartPulse,
  Clock
} from 'lucide-react';
import { getAssetUrl, BRAND_INFO } from '../data/productKnowledgeData';

export default function VideotronPresentation({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(7000); // 7s standard for videotron
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalSlides = 8;

  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const progressStartRef = useRef(Date.now());

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    if (!isPlaying) {
      setProgress(0);
      return;
    }

    setProgress(0);
    progressStartRef.current = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - progressStartRef.current;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(progressIntervalRef.current);
      }
    }, 50);

    timerRef.current = setTimeout(() => {
      setCurrentSlide(prev => (prev >= totalSlides ? 1 : prev + 1));
    }, duration);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentSlide, isPlaying, duration]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlide(prev => (prev >= totalSlides ? 1 : prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlide(prev => (prev <= 1 ? totalSlides : prev - 1));
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(p => !p);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape' && !document.fullscreenElement && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides, onClose]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#06110C] text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Top Controls Bar */}
      <div className="w-full bg-[#0A1A13]/90 border-b border-[#1E4A35] px-4 py-2 flex items-center justify-between text-xs z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-black tracking-wider text-[#A3D99B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A3D99B] animate-ping" />
            <span className="uppercase tracking-widest">VIDEOTRON DECK (16:9)</span>
          </div>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="font-extrabold text-white hidden sm:inline">MIE RESHIK CAP DOKAR</span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="px-2.5 py-0.5 rounded bg-white/10 font-black text-white">
            Slide {currentSlide} / {totalSlides}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Duration Selector */}
          <div className="hidden md:flex items-center gap-1.5 text-white/70 text-xs">
            <span>Durasi:</span>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="bg-[#143224] text-[#A3D99B] font-bold px-2 py-1 rounded border border-[#23553E] focus:outline-none"
            >
              <option value={5000}>5 Detik</option>
              <option value={7000}>7 Detik (Standar LED)</option>
              <option value={10000}>10 Detik</option>
              <option value={15000}>15 Detik</option>
            </select>
          </div>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 rounded bg-[#143224] hover:bg-[#1E4A35] text-white font-bold border border-[#23553E] flex items-center gap-1.5 transition text-xs"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#A3D99B]" /> : <Play className="w-3.5 h-3.5 text-[#F3B23E]" />}
            <span>{isPlaying ? 'Jeda' : 'Putar'}</span>
          </button>

          {/* Prev / Next */}
          <button
            onClick={() => setCurrentSlide(prev => (prev <= 1 ? totalSlides : prev - 1))}
            className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition"
            title="Slide Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide(prev => (prev >= totalSlides ? 1 : prev + 1))}
            className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition"
            title="Slide Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="px-3 py-1 rounded bg-[#A3D99B] hover:bg-[#B5E5AD] text-[#0A1A13] font-black flex items-center gap-1 transition shadow-md text-xs"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Layar Penuh</span>
          </button>

          {/* Close Modal (if in modal mode) */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-red-500/20 hover:bg-red-500/40 text-red-200 font-bold transition ml-1"
              title="Tutup Videotron"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/10 overflow-hidden shrink-0">
        <div 
          className="h-full bg-gradient-to-r from-[#A3D99B] via-[#F3B23E] to-[#A3D99B] transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* MAIN 16:9 VIDEOTRON STAGE */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        <div className="w-full aspect-video max-h-[calc(100vh-115px)] max-w-[177.78vh] relative overflow-hidden bg-gradient-to-br from-[#0A2217] via-[#103022] to-[#081811] border-2 border-[#1E4A35] rounded-3xl shadow-2xl flex flex-col justify-between p-6 sm:p-8 md:p-12">
          
          {/* Ambient Glows */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#A3D99B]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#F3B23E]/15 rounded-full blur-3xl pointer-events-none" />

          {/* ==================== SLIDE 1: BRAND HOOK ==================== */}
          {currentSlide === 1 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A3D99B]/20 border border-[#A3D99B]/50 text-[#A3D99B] text-xs sm:text-sm font-black">
                  <span>🌿</span>
                  <span>PELOPOR MIE SINGKONG SEHAT SEJAK 2014</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-[#A3D99B]/90 tracking-widest uppercase">
                  KARYA FX. SUBENO • BANTUL, YOGYAKARTA
                </span>
              </div>

              <div className="grid grid-cols-12 gap-6 items-center my-auto">
                <div className="col-span-7 space-y-4">
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={getAssetUrl("images/dokar_logo_official.png")} 
                      alt="Logo Dokar" 
                      className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-[#A3D99B] shadow-xl shrink-0 object-cover bg-white"
                    />
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#A3D99B] font-extrabold">ORIGINAL CASSAVA NOODLES</span>
                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-white font-display">
                        MIE RESHIK <span className="text-[#A3D99B] drop-shadow-[0_0_20px_rgba(163,217,155,0.4)]">CAP DOKAR</span>
                      </h1>
                    </div>
                  </div>
                  
                  <p className="text-lg sm:text-2xl font-black text-[#F3B23E] drop-shadow-md">
                    Makanan Sehat untuk Harimu • Sensasi Kenyal Alami
                  </p>
                  <p className="text-xs sm:text-base text-[#D0E2CE] font-normal leading-relaxed max-w-xl">
                    Mie sehat alami berbahan <strong>singkong pilihan nusantara</strong> (bukan tepung terigu). 100% bebas gluten, rendah gula, dan diproses semi-modern tanpa pengawet & tanpa bahan kimia apapun.
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <span className="px-3.5 py-1.5 rounded-xl bg-[#173C2C] border border-[#2B6149] text-white text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-md">
                      <span className="text-[#A3D99B]">✔</span> 100% Bebas Gluten
                    </span>
                    <span className="px-3.5 py-1.5 rounded-xl bg-[#173C2C] border border-[#2B6149] text-white text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-md">
                      <span className="text-[#A3D99B]">✔</span> 16x Lebih Kaya Serat
                    </span>
                    <span className="px-3.5 py-1.5 rounded-xl bg-[#173C2C] border border-[#2B6149] text-white text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-md">
                      <span className="text-[#A3D99B]">✔</span> 0% Pewarna & Pengawet
                    </span>
                  </div>
                </div>

                <div className="col-span-5 flex justify-center items-center">
                  <div className="w-56 sm:w-72 md:w-80 h-56 sm:h-72 md:h-80 rounded-3xl bg-gradient-to-tr from-[#163829] to-[#255741] border-2 border-[#A3D99B]/60 p-4 shadow-2xl relative flex flex-col items-center justify-center text-center overflow-hidden">
                    <img 
                      src={getAssetUrl("images/hero_food_plate.png")} 
                      alt="Mie Reshik Cap Dokar" 
                      className="w-44 sm:w-60 h-44 sm:h-60 object-contain drop-shadow-2xl"
                    />
                    <div className="absolute bottom-2.5 left-3 right-3 bg-[#0A1F16]/95 backdrop-blur-md py-1.5 px-3 rounded-xl border border-[#A3D99B]/40 text-[11px] sm:text-xs text-[#A3D99B] font-black">
                      100% Singkong Pilihan • Kenyal Alami
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-2.5">
                <span>📍 Pabrik: Srandakan, Bantul, D.I. Yogyakarta</span>
                <span className="font-black text-[#A3D99B]">skyjadstudio.github.io/mie-dokar</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 2: MENGAPA SINGKONG? ==================== */}
          {currentSlide === 2 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3B23E]/20 border border-[#F3B23E]/50 text-[#F3B23E] text-xs sm:text-sm font-black">
                  <span>⚡ REVOLUSI SEHAT</span>
                  <span>SINGKONG VS TEPUNG TERIGU</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-[#A3D99B]">
                  SOLUSI DIET & GAYA HIDUP SEHAT
                </span>
              </div>

              <div className="grid grid-cols-12 gap-6 items-center my-auto">
                <div className="col-span-5 space-y-4">
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-display">
                    Bukan Terigu, Tapi <span className="text-[#A3D99B]">Singkong Asli!</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D0E2CE] leading-relaxed">
                    Tepung terigu tinggi gluten dan indeks glikemik yang memicu risiko diabetes dan masalah pencernaan. Mie Dokar menghadirkan <strong>karbohidrat kompleks alami</strong> yang aman dikonsumsi harian.
                  </p>
                  <div className="p-4 rounded-2xl bg-[#143526] border border-[#285A43] flex items-center gap-4">
                    <div className="text-3xl sm:text-5xl font-black text-[#F3B23E] leading-none font-display">16x</div>
                    <div className="text-xs sm:text-sm font-bold text-[#E5F5E2]">
                      Lebih kaya serat alami dibanding mie terigu konvensional!
                    </div>
                  </div>
                </div>

                <div className="col-span-7 space-y-3">
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="p-3.5 rounded-xl bg-[#163B2C] border border-[#2F6D52] space-y-1">
                      <div className="text-xl">🌾</div>
                      <div className="text-xs sm:text-sm font-black text-white">Bebas Gluten</div>
                      <div className="text-[10.5px] text-[#C5DFC3]">Aman maag, GERD, celiac & autoimun.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#163B2C] border border-[#2F6D52] space-y-1">
                      <div className="text-xl">🩸</div>
                      <div className="text-xs sm:text-sm font-black text-white">Rendah Gula</div>
                      <div className="text-[10.5px] text-[#C5DFC3]">Low GI, cegah lonjakan gula darah.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#163B2C] border border-[#2F6D52] space-y-1">
                      <div className="text-xl">⚖️</div>
                      <div className="text-xs sm:text-sm font-black text-white">Kenyang Lama</div>
                      <div className="text-[10.5px] text-[#C5DFC3]">Serat padat, energi stabil tanpa begah.</div>
                    </div>
                  </div>

                  {/* Comparison Table */}
                  <div className="rounded-2xl overflow-hidden border border-[#2D654E] bg-[#102B1F] text-xs">
                    <div className="grid grid-cols-3 bg-[#19402E] p-2.5 font-black text-center text-[#A3D99B]">
                      <div>Parameter Pangan</div>
                      <div>Mie Dokar (Singkong)</div>
                      <div className="text-white/60">Mie Terigu Biasa</div>
                    </div>
                    <div className="grid grid-cols-3 p-2.5 border-t border-[#1C4834] text-center">
                      <span className="font-bold text-white text-left pl-3">Gluten</span>
                      <span className="text-[#A3D99B] font-black">0% (Bebas Gluten)</span>
                      <span className="text-white/60">Tinggi Gluten</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5 border-t border-[#1C4834] text-center bg-white/[0.02]">
                      <span className="font-bold text-white text-left pl-3">Serat Alami</span>
                      <span className="text-[#F3B23E] font-black">16x Lebih Tinggi</span>
                      <span className="text-white/60">Rendah Serat</span>
                    </div>
                    <div className="grid grid-cols-3 p-2.5 border-t border-[#1C4834] text-center">
                      <span className="font-bold text-white text-left pl-3">Bahan Kimia</span>
                      <span className="text-[#A3D99B] font-black">0% (Alami Murni)</span>
                      <span className="text-white/60">Sering Berpengawet</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-2.5">
                <span>Solusi Pangan Masa Depan Indonesia Bebas Diabetes</span>
                <span className="font-black text-[#F3B23E]">MIE RESHIK CAP DOKAR • PILIHAN HIDUP SEHAT</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 3: HIGIENITAS PABRIK ==================== */}
          {currentSlide === 3 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A3D99B]/20 border border-[#A3D99B]/50 text-[#A3D99B] text-xs sm:text-sm font-black">
                  <span>⚙️ STANDAR PABRIK SEMI-MODERN</span>
                  <span>100% HIGIENIS & FOOD GRADE</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-white/90">
                  TIDAK MENGGUNAKAN TENAGA HEWAN
                </span>
              </div>

              <div className="grid grid-cols-12 gap-6 items-center my-auto">
                <div className="col-span-6 space-y-4">
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-display">
                    Mesin Stainless Steel <span className="text-[#A3D99B]">304 Food Grade</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D0E2CE] leading-relaxed">
                    Berbeda dengan produsen tradisional lainnya, Mie Reshik Cap Dokar diproduksi semi-modern dengan mesin baja nirkarat <strong>stainless steel 304 food grade</strong> demi menjamin mutu pangan bersih tanpa kontaminasi.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-white">
                      <span className="w-5 h-5 rounded-full bg-[#A3D99B] text-[#0A1A13] flex items-center justify-center font-black text-xs shrink-0">✓</span>
                      <span>100% Higienis Tanpa Tenaga Hewan / Sapi</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-white">
                      <span className="w-5 h-5 rounded-full bg-[#A3D99B] text-[#0A1A13] flex items-center justify-center font-black text-xs shrink-0">✓</span>
                      <span>Pengeringan Sinar Matahari Alami untuk Kekenyalan Asli</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-white">
                      <span className="w-5 h-5 rounded-full bg-[#A3D99B] text-[#0A1A13] flex items-center justify-center font-black text-xs shrink-0">✓</span>
                      <span>Teruji Laboratorium Pangan UGM & Kualitas Air Cek Puskesmas</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#143526] border border-[#285A43] text-center space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-[#A3D99B]">0%</div>
                    <div className="text-xs sm:text-sm font-extrabold text-white">Pengawet Kimia</div>
                    <div className="text-[10.5px] text-[#A3D99B]/80">Tahan 12 bulan berkat kadar air rendah</div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#143526] border border-[#285A43] text-center space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-[#A3D99B]">0%</div>
                    <div className="text-xs sm:text-sm font-extrabold text-white">Pewarna Sintetik</div>
                    <div className="text-[10.5px] text-[#A3D99B]/80">Warna coklat bening asli pati singkong</div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#143526] border border-[#285A43] text-center space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-[#A3D99B]">0%</div>
                    <div className="text-xs sm:text-sm font-extrabold text-white">Pengenyal Buatan</div>
                    <div className="text-[10.5px] text-[#A3D99B]/80">Kenyal alami dari tapioka murni</div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#143526] border border-[#285A43] text-center space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-[#F3B23E]">2.5 Ton</div>
                    <div className="text-xs sm:text-sm font-extrabold text-white">Kapasitas Produksi</div>
                    <div className="text-[10.5px] text-[#F3B23E]/80">Per siklus produksi siap kirim stabil</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-2.5">
                <span>Menjamin Keamanan Pangan bagi Konsumen Rumah Tangga & Bisnis Kuliner</span>
                <span className="font-black text-[#A3D99B]">MIE RESHIK = MIE BERSIH & BERMUTU</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 4: VARIAN RETAIL ==================== */}
          {currentSlide === 4 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A3D99B]/20 border border-[#A3D99B]/50 text-[#A3D99B] text-xs sm:text-sm font-black">
                  <span>🍜 KEMASAN KELUARGA</span>
                  <span>PRAKTIS DISERTAI BUMBU ALAMI</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-[#F3B23E]">
                  SANTAPAN SEHAT PRAKTIS DI RUMAH
                </span>
              </div>

              <div className="grid grid-cols-12 gap-6 items-center my-auto">
                <div className="col-span-7 space-y-3.5">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#F3B23E] text-[#0A1A13] text-xs font-black">
                    KEMASAN 250 GRAM • 3-4 PORSI KENYANG
                  </div>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-display">
                    Mie Singkong Retail <br/>
                    <span className="text-[#A3D99B]">(Disertai Bumbu)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D0E2CE] leading-relaxed">
                    Kini memasak mie singkong sehat di rumah semudah mie instan! Dilengkapi bumbu rempah alami gurih nikmat tanpa perlu repot meracik sendiri.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-[#143526] border border-[#285A43]">
                      <div className="font-black text-white text-xs sm:text-sm">Disertai Bumbu Alami</div>
                      <div className="text-[10.5px] text-[#A3D99B] mt-0.5">Gurih pas & aman tanpa MSG berlebih</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#143526] border border-[#285A43]">
                      <div className="font-black text-white text-xs sm:text-sm">Kemasan Rapi & Higienis</div>
                      <div className="text-[10.5px] text-[#A3D99B] mt-0.5">Sablon eksklusif, tersegel rapat & awet</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#143526] border border-[#285A43]">
                      <div className="font-black text-white text-xs sm:text-sm">Disukai Anak-Anak</div>
                      <div className="text-[10.5px] text-[#A3D99B] mt-0.5">Kenyal lembut & sangat ramah lambung</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#143526] border border-[#285A43]">
                      <div className="font-black text-white text-xs sm:text-sm">Aneka Menu Lezat</div>
                      <div className="text-[10.5px] text-[#A3D99B] mt-0.5">Sempurna untuk Mie Goreng & Mie Kuah</div>
                    </div>
                  </div>
                </div>

                <div className="col-span-5 flex justify-center">
                  <div className="w-full max-w-xs p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#173F2D] to-[#0E271C] border-2 border-[#A3D99B]/50 text-center space-y-2.5 shadow-2xl">
                    <img 
                      src={getAssetUrl("images/mie_singkong_hero_dish.jpg")} 
                      alt="Hidangan Mie Singkong" 
                      className="w-48 sm:w-56 h-36 sm:h-44 mx-auto object-cover rounded-2xl border border-[#A3D99B]/40 shadow-md"
                    />
                    <div className="text-sm font-black text-white">Kemasan Retail 250gr</div>
                    <div className="text-[11px] text-[#A3D99B] font-bold">Cocok untuk Toko Oleh-Oleh, Sayur & E-Commerce</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-2.5">
                <span>Praktis, Nikmat, & Penuh Manfaat Nutrisi Alami</span>
                <span className="font-black text-[#A3D99B]">TERSEDIA HARGA KHUSUS DISPLAY TOKO & RESELLER</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 5: VARIAN LOSSPACK 5KG ==================== */}
          {currentSlide === 5 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3B23E]/20 border border-[#F3B23E]/50 text-[#F3B23E] text-xs sm:text-sm font-black">
                  <span>🥘 VARIAN HOREKA & WARUNG BAKMI</span>
                  <span>KEMASAN BAL 5 KG</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-[#A3D99B]">
                  SOLUSI CUAN USAHA KULINER
                </span>
              </div>

              <div className="grid grid-cols-12 gap-6 items-center my-auto">
                <div className="col-span-7 space-y-3.5">
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-display">
                    Losspack 5 Kg: Rahasia Dapur <span className="text-[#A3D99B]">Kenyal & Laba Tebal</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D0E2CE] leading-relaxed">
                    Dikhususkan untuk pengusaha warung bakmi Jawa, resto, kedai mie modern, katering, hingga hotel. <strong>Kenyal alami, tahan banting, dan tidak mudah lodoh</strong> saat dimasak di wajan panas.
                  </p>

                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    <div className="p-3.5 rounded-2xl bg-[#173E2E] border border-[#2E684E] text-center">
                      <div className="text-2xl sm:text-3xl font-black text-[#A3D99B]">± 100</div>
                      <div className="text-xs font-bold text-white mt-0.5">Porsi per Bal</div>
                      <div className="text-[10px] text-[#A3D99B]/80">Sangat hemat modal</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#173E2E] border border-[#2E684E] text-center">
                      <div className="text-2xl sm:text-3xl font-black text-[#F3B23E]">60%+</div>
                      <div className="text-xs font-bold text-white mt-0.5">Potensi Margin</div>
                      <div className="text-[10px] text-[#F3B23E]/80">Laba kuliner tinggi</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#173E2E] border border-[#2E684E] text-center">
                      <div className="text-2xl sm:text-3xl font-black text-white">0%</div>
                      <div className="text-xs font-bold text-white mt-0.5">Risiko Lodoh</div>
                      <div className="text-[10px] text-white/80">Kuat saat digoreng</div>
                    </div>
                  </div>
                </div>

                <div className="col-span-5 flex justify-center">
                  <div className="w-full max-w-xs p-4 sm:p-5 rounded-3xl bg-[#133325] border-2 border-[#A3D99B] space-y-2.5 shadow-2xl">
                    <img 
                      src={getAssetUrl("images/mie_losspack_hero_dish.jpg")} 
                      alt="Losspack Cooked Dish" 
                      className="w-full h-32 sm:h-36 object-cover rounded-2xl border border-[#A3D99B]/50 shadow-md"
                    />
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                      <span className="text-xs font-black text-[#A3D99B]">Spesifikasi Bal 5 Kg</span>
                      <span className="text-[10.5px] font-black text-[#F3B23E] bg-[#F3B23E]/20 px-2 py-0.5 rounded">±100 Porsi</span>
                    </div>
                    <ul className="text-[11px] sm:text-xs space-y-1.5 text-[#E2EFE0]">
                      <li className="flex items-center gap-1.5"><span>✔</span> <strong>Bentuk:</strong> Untaian mie padat kering 5 Kg</li>
                      <li className="flex items-center gap-1.5"><span>✔</span> <strong>Masa Simpan:</strong> 12 Bulan suhu ruang kering</li>
                      <li className="flex items-center gap-1.5"><span>✔</span> <strong>Suplai:</strong> Langsung pabrik tangan pertama</li>
                    </ul>
                    <div className="p-2 rounded-xl bg-[#0A1F16] text-center text-xs text-[#A3D99B] font-black">
                      Minta Penawaran Harga Grosir Pabrik
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-2.5">
                <span>Pilihan Terbaik untuk Bakmi Goreng, Bakmi Kuah, Bakso & Ramen Sehat</span>
                <span className="font-black text-[#A3D99B]">KAPASITAS SUPLAI 1.5 - 2.5 TON PER SIKLUS</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 6: MITRA BINTANG ==================== */}
          {currentSlide === 6 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A3D99B]/20 border border-[#A3D99B]/50 text-[#A3D99B] text-xs sm:text-sm font-black">
                  <span>🤝 PORTOFOLIO & REPUTASI</span>
                  <span>DIPERCAYA INDUSTRI BINTANG</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-white/90">
                  KUALITAS STANDAR NASIONAL
                </span>
              </div>

              <div className="space-y-4 my-auto">
                <div className="text-center max-w-2xl mx-auto space-y-1.5">
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display">
                    Dipercaya Oleh <span className="text-[#A3D99B]">Mitra Bergengsi</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D0E2CE]">
                    Kualitas higienis dan cita rasa istimewa Mie Dokar telah lolos kurasi ketat industri perhotelan bintang dan penyedia pangan organik nasional.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3.5 sm:gap-5">
                  {/* Novotel */}
                  <div className="p-4 sm:p-5 rounded-3xl bg-[#143727] border-2 border-[#296549] text-center space-y-2.5 hover:border-[#A3D99B] transition flex flex-col justify-between">
                    <div className="h-12 flex items-center justify-center bg-white/95 p-2 rounded-xl">
                      <img src={getAssetUrl("images/novotel_logo.png")} alt="Novotel Hotels" className="max-h-8 object-contain" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-black text-white">Novotel Hotels & Resorts</div>
                      <div className="text-[11px] text-[#C5DFC3] mt-1 leading-snug">
                        Supplier tetap sejak <strong>2021</strong> untuk standar kuliner hotel berbintang internasional.
                      </div>
                    </div>
                    <span className="inline-block text-[10px] font-black text-[#A3D99B] bg-[#0E261C] px-2.5 py-1 rounded-full">
                      Hospitality Grade
                    </span>
                  </div>

                  {/* Lingkar Organik */}
                  <div className="p-4 sm:p-5 rounded-3xl bg-[#143727] border-2 border-[#296549] text-center space-y-2.5 hover:border-[#A3D99B] transition flex flex-col justify-between">
                    <div className="h-12 flex items-center justify-center bg-white/95 p-2 rounded-xl">
                      <img src={getAssetUrl("images/lingkar_organik_logo.png")} alt="Lingkar Organik" className="max-h-8 object-contain" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-black text-white">Lingkar Organik</div>
                      <div className="text-[11px] text-[#C5DFC3] mt-1 leading-snug">
                        Supplier terpercaya sejak <strong>2020</strong> untuk jaringan pangan sehat organik se-Indonesia.
                      </div>
                    </div>
                    <span className="inline-block text-[10px] font-black text-[#A3D99B] bg-[#0E261C] px-2.5 py-1 rounded-full">
                      Certified Organic Supply
                    </span>
                  </div>

                  {/* Shopee */}
                  <div className="p-4 sm:p-5 rounded-3xl bg-[#143727] border-2 border-[#296549] text-center space-y-2.5 hover:border-[#A3D99B] transition flex flex-col justify-between">
                    <div className="h-12 flex items-center justify-center bg-white/95 p-2 rounded-xl">
                      <img src={getAssetUrl("images/shopee_logo.png")} alt="Shopee Hub" className="max-h-8 object-contain" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-black text-white">Shopee & E-Commerce</div>
                      <div className="text-[11px] text-[#C5DFC3] mt-1 leading-snug">
                        Suplier bagi ribuan reseller & toko online dengan rating 4.9+ di marketplace nasional.
                      </div>
                    </div>
                    <span className="inline-block text-[10px] font-black text-[#A3D99B] bg-[#0E261C] px-2.5 py-1 rounded-full">
                      Rating 4.9+ Terverifikasi
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-2.5">
                <span>Pengiriman Menjangkau Berbagai Kota di Seluruh Indonesia</span>
                <span className="font-black text-[#A3D99B]">TERBUKA JALUR DISTRIBUTOR DAERAH</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 7: LEGALITAS RESMI ==================== */}
          {currentSlide === 7 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A3D99B]/20 border border-[#A3D99B]/50 text-[#A3D99B] text-xs sm:text-sm font-black">
                  <span>📜 LEGALITAS & INTEGRITAS</span>
                  <span>100% AMAN & RESMI TERDAFTAR</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-white/90">
                  KEPERCAYAAN ADALAH PRIORITAS
                </span>
              </div>

              <div className="grid grid-cols-12 gap-6 items-center my-auto">
                <div className="col-span-5 space-y-4">
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-display">
                    Sertifikasi Lengkap & <span className="text-[#A3D99B]">Terverifikasi</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D0E2CE] leading-relaxed">
                    Mie Reshik Cap Dokar menjamin setiap kemasan yang beredar telah mengantongi izin resmi pemerintah, sertifikasi halal, dan perlindungan merek terdaftar.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-[#143425] border border-[#275941] text-xs text-[#C8E4C4] space-y-1">
                    <div className="font-black text-[#A3D99B] text-xs sm:text-sm">Integritas Pendiri (FX. Subeno):</div>
                    <div>Berkomitmen menyejahterakan petani singkong lokal serta memajukan kedaulatan pangan sehat nusantara.</div>
                  </div>
                </div>

                <div className="col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#163B2C] border-2 border-[#2E6B4F] space-y-1.5">
                    <div className="text-xl">🕌</div>
                    <div className="text-xs sm:text-sm font-black text-white">Sertifikat Halal Resmi</div>
                    <div className="text-[11px] font-mono text-[#A3D99B] bg-[#0E261C] p-1.5 rounded font-bold">
                      ID34110000559820922
                    </div>
                    <div className="text-[10px] text-[#C5DFC3]">BPJPH Kementerian Agama RI</div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#163B2C] border-2 border-[#2E6B4F] space-y-1.5">
                    <div className="text-xl">🏛️</div>
                    <div className="text-xs sm:text-sm font-black text-white">Nomor Induk Berusaha (NIB)</div>
                    <div className="text-[11px] font-mono text-[#A3D99B] bg-[#0E261C] p-1.5 rounded font-bold">
                      1205000111318
                    </div>
                    <div className="text-[10px] text-[#C5DFC3]">Kementerian Investasi / BKPM RI</div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#163B2C] border-2 border-[#2E6B4F] space-y-1.5">
                    <div className="text-xl">🛡️</div>
                    <div className="text-xs sm:text-sm font-black text-white">HAKI Merek Terdaftar</div>
                    <div className="text-[11px] font-mono text-[#A3D99B] bg-[#0E261C] p-1.5 rounded font-bold">
                      IDM000835742
                    </div>
                    <div className="text-[10px] text-[#C5DFC3]">Hak Eksklusif Kemenkumham RI</div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#163B2C] border-2 border-[#2E6B4F] space-y-1.5">
                    <div className="text-xl">🔬</div>
                    <div className="text-xs sm:text-sm font-black text-white">Uji Mutu Laboratorium</div>
                    <div className="text-[11px] font-mono text-[#F3B23E] bg-[#0E261C] p-1.5 rounded font-bold">
                      Lab Pangan UGM & Dinkes
                    </div>
                    <div className="text-[10px] text-[#C5DFC3]">Inspeksi berkala kualitas air Puskesmas</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-2.5">
                <span>Menjamin Keamanan Pangan Bagi Pelanggan & Mitra Anda</span>
                <span className="font-black text-[#A3D99B]">100% AMAN DIKONSUMSI SETIAP HARI</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 8: CALL TO ACTION & QR ==================== */}
          {currentSlide === 8 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A3D99B]/20 border border-[#A3D99B]/50 text-[#A3D99B] text-xs sm:text-sm font-black">
                  <span>🤝 PELUANG KEMITRAAN BISNIS</span>
                  <span>LANGSUNG DARI PABRIK</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-[#F3B23E]">
                  KONSULTASI & ORDER TERBUKA
                </span>
              </div>

              <div className="grid grid-cols-12 gap-6 items-center my-auto">
                <div className="col-span-7 space-y-4">
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-display">
                    Mari Tumbuh Bersama <br/>
                    <span className="text-[#A3D99B]">Mie Reshik Cap Dokar</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#D0E2CE] leading-relaxed">
                    Terbuka kesempatan menjadi <strong>Mitra Kuliner (Warung/Resto)</strong>, <strong>Reseller Kemasan</strong>, maupun <strong>Distributor Area</strong> dengan keuntungan maksimal dan pasokan stabil tangan pertama.
                  </p>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#143727] border-2 border-[#29684C] space-y-2.5">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#A3D99B] text-[#0A1A13] flex items-center justify-center font-black shrink-0">
                        <Phone className="w-4 h-4" />
                      </span>
                      <div>
                        <div className="text-[11px] text-[#A3D99B] font-bold">WhatsApp Sales & Kemitraan:</div>
                        <div className="text-sm sm:text-lg font-black text-white">{BRAND_INFO.contacts.wa1Display} / {BRAND_INFO.contacts.wa2Display}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#A3D99B] text-[#0A1A13] flex items-center justify-center font-black shrink-0">
                        <Globe className="w-4 h-4" />
                      </span>
                      <div>
                        <div className="text-[11px] text-[#A3D99B] font-bold">Kunjungi Website Resmi:</div>
                        <div className="text-sm sm:text-lg font-black text-white">skyjadstudio.github.io/mie-dokar</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#A3D99B] text-[#0A1A13] flex items-center justify-center font-black shrink-0">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <div>
                        <div className="text-[11px] text-[#A3D99B] font-bold">Lokasi Pabrik:</div>
                        <div className="text-xs sm:text-sm font-extrabold text-white">{BRAND_INFO.location}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-5 flex justify-center">
                  <div className="p-5 sm:p-6 rounded-3xl bg-white text-[#0A1A13] text-center space-y-2.5 shadow-2xl border-4 border-[#A3D99B]">
                    <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#143727]">
                      SCAN UNTUK AKSES WEB RESMI
                    </div>
                    <img 
                      src={getAssetUrl("images/qr-code-mie-dokar.png")} 
                      alt="QR Code Mie Dokar" 
                      className="w-40 sm:w-48 h-40 sm:h-48 mx-auto object-contain p-1.5 bg-white rounded-xl border border-gray-200"
                    />
                    <div className="text-[11px] sm:text-xs font-black text-[#143727]">
                      Arahkan kamera HP ke QR Code di atas
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-2.5">
                <span>Mie Reshik Cap Dokar — Makanan Sehat untuk Harimu</span>
                <span className="font-black text-[#A3D99B]">AKTIFKAN MODE SEHATMU SEKARANG</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Thumbnail Bar */}
      <div className="w-full bg-[#0A1A13]/90 border-t border-[#1E4A35] px-3 py-2 flex items-center justify-center gap-1.5 sm:gap-2 z-30 shrink-0">
        {[
          { num: 1, title: 'Brand Hook' },
          { num: 2, title: 'Singkong vs Terigu' },
          { num: 3, title: 'Standar Higienis' },
          { num: 4, title: 'Varian Retail' },
          { num: 5, title: 'Losspack 5Kg' },
          { num: 6, title: 'Mitra Bintang' },
          { num: 7, title: 'Legalitas Halal' },
          { num: 8, title: 'Kemitraan & QR' },
        ].map((item) => (
          <button
            key={item.num}
            onClick={() => setCurrentSlide(item.num)}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              currentSlide === item.num
                ? 'bg-[#1E4A35] text-white border-2 border-[#A3D99B]'
                : 'bg-[#143526] text-white/60 border border-[#23553E] hover:text-white'
            }`}
          >
            <span>{item.num}</span>
            <span className="hidden md:inline">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
