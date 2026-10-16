const fs = require('fs');
const path = require('path');

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.git' && ent.name !== 'scratch') {
        scan(full);
      }
    } else if (ent.name.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('footer-brand-box') || content.includes('footer-brand-icon') || content.includes('Premier Youth Chess') || content.includes('footer-brand-title')) {
        console.log('Has footer brand:', full);
      }
    }
  }
}

scan('stratkids');
