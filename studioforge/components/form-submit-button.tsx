"use client";

import { useFormStatus } from "react-dom";

export function FormSubmitButton({
  disabled = false,
  label,
  pendingLabel
}: {
  disabled?: boolean;
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button className="button" disabled={pending || disabled} type="submit">
      {pending ? pendingLabel : label}
    </button>
  );
}
