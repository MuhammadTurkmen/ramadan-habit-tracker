import { createSupabaseServerClient } from "@/lib/supabase/server";
import MobileHeader from "./mobile-header";

export default async function MobileHeaderWrapper() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <MobileHeader user={user} />;
}
