const fs = require('fs');
const path = require('path');

// 1. Update utility pages
const utilityFiles = [
  'stratkids/utility/404.html',
  'stratkids/utility/coming-soon.html',
  'stratkids/utility/maintenance.html'
];

utilityFiles.forEach(f => {
  const p = path.resolve(f);
  let content = fs.readFileSync(p, 'utf8');

  if (!content.includes('nav-dashboard-link')) {
    const contactRegex = /(<li class="nav-item"><a class="nav-link\s*([^"]*)"\s*href="\.\.\/contact\.html">Contact<\/a><\/li>)/i;
    if (contactRegex.test(content)) {
      content = content.replace(contactRegex, `$1\n          <li class="nav-item">\n            <a class="nav-link nav-dashboard-link d-inline-flex align-items-center gap-1" href="../parent-dashboard/dashboard.html" title="Parent Dashboard">\n              <i class="bi bi-speedometer2 text-warning"></i> Dashboard\n            </a>\n          </li>`);
      console.log('Added dashboard link in utility:', f);
    }
  }

  const portalCircleRegex = /<!--\s*Parent Portal Circle\s*-->\s*<a href="\.\.\/parent-dashboard\/dashboard\.html"[^>]*>[\s\S]*?<\/a>/i;
  if (portalCircleRegex.test(content)) {
    content = content.replace(portalCircleRegex, '');
    console.log('Removed portal circle in utility:', f);
  } else {
    const simpleCircleRegex = /<a href="\.\.\/parent-dashboard\/dashboard\.html"\s+class="tool-toggle-btn"[^>]*>[\s\S]*?<\/a>/i;
    if (simpleCircleRegex.test(content)) {
      content = content.replace(simpleCircleRegex, '');
      console.log('Removed simple portal circle in utility:', f);
    }
  }

  if (!content.includes('btn-nav-login')) {
    const ctaRegex = /(<button type="button" class="btn-strat-primary"[^>]*data-bs-target="#enrollmentModal">)/i;
    if (ctaRegex.test(content)) {
      content = content.replace(ctaRegex, `<!-- Login Button in Navbar before CTA -->\n          <a href="../auth/login.html" class="btn-nav-login" title="Parent Portal Login">\n            <i class="bi bi-box-arrow-in-right"></i> Login\n          </a>\n          $1`);
      console.log('Added login button before CTA in utility:', f);
    }
  }

  fs.writeFileSync(p, content, 'utf8');
});

// 2. Update parent dashboard pages to ensure tagline is "Think. Play. Grow."
const dashFiles = [
  'stratkids/parent-dashboard/dashboard.html',
  'stratkids/parent-dashboard/children.html',
  'stratkids/parent-dashboard/child-profile.html',
  'stratkids/parent-dashboard/skill-progress.html',
  'stratkids/parent-dashboard/daily-schedule.html',
  'stratkids/parent-dashboard/enrollments.html',
  'stratkids/parent-dashboard/payments.html',
  'stratkids/parent-dashboard/messages.html',
  'stratkids/parent-dashboard/certificates.html',
  'stratkids/parent-dashboard/profile.html'
];

dashFiles.forEach(f => {
  const p = path.resolve(f);
  let content = fs.readFileSync(p, 'utf8');

  const oldTagline = /<span class="brand-tagline"[^>]*>Parent Command Center<\/span>/g;
  if (oldTagline.test(content)) {
    content = content.replace(oldTagline, '<span class="brand-tagline" style="font-size: 0.58rem;">Think. Play. Grow.</span>');
    console.log('Updated tagline in dashboard page:', f);
    fs.writeFileSync(p, content, 'utf8');
  }
});
