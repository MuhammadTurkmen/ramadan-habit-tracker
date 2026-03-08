"use client";
import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Moon,
  Sun,
  LogOut,
  AlertTriangle,
  Languages,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useTranslation } from "react-i18next";
import { logout } from "@/app/actions/authentication";
import { useTheme } from "next-themes";
import ChangePasswordCard from "./change-password-card";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fa", name: "فارسی", flag: "🇦🇫" },
  { code: "ps", name: "پښتو", flag: "🇦🇫" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
];

type SettingsProps = {
  user: any;
};

export default function Settings({ user }: SettingsProps) {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { isRTL } = useLanguage();
  const startIconClass = isRTL ? "right-3" : "left-3";

  const [name, setName] = useState(user?.user_metadata?.full_name ?? "");
  const [email] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdateProfile = async () => {
    if (!name) {
      toast.error(t("settings.nameRequired"));
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name },
      });
      if (error) throw error;
      router.refresh();
      toast.success(t("settings.profileUpdated"));
    } catch (error) {
      toast.error(t("settings.profileUpdateFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl mb-2">{t("settings.title")}</h1>
        <p className="text-muted-foreground">{t("settings.subtitle")}</p>
      </motion.div>

      {/* Card 1 - Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-lg"
      >
        <form action="">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-2xl">{t("settings.profileInfo")}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-muted-foreground">
                {t("auth.name")}
              </label>
              <div className="relative">
                <User
                  className={`absolute ${startIconClass} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-10 pr-10 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-muted-foreground">
                {t("auth.email")}
              </label>
              <div className="relative">
                <Mail
                  className={`absolute ${startIconClass} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`}
                />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-10 pr-10 py-3 bg-input-background border border-input rounded-lg opacity-70 cursor-not-allowed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={handleUpdateProfile}
              className="w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg"
            >
              {loading ? t("settings.saving") : t("settings.saveChanges")}
            </button>
          </div>
        </form>
      </motion.div>
      <ChangePasswordCard />

      {/* Card 2 - Ramadan Settings */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-lg"
      >
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-accent" />
          <h2 className="text-2xl">{t("settings.ramadanSettings")}</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-muted-foreground">
              {t("settings.ramadanStartDate")}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="date"
                value={ramadanStartDate}
                onChange={(e) => setRamadanStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {t("settings.startDateDesc")}
            </p>
          </div>

          <button className="w-full md:w-auto px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all shadow-lg">
            {t("settings.updateDate")}
          </button>
        </div>
      </motion.div> */}

      {/* Card 3 - Appearance & Language */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-lg"
      >
        <div className="flex items-center gap-2 mb-6">
          {theme === "light" ? (
            <Sun className="w-6 h-6 text-chart-2" />
          ) : (
            <Moon className="w-6 h-6 text-chart-2" />
          )}
          <h2 className="text-2xl">{t("settings.appearance")}</h2>
        </div>

        <div className="space-y-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-primary" : "bg-muted"
                }`}
              >
                {theme === "dark" ? (
                  <Moon className="w-6 h-6 text-white" />
                ) : (
                  <Sun className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <h3 className="text-lg">{t("settings.darkMode")}</h3>
                <p className="text-sm text-muted-foreground">
                  {theme === "dark"
                    ? t("settings.darkModeEnabled")
                    : t("settings.darkModeDisabled")}
                </p>
              </div>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              //   className={`relative w-14 h-8 rounded-full transition-all ${
              //     theme === "dark" ? "bg-primary" : "bg-muted"
              //   }`}
              className={`cursor-pointer relative w-15 h-9 rounded-full border-3 transition-all ${theme === "dark" ? "bg-primary" : "bg-muted"} transition-all ${
                theme === "dark"
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div
                className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all ${theme === "dark" ? "left-7" : "left-1"}`}
              />
            </button>
          </div>

          {/* Language Selector */}
          <div className="p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-chart-2/20">
                <Languages className="w-6 h-6 text-chart-2" />
              </div>
              <div>
                <h3 className="text-lg">{t("settings.language")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("settings.languageDescription")}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as "en" | "fa" | "tr")}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    language === lang.code
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 4 - Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-destructive/10 border-2 border-destructive/30 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-6 h-6 text-destructive" />
          <h2 className="text-2xl text-destructive">
            {t("settings.dangerZone")}
          </h2>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">{t("settings.logoutWarning")}</p>

          <button
            onClick={async () => {
              setLoading(true);
              await logout();
              setLoading(false);
            }}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            {loading ? t("dashboard.logging_out") : t("dashboard.logout")}
          </button>
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-muted-foreground text-sm py-4"
      >
        <p>{t("settings.version", { version: "1.0.0" })}</p>
        <p className="mt-1">{t("settings.builtWithLove")}</p>
      </motion.div>
    </div>
  );
}
