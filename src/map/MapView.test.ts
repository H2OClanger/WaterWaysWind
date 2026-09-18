import { describe, expect, it } from 'vitest';
import { getInitialMapView, LONDON_LOCATION } from './MapView';

describe('getInitialMapView', () => {
  it('centres the initial map on London at the product default zoom', () => {
    expect(getInitialMapView()).toEqual(LONDON_LOCATION);
  });

  it('allows an embedding view to override the defaults', () => {
    expect(getInitialMapView({ longitude: -1.2, latitude: 50.8, zoom: 9 })).toEqual({
      longitude: -1.2,
      latitude: 50.8,
      zoom: 9
    });
  });
});
