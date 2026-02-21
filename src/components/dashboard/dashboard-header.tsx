"use client";
import LanguageSelector from "../language-selector";
import ThemeToggle from "../theme-toggle";
import { motion } from "framer-motion";

export function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-start justify-between"
    >
      <div>
        <h1 className="text-2xl md:text-4xl mb-2">
          Assalamu Alaikum! 👋
          {/* {t("dashboard.greeting")} */}
        </h1>
        <p className="text-muted-foreground">
          {/* {t("dashboard.subtitle")} */}
          Here's your spiritual journey overview
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </motion.div>
  );
}
