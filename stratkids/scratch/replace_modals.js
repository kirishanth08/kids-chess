const fs = require('fs');
const path = require('path');

const targetModal = `  <!-- Global Enrollment Modal Included -->
  <div class="modal fade" id="enrollmentModal" tabindex="-1" aria-labelledby="enrollmentModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content rounded-5 border-0 shadow-lg overflow-hidden">
        <div class="modal-header text-white p-4" style="background: linear-gradient(135deg, var(--sk-rose) 0%, #8C2E49 100%);">
          <h4 class="modal-title h5 mb-0" id="enrollmentModalTitle" style="font-family: var(--sk-font-heading);">
            Camp Registration Wizard
          </h4>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4 p-md-5">
          <div class="quick-enroll-container">
            <h5 class="fw-bold mb-1" style="color: var(--sk-rose); font-family: var(--sk-font-heading);">
              Camper Information & Priority Registration
            </h5>
            <p class="small text-muted mb-4">Choose your track and camper details for instant registration.</p>
            <form class="quick-enroll-form" novalidate>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-bold small">Camper Full Name *</label>
                  <input type="text" class="form-control rounded-3 quick-camper-name" placeholder="e.g. Leo Vance" required pattern="^[A-Za-z\\s\\.\\'\\-]+$" title="Camper name must contain letters only (no numbers)">
                  <div class="invalid-feedback">Please enter camper's name (letters only, no numbers).</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold small">Age Track *</label>
                  <select class="form-select rounded-3 quick-camper-track">
                    <option value="5-7">Little Thinkers (Ages 5&ndash;7)</option>
                    <option value="8-10" selected>Smart Players (Ages 8&ndash;10)</option>
                    <option value="11-13">Strategic Minds (Ages 11&ndash;13)</option>
                    <option value="14-16">Future Masters (Ages 14&ndash;16)</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold small">Parent Name *</label>
                  <input type="text" class="form-control rounded-3 quick-parent-name" placeholder="Sarah Vance" required pattern="^[A-Za-z\\s\\.\\'\\-]+$" title="Parent name must contain letters only (no numbers)">
                  <div class="invalid-feedback">Please enter parent name (letters only, no numbers).</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold small">Parent Email *</label>
                  <input type="email" class="form-control rounded-3 quick-parent-email" placeholder="sarah@example.com" required>
                  <div class="invalid-feedback">Please enter a valid email address.</div>
                </div>
                <div class="col-md-12">
                  <label class="form-label fw-bold small">Preferred Camp Week *</label>
                  <select class="form-select rounded-3 quick-camp-week">
                    <option selected>Week 1: June 15 &ndash; June 19 (Open)</option>
                    <option>Week 2: June 22 &ndash; June 26 (Open)</option>
                    <option>Week 3: June 29 &ndash; July 03 (Popular)</option>
                    <option>Week 4: July 06 &ndash; July 10 (Few Spots Left)</option>
                  </select>
                </div>
              </div>
              <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn-strat-primary">
                  <i class="bi bi-check-circle-fill me-1"></i> Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`;

const files = [
  'stratkids/about.html',
  'stratkids/blog-details.html',
  'stratkids/blog.html',
  'stratkids/camp-life.html',
  'stratkids/contact.html',
  'stratkids/faqs.html',
  'stratkids/gallery.html',
  'stratkids/pricing.html',
  'stratkids/program-details.html',
  'stratkids/programs.html',
  'stratkids/schedule.html',
  'stratkids/utility/404.html'
];

files.forEach(f => {
  const p = path.resolve(f);
  let content = fs.readFileSync(p, 'utf8');

  // Match the modal block from <div class="modal fade" id="enrollmentModal" to </div>\n  </div>
  const modalRegex = /<!-- Global Enrollment Modal Included -->[\s\S]*?<div class="modal fade" id="enrollmentModal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;
  const simpleModalRegex = /<div class="modal fade" id="enrollmentModal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

  if (modalRegex.test(content)) {
    content = content.replace(modalRegex, targetModal);
    fs.writeFileSync(p, content, 'utf8');
    console.log('Replaced with comment in:', f);
  } else if (simpleModalRegex.test(content)) {
    content = content.replace(simpleModalRegex, targetModal);
    fs.writeFileSync(p, content, 'utf8');
    console.log('Replaced simple in:', f);
  } else {
    console.log('COULD NOT MATCH MODAL IN:', f);
  }
});
