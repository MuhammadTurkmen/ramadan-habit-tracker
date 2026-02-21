"use client";
import { CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function DashboardMiniCalendar({
  calendarDays,
  todayRamadanDay,
}: {
  calendarDays: {
    day: number;
    completed: boolean;
    date: string;
  }[];
  todayRamadanDay: number | null;
}) {
  const currentDay = todayRamadanDay;

  if (calendarDays.length === 0) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border">
        <p className="text-muted-foreground text-center">No activity yet 🌙</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl">Quick Overview</h3>
          <Link href="/dashboard/calendar">
            <button className="text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex flex-wrap gap-2">
            {calendarDays.map((day) => (
              <Link key={day.day} href={`/dashboard/calendar`}>
                <button
                  className={`cursor-pointer flex flex-col items-center justify-center w-16 h-20 rounded-lg border-2 transition-all ${
                    day.day === currentDay
                      ? "border-primary bg-primary text-white shadow-lg"
                      : day.completed
                        ? "border-primary/30 bg-primary/10 hover:border-primary/50"
                        : "border-border hover:border-border-foreground/50"
                  }`}
                >
                  <div className="text-xs mb-1">Day</div>
                  <div className="text-xl">{day.day}</div>
                  {day.completed && day.day !== currentDay && (
                    <CheckCircle className="w-4 h-4 text-primary mt-1" />
                  )}
                </button>
              </Link>
            ))}
          </div>
          {/* <ScrollBar orientation="horizontal" /> */}
        </div>
      </motion.div>
    </div>
  );
}
