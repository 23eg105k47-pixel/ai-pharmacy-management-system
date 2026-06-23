import OpenAI from "openai";
import { env } from "@/lib/env";
import { AppError } from "@/lib/errors";
import { salonBlueprintSchema } from "@/lib/validators";
import type { SalonBlueprint } from "@/types/salon";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
});

export async function generateSalonBlueprint(prompt: string): Promise<SalonBlueprint> {
  const completion = await openai.chat.completions.create({
    model: env.OPENAI_MODEL,
    temperature: 0.4,
    response_format: {
      type: "json_object"
    },
    messages: [
      {
        role: "system",
        content:
          "You are a senior SaaS product architect. Return strict JSON for a salon management app. Include customers, bookings, and billing capabilities only. Avoid markdown."
      },
      {
        role: "user",
        content: `Create a salon SaaS app blueprint based on this prompt: ${prompt}`
      }
    ]
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new AppError("OpenAI returned an empty response.", 502);
  }

  const parsed = salonBlueprintSchema.safeParse(JSON.parse(content));

  if (!parsed.success) {
    throw new AppError("OpenAI returned an invalid app blueprint.", 502);
  }

  return parsed.data;
}
