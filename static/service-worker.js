const cacheName = "svs-cache-v2.1";
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

self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  // Minimal fetch handler; can be enhanced to cache files
  event.respondWith(fetch(event.request));
});
