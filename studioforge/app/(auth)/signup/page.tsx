import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { authFormState, signupAction } from "@/app/(auth)/actions";

export default function SignupPage() {
  return (
    <div className="center-shell">
      <div className="auth-card">
        <div className="eyebrow">Launch</div>
        <h1 className="auth-title">Create your multi-tenant salon builder workspace.</h1>
        <p className="auth-copy">
          Provision authentication, AI generation, and tenant-safe salon operations in one
          production-ready stack.
        </p>
        <AuthForm
          action={signupAction}
          initialState={authFormState}
          mode="signup"
          submitLabel="Create account"
        />
        <p className="auth-footer">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
