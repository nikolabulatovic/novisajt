import {
  STAGE_ATTENTION_IDLE_MS,
  STAGE_ATTENTION_MAX_MS,
} from '@/src/lib/tracking';

export type StageAttentionClockDeps = {
  now?: () => number;
  setTimeoutFn?: (callback: () => void, ms: number) => unknown;
  clearTimeoutFn?: (id: unknown) => void;
  isVisible?: () => boolean;
  idleMs?: number;
  maxMs?: number;
};

/**
 * Pure stage attention timer (no DOM / React).
 * Hook wires visibility + input events; unit tests drive this directly.
 */
export class StageAttentionClock {
  private accumulatedMs = 0;
  private segmentStartedAt: number | null = null;
  private lastActivityAt = 0;
  private idleTimerId: unknown = null;

  private readonly now: () => number;
  private readonly setTimeoutFn: (callback: () => void, ms: number) => unknown;
  private readonly clearTimeoutFn: (id: unknown) => void;
  private readonly isVisible: () => boolean;
  private readonly idleMs: number;
  private readonly maxMs: number;

  constructor(deps: StageAttentionClockDeps = {}) {
    this.now = deps.now ?? (() => Date.now());
    this.setTimeoutFn =
      deps.setTimeoutFn ?? ((callback, ms) => setTimeout(callback, ms));
    this.clearTimeoutFn =
      deps.clearTimeoutFn ??
      ((id) => clearTimeout(id as ReturnType<typeof setTimeout>));
    this.isVisible = deps.isVisible ?? (() => true);
    this.idleMs = deps.idleMs ?? STAGE_ATTENTION_IDLE_MS;
    this.maxMs = deps.maxMs ?? STAGE_ATTENTION_MAX_MS;
  }

  resetForStage() {
    this.accumulatedMs = 0;
    this.segmentStartedAt = null;
    this.clearIdleTimer();
    this.lastActivityAt = this.now();
    this.startSegment();
  }

  takeElapsedMs() {
    this.syncIdleFromWallClock();
    this.pauseSegment();
    const elapsed = Math.min(this.accumulatedMs, this.maxMs);
    this.accumulatedMs = 0;
    return elapsed;
  }

  noteActivity() {
    this.lastActivityAt = this.now();
    if (!this.isVisible()) return;
    if (this.segmentStartedAt === null) {
      this.startSegment();
      return;
    }
    this.scheduleIdleCheck();
  }

  /** Tab became hidden — stop counting immediately. */
  onHidden() {
    this.pauseSegment();
  }

  /** Tab visible again — counts as attention and restarts the idle window. */
  onVisible() {
    this.lastActivityAt = this.now();
    this.startSegment();
  }

  destroy() {
    this.clearIdleTimer();
  }

  private clearIdleTimer() {
    if (this.idleTimerId === null) return;
    this.clearTimeoutFn(this.idleTimerId);
    this.idleTimerId = null;
  }

  private pauseSegment(endedAt = this.now()) {
    if (this.segmentStartedAt === null) return;
    this.accumulatedMs += Math.max(0, endedAt - this.segmentStartedAt);
    this.segmentStartedAt = null;
    this.clearIdleTimer();
  }

  private scheduleIdleCheck() {
    this.clearIdleTimer();
    if (!this.isVisible() || this.segmentStartedAt === null) return;

    const msUntilIdle = this.idleMs - (this.now() - this.lastActivityAt);

    this.idleTimerId = this.setTimeoutFn(
      () => {
        this.idleTimerId = null;
        const idleAt = this.lastActivityAt + this.idleMs;
        if (this.now() >= idleAt) {
          this.pauseSegment(idleAt);
          return;
        }
        this.scheduleIdleCheck();
      },
      Math.max(0, msUntilIdle) + 25,
    );
  }

  private startSegment() {
    if (!this.isVisible() || this.segmentStartedAt !== null) return;
    this.segmentStartedAt = this.now();
    this.scheduleIdleCheck();
  }

  /**
   * If the idle window already passed (timer throttled / slept), credit only
   * through lastActivity + idle — never through “now”.
   */
  private syncIdleFromWallClock() {
    if (this.segmentStartedAt === null) return;
    const idleAt = this.lastActivityAt + this.idleMs;
    if (this.now() < idleAt) return;
    this.pauseSegment(idleAt);
  }
}
