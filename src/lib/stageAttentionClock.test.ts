import { describe, expect, it } from 'vitest';

import { StageAttentionClock } from '@/src/lib/stageAttentionClock';

function createClock(options?: {
  idleMs?: number;
  maxMs?: number;
  visible?: { current: boolean };
}) {
  let now = 0;
  const timers = new Map<number, { callback: () => void; fireAt: number }>();
  let nextTimerId = 1;
  const visible = options?.visible ?? { current: true };

  const clock = new StageAttentionClock({
    now: () => now,
    isVisible: () => visible.current,
    idleMs: options?.idleMs ?? 60_000,
    maxMs: options?.maxMs ?? 10 * 60_000,
    setTimeoutFn: (callback, ms) => {
      const id = nextTimerId++;
      timers.set(id, { callback, fireAt: now + ms });
      return id;
    },
    clearTimeoutFn: (id) => {
      timers.delete(id as number);
    },
  });

  /** Advance time and deliver due idle timers (normal runtime). */
  const advance = (ms: number) => {
    now += ms;
    for (const [id, timer] of [...timers.entries()]) {
      if (timer.fireAt <= now) {
        timers.delete(id);
        timer.callback();
      }
    }
  };

  /**
   * Jump the wall clock without delivering timers (throttled / slept tab).
   * Forces {@link StageAttentionClock.takeElapsedMs} idle sync path.
   */
  const jumpWithoutTimers = (ms: number) => {
    now += ms;
    timers.clear();
  };

  return { clock, advance, jumpWithoutTimers, visible };
}

describe('StageAttentionClock', () => {
  it('counts engaged time until takeElapsedMs', () => {
    const { clock, advance } = createClock();
    clock.resetForStage();
    advance(5_000);
    expect(clock.takeElapsedMs()).toBe(5_000);
  });

  it('pauses after idle timeout and does not keep counting', () => {
    const { clock, advance } = createClock({ idleMs: 60_000 });
    clock.resetForStage();
    advance(60_025); // idle timer (+25ms slack) fires
    advance(120_000); // AFK — should not count
    expect(clock.takeElapsedMs()).toBe(60_000);
  });

  it('when timers never fire, credits only through lastActivity + idle', () => {
    const { clock, jumpWithoutTimers } = createClock({ idleMs: 60_000 });
    clock.resetForStage();
    jumpWithoutTimers(600_000);
    expect(clock.takeElapsedMs()).toBe(60_000);
  });

  it('resumes counting after activity following idle', () => {
    const { clock, advance } = createClock({ idleMs: 60_000 });
    clock.resetForStage();
    advance(60_025);
    clock.noteActivity();
    advance(3_000);
    expect(clock.takeElapsedMs()).toBe(63_000);
  });

  it('stops while hidden and resumes on visible', () => {
    const visible = { current: true };
    const { clock, advance } = createClock({ visible });
    clock.resetForStage();
    advance(2_000);
    visible.current = false;
    clock.onHidden();
    advance(50_000);
    visible.current = true;
    clock.onVisible();
    advance(4_000);
    expect(clock.takeElapsedMs()).toBe(6_000);
  });

  it('does not start a segment while hidden even if activity fires', () => {
    const visible = { current: false };
    const { clock, advance } = createClock({ visible });
    clock.resetForStage();
    clock.noteActivity();
    advance(10_000);
    expect(clock.takeElapsedMs()).toBe(0);
  });

  it('caps elapsed time at maxMs', () => {
    const { clock, advance } = createClock({
      idleMs: 60_000,
      maxMs: 10_000,
    });
    clock.resetForStage();
    advance(5_000);
    clock.noteActivity();
    advance(5_000);
    clock.noteActivity();
    advance(5_000);
    expect(clock.takeElapsedMs()).toBe(10_000);
  });

  it('resets accumulation on resetForStage', () => {
    const { clock, advance } = createClock();
    clock.resetForStage();
    advance(8_000);
    clock.resetForStage();
    advance(2_000);
    expect(clock.takeElapsedMs()).toBe(2_000);
  });

  it('large wall-clock jumps without timers do not invent extra idle credit', () => {
    const { clock, advance, jumpWithoutTimers } = createClock({
      idleMs: 60_000,
    });
    clock.resetForStage();
    advance(10_000);
    clock.noteActivity();
    jumpWithoutTimers(24 * 60 * 60_000);
    // 10s engaged + 60s idle window after last activity bump
    expect(clock.takeElapsedMs()).toBe(70_000);
  });
});
