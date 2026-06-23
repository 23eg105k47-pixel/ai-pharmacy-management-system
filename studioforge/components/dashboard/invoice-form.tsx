"use client";

import { useActionState } from "react";
import { createInvoiceAction, dashboardFormState } from "@/app/(dashboard)/dashboard/actions";
import { FormSubmitButton } from "@/components/form-submit-button";
import type { Booking, Customer } from "@/types/database";

export function InvoiceForm({
  appId,
  bookings,
  customers
}: {
  appId: string;
  bookings: Booking[];
  customers: Customer[];
}) {
  const [state, formAction] = useActionState(createInvoiceAction, dashboardFormState);

  return (
    <form action={formAction} className="form-grid">
      <input name="appId" type="hidden" value={appId} />
      <div className="inline-grid-3">
        <label className="field">
          <span className="field-label">Invoice number</span>
          <input name="invoiceNumber" placeholder="INV-2026-001" required type="text" />
        </label>
        <label className="field">
          <span className="field-label">Amount (cents)</span>
          <input min="0" name="amountCents" placeholder="15000" required type="number" />
        </label>
        <label className="field">
          <span className="field-label">Currency</span>
          <input defaultValue="USD" maxLength={3} name="currency" required type="text" />
        </label>
      </div>

      <div className="inline-grid-3">
        <label className="field">
          <span className="field-label">Customer</span>
          <select defaultValue="" name="customerId">
            <option value="">No customer link</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.full_name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="field-label">Booking</span>
          <select defaultValue="" name="bookingId">
            <option value="">No booking link</option>
            {bookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                {booking.service_name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="field-label">Status</span>
          <select defaultValue="draft" name="status">
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </label>
      </div>

      <div className="inline-grid-2">
        <label className="field">
          <span className="field-label">Due date</span>
          <input name="dueDate" type="date" />
        </label>
      </div>

      <div className="button-row">
        <FormSubmitButton label="Create invoice" pendingLabel="Saving..." />
      </div>
      {state.error ? <div className="status-error">{state.error}</div> : null}
      {state.success ? <div className="status-success">{state.success}</div> : null}
    </form>
  );
}
