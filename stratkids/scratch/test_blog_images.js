const https = require('https');
const fs = require('fs');

const candidates = [
  {
    name: 'test1.jpg',
    url: 'https://images.unsplash.com/photo-1560963689-02e82017fb3c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'test2.jpg',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'test3.jpg',
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'test4.jpg',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80'
  }
];

function download(item) {
  return new Promise((resolve, reject) => {
    https.get(item.url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, res2 => {
          const stream = fs.createWriteStream('stratkids/scratch/' + item.name);
          res2.pipe(stream);
          stream.on('finish', () => {
            console.log(item.name, 'downloaded, size:', fs.statSync('stratkids/scratch/' + item.name).size);
            resolve();
          });
        }).on('error', reject);
      } else {
        const stream = fs.createWriteStream('stratkids/scratch/' + item.name);
        res.pipe(stream);
        stream.on('finish', () => {
          console.log(item.name, 'downloaded, size:', fs.statSync('stratkids/scratch/' + item.name).size);
          resolve();
        });
      }
    }).on('error', reject);
  });
}

(async () => {
  for (const c of candidates) {
    try {
      await download(c);
    } catch (e) {
      console.error(c.name, e.message);
    }
  }
})();
