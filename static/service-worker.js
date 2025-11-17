const cacheName = "svs-cache-v1";
const assetsToCache = [
  "/",
  "/static/css/styles.css",
  "/static/js/main.js",
  "/static/icons/icon-192.png",
  "/static/icons/icon-512.png",
  "/static/icons/icon-1024.png"
];

// Install Service Worker
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});

// Fetch cached assets
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
