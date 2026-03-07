"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { calculateDailyCompletion, isDayCompleted } from "@/lib/tracker-utils";
import Link from "next/link";

interface CalendarProps {
  ramadanDays: {
    date: string;
    day_number: number;
  }[];
  trackers: {
    date: string;
    fasted: boolean;
    quran_pages: number;
    prayed_fajr: boolean;
    prayed_dhuhr: boolean;
    prayed_asr: boolean;
    prayed_maghrib: boolean;
    prayed_isha: boolean;
    notes: string;
    dhikr: boolean;
  }[];
}

export default function Calendar({ ramadanDays, trackers }: CalendarProps) {
  const { t } = useTranslation();

  const today = new Date().toISOString().split("T")[0];
  const todayData = ramadanDays.find((d) => d.date === today);
  const currentDay = todayData?.day_number ?? 0;

  const trackerMap = new Map(trackers.map((t) => [t.date, t]));
  const calendarData = ramadanDays.map((day) => {
    const tracker = trackerMap.get(day.date);

    const { percentage } = calculateDailyCompletion(tracker);

    return {
      day: day.day_number,
      date: day.date,
      tracker,
      percentage,
      //   completed: isDayCompleted(tracker),
    };
  });

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return "bg-primary border-primary text-white";
    if (percentage >= 70) return "bg-chart-3 border-chart-3 text-white";
    if (percentage >= 50) return "bg-accent border-accent text-white";
    return "bg-muted border-muted";
  };

  const selectedDayData = calendarData.find((d) => d.day === selectedDay);

  useEffect(() => {
    if (selectedDayData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDayData]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl mb-2">{t("calendar.title")}</h1>
        <p className="text-muted-foreground">{t("calendar.subtitle")}</p>
      </motion.div>

      {/* Calendar Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">{t("calendar.ramadan")}</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-secondary transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-7 gap-3 mb-6">
          {calendarData.map((day, index) => (
            <motion.button
              key={day.day}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              onClick={() => setSelectedDay(day.day)}
              className={`aspect-square rounded-xl border-2 p-2 flex flex-col items-center justify-center transition-all hover:scale-105 ${
                day.day === currentDay
                  ? "border-primary bg-primary text-white shadow-lg scale-105"
                  : day.percentage
                    ? `${getStatusColor(day.percentage)}`
                    : "border-border hover:border-primary/50"
              }`}
            >
              <div className="text-xs mb-1 opacity-80">{t("calendar.day")}</div>
              <div className="text-xl md:text-2xl">{day.day}</div>
              {day.percentage > 0 && day.day !== currentDay && (
                <div className="text-xs mt-1 opacity-90">{day.percentage}%</div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary"></div>
            <span className="text-sm text-muted-foreground">
              {t("calendar.today")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary"></div>
            <span className="text-sm text-muted-foreground">90-100%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-chart-3"></div>
            <span className="text-sm text-muted-foreground">70-89%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-accent"></div>
            <span className="text-sm text-muted-foreground">50-69%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted"></div>
            <span className="text-sm text-muted-foreground">
              {t("calendar.incomplete")}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Day Details Modal */}
      <AnimatePresence>
        {selectedDayData && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDay(null)}
              className="m-0 fixed inset-0 bg-black/50 z-50 overflow-y-hidden"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-2xl bg-card rounded-2xl p-6 border border-border shadow-2xl z-50 max-h-[90vh] overflow-y-auto mx-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl">
                    {t("calendar.dayDetails").replace(
                      "{day}",
                      selectedDayData.day.toString(),
                    )}
                  </h3>
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="p-2 hover:bg-secondary rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                      <span className="text-muted-foreground">
                        {t("calendar.overallCompletion")}
                      </span>
                      <span className="text-2xl">
                        {selectedDayData.percentage}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                      <span className="text-muted-foreground">
                        {t("dailyTracker.fasting")}
                      </span>
                      {selectedDayData.tracker?.fasted ? (
                        <CheckCircle className="w-6 h-6 text-primary" />
                      ) : (
                        <X className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                      <span className="text-muted-foreground">
                        {t("calendar.prayersCompleted")}
                      </span>
                      <span className="text-2xl">
                        {
                          [
                            selectedDayData.tracker?.prayed_fajr,
                            selectedDayData.tracker?.prayed_dhuhr,
                            selectedDayData.tracker?.prayed_asr,
                            selectedDayData.tracker?.prayed_maghrib,
                            selectedDayData.tracker?.prayed_isha,
                          ].filter(Boolean).length
                        }
                        /5
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                      <span className="text-muted-foreground">
                        {t("calendar.quranPages")}
                      </span>
                      <span className="text-2xl">
                        {selectedDayData.tracker?.quran_pages ?? 0}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedDayData.tracker?.notes && (
                  <div className="mt-6 p-4 bg-secondary rounded-xl">
                    <p className="text-muted-foreground mb-2">
                      {t("calendar.notes")}
                    </p>
                    <p>{selectedDayData.tracker.notes}</p>
                  </div>
                )}

                {selectedDayData.day === currentDay && (
                  <div className="mt-6">
                    <Link href="/dashboard/daily-tracker">
                      <button
                        onClick={() => {
                          setSelectedDay(null);
                        }}
                        className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all"
                      >
                        {t("calendar.editTodaysHabit")}
                      </button>
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
