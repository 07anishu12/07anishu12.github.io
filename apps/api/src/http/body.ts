import type { Context } from "hono";

import { AppError } from "../errors.js";

export async function readRawBody(
  context: Context,
  maxBodyBytes: number,
): Promise<string> {
  const reader = context.req.raw.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBodyBytes) {
        await reader.cancel();
        throw new AppError(
          413,
          "PAYLOAD_TOO_LARGE",
          "Request body is too large.",
        );
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks).toString("utf8");
}

export const readJsonBody = async (
  context: Context,
  maxBodyBytes: number,
): Promise<unknown> => {
  const contentType = context.req.header("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    throw new AppError(
      415,
      "UNSUPPORTED_MEDIA_TYPE",
      "Content-Type must be application/json.",
    );
  }
  const raw = await readRawBody(context, maxBodyBytes);
  if (Buffer.byteLength(raw, "utf8") > maxBodyBytes) {
    throw new AppError(413, "PAYLOAD_TOO_LARGE", "Request body is too large.");
  }
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new AppError(400, "INVALID_JSON", "Request body must be valid JSON.");
  }
};
