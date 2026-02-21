import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import MobileHeaderWrapper from "@/components/dashboard/mobile-header-wrapper";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <MobileHeaderWrapper />
        {/* <MobileHeader /> */}

        {/* Main Content */}
        <main className="flex-1 p-4 pt-[89px] md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
