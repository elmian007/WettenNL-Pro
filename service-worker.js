const CACHE_NAME = "wettennl-v1";

const BESTANDEN = [
"index.html",
"style.css",
"app.js",
"manifest.json"
];


self.addEventListener("install", event => {

event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {

return cache.addAll(BESTANDEN);

})
);

});


self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)
.then(response => {

return response || fetch(event.request);

})

);

});
