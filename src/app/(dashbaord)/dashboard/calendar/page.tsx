import Calendar from "@/components/calendar/calendar";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function CalendarPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: dailyTrackerData } = await supabase
    .from("daily_tracker")
    .select("*")
    .eq("user_id", user!.id)
    .order("date");

  const { data: ramadanDays } = await supabase.from("ramadan_days").select("*");

  return (
    <div>
      <Calendar
        ramadanDays={ramadanDays || []}
        trackers={dailyTrackerData || []}
      />
    </div>
  );
}
