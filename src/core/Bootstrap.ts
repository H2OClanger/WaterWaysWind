import { Application } from './Application';

/** Creates and starts the application exactly once from the browser entry point. */
export function bootstrap(): Application {
  const application = new Application();
  application.start();
  return application;
}
