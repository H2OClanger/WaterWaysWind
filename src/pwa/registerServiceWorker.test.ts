import { describe, expect, it, vi } from 'vitest';
import { registerServiceWorker } from './registerServiceWorker';

describe('registerServiceWorker', () => {
  it('registers the offline shell', async () => {
    const register = vi.fn().mockResolvedValue(undefined);

    await expect(registerServiceWorker({ serviceWorker: { register } })).resolves.toBe(true);
    expect(register).toHaveBeenCalledWith('/service-worker.js');
  });

  it('does nothing when service workers are unavailable', async () => {
    await expect(registerServiceWorker({})).resolves.toBe(false);
  });
});
