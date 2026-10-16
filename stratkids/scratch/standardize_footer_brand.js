const fs = require('fs');
const path = require('path');

const files = [
  'stratkids/index.html',
  'stratkids/home-2.html',
  'stratkids/about.html',
  'stratkids/programs.html',
  'stratkids/program-details.html',
  'stratkids/schedule.html',
  'stratkids/pricing.html',
  'stratkids/blog.html',
  'stratkids/blog-details.html',
  'stratkids/contact.html',
  'stratkids/gallery.html',
  'stratkids/faqs.html',
  'stratkids/camp-life.html'
];

const targetFooterBrand = `          <div class="footer-brand-box mb-3">
            <a href="index.html" class="d-inline-flex align-items-center gap-3 text-decoration-none">
              <img src="assets/icons/favicon.svg" alt="StratKids Logo" height="46" width="46" class="rounded-3 shadow-sm">
              <div class="brand-text">
                <div class="footer-brand-title">
                  Strat<span>Kids</span>
                </div>
                <div class="footer-brand-sub">THINK. PLAY. GROW.</div>
              </div>
            </a>
          </div>`;

files.forEach(f => {
  const p = path.resolve(f);
  let content = fs.readFileSync(p, 'utf8');

  // Match the entire footer-brand-box block
  const oldBrandRegex = /<div class="footer-brand-box mb-3">[\s\S]*?<div class="footer-brand-sub">[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/i;

  if (oldBrandRegex.test(content)) {
    content = content.replace(oldBrandRegex, targetFooterBrand);
    fs.writeFileSync(p, content, 'utf8');
    console.log('Successfully updated footer brand in:', f);
  } else {
    console.log('Regex did not match in:', f);
  }
});
