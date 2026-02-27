"use client";
import { Moon } from "lucide-react";
import ThemeToggle from "../theme-toggle";
import LanguageSelector from "../language-selector";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function LandingPageNavbar() {
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Moon className="w-8 h-8 text-primary" />
          <h1 className="text-xl md:text-2xl text-primary">
            {t("landing.siteTitle")}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />
          <Link href={"/signup"}>
            <button className="hidden md:block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
              {t("landing.getStarted")}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
