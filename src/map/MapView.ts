import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj.js';

export interface MapViewOptions {
  readonly target: HTMLElement;
  readonly longitude?: number;
  readonly latitude?: number;
  readonly zoom?: number;
}

/** Creates the base interactive map used by the application. */
export function createMapView({
  target,
  longitude = -0.1276,
  latitude = 51.5074,
  zoom = 11
}: MapViewOptions): Map {
  return new Map({
    target,
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: fromLonLat([longitude, latitude]),
      zoom,
      minZoom: 4,
      maxZoom: 19
    })
  });
}
