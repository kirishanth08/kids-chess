const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = 'stratkids/assets/images/blog';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const imagesToDownload = [
  {
    name: 'blog_featured.jpg',
    url: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=1000&q=80',
    desc: 'Child focused on chessboard strategy'
  },
  {
    name: 'blog_tactics_opening.jpg',
    url: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=800&q=80',
    desc: 'Classic wooden chess pieces in opening tactic position'
  },
  {
    name: 'blog_parenting_resilience.jpg',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    desc: 'Teacher / coach supporting and encouraging young student'
  },
  {
    name: 'blog_strategy_boardgames.jpg',
    url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
    desc: 'Modern tabletop strategy game with wooden pieces and spatial board'
  },
  {
    name: 'blog_outdoor_camp_life.jpg',
    url: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=800&q=80',
    desc: 'Kids running and playing outdoors on green camp lawn'
  },
  {
    name: 'blog_tournament_clock.jpg',
    url: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80',
    desc: 'Tournament chess game with official digital clock'
  },
  {
    name: 'blog_young_child_readiness.jpg',
    url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80',
    desc: 'Kindergarten child engaged with learning puzzle pieces'
  }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(dir, item.name);
    const file = fs.createWriteStream(dest);
    https.get(item.url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redRes) => {
          redRes.pipe(file);
          file.on('finish', () => {
            file.close();
            const stats = fs.statSync(dest);
            console.log(`Downloaded ${item.name} (${stats.size} bytes)`);
            resolve(true);
          });
        });
      } else {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(dest);
          console.log(`Downloaded ${item.name} (${stats.size} bytes)`);
          resolve(true);
        });
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${item.name}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const img of imagesToDownload) {
    await download(img);
  }
  console.log('All downloads completed!');
}

run();
