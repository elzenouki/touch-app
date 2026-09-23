// Service Worker بسيط لتطبيق "تاتش الزنوكي" — بيخزن الأيقونات بس عشان تفتح بسرعة حتى من غير
// نت، لكن صفحة index.html نفسها بتيجي من النت على طول كل مرة (Network First) عشان أي تحديث
// (زي تغيير لينك السيرفر) يوصل فورًا من غير ما نحتاج نعمل bump يدوي في اسم الكاش كل مرة.
// ملحوظة: v2 هنا لأن v1 كانت بتخزن index.html نفسها وسبّبت مشكلة إن تحديث الكود القديم فضل
// شغال من الكاش حتى بعد إصلاحه على GitHub — النسخة دي بتتفادى المشكلة دي تمامًا.
const CACHE_NAME = 'tatsh-zenouki-v2';
const APP_SHELL = [
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  // ملحوظة: متعمدين مش بننادي self.skipWaiting() هنا — النسخة الجديدة بتفضل "مستنية" لحد ما
  // المندوب نفسه يدوس على زرار "تحديث الآن" في التطبيق (شريط التحديث)، عشان منعملوش reload
  // فجأة وهو لسه في نص إدخال فاتورة ويضيع عليه اللي داخله. القفزة للتفعيل بتحصل بس لما نستقبل
  // رسالة SKIP_WAITING تحت من صفحة التطبيق.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// بتستقبل أمر التفعيل الفوري من صفحة التطبيق لما المندوب يدوس "تحديث الآن" في شريط التحديث —
// من غير الرسالة دي، النسخة الجديدة هتفضل مستنية لحد ما التطبيق يتقفل ويتفتح تاني لوحده
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // مكالمات الـ API بتاعة Google Apps Script (بيانات حية) — سيبها تعدي عادي من غير تخزين مؤقت
  if (url.includes('script.google.com') || event.request.method !== 'GET') {
    return;
  }

  // صفحة الـ HTML نفسها (index.html أو المسار الرئيسي): النت أولًا دايمًا عشان أي تحديث يوصل
  // فورًا، والكاش يستخدم بس لو مفيش نت خالص (احتياطي).
  const isHtmlRequest = event.request.mode === 'navigate' || url.endsWith('/') || url.endsWith('index.html');
  if (isHtmlRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // باقي ملفات الشكل (أيقونات/manifest): جرّب الكاش الأول، ولو مش موجود روح للنت وخزّنه لمرة جاية
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
