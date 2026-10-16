const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../parent-dashboard');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let c = fs.readFileSync(filePath, 'utf8');
  
  // Replace '<a href="dashboard.html" class="btn btn-outline-dark rounded-pill px-3 py-1 small fw-bold">\s*<i class="[^"]*"><\/i>\s*(?:Dashboard|Overview)\s*<\/a>'
  const updated = c.replace(
    /<a href="dashboard\.html" class="btn btn-outline-dark rounded-pill px-3 py-1 small fw-bold">\s*<i class="[^"]*"><\/i>\s*(?:Dashboard|Overview)\s*<\/a>/g,
    '<a href="dashboard.html" class="btn btn-outline-dark rounded-pill px-3 py-1 small fw-bold">Dashboard</a>'
  );
  
  if (updated !== c) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log('Updated:', f);
  }
});
