import { createConfiguration, type ApplicationConfiguration } from './Configuration';
import { EventBus } from './EventBus';
import { createLogger, type Logger } from './Logger';
import { VERSION_STRING } from './Version';

type ApplicationEvents = {
  started: { version: string };
  stopped: undefined;
};

/** Owns the application lifecycle and shared core services. */
export class Application {
  readonly configuration: ApplicationConfiguration;
  readonly events = new EventBus<ApplicationEvents>();
  readonly logger: Logger;

  private started = false;

  constructor(configuration = createConfiguration()) {
    this.configuration = configuration;
    this.logger = createLogger(configuration.enableDebugLogging);
  }

  start(): void {
    if (this.started) return;

    this.started = true;
    this.logger.info(`Starting ${this.configuration.applicationName} ${VERSION_STRING}`);
    this.events.emit('started', { version: VERSION_STRING });
  }

  stop(): void {
    if (!this.started) return;

    this.started = false;
    this.events.emit('stopped', undefined);
    this.logger.info('Application stopped');
  }

  get isStarted(): boolean {
    return this.started;
  }
}
