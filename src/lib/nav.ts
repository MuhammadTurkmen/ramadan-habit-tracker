import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  BarChart3,
  Settings,
} from "lucide-react";

export const dashboardNav = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Daily Tracker",
    href: "/dashboard/daily-tracker",
    icon: CheckSquare,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Insights",
    href: "/dashboard/insights",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
