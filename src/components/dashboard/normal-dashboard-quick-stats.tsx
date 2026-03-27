"use client";

import { Flame, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function calculateStats(logs: any[]) {
  const grouped: Record<string, any[]> = {};

  logs.forEach((log) => {
    if (!grouped[log.date]) grouped[log.date] = [];
    grouped[log.date].push(log);
  });

  const dates = Object.keys(grouped).sort();

  let streak = 0;

  for (let i = dates.length - 1; i >= 0; i--) {
    const dayLogs = grouped[dates[i]];
    const completed = dayLogs.every((l) => l.completed || l.value > 0);

    if (completed) streak++;
    else break;
  }

  const completedDays = dates.filter((date) =>
    grouped[date].every((l) => l.completed || l.value > 0),
  ).length;

  const totalDays = dates.length;

  const consistency =
    totalDays === 0 ? 0 : Math.round((completedDays / totalDays) * 100);

  return { streak, completedDays, totalDays, consistency };
}

export function NormalDashboardQuickStats({ logs }: { logs: any[] }) {
  const { streak, completedDays, totalDays, consistency } =
    calculateStats(logs);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid md:grid-cols-3 gap-4"
    >
      <StatCard
        icon={<Flame className="w-8 h-8 text-accent" />}
        title="Current Streak"
        value={`${streak} days`}
        description="Keep it going 🔥"
        color="bg-accent/10"
      />

      <StatCard
        icon={<CheckCircle className="w-8 h-8 text-primary" />}
        title="Completed Days"
        value={`${completedDays}/${totalDays}`}
        description={`${consistency}% consistency`}
        color="bg-primary/10"
      />

      <StatCard
        icon={<Sparkles className="w-8 h-8 text-chart-3" />}
        title="Overall Progress"
        value={`${consistency}%`}
        description="Mashallah ✨"
        color="bg-chart-3/10"
      />
    </motion.div>
  );
}

function StatCard({ icon, title, value, description, color }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card rounded-xl p-6 border border-border shadow-lg"
    >
      <div
        className={`w-14 h-14 ${color} rounded-lg flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-muted-foreground text-sm">{title}</h3>
      <div className="text-2xl md:text-3xl">{value}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}
