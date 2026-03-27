"use client";

import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export function NormalDashboardTodayCard({ todayLogs }: { todayLogs: any[] }) {
  const total = todayLogs.length;

  const completed = todayLogs.filter((l) => l.completed || l.value > 0).length;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  let status = "Not Started";
  let StatusIcon = AlertCircle;

  if (percentage >= 80) {
    status = "Excellent";
    StatusIcon = CheckCircle;
  } else if (percentage >= 40) {
    status = "Good";
    StatusIcon = AlertCircle;
  } else if (percentage > 0) {
    status = "Needs Improvement";
    StatusIcon = XCircle;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-linear-to-br from-primary to-primary/80 rounded-2xl p-8 text-white shadow-2xl"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-center md:text-start">
          <p className="text-white/90 mb-2">Today's Progress</p>
          <h2 className="text-4xl md:text-5xl mb-4">Today Habits</h2>
          <p className="text-white/90 mb-4">
            {completed} / {total} habits completed
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <StatusIcon className="w-5 h-5" />
            <span>Status: {status}</span>
          </div>
        </div>

        <div className="relative">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="white"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl">{percentage}%</div>
              <div className="text-sm text-white/80">Complete</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
