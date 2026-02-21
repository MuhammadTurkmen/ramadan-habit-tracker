import { DashboardMotivationQuickAction } from "@/components/dashboard/dashboar-motivation-quick-action";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardMiniCalendar } from "@/components/dashboard/dashboard-mini-calendar";
import { DashboardQuickStarter } from "@/components/dashboard/dashboard-quick-starter";
import { DashboardTodayCard } from "@/components/dashboard/dashboard-today-card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLocalDateString, getRamadanDay } from "@/lib/date";
import { isDayCompleted } from "@/lib/tracker-utils";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const today = getLocalDateString();
  const ramadanStart = process.env.RAMADAN_START_DATE!;
  const ramadanDayNumber = getRamadanDay(today, ramadanStart);

  // Today tracker
  const { data: tracker } = await supabase
    .from("daily_tracker")
    .select("*")
    .eq("user_id", user!.id)
    .eq("date", today)
    .maybeSingle();

  // All trackers for stats and calendar
  const { data: trackers } = await supabase
    .from("daily_tracker")
    .select("*")
    .eq("user_id", user!.id)
    .order("date", { ascending: true });

  const completedDays = trackers?.filter(isDayCompleted).length ?? 0;

  let streak = 0;

  for (let i = trackers!.length - 1; i >= 0; i--) {
    const t = trackers![i];

    // Ignore future days
    if (new Date(t.date) > new Date(today)) continue;

    // Ignore today if not completed
    if (t.date === today && !isDayCompleted(t)) {
      continue;
    }

    if (isDayCompleted(t)) {
      streak++;
    } else {
      break;
    }
  }

  const totalPrayers = trackers!.length * 5;

  const completedPrayers = trackers!.reduce((sum, t) => {
    return (
      sum +
      Number(t.prayed_fajr) +
      Number(t.prayed_dhuhr) +
      Number(t.prayed_asr) +
      Number(t.prayed_maghrib) +
      Number(t.prayed_isha)
    );
  }, 0);

  const prayerConsistency =
    totalPrayers === 0
      ? 0
      : Math.round((completedPrayers / totalPrayers) * 100);

  const calendarDays = trackers!
    .map((t) => ({
      day: getRamadanDay(t.date, ramadanStart),
      date: t.date,
      completed: isDayCompleted(t),
    }))
    .filter(
      (d): d is { day: number; date: string; completed: boolean } =>
        d.day !== null,
    );

  const { data: motivation } = await supabase
    .from("daily_motivations")
    .select("text")
    .eq("date", today)
    .maybeSingle();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <DashboardHeader />
      <DashboardTodayCard ramadanDay={ramadanDayNumber} tracker={tracker} />
      <DashboardQuickStarter
        completedDays={completedDays ?? 0}
        currentStreak={streak}
        prayerConsistency={prayerConsistency}
      />
      <DashboardMiniCalendar
        calendarDays={calendarDays}
        todayRamadanDay={ramadanDayNumber}
      />
      <DashboardMotivationQuickAction message={motivation?.text} />
    </div>
  );
}
