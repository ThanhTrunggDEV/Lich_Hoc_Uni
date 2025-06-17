const CACHE_NAME = 'lichhoc-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/lichhoc.html',
  '/login.html',
  '/about.html',
  '/contact.html',
  '/privacy.html',
  '/terms.html',

  '/css/lichhoc.css',
  '/css/login.css',
  '/css/mainPages.css',
  '/css/shootingstars.css',

  '/scripts/lichhoc.js',
  '/scripts/login.js',
  '/scripts/mainPage.js',

  '/icons/icon1.png',
  '/icons/icon2.png',
  '/icons/ios-icon.png',

  '/manifest.json',
];




self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cachedRes) => {
      return (
        cachedRes ||
        fetch(req)
          .then((networkRes) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, networkRes.clone());
              return networkRes;
            });
          })
          .catch(() => {
            if (req.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
          })
      );
    })
  );
});