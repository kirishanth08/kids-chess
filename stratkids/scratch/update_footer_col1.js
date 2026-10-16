const fs = require('fs');

const oldRegex = /<!-- Col 1: Brand & Accreditation -->[\s\S]*?<!-- Col 2: Camp Programs & Tracks -->/;

const newReplacement = `<!-- Col 1: Brand & Professional Accreditation Matrix -->
        <div class="col-lg-4 col-md-6">
          <div class="footer-brand-box mb-3">
            <div class="d-flex align-items-center gap-3">
              <div class="footer-brand-icon">
                <i class="bi bi-trophy-fill"></i>
              </div>
              <div>
                <div class="footer-brand-title">
                  Strat<span>Kids</span>
                </div>
                <div class="footer-brand-sub">Premier Youth Chess &amp; Strategy Academy</div>
              </div>
            </div>
          </div>

          <p class="footer-brand-desc">
            An accredited modern chess &amp; cognitive strategy summer academy empowering young thinkers ages 5&ndash;16 with Grandmaster calculation, spatial logic, and lifelong strategic confidence.
          </p>

          <!-- Professional Accreditation Matrix -->
          <div class="footer-trust-matrix">
            <div class="footer-trust-pill">
              <i class="bi bi-patch-check-fill text-warning"></i>
              <span><strong>FIDE Master</strong> Curriculum</span>
            </div>
            <div class="footer-trust-pill">
              <i class="bi bi-shield-check text-success"></i>
              <span><strong>SafeSport</strong> Certified Staff</span>
            </div>
            <div class="footer-trust-pill">
              <i class="bi bi-people-fill text-info"></i>
              <span><strong>1:6 Ratio</strong> Dedicated Mentorship</span>
            </div>
          </div>

          <!-- Social Channels -->
          <div class="d-flex align-items-center gap-2 mt-3">
            <span class="small text-white-50 me-1 fw-bold text-uppercase" style="font-size: 0.68rem; letter-spacing: 1px;">Connect:</span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
            <a href="contact.html" class="footer-social-btn" aria-label="Parent Community"><i class="bi bi-chat-heart-fill"></i></a>
          </div>
        </div>

        <!-- Col 2: Camp Programs & Tracks -->`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (oldRegex.test(content)) {
    content = content.replace(oldRegex, newReplacement);
    fs.writeFileSync(f, content, 'utf8');
    count++;
    console.log('Updated footer in:', f);
  }
});

console.log('Total files updated:', count);
