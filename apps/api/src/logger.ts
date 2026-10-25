export type LogFields = Record<string, unknown>;

export interface Logger {
  info(event: string, fields?: LogFields): void;
  warn(event: string, fields?: LogFields): void;
  error(event: string, fields?: LogFields): void;
}

const serializeError = (error: unknown): LogFields => {
  if (!(error instanceof Error)) return { error: String(error) };
  return { error: error.name, errorMessage: error.message };
};

export class JsonLogger implements Logger {
  constructor(private readonly silent = false) {}

  info(event: string, fields: LogFields = {}): void {
    this.write("info", event, fields);
  }

  warn(event: string, fields: LogFields = {}): void {
    this.write("warn", event, fields);
  }

  error(event: string, fields: LogFields = {}): void {
    this.write("error", event, fields);
  }

  private write(level: string, event: string, fields: LogFields): void {
    if (this.silent) return;
    process.stdout.write(
      `${JSON.stringify({ timestamp: new Date().toISOString(), level, event, ...fields })}\n`,
    );
  }
}

export const errorFields = (error: unknown): LogFields => serializeError(error);
