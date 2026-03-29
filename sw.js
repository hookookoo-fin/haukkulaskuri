const cacheName = 'haukku-v28'; // MUISTA KASVATTAA TÄTÄ NUMEROA!
const assets = [
  'index.html', 
  'manifest.json', 
  'icon.png', 
  'ohjeet.html', 
  'pwa-polut.js', // Lisätty uusi tiedosto listaan
  'sw.js' // Itse sw.js poistettu listasta, Selain hakee sen Netilifystä/GitHubista
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});