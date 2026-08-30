/**
 * Heuristic GPU tier for gating expensive CSS (`filter: blur`, `backdrop-filter`).
 * Not perfect — browsers may hide the renderer — but catches known weak mobile GPUs
 * (e.g. Adreno 506 on Moto G7 Power) where those effects can black-screen the page.
 */

export type GpuEffectsTier = 'full' | 'reduced';

const CACHE_KEY = 'saznaj.gpuEffectsTier.v2';

function readCachedTier(): GpuEffectsTier | null {
  try {
    const value = sessionStorage.getItem(CACHE_KEY);
    if (value === 'full' || value === 'reduced') return value;
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

function writeCachedTier(tier: GpuEffectsTier): void {
  try {
    sessionStorage.setItem(CACHE_KEY, tier);
  } catch {
    /* ignore */
  }
}

function getWebGlRenderer(): string | null {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl', { powerPreference: 'low-power' }) ??
      canvas.getContext('experimental-webgl');
    if (!gl || !(gl instanceof WebGLRenderingContext)) return null;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return null;

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    const lose = gl.getExtension('WEBGL_lose_context');
    lose?.loseContext();
    return typeof renderer === 'string' ? renderer : null;
  } catch {
    return null;
  }
}

/** Adreno 506 and peers choke on stacked CSS blurs; ~620+ is usually fine. */
function classifyAdreno(renderer: string): GpuEffectsTier | null {
  const match = renderer.match(/adreno[^0-9]*(\d{3,4})/i);
  if (!match) {
    return /adreno/i.test(renderer) ? 'reduced' : null;
  }
  const model = Number(match[1]);
  return model < 620 ? 'reduced' : 'full';
}

function classifyMali(renderer: string): GpuEffectsTier | null {
  if (!/mali/i.test(renderer)) return null;
  // Old Midgard / early Bifrost: weak for backdrop-filter stacks.
  if (/mali-t\d/i.test(renderer)) return 'reduced';
  if (/mali-g(31|51|52|71|72|76)\b/i.test(renderer)) return 'reduced';
  return 'full';
}

function classifyPowerVr(renderer: string): GpuEffectsTier | null {
  if (!/powervr|sgx|ge8\d{3}/i.test(renderer)) return null;
  // Apple GPUs also report via ANGLE Metal — handled as full below.
  if (/apple/i.test(renderer)) return 'full';
  return 'reduced';
}

/** Samsung Xclipse (Exynos, e.g. Galaxy S22 EU) — fine for our blur budget. */
function classifyXclipse(renderer: string): GpuEffectsTier | null {
  if (!/xclipse/i.test(renderer)) return null;
  return 'full';
}

function classifyRenderer(renderer: string): GpuEffectsTier | null {
  const lower = renderer.toLowerCase();

  if (
    lower.includes('swiftshader') ||
    lower.includes('llvmpipe') ||
    lower.includes('softpipe') ||
    lower.includes('microsoft basic render')
  ) {
    return 'reduced';
  }

  // Apple / desktop discrete — fine for our effect budget.
  if (
    lower.includes('apple gpu') ||
    lower.includes('apple m') ||
    lower.includes('metal renderer: apple') ||
    lower.includes('nvidia') ||
    lower.includes('geforce') ||
    lower.includes('radeon') ||
    lower.includes('amd ')
  ) {
    return 'full';
  }

  return (
    classifyAdreno(renderer) ??
    classifyMali(renderer) ??
    classifyXclipse(renderer) ??
    classifyPowerVr(renderer)
  );
}

function classifyFromDeviceHints(): GpuEffectsTier {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 8;
  const ua = navigator.userAgent;
  const isAndroid = /Android/i.test(ua);

  // Chromium exposes approximate RAM in GB; G7 Power is typically 3–4.
  // Only treat clearly low-end hints as reduced — a blanket "unknown mobile →
  // reduced" false-positived capable phones when WEBGL_debug_renderer_info
  // was blocked (common on Android Chrome / Brave).
  if (typeof memory === 'number' && memory <= 2) return 'reduced';
  if (isAndroid && typeof memory === 'number' && memory <= 4) return 'reduced';
  if (isAndroid && cores <= 4) return 'reduced';

  return 'full';
}

/**
 * Returns whether heavy CSS GPU effects are safe.
 * Prefers WebGL renderer classification; falls back to memory / UA hints.
 */
export function detectGpuEffectsTier(): GpuEffectsTier {
  if (typeof window === 'undefined') return 'reduced';

  const cached = readCachedTier();
  if (cached) return cached;

  const renderer = getWebGlRenderer();
  const fromRenderer = renderer ? classifyRenderer(renderer) : null;
  const tier = fromRenderer ?? classifyFromDeviceHints();

  writeCachedTier(tier);
  return tier;
}
