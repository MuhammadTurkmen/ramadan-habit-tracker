// import TrackerForm from "@/components/daily-tracker/tracker-form";
// import { getTrackers } from "@/lib/data/trackers";
// import { getLocalDateString, getRamadanDay } from "@/lib/date";
// import { createSupabaseServerClient } from "@/lib/supabase/server";

// export default async function DailyTrackerPage() {
//   const supabase = await createSupabaseServerClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   const today = getLocalDateString();
//   const ramadanStart = process.env.RAMADAN_START_DATE!;
//   const ramadanDay = getRamadanDay(today, ramadanStart);

//   const trackers = await getTrackers(user!.id);
//   const tracker = trackers?.find((t) => t.date === today);

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">
//       <TrackerForm tracker={tracker} ramadanDay={ramadanDay} />
//     </div>
//   );
// }

import { getMode } from "@/lib/mode";
import RamadanTrackerPage from "@/components/daily-tracker/ramadan-tracker-page";
import NormalTrackerPage from "@/components/daily-tracker/normal-tracker-page";

export default async function DailyTrackerPage() {
  const mode = getMode();

  if (mode === "ramadan") {
    return <RamadanTrackerPage />;
  }

  return <NormalTrackerPage />;
}
