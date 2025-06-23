const CACHE_NAME = 'lichhoc-v4';
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
  '/css/mainPageStyle.css',
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
    caches.open(CACHE_NAME).then(async (cache) => {
      for(const url of STATIC_ASSETS){
        try{
          await cache.add(url);
        }catch(err){
          console.warn(`Lỗi khi cache file: ${url}`);
        }
      }
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
  const url = new URL(req.url);
  if (url.pathname === '/online-users') {
    event.respondWith(fetch(req));
    return;
  }
  if (req.method !== 'GET' || (url.protocol !== 'http:' && url.protocol !== 'https:')) return;

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