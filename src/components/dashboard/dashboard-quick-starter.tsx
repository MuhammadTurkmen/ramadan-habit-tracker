"use client";
import { CheckCircle, Flame, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardQuickStarter({
  completedDays,
  currentStreak,
  prayerConsistency,
}: {
  completedDays: number;
  currentStreak: number;
  prayerConsistency: number;
}) {
  const totalDays = 30;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid md:grid-cols-3 gap-4"
    >
      <StatCard
        icon={<Flame className="w-8 h-8 text-accent" />}
        title="Current Streak"
        value={`${currentStreak} days`}
        description="Keep it going!"
        color="bg-accent/10"
      />
      <StatCard
        icon={<CheckCircle className="w-8 h-8 text-primary" />}
        title="Completed Days"
        value={`${completedDays}/${totalDays}`}
        description={`${Math.round((completedDays / totalDays) * 100)}% progress`}
        color="bg-primary/10"
      />
      <StatCard
        icon={<Sparkles className="w-8 h-8 text-chart-3" />}
        title="Prayer Consistency"
        value={`${prayerConsistency}%`}
        description="Mashallah!"
        color="bg-chart-3/10"
      />
    </motion.div>
  );
}

function StatCard({
  icon,
  title,
  value,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card rounded-xl p-6 border border-border shadow-lg hover:shadow-xl transition-all"
    >
      <div
        className={`w-14 h-14 ${color} rounded-lg flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-muted-foreground text-sm mb-1">{title}</h3>
      <div className="text-2xl md:text-3xl mb-1">{value}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}
