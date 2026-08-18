import { describe, expect, it } from 'vitest';
import { renderAppShell } from './AppShell';

describe('renderAppShell', () => {
  it('provides an accessible map target and mobile map controls', () => {
    const markup = renderAppShell({ version: '0.1.0' });

    expect(markup).toContain('id="map"');
    expect(markup).toContain('aria-label="Map controls"');
    expect(markup).toContain('data-map-action="reset"');
    expect(markup).toContain('0.1.0');
  });
});
