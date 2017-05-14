const cacheName = "v1";
import { Promise } from 'es6-promise';

self.addEventListener("install", () => {
    console.log("service worker installed");
});

self.addEventListener('fetch', (event: any) => {
    event.respondWith(fromCache(event.request).catch(() => fromNetwork(event.request)));
});
function fromCache(request) {
    return caches.open(cacheName).then(cache => {
        return cache.match(request)
            .then(result => result ? Promise.resolve(result) : Promise.reject("not in cache"))
            .then(response => {
                fromNetwork(request); //update cache if it's in, otherwise it will grab it
                return response;
            });
    });
}


function fromNetwork(request) {
    return fetch(request, { cache: "no-store" }).then(response => {
        updateCache(request, response.clone());
        return response;
    });
}

function updateCache(request, response) {
    if (request.url.indexOf('chrome-extension://') === -1)
        caches.open(cacheName).then(cache => {
            cache.put(request, response);
        });
}