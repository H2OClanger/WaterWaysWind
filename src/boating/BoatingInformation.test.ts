import { describe, expect, it } from 'vitest';
import { THAMES_BOATING_INFORMATION } from './BoatingInformation';

describe('THAMES_BOATING_INFORMATION', () => {
  it('provides uniquely identified Thames reference points', () => {
    const ids = THAMES_BOATING_INFORMATION.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(THAMES_BOATING_INFORMATION).toHaveLength(46);
    expect(THAMES_BOATING_INFORMATION.filter(({ kind }) => kind === 'lock')).toHaveLength(45);
  });

  it('includes every lock upstream of Old Windsor', () => {
    const upstreamLockIds = [
      'romney-lock', 'boveney-lock', 'bray-lock', 'boulters-lock', 'cookham-lock',
      'marlow-lock', 'temple-lock', 'hurley-lock', 'hambleden-lock', 'marsh-lock',
      'shiplake-lock', 'sonning-lock', 'caversham-lock', 'mapledurham-lock',
      'whitchurch-lock', 'goring-lock', 'cleeve-lock', 'benson-lock', 'days-lock',
      'clifton-lock', 'culham-lock', 'abingdon-lock', 'sandford-lock', 'iffley-lock',
      'osney-lock', 'godstow-lock', 'kings-lock', 'eynsham-lock', 'pinkhill-lock',
      'northmoor-lock', 'shifford-lock', 'rushey-lock', 'radcot-lock', 'grafton-lock',
      'buscot-lock', 'st-johns-lock'
    ];

    const ids = THAMES_BOATING_INFORMATION.map(({ id }) => id);
    expect(upstreamLockIds).toHaveLength(36);
    expect(ids).toEqual(expect.arrayContaining(upstreamLockIds));
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
