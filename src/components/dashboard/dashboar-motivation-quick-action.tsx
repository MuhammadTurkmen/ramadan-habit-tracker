"use client";
import { CalendarIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function DashboardMotivationQuickAction({
  message,
}: {
  message?: string | null;
}) {
  const { t } = useTranslation();

  const translatedMessage = (() => {
    if (!message) return t("dashboard.motivation.defaultMessage");
    const dbMessages = t("dbMessages", {
      returnObjects: true,
    }) as Record<string, string>;
    return dbMessages?.[message] ?? message;
  })();

  return (
    <>
      {/* Section 4 - Motivation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl p-6 border border-accent/30"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-accent/20 rounded-full">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg mb-2">{t("dashboard.motivation.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("dashboard.motivation.subtitle")}</p>
            <div className="bg-card/50 rounded-lg p-4 italic border border-accent/20">
              {translatedMessage}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link href="/dashboard/daily-tracker">
          <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            {t("dashboard.motivation.quickAction")}
          </button>
        </Link>
      </motion.div>
    </>
  );
}
