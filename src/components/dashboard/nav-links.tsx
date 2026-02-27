"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className="flex-1 space-y-2">
      {dashboardNav.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              active
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {t(item.title)}
          </Link>
        );
      })}
    </nav>
  );
}
