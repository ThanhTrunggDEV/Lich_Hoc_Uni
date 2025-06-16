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
  '/favicon.ico',
];


const API_URLS = [
  'https://api.nguyenthanhtrung.online/download',

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
  const url = new URL(req.url);



  if (
    req.method === 'POST' &&
    url.pathname.includes('/download')
  ) {
    event.respondWith(
      fetch(req.clone())
        .then((res) => {
          if (res && res.status === 200) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }


  if (API_URLS.some((api) => req.url.includes(api))) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }


  event.respondWith(
    caches.match(req).then((cachedRes) => {
      return cachedRes || fetch(req);
    })
  );
});
