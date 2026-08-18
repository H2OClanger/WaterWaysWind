import 'ol/ol.css';
import './style.css';

import { renderAppShell } from './ui/AppShell';
import { bootstrap } from './core/Bootstrap';
import { VERSION_STRING } from './core/Version';
import { createMapView, performMapAction, type MapAction } from './map/MapView';

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

app.querySelectorAll<HTMLButtonElement>('[data-map-action]').forEach((button) => {
  button.addEventListener('click', () => {
    performMapAction(map, button.dataset.mapAction as MapAction);
  });
});

application.logger.info('Base map view initialised');
