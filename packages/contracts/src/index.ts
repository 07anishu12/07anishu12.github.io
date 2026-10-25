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

export const AUTOMOTIVE_BRANDS = [
  "Hero",
  "Honda",
  "TVS",
  "Bajaj",
  "Yamaha",
  "Royal Enfield",
  "Suzuki",
  "KTM",
  "Ola Electric",
  "Ather",
  "Vida",
  "Ampere",
  "Other",
] as const;

export type AutomotiveBrand = (typeof AUTOMOTIVE_BRANDS)[number];

export const VEHICLE_MODELS_BY_BRAND: Record<string, string[]> = {
  Hero: [
    "Splendor Plus",
    "HF Deluxe",
    "HF 100",
    "Glamour",
    "Xtreme 125R",
    "Xtreme 160R 4V",
    "XPulse 200 4V",
    "Mavrick 440",
    "Destini 125",
    "Xoom 110",
    "Pleasure Plus",
    "Other Hero Model",
  ],
  Honda: [
    "Activa 110 (6G / H-Smart)",
    "Activa 125",
    "Shine 100",
    "Shine 125",
    "SP 125",
    "SP 160",
    "Unicorn",
    "Hornet 2.0",
    "CB200X",
    "CB350 / H'ness CB350",
    "Dio 110 / Dio 125",
    "Other Honda Model",
  ],
  TVS: [
    "Jupiter 110 (All-New 2026)",
    "Jupiter 125",
    "Raider 125",
    "Apache RTR 160 4V",
    "Apache RTR 160 2V",
    "Apache RTR 180",
    "Apache RTR 200 4V",
    "Apache RR 310",
    "Ronin 225",
    "iQube Electric",
    "Sport",
    "Radeon",
    "Ntorq 125",
    "Other TVS Model",
  ],
  Bajaj: [
    "Pulsar 125",
    "Pulsar N125",
    "Pulsar 150",
    "Pulsar N150",
    "Pulsar N160",
    "Pulsar NS160",
    "Pulsar NS200",
    "Pulsar N250",
    "Pulsar NS400Z",
    "Platina 100",
    "Platina 110 ABS",
    "CT 110X",
    "Chetak Electric (2901 / 3201)",
    "Dominar 250",
    "Dominar 400",
    "Avenger 160 / 220 Cruise",
    "Other Bajaj Model",
  ],
  Yamaha: [
    "FZ-S FI V4 / FZ-S Hybrid",
    "FZ-FI V3",
    "FZ-X 150",
    "MT-15 Version 2.0",
    "YZF-R15 V4 / R15M",
    "R15S Unibody",
    "RayZR 125 Fi-Hybrid",
    "Aerox 155",
    "Fascino 125 Fi-Hybrid",
    "Other Yamaha Model",
  ],
  "Royal Enfield": [
    "Hunter 350",
    "Classic 350 (2026 Edition)",
    "Bullet 350",
    "Meteor 350",
    "Guerrilla 450",
    "Himalayan 450",
    "Scram 411",
    "Interceptor 650",
    "Continental GT 650",
    "Super Meteor 650",
    "Shotgun 650",
    "Other Royal Enfield Model",
  ],
  Suzuki: [
    "Access 125 (Bluetooth / Ride Connect)",
    "Burgman Street 125",
    "Avenis 125",
    "Gixxer 150",
    "Gixxer SF 150",
    "Gixxer 250",
    "Gixxer SF 250",
    "V-Strom SX 250",
    "Other Suzuki Model",
  ],
  KTM: [
    "125 Duke",
    "200 Duke",
    "250 Duke",
    "390 Duke (Gen 3)",
    "RC 200",
    "RC 390",
    "250 Adventure",
    "390 Adventure",
    "Other KTM Model",
  ],
  "Ola Electric": [
    "S1 X (2kWh / 3kWh / 4kWh)",
    "S1 Air",
    "S1 Pro (Gen 2)",
    "Roadster (Electric Motorcycle)",
    "Other Ola Model",
  ],
  Ather: [
    "450S",
    "450X (2.9kWh / 3.7kWh)",
    "450 Apex",
    "Rizta (Family Electric Scooter)",
    "Other Ather Model",
  ],
  Vida: [
    "Vida V1 Plus",
    "Vida V1 Pro",
    "Other Vida Model",
  ],
  Ampere: [
    "Nexus",
    "Magnus EX",
    "Reo Li Plus",
    "Other Ampere Model",
  ],
  Other: [
    "Other / Custom Model",
  ],
};

export const VEHICLE_TYPES = [
  "Commuter Motorcycle (100cc–125cc)",
  "City / Executive Commuter (125cc–160cc)",
  "Sports / Naked Motorcycle (160cc–250cc)",
  "Performance / Supersport Bike",
  "Cruiser / Classic Motorcycle",
  "Adventure / Touring Motorcycle",
  "ICE Scooter (110cc–125cc)",
  "Family Electric Scooter",
  "High-Speed / Performance EV",
  "Other / Not Sure",
] as const;

export type VehicleType = (typeof VEHICLE_TYPES)[number];

export const SERVICES_LIST = [
  "Product management",
  "App development",
  "Website development",
  "AI development and automation",
  "Data science and analytics",
  "SEO",
  "Performance marketing",
  "Graphic designing",
  "UI/UX design",
  "Video editing",
  "Financial analysis and modelling",
  "Financial consulting or support",
  "Other",
] as const;

export type ServiceOption = (typeof SERVICES_LIST)[number];

export const GeneralEnquiryRequestSchema = z
  .object({
    submissionToken: z.string().min(40).max(250),
    sourcePath: z.string().max(500).optional(),
    pageCategory: z.string().max(80).optional(),
    fullName: z.string().trim().min(2, "Enter your full name.").max(120),
    mobile: z
      .string()
      .trim()
      .regex(
        /^(?:\+91[\s-]?)?[6-9]\d{9}$/,
        "Enter a valid 10-digit Indian mobile number.",
      ),
    service: z.enum(SERVICES_LIST, {
      error: "Please select a service from the list.",
    }),
    otherService: z.string().trim().max(500).optional(),
    consent: z.literal(true, { error: "Please agree to the privacy notice." }),
    website: z.string().max(200).optional(),
    formStartedAt: z.number().int().nonnegative().optional(),
  })
  .refine(
    (value) =>
      value.service !== "Other" || (value.otherService?.length ?? 0) >= 2,
    {
      path: ["otherService"],
      message: "Please describe your requirement.",
    },
  );

export type GeneralEnquiryRequest = z.infer<typeof GeneralEnquiryRequestSchema>;

export const AutomotiveEnquiryRequestSchema = z
  .object({
    submissionToken: z.string().min(40).max(250),
    sourcePath: z.string().max(500).optional(),
    articleSlug: z.string().max(180).optional(),
    pageCategory: z.string().max(80).optional(),
    fullName: z.string().trim().min(2, "Enter your full name.").max(120),
    mobile: z
      .string()
      .trim()
      .regex(
        /^(?:\+91[\s-]?)?[6-9]\d{9}$/,
        "Enter a valid 10-digit Indian mobile number.",
      ),
    pinCode: z
      .string()
      .trim()
      .regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit Indian PIN code."),
    bikeBrand: z.string().trim().max(80).optional(),
    otherBikeBrand: z.string().trim().max(80).optional(),
    vehicleModel: z.string().trim().max(120).optional(),
    vehicleType: z.string().trim().max(120).optional(),
    consent: z.literal(true, { error: "Please agree to the privacy notice." }),
    website: z.string().max(200).optional(),
    formStartedAt: z.number().int().nonnegative().optional(),
    clientContext: z
      .object({
        source: z.string().trim().max(120).optional(),
        campaign: z.string().trim().max(80).optional(),
      })
      .optional(),
  })
  .refine(
    (value) =>
      value.bikeBrand !== "Other" || (value.otherBikeBrand?.length ?? 0) >= 2,
    {
      path: ["otherBikeBrand"],
      message: "Tell me the brand you have in mind.",
    },
  );

export type AutomotiveEnquiryRequest = z.infer<
  typeof AutomotiveEnquiryRequestSchema
>;

export const UnifiedEnquiryRequestSchema = z.union([
  z.object({
    type: z.literal("automotive"),
    data: AutomotiveEnquiryRequestSchema,
  }),
  z.object({
    type: z.literal("general"),
    data: GeneralEnquiryRequestSchema,
  }),
]);

export type UnifiedEnquiryRequest = z.infer<typeof UnifiedEnquiryRequestSchema>;
