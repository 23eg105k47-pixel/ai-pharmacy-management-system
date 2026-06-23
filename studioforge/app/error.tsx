"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="center-shell">
          <div className="auth-card">
            <div className="eyebrow">Recovery</div>
            <h1 className="auth-title">Something broke in the app shell.</h1>
            <p className="auth-copy">{error.message}</p>
            <div className="button-row">
              <button className="button" onClick={() => reset()} type="button">
                Try again
              </button>
              <a className="button-secondary" href="/dashboard">
                Back to dashboard
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
