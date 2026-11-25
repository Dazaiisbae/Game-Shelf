// Game Shelf offline support. The app page always comes fresh from GitHub when you're online
// (so an upload shows up right away), and from the saved copy when you're offline.
const CACHE = 'game-shelf-v28';
const FILES = ['./', './index.html', './manifest.webmanifest', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // the app's "is there an update?" check always goes straight to GitHub
  if (url.searchParams.has('gscheck')) { e.respondWith(fetch(e.request, { cache:'no-store' })); return; }
  // the app page itself: newest first, saved copy if offline
  const isPage = e.request.mode === 'navigate' || (url.origin === location.origin && /\/(index\.html)?$/.test(url.pathname));
  if (isPage){
    e.respondWith(fetch(e.request, { cache:'no-cache' }).then(r => { if (r.ok){ const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; })
      .catch(() => caches.open(CACHE).then(c => c.match(e.request).then(m => m || c.match('./index.html')))));
    return;
  }
  // icons and other files: saved copy first, refreshed in the background
  e.respondWith(caches.open(CACHE).then(async c => {
    const cached = await c.match(e.request);
    const fresh = fetch(e.request).then(r => { if (r.ok && url.origin === location.origin) c.put(e.request, r.clone()); return r; }).catch(() => cached);
    return cached || fresh;
  }));
});
