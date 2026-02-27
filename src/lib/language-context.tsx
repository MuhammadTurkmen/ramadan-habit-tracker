"use client";

import { createContext, useContext, useEffect, useState } from "react";
import i18n from "@/i18n";

export type Language = "en" | "tr" | "fa" | "ps";

const rtlLanguages: Language[] = ["fa", "ps"];

const LanguageContext = createContext({
  language: "en" as Language,
  setLanguage: (_: Language) => {},
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(
    (i18n.language as Language) || "en",
  );

  const isRTL = rtlLanguages.includes(language);

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    document.cookie = `language=${lang}; path=/; max-age=31536000`;
    setLanguageState(lang);
  };

  useEffect(() => {
    const storedLang =
      localStorage.getItem("language") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("language="))
        ?.split("=")[1];

    if (storedLang && storedLang !== language) {
      i18n.changeLanguage(storedLang);
      setLanguageState(storedLang as Language);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
