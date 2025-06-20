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

  '/scripts/api/exam.js',
  '/scripts/api/online.js',
  '/scripts/api/quote.js',
  '/scripts/api/timetable.js',
  '/scripts/api/heartbeat.js',

  '/scripts/core/auth.js',
  

  '/scripts/ui/config.js',
  '/scripts/ui/darkmode.js',
  '/scripts/ui/donateModal.js',
  '/scripts/ui/error.js',
  '/scripts/ui/greeting.js',
  '/scripts/ui/logout.js',
  '/scripts/ui/refresh.js',
  '/scripts/ui/tabs.js',

  '/scripts/utils/card.js',
  '/scripts/utils/date.js',
  '/scripts/utils/period.js',
  '/scripts/utils/transform.js',

  '/scripts/mainPage.js',
  '/scripts/main.js',
  '/scripts/login.js',

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