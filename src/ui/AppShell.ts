export interface AppShellOptions {
  readonly version: string;
}

/** Renders the application chrome independently of the map implementation. */
export function renderAppShell({ version }: AppShellOptions): string {
  return `
    <section class="app-shell" aria-labelledby="app-title">
      <header class="app-header">
        <div>
          <p class="eyebrow">H2OWyW</p>
          <h1 id="app-title">WaterWaysWind</h1>
          <p class="version">${version}</p>
        </div>
        <div class="status-card" role="status" aria-live="polite">
          <span class="status-indicator" aria-hidden="true"></span>
          <span>Base map ready</span>
        </div>
      </header>
      <main class="app-content">
        <section class="map-panel" aria-label="WaterWaysWind map">
          <div id="map" class="map" aria-label="Interactive map centred on London"></div>
          <div class="map-controls" role="group" aria-label="Map controls">
            <button type="button" class="map-control" data-map-action="zoom-in" aria-label="Zoom in">+</button>
            <button type="button" class="map-control" data-map-action="zoom-out" aria-label="Zoom out">−</button>
            <button type="button" class="map-control map-control--labelled" data-map-action="reset">Centre London</button>
          </div>
        </section>
      </main>
    </section>
  `;
}
