self.addEventListener("install", (e) => {
e.waitUntil(
caches.open("pwa-pos-cache-v1").then((cache) => {
return cache.addAll([
"/",
"/index.html",
"/manifest.json",
"/icon-192.png",
"/icon-512.png"
]);
})
);
self.skipWaiting();
});


self.addEventListener("activate", (e) => {
e.waitUntil(caches.keys().then((keys) => {
return Promise.all(
keys.filter((k) => k !== "pwa-pos-cache-v1").map((k) => caches.delete(k))
);
}));
});


self.addEventListener("fetch", (e) => {
e.respondWith(
caches.match(e.request).then((cacheRes) => {
return cacheRes || fetch(e.request);
})
);
});const CACHE_NAME = "hardware-pos-v1";
const FILES = [
"./",
"index.html",
"app.js",
"manifest.json"
];


self.addEventListener("install", event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
);
});


self.addEventListener("fetch", event => {
event.respondWith(
caches.match(event.request).then(resp => resp || fetch(event.request))
);
});