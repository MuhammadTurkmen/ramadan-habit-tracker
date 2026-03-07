"use client";
import { motion } from "motion/react";
import { TrendingUp, Flame, BookOpen, Target } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { buildInsights } from "@/lib/analytics";
import { useTranslation } from "react-i18next";

type Analytics = ReturnType<typeof buildInsights>;

export default function Insights({ analytics }: { analytics: Analytics }) {
  const { t } = useTranslation();

  const {
    weeklyData,
    prayerConsistency,
    totalQuranPages,
    averageDaily,
    totalDays,
    fastingDays,
    averageCompletion,
    daysLeft,
    remainingPages,
    pagesPerDayNeeded,
  } = analytics;

  const currentStreak = analytics.currentStreak || 0;
  const longestStreak = analytics.longestStreak || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl mb-2">{t("insights.title")}</h1>
        <p className="text-muted-foreground">{t("insights.subtitle")}</p>
      </motion.div>

      {/* Streak Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Flame className="w-8 h-8" />
            </div>
            <div>
              <div className="text-white/80 text-sm">
                {t("insights.cards.currentStreak")}
              </div>
              <div className="text-4xl">
                {t("insights.labels.daysValue", { value: currentStreak })}
              </div>
            </div>
          </div>
          <p className="text-white/80">
            {t("insights.cards.currentStreakHint")}
          </p>
        </div>

        <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-6 text-accent-foreground shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <div className="opacity-80 text-sm">
                {t("insights.cards.longestStreak")}
              </div>
              <div className="text-4xl">
                {t("insights.labels.daysValue", { value: longestStreak })}
              </div>
            </div>
          </div>
          <p className="opacity-80">{t("insights.cards.longestStreakHint")}</p>
        </div>
      </motion.div>

      {/* Section 1 - Weekly Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-lg"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-2xl">{t("insights.weekly.title")}</h2>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="completion"
              stroke="var(--primary)"
              strokeWidth={3}
              dot={{ fill: "var(--primary)", r: 5 }}
              name={t("insights.weekly.completion")}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Section 2 - Prayer Consistency */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-lg"
      >
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-6 h-6 text-accent" />
          <h2 className="text-2xl">{t("insights.prayer.title")}</h2>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={prayerConsistency}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="prayer" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="completed"
              fill="var(--primary)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {prayerConsistency.map((prayer: any) => (
            <div
              key={prayer.prayer}
              className="text-center p-3 bg-secondary rounded-lg"
            >
              <div className="text-sm text-muted-foreground mb-1">
                {t(`insights.prayers.${String(prayer.prayer).toLowerCase()}`)}
              </div>
              <div className="text-xl">
                {Math.round((prayer.completed / prayer.total) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Section 3 - Quran Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-chart-3" />
            <h2 className="text-2xl">{t("insights.quran.title")}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">
                  {t("insights.quran.totalPagesRead")}
                </span>
                <span className="text-2xl">{totalQuranPages}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div
                  className="bg-chart-3 h-3 rounded-full transition-all"
                  style={{ width: `${(totalQuranPages / 604) * 100}%` }}
                />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {t("insights.quran.percentOfQuran", {
                  percent: Math.round((totalQuranPages / 604) * 100),
                })}
              </div>
            </div>

            <div className="p-4 bg-secondary rounded-xl">
              <div className="text-muted-foreground mb-1">
                {t("insights.quran.averagePerDay")}
              </div>
              <div className="text-3xl">
                {t("insights.labels.pagesValue", { value: averageDaily })}
              </div>
            </div>

            <div className="p-4 bg-chart-3/10 border border-chart-3/30 rounded-xl">
              <div className="text-muted-foreground mb-1">
                {t("insights.quran.toCompleteInRamadan")}
              </div>
              <div className="text-2xl">
                {t("insights.quran.pagesPerDayNeeded", {
                  value: pagesPerDayNeeded,
                })}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {t("insights.quran.remainingSummary", {
                  pages: remainingPages,
                  days: daysLeft,
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
          <h2 className="text-2xl mb-6">{t("insights.quickStats.title")}</h2>

          <div className="space-y-4">
            <StatRow
              label={t("insights.quickStats.daysTracked")}
              value={`${totalDays}/30`}
              percentage={(totalDays / 30) * 100}
            />

            <StatRow
              label={t("insights.quickStats.averageCompletion")}
              value={`${averageCompletion}%`}
              percentage={averageCompletion}
            />

            <StatRow
              label={t("insights.quickStats.fastingDays")}
              value={`${fastingDays}/30`}
              percentage={(fastingDays / 30) * 100}
            />

            <StatRow
              label={t("insights.quickStats.prayerRate")}
              value={`${averageCompletion}%`}
              percentage={averageCompletion}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatRow({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-lg">{value}</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
