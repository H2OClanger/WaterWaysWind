import './style.css';

import { bootstrap } from './core/Bootstrap';
import { VERSION_STRING } from './core/Version';

const app = document.querySelector<HTMLElement>('#app');

if (!app) {
  throw new Error('Application root element was not found.');
}

const application = bootstrap();

app.innerHTML = `
  <section class="app-shell" aria-labelledby="app-title">
    <header class="app-header">
      <p class="eyebrow">H2OWyW</p>
      <h1 id="app-title">WaterWaysWind</h1>
      <p class="version">${VERSION_STRING}</p>
    </header>
    <main class="app-content">
      <div class="status-card" role="status">
        <span class="status-indicator" aria-hidden="true"></span>
        <div>
          <h2>Prototype online</h2>
          <p>${application.configuration.applicationName} application core is running.</p>
        </div>
      </div>
    </main>
  </section>
`;
