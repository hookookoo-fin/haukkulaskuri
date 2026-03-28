const cacheName = 'haukku-v25'; // MUISTA KASVATTAA TÄTÄ NUMEROA AINA KUN PÄIVITÄT! PÅIVITÄ MYÖS INDEX.HTML VERSIO
const assets = [
  'index.html', 
  'manifest.json', 
  'icon.png', 
  'ohjeet.html', // Lisätty uusi tiedosto listaan
  'koira.jpg'   //Lisätty uusi tiedosto listaan
]; // sw.js poistettu tästä listasta

// ... loppuosa sw.js-tiedostosta säilyy samana ...

self.addEventListener('install', e => {
  // Pakottaa uuden Service Workerin aktivoitumaan heti
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('activate', e => {
  // Poistaa vanhat välimuistit automaattisesti
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
