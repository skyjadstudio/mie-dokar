import React, { useState, useEffect, useRef } from 'react';
import { 
  ChefHat, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb,
  Droplets
} from 'lucide-react';
import { COOKING_GUIDE } from '../data/productKnowledgeData';

export default function CookingLab() {
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const currentRecipe = COOKING_GUIDE[selectedRecipeIndex];

  // Timer States
  const [timeLeft, setTimeLeft] = useState(currentRecipe.recommendedBoilTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);

  // Update timer when recipe changes
  useEffect(() => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(currentRecipe.recommendedBoilTime);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [selectedRecipeIndex]);

  // Timer Tick
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setIsFinished(true);
            playBeepSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  // Pleasant Web Audio API Chime
  const playBeepSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const playTone = (freq, start, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Play nice 3-note melody
      playTone(523.25, 0, 0.3); // C5
      playTone(659.25, 0.2, 0.3); // E5
      playTone(783.99, 0.4, 0.5); // G5
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  const toggleTimer = () => {
    if (isFinished) {
      setTimeLeft(currentRecipe.recommendedBoilTime);
      setIsFinished(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(currentRecipe.recommendedBoilTime);
  };

  const formatMinutesSeconds = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTime = currentRecipe.recommendedBoilTime;
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <section id="cooking" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="badge-pill bg-[#EBF2EC] text-[#385E45] border border-[#CFE0D3] mb-3">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Panduan Memasak & Dapur Kuliner</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2D2A26] tracking-tight mb-3">
            Panduan Mengolah Mie Dokar Sempurna
          </h2>
          <p className="text-sm sm:text-base text-[#6E6354]">
            Kunci kelezatan mie singkong ada pada ketepatan waktu rebus dan perlakuan setelah penirisan. Gunakan panduan & timer interaktif di bawah ini!
          </p>
        </div>

        {/* Recipe Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {COOKING_GUIDE.map((recipe, index) => {
            const isSelected = selectedRecipeIndex === index;
            return (
              <button
                key={recipe.id}
                onClick={() => setSelectedRecipeIndex(index)}
                className={`btn-curved px-4 py-2.5 text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#E07A5F] text-white shadow-md'
                    : 'bg-[#F4EFE6] text-[#635749] hover:bg-[#EAE1D5] hover:text-[#2D2A26]'
                }`}
              >
                <span>{recipe.title}</span>
              </button>
            );
          })}
        </div>

        {/* Recipe & Timer Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Step by step Cooking instructions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="card-soft p-6 sm:p-8 bg-white border border-[#E8DFC8]">
              
              <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-[#EFE8DC]">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2D2A26]">
                    {currentRecipe.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7D7061] mt-0.5">
                    {currentRecipe.subtitle}
                  </p>
                </div>
                <span className="badge-pill bg-[#FEF6E4] text-[#A06D12] border border-[#F5E2B8] shrink-0">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{currentRecipe.timerLabel}</span>
                </span>
              </div>

              {/* Step By Step List */}
              <div className="space-y-4 mb-6">
                {currentRecipe.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-[#FAF2EB] text-[#E07A5F] border border-[#F5D7C9] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm text-[#4A4036] leading-relaxed pt-0.5">
                      {step.includes('💡') ? (
                        <div className="p-3 rounded-2xl bg-[#FFF8EE] border border-[#F9E5C3] text-[#8C5D14] font-medium my-1">
                          {step}
                        </div>
                      ) : (
                        step
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Secret Tip Card */}
              <div className="p-4 rounded-2xl bg-[#EBF2EC] border border-[#CFE0D3] flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#385E45] shrink-0 mt-0.5" />
                <div className="text-xs text-[#2A4734] leading-relaxed">
                  <span className="font-bold">Tips Rahasia Dapur:</span> {currentRecipe.tips}
                </div>
              </div>

            </div>
          </div>

          {/* Right: Digital Interactive Cooking Timer (5 cols) */}
          <div className="lg:col-span-5">
            <div className="card-soft p-6 sm:p-8 bg-gradient-to-br from-[#2D2A26] to-[#1F1C1A] text-white border border-[#443E38] shadow-2xl relative overflow-hidden">
              
              {/* Soft Ambient Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#E07A5F]/20 blur-2xl pointer-events-none" />

              <div className="text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold mb-6 border border-white/10">
                  <Flame className="w-3.5 h-3.5 text-[#E8A850]" />
                  <span>Digital Rebus Timer</span>
                </div>

                {/* Circular Timer Visual */}
                <div className="relative w-52 h-52 mx-auto mb-6 flex items-center justify-center">
                  
                  {/* Background Track */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="text-white/10 stroke-current"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="text-[#E07A5F] stroke-current transition-all duration-500 ease-linear"
                      strokeWidth="6"
                      strokeDasharray={264}
                      strokeDashoffset={264 - (264 * progressPercent) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>

                  {/* Inner Timer Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight font-display text-white">
                      {formatMinutesSeconds(timeLeft)}
                    </span>
                    <span className="text-[11px] font-semibold text-white/60 mt-1 uppercase tracking-wider">
                      {isFinished ? 'Selesai! Tiriskan Mie' : isRunning ? 'Sedang Merebus...' : 'Siap Mulai'}
                    </span>
                  </div>

                </div>

                {/* Alarm Finished Notification Banner */}
                {isFinished && (
                  <div className="p-3 rounded-2xl bg-[#E07A5F] text-white text-xs font-bold mb-5 animate-bounce flex items-center justify-center gap-2 shadow-lg">
                    <Volume2 className="w-4 h-4" />
                    <span>Waktu Habis! Segera Angkat & Tiriskan</span>
                  </div>
                )}

                {/* Timer Controls */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <button
                    onClick={toggleTimer}
                    className={`btn-curved px-6 py-3 text-xs sm:text-sm font-bold shadow-lg transition-all ${
                      isRunning 
                        ? 'bg-[#E8A850] text-[#2D2A26] hover:bg-[#D49840]' 
                        : 'bg-[#E07A5F] text-white hover:bg-[#D3684B]'
                    }`}
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Jeda Timer</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>{isFinished ? 'Ulangi Timer' : 'Mulai Rebus'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetTimer}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 border border-white/15 transition-all"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick 3-Rules Checklist */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs text-white/80">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#E8A850]">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>3 Kaidah Emas Rebusan Mie Dokar:</span>
                  </div>
                  <div className="text-[11px] text-white/70">1. Masukkan mie hanya saat air sudah <strong>mendidih bergolak</strong>.</div>
                  <div className="text-[11px] text-white/70">2. Jangan diaduk terlalu keras pada 60 detik pertama.</div>
                  <div className="text-[11px] text-white/70">3. Olesi sedikit minyak setelah ditiriskan agar untaian tetap terurai.</div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
