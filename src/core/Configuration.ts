export interface ApplicationConfiguration {
  readonly environment: 'development' | 'production' | 'test';
  readonly applicationName: string;
  readonly enableDebugLogging: boolean;
}

/** Returns immutable configuration derived from the current runtime environment. */
export function createConfiguration(): ApplicationConfiguration {
  const mode = import.meta.env.MODE;
  const environment: ApplicationConfiguration['environment'] =
    mode === 'production' ? 'production' : mode === 'test' ? 'test' : 'development';

  return Object.freeze({
    environment,
    applicationName: 'WaterWaysWind',
    enableDebugLogging: environment !== 'production'
  });
}
