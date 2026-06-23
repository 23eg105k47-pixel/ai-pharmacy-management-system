"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function GeneratorForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [prompt, setPrompt] = useState(
    "Build a polished salon app for a premium urban studio with repeat-customer automation, chair utilization tracking, and clean billing workflows."
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const payload = (await response.json()) as { error?: string; project?: { name: string } };

      if (!response.ok) {
        setError(payload.error ?? "The AI builder request failed.");
        return;
      }

      setSuccess(`Blueprint "${payload.project?.name ?? "Salon app"}" generated and stored.`);
      router.refresh();
    });
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label className="field">
        <span className="field-label">Product prompt</span>
        <textarea
          name="prompt"
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Describe the salon experience, offer mix, pricing model, and automations..."
          value={prompt}
        />
      </label>
      <div className="button-row">
        <button className="button" disabled={isPending} type="submit">
          {isPending ? "Generating..." : "Generate salon app"}
        </button>
      </div>
      {error ? <div className="status-error">{error}</div> : null}
      {success ? <div className="status-success">{success}</div> : null}
    </form>
  );
}
