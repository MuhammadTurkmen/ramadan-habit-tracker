"use client";
import LanguageSelector from "../language-selector";
import ThemeToggle from "../theme-toggle";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function DashboardHeader() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-start justify-between"
    >
      <div>
        <h1 className="text-2xl md:text-4xl mb-2">{t("dashboard.greeting")}</h1>
        <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </motion.div>
  );
}
