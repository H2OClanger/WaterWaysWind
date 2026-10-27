export interface WindLocation {
  readonly latitude: number;
  readonly longitude: number;
}

export interface WindReading {
  readonly speedKnots: number;
  readonly directionDegrees: number;
  readonly observedAt: string;
}

export type WindForecastPoint = WindReading;

export interface FetchResponse {
  readonly ok: boolean;
  json(): Promise<unknown>;
}

export type Fetcher = (input: string) => Promise<FetchResponse>;

type OpenMeteoResponse = {
  current?: {
    wind_speed_10m?: unknown;
    wind_direction_10m?: unknown;
    time?: unknown;
  };
  hourly?: {
    time?: unknown;
    wind_speed_10m?: unknown;
    wind_direction_10m?: unknown;
  };
};

/** Loads the current modelled 10 m wind for a supplied location. */
export async function getCurrentWind(fetcher: Fetcher, { latitude, longitude }: WindLocation): Promise<WindReading> {
  const parameters = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'wind_speed_10m,wind_direction_10m',
    wind_speed_unit: 'kn',
    timezone: 'Europe/London'
  });
  const response = await fetcher(`https://api.open-meteo.com/v1/forecast?${parameters}`);

  if (!response.ok) throw new Error('Wind data is unavailable.');

  const data = (await response.json()) as OpenMeteoResponse;
  const current = data.current;

  if (
    !current ||
    typeof current.wind_speed_10m !== 'number' ||
    typeof current.wind_direction_10m !== 'number' ||
    typeof current.time !== 'string'
  ) {
    throw new Error('Wind data is unavailable.');
  }

  return {
    speedKnots: current.wind_speed_10m,
    directionDegrees: current.wind_direction_10m,
    observedAt: current.time
  };
}

/** Loads the next twelve hourly modelled 10 m wind readings for a supplied location. */
export async function getWindForecast(fetcher: Fetcher, { latitude, longitude }: WindLocation): Promise<readonly WindForecastPoint[]> {
  const parameters = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly: 'wind_speed_10m,wind_direction_10m',
    forecast_hours: '12',
    wind_speed_unit: 'kn',
    timezone: 'Europe/London'
  });
  const response = await fetcher(`https://api.open-meteo.com/v1/forecast?${parameters}`);

  if (!response.ok) throw new Error('Wind forecast is unavailable.');

  const data = (await response.json()) as OpenMeteoResponse;
  const hourly = data.hourly;
  const times = hourly?.time;
  const windSpeeds = hourly?.wind_speed_10m;
  const windDirections = hourly?.wind_direction_10m;

  if (
    !Array.isArray(times) ||
    !Array.isArray(windSpeeds) ||
    !Array.isArray(windDirections)
  ) {
    throw new Error('Wind forecast is unavailable.');
  }

  const forecast = times.slice(0, 12).map((time, index) => {
    const speedKnots = windSpeeds[index];
    const directionDegrees = windDirections[index];

    if (typeof time !== 'string' || typeof speedKnots !== 'number' || typeof directionDegrees !== 'number') {
      throw new Error('Wind forecast is unavailable.');
    }

    return { observedAt: time, speedKnots, directionDegrees };
  });

  if (forecast.length === 0) throw new Error('Wind forecast is unavailable.');

  return forecast;
}

export function compassDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(((degrees % 360) + 360) % 360 / 45) % directions.length] ?? 'N';
}

export function formatWindReading({ speedKnots, directionDegrees }: WindReading): string {
  return `${Math.round(speedKnots)} kn ${compassDirection(directionDegrees)}`;
}
