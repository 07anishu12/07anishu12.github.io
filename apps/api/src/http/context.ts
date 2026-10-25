import type { AppConfig } from "../config.js";
import type { Logger } from "../logger.js";

declare module "hono" {
  interface ContextVariableMap {
    config: AppConfig;
    logger: Logger;
    requestId: string;
  }
}
