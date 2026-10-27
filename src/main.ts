import 'ol/ol.css';
import './style.css';

import { bootstrap } from './core/Bootstrap';
import { VERSION_STRING } from './core/Version';
import { getBrowserLocationProvider, getCurrentLocation } from './location/LocationService';
import { createBoatingInformationLayer } from './map/BoatingInformationLayer';
import {
  createMapView,
  focusMapOnLocation,
  getLocationFromMapCoordinate,
  performMapAction,
  type MapAction,
  type MapLocation
} from './map/MapView';
import { formatWindReading, getCurrentWind, getWindForecast, type WindForecastPoint } from './weather/WindService';
import { registerServiceWorker } from './pwa/registerServiceWorker';
import { renderAppShell } from './ui/AppShell';

const app = document.querySelector<HTMLElement>('#app');

if (!app) {
  throw new Error('Application root element was not found.');
}

const application = bootstrap();
app.innerHTML = renderAppShell({ version: VERSION_STRING });

const mapTarget = app.querySelector<HTMLElement>('#map');

if (!mapTarget) {
  throw new Error('Map target element was not found.');
}

const map = createMapView({ target: mapTarget });
const boatingInformationLayer = createBoatingInformationLayer();
map.addLayer(boatingInformationLayer);

const status = app.querySelector<HTMLElement>('[data-app-status]');
const windLocationLabel = app.querySelector<HTMLElement>('[data-wind-location]');
const windReading = app.querySelector<HTMLElement>('[data-wind-reading]');
const windForecast = app.querySelector<HTMLOListElement>('[data-wind-forecast]');
let windRequestId = 0;

function renderWindForecast(target: HTMLOListElement, forecast: readonly WindForecastPoint[]): void {
  const items = forecast.map((point) => {
    const item = document.createElement('li');
    const time = document.createElement('time');
    const reading = document.createElement('span');

    time.dateTime = point.observedAt;
    time.textContent = point.observedAt.slice(-5);
    reading.textContent = formatWindReading(point);
    item.append(time, reading);
    return item;
  });

  target.replaceChildren(...items);
}

function getApproximateWindLocation({ longitude, latitude }: MapLocation): MapLocation {
  return {
    longitude: Math.round(longitude * 100) / 100,
    latitude: Math.round(latitude * 100) / 100
  };
}

function loadWind(location: MapLocation, label: string): void {
  const requestId = ++windRequestId;

  if (windLocationLabel) windLocationLabel.textContent = `Wind for ${label}`;
  if (windReading) windReading.textContent = 'Loading wind…';
  if (windForecast) windForecast.textContent = '';

  getCurrentWind((input) => fetch(input), location)
    .then((reading) => {
      if (requestId === windRequestId && windReading) windReading.textContent = formatWindReading(reading);
    })
    .catch(() => {
      if (requestId === windRequestId && windReading) windReading.textContent = 'Wind unavailable';
    });

  getWindForecast((input) => fetch(input), location)
    .then((forecast) => {
      if (requestId === windRequestId && windForecast) renderWindForecast(windForecast, forecast);
    })
    .catch(() => {
      if (requestId === windRequestId && windForecast) windForecast.textContent = 'Forecast unavailable';
    });
}

loadWind({ latitude: 51.5074, longitude: -0.1276 }, 'London');

map.on('singleclick', ({ coordinate }) => {
  loadWind(getApproximateWindLocation(getLocationFromMapCoordinate(coordinate)), 'selected map area');
  if (status) status.textContent = 'Wind updated for selected map area';
});

app.querySelectorAll<HTMLButtonElement>('[data-map-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.mapAction;

    if (action === 'zoom-in' || action === 'zoom-out' || action === 'reset') {
      performMapAction(map, action as MapAction);
    }
  });
});

const locationButton = app.querySelector<HTMLButtonElement>('[data-location-action="locate"]');

locationButton?.addEventListener('click', async () => {
  const provider = getBrowserLocationProvider();

  if (!provider) {
    if (status) status.textContent = 'Location is not supported';
    return;
  }

  locationButton.disabled = true;
  if (status) status.textContent = 'Finding your location…';

  try {
    focusMapOnLocation(map, await getCurrentLocation(provider));
    if (status) status.textContent = 'Map centred on your location; tap the map to update wind';
  } catch {
    if (status) status.textContent = 'Location is unavailable';
  } finally {
    locationButton.disabled = false;
  }
});

const boatingButton = app.querySelector<HTMLButtonElement>('[data-boating-action="toggle"]');

boatingButton?.addEventListener('click', () => {
  const visible = !boatingInformationLayer.getVisible();
  boatingInformationLayer.setVisible(visible);
  boatingButton.setAttribute('aria-pressed', String(visible));
  if (status) status.textContent = visible ? 'Boating information shown' : 'Boating information hidden';
});

const serviceWorkerHost = {
  navigator: typeof navigator !== 'undefined' ? navigator : {}
};

registerServiceWorker(serviceWorkerHost).catch(() => application.logger.info('Service worker registration failed'));
application.logger.info('Base map and boating-information layer initialised');
