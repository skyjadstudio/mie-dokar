import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  Medal
} from 'lucide-react';
import { SALES_QUIZ } from '../data/productKnowledgeData';

export default function SalesQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = SALES_QUIZ[currentQuestionIndex];
  const totalQuestions = SALES_QUIZ.length;

  const handleSelectOption = (index) => {
    if (showExplanation || quizFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: index
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
  };

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIdx, ansIdx]) => SALES_QUIZ[Number(qIdx)].correctIndex === ansIdx
  ).length;

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  const getScoreBadge = () => {
    if (scorePercentage === 100) return { title: "🌟 Master Product Specialist Mie Dokar", color: "text-[#D97706] bg-[#FEF6E4] border-[#F5E2B8]" };
    if (scorePercentage >= 80) return { title: "🥇 Ahli Kuliner & Produk Dokar", color: "text-[#385E45] bg-[#EBF2EC] border-[#CFE0D3]" };
    if (scorePercentage >= 60) return { title: "🥈 Mitra Terlatih Dokar", color: "text-[#D3684B] bg-[#FEF1EC] border-[#FCD8CD]" };
    return { title: "🥉 Pelajari Kembali Product Knowledge", color: "text-[#7D7061] bg-[#F4EFE6] border-[#E6DCD1]" };
  };

  return (
    <section id="quiz" className="py-12 bg-gradient-to-b from-transparent via-[#F7F2E9]/60 to-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="badge-pill bg-[#FEF6E4] text-[#A06D12] border border-[#F5E2B8] mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Kuis Interaktif & Training Mitra</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2A26] tracking-tight mb-2">
            Uji Pemahaman Produk Mie Dokar
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6354]">
            Cocok untuk evaluasi tim sales, staf dapur warung makan, maupun reseller agar semakin menguasai keunggulan Mie Dokar.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="card-soft p-6 sm:p-10 bg-white border border-[#E8DFC8] shadow-lg">
          
          {!quizFinished ? (
            <div>
              
              {/* Progress & Step Indicator */}
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#EFE8DC]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#7D7061]">Pertanyaan</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2EB] text-[#E07A5F] text-xs font-extrabold">
                    {currentQuestionIndex + 1} / {totalQuestions}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-32 sm:w-48 h-2 bg-[#EFE8DC] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#E07A5F] transition-all duration-300 rounded-full"
                    style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold text-[#2D2A26] mb-6 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                  const isCorrect = currentQ.correctIndex === optIdx;
                  
                  let optionClass = "bg-[#FAF7F2] border-[#EADBCC] text-[#4A4036] hover:bg-[#F4EFE6]";
                  
                  if (showExplanation) {
                    if (isCorrect) {
                      optionClass = "bg-[#EBF2EC] border-[#7B9E87] text-[#2A4734] font-bold";
                    } else if (isSelected && !isCorrect) {
                      optionClass = "bg-[#FDF0EE] border-[#E07A5F] text-[#C45A3D] font-bold";
                    } else {
                      optionClass = "bg-[#FAF7F2] border-[#EADBCC] opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={showExplanation}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optionClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/80 border border-current flex items-center justify-center font-bold text-xs shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      
                      {showExplanation && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-[#7B9E87] shrink-0" />
                      )}
                      {showExplanation && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-[#E07A5F] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {showExplanation && (
                <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#F9E5C3] text-xs text-[#8C5D14] mb-6 animate-fadeIn">
                  <div className="font-bold flex items-center gap-1.5 mb-1 text-[#A06D12]">
                    <Sparkles className="w-4 h-4" />
                    <span>Penjelasan Detail:</span>
                  </div>
                  <p className="leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {showExplanation && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="btn-curved btn-soft-primary px-6 py-2.5 text-xs font-bold shadow-md"
                  >
                    <span>{currentQuestionIndex < totalQuestions - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Skor Akhir'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FEF6E4] to-[#FCEECB] border border-[#F5E2B8] flex items-center justify-center text-4xl mx-auto shadow-sm">
                🏆
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#2D2A26] mb-1">
                  Kuis Selesai!
                </h3>
                <p className="text-xs text-[#7A7063]">
                  Berikut ringkasan hasil uji pemahaman produk Mie Dokar Anda:
                </p>
              </div>

              {/* Score Display */}
              <div className="max-w-xs mx-auto p-5 rounded-3xl bg-[#FAF7F2] border border-[#EADBCC]">
                <div className="text-4xl font-black text-[#E07A5F] font-display mb-1">
                  {scorePercentage}%
                </div>
                <div className="text-xs font-bold text-[#4A4036] mb-2">
                  Menjawab Benar {correctCount} dari {totalQuestions} Soal
                </div>
                <div className={`badge-pill border text-xs font-bold ${getScoreBadge().color}`}>
                  {getScoreBadge().title}
                </div>
              </div>

              {/* Action */}
              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={handleReset}
                  className="btn-curved btn-soft-secondary px-5 py-2.5 text-xs font-bold"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Kuis</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
