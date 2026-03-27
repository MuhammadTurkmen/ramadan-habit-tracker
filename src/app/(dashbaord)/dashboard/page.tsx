// import { Suspense } from "react";
// import { DashboardMotivationQuickAction } from "@/components/dashboard/dashboar-motivation-quick-action";
// import { DashboardHeader } from "@/components/dashboard/dashboard-header";
// import { DashboardMiniCalendar } from "@/components/dashboard/dashboard-mini-calendar";
// import { DashboardQuickStarter } from "@/components/dashboard/dashboard-quick-starter";
// import { DashboardTodayCard } from "@/components/dashboard/dashboard-today-card";
// import {
//   DashboardMiniCalendarSkeleton,
//   DashboardMotivationSkeleton,
//   DashboardQuickStarterSkeleton,
//   DashboardTodayCardSkeleton,
// } from "@/components/dashboard-loading";
// import { createSupabaseServerClient } from "@/lib/supabase/server";
// import { getLocalDateString, getRamadanDay } from "@/lib/date";
// import { isDayCompleted } from "@/lib/tracker-utils";
// import { getMotivation } from "@/lib/data/motivation";
// import { getTrackers } from "@/lib/data/trackers";

// export default async function DashboardPage() {
//   const supabase = await createSupabaseServerClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   const today = getLocalDateString();
//   const ramadanStart = process.env.RAMADAN_START_DATE!;
//   const ramadanDayNumber = getRamadanDay(today, ramadanStart);

//   const [trackerResult, trackersResult, motivationResult] = await Promise.all([
//     supabase
//       .from("daily_tracker")
//       .select("*")
//       .eq("user_id", user!.id)
//       .eq("date", today)
//       .maybeSingle(),

//     // supabase
//     //   .from("daily_tracker")
//     //   .select("*")
//     //   .eq("user_id", user!.id)
//     //   .order("date"),

//     getTrackers(user!.id),
//     getMotivation(today),
//   ]);

//   const tracker = trackerResult.data;
//   const trackers = trackersResult ?? [];
//   const motivation = motivationResult.data;

//   const completedDays = trackers?.filter(isDayCompleted).length ?? 0;

//   let streak = 0;

//   for (let i = trackers!.length - 1; i >= 0; i--) {
//     const t = trackers![i];

//     // Ignore future days
//     if (new Date(t.date) > new Date(today)) continue;

//     // Ignore today if not completed
//     if (t.date === today && !isDayCompleted(t)) {
//       continue;
//     }

//     if (isDayCompleted(t)) {
//       streak++;
//     } else {
//       break;
//     }
//   }

//   const totalPrayers = trackers!.length * 5;

//   const completedPrayers = trackers!.reduce((sum, t) => {
//     return (
//       sum +
//       Number(t.prayed_fajr) +
//       Number(t.prayed_dhuhr) +
//       Number(t.prayed_asr) +
//       Number(t.prayed_maghrib) +
//       Number(t.prayed_isha)
//     );
//   }, 0);

//   const prayerConsistency =
//     totalPrayers === 0
//       ? 0
//       : Math.round((completedPrayers / totalPrayers) * 100);

//   const calendarDays = trackers!
//     .map((t) => ({
//       day: getRamadanDay(t.date, ramadanStart),
//       date: t.date,
//       completed: isDayCompleted(t),
//     }))
//     .filter(
//       (d): d is { day: number; date: string; completed: boolean } =>
//         d.day !== null,
//     );

//   return (
//     <div className="max-w-7xl mx-auto space-y-6">
//       <DashboardHeader />
//       <Suspense fallback={<DashboardTodayCardSkeleton />}>
//         <DashboardTodayCard ramadanDay={ramadanDayNumber} tracker={tracker} />
//       </Suspense>
//       <Suspense fallback={<DashboardQuickStarterSkeleton />}>
//         <DashboardQuickStarter
//           completedDays={completedDays ?? 0}
//           currentStreak={streak}
//           prayerConsistency={prayerConsistency}
//         />
//       </Suspense>
//       <Suspense fallback={<DashboardMiniCalendarSkeleton />}>
//         <DashboardMiniCalendar
//           calendarDays={calendarDays}
//           todayRamadanDay={ramadanDayNumber}
//         />
//       </Suspense>
//       <Suspense fallback={<DashboardMotivationSkeleton />}>
//         <DashboardMotivationQuickAction message={motivation?.text} />
//       </Suspense>
//     </div>
//   );
// }

import { getMode } from "@/lib/mode";
import RamadanDashboard from "@/components/dashboard/ramadan-dashboard";
import NormalDashboard from "@/components/dashboard/normal-dashboard";

export default async function DashboardPage() {
  const mode = getMode();

  if (mode === "ramadan") {
    return <RamadanDashboard />;
  }

  return <NormalDashboard />;
}
