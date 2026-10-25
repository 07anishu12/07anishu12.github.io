import type { ContactRequest, LeadCaptureRequest } from "@portfolio/contracts";

import type { EmailProvider } from "../connectors/email.js";
import type { ServerAttribution } from "../http/attribution.js";
import { AppError } from "../errors.js";
import type { Logger } from "../logger.js";

export class ContactService {
  constructor(
    private readonly emailProvider: EmailProvider,
    private readonly logger: Logger,
  ) {}

  async submit(request: ContactRequest, requestId: string): Promise<void> {
    try {
      await this.emailProvider.sendContactMessage(request);
    } catch (error) {
      this.logger.error("contact.delivery_failed", {
        requestId,
        provider: this.emailProvider.name,
        error: error instanceof Error ? error.name : "UnknownError",
      });
      if (error instanceof AppError) throw error;
      throw new AppError(
        503,
        "EMAIL_PROVIDER_UNAVAILABLE",
        "Contact delivery is temporarily unavailable.",
      );
    }
  }

  async submitLead(
    request: LeadCaptureRequest,
    attribution: ServerAttribution,
    requestId: string,
  ): Promise<void> {
    try {
      await this.emailProvider.sendLeadCaptureMessage({
        ...request,
        attribution,
      });
    } catch (error) {
      this.logger.error("lead.delivery_failed", {
        requestId,
        provider: this.emailProvider.name,
        error: error instanceof Error ? error.name : "UnknownError",
      });
      if (error instanceof AppError) throw error;
      throw new AppError(
        503,
        "EMAIL_PROVIDER_UNAVAILABLE",
        "Lead delivery is temporarily unavailable.",
      );
    }
  }
}
