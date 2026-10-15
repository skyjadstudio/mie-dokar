import React, { useState } from 'react';
import { 
  X, 
  QrCode as QrIcon, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  Sparkles,
  Printer,
  FileImage,
  Layers
} from 'lucide-react';
import { getAssetUrl } from '../data/productKnowledgeData';

export default function QrCodeModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('card'); // 'card' or 'standard'
  const [copied, setCopied] = useState(false);

  const websiteUrl = "https://skyjadstudio.github.io/mie-dokar/";
  const qrStandardPng = getAssetUrl("images/qr-code-mie-dokar.png");
  const qrStandardSvg = getAssetUrl("images/qr-code-mie-dokar.svg");
  const qrCardPng = getAssetUrl("images/qr-code-mie-dokar-card.png");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(websiteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // fallback
      const textArea = document.createElement("textarea");
      textArea.value = websiteUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-stone-200 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#1E3F33] text-white px-6 py-4.5 rounded-t-3xl flex items-center justify-between border-b border-[#2D5A49]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7A9C78]/30 border border-[#A3D99B]/40 flex items-center justify-center text-[#A3D99B]">
              <QrIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white font-display flex items-center gap-2">
                Barcode / QR Code Website
              </h3>
              <p className="text-xs text-[#A3D99B]">
                Scan langsung untuk membuka katalog & info kemitraan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* View Tab Selector */}
          <div className="flex p-1 bg-stone-100 rounded-2xl border border-stone-200">
            <button
              onClick={() => setActiveTab('card')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'card'
                  ? 'bg-white text-[#1E3F33] shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Kartu Promosi Siap Cetak</span>
            </button>
            <button
              onClick={() => setActiveTab('standard')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'standard'
                  ? 'bg-white text-[#1E3F33] shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <QrIcon className="w-3.5 h-3.5" />
              <span>Barcode Standar (QR Polos)</span>
            </button>
          </div>

          {/* Visual Display */}
          <div className="flex flex-col items-center justify-center bg-stone-50 p-6 rounded-2xl border border-stone-200/80">
            {activeTab === 'card' ? (
              <div className="relative group max-w-xs shadow-lg rounded-2xl overflow-hidden border border-stone-200 bg-white">
                <img 
                  src={qrCardPng} 
                  alt="Kartu Barcode Mie Dokar Siap Cetak" 
                  className="w-full h-auto object-contain"
                />
              </div>
            ) : (
              <div className="p-4 bg-white rounded-2xl shadow-md border border-stone-200 max-w-[260px]">
                <img 
                  src={qrStandardPng} 
                  alt="QR Code Mie Reshik Cap Dokar" 
                  className="w-full h-auto object-contain"
                />
              </div>
            )}

            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Scan dengan Kamera HP / Google Lens / WhatsApp
              </span>
            </div>
          </div>

          {/* Website Link Copy Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600 block">
              Tautan Website Tujuan:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={websiteUrl}
                className="flex-1 bg-stone-100 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-700 font-mono focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#1E3F33] hover:bg-[#152D23] text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin URL'}</span>
              </button>
            </div>
          </div>

          {/* Download Buttons Section */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#1E3F33]" />
              <span>Unduh File Barcode Resmi:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              
              {/* Option 1: High-Res PNG */}
              <a
                href={qrStandardPng}
                download="qr-code-mie-dokar.png"
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-center transition-all group"
              >
                <FileImage className="w-5 h-5 text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-stone-800">PNG Resolusi Tinggi</span>
                <span className="text-[10px] text-stone-500">Medsos, Story, Status</span>
              </a>

              {/* Option 2: Vector SVG */}
              <a
                href={qrStandardSvg}
                download="qr-code-mie-dokar.svg"
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-center transition-all group"
              >
                <Layers className="w-5 h-5 text-purple-600 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-stone-800">SVG Vektor Asli</span>
                <span className="text-[10px] text-stone-500">Spanduk, Banner, Dus</span>
              </a>

              {/* Option 3: Ready-to-Print Flyer */}
              <a
                href={qrCardPng}
                download="kartu-promosi-mie-dokar.png"
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-center transition-all group"
              >
                <Printer className="w-5 h-5 text-amber-700 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-amber-900">Kartu Siap Cetak</span>
                <span className="text-[10px] text-amber-700">Tent Card, Meja Kedai</span>
              </a>

            </div>
          </div>

          {/* Usage tips */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-[11.5px] text-stone-600 space-y-1.5 leading-relaxed">
            <p className="font-bold text-stone-800">💡 Ide Penggunaan Barcode Ini:</p>
            <ul className="list-disc list-inside space-y-1 text-stone-600">
              <li>Cetak pada <strong>stiker kemasan losspack 5Kg</strong> agar mitra mudah reorder.</li>
              <li>Pasang pada <strong>standing banner pameran atau meja kedai mitra kuliner</strong>.</li>
              <li>Kirimkan ke calon <strong>reseller atau agen luar kota</strong> via WhatsApp.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 rounded-b-3xl border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
