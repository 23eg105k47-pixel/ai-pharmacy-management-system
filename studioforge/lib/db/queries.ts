import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AppProject, Booking, Customer, Invoice, Profile } from "@/types/database";

export async function getDashboardSnapshot(userId: string) {
  const supabase = await createServerSupabaseClient();

  const [
    { data: profile },
    { data: projectRows },
    { data: customers },
    { data: bookings },
    { data: invoices },
    { count: customerCount },
    { count: bookingCount },
    { count: invoiceCount },
    { data: invoiceAmounts }
  ] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
      supabase
        .from("app_projects")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1),
      supabase
        .from("customers")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("bookings")
        .select("*")
        .eq("user_id", userId)
        .order("starts_at", { ascending: true })
        .limit(5),
      supabase
        .from("invoices")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5),
      supabase.from("customers").select("*", { count: "exact", head: true }).eq("user_id", userId),
      supabase.from("bookings").select("*", { count: "exact", head: true }).eq("user_id", userId),
      supabase.from("invoices").select("*", { count: "exact", head: true }).eq("user_id", userId),
      supabase.from("invoices").select("amount_cents").eq("user_id", userId)
    ]);

  const revenueCents = ((invoiceAmounts ?? []) as Array<{ amount_cents: number }>).reduce(
    (sum, invoice) => sum + invoice.amount_cents,
    0
  );

  return {
    bookings: (bookings ?? []) as Booking[],
    customers: (customers ?? []) as Customer[],
    invoices: (invoices ?? []) as Invoice[],
    latestProject: ((projectRows ?? [])[0] ?? null) as AppProject | null,
    profile: (profile ?? null) as Profile | null,
    stats: {
      bookingCount: bookingCount ?? 0,
      customerCount: customerCount ?? 0,
      invoiceCount: invoiceCount ?? 0,
      revenueCents
    }
  };
}

export async function getCustomers(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("customers")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data ?? []) as Customer[];
}

export async function getBookings(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .order("starts_at", { ascending: true });

  return (data ?? []) as Booking[];
}

export async function getInvoices(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data ?? []) as Invoice[];
}

export async function getLatestProject(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("app_projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);

  return ((data ?? [])[0] ?? null) as AppProject | null;
}
