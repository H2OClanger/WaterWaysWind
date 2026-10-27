import { describe, expect, it, vi } from 'vitest';
import { compassDirection, formatWindReading, getCurrentWind, getWindForecast } from './WindService';

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

  it('maps up to twelve hourly wind readings for a compact forecast', async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        hourly: {
          time: ['2026-10-27T13:00', '2026-10-27T14:00'],
          wind_speed_10m: [9.6, 11.2],
          wind_direction_10m: [180, 225]
        }
      })
    });

    await expect(getWindForecast(fetcher, { latitude: 51.5074, longitude: -0.1276 })).resolves.toEqual([
      { observedAt: '2026-10-27T13:00', speedKnots: 9.6, directionDegrees: 180 },
      { observedAt: '2026-10-27T14:00', speedKnots: 11.2, directionDegrees: 225 }
    ]);
    expect(fetcher.mock.calls[0]?.[0]).toContain('forecast_hours=12');
  });

  it('formats wind direction for compact display', () => {
    expect(compassDirection(236)).toBe('SW');
    expect(formatWindReading({ speedKnots: 12.4, directionDegrees: 236, observedAt: '' })).toBe('12 kn SW');
  });
});
