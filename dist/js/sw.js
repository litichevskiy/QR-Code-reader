!function(){const e=["v-1-1700317392396"],s=["/","/manifest.json","/dist/js/bundle.js","/dist/css/bundle.css","images/favicon.ico","images/icons/arrow-left.svg","images/icons/copy.svg","images/icons/lamp.svg","images/icons/power.svg","images/icons/qr-code.svg","images/icons/qr-code-active.svg"];self.addEventListener("activate",(s=>{s.waitUntil(caches.keys().then((s=>Promise.all(s.map((s=>{if(-1===e.indexOf(s))return caches.delete(s)}))))))})),self.addEventListener("install",(i=>{self.skipWaiting(),i.waitUntil(caches.open(e[0]).then((e=>e.addAll(s))))})),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((s=>s||fetch(e.request))))}))}();