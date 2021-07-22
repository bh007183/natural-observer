

const CACHE_NAME = "nature-v1"
const FILES_TO_CACHE = [
    "/",
    "./index.html",
    "./profile.html",
    "./css/style.css",
    "./js/index.js",
    "./js/profile.js",
    "./js/note.js",
    "./note.html",
    "./css/note.css"
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

self.addEventListener("fetch", function(event){
    if(event.request.url.includes("/api/")){
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request).then(response => {
                    if(response.status === 200){
                        cache.put(event.request.url, response.clone())
                    }
                    return response
                })
                .catch(err => {
                    return cache.match(event.request)
                })
            }).catch(err => console.log(err))
        )
        return

    }
    
    event.respondWith(
        
        fetch(event.request).catch(function(err){
            
            console.log(event.request)
            return caches.open(CACHE_NAME).then(response => {
                console.log(response)
                // if(response){
                //     console.log("line 75")
                //     return response
                // }else 
                console.log(caches)
                console.log(event.request.headers.get('accept'))
                if(event.request.headers.get("accept").includes("text/html")){
                    console.log(caches.match("/"))
                    return caches.match("/")
                }
            })
        })
    )
})