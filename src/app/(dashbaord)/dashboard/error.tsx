"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    toast.error(t("system.error.offlineDetected"));
  }, [t]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-4 px-4">
        <p className="text-muted-foreground">{t("system.error.somethingWentWrong")}</p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          {t("system.error.tryAgain")}
        </button>
      </div>
    </div>
  );
}
