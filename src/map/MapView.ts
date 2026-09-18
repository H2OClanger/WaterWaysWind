import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj.js';

export const LONDON_LOCATION = {
  longitude: -0.1276,
  latitude: 51.5074,
  zoom: 11
} as const;

export type MapAction = 'zoom-in' | 'zoom-out' | 'reset';

export interface MapViewOptions {
  readonly target: HTMLElement;
  readonly longitude?: number;
  readonly latitude?: number;
  readonly zoom?: number;
}

export interface MapLocation {
  readonly longitude: number;
  readonly latitude: number;
}

/** Provides the London defaults without requiring a browser map instance. */
export function getInitialMapView(options: Omit<MapViewOptions, 'target'> = {}) {
  return {
    longitude: options.longitude ?? LONDON_LOCATION.longitude,
    latitude: options.latitude ?? LONDON_LOCATION.latitude,
    zoom: options.zoom ?? LONDON_LOCATION.zoom
  };
}

/** Creates the base interactive map used by the application. */
export function createMapView({ target, ...options }: MapViewOptions): Map {
  const initialView = getInitialMapView(options);

  return new Map({
    target,
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([initialView.longitude, initialView.latitude]),
      zoom: initialView.zoom,
      minZoom: 4,
      maxZoom: 19
    })
  });
}

/** Applies UI actions while keeping map behaviour out of the application shell. */
export function performMapAction(map: Map, action: MapAction): void {
  const view = map.getView();

  if (action === 'reset') {
    view.animate({
      center: fromLonLat([LONDON_LOCATION.longitude, LONDON_LOCATION.latitude]),
      zoom: LONDON_LOCATION.zoom,
      duration: 250
    });
    return;
  }

  const zoom = view.getZoom() ?? LONDON_LOCATION.zoom;
  view.animate({ zoom: zoom + (action === 'zoom-in' ? 1 : -1), duration: 150 });
}

/** Recentres the map on a position supplied by the location service. */
export function focusMapOnLocation(map: Map, { longitude, latitude }: MapLocation): void {
  const view = map.getView();
  const zoom = Math.max(view.getZoom() ?? LONDON_LOCATION.zoom, 13);

  view.animate({ center: fromLonLat([longitude, latitude]), zoom, duration: 250 });
}
