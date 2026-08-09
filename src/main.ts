import 'ol/ol.css';
import './style.css';

import { bootstrap } from './core/Bootstrap';
import { VERSION_STRING } from './core/Version';
import { createMapView } from './map/MapView';

const app = document.querySelector<HTMLElement>('#app');

if (!app) {
  throw new Error('Application root element was not found.');
}

const application = bootstrap();

app.innerHTML = `
  <section class="app-shell" aria-labelledby="app-title">
    <header class="app-header">
      <div>
        <p class="eyebrow">H2OWyW</p>
        <h1 id="app-title">WaterWaysWind</h1>
        <p class="version">${VERSION_STRING}</p>
      </div>
      <div class="status-card" role="status" aria-live="polite">
        <span class="status-indicator" aria-hidden="true"></span>
        <span>Map ready</span>
      </div>
    </header>
    <main class="app-content">
      <section class="map-panel" aria-label="WaterWaysWind map">
        <div id="map" class="map" aria-label="Interactive map centred on London"></div>
      </section>
    </main>
  </section>
`;

const mapTarget = document.querySelector<HTMLElement>('#map');

if (!mapTarget) {
  throw new Error('Map target element was not found.');
}

createMapView({ target: mapTarget });
application.logger.info('Map view initialised');
