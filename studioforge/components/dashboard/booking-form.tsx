"use client";

import { useActionState } from "react";
import { createBookingAction, dashboardFormState } from "@/app/(dashboard)/dashboard/actions";
import { FormSubmitButton } from "@/components/form-submit-button";
import type { Customer } from "@/types/database";

export function BookingForm({
  appId,
  customers
}: {
  appId: string;
  customers: Customer[];
}) {
  const [state, formAction] = useActionState(createBookingAction, dashboardFormState);

  return (
    <form action={formAction} className="form-grid">
      <input name="appId" type="hidden" value={appId} />
      <div className="inline-grid-3">
        <label className="field">
          <span className="field-label">Customer</span>
          <select defaultValue="" name="customerId" required>
            <option disabled value="">
              Select customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.full_name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="field-label">Service</span>
          <input name="serviceName" placeholder="Balayage refresh" required type="text" />
        </label>
        <label className="field">
          <span className="field-label">Stylist</span>
          <input name="stylistName" placeholder="Casey" type="text" />
        </label>
      </div>

      <div className="inline-grid-3">
        <label className="field">
          <span className="field-label">Start</span>
          <input name="startsAt" required type="datetime-local" />
        </label>
        <label className="field">
          <span className="field-label">End</span>
          <input name="endsAt" required type="datetime-local" />
        </label>
        <label className="field">
          <span className="field-label">Price (cents)</span>
          <input min="0" name="priceCents" placeholder="12000" required type="number" />
        </label>
      </div>

      <div className="inline-grid-2">
        <label className="field">
          <span className="field-label">Status</span>
          <select defaultValue="confirmed" name="status">
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <label className="field">
          <span className="field-label">Notes</span>
          <input name="notes" placeholder="Color consultation included" type="text" />
        </label>
      </div>

      <div className="button-row">
        <FormSubmitButton
          disabled={!customers.length}
          label={customers.length ? "Create booking" : "Add a customer first"}
          pendingLabel="Saving..."
        />
      </div>
      {state.error ? <div className="status-error">{state.error}</div> : null}
      {state.success ? <div className="status-success">{state.success}</div> : null}
    </form>
  );
}
