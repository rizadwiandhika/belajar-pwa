// membuat memori cache
const staticCacheName = "site-static-v30"
const dynamicCacheName = "site-dynamic-v30"
// const dynamicCacheName = "site-dynamic-v2"
// membuat list apa aja yg mau disimpan di cache
const assets = [
	"/",
	"/index.html",
	"/js/app.js",
	"/js/ui.js",
	"/js/materialize.min.js",
	"/css/materialize.min.css",
	"/css/styles.css",
	"/img/dish.png",
	"https://fonts.googleapis.com/icon?family=Material+Icons",
	"/pages/error.html"
]

// 2. Menginstall SW
self.addEventListener( "install", (evt) => {
	console.log( "SW Installation SUCCESS" )
	// tunggu proses di dalam ini selesai, baru jalankan yg lain
	evt.waitUntil(
		// membuat cache baru
		caches
			.open( staticCacheName )
			.then( (cache) => {
				console.log( "Berhasil di cache" )
				cache.addAll( assets )
			} )
	)
} )

// 3. Aktivasi SW
self.addEventListener( "activate", (evt) => {
	console.log( "SW Activitation SUCCESS" )

	// Tambahin in biar cache baru akan me-replace cache lama
	// Setelah itu jng lupa click skip-wating cache nya di Application
	// 
	// Kalo gak ada ini, walaupun kita click skip-waiting cache baru
	// Nanti jadinya ada 2 cache. Browser bingung mau pake cache yg mana...
	// Maka diperlukan ini agar cache lama ter-replace dengan cache baru

	/**
	 * So, the waitUntil method is used to tell the browser not to terminate the service worker 
	 * until the promise passed to waitUntil is either resolved or rejected.
	 */
	evt.waitUntil(
		caches.keys().then(keys => {

			return Promise.all(
				keys
					.filter(key => key !== staticCacheName && key !== dynamicCacheName)
					.map((key) => caches.delete(key))
			)
		})
	)
} )

// SW melakukan fetch
self.addEventListener( "fetch", (evt) => {
	// console.log( "fetch dari service worker", evt )

	evt.respondWith(
		// menyuruh untuk cek ke cache kalo lagi offline
		caches
			.match( evt.request )
			.then( (cacheRes) => {
				return cacheRes || fetch( evt.request )
									.then( resp => {
										return caches
												// buka cache bernama dynamicCacheName
												.open( dynamicCacheName )
												.then( cache => {
													cache.put( evt.request.url, resp.clone() )
													return resp
												} )
									} )
					
			} )
			.catch( () => {
				if ( evt.request.url.indexOf('.html') > -1 ) {
					return caches.match('/pages/error.html')
				}
			} )
	)
} )
