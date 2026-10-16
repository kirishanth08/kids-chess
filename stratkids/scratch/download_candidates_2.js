const https = require('https');
const fs = require('fs');
const path = require('path');

const candidates = [
  {
    name: 'test_clock.jpg',
    url: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'test_outdoor.jpg',
    url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'test_collaborate.jpg',
    url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80'
  }
];

function download(item) {
  return new Promise(resolve => {
    const dest = path.join('stratkids/scratch', item.name);
    const file = fs.createWriteStream(dest);
    https.get(item.url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, redRes => {
          redRes.pipe(file);
          file.on('finish', () => { file.close(); resolve(true); });
        });
      } else {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      }
    }).on('error', () => resolve(false));
  });
}

(async () => {
  for (const c of candidates) {
    const ok = await download(c);
    console.log(`Downloaded ${c.name}: ${ok}`);
  }
})();
