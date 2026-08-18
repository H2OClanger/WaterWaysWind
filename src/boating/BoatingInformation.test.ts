import { describe, expect, it } from 'vitest';
import { THAMES_BOATING_INFORMATION } from './BoatingInformation';

describe('THAMES_BOATING_INFORMATION', () => {
  it('provides uniquely identified Thames reference points', () => {
    const ids = THAMES_BOATING_INFORMATION.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(THAMES_BOATING_INFORMATION).toHaveLength(3);
  });

  it('contains valid geographic coordinates', () => {
    for (const point of THAMES_BOATING_INFORMATION) {
      expect(point.longitude).toBeGreaterThanOrEqual(-180);
      expect(point.longitude).toBeLessThanOrEqual(180);
      expect(point.latitude).toBeGreaterThanOrEqual(-90);
      expect(point.latitude).toBeLessThanOrEqual(90);
    }
  });
});
