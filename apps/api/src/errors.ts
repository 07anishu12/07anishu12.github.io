import type { Context } from "hono";

export class AppError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    readonly publicMessage: string,
    readonly details?: unknown,
    readonly retryAfterSeconds?: number,
  ) {
    super(publicMessage);
    this.name = "AppError";
  }
}

export const errorResponse = (context: Context, error: AppError): Response => {
  if (error.retryAfterSeconds !== undefined) {
    context.header("Retry-After", String(error.retryAfterSeconds));
  }
  return context.json(
    {
      error: {
        code: error.code,
        message: error.publicMessage,
        requestId:
          context.get("requestId") ?? "00000000-0000-4000-8000-000000000000",
        ...(error.details === undefined ? {} : { details: error.details }),
      },
    },
    error.status as 400,
  );
};
