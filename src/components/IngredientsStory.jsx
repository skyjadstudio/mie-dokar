import React from 'react';
import { 
  Wheat, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  X, 
  AlertTriangle,
  Award,
  HeartHandshake
} from 'lucide-react';
import { INGREDIENT_STORY, COMPARISON_TABLE } from '../data/productKnowledgeData';

export default function IngredientsStory() {
  return (
    <section id="ingredients" className="py-12 bg-gradient-to-b from-transparent via-[#F5EFE6]/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill bg-[#FEF1EC] text-[#D3684B] border border-[#FCD8CD] mb-3">
            <Wheat className="w-3.5 h-3.5" />
            <span>Kualitas Bahan & Nilai Alami</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2D2A26] tracking-tight mb-3">
            {INGREDIENT_STORY.title}
          </h2>
          <p className="text-sm sm:text-base text-[#6E6354]">
            {INGREDIENT_STORY.subtitle}
          </p>
        </div>

        {/* 4 Core Ingredients Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {INGREDIENT_STORY.ingredients.map((item, idx) => (
            <div 
              key={idx}
              className="card-soft p-6 bg-white border border-[#E8DFC8] flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FAF5ED] border border-[#ECE2D2] flex items-center justify-center text-2xl mb-4 shadow-2xs">
                  {item.icon}
                </div>
                <h3 className="font-bold text-base text-[#2D2A26] mb-1">
                  {item.title}
                </h3>
                <div className="text-[11px] font-semibold text-[#E07A5F] mb-3">
                  📍 {item.origin}
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#ECE2D2] text-xs font-semibold text-[#4A4036] mb-3">
                  🎯 {item.role}
                </div>
                <p className="text-xs text-[#6E6354] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Matrix Table Card */}
        <div className="card-soft p-6 sm:p-10 bg-white border border-[#E8DFC8] shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#EFE8DC]">
            <div>
              <div className="badge-pill bg-[#EBF2EC] text-[#385E45] border border-[#CFE0D3] mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Matriks Perbandingan Mutu</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#2D2A26]">
                Mengapa Harus Mie Cap DOKAR?
              </h3>
            </div>
            <p className="text-xs text-[#7A7063] max-w-sm">
              Perbandingan objektif kualitas Mie Dokar terhadap alternatif mie pasar basah dan mie instan pabrikan.
            </p>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[#E8DFC8]">
                  <th className="py-3 px-4 text-xs font-extrabold text-[#7D7061] uppercase tracking-wider w-1/4">
                    Karakteristik & Uji
                  </th>
                  <th className="py-3 px-4 text-xs font-black text-[#E07A5F] bg-[#FEF6F3] rounded-t-2xl uppercase tracking-wider w-1/4 border-t border-x border-[#F7DCD2]">
                    🍜 Mie Cap DOKAR
                  </th>
                  <th className="py-3 px-4 text-xs font-bold text-[#7D7061] uppercase tracking-wider w-1/4">
                    Mie Basah Pasar
                  </th>
                  <th className="py-3 px-4 text-xs font-bold text-[#7D7061] uppercase tracking-wider w-1/4">
                    Mie Instan Pabrikan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DC] text-xs">
                {COMPARISON_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#2D2A26]">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-[#2D2A26] bg-[#FEF6F3]/60 border-x border-[#F7DCD2]">
                      {row.dokar}
                    </td>
                    <td className="py-3.5 px-4 text-[#665B4E]">
                      {row.pasar}
                    </td>
                    <td className="py-3.5 px-4 text-[#665B4E]">
                      {row.instan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  );
}
