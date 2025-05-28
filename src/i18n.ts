import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import en from "./locales/en/layout_translation.json";
import hy from "./locales/am/layout_translation.json";
import ru from "./locales/ru/layout_translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hy: { translation: hy },
      ru: { translation: ru },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
