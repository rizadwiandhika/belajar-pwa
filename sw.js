// membuat memori cache
const staticCacheName = "site-static"
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
]

// 2. Menginstall SW
self.addEventListener("install", (evt) => {
	console.log("SW Installation SUCCESS")
	// tunggu proses di dalam ini selesai, baru jalankan yg lain
	evt.waitUntil(
		// membuat cache baru
		caches.open(staticCacheName).then((cache) => {
			console.log("Berhasil di cache")
			cache.addAll(assets)

		})
	)
})

// 3. Aktivasi SW
self.addEventListener("activate", (evt) => {
	console.log("SW Activitation SUCCESS")
})

// SW melakukan fetch
self.addEventListener("fetch", (evt) => {
	console.log("fetch dari service worker", evt)

	evt.respondWith(
		// menyuruh untuk cek ke cache kalo lagi offline
		caches.match(evt.request).then((cacheRes) => {
			return cacheRes || fetch(evt.request)
		})
	)
})
