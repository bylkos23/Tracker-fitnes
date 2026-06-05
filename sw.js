cat > /mnt/user-data/outputs/mehdi-tracker/sw.js << 'EOF'
const CACHE = 'mehdi-v2';
const ASSETS = ['./index.html','./manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap'
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { if(res.status===200){const c=res.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));} return res; }).catch(()=>caches.match('./index.html')))));
EOF
echo "sw done"