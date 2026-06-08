// assets/code/sw.js
// Service Worker for EPUB 3 Completer - Offline ready

const CACHE_NAME = 'epub-completer-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/icon-transparent.png',
  '/assets/icons/icon-transparent.png',
  '/assets/code/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://cdn.jsdelivr.net/gh/Allwaysever/SuperRoundedUI/fonts/outfit-Regular.ttf',
  'https://cdn.jsdelivr.net/gh/Allwaysever/SuperRoundedUI/fonts/outfit-Medium.ttf',
  'https://cdn.jsdelivr.net/gh/Allwaysever/SuperRoundedUI/fonts/outfit-Bold.ttf'
];

// Install: cache semua aset statis yang diketahui
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch((err) => console.error('Pre-cache gagal:', err))
  );
  self.skipWaiting(); // aktifkan service worker baru segera
});

// Activate: hapus cache lama dan klaim kendali atas semua klien
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Strategi fetch:
// - Navigasi (halaman HTML) -> network-first, fallback ke cache
// - Aset statis (CSS, JS, font, gambar) -> cache-first, lalu update background
// - Lainnya -> network-first dengan fallback cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Abaikan metode selain GET
  if (request.method !== 'GET') return;

  // ----- Navigasi (halaman utama) -----
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => {
            if (cached) return cached;
            // Fallback ke index.html jika tidak ada cache navigasi
            return caches.match('/index.html');
          })
        )
    );
    return;
  }

  // ----- Aset statis berdasarkan tipe (CSS, JS, font, gambar) -----
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    request.destination === 'image'
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Stale-while-revalidate: perbarui cache di latar belakang
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse.clone()));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }
        // Tidak ada di cache: ambil dari jaringan, simpan, lalu kembalikan
        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Fallback gambar jika diperlukan
            if (request.destination === 'image') {
              return caches.match('/assets/icon-transparent.png');
            }
            // Untuk tipe lain tidak ada fallback
            return new Response('', { status: 404, statusText: 'Not Found' });
          });
      })
    );
    return;
  }

  // ----- Permintaan lain (API, data, dll) -----
  event.respondWith(
    fetch(request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return response;
      })
      .catch(() => caches.match(request))
  );
});