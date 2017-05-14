const cacheName = "v1";

self.addEventListener("install", () => {
    console.log("service worker installed");
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fromCache(event.request).catch(() => fromNetwork(event.request)));
});

function fromCache(request) {
    return caches.open(cacheName).then(cache => {
        return cache.match(request)
            .then(result => result || Promise.reject())
            .then(response => {
                fromNetwork(request);
                return response;
            });
    });
}


function fromNetwork(request) {
    return fetch(request, { cache: "reload" }).then(response => {
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