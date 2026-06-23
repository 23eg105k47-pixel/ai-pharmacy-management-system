import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { generateSalonBlueprint } from "@/lib/ai/salon-generator";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AppError, toErrorMessage } from "@/lib/errors";
import { generateAppSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = generateAppSchema.parse(await request.json());
    const supabase = await createServerSupabaseClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const blueprint = await generateSalonBlueprint(payload.prompt);
    const { data, error } = await supabase
      .from("app_projects")
      .insert({
        ai_spec: blueprint,
        name: blueprint.appName,
        prompt: payload.prompt,
        status: "ready",
        user_id: user.id
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ project: data }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Malformed JSON body." }, { status: 400 });
    }

    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? "Invalid request." }, { status: 400 });
    }

    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
