import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getHabitLogs(userId: string, date: string) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date);

  return data ?? [];
}
