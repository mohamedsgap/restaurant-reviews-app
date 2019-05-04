console.log("Service Worker: is WORKING...");

// const cacheName = 'restaurant-cache-v1';

const cacheFiles = [
'/',
'/index.html',
'/restaurant.html',
'/js/main.js',
'/js/restaurant_info.js',
'/js/dbhelper.js',
'/css/styles.css',
'/data/restaurant.json',
'/img/1.jpg',
'/img/2.jpg',
'/img/3.jpg',
'/img/4.jpg',
'/img/5.jpg',
'/img/6.jpg',
'/img/7.jpg',
'/img/8.jpg',
'/img/9.jpg',
'/img/10.jpg',
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function(response){
            
            if (response) {
                console.log("Found..", e.request, "in cache,");
                return response;
            } 
            
            else {
                console.log("NOT Found..", e.request, "in cache, fetching");
                return fetch(e.request)
                .then(function(response){
                    const responsedClone = response.clone();
                    caches.open('v1').then(function(cache) {
                        cache.put(e.request, responsedClone);
                })
                return response;
            })
            .catch(function(err){
                console.log(err)
            });

            }

        })
    );
});

/*
// Install service worker
self.addEventListener('install ', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

// Remove previous caches..
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
                 cacheName != cacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Fetch cache and add new elements to cache.
self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.open(cacheName).then(function(cache) {
        return cache.match(e.request).then(function (response) {
          return response || fetch(e.request).then(function(response) {
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });

*/