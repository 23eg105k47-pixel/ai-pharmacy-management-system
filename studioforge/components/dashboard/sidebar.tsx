"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/(dashboard)/dashboard/actions";
import type { Profile } from "@/types/database";

export function DashboardSidebar({
  email,
  profile
}: {
  email: string;
  profile: Profile | null;
}) {
  const pathname = usePathname();

  function getLinkClass(href: string) {
    return pathname === href ? "nav-link active" : "nav-link";
  }

  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <div className="brand-mark">SF</div>
        <div>
          <div className="brand-name">StudioForge</div>
          <div className="muted">AI salon SaaS builder</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link className={getLinkClass("/dashboard")} href="/dashboard">
          Overview
        </Link>
        <Link className={getLinkClass("/dashboard/customers")} href="/dashboard/customers">
          Customers
        </Link>
        <Link className={getLinkClass("/dashboard/bookings")} href="/dashboard/bookings">
          Bookings
        </Link>
        <Link className={getLinkClass("/dashboard/billing")} href="/dashboard/billing">
          Billing
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="profile-name">{profile?.full_name || email}</div>
        <div className="profile-company">{profile?.company_name || "Independent workspace"}</div>
        <form action={signOutAction} style={{ marginTop: 16 }}>
          <button className="button-secondary" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
