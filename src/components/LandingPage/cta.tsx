"use client";

import { Download } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function LandingPageCTA() {
  const { t } = useTranslation();

  return (
    <section className="px-4 py-20 bg-linear-to-r from-primary to-primary/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl text-white mb-6">
          {t("landing.ctaTitle")}
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {t("landing.ctaSubtitle")}
        </p>
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          <Link href="/signup">
            <button
              // onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
            >
              {t("landing.signUpNow")}
            </button>
          </Link>
          <Link href={"/login"}>
            <button
              // onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white text-primary rounded-lg hover:bg-white/90 transition-all shadow-lg"
            >
              {t("landing.login")}
            </button>
          </Link>
        </div>

        {/* Download Mobile App Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <h3 className="text-2xl text-white mb-4">
            {t("landing.downloadApp")}
          </h3>
          <button className="flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg hover:bg-white/90 transition-all shadow-lg mx-auto">
            <Download className="w-5 h-5" />
            {t("landing.download")}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
