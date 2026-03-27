"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingDown } from "lucide-react";

function getBestWorst(habits: any[], logs: any[]) {
  const scores = habits.map((h) => {
    const habitLogs = logs.filter((l) => l.habit_id === h.id);

    const completed = habitLogs.filter(
      (l) => l.completed || l.value > 0,
    ).length;

    return { name: h.name, score: completed };
  });

  scores.sort((a, b) => b.score - a.score);

  return {
    best: scores[0],
    worst: scores[scores.length - 1],
  };
}

export function NormalDashboardBestHabits({ habits, logs }: any) {
  const { best, worst } = getBestWorst(habits, logs);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid md:grid-cols-2 gap-4"
    >
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="text-yellow-500" />
          <h3>Best Habit</h3>
        </div>
        <p className="text-xl">{best?.name}</p>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="text-red-500" />
          <h3>Needs Improvement</h3>
        </div>
        <p className="text-xl">{worst?.name}</p>
      </div>
    </motion.div>
  );
}
