const fs = require('fs');
const path = require('path');

function inspectFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const brandTitleMatch = content.match(/class="brand-title"[^>]*>([\s\S]*?)<\/span>/i);
  const brandTaglineMatch = content.match(/class="brand-tagline"[^>]*>([\s\S]*?)<\/span>/i);
  const hasLoginBtn = content.includes('auth/login.html') || content.includes('login.html');
  const hasDashboardLink = content.includes('dashboard.html');
  
  return {
    file: filePath,
    title: brandTitleMatch ? brandTitleMatch[1].replace(/\s+/g, ' ').trim() : 'NONE',
    tagline: brandTaglineMatch ? brandTaglineMatch[1].replace(/\s+/g, ' ').trim() : 'NONE',
    hasLoginBtn,
    hasDashboardLink
  };
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
      const res = inspectFile(full);
      console.log(`${res.file.padEnd(45)} | Title: ${res.title.padEnd(20)} | Tagline: ${res.tagline.padEnd(22)} | Login: ${res.hasLoginBtn} | Dash: ${res.hasDashboardLink}`);
    }
  }
}

scan('stratkids');
