

const CACHE_NAME = "nature-v1"
const FILES_TO_CACHE = [
    "/",
    
    "/index.html",
    "/profile.html",
    "/css/style.css",
    "/js/index.js",
    "/js/profile.js",
    "/js/note.js",
    "/note.html",
    "/css/note.css"
]

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(keyList){
            console.log(keyList + " keyList")
            let cacheKeepList = keyList.filter(function(key){
                return key.indexOf(CACHE_NAME)
            })
            console.log(cacheKeepList, + " cacheKeepList 1")
            cacheKeepList.push(CACHE_NAME)
            console.log(cacheKeepList, + " cacheKeepList 2")
            return Promise.all(
                keyList.map(function(key, i){
                    if(cacheKeepList.indexOf(key) === -1){
                        return caches.delete(keyList[i])
                    }
                })
            )

        })
    )

  return self.clients.claim();
})
self.addEventListener('fetch', event => {
    // check if request is made by chrome extensions or web page
    // if request is made for web page url must contains http.
    if (!(event.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol
  
    event.respondWith(
      caches
        .match(event.request)
        .then(
          cacheRes =>
            cacheRes ||
            fetch(event.request).then(fetchRes =>
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request.url, fetchRes.clone());
                // check cached items size
               
                return fetchRes;
              })
            )
        )
        .catch(() => caches.match('/'))
    );
  });

