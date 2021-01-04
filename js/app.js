// 1. mendaftarkan/registrasi sw.js tadi
// Cek dulu apakah Browser support SW (Cek di can i use service worker)
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/sw.js")
		.then((reg) => console.log("service worker berhasil ditambahkan", reg))
		.catch((err) => console.log("gagal menambahkan SW", err))

	// Jika register berhasil, jalankan yg then
	// kalau gagal jalankan catch
	// then catch itu callback function
}
// Sampai sini tugas app.js sudah berakhir

// 2. installasi ada di sw.js
