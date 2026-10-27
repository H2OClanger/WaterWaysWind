import { describe, expect, it, vi } from 'vitest';
import { compassDirection, formatWindReading, getCurrentWind } from './WindService';

describe('WindService', () => {
  it('maps a provider response into a wind reading', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        current: { wind_speed_10m: 12.4, wind_direction_10m: 236, time: '2026-10-27T12:00' }
      })
    });

    await expect(getCurrentWind(fetcher, { latitude: 51.5074, longitude: -0.1276 })).resolves.toEqual({
      speedKnots: 12.4,
      directionDegrees: 236,
      observedAt: '2026-10-27T12:00'
    });
  });

  it('formats wind direction for compact display', () => {
    expect(compassDirection(236)).toBe('SW');
    expect(formatWindReading({ speedKnots: 12.4, directionDegrees: 236, observedAt: '' })).toBe('12 kn SW');
  });
});
