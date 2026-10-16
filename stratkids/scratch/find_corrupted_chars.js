const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Check for weird corrupted characters like â, †, ‰
    if (/[â†‰]/.test(line)) {
      console.log(`${filePath}:${idx + 1}: ${line.trim()}`);
    }
  });
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.git' && ent.name !== 'scratch') {
        scanDir(full);
      }
    } else if (ent.name.endsWith('.html') || ent.name.endsWith('.js') || ent.name.endsWith('.css')) {
      checkFile(full);
    }
  }
}

scanDir('stratkids');
