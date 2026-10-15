import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  X, 
  Phone, 
  Globe, 
  MapPin, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { getAssetUrl, BRAND_INFO } from '../data/productKnowledgeData';

export default function VideotronPresentation({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(7000); // 7s standard for videotron
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const totalSlides = 8;

  const containerRef = useRef(null);
  const stageContainerRef = useRef(null);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const progressStartRef = useRef(Date.now());

  // Strict 1920x1080 (16:9) auto-scaling engine
  useEffect(() => {
    const updateScale = () => {
      if (!stageContainerRef.current) return;
      const padding = 20; // safe padding
      const cw = stageContainerRef.current.clientWidth - padding;
      const ch = stageContainerRef.current.clientHeight - padding;
      if (cw > 0 && ch > 0) {
        setScale(Math.min(cw / 1920, ch / 1080));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

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
      className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Top Controls Bar */}
      <header className="w-full h-12 px-5 bg-[#0A1A13] border-b border-[#1E4A35] flex items-center justify-between text-xs z-50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-black tracking-wider text-[#A3D99B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A3D99B] animate-ping" />
            <span className="uppercase tracking-widest">VIDEOTRON DECK (16:9 FULL HD)</span>
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
      </header>

      {/* Progress Bar */}
      <div className="w-full h-[3px] bg-white/10 overflow-hidden shrink-0">
        <div 
          className="h-full bg-gradient-to-r from-[#A3D99B] via-[#F3B23E] to-[#A3D99B] transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* STRICT 16:9 CONTAINER VIEWPORT */}
      <main 
        ref={stageContainerRef}
        className="flex-1 w-full relative flex items-center justify-center overflow-hidden bg-[#040A07]"
      >
        {/* Virtual 1920x1080 Canvas: Strictly locked to 16:9 Aspect Ratio */}
        <div 
          style={{
            width: '1920px',
            height: '1080px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            padding: '56px 64px',
          }}
          className="shrink-0 relative overflow-hidden bg-gradient-to-br from-[#0A2217] via-[#103022] to-[#081811] border-[3px] border-[#1E4A35] rounded-[36px] shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col justify-between select-none"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-[#A3D99B]/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] bg-[#F3B23E]/15 rounded-full blur-[80px] pointer-events-none" />

          {/* ==================== SLIDE 1: BRAND HOOK ==================== */}
          {currentSlide === 1 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              {/* Top Header */}
              <div className="flex items-center justify-between h-[50px]">
                <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#A3D99B]/15 border-[1.5px] border-[#A3D99B] text-[#A3D99B] font-black text-lg">
                  <span>🌿</span>
                  <span>PELOPOR MIE SINGKONG SEHAT SEJAK 2014</span>
                </div>
                <div className="text-lg font-black text-[#A3D99B] tracking-[2px] uppercase">
                  KARYA FX. SUBENO • BANTUL, D.I. YOGYAKARTA
                </div>
              </div>

              {/* Middle Content */}
              <div className="flex items-center justify-between h-[740px]">
                <div className="w-[1040px] flex flex-col gap-6">
                  <div className="flex items-center gap-6">
                    <img 
                      src={getAssetUrl("images/dokar_logo_official.png")} 
                      alt="Logo Cap Dokar" 
                      className="w-[110px] h-[110px] rounded-full border-[3px] border-[#A3D99B] bg-white object-cover shadow-2xl shrink-0"
                    />
                    <div>
                      <div className="text-lg font-black tracking-[3px] text-[#A3D99B] uppercase">ORIGINAL CASSAVA NOODLES</div>
                      <h1 className="text-[68px] font-black leading-none text-white uppercase font-display">
                        MIE RESHIK <span className="text-[#A3D99B] drop-shadow-[0_0_28px_rgba(163,217,155,0.5)]">CAP DOKAR</span>
                      </h1>
                    </div>
                  </div>

                  <div className="text-[32px] font-black text-[#F3B23E] drop-shadow-[0_0_28px_rgba(243,178,62,0.5)]">
                    Makanan Sehat untuk Harimu • Sensasi Kenyal Alami
                  </div>

                  <p className="text-[24px] text-[#D0E2CE] leading-relaxed max-w-[960px]">
                    Mie sehat alami berbahan <strong>singkong pilihan nusantara</strong> (bukan tepung terigu). 100% bebas gluten, rendah gula, dan diproses semi-modern tanpa pengawet & tanpa bahan kimia apapun.
                  </p>

                  <div className="flex gap-4 pt-2">
                    <div className="px-7 py-3.5 rounded-[18px] bg-[#173C2C] border-[1.5px] border-[#2B6149] text-[20px] font-black text-white flex items-center gap-2.5 shadow-lg">
                      <span className="text-[#A3D99B]">✔</span> 100% Bebas Gluten
                    </div>
                    <div className="px-7 py-3.5 rounded-[18px] bg-[#173C2C] border-[1.5px] border-[#2B6149] text-[20px] font-black text-white flex items-center gap-2.5 shadow-lg">
                      <span className="text-[#A3D99B]">✔</span> 16x Lebih Kaya Serat
                    </div>
                    <div className="px-7 py-3.5 rounded-[18px] bg-[#173C2C] border-[1.5px] border-[#2B6149] text-[20px] font-black text-white flex items-center gap-2.5 shadow-lg">
                      <span className="text-[#A3D99B]">✔</span> 0% Pewarna & Pengawet
                    </div>
                  </div>
                </div>

                <div className="w-[680px] flex justify-center items-center">
                  <div className="w-[620px] h-[680px] rounded-[36px] border-[3px] border-[#A3D99B] bg-[#0B2318] overflow-hidden relative shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between">
                    {/* Full Photo with Clean Aspect */}
                    <div className="w-full h-[560px] overflow-hidden relative">
                      <img 
                        src={getAssetUrl("images/hero_food_plate.png")} 
                        alt="Mie Reshik Cap Dokar" 
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-5 right-5 bg-[#0A1F16]/92 border-[1.5px] border-[#F3B23E] rounded-full py-2 px-5 text-base font-black text-[#F3B23E] shadow-xl">
                        ★ Menu Andalan Sehat
                      </div>
                    </div>
                    {/* Bottom Info Bar */}
                    <div className="h-[120px] bg-[#081A12] border-t-2 border-[#1E4A35] flex flex-col items-center justify-center gap-1.5 px-6">
                      <div className="text-[22px] font-black text-[#A3D99B] tracking-[0.5px]">
                        100% Singkong Pilihan • Kenyal Alami • Bukan Terigu
                      </div>
                      <div className="text-base font-bold text-[#D0E2CE]">
                        Kenyal Sempurna • Rendah Gula • Aman untuk Lambung
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between h-[50px] border-t border-white/10 text-lg text-white/60">
                <span>📍 Pabrik: Srandakan, Bantul, D.I. Yogyakarta</span>
                <span className="font-black text-[#A3D99B]">MIE RESHIK CAP DOKAR • MAKANAN SEHAT UNTUK HARIMU</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 2: MENGAPA SINGKONG? ==================== */}
          {currentSlide === 2 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between h-[50px]">
                <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#F3B23E]/15 border-[1.5px] border-[#F3B23E]/50 text-[#F3B23E] font-black text-lg">
                  <span>⚡ REVOLUSI SEHAT • SINGKONG VS TEPUNG TERIGU</span>
                </div>
                <div className="text-lg font-black text-[#A3D99B] tracking-[2px]">
                  SOLUSI DIET & GAYA HIDUP SEHAT
                </div>
              </div>

              <div className="flex items-center justify-between h-[740px]">
                <div className="w-[780px] flex flex-col gap-6">
                  <h2 className="text-[54px] font-black leading-tight text-white font-display">
                    Bukan Terigu, Tapi <span className="text-[#A3D99B]">Singkong Asli Pilihan!</span>
                  </h2>
                  <p className="text-[22px] text-[#D0E2CE] leading-relaxed">
                    Tepung terigu tinggi gluten dan indeks glikemik yang memicu risiko diabetes dan gangguan pencernaan. Mie Dokar menghadirkan <strong>karbohidrat kompleks alami</strong> yang aman dikonsumsi setiap hari.
                  </p>
                  <div className="p-7 rounded-[24px] bg-[#143526] border-2 border-[#285A43] flex items-center gap-7">
                    <div className="text-[80px] font-black text-[#F3B23E] leading-none font-display">16x</div>
                    <div className="text-[22px] font-extrabold text-white leading-snug">
                      Lebih kaya serat alami dibanding mie terigu biasa. Menjaga kenyang lebih lama tanpa bikin begah!
                    </div>
                  </div>
                </div>

                <div className="w-[950px] flex flex-col gap-5">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-5 rounded-[20px] bg-[#163B2C] border-[1.5px] border-[#2D654E] flex flex-col gap-2">
                      <div className="text-3xl">🌾</div>
                      <div className="text-xl font-black text-white">Bebas Gluten</div>
                      <div className="text-sm text-[#D0E2CE]">Aman maag, GERD, celiac & autoimun.</div>
                    </div>
                    <div className="p-5 rounded-[20px] bg-[#163B2C] border-[1.5px] border-[#2D654E] flex flex-col gap-2">
                      <div className="text-3xl">🩸</div>
                      <div className="text-xl font-black text-white">Rendah Gula</div>
                      <div className="text-sm text-[#D0E2CE]">Low GI, cegah lonjakan gula darah.</div>
                    </div>
                    <div className="p-5 rounded-[20px] bg-[#163B2C] border-[1.5px] border-[#2D654E] flex flex-col gap-2">
                      <div className="text-3xl">⚖️</div>
                      <div className="text-xl font-black text-white">Kenyang Lama</div>
                      <div className="text-sm text-[#D0E2CE]">Serat padat, energi stabil tanpa kantuk.</div>
                    </div>
                  </div>

                  <div className="rounded-[22px] overflow-hidden border-2 border-[#2D654E] bg-[#102B1F] text-lg">
                    <div className="grid grid-cols-3 p-4 font-black text-center text-[#A3D99B] bg-[#19402E]">
                      <div className="text-left">Parameter Pangan</div>
                      <div>Mie Dokar (Singkong)</div>
                      <div className="text-white/60">Mie Terigu Biasa</div>
                    </div>
                    <div className="grid grid-cols-3 p-4 border-t border-[#1C4834] text-center">
                      <span className="font-bold text-white text-left">Gluten</span>
                      <span className="text-[#A3D99B] font-black">0% (Bebas Gluten)</span>
                      <span className="text-white/60">Tinggi Gluten</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 border-t border-[#1C4834] text-center bg-white/[0.02]">
                      <span className="font-bold text-white text-left">Serat Alami</span>
                      <span className="text-[#F3B23E] font-black">16x Lebih Tinggi</span>
                      <span className="text-white/60">Rendah Serat</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 border-t border-[#1C4834] text-center">
                      <span className="font-bold text-white text-left">Indeks Glikemik</span>
                      <span className="text-[#A3D99B] font-black">Rendah (Low GI)</span>
                      <span className="text-white/60">Tinggi Glikemik</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 border-t border-[#1C4834] text-center bg-white/[0.02]">
                      <span className="font-bold text-white text-left">Bahan Kimia</span>
                      <span className="text-[#A3D99B] font-black">0% (Alami Murni)</span>
                      <span className="text-white/60">Kerap Berpengawet</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between h-[50px] border-t border-white/10 text-lg text-white/60">
                <span>Solusi Pangan Masa Depan Indonesia Bebas Diabetes</span>
                <span className="font-black text-[#F3B23E]">MIE RESHIK CAP DOKAR • PILIHAN HIDUP SEHAT</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 3: HIGIENITAS PABRIK ==================== */}
          {currentSlide === 3 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between h-[50px]">
                <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#A3D99B]/15 border-[1.5px] border-[#A3D99B] text-[#A3D99B] font-black text-lg">
                  <span>⚙️ STANDAR PABRIK SEMI-MODERN • 100% HIGIENIS</span>
                </div>
                <div className="text-lg font-black text-white/80">
                  TIDAK MENGGUNAKAN TENAGA HEWAN
                </div>
              </div>

              <div className="flex items-center justify-between h-[740px]">
                <div className="w-[840px] flex flex-col gap-6">
                  <h2 className="text-[54px] font-black leading-tight text-white font-display">
                    Mesin Stainless Steel <span className="text-[#A3D99B]">304 Food Grade</span>
                  </h2>
                  <p className="text-[22px] text-[#D0E2CE] leading-relaxed">
                    Berbeda dengan produsen tradisional lainnya, Mie Reshik Cap Dokar diproduksi semi-modern dengan mesin baja nirkarat <strong>stainless steel 304 food grade</strong> demi menjamin mutu pangan bersih tanpa kontaminasi.
                  </p>
                  <div className="flex flex-col gap-4 pt-2">
                    <div className="flex items-center gap-4 text-[22px] font-extrabold text-white">
                      <span className="w-9 h-9 rounded-full bg-[#A3D99B] text-[#0A1F16] flex items-center justify-center font-black text-lg shrink-0">✓</span>
                      <span>100% Higienis Tanpa Tenaga Hewan / Sapi</span>
                    </div>
                    <div className="flex items-center gap-4 text-[22px] font-extrabold text-white">
                      <span className="w-9 h-9 rounded-full bg-[#A3D99B] text-[#0A1F16] flex items-center justify-center font-black text-lg shrink-0">✓</span>
                      <span>Pengeringan Sinar Matahari Alami untuk Kekenyalan Asli</span>
                    </div>
                    <div className="flex items-center gap-4 text-[22px] font-extrabold text-white">
                      <span className="w-9 h-9 rounded-full bg-[#A3D99B] text-[#0A1F16] flex items-center justify-center font-black text-lg shrink-0">✓</span>
                      <span>Teruji Laboratorium Pangan UGM & Kualitas Air Cek Puskesmas</span>
                    </div>
                  </div>
                </div>

                <div className="w-[900px] grid grid-cols-2 gap-6">
                  <div className="p-9 rounded-[28px] bg-[#143526] border-2 border-[#285A43] text-center flex flex-col gap-2.5">
                    <div className="text-[60px] font-black text-[#A3D99B] leading-none">0%</div>
                    <div className="text-[24px] font-black text-white">Pengawet Kimia</div>
                    <div className="text-[17px] text-[#A3D99B]">Tahan 12 bulan alami berkat kadar air rendah</div>
                  </div>
                  <div className="p-9 rounded-[28px] bg-[#143526] border-2 border-[#285A43] text-center flex flex-col gap-2.5">
                    <div className="text-[60px] font-black text-[#A3D99B] leading-none">0%</div>
                    <div className="text-[24px] font-black text-white">Pewarna Sintetik</div>
                    <div className="text-[17px] text-[#A3D99B]">Warna coklat bening asli pati singkong</div>
                  </div>
                  <div className="p-9 rounded-[28px] bg-[#143526] border-2 border-[#285A43] text-center flex flex-col gap-2.5">
                    <div className="text-[60px] font-black text-[#A3D99B] leading-none">0%</div>
                    <div className="text-[24px] font-black text-white">Pengenyal Buatan</div>
                    <div className="text-[17px] text-[#A3D99B]">Kenyal alami gelatinisasi tapioka murni</div>
                  </div>
                  <div className="p-9 rounded-[28px] bg-[#143526] border-2 border-[#285A43] text-center flex flex-col gap-2.5">
                    <div className="text-[60px] font-black text-[#F3B23E] leading-none">2.5 Ton</div>
                    <div className="text-[24px] font-black text-white">Kapasitas Suplai</div>
                    <div className="text-[17px] text-[#F3B23E]">Per siklus produksi siap kirim stabil</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between h-[50px] border-t border-white/10 text-lg text-white/60">
                <span>Keamanan Pangan Terjamin untuk Konsumen Rumah Tangga & Bisnis Kuliner</span>
                <span className="font-black text-[#A3D99B]">MIE RESHIK = MIE BERSIH & BERMUTU</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 4: VARIAN RETAIL ==================== */}
          {currentSlide === 4 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between h-[50px]">
                <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#A3D99B]/15 border-[1.5px] border-[#A3D99B] text-[#A3D99B] font-black text-lg">
                  <span>🍜 KEMASAN KELUARGA • DISERTAI BUMBU ALAMI</span>
                </div>
                <div className="text-lg font-black text-[#F3B23E]">
                  SANTAPAN SEHAT PRAKTIS DI RUMAH
                </div>
              </div>

              <div className="flex items-center justify-between h-[740px]">
                <div className="w-[1000px] flex flex-col gap-6">
                  <div className="inline-block px-5 py-2 rounded-full bg-[#F3B23E] text-[#0A1F16] text-lg font-black w-fit">
                    KEMASAN 250 GRAM • 3-4 PORSI KENYANG
                  </div>
                  <h2 className="text-[56px] font-black leading-tight text-white font-display">
                    Mie Singkong Retail <br/>
                    <span className="text-[#A3D99B]">(Disertai Bumbu)</span>
                  </h2>
                  <p className="text-[22px] text-[#D0E2CE] leading-relaxed">
                    Kini memasak mie singkong sehat di rumah semudah mie instan! Dilengkapi bumbu rempah alami gurih nikmat tanpa perlu repot meracik sendiri.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-[18px] bg-[#143526] border-[1.5px] border-[#285A43]">
                      <div className="text-xl font-black text-white">Disertai Bumbu Alami</div>
                      <div className="text-base text-[#A3D99B] mt-1">Gurih pas & aman tanpa MSG berlebih</div>
                    </div>
                    <div className="p-5 rounded-[18px] bg-[#143526] border-[1.5px] border-[#285A43]">
                      <div className="text-xl font-black text-white">Kemasan Rapi & Higienis</div>
                      <div className="text-base text-[#A3D99B] mt-1">Sablon eksklusif, tersegel rapat & awet</div>
                    </div>
                    <div className="p-5 rounded-[18px] bg-[#143526] border-[1.5px] border-[#285A43]">
                      <div className="text-xl font-black text-white">Disukai Anak-Anak</div>
                      <div className="text-base text-[#A3D99B] mt-1">Kenyal lembut & sangat ramah lambung</div>
                    </div>
                    <div className="p-5 rounded-[18px] bg-[#143526] border-[1.5px] border-[#285A43]">
                      <div className="text-xl font-black text-white">Aneka Menu Lezat</div>
                      <div className="text-base text-[#A3D99B] mt-1">Sempurna untuk Mie Goreng & Kuah Segar</div>
                    </div>
                  </div>
                </div>

                <div className="w-[720px] flex justify-center">
                  <div className="w-[620px] p-8 rounded-[36px] border-2 border-[#A3D99B] bg-gradient-to-b from-[#173F2D] to-[#0E271C] text-center flex flex-col gap-5 shadow-2xl">
                    <img 
                      src={getAssetUrl("images/mie_singkong_hero_dish.jpg")} 
                      alt="Hidangan Mie Singkong" 
                      className="w-full h-[380px] object-cover rounded-[24px] border-2 border-[#A3D99B]/40 shadow-md"
                    />
                    <div className="text-2xl font-black text-white">Kemasan Retail 250gr</div>
                    <div className="text-lg text-[#A3D99B] font-bold">Cocok untuk Toko Oleh-Oleh, Sayur & Reseller Online</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between h-[50px] border-t border-white/10 text-lg text-white/60">
                <span>Praktis, Nikmat, & Penuh Manfaat Nutrisi Alami</span>
                <span className="font-black text-[#A3D99B]">TERSEDIA HARGA KHUSUS DISPLAY TOKO & RESELLER</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 5: VARIAN LOSSPACK 5KG ==================== */}
          {currentSlide === 5 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between h-[50px]">
                <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#F3B23E]/15 border-[1.5px] border-[#F3B23E]/50 text-[#F3B23E] font-black text-lg">
                  <span>🥘 VARIAN HOREKA & WARUNG BAKMI • KEMASAN BAL 5 KG</span>
                </div>
                <div className="text-lg font-black text-[#A3D99B]">
                  SOLUSI CUAN USAHA KULINER
                </div>
              </div>

              <div className="flex items-center justify-between h-[740px]">
                <div className="w-[1000px] flex flex-col gap-6">
                  <h2 className="text-[56px] font-black leading-tight text-white font-display">
                    Losspack 5 Kg: Rahasia Dapur <span className="text-[#A3D99B]">Kenyal & Laba Tebal</span>
                  </h2>
                  <p className="text-[22px] text-[#D0E2CE] leading-relaxed">
                    Dikhususkan untuk pengusaha warung bakmi Jawa, resto, kedai mie modern, katering, hingga hotel. <strong>Kenyal alami, tahan banting, dan tidak mudah lodoh</strong> saat dimasak di wajan panas.
                  </p>
                  <div className="grid grid-cols-3 gap-5">
                    <div className="p-7 rounded-[24px] border-2 border-[#2E684E] bg-[#173E2E] text-center flex flex-col gap-2">
                      <div className="text-[48px] font-black text-[#A3D99B] leading-none">± 100</div>
                      <div className="text-xl font-black text-white">Porsi per Bal</div>
                      <div className="text-sm text-[#A3D99B]">Sangat hemat modal porsi</div>
                    </div>
                    <div className="p-7 rounded-[24px] border-2 border-[#2E684E] bg-[#173E2E] text-center flex flex-col gap-2">
                      <div className="text-[48px] font-black text-[#F3B23E] leading-none">60%+</div>
                      <div className="text-xl font-black text-white">Potensi Margin</div>
                      <div className="text-sm text-[#F3B23E]">Laba kuliner tinggi</div>
                    </div>
                    <div className="p-7 rounded-[24px] border-2 border-[#2E684E] bg-[#173E2E] text-center flex flex-col gap-2">
                      <div className="text-[48px] font-black text-white leading-none">0%</div>
                      <div className="text-xl font-black text-white">Risiko Lodoh</div>
                      <div className="text-sm text-white/70">Kuat saat digoreng</div>
                    </div>
                  </div>
                </div>

                <div className="w-[720px] flex justify-center">
                  <div className="w-[620px] p-8 rounded-[36px] border-2 border-[#A3D99B] bg-[#133325] flex flex-col gap-4 shadow-2xl">
                    <img 
                      src={getAssetUrl("images/mie_losspack_hero_dish.jpg")} 
                      alt="Losspack Cooked Dish" 
                      className="w-full h-[320px] object-cover rounded-[22px] border-2 border-[#A3D99B]/50 shadow-md"
                    />
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xl font-black text-[#A3D99B]">Spesifikasi Bal 5 Kg</span>
                      <span className="text-base font-black text-[#F3B23E] bg-[#F3B23E]/20 px-3 py-1 rounded-lg">±100 Porsi</span>
                    </div>
                    <ul className="text-[17px] text-[#D0E2CE] space-y-1.5 leading-relaxed">
                      <li>✔ <strong>Bentuk:</strong> Untaian mie padat kering 5 Kg</li>
                      <li>✔ <strong>Masa Simpan:</strong> 12 Bulan suhu ruang kering</li>
                      <li>✔ <strong>Suplai:</strong> Langsung pabrik tangan pertama</li>
                      <li>✔ <strong>Edukasi:</strong> Bimbingan resep & teknik masak gratis</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between h-[50px] border-t border-white/10 text-lg text-white/60">
                <span>Pilihan Terbaik untuk Bakmi Goreng, Bakmi Kuah, Bakso & Ramen Sehat</span>
                <span className="font-black text-[#A3D99B]">KAPASITAS SUPLAI 1.5 - 2.5 TON PER SIKLUS</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 6: MITRA BINTANG ==================== */}
          {currentSlide === 6 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between h-[50px]">
                <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#A3D99B]/15 border-[1.5px] border-[#A3D99B] text-[#A3D99B] font-black text-lg">
                  <span>🤝 PORTOFOLIO & REPUTASI • DIPERCAYA INDUSTRI BINTANG</span>
                </div>
                <div className="text-lg font-black text-white/80">
                  KUALITAS STANDAR NASIONAL
                </div>
              </div>

              <div className="flex flex-col justify-center gap-9 h-[740px]">
                <div className="text-center flex flex-col gap-3">
                  <h2 className="text-[52px] font-black text-white font-display">
                    Dipercaya Oleh <span className="text-[#A3D99B]">Mitra Bergengsi Nasional</span>
                  </h2>
                  <p className="text-[22px] text-[#D0E2CE] max-w-[1100px] mx-auto">
                    Kualitas higienis dan cita rasa istimewa Mie Dokar telah lolos kurasi ketat industri perhotelan bintang dan penyedia pangan organik nasional.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  {/* Novotel */}
                  <div className="p-9 rounded-[32px] border-[2.5px] border-[#296549] bg-[#143727] text-center flex flex-col justify-between gap-5 shadow-2xl">
                    <div className="flex items-center justify-center h-[100px] bg-white rounded-[20px] p-4">
                      <img src={getAssetUrl("images/novotel_logo.png")} alt="Novotel Hotels" className="max-h-[70px] object-contain" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-[24px] font-black text-white">Novotel Hotels & Resorts</div>
                      <div className="text-[17px] text-[#D0E2CE] leading-relaxed">
                        Supplier tetap sejak <strong>2021</strong> untuk standar kuliner hotel berbintang internasional.
                      </div>
                    </div>
                    <div className="text-sm font-black text-[#A3D99B] bg-[#0E261C] px-4 py-2 rounded-full w-fit mx-auto">
                      Hospitality Grade
                    </div>
                  </div>

                  {/* Lingkar Organik */}
                  <div className="p-9 rounded-[32px] border-[2.5px] border-[#296549] bg-[#143727] text-center flex flex-col justify-between gap-5 shadow-2xl">
                    <div className="flex items-center justify-center h-[100px] bg-white rounded-[20px] p-4">
                      <img src={getAssetUrl("images/lingkar_organik_logo.png")} alt="Lingkar Organik" className="max-h-[70px] object-contain" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-[24px] font-black text-white">Lingkar Organik</div>
                      <div className="text-[17px] text-[#D0E2CE] leading-relaxed">
                        Supplier terpercaya sejak <strong>2020</strong> untuk jaringan pangan sehat organik se-Indonesia.
                      </div>
                    </div>
                    <div className="text-sm font-black text-[#A3D99B] bg-[#0E261C] px-4 py-2 rounded-full w-fit mx-auto">
                      Certified Organic Supply
                    </div>
                  </div>

                  {/* Shopee */}
                  <div className="p-9 rounded-[32px] border-[2.5px] border-[#296549] bg-[#143727] text-center flex flex-col justify-between gap-5 shadow-2xl">
                    <div className="flex items-center justify-center h-[100px] bg-white rounded-[20px] p-4">
                      <img src={getAssetUrl("images/shopee_logo.png")} alt="Shopee Hub" className="max-h-[70px] object-contain" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-[24px] font-black text-white">Shopee & E-Commerce</div>
                      <div className="text-[17px] text-[#D0E2CE] leading-relaxed">
                        Suplier bagi ribuan reseller & toko online dengan rating kepuasan 4.9+ di marketplace nasional.
                      </div>
                    </div>
                    <div className="text-sm font-black text-[#A3D99B] bg-[#0E261C] px-4 py-2 rounded-full w-fit mx-auto">
                      Rating 4.9+ Terverifikasi
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between h-[50px] border-t border-white/10 text-lg text-white/60">
                <span>Pengiriman Menjangkau Berbagai Kota di Seluruh Indonesia</span>
                <span className="font-black text-[#A3D99B]">TERBUKA JALUR DISTRIBUTOR DAERAH</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 7: LEGALITAS RESMI ==================== */}
          {currentSlide === 7 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between h-[50px]">
                <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#A3D99B]/15 border-[1.5px] border-[#A3D99B] text-[#A3D99B] font-black text-lg">
                  <span>📜 DOKUMEN LEGALITAS & SERTIFIKASI RESMI</span>
                </div>
                <div className="text-lg font-black text-white/85">
                  100% AMAN, HIGIENIS & TERVERIFIKASI NEGARA
                </div>
              </div>

              <div className="flex flex-col justify-between h-[740px]">
                {/* Header Title */}
                <div className="flex items-end justify-between border-b border-white/10 pb-3">
                  <div>
                    <h2 className="text-[42px] font-black text-white leading-tight font-display">
                      Bukti Fisik Sertifikasi <span className="text-[#A3D99B]">Halal, NIB & HAKI Merek</span>
                    </h2>
                    <p className="text-[19px] text-[#D0E2CE] mt-1">
                      Dokumen legal resmi dari Kementerian Agama RI (BPJPH), BKPM RI (NIB), dan Kemenkumham RI (HAKI).
                    </p>
                  </div>
                  <div>
                    <span className="text-[15px] font-extrabold text-[#F3B23E] bg-[#F3B23E]/15 border border-[#F3B23E]/40 py-1.5 px-4 rounded-full">
                      ✔ Dokumen Sah & Terverifikasi
                    </span>
                  </div>
                </div>

                {/* 3 Certificate Columns Grid */}
                <div className="grid grid-cols-3 gap-7 h-[620px]">
                  {/* 1. Halal Certificate */}
                  <div className="bg-[#133324] border-[2.5px] border-[#2B684C] rounded-[26px] p-4.5 flex flex-col justify-between shadow-2xl">
                    <div className="h-[430px] bg-white rounded-[18px] overflow-hidden relative flex items-center justify-center shadow-md border-2 border-[#D5E5D1]">
                      <img 
                        src={getAssetUrl("images/cert_halal.png")} 
                        alt="Sertifikat Halal Resmi" 
                        className="w-full h-full object-contain object-top p-1"
                      />
                      <div className="absolute left-[6.5%] right-[6.5%] top-[56.6%] h-[4.6%] backdrop-blur-md bg-white/70 pointer-events-none" />
                    </div>
                    <div className="flex flex-col gap-1.5 pt-3">
                      <div className="text-xl font-black text-white flex items-center justify-between">
                        <span>Sertifikat Halal Resmi</span>
                        <span className="text-xs font-black text-[#A3D99B] bg-[#0A1F16] px-2.5 py-0.5 rounded">BPJPH</span>
                      </div>
                      <div className="text-base font-mono font-black text-[#A3D99B] bg-[#091F15] border border-[#1E4A35] py-1.5 px-3 rounded-lg text-center">
                        ID34110000559820922
                      </div>
                      <div className="text-sm font-bold text-[#D0E2CE] text-center">
                        Kemenag RI • Berlaku s.d. 10 Nov 2026
                      </div>
                    </div>
                  </div>

                  {/* 2. NIB Certificate */}
                  <div className="bg-[#133324] border-[2.5px] border-[#2B684C] rounded-[26px] p-4.5 flex flex-col justify-between shadow-2xl">
                    <div className="h-[430px] bg-white rounded-[18px] overflow-hidden relative flex items-center justify-center shadow-md border-2 border-[#D5E5D1]">
                      <img 
                        src={getAssetUrl("images/cert_nib.png")} 
                        alt="Nomor Induk Berusaha" 
                        className="w-full h-full object-contain object-top p-1"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 pt-3">
                      <div className="text-xl font-black text-white flex items-center justify-between">
                        <span>Nomor Induk Berusaha (NIB)</span>
                        <span className="text-xs font-black text-[#A3D99B] bg-[#0A1F16] px-2.5 py-0.5 rounded">BKPM RI</span>
                      </div>
                      <div className="text-base font-mono font-black text-[#A3D99B] bg-[#091F15] border border-[#1E4A35] py-1.5 px-3 rounded-lg text-center">
                        1205000111318
                      </div>
                      <div className="text-sm font-bold text-[#D0E2CE] text-center">
                        Kementerian Investasi • Berlaku Seumur Hidup
                      </div>
                    </div>
                  </div>

                  {/* 3. HAKI Certificate */}
                  <div className="bg-[#133324] border-[2.5px] border-[#2B684C] rounded-[26px] p-4.5 flex flex-col justify-between shadow-2xl">
                    <div className="h-[430px] bg-white rounded-[18px] overflow-hidden relative flex items-center justify-center shadow-md border-2 border-[#D5E5D1]">
                      <img 
                        src={getAssetUrl("images/cert_haki.png")} 
                        alt="Sertifikat Merek HAKI" 
                        className="w-full h-full object-contain object-top p-1"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 pt-3">
                      <div className="text-xl font-black text-white flex items-center justify-between">
                        <span>Sertifikat Merek (HAKI)</span>
                        <span className="text-xs font-black text-[#A3D99B] bg-[#0A1F16] px-2.5 py-0.5 rounded">Kemenkumham</span>
                      </div>
                      <div className="text-base font-mono font-black text-[#A3D99B] bg-[#091F15] border border-[#1E4A35] py-1.5 px-3 rounded-lg text-center">
                        IDM000835742
                      </div>
                      <div className="text-sm font-bold text-[#D0E2CE] text-center">
                        DJKI Kemenkumham RI • Hak Eksklusif Merek Dokar
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between h-[50px] border-t border-white/10 text-lg text-white/60">
                <span>🔬 Teruji Laboratorium Pangan UGM & Kualitas Air Teruji Puskesmas Berkala</span>
                <span className="font-black text-[#A3D99B]">100% AMAN, HIGIENIS & RESMI TERDAFTAR</span>
              </div>
            </div>
          )}

          {/* ==================== SLIDE 8: CALL TO ACTION & QR ==================== */}
          {currentSlide === 8 && (
            <div className="w-full h-full flex flex-col justify-between relative z-10 animate-fadeIn">
              <div className="flex items-center justify-between h-[50px]">
                <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#A3D99B]/15 border-[1.5px] border-[#A3D99B] text-[#A3D99B] font-black text-lg">
                  <span>🤝 PELUANG KEMITRAAN BISNIS • LANGSUNG DARI PABRIK</span>
                </div>
                <div className="text-lg font-black text-[#F3B23E]">
                  KONSULTASI & ORDER TERBUKA
                </div>
              </div>

              <div className="flex items-center justify-between h-[740px]">
                <div className="w-[1040px] flex flex-col gap-6">
                  <h2 className="text-[56px] font-black leading-tight text-white font-display">
                    Mari Tumbuh Bersama <br/>
                    <span className="text-[#A3D99B] drop-shadow-[0_0_28px_rgba(163,217,155,0.5)]">Mie Reshik Cap Dokar</span>
                  </h2>
                  <p className="text-[22px] text-[#D0E2CE] leading-relaxed">
                    Terbuka kesempatan menjadi <strong>Mitra Kuliner (Warung/Resto)</strong>, <strong>Reseller Kemasan</strong>, maupun <strong>Distributor Area</strong> dengan keuntungan maksimal dan pasokan stabil langsung tangan pertama dari pabrik.
                  </p>

                  <div className="p-8 rounded-[28px] bg-[#143727] border-2 border-[#29684C] flex flex-col gap-4">
                    <div className="flex items-center gap-5">
                      <span className="w-13 h-13 rounded-full bg-[#A3D99B] text-[#0A1F16] flex items-center justify-center font-black shrink-0 p-3">
                        <Phone className="w-7 h-7" />
                      </span>
                      <div>
                        <div className="text-sm font-bold text-[#A3D99B]">WhatsApp Sales & Kemitraan:</div>
                        <div className="text-[26px] font-black text-white">{BRAND_INFO.contacts.wa1Display} / {BRAND_INFO.contacts.wa2Display}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="w-13 h-13 rounded-full bg-[#A3D99B] text-[#0A1F16] flex items-center justify-center font-black shrink-0 p-3">
                        <Sparkles className="w-7 h-7" />
                      </span>
                      <div>
                        <div className="text-sm font-bold text-[#A3D99B]">Layanan & Bimbingan Usaha:</div>
                        <div className="text-[22px] font-black text-white">Konsultasi Usaha Kuliner & Resep Gratis</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="w-13 h-13 rounded-full bg-[#A3D99B] text-[#0A1F16] flex items-center justify-center font-black shrink-0 p-3">
                        <MapPin className="w-7 h-7" />
                      </span>
                      <div>
                        <div className="text-sm font-bold text-[#A3D99B]">Lokasi Pabrik:</div>
                        <div className="text-[20px] font-bold text-white">{BRAND_INFO.location}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[680px] flex justify-center">
                  <div className="w-[580px] p-9 rounded-[36px] border-4 border-[#A3D99B] bg-white text-[#0A1F16] text-center flex flex-col items-center gap-4 shadow-[0_15px_50px_rgba(163,217,155,0.4)]">
                    <div className="text-xl font-black uppercase tracking-wider text-[#143727]">
                      SCAN UNTUK INFO LENGKAP & KATALOG
                    </div>
                    <img 
                      src={getAssetUrl("images/qr-code-mie-dokar.png")} 
                      alt="QR Code Mie Dokar" 
                      className="w-[360px] h-[360px] object-contain border-2 border-gray-200 rounded-[24px] p-3"
                    />
                    <div className="text-lg font-black text-[#143727]">
                      Arahkan kamera HP ke QR Code di atas
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between h-[50px] border-t border-white/10 text-lg text-white/60">
                <span>Mie Reshik Cap Dokar — Makanan Sehat untuk Harimu</span>
                <span className="font-black text-[#A3D99B]">AKTIFKAN MODE SEHATMU SEKARANG</span>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Bottom Thumbnail Bar */}
      <footer className="w-full h-14 bg-[#0A1A13] border-t border-[#1E4A35] px-4 flex items-center justify-center gap-2 z-50 shrink-0">
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
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              currentSlide === item.num
                ? 'bg-[#1E4A35] text-white border-2 border-[#A3D99B]'
                : 'bg-[#143526] text-white/70 border border-[#23553E] hover:text-white'
            }`}
          >
            <span>{item.num}</span>
            <span className="hidden md:inline">{item.title}</span>
          </button>
        ))}
      </footer>
    </div>
  );
}
