"use client";

import { useActionState } from "react";
import { FormSubmitButton } from "@/components/form-submit-button";
import type { FormState } from "@/lib/validators";

type AuthFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  initialState: FormState;
  mode: "login" | "signup";
  submitLabel: string;
};

export function AuthForm({ action, initialState, mode, submitLabel }: AuthFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="form-grid">
      {mode === "signup" ? (
        <>
          <label className="field">
            <span className="field-label">Full name</span>
            <input name="fullName" placeholder="Avery Stone" required type="text" />
          </label>
          <label className="field">
            <span className="field-label">Company name</span>
            <input name="companyName" placeholder="Velvet Strand Studio" required type="text" />
          </label>
        </>
      ) : null}

      <label className="field">
        <span className="field-label">Email</span>
        <input autoComplete="email" name="email" placeholder="you@company.com" required type="email" />
      </label>

      <label className="field">
        <span className="field-label">Password</span>
        <input
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          name="password"
          placeholder="At least 8 characters"
          required
          type="password"
        />
      </label>

      <FormSubmitButton label={submitLabel} pendingLabel="Working..." />

      {state.error ? <div className="status-error">{state.error}</div> : null}
      {state.success ? <div className="status-success">{state.success}</div> : null}
    </form>
  );
}
