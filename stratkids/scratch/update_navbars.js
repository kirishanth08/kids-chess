const fs = require('fs');
const path = require('path');

const rootFiles = [
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

rootFiles.forEach(f => {
  const p = path.resolve(f);
  let content = fs.readFileSync(p, 'utf8');

  // 1. Move dashboard icon next to Contact in navbar-nav
  // If not already has nav-dashboard-link next to contact
  if (!content.includes('nav-dashboard-link')) {
    const contactRegex = /(<li class="nav-item"><a class="nav-link\s*([^"]*)"\s*href="contact\.html">Contact<\/a><\/li>)/i;
    if (contactRegex.test(content)) {
      content = content.replace(contactRegex, `$1\n          <li class="nav-item">\n            <a class="nav-link nav-dashboard-link d-inline-flex align-items-center gap-1" href="parent-dashboard/dashboard.html" title="Parent Dashboard">\n              <i class="bi bi-speedometer2 text-warning"></i> Dashboard\n            </a>\n          </li>`);
      console.log('Added dashboard link next to Contact in:', f);
    } else {
      console.log('WARNING: Contact link not matched in:', f);
    }
  }

  // 2. Remove old parent portal circle in nav-tools if present
  const portalCircleRegex = /<!--\s*Parent Portal Circle\s*-->\s*<a href="parent-dashboard\/dashboard\.html"[^>]*>[\s\S]*?<\/a>/i;
  if (portalCircleRegex.test(content)) {
    content = content.replace(portalCircleRegex, '');
    console.log('Removed portal circle from nav-tools in:', f);
  } else {
    // Try simple regex without comment
    const simpleCircleRegex = /<a href="parent-dashboard\/dashboard\.html"\s+class="tool-toggle-btn"[^>]*>[\s\S]*?<\/a>/i;
    if (simpleCircleRegex.test(content)) {
      content = content.replace(simpleCircleRegex, '');
      console.log('Removed simple portal circle in:', f);
    }
  }

  // 3. Add Login button before the CTA button in nav-tools if not already present
  if (!content.includes('btn-nav-login')) {
    const ctaRegex = /(<button type="button" class="btn-strat-primary"[^>]*data-bs-target="#enrollmentModal">)/i;
    if (ctaRegex.test(content)) {
      content = content.replace(ctaRegex, `<!-- Login Button in Navbar before CTA -->\n          <a href="auth/login.html" class="btn-nav-login" title="Parent Portal Login">\n            <i class="bi bi-box-arrow-in-right"></i> Login\n          </a>\n          $1`);
      console.log('Added login button before CTA in:', f);
    } else {
      console.log('WARNING: CTA button not matched in:', f);
    }
  }

  fs.writeFileSync(p, content, 'utf8');
});
