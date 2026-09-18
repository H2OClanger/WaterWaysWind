export interface ServiceWorkerHost {
  readonly navigator: {
    readonly serviceWorker?: {
      register(scriptURL: string): Promise<unknown>;
    };
  };
}

/** Registers the offline application shell when service workers are available. */
export async function registerServiceWorker(host: ServiceWorkerHost): Promise<boolean> {
  if (!host.navigator.serviceWorker) return false;

  await host.navigator.serviceWorker.register('/service-worker.js');
  return true;
}
