import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutAndVisionSection from './components/AboutAndVisionSection';
import ProblemSolutionSection from './components/ProblemSolutionSection';
import ProductCatalog from './components/ProductCatalog';
import HealthNutritionSection from './components/HealthNutritionSection';
import ProfitCalculator from './components/ProfitCalculator';
import ServicesPartnership from './components/ServicesPartnership';
import ClientPortfolio from './components/ClientPortfolio';
import TestimonialsSection from './components/TestimonialsSection';
import CertificatesSection from './components/CertificatesSection';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import ContactSalesModal from './components/ContactSalesModal';
import VideotronPresentation from './components/VideotronPresentation';
import { ArrowUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tentang');
  const [healthyMode, setHealthyMode] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [videotronOpen, setVideotronOpen] = useState(false);
  
  // Auto-open videotron mode if URL query or hash includes 'videotron'
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('videotron') === 'true' || window.location.hash.toLowerCase().includes('videotron')) {
      setVideotronOpen(true);
    }
  }, []);
  
  // Modal states
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');

  const toggleHealthyMode = (newVal) => {
    setHealthyMode(newVal);
    setToastMessage(newVal ? 'Mode Sehat Diaktifkan! 🌿 Pilihan 100% Bebas Gluten & Kaya Serat' : 'Mode Standar Aktif');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  const handleOpenContact = (subject = '') => {
    setContactSubject(typeof subject === 'string' ? subject : '');
    setContactModalOpen(true);
  };

  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#FAF7F2] text-[#1E3F33] selection:bg-[#A3D99B]/30 selection:text-[#1E3F33]">
      
      {/* Dynamic Floating Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-full bg-[#1E3F33] text-white border-2 border-[#A3D99B] shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-extrabold backdrop-blur-md">
            <span className="w-6 h-6 rounded-full bg-[#A3D99B] text-[#1E3F33] flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-white">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenContact={() => handleOpenContact('Konsultasi Produk Mie Reshik Cap Dokar')}
        healthyMode={healthyMode}
        setHealthyMode={toggleHealthyMode}
        onOpenVideotron={() => setVideotronOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section (Deep Pine Green + Slogan Switch + Product Visual) */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenContact={() => handleOpenContact('Konsultasi Kemitraan & Pembelian')}
          healthyMode={healthyMode}
          setHealthyMode={toggleHealthyMode}
        />

        {/* 2. Tentang Kami & Visi Misi */}
        <AboutAndVisionSection />

        {/* 3. Masalah & Solusi (Matching Poster Style) */}
        <ProblemSolutionSection />

        {/* 4. Katalog Produk Utama: Losspack 5Kg & Kemasan Retail */}
        <ProductCatalog
          onSelectProduct={(product) => setSelectedProductForModal(product)}
          onOpenContact={(subject) => handleOpenContact(subject)}
        />

        {/* 5. Keunggulan Gizi & Standar Mutu (16x Serat, Stainless 304, UGM Lab) */}
        <HealthNutritionSection />

        {/* 6. Kalkulator Porsi & Modal Usaha (Rp 1.200/porsi) */}
        <ProfitCalculator
          onOpenContact={(subject) => handleOpenContact(subject)}
        />

        {/* 7. Layanan Tambahan & Kemitraan Distributor Area */}
        <ServicesPartnership
          onOpenContact={(subject) => handleOpenContact(subject)}
        />

        {/* 8. Portofolio Klien Institusi (Novotel, Lingkar Organik, Shopee) */}
        <ClientPortfolio />

        {/* 9. Testimoni Screenshot Asli (5 Reviewers) */}
        <TestimonialsSection />

        {/* 10. Dokumen Sertifikasi & Legalitas (Halal Blurred 2 & 3, NIB, HAKI) */}
        <CertificatesSection />

      </main>

      {/* Footer */}
      <Footer
        onOpenContact={(subject) => handleOpenContact(subject)}
        onNavigate={handleNavigate}
        onOpenVideotron={() => setVideotronOpen(true)}
      />

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-[#1E3F33] hover:bg-[#152D23] text-[#A3D99B] border border-[#2D5A49] shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        title="Kembali ke atas"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Modals */}
      {selectedProductForModal && (
        <ProductDetailModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onOpenContact={(prodName) => handleOpenContact(`Konsultasi ${prodName}`)}
        />
      )}

      {contactModalOpen && (
        <ContactSalesModal
          initialSubject={contactSubject}
          onClose={() => setContactModalOpen(false)}
        />
      )}

      {/* Fullscreen 16:9 Videotron Mode */}
      {videotronOpen && (
        <VideotronPresentation
          onClose={() => setVideotronOpen(false)}
        />
      )}

    </div>
  );
}
