import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const getMotivation = cache(async (date: string) => {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("daily_motivations")
    .select("*")
    .eq("date", date)
    .maybeSingle();

  return data;
});
