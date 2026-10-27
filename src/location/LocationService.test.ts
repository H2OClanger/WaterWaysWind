import { describe, expect, it } from 'vitest';
import { getCurrentLocation, type LocationProvider } from './LocationService';

describe('getCurrentLocation', () => {
  it('returns the browser coordinates as a user location', async () => {
    const provider: LocationProvider = {
      getCurrentPosition(success) {
        success({
          coords: { longitude: -0.12, latitude: 51.5, accuracy: 14 }
        } as GeolocationPosition);
      }
    };

    await expect(getCurrentLocation(provider)).resolves.toEqual({
      longitude: -0.12,
      latitude: 51.5,
      accuracy: 14
    });
  });

  it('reports an unavailable location', async () => {
    const provider: LocationProvider = {
      getCurrentPosition(_success, error) {
        error?.({} as GeolocationPositionError);
      }
    };

    await expect(getCurrentLocation(provider)).rejects.toThrow('Location is unavailable.');
  });
});
