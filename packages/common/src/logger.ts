type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const parseLevel = (value: string | undefined): LogLevel => {
  if (!value) return "info";
  const normalized = value.toLowerCase();
  if (normalized === "debug" || normalized === "info" || normalized === "warn" || normalized === "error") {
    return normalized;
  }
  return "info";
};

const normalizeContext = (context: unknown): unknown => {
  if (context instanceof Error) {
    return {
      name: context.name,
      message: context.message,
      stack: context.stack,
    };
  }
  return context;
};

interface CreateLoggerOptions {
  service: string;
  level?: string;
}

interface Logger {
  debug: (message: string, context?: unknown) => void;
  info: (message: string, context?: unknown) => void;
  warn: (message: string, context?: unknown) => void;
  error: (message: string, context?: unknown) => void;
}

export const createLogger = ({ service, level }: CreateLoggerOptions): Logger => {
  const activeLevel = parseLevel(level ?? process.env.LOG_LEVEL);

  const shouldLog = (current: LogLevel): boolean => {
    return LEVEL_PRIORITY[current] >= LEVEL_PRIORITY[activeLevel];
  };

  const write = (logLevel: LogLevel, message: string, context?: unknown) => {
    if (!shouldLog(logLevel)) {
      return;
    }

    const payload = {
      timestamp: new Date().toISOString(),
      level: logLevel,
      service,
      message,
      context: context === undefined ? undefined : normalizeContext(context),
    };

    const output = JSON.stringify(payload);
    if (logLevel === "error") {
      console.error(output);
      return;
    }
    if (logLevel === "warn") {
      console.warn(output);
      return;
    }
    console.log(output);
  };

  return {
    debug: (message, context) => write("debug", message, context),
    info: (message, context) => write("info", message, context),
    warn: (message, context) => write("warn", message, context),
    error: (message, context) => write("error", message, context),
  };
};
