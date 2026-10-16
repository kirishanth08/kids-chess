const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

function walk(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'scratch') {
        files = files.concat(walk(full));
      }
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = walk(baseDir);
let count = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  const target = ` onsubmit="event.preventDefault(); alert('Thank you for subscribing to StratKids Tactics Dispatch!');"`;
  if (content.includes(target)) {
    content = content.split(target).join('');
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log(`Updated: ${path.relative(baseDir, file)}`);
  }
}
console.log(`Successfully updated ${count} files.`);
