"use client";

import { motion } from "framer-motion";

export function NormalDashboardNotes({ todayLogs }: any) {
  const note =
    todayLogs.find((l: any) => l.notes)?.notes || "No notes for today";

  return (
    <motion.div className="bg-card p-6 rounded-xl border border-border">
      <h3 className="text-lg mb-2">Today's Note</h3>
      <p className="text-muted-foreground">{note}</p>
    </motion.div>
  );
}
