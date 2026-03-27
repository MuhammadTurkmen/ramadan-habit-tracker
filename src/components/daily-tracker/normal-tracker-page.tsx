import { getHabits } from "@/lib/data/habits";
import { getHabitLogs } from "@/lib/data/habit-logs";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLocalDateString } from "@/lib/date";
import NormalTrackerForm from "./normal-tracker-form";
// import NormalTrackerForm from "./normal-tracker-form";

export default async function NormalTrackerPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const today = getLocalDateString();

  const [habits, logs] = await Promise.all([
    getHabits(user!.id),
    getHabitLogs(user!.id, today),
  ]);

  const notes = logs.find((l) => l.notes)?.notes ?? "";

  return (
    <NormalTrackerForm
      habits={habits}
      logs={logs}
      date={today}
      userId={user!.id}
      notes={notes}
    />
  );
}
