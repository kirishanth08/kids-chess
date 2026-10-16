const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let brokenCount = 0;
htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const imgMatches = [...content.matchAll(/src="(assets\/images\/[^"]+)"/g)].map(m => m[1]);
  imgMatches.forEach(src => {
    const fullPath = path.join(dir, src);
    if (!fs.existsSync(fullPath)) {
      console.error(file + ' broken image src: ' + src);
      brokenCount++;
    }
  });
});

if (brokenCount === 0) {
  console.log('All image sources exist and are valid across all HTML files!');
} else {
  console.log('Found ' + brokenCount + ' broken images.');
}
