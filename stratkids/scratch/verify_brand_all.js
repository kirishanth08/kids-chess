const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if it has brand title
  const hasTitle = content.includes('Strat<span>Kids</span>') || content.includes('StratKids');
  // Check if it has brand motto
  const hasMotto = content.includes('Think. Play. Grow.') || content.includes('THINK. PLAY. GROW.');
  // Check if it has logo
  const hasLogo = content.includes('favicon.svg');

  return { filePath, hasTitle, hasMotto, hasLogo };
}

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.git' && ent.name !== 'scratch') {
        scan(full);
      }
    } else if (ent.name.endsWith('.html')) {
      const res = checkFile(full);
      if (!res.hasTitle || !res.hasMotto || !res.hasLogo) {
        console.log('FAIL:', full, res);
      }
    }
  }
}

console.log('Running brand consistency check...');
scan('stratkids');
console.log('Scan complete! If no FAIL lines above, all pages have consistent logo, company name, and motto.');
