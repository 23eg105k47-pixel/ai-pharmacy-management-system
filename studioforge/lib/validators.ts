import { z } from "zod";

export const authSchema = z.object({
  companyName: z.string().trim().min(2).max(80).optional(),
  email: z.string().trim().email(),
  fullName: z.string().trim().min(2).max(80).optional(),
  password: z.string().min(8).max(72)
});

export const generateAppSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(12, "Describe the salon app you want in at least 12 characters.")
    .max(2000, "Keep the prompt under 2,000 characters.")
});

export const customerSchema = z.object({
  appId: z.string().uuid(),
  email: z.string().trim().email().optional().or(z.literal("")),
  fullName: z.string().trim().min(2).max(100),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal(""))
});

export const bookingSchema = z
  .object({
    appId: z.string().uuid(),
    customerId: z.string().uuid(),
    endsAt: z.string().datetime({ offset: true }),
    notes: z.string().trim().max(500).optional().or(z.literal("")),
    priceCents: z.coerce.number().int().min(0),
    serviceName: z.string().trim().min(2).max(80),
    startsAt: z.string().datetime({ offset: true }),
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
    stylistName: z.string().trim().max(80).optional().or(z.literal(""))
  })
  .refine((data) => new Date(data.endsAt) > new Date(data.startsAt), {
    message: "End time must be after start time.",
    path: ["endsAt"]
  });

export const invoiceSchema = z.object({
  amountCents: z.coerce.number().int().min(0),
  appId: z.string().uuid(),
  bookingId: z.string().uuid().optional().or(z.literal("")),
  currency: z.string().trim().length(3).default("USD"),
  customerId: z.string().uuid().optional().or(z.literal("")),
  dueDate: z.string().date().optional().or(z.literal("")),
  invoiceNumber: z.string().trim().min(3).max(40),
  status: z.enum(["draft", "sent", "paid", "overdue"])
});

export const salonBlueprintSchema = z.object({
  appName: z.string().trim().min(3).max(80),
  brandPositioning: z.string().trim().min(20).max(280),
  targetAudience: z.string().trim().min(10).max(180),
  featureSummary: z.object({
    customers: z.array(z.string().trim().min(3)).min(3).max(6),
    bookings: z.array(z.string().trim().min(3)).min(3).max(6),
    billing: z.array(z.string().trim().min(3)).min(3).max(6)
  }),
  automations: z.array(z.string().trim().min(3)).min(3).max(6),
  starterMetrics: z.object({
    averageTicketUsd: z.number().min(10).max(1000),
    dailyBookingGoal: z.number().int().min(1).max(500),
    monthlyRevenueTargetUsd: z.number().min(1000).max(1000000)
  }),
  launchChecklist: z.array(z.string().trim().min(3)).min(4).max(8)
});

export type FormState = {
  error: string | null;
  success: string | null;
};

export const initialFormState: FormState = {
  error: null,
  success: null
};
