import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Send, 
  Phone, 
  Building, 
  MapPin, 
  PackageCheck,
  CheckCircle2
} from 'lucide-react';
import { BRAND_INFO } from '../data/productKnowledgeData';

export default function ContactSalesModal({ initialSubject, onClose }) {
  const [selectedWA, setSelectedWA] = useState('wa1'); // 'wa1' or 'wa2'
  const [inquiryType, setInquiryType] = useState('losspack');
  const [businessName, setBusinessName] = useState('');
  const [cityName, setCityName] = useState('');
  const [estimatedQuantity, setEstimatedQuantity] = useState('10 Bal (50 Kg)');
  const [notes, setNotes] = useState(initialSubject || '');

  const inquiryOptions = [
    { id: 'losspack', label: '🍜 Losspack 5Kg (Catering & Warung Makan)' },
    { id: 'bal20', label: '🏪 Kemasan 5Kg / 20x250g (Warung Sayur & Kelontong)' },
    { id: 'distributor', label: '📦 Peluang Distributor Area' },
    { id: 'bimbingan', label: '🍳 Bimbingan Memasak & Konsultasi Usaha' },
  ];

  const handleSendWhatsApp = (e) => {
    e.preventDefault();

    const targetWA = selectedWA === 'wa1' ? BRAND_INFO.contacts.wa1 : BRAND_INFO.contacts.wa2;
    const selectedLabel = inquiryOptions.find(o => o.id === inquiryType)?.label || 'Informasi Produk';

    const message = `Halo Tim Manajemen & Penjualan *Mie Reshik Cap DOKAR*,

Saya ingin berkonsultasi mengenai produk/kemitraan:
📌 *Jenis Kebutuhan:* ${selectedLabel}
🏢 *Nama Usaha / Warung / Toko:* ${businessName || '-'}
📍 *Kota / Lokasi:* ${cityName || '-'}
📦 *Estimasi Kebutuhan:* ${estimatedQuantity || '-'}
💬 *Catatan / Pertanyaan:* ${notes || 'Mohon informasi prosedur pemesanan, harga grosir, dan sampel.'}

Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetWA}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="card-soft bg-white w-full max-w-lg max-h-[90vh] overflow-hidden border border-[#EADBCC] shadow-2xl relative text-[#1E3F33] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#ECE2D2] flex items-center justify-center text-[#5C7368] hover:text-[#1E3F33] hover:bg-[#F4EFEA] transition-all shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          {/* Modal Header */}
          <div className="mb-6 pb-4 border-b border-[#EFE8DC] pr-8">
          <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#CFE8CA] mb-2">
            <MessageCircle className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Layanan Kemitraan & Penjualan</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1E3F33] tracking-tight font-display">
            Hubungi Tim Mie Dokar
          </h2>
          <p className="text-xs text-[#5C7368] mt-1">
            Dapatkan penawaran harga grosir, bimbingan cara memasak, atau pendaftaran distributor area.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSendWhatsApp} className="space-y-4">
          
          {/* Target WhatsApp Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C7368] mb-1.5">
              Pilih Nomor Layanan WhatsApp:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedWA('wa1')}
                className={`p-3 rounded-2xl text-left text-xs font-bold border transition-all ${
                  selectedWA === 'wa1'
                    ? 'bg-[#EBF7E9] border-[#234E3E] text-[#1E3F33] shadow-xs'
                    : 'bg-[#FAF7F2] border-[#EADBCC] text-[#5C7368]'
                }`}
              >
                <div>Layanan 1</div>
                <div className="text-[11px] font-normal">{BRAND_INFO.contacts.wa1Display}</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedWA('wa2')}
                className={`p-3 rounded-2xl text-left text-xs font-bold border transition-all ${
                  selectedWA === 'wa2'
                    ? 'bg-[#EBF7E9] border-[#234E3E] text-[#1E3F33] shadow-xs'
                    : 'bg-[#FAF7F2] border-[#EADBCC] text-[#5C7368]'
                }`}
              >
                <div>Layanan 2</div>
                <div className="text-[11px] font-normal">{BRAND_INFO.contacts.wa2Display}</div>
              </button>
            </div>
          </div>

          {/* Inquiry Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C7368] mb-1.5">
              Jenis Kebutuhan Anda
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {inquiryOptions.map((opt) => {
                const isSelected = inquiryType === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setInquiryType(opt.id)}
                    className={`p-3 rounded-2xl text-left text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-[#EBF7E9] border-[#234E3E] text-[#1E3F33] font-bold shadow-xs'
                        : 'bg-[#FAF7F2] border-[#EADBCC] text-[#5C7368] hover:bg-[#F4EFEA]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Business / Warung Name */}
          <div>
            <label className="block text-xs font-bold text-[#5C7368] mb-1">
              Nama Usaha / Warung / Toko
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-[#9E9080] absolute left-3.5 top-3" />
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Contoh: Warung Sayur Bu Siti / Toko Berkah"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#ECE2D2] text-xs font-medium text-[#1E3F33] focus:bg-white focus:border-[#234E3E] outline-none"
              />
            </div>
          </div>

          {/* City / Location */}
          <div>
            <label className="block text-xs font-bold text-[#5C7368] mb-1">
              Kota / Kabupaten Lokasi Anda
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#9E9080] absolute left-3.5 top-3" />
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Contoh: Jogja, Solo, Semarang, Jakarta, Surabaya"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#ECE2D2] text-xs font-medium text-[#1E3F33] focus:bg-white focus:border-[#234E3E] outline-none"
              />
            </div>
          </div>

          {/* Estimated Quantity */}
          <div>
            <label className="block text-xs font-bold text-[#5C7368] mb-1">
              Estimasi Kebutuhan Pasokan
            </label>
            <div className="relative">
              <PackageCheck className="w-4 h-4 text-[#9E9080] absolute left-3.5 top-3" />
              <input
                type="text"
                value={estimatedQuantity}
                onChange={(e) => setEstimatedQuantity(e.target.value)}
                placeholder="Contoh: 10 Bal (50 Kg) / 1 Bal untuk tester awal"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#ECE2D2] text-xs font-medium text-[#1E3F33] focus:bg-white focus:border-[#234E3E] outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#5C7368] mb-1">
              Catatan / Permintaan Khusus
            </label>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tuliskan detail pertanyaan atau jadwal pengiriman..."
              className="w-full p-3 rounded-2xl bg-[#FAF7F2] border border-[#ECE2D2] text-xs font-medium text-[#1E3F33] focus:bg-white focus:border-[#234E3E] outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full btn-curved btn-pine-primary py-3 text-xs sm:text-sm font-extrabold shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Pesan Otomatis ke WhatsApp Sales</span>
            </button>
          </div>

        </form>

        </div>
      </div>
    </div>
  );
}
