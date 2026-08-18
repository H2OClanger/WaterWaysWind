import { describe, expect, it } from 'vitest';
import { renderAppShell } from './AppShell';

describe('renderAppShell', () => {
  it('provides accessible controls for the map and user location', () => {
    const markup = renderAppShell({ version: '0.1.0' });

    expect(markup).toContain('id="map"');
    expect(markup).toContain('aria-label="Map controls"');
    expect(markup).toContain('data-map-action="reset"');
    expect(markup).toContain('data-location-action="locate"');
    expect(markup).toContain('0.1.0');
  });
});
