"use client";

import { supabase } from "@/lib/supabase/client";
import { Eye, EyeOff, KeyRound, LockKeyhole } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ChangePasswordCard() {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const startIconClass = isRTL ? "right-3" : "left-3";
  const endIconClass = isRTL ? "left-3" : "right-3";
  const inputPadding = isRTL ? "pr-10 pl-12" : "pl-10 pr-12";

  async function handleChangePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error(t("settings.fillAllPasswords"));
      return;
    }

    if (newPassword.length < 6) {
      toast.error(t("settings.newPasswordMin"));
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t("settings.passwordMismatch"));
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user?.email) {
        throw new Error(t("settings.userIdentifyFailed"));
      }

      // Verify current password before allowing change.
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (verifyError) {
        toast.error(t("settings.currentPasswordIncorrect"));
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success(t("settings.passwordUpdated"));

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error(t("settings.passwordUpdateFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card rounded-2xl p-6 border border-border shadow-lg"
    >
      <form action="">
        <div className="flex items-center gap-2 mb-6">
          <KeyRound className="w-6 h-6 text-primary" />
          <h2 className="text-2xl">{t("settings.changePassword")}</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-muted-foreground">
              {t("settings.currentPassword")}
            </label>
            <div className="relative">
              <LockKeyhole
                className={`absolute ${startIconClass} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`}
              />
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                placeholder={t("settings.currentPasswordPlaceholder")}
                required
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full ${inputPadding} py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className={`absolute ${endIconClass} top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`}
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-muted-foreground">
              {t("settings.newPassword")}
            </label>
            <div className="relative">
              <LockKeyhole
                className={`absolute ${startIconClass} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`}
              />
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                placeholder={t("settings.newPasswordPlaceholder")}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full ${inputPadding} py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className={`absolute ${endIconClass} top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`}
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-muted-foreground">
              {t("settings.confirmNewPassword")}
            </label>
            <div className="relative">
              <LockKeyhole
                className={`absolute ${startIconClass} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("settings.confirmNewPasswordPlaceholder")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full ${inputPadding} py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className={`absolute ${endIconClass} top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            disabled={loading}
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg"
          >
            {loading ? t("settings.updatingPassword") : t("settings.updatePassword")}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
