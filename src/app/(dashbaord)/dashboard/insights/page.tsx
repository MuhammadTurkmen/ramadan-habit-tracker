import Insights from "@/components/insights/insights";
import { buildInsights } from "@/lib/analytics";
import { getTrackers } from "@/lib/data/trackers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function InsightsPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const trackers = await getTrackers(user!.id);

  const analytics = buildInsights(trackers ?? []);
  return <Insights analytics={analytics} />;
}
