import Link from "next/link";

export default function NotFound() {
  return (
    <div className="center-shell">
      <div className="auth-card">
        <div className="eyebrow">404</div>
        <h1 className="auth-title">This route does not exist.</h1>
        <p className="auth-copy">Head back to the dashboard to continue building.</p>
        <Link className="button" href="/dashboard">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
