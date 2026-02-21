"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "tr" | "fa" | "ps";

const rtlLanguages: Language[] = ["fa", "ps"];

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}>({
  language: "en",
  setLanguage: () => {},
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const isRTL = rtlLanguages.includes(language);

  // 🔥 THIS IS THE FIX
  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = isRTL ? "rtl" : "ltr";
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
