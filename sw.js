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

async function generatePostCacheKey(request) {
  const body = await request.clone().text();
  const encoder = new TextEncoder();
  const data = encoder.encode(body);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return `${request.url}::${hashHex}`;
}

self.addEventListener("fetch", event => {
  const req = event.request;

  if (req.method === "POST" && req.url.includes("/download")) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cacheKey = await generatePostCacheKey(req);

        try {
          const networkResponse = await fetch(req);
          cache.put(cacheKey, networkResponse.clone());
          return networkResponse;
        } catch (err) {
          const cached = await cache.match(cacheKey);
          return cached || new Response("Mất mạng và chưa có cache dữ liệu!", {
            status: 503,
            statusText: "Offline"
          });
        }
      })()
    );
  }
});
