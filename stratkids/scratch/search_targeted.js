const https = require('https');
const fs = require('fs');

async function searchWikimedia(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&gsrnamespace=6&prop=imageinfo&iiprop=url|size|mime&format=json`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'StratKidsCampApp/1.0 (contact@stratkids.edu)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query ? Object.values(json.query.pages) : [];
          const results = pages.map(p => ({
            title: p.title,
            url: p.imageinfo && p.imageinfo[0] ? p.imageinfo[0].url : null,
            mime: p.imageinfo && p.imageinfo[0] ? p.imageinfo[0].mime : null,
            size: p.imageinfo && p.imageinfo[0] ? p.imageinfo[0].size : 0
          })).filter(r => r.url && (r.mime === 'image/jpeg' || r.mime === 'image/png') && r.size < 10000000);
          resolve(results);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const topics = [
    { key: 'clock', q: 'chess clock tournament' },
    { key: 'outdoor', q: 'giant chess outdoor children' },
    { key: 'outdoor2', q: 'summer camp children lawn grass' },
    { key: 'coach', q: 'chess teacher children' }
  ];

  for (const t of topics) {
    const list = await searchWikimedia(t.q);
    console.log(`\n=== Query: ${t.q} ===`);
    list.slice(0, 4).forEach(item => {
      console.log(`- ${item.title}: ${item.url}`);
    });
  }
}

run();
