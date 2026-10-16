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
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js') || entry.name.endsWith('.css')) {
      files.push(full);
    }
  }
  return files;
}

const allFiles = walk(baseDir);
console.log(`Checking ${allFiles.length} HTML, JS, and CSS files...`);

let issues = 0;
for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(baseDir, file);

  // Check for corrupted characters like  or unescaped sequences
  if (content.includes('\uFFFD')) {
    console.error(`ERROR: Replacement character found in ${rel}`);
    issues++;
  }

  // Check for deleted coach files links
  if (file.endsWith('.html')) {
    if (content.includes('href="coaches.html"') || content.includes("href='coaches.html'")) {
      console.error(`ERROR: Link to deleted coaches.html found in ${rel}`);
      issues++;
    }
    if (content.includes('href="coach-details.html"') || content.includes("href='coach-details.html'")) {
      console.error(`ERROR: Link to deleted coach-details.html found in ${rel}`);
      issues++;
    }
    if (content.includes('Measurable Milestones')) {
      console.error(`ERROR: Measurable Milestones still found in ${rel}`);
      issues++;
    }
  }
}

if (issues === 0) {
  console.log('✅ ALL CHECKS PASSED: Zero encoding errors, no deleted coach links, and Measurable Milestones successfully removed!');
} else {
  console.log(`❌ Found ${issues} issues.`);
}
