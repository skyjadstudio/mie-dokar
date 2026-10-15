import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Heart,
  ShieldCheck,
  Award
} from 'lucide-react';
import { BRAND_INFO, getAssetUrl } from '../data/productKnowledgeData';

export default function Footer({ onOpenContact, onNavigate }) {
  return (
    <footer className="border-t border-[#2D5A49] bg-[#1E3F33] text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border border-[#7A9C78]/60 shrink-0">
                <img
                  src={getAssetUrl("images/dokar_logo_official.png")}
                  alt="Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white font-display">
                  MIE RESHIK CAP DOKAR
                </span>
                <p className="text-xs text-[#A3D99B]">
                  {BRAND_INFO.tagline} • Pilihan Alami Nusantara
                </p>
              </div>
            </div>

            <p className="text-xs text-[#D0E2CE] leading-relaxed max-w-sm">
              Produsen mie sehat alami dari singkong murni Indonesia sejak 2014. 100% bebas gluten, rendah gula, dan tinggi serat untuk keluarga dan mitra usaha kuliner nusantara.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="badge-pill bg-[#7A9C78]/20 text-[#A3D99B] border border-[#7A9C78]/40 text-[11px]">
                🌿 100% Bebas Gluten
              </span>
              <span className="badge-pill bg-[#7A9C78]/20 text-[#A3D99B] border border-[#7A9C78]/40 text-[11px]">
                🌾 Serat 16x Lipat
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A3D99B]">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs text-[#D0E2CE]">
              <li>
                <button onClick={() => onNavigate('tentang')} className="hover:text-[#A3D99B] transition-colors">
                  Tentang Kami & Visi Misi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('masalah-solusi')} className="hover:text-[#A3D99B] transition-colors">
                  Konteks Masalah & Solusi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('produk')} className="hover:text-[#A3D99B] transition-colors">
                  Produk Losspack 5Kg
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kalkulator')} className="hover:text-[#A3D99B] transition-colors">
                  Kalkulator Porsi Warung
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legalitas')} className="hover:text-[#A3D99B] transition-colors">
                  Sertifikasi & Legalitas
                </button>
              </li>
            </ul>
          </div>

          {/* Key Advantages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A3D99B]">
              Jaminan Mutu
            </h4>
            <ul className="space-y-2 text-xs text-[#D0E2CE]">
              <li>✓ Halal BPJPH Kemenag RI</li>
              <li>✓ Sertifikat Uji Lab UGM</li>
              <li>✓ Kualitas Air Cek Puskesmas</li>
              <li>✓ Mesin Stainless Steel 304</li>
              <li>✓ Tanpa Tenaga Hewan/Sapi</li>
              <li>✓ Kapasitas 1.5 - 2.5 Ton</li>
            </ul>
          </div>

          {/* Contacts & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A3D99B]">
              Kontak Pabrik / Sales
            </h4>
            <div className="space-y-2.5 text-xs text-[#D0E2CE]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A3D99B] shrink-0 mt-0.5" />
                <span>Pabrik Mie Dokar, Gunturgeni, Poncosari, Srandakan, D.I. Yogyakarta</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A3D99B] shrink-0" />
                <a href={`https://wa.me/${BRAND_INFO.contacts.wa1}`} target="_blank" rel="noreferrer" className="hover:underline">
                  WA 1: {BRAND_INFO.contacts.wa1Display}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A3D99B] shrink-0" />
                <a href={`https://wa.me/${BRAND_INFO.contacts.wa2}`} target="_blank" rel="noreferrer" className="hover:underline">
                  WA 2: {BRAND_INFO.contacts.wa2Display}
                </a>
              </div>
            </div>

            <button
              onClick={() => onOpenContact('Pemesanan Produk Mie Dokar')}
              className="mt-3 btn-curved bg-[#7A9C78] hover:bg-[#688A66] text-white px-4 py-2 text-xs font-bold w-full shadow-md"
            >
              <span>Hubungi Layanan Sales</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#2D5A49] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A3D99B]/80">
          <div>
            © 2014 - 2026 <strong>Mie Reshik Cap DOKAR</strong> (FX. Subeno). All Rights Reserved.
          </div>
          <div className="flex items-center gap-1 text-white">
            <span>Aktifkan mode sehatmu</span>
            <span className="text-[#A3D99B]">🟢</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
