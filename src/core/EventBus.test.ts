import { describe, expect, it } from 'vitest';

import { EventBus } from './EventBus';

describe('EventBus', () => {
  it('delivers typed event payloads to subscribers', () => {
    const events = new EventBus<{ ready: { version: string } }>();
    const received: string[] = [];

    events.on('ready', ({ version }) => received.push(version));
    events.emit('ready', { version: 'v0.1.0-alpha.1' });

    expect(received).toEqual(['v0.1.0-alpha.1']);
  });

  it('allows subscriptions to be removed', () => {
    const events = new EventBus<{ ready: number }>();
    const received: number[] = [];
    const unsubscribe = events.on('ready', (value) => received.push(value));

    events.emit('ready', 1);
    unsubscribe();
    events.emit('ready', 2);

    expect(received).toEqual([1]);
  });
});
