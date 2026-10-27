import { describe, expect, it } from 'vitest';
import { THAMES_BOATING_INFORMATION } from './BoatingInformation';

describe('THAMES_BOATING_INFORMATION', () => {
  it('contains every non-tidal Thames lock and the Barrier reference marker', () => {
    expect(THAMES_BOATING_INFORMATION).toHaveLength(46);
    expect(THAMES_BOATING_INFORMATION.filter(({ kind }) => kind === 'lock')).toHaveLength(45);
  });

  it('uses unique reference identifiers and valid coordinates', () => {
    const ids = THAMES_BOATING_INFORMATION.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const point of THAMES_BOATING_INFORMATION) {
      expect(point.longitude).toBeGreaterThanOrEqual(-180);
      expect(point.longitude).toBeLessThanOrEqual(180);
      expect(point.latitude).toBeGreaterThanOrEqual(-90);
      expect(point.latitude).toBeLessThanOrEqual(90);
    }
  });
});
