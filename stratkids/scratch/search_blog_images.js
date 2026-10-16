const https = require('https');
const fs = require('fs');

async function searchWikimedia(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=8&gsrnamespace=6&prop=imageinfo&iiprop=url|size|mime&format=json`;
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
          })).filter(r => r.url && (r.mime === 'image/jpeg' || r.mime === 'image/png') && r.size < 15000000);
          resolve(results);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  console.log('Searching for blog topics...');
  const topics = {
    outdoor: 'kids outdoor camp game lawn',
    boardgame: 'children board game playing table',
    clock: 'chess tournament clock kids scholastic',
    kindergarten: 'child 5 year old chess kindergarten',
    tactics: 'chess board tactics opening'
  };

  for (const [key, q] of Object.entries(topics)) {
    const res = await searchWikimedia(q);
    console.log(`\nResults for ${key} (${q}):`);
    res.slice(0, 3).forEach(r => console.log(` - ${r.title}: ${r.url}`));
  }
}

run();
