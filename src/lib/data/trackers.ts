import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const getTrackers = cache(async (userId: string) => {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("daily_tracker")
    .select("*")
    .eq("user_id", userId)
    .order("date");

  return data ?? [];
});
