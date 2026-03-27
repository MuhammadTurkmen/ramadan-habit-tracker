import { getAllHabitLogs } from "@/lib/data/all-habit-logs";
import { getHabits } from "@/lib/data/habits";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DashboardHeader } from "./dashboard-header";
import { NormalDashboardTodayCard } from "./normal-dashboard-today-card";
import { NormalDashboardQuickStats } from "./normal-dashboard-quick-stats";
import { NormalDashboardCategoryProgress } from "./normal-dashboard-category-progress";
import { NormalDashboardBestHabits } from "./normal-dashboard-best-habits";
import { NormalDashboardMiniCalendar } from "./normal-dashboard-mini-calendar";
import { NormalDashboardNotes } from "./normal-dashboard-notes";

export default async function NormalDashboard() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [habits, logs] = await Promise.all([
    getHabits(user!.id),
    getAllHabitLogs(user!.id),
  ]);

  // group logs by date
  const groupedByDate = logs.reduce((acc: any, log) => {
    if (!acc[log.date]) acc[log.date] = [];
    acc[log.date].push(log);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <DashboardHeader />
      <NormalDashboardTodayCard
        todayLogs={groupedByDate[new Date().toISOString().split("T")[0]] || []}
      />

      <NormalDashboardQuickStats logs={logs} />

      <NormalDashboardCategoryProgress habits={habits} logs={logs} />

      <NormalDashboardBestHabits habits={habits} logs={logs} />

      {/* <NormalDashboardMiniCalendar groupedByDate={groupedByDate} /> */}

      <NormalDashboardNotes
        todayLogs={groupedByDate[new Date().toISOString().split("T")[0]] || []}
      />
    </div>
  );
}
