const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../parent-dashboard');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const headerMatch = c.match(/<header[\s\S]*?<\/header>/);
  if (headerMatch) {
    const btnMatches = headerMatch[0].match(/<a[^>]*class="[^"]*btn[^"]*"[^>]*>[\s\S]*?<\/a>/g) || [];
    console.log(f, btnMatches.map(b => b.replace(/\s+/g, ' ')));
  }
});
