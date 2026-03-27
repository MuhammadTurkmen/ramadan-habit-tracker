"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Save } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Habit = {
  id: string;
  name: string;
  category: string;
  type: "boolean" | "number";
};

type HabitLog = {
  habit_id: string;
  completed: boolean;
  value: number;
};

type HabitState = Habit & {
  completed: boolean;
  value: number;
};

export default function NormalTrackerForm({
  habits,
  logs,
  date,
  userId,
  notes: initialNotes,
}: {
  habits: Habit[];
  logs: HabitLog[];
  date: string;
  userId: string;
  notes: string;
}) {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [notes, setNotes] = useState(initialNotes ?? "");

  const [state, setState] = useState<HabitState[]>(() => {
    return habits.map((habit) => {
      const log = logs.find((l) => l.habit_id === habit.id);

      return {
        ...habit,
        completed: log?.completed ?? false,
        value: log?.value ?? 0,
      };
    });
  });

  // 🔹 Toggle boolean habit
  const toggleHabit = (id: string) => {
    setState((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)),
    );
  };

  // 🔹 Update number habit
  const updateValue = (id: string, delta: number) => {
    setState((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, value: Math.max(0, h.value + delta) } : h,
      ),
    );
  };

  const getHabitTime = (habitName: string) => {
    const normalizedName = habitName.toLowerCase();

    if (normalizedName.includes("fajr")) return "5:30 AM";
    if (normalizedName.includes("dhuhr")) return "12:45 PM";
    if (normalizedName.includes("asr")) return "3:30 PM";
    if (normalizedName.includes("maghrib")) return "6:15 PM";
    if (normalizedName.includes("isha")) return "8:00 PM";

    return null;
  };

  const getCounterInfo = (habitName: string) => {
    const name = habitName.toLowerCase();

    if (name.includes("quran")) return "pages read";
    if (name.includes("deep work")) return "hours";
    if (name.includes("reading") && name.includes("minute")) return "minutes";
    if (name.includes("reading") && name.includes("page")) return "pages";
    if (name.includes("reading")) return "minutes / pages";

    return "count";
  };

  // 🔥 UPSERT (VERY IMPORTANT)
  async function handleSave() {
    try {
      setIsSaving(true);

      const payload = state.map((h, index) => ({
        user_id: userId,
        habit_id: h.id,
        date,
        completed: h.type === "boolean" ? h.completed : h.value > 0,
        value: h.type === "number" ? h.value : 0,
        notes: index === 0 ? notes : null,
      }));

      const { error } = await supabase.from("habit_logs").upsert(payload, {
        onConflict: "user_id,habit_id,date",
      });

      if (error) throw error;

      toast.success("Progress saved 🚀");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  }

  const grouped = state.reduce<Record<string, HabitState[]>>((acc, habit) => {
    if (!acc[habit.category]) acc[habit.category] = [];
    acc[habit.category].push(habit);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="bg-linear-to-r from-primary to-primary/80 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl">Daily Habits</h1>
        <p className="text-white/80 mt-1">{date}</p>
      </div>

      {/* HABITS */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-lg">
        {Object.entries(grouped).map(([category, habits]) => (
          <div key={category}>
            <h2 className="text-lg mb-4 capitalize text-muted-foreground">
              {category}
            </h2>

            <div className="space-y-3">
              {habits.map((habit, index) => {
                const habitTime = getHabitTime(habit.name);

                return (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {habit.type === "boolean" ? (
                      <button
                        onClick={() => toggleHabit(habit.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                          habit.completed
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            habit.completed
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {habit.completed && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium">{habit.name}</p>
                          {habitTime && (
                            <p className="text-sm text-muted-foreground">
                              {habitTime}
                            </p>
                          )}
                        </div>
                      </button>
                    ) : (
                      <div className="p-4 border rounded-xl flex md:flex-row flex-col items-center justify-between">
                        <div>
                          <p className="font-medium">{habit.name}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateValue(habit.id, -1)}
                            className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                          >
                            -
                          </button>

                          <div className="w-20 text-center">
                            <div>{habit.value}</div>
                            <div className="text-[10px] leading-tight text-muted-foreground">
                              {getCounterInfo(habit.name)}
                            </div>
                          </div>

                          <button
                            onClick={() => updateValue(habit.id, 1)}
                            className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <h3 className="text-lg mb-4">Personal Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-32 p-4 bg-input-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Write your reflections for today..."
          />
        </div>
      </div>

      {/* SAVE BUTTON */}
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
    </div>
  );
}
