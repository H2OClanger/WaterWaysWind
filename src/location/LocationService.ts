export interface UserLocation {
  readonly longitude: number;
  readonly latitude: number;
  readonly accuracy: number;
}

export interface LocationProvider {
  getCurrentPosition(
    success: PositionCallback,
    error?: PositionErrorCallback | null,
    options?: PositionOptions
  ): void;
}

const locationOptions: PositionOptions = {
  enableHighAccuracy: false,
  maximumAge: 60_000,
  timeout: 10_000
};

/** Requests a one-off position only after a user explicitly asks for it. */
export function getCurrentLocation(provider: LocationProvider): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    provider.getCurrentPosition(
      ({ coords }) => {
        resolve({
          longitude: coords.longitude,
          latitude: coords.latitude,
          accuracy: coords.accuracy
        });
      },
      () => reject(new Error('Location is unavailable.')),
      locationOptions
    );
  });
}

/** Returns the browser location provider when the device supports it. */
export function getBrowserLocationProvider(): LocationProvider | undefined {
  return typeof navigator !== 'undefined' ? navigator.geolocation : undefined;
}
