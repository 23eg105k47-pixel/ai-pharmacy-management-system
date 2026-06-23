import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getDashboardSnapshot } from "@/lib/db/queries";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const snapshot = await getDashboardSnapshot(user.id);

  return (
    <div className="dashboard-shell">
      <DashboardSidebar email={user.email ?? ""} profile={snapshot.profile} />
      <main className="content">{children}</main>
    </div>
  );
}
