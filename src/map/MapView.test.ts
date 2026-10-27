import { describe, expect, it } from 'vitest';
import { fromLonLat } from 'ol/proj.js';
import { getInitialMapView, getLocationFromMapCoordinate, LONDON_LOCATION } from './MapView';

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

describe('getLocationFromMapCoordinate', () => {
  it('converts an OpenLayers coordinate into a geographic location', () => {
    const location = getLocationFromMapCoordinate(fromLonLat([-0.1276, 51.5074]));

    expect(location.longitude).toBeCloseTo(-0.1276, 5);
    expect(location.latitude).toBeCloseTo(51.5074, 5);
  });
});
