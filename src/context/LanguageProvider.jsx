import React, { useState } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../utils/translations';

export function LanguageProvider({ children }) {
  // Try to load initial language from localStorage, default to English
  const [language, setLangState] = useState(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return saved && (saved === 'en' || saved === 'hi' || saved === 'mr') ? saved : 'en';
  });

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'hi' || lang === 'mr') {
      setLangState(lang);
      localStorage.setItem('portfolio_lang', lang);
    }
  };

  // Safe nested translation lookup helper
  const t = (keyPath) => {
    const keys = keyPath.split('.');
    
    // Resolve key path in current language
    let currentTranslation = translations[language];
    for (const key of keys) {
      if (currentTranslation && currentTranslation[key] !== undefined) {
        currentTranslation = currentTranslation[key];
      } else {
        currentTranslation = null;
        break;
      }
    }

    // Fallback to English if translation is missing in the current language
    if (currentTranslation === null && language !== 'en') {
      let englishTranslation = translations['en'];
      for (const key of keys) {
        if (englishTranslation && englishTranslation[key] !== undefined) {
          englishTranslation = englishTranslation[key];
        } else {
          englishTranslation = null;
          break;
        }
      }
      return englishTranslation !== null ? englishTranslation : keyPath;
    }

    return currentTranslation !== null ? currentTranslation : keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
