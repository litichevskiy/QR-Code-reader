const CACHE_NAME = ['v-1-1614459881461'];

const FILES_TO_CACHE = [
  '/',
  '/manifest.json',
  '/dist/js/bundle.js',
  '/dist/css/bundle.css',
  'images/favicon.ico',
  'images/icons/arrow-left.svg',
  'images/icons/copy.svg',
  'images/icons/lamp.svg',
  'images/icons/power.svg',
  'images/icons/qr-code.svg',
];

self.addEventListener('activate', ( event ) => {
  event.waitUntil(
    caches.keys().then( keyList => {
      return Promise.all(keyList.map( key => {
        if (CACHE_NAME.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('install', ( event ) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open( CACHE_NAME[0] )
    .then( cache => {
      return cache.addAll( FILES_TO_CACHE );
    })
  );
});

self.addEventListener('fetch', ( event ) => {
  event.respondWith(
    caches.match(event.request)
    .then( response => {
      return response || fetch(event.request);
    })
  );
});