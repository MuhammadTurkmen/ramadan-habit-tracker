"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function VerifyEmailPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-semibold">{t("auth.verify_title")}</h1>
        <p className="text-muted-foreground">
          {t("auth.verify_instructions")}
          <br />
          <b>{t("auth.verify_check_spam", "spam folder")}</b>.{" "}
          <Link href="/login" className="underline">
            {t("auth.verify_login_link")}
          </Link>
        </p>
      </div>
    </div>
  );
}
