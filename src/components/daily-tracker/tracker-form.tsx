"use client";

import { supabase } from "@/lib/supabase/client";
import { Calendar, CheckCircle, Circle, Save } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function TrackerForm({
  tracker,
  ramadanDay,
}: {
  tracker: any;
  ramadanDay: number | null;
}) {
  const [isFasting, setIsFasting] = useState(tracker.fasted);
  const [dhikr, setDhikr] = useState(tracker.dhikr);
  const [notes, setNotes] = useState(tracker.notes ?? "");
  const [quranPages, setQuranPages] = useState(tracker.quran_pages ?? 0);
  const [isSaving, setIsSaving] = useState(false);

  const [prayers, setPrayers] = useState({
    fajr: tracker.prayed_fajr,
    dhuhr: tracker.prayed_dhuhr,
    asr: tracker.prayed_asr,
    maghrib: tracker.prayed_maghrib,
    isha: tracker.prayed_isha,
  });

  const completedPrayers = Object.values(prayers).filter(Boolean).length;

  const prayerPercentage = tracker?.prayer_percentage ?? 0;

  async function handleSave() {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from("daily_tracker")
        .update({
          fasted: isFasting,
          dhikr,
          notes,
          quran_pages: quranPages,
          prayed_fajr: prayers.fajr,
          prayed_dhuhr: prayers.dhuhr,
          prayed_asr: prayers.asr,
          prayed_maghrib: prayers.maghrib,
          prayed_isha: prayers.isha,
        })
        .eq("id", tracker.id);

      if (error) {
        throw error;
      }
      toast.success("Progress saved successfully 🤍");
    } catch (error) {
      toast.error("Failed to save progress. Please try again later. 😔");
    } finally {
      setIsSaving(false);
    }
  }

  const togglePrayer = (key: string) => {
    setPrayers((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const prayerList = [
    { key: "fajr", name: "Fajr", time: "5:30 AM" },
    { key: "dhuhr", name: "Dhuhr", time: "12:45 PM" },
    { key: "asr", name: "Asr", time: "3:30 PM" },
    { key: "maghrib", name: "Maghrib", time: "6:15 PM" },
    { key: "isha", name: "Isha", time: "8:00 PM" },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5" />
          <span className="text-white/90">{tracker.date}</span>
        </div>
        <h1 className="text-3xl md:text-4xl mb-2">
          Day {ramadanDay ?? "-"} of Ramadan
        </h1>
        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm">
          <span>
            Status:{" "}
            {prayerPercentage >= 80
              ? "Excellent"
              : prayerPercentage >= 60
                ? "Good"
                : "Keep Going"}
          </span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg space-y-8"
      >
        {/* Fasting Toggle */}
        <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${isFasting ? "bg-primary" : "bg-muted"}`}
            >
              {isFasting ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="text-lg">Fasting</h3>
              <p className="text-sm text-muted-foreground">
                Did you fast today?
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFasting(!isFasting)}
            className={`cursor-pointer relative w-15 h-9 rounded-full border-3 transition-all ${isFasting ? "bg-primary" : "bg-muted"} transition-all ${
              isFasting
                ? "border-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all ${isFasting ? "left-7" : "left-1"}`}
            />
          </button>
        </div>

        {/* Prayer Checklist */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">Prayer Checklist</h3>
            <span className="text-sm text-muted-foreground">
              {completedPrayers}/5 completed
            </span>
          </div>
          <div className="space-y-3">
            {prayerList.map((prayer, index) => (
              <motion.button
                key={prayer.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => togglePrayer(prayer.key)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  prayers[prayer.key as keyof typeof prayers]
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    prayers[prayer.key as keyof typeof prayers]
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {prayers[prayer.key as keyof typeof prayers] && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{prayer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {prayer.time}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quran Input */}
        <div>
          <h3 className="text-lg mb-4">Quran Reading</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuranPages(Math.max(0, quranPages - 1))}
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-white transition-all flex items-center justify-center"
            >
              -
            </button>
            <div className="flex-1 text-center">
              <div className="text-3xl mb-1">{quranPages}</div>
              <div className="text-sm text-muted-foreground">pages read</div>
            </div>
            <button
              onClick={() => setQuranPages(quranPages + 1)}
              className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-white transition-all flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Dhikr Toggle */}
        <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${dhikr ? "bg-primary" : "bg-muted"}`}
            >
              {dhikr ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="text-lg">Dhikr</h3>
              <p className="text-sm text-muted-foreground">
                Morning/Evening remembrance
              </p>
            </div>
          </div>
          <button
            onClick={() => setDhikr(!dhikr)}
            className={`cursor-pointer relative transition-all border-2 ${
              dhikr ? "border-primary" : "hover:border-primary/50"
            } w-15 h-9 rounded-full transition-all ${dhikr ? "bg-primary" : "bg-muted"}`}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all ${dhikr ? "left-7" : "left-1"}`}
            />
          </button>
        </div>

        {/* Notes */}
        <div>
          <h3 className="text-lg mb-4">Personal Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-32 p-4 bg-input-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Write your thoughts, reflections, or goals for today..."
          />
        </div>
      </motion.div>
      {/* Save Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={handleSave}
        disabled={isSaving}
        className={`${isSaving ? "bg-primary/50 cursor-not-allowed" : "cursor-pointer"} w-full bg-primary text-primary-foreground py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
      >
        <Save className="w-5 h-5" />
        {isSaving ? "Saving..." : "Save Progress"}
      </motion.button>
    </>
  );
}
