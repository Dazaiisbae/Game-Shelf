// Game Shelf offline support: serve the app from cache, refresh it in the background.
const CACHE = 'game-shelf-v26';
const FILES = ['./', './index.html', './manifest.webmanifest', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // the app's "is there an update?" check always goes straight to GitHub
  if (new URL(e.request.url).searchParams.has('gscheck')) { e.respondWith(fetch(e.request, { cache:'no-store' })); return; }
  e.respondWith(caches.open(CACHE).then(async c => {
    const cached = await c.match(e.request);
    const fresh = fetch(e.request).then(r => { if (r.ok && new URL(e.request.url).origin === location.origin) c.put(e.request, r.clone()); return r; }).catch(() => cached);
    return cached || fresh;
  }));
});
