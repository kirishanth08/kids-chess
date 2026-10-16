const fs = require('fs');

const phtml = fs.readFileSync('programs.html', 'utf8');
const pMatches = [...phtml.matchAll(/class="program-card-img"[\s\S]*?<img src="([^"]+)"/g)];
console.log('=== programs.html images (' + pMatches.length + ') ===');
pMatches.forEach((m, idx) => {
  const src = m[1];
  const exists = fs.existsSync(src);
  console.log(idx + 1, src, exists ? '(EXISTS on disk)' : '(NOT FOUND)');
});

const ahtml = fs.readFileSync('about.html', 'utf8');
const aMatches = [...ahtml.matchAll(/class="coach-card"[\s\S]*?<img src="([^"]+)"/g)];
console.log('=== about.html leadership images (' + aMatches.length + ') ===');
aMatches.forEach((m, idx) => {
  const src = m[1];
  const exists = fs.existsSync(src);
  console.log(idx + 1, src, exists ? '(EXISTS on disk)' : '(NOT FOUND)');
});
