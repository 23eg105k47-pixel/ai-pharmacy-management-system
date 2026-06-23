"use client";

import { useActionState } from "react";
import { createCustomerAction, dashboardFormState } from "@/app/(dashboard)/dashboard/actions";
import { FormSubmitButton } from "@/components/form-submit-button";

export function CustomerForm({ appId }: { appId: string }) {
  const [state, formAction] = useActionState(createCustomerAction, dashboardFormState);

  return (
    <form action={formAction} className="form-grid">
      <input name="appId" type="hidden" value={appId} />
      <div className="inline-grid-2">
        <label className="field">
          <span className="field-label">Full name</span>
          <input name="fullName" placeholder="Jordan Hayes" required type="text" />
        </label>
        <label className="field">
          <span className="field-label">Email</span>
          <input name="email" placeholder="jordan@example.com" type="email" />
        </label>
      </div>
      <div className="inline-grid-2">
        <label className="field">
          <span className="field-label">Phone</span>
          <input name="phone" placeholder="+1 555 218 9988" type="text" />
        </label>
        <label className="field">
          <span className="field-label">Notes</span>
          <input name="notes" placeholder="Prefers weekend appointments" type="text" />
        </label>
      </div>
      <div className="button-row">
        <FormSubmitButton label="Add customer" pendingLabel="Saving..." />
      </div>
      {state.error ? <div className="status-error">{state.error}</div> : null}
      {state.success ? <div className="status-success">{state.success}</div> : null}
    </form>
  );
}
