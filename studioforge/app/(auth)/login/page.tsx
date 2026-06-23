import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { authFormState, loginAction } from "@/app/(auth)/actions";

export default function LoginPage() {
  return (
    <div className="center-shell">
      <div className="auth-card">
        <div className="eyebrow">StudioForge</div>
        <h1 className="auth-title">Run the AI builder behind your salon SaaS.</h1>
        <p className="auth-copy">
          Sign in to generate a salon app blueprint, manage tenants securely, and operate
          customers, bookings, and billing from one workspace.
        </p>
        <AuthForm
          action={loginAction}
          initialState={authFormState}
          mode="login"
          submitLabel="Sign in"
        />
        <p className="auth-footer">
          New here? <Link href="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
