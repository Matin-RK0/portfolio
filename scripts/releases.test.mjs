import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectRelease } from './releases.mjs';

const release = (tag_name, overrides = {}) => ({ tag_name, draft: false, prerelease: false, published_at: '2025-01-01T00:00:00Z', ...overrides });

test('selects the highest LTS and skips drafts, prereleases and unpublished releases', () => {
  const best = release('v2.10.0', { name: 'Long-term support (LTS)' });
  const latest = release('v3.0.0');
  const candidates = [release('v5.0.0-lts', { draft: true }), release('v4.0.0-lts', { prerelease: true }), release('v3.2.0-lts', { published_at: null }), release('v2.9.0-LTS'), best, latest];
  assert.deepEqual(selectRelease(candidates, latest), { release: best, channel: 'lts' });
});

test('honors the stable release marked latest, otherwise uses semantic version', () => {
  const latest = release('v2.9.0');
  const higher = release('v2.10.0');
  assert.deepEqual(selectRelease([latest, higher], latest), { release: latest, channel: 'stable' });
  assert.deepEqual(selectRelease([latest, higher], release('v3.0.0', { draft: true })), { release: higher, channel: 'stable' });
  assert.equal(selectRelease([release('v4.0.0', { prerelease: true })], null), null);
});


test('groups shared releases by prefix and sorts each project by version', () => {
  const later = release('songs-cleaner-v1.9.0', { published_at: '2026-02-05T00:00:00Z' });
  const newer = release('songs-cleaner-v1.10.0');
  const ananas = release('ananas-v4.0.0-lts');
  const candidates = [ananas, later, release('songs-cleaner-v9.0.0', { prerelease: true }), newer];
  assert.deepEqual(selectRelease(candidates, ananas, 'songs-cleaner-'), { release: newer, channel: 'stable' });
  assert.deepEqual(selectRelease(candidates, null, 'ananas-'), { release: ananas, channel: 'lts' });
  assert.equal(selectRelease(candidates, ananas, 'hokm-'), null);
});
