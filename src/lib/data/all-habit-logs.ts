import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAllHabitLogs(userId: string) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("user_id", userId);

  return data ?? [];
}
