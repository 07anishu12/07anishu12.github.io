import type { GitHubRepositoryRef } from "@portfolio/contracts";
import { GitHubRepositoryRefSchema } from "@portfolio/contracts";

export type AppEnvironment = "development" | "test" | "production";
export type ContactProviderName = "none" | "resend";

export interface AppConfig {
  environment: AppEnvironment;
  host: string;
  port: number;
  corsOrigins: string[];
  trustProxy: boolean;
  maxBodyBytes: number;
  requestTimeoutMs: number;
  upstreamTimeoutMs: number;
  contactProvider: ContactProviderName;
  resendApiKey?: string;
  contactToEmail?: string;
  contactFromEmail?: string;
  githubToken?: string;
  githubRepos: GitHubRepositoryRef[];
  contactRateLimitWindowMs: number;
  contactRateLimitMax: number;
  minFormAgeMs: number;
  whatsappAppSecret?: string;
  whatsappVerifyToken?: string;
  databaseUrl?: string;
  leadTokenSecret?: string;
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

type Environment = Record<string, string | undefined>;

const parsePositiveInt = (
  environment: Environment,
  name: string,
  fallback: number,
): number => {
  const value = environment[name];
  if (value === undefined || value === "") return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new ConfigurationError(`${name} must be a positive integer`);
  }
  return parsed;
};

const parseBoolean = (
  environment: Environment,
  name: string,
  fallback: boolean,
): boolean => {
  const value = environment[name];
  if (value === undefined || value === "") return fallback;
  if (value === "true") return true;
  if (value === "false") return false;
  throw new ConfigurationError(`${name} must be true or false`);
};

const parseOrigins = (
  environment: Environment,
  name: string,
  fallback: string[],
): string[] => {
  const value = environment[name];
  if (value === undefined || value.trim() === "") return fallback;
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map((origin) => {
      try {
        const url = new URL(origin);
        if (
          !["http:", "https:"].includes(url.protocol) ||
          url.pathname !== "/"
        ) {
          throw new Error("invalid origin");
        }
        return url.origin;
      } catch {
        throw new ConfigurationError(`${name} contains an invalid origin`);
      }
    });
};

const parseRepositories = (
  value: string | undefined,
): GitHubRepositoryRef[] => {
  if (!value || value.trim() === "") return [];
  return value.split(",").map((repository) => {
    const [owner, name, ...extra] = repository.trim().split("/");
    const result = GitHubRepositoryRefSchema.safeParse({ owner, name });
    if (extra.length > 0 || !result.success) {
      throw new ConfigurationError(
        `GITHUB_PUBLIC_REPOS contains an invalid repository: ${repository}`,
      );
    }
    return result.data;
  });
};

export const loadConfig = (
  environment: Environment = process.env,
): AppConfig => {
  const nodeEnvironment = environment.NODE_ENV ?? "development";
  if (!["development", "test", "production"].includes(nodeEnvironment)) {
    throw new ConfigurationError(
      "NODE_ENV must be development, test, or production",
    );
  }
  const appEnvironment = nodeEnvironment as AppEnvironment;
  const contactProvider = (environment.CONTACT_PROVIDER ??
    "none") as ContactProviderName;
  if (!["none", "resend"].includes(contactProvider)) {
    throw new ConfigurationError("CONTACT_PROVIDER must be none or resend");
  }

  const config: AppConfig = {
    environment: appEnvironment,
    databaseUrl: environment.DATABASE_URL,
    whatsappAppSecret: environment.WHATSAPP_APP_SECRET,
    whatsappVerifyToken: environment.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
    leadTokenSecret: environment.LEAD_TOKEN_SECRET,
    host:
      environment.HOST ??
      (appEnvironment === "production" ? "0.0.0.0" : "127.0.0.1"),
    port: parsePositiveInt(environment, "PORT", 4000),
    corsOrigins: parseOrigins(
      environment,
      "CORS_ORIGINS",
      appEnvironment === "production" ? [] : ["http://localhost:3000"],
    ),
    trustProxy: parseBoolean(environment, "TRUST_PROXY", false),
    maxBodyBytes: parsePositiveInt(environment, "MAX_BODY_BYTES", 32_768),
    requestTimeoutMs: parsePositiveInt(
      environment,
      "REQUEST_TIMEOUT_MS",
      10_000,
    ),
    upstreamTimeoutMs: parsePositiveInt(
      environment,
      "UPSTREAM_TIMEOUT_MS",
      5_000,
    ),
    contactProvider,
    resendApiKey: environment.RESEND_API_KEY,
    contactToEmail: environment.CONTACT_TO_EMAIL,
    contactFromEmail: environment.CONTACT_FROM_EMAIL,
    githubToken: environment.GITHUB_TOKEN,
    githubRepos: parseRepositories(environment.GITHUB_PUBLIC_REPOS),
    contactRateLimitWindowMs: parsePositiveInt(
      environment,
      "CONTACT_RATE_LIMIT_WINDOW_MS",
      15 * 60 * 1_000,
    ),
    contactRateLimitMax: parsePositiveInt(
      environment,
      "CONTACT_RATE_LIMIT_MAX",
      5,
    ),
    minFormAgeMs: parsePositiveInt(environment, "MIN_FORM_AGE_MS", 1_500),
  };

  if (appEnvironment === "production") {
    if (
      !config.databaseUrl ||
      !config.leadTokenSecret ||
      config.leadTokenSecret.length < 32
    )
      throw new ConfigurationError(
        "DATABASE_URL and LEAD_TOKEN_SECRET (at least 32 characters) are required in production",
      );
    if (config.corsOrigins.length === 0) {
      throw new ConfigurationError("CORS_ORIGINS is required in production");
    }
    if (
      config.contactProvider === "resend" &&
      (!config.resendApiKey ||
        !config.contactToEmail ||
        !config.contactFromEmail)
    ) {
      throw new ConfigurationError(
        "Production contact delivery requires CONTACT_PROVIDER=resend, RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL",
      );
    }
  }

  return config;
};
