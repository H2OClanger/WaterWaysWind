export interface ServiceWorkerHost {
  readonly serviceWorker?: {
    register(scriptURL: string): Promise<unknown>;
  };
}

/** Registers the offline application shell when service workers are available. */
export async function registerServiceWorker(host: ServiceWorkerHost): Promise<boolean> {
  if (!host.serviceWorker) return false;

  await host.serviceWorker.register('/service-worker.js');
  return true;
}
