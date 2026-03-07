"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function OfflineDetector() {
  const { t } = useTranslation();

  useEffect(() => {
    const handleOffline = () => {
      toast.error(t("system.offline.noInternetConnection"));
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, [t]);

  return null;
}
