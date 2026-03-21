"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/login");
        return;
      }

      setAllowed(true);
    }

    checkSession();
  }, []);

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!password) {
      toast.error(t("auth.password_required"));
      return;
    }

    if (password.length < 6) {
      toast.error(t("auth.password_min_length"));
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        toast.error(t("auth.reset_password_failed"));
        return;
      }

      toast.success(t("auth.password_updated_toast"));
      setUpdated(true);
    } finally {
      setLoading(false);
    }
  }

  if (!allowed) return;

  if (updated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary/5 to-accent/5 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl p-8 border border-border text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl text-primary">
            {t("auth.password_updated_title")}
          </h2>
          <p className="text-muted-foreground">
            {t("auth.password_updated_description")}
          </p>
          <Link href="/login" className="inline-block mt-2">
            <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              {t("auth.back_to_login")}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 to-accent/5 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link href="/login">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            {isRTL ? (
              <ArrowRight className="w-4 h-4" />
            ) : (
              <ArrowLeft className="w-4 h-4" />
            )}
            {t("auth.back_to_login")}
          </button>
        </Link>

        <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Moon className="w-10 h-10 text-primary" />
            <h1 className="text-3xl text-primary">
              {t("auth.reset_password_title")}
            </h1>
          </div>

          <p className="text-muted-foreground text-center mb-6">
            {t("auth.reset_password_subtitle")}
          </p>

          <form onSubmit={updatePassword}>
            <div>
              <label className="block mb-2 text-card-foreground">
                {t("auth.new_password_label")}
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={t("auth.new_password_placeholder")}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
            >
              {loading
                ? t("auth.updating_password")
                : t("auth.update_password")}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
