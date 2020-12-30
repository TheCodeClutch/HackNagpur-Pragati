const pragati = "Pragati"
const assets = [
	"/",
  "./ask-desk.html",
	"./buy-products.html",
	"./index.html",
	"./login.html",
	"./post-services.html",
	"./seek-services.html",
	"./sell-products.html",
	"./news.html",
	"./signup.html",
	"./profile.html",
	"./styles/askDesk.css",
	"./styles/buyProducts.css",
	"./styles/index.css",
	"./styles/profile.css",
	"./styles/sellProducts.css",
	"./styles/signup.css",
	"./styles/womenInNews.css",
	"./js/ask-desk.js",
	"./js/buy-products.js",
	"./js/index.js",
	"./js/login.js",
	"./js/post-services.js",
	"./js/profile.js",
	"./js/seek-services.js",
	"./js/sell-products.js",
	"./js/signup.js",
	"./js/sos.js",
	"./js/womenInNews.js",
	"./images/sos.png",
	"./images/shreya.jpg",
	"./images/saloni.PNG",
	"./images/preloader.gif",
	"./images/pragati-logo.jpg",
	"./images/NewCapture.PNG",
	"./images/nav-logo.jpeg",
	"./images/nav-logo-woman.jpeg",
	"./images/login-bg-new.jpg",
	"./images/home4.jpg",
	"./images/home3.jpg",
	"./images/home2.jpg",
	"./images/home.jpg",
	"./images/handicraft.jpg",
	"./images/Capture2.PNG",
	"./images/askhome.jpg",
	"./images/pwa-images/nav-logo-woman_72x72.jpeg",
	"./images/pwa-images/nav-logo-woman_96x96.jpeg",
	"./images/pwa-images/nav-logo-woman_128x128.jpeg",
	"./images/pwa-images/nav-logo-woman_144x144.jpeg",
	"./images/pwa-images/nav-logo-woman_152x152.jpeg",
	"./images/pwa-images/nav-logo-woman_192x192.jpeg",
	"./images/pwa-images/nav-logo-woman_384x384.png",
	"./images/pwa-images/nav-logo-woman_512x512.png",
	"./images/favicon/android-chrome-192x192.png",
	"./images/favicon/android-chrome-512x512.png",
	"./images/favicon/apple-touch-icon.png",
	"./images/favicon/favicon-16x16.png",
	"./images/favicon/favicon-32x32.png",
	"./images/favicon/favicon.ico"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(pragati
  ).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
