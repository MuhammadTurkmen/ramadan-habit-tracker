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

export function LandingPageFeatures() {
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
            Everything You Need for a Blessed Ramadan
            {/* {t('landing.featuresTitle')} */}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="w-10 h-10 text-accent" />}
              // title={t("landing.dailyTracker")}
              // description={t("landing.dailyTrackerDesc")}
              title="Daily Tracker"
              description="Track your fasting, prayers, Quran reading, and dhikr with ease."
            />
            <FeatureCard
              icon={<Calendar className="w-10 h-10 text-accent" />}
              // title={t("landing.visualCalendar")}
              title="Visual Calendar"
              description="See your progress at a glance with a beautiful calendar view."
              // description={t("landing.visualCalendarDesc")}
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10 text-accent" />}
              // title={t("landing.insights")}
              title="Insights & Stats"
              description="Understand your habits with detailed analytics and streaks."
              // description={t("landing.insightsDesc")}
            />
            <FeatureCard
              icon={<Heart className="w-10 h-10 text-accent" />}
              title="Stay Motivated"
              // title={t("landing.stayMotivated")}
              description="Get daily encouragement and track your spiritual journey."
              // description={t("landing.stayMotivatedDesc")}
            />
            <FeatureCard
              icon={<Moon className="w-10 h-10 text-accent" />}
              title="Dark Mode"
              // title={t("landing.darkMode")}
              description="Easy on the eyes during night prayers with dark mode support."
              // description={t("landing.darkModeDesc")}
            />
            <FeatureCard
              icon={<Star className="w-10 h-10 text-accent" />}
              title="Build Streaks"
              // title={t("landing.buildStreaks")}
              description="Maintain consistency and build lasting habits beyond Ramadan."
              // description={t("landing.buildStreaksDesc")}
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
