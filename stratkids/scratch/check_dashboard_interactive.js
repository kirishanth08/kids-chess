const fs = require('fs');
const path = require('path');

const dir = 'parent-dashboard';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=================== ${f} ===================`);
  
  // Find all buttons and links
  const matches = content.match(/<(a|button|input[^>]*type="submit")[^>]*>[\s\S]*?<\/\1>|<input[^>]*type="submit"[^>]*>/gi) || [];
  matches.forEach(m => {
    const single = m.replace(/\s+/g, ' ').trim();
    // Exclude nav links in sidebar
    if (!single.includes('dash-nav-item') && !single.includes('theme-toggle') && !single.includes('rtl-toggle')) {
      console.log('  ' + single.slice(0, 140));
    }
  });
});
