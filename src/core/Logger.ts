export interface Logger {
  debug(message: string, ...details: unknown[]): void;
  info(message: string, ...details: unknown[]): void;
  warn(message: string, ...details: unknown[]): void;
  error(message: string, ...details: unknown[]): void;
}

/** Creates a small environment-aware logger around the browser console. */
export function createLogger(debugEnabled: boolean): Logger {
  return {
    debug(message, ...details) {
      if (debugEnabled) console.debug(`[H2OWyW] ${message}`, ...details);
    },
    info(message, ...details) {
      console.info(`[H2OWyW] ${message}`, ...details);
    },
    warn(message, ...details) {
      console.warn(`[H2OWyW] ${message}`, ...details);
    },
    error(message, ...details) {
      console.error(`[H2OWyW] ${message}`, ...details);
    }
  };
}
