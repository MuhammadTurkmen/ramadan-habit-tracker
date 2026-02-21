import TrackerForm from "@/components/daily-tracker/tracker-form";
import { getLocalDateString, getRamadanDay } from "@/lib/date";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DailyTrackerPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const today = getLocalDateString();
  const ramadanStart = process.env.RAMADAN_START_DATE!;
  const ramadanDay = getRamadanDay(today, ramadanStart);

  const { data: existingTracker } = await supabase
    .from("daily_tracker")
    .select("*")
    .eq("user_id", user!.id)
    .eq("date", today)
    .maybeSingle();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <TrackerForm tracker={existingTracker} ramadanDay={ramadanDay} />
    </div>
  );
}
