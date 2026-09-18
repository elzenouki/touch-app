// Service Worker بسيط لتطبيق "تاتش الزنوكي" — بيخزن شكل التطبيق (الصفحة + الأيقونات) عشان
// يفتح بسرعة حتى من غير نت، لكن أي طلب بيانات حقيقي (بيع/جرد/توريد...الخ) بيروح للسيرفر على طول
// من غير أي تخزين مؤقت، عشان البيانات تفضل محدّثة دايمًا.
const CACHE_NAME = 'tatsh-zenouki-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // مكالمات الـ API بتاعة Google Apps Script (بيانات حية) — سيبها تعدي عادي من غير تخزين مؤقت
  if (url.includes('script.google.com') || event.request.method !== 'GET') {
    return;
  }

  // شكل التطبيق نفسه (HTML/CSS/JS/أيقونات): جرّب الكاش الأول، ولو مش موجود روح للنت وخزّنه لمرة جاية
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
