"use client";

import { motion } from "framer-motion";

function getCategoryStats(habits: any[], logs: any[]) {
  const result: Record<string, { total: number; completed: number }> = {};

  habits.forEach((h) => {
    const habitLogs = logs.filter((l) => l.habit_id === h.id);

    const completed = habitLogs.filter(
      (l) => l.completed || l.value > 0,
    ).length;

    if (!result[h.category]) {
      result[h.category] = { total: 0, completed: 0 };
    }

    result[h.category].total += habitLogs.length;
    result[h.category].completed += completed;
  });

  return result;
}

export function NormalDashboardCategoryProgress({
  habits,
  logs,
}: {
  habits: any[];
  logs: any[];
}) {
  const stats = getCategoryStats(habits, logs);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 border border-border shadow-lg"
    >
      <h3 className="text-xl mb-6">Category Progress</h3>

      <div className="space-y-4 md:flex gap-2">
        {Object.entries(stats).map(([category, data]: any) => {
          const percent =
            data.total === 0
              ? 0
              : Math.round((data.completed / data.total) * 100);

          return (
            <div key={category} className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="capitalize">{category}</span>
                <span>{percent}%</span>
              </div>

              <div className="w-full bg-muted h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
