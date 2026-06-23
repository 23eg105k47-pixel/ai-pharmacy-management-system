"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { toErrorMessage } from "@/lib/errors";
import {
  bookingSchema,
  customerSchema,
  initialFormState,
  invoiceSchema,
  type FormState
} from "@/lib/validators";

async function requireCurrentUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function createCustomerAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const { supabase, user } = await requireCurrentUser();
    const values = customerSchema.parse({
      appId: formData.get("appId"),
      email: formData.get("email"),
      fullName: formData.get("fullName"),
      notes: formData.get("notes"),
      phone: formData.get("phone")
    });

    const { error } = await supabase.from("customers").insert({
      app_id: values.appId,
      email: values.email || null,
      full_name: values.fullName,
      notes: values.notes || null,
      phone: values.phone || null,
      user_id: user.id
    });

    if (error) {
      return { error: error.message, success: null };
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/customers");

    return { error: null, success: "Customer added." };
  } catch (error) {
    return { error: toErrorMessage(error), success: null };
  }
}

export async function createBookingAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const { supabase, user } = await requireCurrentUser();
    const values = bookingSchema.parse({
      appId: formData.get("appId"),
      customerId: formData.get("customerId"),
      endsAt: new Date(String(formData.get("endsAt"))).toISOString(),
      notes: formData.get("notes"),
      priceCents: formData.get("priceCents"),
      serviceName: formData.get("serviceName"),
      startsAt: new Date(String(formData.get("startsAt"))).toISOString(),
      status: formData.get("status"),
      stylistName: formData.get("stylistName")
    });

    const { error } = await supabase.from("bookings").insert({
      app_id: values.appId,
      customer_id: values.customerId,
      ends_at: values.endsAt,
      notes: values.notes || null,
      price_cents: values.priceCents,
      service_name: values.serviceName,
      starts_at: values.startsAt,
      status: values.status,
      stylist_name: values.stylistName || null,
      user_id: user.id
    });

    if (error) {
      return { error: error.message, success: null };
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/bookings");

    return { error: null, success: "Booking created." };
  } catch (error) {
    return { error: toErrorMessage(error), success: null };
  }
}

export async function createInvoiceAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const { supabase, user } = await requireCurrentUser();
    const values = invoiceSchema.parse({
      amountCents: formData.get("amountCents"),
      appId: formData.get("appId"),
      bookingId: formData.get("bookingId"),
      currency: formData.get("currency"),
      customerId: formData.get("customerId"),
      dueDate: formData.get("dueDate"),
      invoiceNumber: formData.get("invoiceNumber"),
      status: formData.get("status")
    });

    const { error } = await supabase.from("invoices").insert({
      amount_cents: values.amountCents,
      app_id: values.appId,
      booking_id: values.bookingId || null,
      currency: values.currency.toUpperCase(),
      customer_id: values.customerId || null,
      due_date: values.dueDate || null,
      invoice_number: values.invoiceNumber,
      status: values.status,
      user_id: user.id
    });

    if (error) {
      return { error: error.message, success: null };
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/billing");

    return { error: null, success: "Invoice created." };
  } catch (error) {
    return { error: toErrorMessage(error), success: null };
  }
}

export const dashboardFormState = initialFormState;
