"use client";

import {
  Calendar,
  CheckCircle,
  Heart,
  Moon,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function LandingPageFeatures() {
  const { t } = useTranslation();

  return (
    <section className="px-4 py-20 bg-card">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl text-center mb-12 text-primary">
            {t("landing.featuresTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="w-10 h-10 text-accent" />}
              title={t("landing.features.dailyTracker.title")}
              description={t("landing.features.dailyTracker.desc")}
            />
            <FeatureCard
              icon={<Calendar className="w-10 h-10 text-accent" />}
              title={t("landing.features.visualCalendar.title")}
              description={t("landing.features.visualCalendar.desc")}
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10 text-accent" />}
              title={t("landing.features.insights.title")}
              description={t("landing.features.insights.desc")}
            />
            <FeatureCard
              icon={<Heart className="w-10 h-10 text-accent" />}
              title={t("landing.features.stayMotivated.title")}
              description={t("landing.features.stayMotivated.desc")}
            />
            <FeatureCard
              icon={<Moon className="w-10 h-10 text-accent" />}
              title={t("landing.features.darkMode.title")}
              description={t("landing.features.darkMode.desc")}
            />
            <FeatureCard
              icon={<Star className="w-10 h-10 text-accent" />}
              title={t("landing.features.buildStreaks.title")}
              description={t("landing.features.buildStreaks.desc")}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-lg bg-secondary border border-border hover:border-primary transition-all"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
