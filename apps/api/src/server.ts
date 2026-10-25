import { serve } from "@hono/node-server";
import type { Server } from "node:http";

import { createApp } from "./app.js";
import { loadConfig, ConfigurationError } from "./config.js";
import { JsonLogger } from "./logger.js";

const logger = new JsonLogger();

try {
  const config = loadConfig();
  const app = createApp({ config, logger });
  const server = serve(
    {
      fetch: app.fetch,
      hostname: config.host,
      port: config.port,
    },
    (info) =>
      logger.info("api.started", { host: info.address, port: info.port }),
  );

  const nodeServer = server as Server;
  nodeServer.requestTimeout = config.requestTimeoutMs;
  nodeServer.headersTimeout = config.requestTimeoutMs;
  nodeServer.keepAliveTimeout = Math.min(config.requestTimeoutMs, 5_000);

  const shutdown = (signal: string) => {
    logger.info("api.stopping", { signal });
    server.close(() => process.exit(0));
  };
  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
} catch (error) {
  if (error instanceof ConfigurationError) {
    logger.error("api.configuration_error", { message: error.message });
  } else {
    logger.error("api.startup_error", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
  }
  process.exitCode = 1;
}
