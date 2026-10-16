const fs = require('fs');
const path = require('path');

function scan(dir) {
  let files = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.git') files = files.concat(scan(p));
    else if (e.isFile() && e.name.endsWith('.html')) files.push(p);
  });
  return files;
}

const files = scan('.');
const results = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const btnMatches = content.match(/<(a|button)[^>]*class="[^"]*btn[^"]*"[^>]*>[\s\S]*?<\/\1>/gi) || [];
  btnMatches.forEach(b => {
    const singleLine = b.replace(/\s+/g, ' ');
    if (!singleLine.includes('btn-close') && 
        !singleLine.includes('tool-toggle') && 
        !singleLine.includes('rtl-toggle') && 
        !singleLine.includes('theme-toggle') && 
        !singleLine.includes('navbar-toggler') &&
        !singleLine.includes('filter-btn') &&
        !singleLine.includes('footer-social-btn') &&
        !singleLine.includes('back-to-top')) {
      if (!singleLine.includes('btn-strat-primary') && !singleLine.includes('btn-strat-secondary')) {
        results.push({ file: f, button: singleLine });
      }
    }
  });
});

console.log('Total non btn-strat-primary/secondary buttons:', results.length);
results.forEach(r => console.log(r.file + ': ' + r.button.slice(0, 120)));
