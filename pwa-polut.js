/* pwa-polut.js - Laskee PWA-polut automaattisesti */

// Lasketaan projektin polku (esim. /projektin-nimi/)
const pwaPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

// Päivitetään manifest.json -linkki index.html:ssä
const manifestLink = document.querySelector('link[rel="manifest"]');
if (manifestLink) {
    manifestLink.href = pwaPath + 'manifest.json';
}

// Rekisteröidään Service Worker oikealla polulla
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(pwaPath + 'sw.js')
    .then(reg => {
        reg.addEventListener('updatefound', () => {
            let newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    document.getElementById('update-banner').style.display = 'block';
                }
            });
        });
    })
    .catch(err => console.error('PWA: Service Workerin rekisteröinti epäonnistui:', err));
}