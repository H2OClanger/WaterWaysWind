import 'ol/ol.css';
import './style.css';

import { bootstrap } from './core/Bootstrap';
import { VERSION_STRING } from './core/Version';
import { getBrowserLocationProvider, getCurrentLocation } from './location/LocationService';
import { createBoatingInformationLayer } from './map/BoatingInformationLayer';
import { createMapView, focusMapOnLocation, performMapAction, type MapAction } from './map/MapView';
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
    if (status) status.textContent = 'Map centred on your location';
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

registerServiceWorker(window).catch(() => application.logger.info('Service worker registration failed'));
application.logger.info('Base map and boating-information layer initialised');
