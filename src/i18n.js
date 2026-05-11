import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationPT from './locales/pt/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
  en: { translation: translationEN },
  pt: { translation: translationPT },
  es: { translation: translationES }
};

i18n
  // Detects user language from the browser
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
