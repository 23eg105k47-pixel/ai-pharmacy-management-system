"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";
import { toErrorMessage } from "@/lib/errors";
import { authSchema, initialFormState, type FormState } from "@/lib/validators";

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  try {
    const values = authSchema.parse({
      email: formData.get("email"),
      password: formData.get("password")
    });

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    });

    if (error) {
      return { error: error.message, success: null };
    }
  } catch (error) {
    return { error: toErrorMessage(error), success: null };
  }

  redirect("/dashboard");
}

export async function signupAction(_: FormState, formData: FormData): Promise<FormState> {
  try {
    const values = authSchema.parse({
      companyName: formData.get("companyName"),
      email: formData.get("email"),
      fullName: formData.get("fullName"),
      password: formData.get("password")
    });

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          company_name: values.companyName ?? "",
          full_name: values.fullName ?? ""
        },
        emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
      }
    });

    if (error) {
      return { error: error.message, success: null };
    }

    if (data.session) {
      redirect("/dashboard");
    }

    return {
      error: null,
      success: "Account created. Check your inbox to confirm your email, then sign in."
    };
  } catch (error) {
    return { error: toErrorMessage(error), success: null };
  }
}

export const authFormState = initialFormState;
