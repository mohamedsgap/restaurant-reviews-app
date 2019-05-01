console.log("Service Worker: is WORKING...");


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