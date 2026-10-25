import type { ContactRequest, LeadCaptureRequest } from "@portfolio/contracts";

import type { AppConfig } from "../config.js";
import { AppError } from "../errors.js";
import type { ServerAttribution } from "../http/attribution.js";

export type ContactMessage = Pick<
  ContactRequest,
  "name" | "email" | "company" | "message"
>;
export type LeadCaptureMessage = LeadCaptureRequest & {
  attribution: ServerAttribution;
};

export interface EmailProvider {
  readonly name: string;
  isReady(): boolean;
  sendContactMessage(message: ContactMessage): Promise<void>;
  sendLeadCaptureMessage(message: LeadCaptureMessage): Promise<void>;
}

export class ResendEmailProvider implements EmailProvider {
  readonly name = "resend";

  constructor(
    private readonly apiKey: string,
    private readonly toEmail: string,
    private readonly fromEmail: string,
    private readonly timeoutMs: number,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  isReady(): boolean {
    return true;
  }

  async sendContactMessage(message: ContactMessage): Promise<void> {
    await this.sendEmail({
      subject: `Portfolio contact from ${message.name}`,
      replyTo: message.email,
      text: [
        `Name: ${message.name}`,
        `Email: ${message.email}`,
        ...(message.company ? [`Company: ${message.company}`] : []),
        "",
        message.message,
      ].join("\n"),
    });
  }

  async sendLeadCaptureMessage(message: LeadCaptureMessage): Promise<void> {
    await this.sendEmail({
      subject: `Bike enquiry from ${message.fullName}`,
      text: [
        `Name: ${message.fullName}`,
        `PIN code: ${message.pinCode}`,
        `Mobile: ${message.mobile}`,
        `Bike brand: ${message.bikeBrand}`,
        ...(message.otherBikeBrand
          ? [`Other brand: ${message.otherBikeBrand}`]
          : []),
        "",
        "Server-derived attribution:",
        `Referer: ${message.attribution.referer ?? "not available"}`,
        `Page path: ${message.attribution.pagePath ?? "not available"}`,
        `Article slug: ${message.attribution.articleSlug ?? "not available"}`,
        `Category: ${message.attribution.category ?? "not available"}`,
        `Campaign: ${message.attribution.campaign ?? "not available"}`,
        ...(message.clientContext
          ? [
              "",
              "Client-supplied context (untrusted):",
              `Source: ${message.clientContext.source ?? "not available"}`,
              `Campaign: ${message.clientContext.campaign ?? "not available"}`,
            ]
          : []),
      ].join("\n"),
    });
  }

  private async sendEmail(input: {
    subject: string;
    text: string;
    replyTo?: string;
  }): Promise<void> {
    const response = await this.fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.fromEmail,
        to: [this.toEmail],
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
        subject: input.subject,
        text: input.text,
      }),
      signal: AbortSignal.timeout(this.timeoutMs),
    });

    if (!response.ok) {
      throw new AppError(
        503,
        "EMAIL_PROVIDER_UNAVAILABLE",
        "Contact delivery is temporarily unavailable.",
      );
    }
  }
}

export class UnconfiguredEmailProvider implements EmailProvider {
  readonly name = "none";

  isReady(): boolean {
    return false;
  }

  async sendContactMessage(): Promise<void> {
    throw new AppError(
      503,
      "EMAIL_PROVIDER_UNAVAILABLE",
      "Contact delivery is not configured.",
    );
  }

  async sendLeadCaptureMessage(): Promise<void> {
    throw new AppError(
      503,
      "EMAIL_PROVIDER_UNAVAILABLE",
      "Contact delivery is not configured.",
    );
  }
}

export const createEmailProvider = (config: AppConfig): EmailProvider => {
  if (
    config.contactProvider === "resend" &&
    config.resendApiKey &&
    config.contactToEmail &&
    config.contactFromEmail
  ) {
    return new ResendEmailProvider(
      config.resendApiKey,
      config.contactToEmail,
      config.contactFromEmail,
      config.upstreamTimeoutMs,
    );
  }
  return new UnconfiguredEmailProvider();
};
