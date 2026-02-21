import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function CalendarPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("daily_tracker")
    .select("date, fasted, quran_pages")
    .eq("user_id", user!.id)
    .order("date");

  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        Comming soon...
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {data?.map((day) => (
        <div key={day.date} className="p-4 border rounded-lg">
          <div>{day.date}</div>
          <div>Fasted: {day.fasted ? "✅" : "❌"}</div>
        </div>
      ))}
    </div>
  );
}
