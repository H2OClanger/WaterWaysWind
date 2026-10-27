export interface AppShellOptions {
  readonly version: string;
}

/** Renders the application chrome independently of the map implementation. */
export function renderAppShell({ version }: AppShellOptions): string {
  return `
    <section class="app-shell" aria-labelledby="app-title">
      <a class="skip-link" href="#map">Skip to interactive map</a>
      <header class="app-header">
        <div>
          <p class="eyebrow">H2OWyW</p>
          <h1 id="app-title">WaterWaysWind</h1>
          <p class="version">${version}</p>
        </div>
        <div class="status-card" role="status" aria-live="polite">
          <span class="status-indicator" aria-hidden="true"></span>
          <span data-app-status>Map ready</span>
        </div>
      </header>
      <main class="app-content">
        <section class="map-panel" aria-label="WaterWaysWind map">
          <p id="map-keyboard-help" class="visually-hidden">Use arrow keys to pan the map, plus and minus to zoom, or use the map controls.</p>
          <div id="map" class="map" tabindex="0" aria-label="Interactive map centred on London" aria-describedby="map-keyboard-help"></div>
          <aside class="wind-card" aria-label="Wind conditions">
            <p class="wind-card__label">Current wind</p>
            <p class="wind-card__reading" data-wind-reading>Loading wind…</p>
            <p class="wind-card__detail">Modelled 10 m wind</p>
            <ol class="wind-card__forecast" data-wind-forecast aria-label="Next twelve hours of wind"></ol>
          </aside>
          <div class="map-controls" role="group" aria-label="Map controls">
            <button type="button" class="map-control" data-map-action="zoom-in" aria-label="Zoom in">+</button>
            <button type="button" class="map-control" data-map-action="zoom-out" aria-label="Zoom out">−</button>
            <button type="button" class="map-control map-control--labelled" data-map-action="reset">Centre London</button>
            <button type="button" class="map-control map-control--labelled" data-location-action="locate">Find me</button>
            <button type="button" class="map-control map-control--labelled" data-boating-action="toggle" aria-pressed="true">Boating info</button>
          </div>
        </section>
      </main>
    </section>
  `;
}
