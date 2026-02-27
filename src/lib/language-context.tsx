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
  const [language, setLanguage] = useState<Language>("en");

  const isRTL = rtlLanguages.includes(language);

  useEffect(() => {
    i18n.changeLanguage(language);

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
