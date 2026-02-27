import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  BarChart3,
  Settings,
} from "lucide-react";

export const dashboardNav = [
  {
    title: "dashboard.nav.dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "dashboard.nav.dailyTracker",
    href: "/dashboard/daily-tracker",
    icon: CheckSquare,
  },
  {
    title: "dashboard.nav.calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "dashboard.nav.insights",
    href: "/dashboard/insights",
    icon: BarChart3,
  },
  {
    title: "dashboard.nav.settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
