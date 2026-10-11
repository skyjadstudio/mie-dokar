import React from 'react';
import { 
  ChefHat, 
  Store, 
  Handshake, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  MessageCircle,
  MapPin
} from 'lucide-react';
import { SERVICES_AND_PARTNERSHIP, BRAND_INFO } from '../data/productKnowledgeData';

export default function ServicesPartnership({ onOpenContact }) {
  return (
    <section id="kemitraan" className="py-14 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFEA] to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-pill bg-[#EBF7E9] text-[#1E3F33] border border-[#A3D99B]/60 mb-3">
            <Handshake className="w-3.5 h-3.5 text-[#234E3E]" />
            <span>Layanan & Peluang Kemitraan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3F33] tracking-tight mb-3 font-display">
            Layanan Tambahan & Kemitraan
          </h2>
          <p className="text-sm sm:text-base text-[#4F6359] italic">
            "{SERVICES_AND_PARTNERSHIP.tagline}"
          </p>
        </div>

        {/* 2 Big Service Pillar Cards (Matching Poster - Distributor First, then Bimbingan Masak) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Pillar 1: Terbuka bagi Distributor */}
          <div className="card-soft p-6 sm:p-8 bg-[#A3D99B] text-[#1E3F33] border border-[#8DC984] shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-5 shadow-xs">
                <CheckCircle2 className="w-7 h-7 text-[#234E3E]" />
              </div>
              <h3 className="text-2xl font-black text-[#1E3F33] font-display mb-3">
                Terbuka bagi Distributor
              </h3>
              <p className="text-sm sm:text-base text-[#1A3D2B] leading-relaxed font-medium">
                Anda bisa menjadi <strong>distributor area</strong> (seluruh pasar / warung / toko oleh-oleh yang berada di area tersebut).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#87C47E]">
              <button
                onClick={() => onOpenContact('Peluang Distributor Area Mie Dokar')}
                className="btn-curved bg-[#1E3F33] text-white hover:bg-[#132B20] px-5 py-2.5 text-xs font-bold"
              >
                <span>Daftar Jadi Distributor</span>
              </button>
            </div>
          </div>

          {/* Pillar 2: Kendala Memasak & Bimbingan */}
          <div className="card-soft p-6 sm:p-8 bg-[#A3D99B] text-[#1E3F33] border border-[#8DC984] shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-5 shadow-xs">
                <CheckCircle2 className="w-7 h-7 text-[#234E3E]" />
              </div>
              <h3 className="text-2xl font-black text-[#1E3F33] font-display mb-3">
                Kendala Memasak?
              </h3>
              <p className="text-sm sm:text-base text-[#1A3D2B] leading-relaxed font-medium">
                Mungkin masih banyak yang awam dengan mie ini, <strong>kami bersedia membimbing cara masak</strong> untuk yang ingin membuka usaha kuliner.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#87C47E]">
              <button
                onClick={() => onOpenContact('Bimbingan Cara Masak & Resep Mie Dokar')}
                className="btn-curved bg-[#1E3F33] text-white hover:bg-[#132B20] px-5 py-2.5 text-xs font-bold"
              >
                <span>Minta Bimbingan Masak</span>
              </button>
            </div>
          </div>

        </div>

        {/* Big Partnership Banner (Poster: Kami hadir bukan sekadar menjual mie, tapi membuka peluang) */}
        <div className="card-soft p-6 sm:p-10 bg-[#A3D99B] text-[#1E3F33] border border-[#8DC984] shadow-xl relative overflow-hidden">
          
          <div className="max-w-3xl space-y-4">
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight font-display text-[#1E3F33]">
              Kami hadir bukan sekadar menjual mie, tapi membuka peluang
            </h3>
            <p className="text-sm sm:text-base text-[#1A3D2B] leading-relaxed font-medium">
              Mari tumbuh bersama kami. Nikmati kemudahan pembelian, peluang menjadi distributor, dan bimbingan memasak Mie Reshik cap DOKAR.
            </p>

            {/* Direct WA Contacts row */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${BRAND_INFO.contacts.wa1}?text=Halo%20Mie%20Reshik%20Cap%20Dokar,%20saya%20tertarik%20dengan%20kemitraan%20usaha.`}
                target="_blank"
                rel="noreferrer"
                className="btn-curved bg-[#1E3F33] text-white hover:bg-[#152D23] px-5 py-3 text-xs sm:text-sm font-bold shadow-md"
              >
                <Phone className="w-4 h-4 text-[#A3D99B]" />
                <span>WA 1: {BRAND_INFO.contacts.wa1Display}</span>
              </a>

              <a
                href={`https://wa.me/${BRAND_INFO.contacts.wa2}?text=Halo%20Mie%20Reshik%20Cap%20Dokar,%20saya%20tertarik%20dengan%20kemitraan%20usaha.`}
                target="_blank"
                rel="noreferrer"
                className="btn-curved bg-[#1E3F33] text-white hover:bg-[#152D23] px-5 py-3 text-xs sm:text-sm font-bold shadow-md"
              >
                <Phone className="w-4 h-4 text-[#A3D99B]" />
                <span>WA 2: {BRAND_INFO.contacts.wa2Display}</span>
              </a>

              <a
                href={BRAND_INFO.gmapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-curved bg-white text-[#1E3F33] hover:bg-[#F2FAF0] px-5 py-3 text-xs sm:text-sm font-bold shadow-md"
              >
                <MapPin className="w-4 h-4 text-[#234E3E]" />
                <span>Maps: {BRAND_INFO.gmapsQuery}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
