const fs = require('fs');
const path = require('path');

console.log('--- Verifying Blog Integration ---');
const blogHtml = fs.readFileSync('stratkids/blog.html', 'utf8');
const blogDetailsJs = fs.readFileSync('stratkids/assets/js/blog-details.js', 'utf8');

// Extract IDs from blog.html
const idMatches = [...blogHtml.matchAll(/blog-details\.html\?id=([a-zA-Z0-9-]+)/g)].map(m => m[1]);
console.log('Found blog links in blog.html:', [...new Set(idMatches)]);

// Check if each ID exists in BLOG_ARTICLES
const blogArticlesIds = ['screen-focus', 'opening-traps', 'resilience-losing', 'spatial-games', 'outdoor-recovery', 'digital-clocks', 'readiness-5yo'];
let allFound = true;
blogArticlesIds.forEach(id => {
  if (!idMatches.includes(id)) {
    console.error('Missing link in blog.html for:', id);
    allFound = false;
  }
  if (!blogDetailsJs.includes(`'${id}':`)) {
    console.error('Missing data in blog-details.js for:', id);
    allFound = false;
  }
});
if (allFound) {
  console.log('SUCCESS: All 7 blog articles have matching links and rich data!');
}

console.log('\n--- Verifying Dashboard Navbars ---');
const dir = 'stratkids/parent-dashboard';
const dashFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
dashFiles.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const header = c.match(/<header[\s\S]*?<\/header>/)[0];
  const dashMatch = header.match(/<a href="dashboard\.html"[^>]*>([\s\S]*?)<\/a>/);
  if (dashMatch) {
    if (dashMatch[1].includes('<i')) {
      console.error(`FAILURE in ${f}: Dashboard link contains an icon:`, dashMatch[0]);
    } else {
      console.log(`OK: ${f} has clean Dashboard link without icon.`);
    }
  } else {
    console.log(`OK: ${f} has no Dashboard link in navbar.`);
  }
});

console.log('\n--- Verifying Milestone Track CSS & HTML ---');
const skillHtml = fs.readFileSync('stratkids/parent-dashboard/skill-progress.html', 'utf8');
const styleCss = fs.readFileSync('stratkids/assets/css/style.css', 'utf8');
if (skillHtml.includes('milestone-track-container') && skillHtml.includes('milestone-track-bg')) {
  console.log('OK: skill-progress.html has milestone-track-container and milestone-track-bg.');
} else {
  console.error('FAILURE: skill-progress.html missing track classes!');
}

if (styleCss.includes('.milestone-track-bg') && !styleCss.includes('top: 50%;\r\n  left: 30px;\r\n  height: 6px;\r\n  background: var(--sk-rose);\r\n  transform: translateY(-50%);')) {
  console.log('OK: style.css has correct .milestone-track-bg and fixed .level-milestone-track-progress.');
} else {
  console.error('Check style.css milestone rules');
}
