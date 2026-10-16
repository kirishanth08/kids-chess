const fs = require('fs');

['programs.html', 'faqs.html', 'blog.html', 'blog-details.html', 'index.html', 'pricing.html', 'contact.html'].forEach(file => {
  console.log(`\n=================== ${file} ===================`);
  const content = fs.readFileSync(file, 'utf8');
  const regex = /<(a|button)[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    if (m[2].includes('btn')) {
      const text = m[3].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      console.log(`[${m[2]}] -> "${text}"`);
    }
  }
});
