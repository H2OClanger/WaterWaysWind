import { describe, expect, it } from 'vitest';
import { renderAppShell } from './AppShell';

describe('renderAppShell', () => {
  it('provides mobile-friendly, accessible controls for the map, location, and boating information', () => {
    const markup = renderAppShell({ version: '0.1.0' });

    expect(markup).toContain('href="#map"');
    expect(markup).toContain('id="map"');
    expect(markup).toContain('tabindex="0"');
    expect(markup).toContain('aria-describedby="map-keyboard-help"');
    expect(markup).toContain('id="map-keyboard-help"');
    expect(markup).toContain('aria-label="Map controls"');
    expect(markup).toContain('data-map-action="zoom-in"');
    expect(markup).toContain('data-map-action="zoom-out"');
    expect(markup).toContain('data-map-action="reset"');
    expect(markup).toContain('data-location-action="locate"');
    expect(markup).toContain('data-boating-action="toggle"');
    expect(markup).toContain('aria-pressed="true"');
    expect(markup).toContain('data-wind-reading');
    expect(markup).toContain('data-wind-forecast');
    expect(markup).toContain('Next twelve hours of wind');
    expect(markup).toContain('0.1.0');
  });
});
