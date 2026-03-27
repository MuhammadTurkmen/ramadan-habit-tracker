import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const getHabits = cache(async (userId: string) => {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId);

  return data ?? [];
});
