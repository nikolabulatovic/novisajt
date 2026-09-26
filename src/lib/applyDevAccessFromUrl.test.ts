import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  applyDevAccessFromUrl,
  resetDevAccessCacheForTests,
} from '@/src/lib/applyDevAccessFromUrl';
import { DEV_NAV_STORAGE_KEY } from '@/src/lib/devNavAccess';
import { STORY_PACING_STORAGE_KEY } from '@/src/lib/storyPacingAccess';

function createMemoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (key) => map.get(key) ?? null,
    key: (index) => [...map.keys()][index] ?? null,
    removeItem: (key) => {
      map.delete(key);
    },
    setItem: (key, value) => {
      map.set(key, String(value));
    },
  };
}

describe('applyDevAccessFromUrl', () => {
  let storage: Storage;
  let href: string;

  beforeEach(() => {
    resetDevAccessCacheForTests();
    storage = createMemoryStorage();
    href = 'http://localhost/';

    vi.stubGlobal('sessionStorage', storage);
    vi.stubGlobal('window', {
      location: {
        get href() {
          return href;
        },
        get search() {
          return new URL(href).search;
        },
        get pathname() {
          return new URL(href).pathname;
        },
        get hash() {
          return new URL(href).hash;
        },
      },
      history: {
        state: null,
        replaceState: (_state: unknown, _title: string, url: string) => {
          href = new URL(url, 'http://localhost').href;
        },
      },
    });
  });

  afterEach(() => {
    resetDevAccessCacheForTests();
    vi.unstubAllGlobals();
  });

  function setSearch(search: string) {
    const url = new URL(href);
    url.search = search ? `?${search.replace(/^\?/, '')}` : '';
    href = url.href;
  }

  it('nav=1 unlocks nav only', () => {
    setSearch('nav=1');
    expect(applyDevAccessFromUrl()).toEqual({
      showNav: true,
      skipPacing: false,
    });
    expect(storage.getItem(DEV_NAV_STORAGE_KEY)).toBe('1');
    expect(storage.getItem(STORY_PACING_STORAGE_KEY)).toBeNull();
    expect(window.location.search).toBe('');
  });

  it('anim=0 skips pacing only', () => {
    setSearch('anim=0');
    expect(applyDevAccessFromUrl()).toEqual({
      showNav: false,
      skipPacing: true,
    });
    expect(storage.getItem(DEV_NAV_STORAGE_KEY)).toBeNull();
    expect(storage.getItem(STORY_PACING_STORAGE_KEY)).toBe('1');
  });

  it('test=1 unlocks nav and skips pacing', () => {
    setSearch('test=1');
    expect(applyDevAccessFromUrl()).toEqual({
      showNav: true,
      skipPacing: true,
    });
  });

  it('anim can override test for pacing', () => {
    setSearch('test=1&anim=1');
    expect(applyDevAccessFromUrl()).toEqual({
      showNav: true,
      skipPacing: false,
    });
  });

  it('reads persisted session flags when URL is clean', () => {
    storage.setItem(DEV_NAV_STORAGE_KEY, '1');
    expect(applyDevAccessFromUrl()).toEqual({
      showNav: true,
      skipPacing: false,
    });
  });
});
