const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.git' && ent.name !== 'scratch') {
        scanDir(full);
      }
    } else if (ent.name.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const formMatches = content.match(/<form[^>]*>/gi);
      if (formMatches) {
        console.log(`\n=== File: ${full} (${formMatches.length} forms) ===`);
        formMatches.forEach(fm => console.log('  ', fm));
      }
    }
  }
}

scanDir('stratkids');
