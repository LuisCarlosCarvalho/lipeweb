const CACHE_NAME = 'elite-artes-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/cadastro.html',
  '/agenda.html',
  '/comunidade.html',
  '/area-do-aluno.html',
  '/trofeu.html',
  '/contato.html',
  '/novidades.html',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/assets/js/animations.js',
  '/assets/js/form-contato.js',
  '/assets/js/menu.js',
  '/assets/js/agenda.js',
  '/imagens/logo.png',
  '/imagens/banner/01.jpg',
  '/imagens/banner/02.jpg',
  '/imagens/banner/03.jpg',
  '/imagens/aluno/001.jpeg',
  '/assets/img/trofeu-karate.jpg',
  '/assets/img/trofeu-jiu-jitsu.jpg',
  '/assets/img/trofeu-muay-thai.jpg'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});