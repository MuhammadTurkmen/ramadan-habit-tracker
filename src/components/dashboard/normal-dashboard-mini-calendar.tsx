"use client";

import { motion } from "framer-motion";

export function NormalDashboardMiniCalendar({
  groupedByDate,
}: {
  groupedByDate: Record<string, any[]>;
}) {
  const days = Object.entries(groupedByDate).map(([date, logs]: any) => ({
    date,
    completed: logs.every((l: any) => l.completed || l.value > 0),
  }));

  return (
    <motion.div className="bg-card p-6 rounded-2xl border border-border shadow-lg">
      <h3 className="text-xl mb-4">Activity</h3>

      <div className="flex flex-wrap gap-2">
        {days.map((d: any) => (
          <div
            key={d.date}
            className={`w-14 h-14 rounded-lg flex items-center justify-center text-xs border ${
              d.completed ? "bg-primary/20 border-primary" : "border-border"
            }`}
          >
            {new Date(d.date).getDate()}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
