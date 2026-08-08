import './style.css';

const app = document.querySelector<HTMLElement>('#app');

if (!app) {
  throw new Error('Application root element was not found.');
}

app.innerHTML = `
  <section class="app-shell" aria-labelledby="app-title">
    <header class="app-header">
      <p class="eyebrow">H2OWyW</p>
      <h1 id="app-title">WaterWaysWind</h1>
      <p class="version">v0.1.0-alpha.1</p>
    </header>
    <main class="app-content">
      <div class="status-card">
        <span class="status-indicator" aria-hidden="true"></span>
        <div>
          <h2>Prototype online</h2>
          <p>The TypeScript application foundation is running.</p>
        </div>
      </div>
    </main>
  </section>
`;
