import { describe, expect, it } from 'vitest';
import { renderAppShell } from './AppShell';

describe('renderAppShell', () => {
  it('provides mobile-friendly, accessible controls for the map and user location', () => {
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
    expect(markup).not.toContain('boating');
    expect(markup).toContain('0.1.0');
  });
});
