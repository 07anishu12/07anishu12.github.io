import { z } from "zod";

export const ContactRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10).max(5_000),
  website: z.string().max(200).optional(),
  formStartedAt: z.number().int().nonnegative().optional(),
});

export type ContactRequest = z.infer<typeof ContactRequestSchema>;

export const LeadCaptureRequestSchema = z
  .object({
    submissionToken: z.string().min(80).max(200),
    sourcePath: z
      .string()
      .max(500)
      .regex(/^\/(?!\/)[A-Za-z0-9_./%-]*$/)
      .optional(),
    articleSlug: z
      .string()
      .max(180)
      .regex(/^[a-z0-9-]+$/)
      .optional(),
    pageCategory: z
      .string()
      .max(80)
      .regex(/^[a-z0-9-]+$/)
      .optional(),
    fullName: z.string().trim().min(2).max(120),
    pinCode: z
      .string()
      .regex(/^[1-9]\d{5}$/, "Enter a valid six-digit Indian PIN code."),
    mobile: z
      .string()
      .trim()
      .regex(
        /^(?:\+91[\s-]?)?[6-9]\d{9}$/,
        "Enter a valid Indian mobile number.",
      ),
    bikeBrand: z.string().trim().min(1).max(80),
    otherBikeBrand: z.string().trim().max(80).optional(),
    consent: z.literal(true, { error: "Consent is required." }),
    website: z.string().max(200).optional(),
    formStartedAt: z.number().int().nonnegative().optional(),
    clientContext: z
      .object({
        source: z.string().trim().max(120).optional(),
        campaign: z.enum(["organic", "portfolio", "bike-finance"]).optional(),
      })
      .optional(),
  })
  .refine(
    (value) =>
      value.bikeBrand !== "Other" || (value.otherBikeBrand?.length ?? 0) >= 2,
    { path: ["otherBikeBrand"], message: "Enter the other brand." },
  );

export type LeadCaptureRequest = z.infer<typeof LeadCaptureRequestSchema>;

export const LeadReceiptSchema = z.object({
  ok: z.literal(true),
  leadId: z.string().uuid(),
  duplicate: z.boolean(),
  integrations: z.object({
    sheets: z.enum(["queued", "synced", "failed", "uncertain"]),
    whatsapp: z.enum([
      "queued",
      "accepted",
      "sent",
      "delivered",
      "read",
      "failed",
      "uncertain",
    ]),
  }),
});
export type LeadReceipt = z.infer<typeof LeadReceiptSchema>;

export const ContactResponseSchema = z.object({
  ok: z.literal(true),
  message: z.string(),
  requestId: z.string().uuid(),
});

export type ContactResponse = z.infer<typeof ContactResponseSchema>;

export const GitHubRepositoryRefSchema = z.object({
  owner: z.string().regex(/^[A-Za-z0-9_.-]+$/),
  name: z.string().regex(/^[A-Za-z0-9_.-]+$/),
});

export type GitHubRepositoryRef = z.infer<typeof GitHubRepositoryRefSchema>;

export const ProjectMetadataSchema = z.object({
  owner: z.string(),
  name: z.string(),
  fullName: z.string(),
  description: z.string().nullable(),
  htmlUrl: z.string().url(),
  language: z.string().nullable(),
  stars: z.number().int().nonnegative(),
  forks: z.number().int().nonnegative(),
  isArchived: z.boolean(),
  updatedAt: z.string().datetime().nullable(),
});

export type ProjectMetadata = z.infer<typeof ProjectMetadataSchema>;

export const ProjectListResponseSchema = z.object({
  projects: z.array(ProjectMetadataSchema),
});

export type ProjectListResponse = z.infer<typeof ProjectListResponseSchema>;

export const ErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    requestId: z.string().uuid(),
    details: z.unknown().optional(),
  }),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
