"use client";
import { useTranslation } from "react-i18next";
export function LandingPageFooter() {
  const { t } = useTranslation();

  return (
    <footer className="px-4 py-8 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto text-center text-muted-foreground">
        <p>
          {t("landing.footerPrefix")}{" "}
          <a
            href="https://www.linkedin.com/in/muhammad-turkmen-792498272"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            Muhammad Turkmen
          </a>
        </p>
      </div>
    </footer>
  );
}
