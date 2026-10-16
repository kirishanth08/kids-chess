/**
 * STRATKIDS - Form Handlers, Strict Input Validation & Navigation Redirection
 * Handles:
 *  - Real-time restriction: Name fields NEVER accept numbers.
 *  - Real-time restriction: Phone & Number fields NEVER accept letters/words.
 *  - Contact Form submission feedback & reset.
 *  - Authentication (Login, Register, Forgot Password) feedback & proper dashboard/login redirects.
 *  - Newsletter Dispatch & Coming Soon subscriptions.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. GLOBAL INPUT ENFORCEMENT & REAL-TIME SANITIZATION
  // =========================================================================

  function isNameField(input) {
    const type = input.getAttribute('type') || 'text';
    if (type !== 'text') return false;
    const nameOrId = (input.name + ' ' + input.id + ' ' + (input.placeholder || '')).toLowerCase();
    const dataType = input.getAttribute('data-type');
    return dataType === 'name' || 
           nameOrId.includes('name') || 
           nameOrId.includes('child') || 
           nameOrId.includes('parent') || 
           nameOrId.includes('guardian') || 
           nameOrId.includes('camper') || 
           nameOrId.includes('nickname') ||
           nameOrId.includes('vance');
  }

  function isNumericOrPhoneField(input) {
    const type = input.getAttribute('type') || '';
    const nameOrId = (input.name + ' ' + input.id + ' ' + (input.placeholder || '')).toLowerCase();
    const dataType = input.getAttribute('data-type');
    return type === 'tel' || 
           type === 'number' || 
           dataType === 'phone' || 
           dataType === 'number' || 
           nameOrId.includes('phone') || 
           nameOrId.includes('tel') || 
           nameOrId.includes('mobile') || 
           nameOrId.includes('card') || 
           nameOrId.includes('cvc') || 
           nameOrId.includes('amount');
  }

  // Attach real-time input sanitizers to all existing and dynamic inputs
  function setupInputRestrictions() {
    const allInputs = document.querySelectorAll('input');

    allInputs.forEach(input => {
      // (A) NAME FIELDS: Strictly block digits
      if (isNameField(input)) {
        input.addEventListener('input', function() {
          if (/[0-9]/.test(this.value)) {
            this.value = this.value.replace(/[0-9]/g, '');
            showInputFeedback(this, 'Numbers are not allowed in name fields.');
          } else {
            clearInputFeedback(this);
          }
        });

        input.addEventListener('blur', function() {
          if (/[0-9]/.test(this.value)) {
            this.value = this.value.replace(/[0-9]/g, '');
          }
        });
      }

      // (B) PHONE & NUMERIC FIELDS: Strictly block letters
      if (isNumericOrPhoneField(input)) {
        input.addEventListener('input', function() {
          const type = this.getAttribute('type');
          if (type === 'tel' || this.id.includes('phone') || (this.name && this.name.includes('phone'))) {
            // Phone: Allow digits, spaces, hyphens, plus, parentheses, dots
            if (/[a-zA-Z]/.test(this.value)) {
              this.value = this.value.replace(/[a-zA-Z]/g, '');
              showInputFeedback(this, 'Letters and words are not allowed in phone fields.');
            } else {
              clearInputFeedback(this);
            }
          } else if (type === 'number' || this.id.includes('cvc') || this.id.includes('card') || this.id.includes('amount')) {
            // Pure numeric: digits only (and spaces/hyphens for cards)
            if (/[^\d\s\-]/.test(this.value)) {
              this.value = this.value.replace(/[^\d\s\-]/g, '');
              showInputFeedback(this, 'Only digits are allowed.');
            } else {
              clearInputFeedback(this);
            }
          }
        });

        input.addEventListener('blur', function() {
          if (/[a-zA-Z]/.test(this.value)) {
            this.value = this.value.replace(/[a-zA-Z]/g, '');
          }
        });
      }
    });
  }

  function showInputFeedback(input, msg) {
    let feedback = input.parentElement.querySelector('.stratkids-live-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'stratkids-live-feedback text-danger small mt-1';
      feedback.style.fontSize = '0.8rem';
      input.parentElement.appendChild(feedback);
    }
    feedback.innerHTML = `<i class="bi bi-exclamation-circle-fill me-1"></i> ${msg}`;
    input.classList.add('is-invalid');
  }

  function clearInputFeedback(input) {
    const feedback = input.parentElement.querySelector('.stratkids-live-feedback');
    if (feedback) feedback.remove();
    if (!input.required || input.value.trim().length > 0) {
      input.classList.remove('is-invalid');
    }
  }

  setupInputRestrictions();

  // =========================================================================
  // 2. PASSWORD VISIBILITY TOGGLE BUTTONS
  // =========================================================================
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const inputGroup = btn.closest('.input-group');
      const targetInput = inputGroup ? inputGroup.querySelector('input') : null;
      const icon = btn.querySelector('i');
      if (targetInput) {
        if (targetInput.type === 'password') {
          targetInput.type = 'text';
          if (icon) icon.className = 'bi bi-eye-slash-fill';
        } else {
          targetInput.type = 'password';
          if (icon) icon.className = 'bi bi-eye-fill';
        }
      }
    });
  });

  // =========================================================================
  // 3. CONTACT FORM HANDLER (contact.html)
  // =========================================================================
  const contactForm = document.getElementById('stratkidsContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactParentName') || contactForm.querySelector('input[type="text"]');
      const emailInput = document.getElementById('contactEmail') || contactForm.querySelector('input[type="email"]');
      const phoneInput = document.getElementById('contactPhone') || contactForm.querySelector('input[type="tel"]');
      const msgInput = contactForm.querySelector('textarea');

      let hasError = false;

      // Validate name
      if (nameInput) {
        const val = nameInput.value.trim();
        if (!val || /[0-9]/.test(val)) {
          nameInput.classList.add('is-invalid');
          hasError = true;
        } else {
          nameInput.classList.remove('is-invalid');
        }
      }

      // Validate email
      if (emailInput) {
        const val = emailInput.value.trim();
        if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          emailInput.classList.add('is-invalid');
          hasError = true;
        } else {
          emailInput.classList.remove('is-invalid');
        }
      }

      // Validate phone (optional but if provided cannot have letters)
      if (phoneInput && phoneInput.value.trim()) {
        if (/[a-zA-Z]/.test(phoneInput.value)) {
          phoneInput.classList.add('is-invalid');
          hasError = true;
        } else {
          phoneInput.classList.remove('is-invalid');
        }
      }

      // Validate message
      if (msgInput) {
        if (!msgInput.value.trim()) {
          msgInput.classList.add('is-invalid');
          hasError = true;
        } else {
          msgInput.classList.remove('is-invalid');
        }
      }

      if (hasError || !contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }

      const parentName = nameInput ? nameInput.value.trim() : 'Parent';
      const email = emailInput ? emailInput.value.trim() : 'your email';

      const alertContainer = document.getElementById('contactFormAlert');
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-success d-flex align-items-center gap-3 p-3 rounded-4 shadow-sm mb-4" role="alert">
            <i class="bi bi-check-circle-fill text-success fs-2"></i>
            <div>
              <h5 class="alert-heading mb-1" style="font-family: var(--sk-font-heading);">Inquiry Sent Successfully!</h5>
              <p class="mb-0 small">Thank you, <strong>${parentName}</strong>! A camp coordinator has received your message and will reply to <strong>${email}</strong> within 24 business hours.</p>
            </div>
          </div>
        `;
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        alertContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // =========================================================================
  // 4. AUTHENTICATION: LOGIN FORM (auth/login.html)
  // =========================================================================
  const loginForm = document.getElementById('stratkidsLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail');
      const pass = document.getElementById('loginPassword');
      const alertContainer = document.getElementById('loginAlert');

      let hasError = false;
      if (!email || !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        if (email) email.classList.add('is-invalid');
        hasError = true;
      } else {
        if (email) email.classList.remove('is-invalid');
      }

      if (!pass || !pass.value.trim()) {
        if (pass) pass.classList.add('is-invalid');
        hasError = true;
      } else {
        if (pass) pass.classList.remove('is-invalid');
      }

      if (hasError) {
        loginForm.classList.add('was-validated');
        return;
      }

      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="bi bi-lock-fill"></i> Sign In to My StratKids';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Signing In...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }

        if (alertContainer) {
          alertContainer.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show d-flex align-items-center gap-3 p-3 rounded-4 shadow-sm mb-3" role="alert">
              <i class="bi bi-check-circle-fill text-success fs-3 flex-shrink-0"></i>
              <div class="flex-grow-1">
                <strong class="d-block mb-1">Login Successful!</strong>
                <span class="small">Welcome back to StratKids Summer Camp! You are successfully signed in.</span>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
          alertContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 400);
    });
  }

  // =========================================================================
  // 5. AUTHENTICATION: REGISTER FORM (auth/register.html)
  // =========================================================================
  const registerForm = document.getElementById('stratkidsRegisterForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const parentNameInput = document.getElementById('regParentName') || registerForm.querySelector('input[placeholder*="Sarah"]');
      const emailInput = document.getElementById('regEmail') || registerForm.querySelector('input[type="email"]');
      const phoneInput = document.getElementById('regPhone') || registerForm.querySelector('input[type="tel"]');
      const passInput = document.getElementById('regPassword') || registerForm.querySelector('input[type="password"]');
      const childNameInput = document.getElementById('regChildName') || registerForm.querySelector('input[placeholder*="Leo"]');
      const alertContainer = document.getElementById('registerAlert');

      let hasError = false;

      // Validate Parent Name: strictly no numbers
      if (parentNameInput) {
        const val = parentNameInput.value.trim();
        if (!val || /[0-9]/.test(val)) {
          parentNameInput.classList.add('is-invalid');
          hasError = true;
        } else {
          parentNameInput.classList.remove('is-invalid');
        }
      }

      // Validate Email
      if (emailInput) {
        const val = emailInput.value.trim();
        if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          emailInput.classList.add('is-invalid');
          hasError = true;
        } else {
          emailInput.classList.remove('is-invalid');
        }
      }

      // Validate Phone: strictly no letters
      if (phoneInput) {
        const val = phoneInput.value.trim();
        if (!val || /[a-zA-Z]/.test(val)) {
          phoneInput.classList.add('is-invalid');
          hasError = true;
        } else {
          phoneInput.classList.remove('is-invalid');
        }
      }

      // Validate Password
      if (passInput) {
        const val = passInput.value.trim();
        if (!val || val.length < 8) {
          passInput.classList.add('is-invalid');
          hasError = true;
        } else {
          passInput.classList.remove('is-invalid');
        }
      }

      // Validate Camper Name: strictly no numbers
      if (childNameInput) {
        const val = childNameInput.value.trim();
        if (!val || /[0-9]/.test(val)) {
          childNameInput.classList.add('is-invalid');
          hasError = true;
        } else {
          childNameInput.classList.remove('is-invalid');
        }
      }

      if (hasError || !registerForm.checkValidity()) {
        registerForm.classList.add('was-validated');
        return;
      }

      const pName = parentNameInput ? parentNameInput.value.trim() : 'Parent';

      const submitBtn = registerForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Creating Account...';
      }

      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-success d-flex align-items-center gap-3 p-3 rounded-4 shadow-sm mb-4" role="alert">
            <i class="bi bi-check-circle-fill text-success fs-3"></i>
            <div>
              <h5 class="alert-heading mb-1" style="font-family: var(--sk-font-heading);">Account Created Successfully!</h5>
              <p class="mb-0 small">Welcome to StratKids, <strong>${pName}</strong>! Redirecting to your family dashboard...</p>
            </div>
          </div>
        `;
        alertContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      setTimeout(() => {
        window.location.href = '../parent-dashboard/dashboard.html';
      }, 900);
    });
  }

  // =========================================================================
  // 6. AUTHENTICATION: FORGOT PASSWORD FORM (auth/forgot-password.html)
  // =========================================================================
  const forgotForm = document.getElementById('stratkidsForgotForm');
  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('forgotEmail');
      const alertBox = document.getElementById('forgotAlert');

      if (!email || !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        if (email) email.classList.add('is-invalid');
        forgotForm.classList.add('was-validated');
        return;
      }

      const submitBtn = forgotForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Sending Link...';
      }

      if (alertBox) {
        alertBox.innerHTML = `
          <div class="alert alert-success p-3 rounded-4 small mb-3 shadow-sm">
            <div class="d-flex align-items-center gap-2 mb-1">
              <i class="bi bi-check-circle-fill text-success fs-5"></i>
              <strong>Reset Instructions Dispatched!</strong>
            </div>
            <p class="mb-0">Password recovery instructions have been sent to <strong>${email.value.trim()}</strong>. Redirecting to login...</p>
          </div>
        `;
      }

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1800);
    });
  }

  // =========================================================================
  // 7. FOOTER NEWSLETTER SUBSCRIPTION FORMS
  // =========================================================================
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        const parent = form.parentElement;
        const oldMsg = parent.querySelector('.newsletter-success-toast');
        if (oldMsg) oldMsg.remove();

        const msg = document.createElement('div');
        msg.className = 'newsletter-success-toast text-warning small mt-2 fw-bold d-flex align-items-center gap-1';
        msg.innerHTML = '<i class="bi bi-star-fill text-warning"></i> Thank you! You are subscribed to the StratKids Tactics Dispatch.';
        parent.appendChild(msg);
        form.reset();
        setTimeout(() => msg.remove(), 4500);
      } else if (input) {
        input.classList.add('is-invalid');
      }
    });
  });

  // =========================================================================
  // 8. COMING SOON NOTIFY FORM (utility/coming-soon.html)
  // =========================================================================
  const comingSoonForm = document.getElementById('comingSoonNotifyForm');
  if (comingSoonForm) {
    comingSoonForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = comingSoonForm.querySelector('input[type="email"]');
      const alertBox = document.getElementById('comingSoonAlert');

      if (emailInput && emailInput.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        if (alertBox) {
          alertBox.innerHTML = `
            <div class="alert alert-success p-3 rounded-4 small mb-3 shadow-sm d-flex align-items-center gap-2">
              <i class="bi bi-check-circle-fill text-success fs-4"></i>
              <div>
                <strong>VIP Priority Confirmed!</strong><br>
                <span>We will email <strong>${emailInput.value.trim()}</strong> 48 hours before camp spots open to the public.</span>
              </div>
            </div>
          `;
        }
      }
    });
  }

  // =========================================================================
  // 9. QUICK PRE-REGISTRATION MODAL FORMS (Secondary Pages - No index redirect!)
  // =========================================================================
  document.querySelectorAll('.quick-enroll-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const camperInput = form.querySelector('.quick-camper-name') || form.querySelector('input[placeholder*="Leo"], input[placeholder*="Maya"], input[name*="child"], input[id*="Child"]');
      const parentInput = form.querySelector('.quick-parent-name') || form.querySelector('input[placeholder*="Sarah"], input[placeholder*="David"], input[name*="parent"], input[id*="Parent"]');
      const emailInput = form.querySelector('.quick-parent-email') || form.querySelector('input[type="email"]');
      const weekSelect = form.querySelector('.quick-camp-week') || form.querySelector('select');

      let hasError = false;

      // Validate Camper Name (no digits)
      if (camperInput) {
        const val = camperInput.value.trim();
        if (!val || /[0-9]/.test(val)) {
          camperInput.classList.add('is-invalid');
          hasError = true;
        } else {
          camperInput.classList.remove('is-invalid');
        }
      }

      // Validate Parent Name (no digits)
      if (parentInput) {
        const val = parentInput.value.trim();
        if (!val || /[0-9]/.test(val)) {
          parentInput.classList.add('is-invalid');
          hasError = true;
        } else {
          parentInput.classList.remove('is-invalid');
        }
      }

      // Validate Email
      if (emailInput) {
        const val = emailInput.value.trim();
        if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          emailInput.classList.add('is-invalid');
          hasError = true;
        } else {
          emailInput.classList.remove('is-invalid');
        }
      }

      if (hasError || !form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      const camper = camperInput ? camperInput.value.trim() : 'Camper';
      const email = emailInput ? emailInput.value.trim() : 'your email';
      const session = weekSelect ? weekSelect.options[weekSelect.selectedIndex].text : 'Summer Camp 2026';

      const modalBody = form.closest('.modal-body');
      if (modalBody) {
        modalBody.innerHTML = `
          <div class="text-center py-4">
            <div class="badge-emblem badge-gold mb-3 mx-auto" style="width: 80px; height: 80px; font-size: 2.25rem;">
              ♟️
            </div>
            <h4 class="fw-bold mb-2" style="font-family: var(--sk-font-heading); color: var(--sk-rose);">
              Registration Request Received!
            </h4>
            <p class="lead mb-3" style="color: var(--sk-dark); font-size: 1.1rem;">
              Priority Spot Reserved for <strong>${camper}</strong>
            </p>
            <div class="p-3 bg-light rounded-4 mb-4 mx-auto text-start" style="max-width: 460px; border: 2px dashed var(--sk-border-color);">
              <p class="mb-1"><strong>Selected Track / Session:</strong> ${session}</p>
              <p class="mb-1"><strong>Status:</strong> <span class="badge bg-success">Pre-Registered</span></p>
              <p class="mb-0 text-muted small">A camp welcome packet and registration confirmation have been dispatched to <strong>${email}</strong>.</p>
            </div>
            <button type="button" class="btn-strat-primary" data-bs-dismiss="modal">
              <i class="bi bi-check2"></i> Done &bull; Return to Page
            </button>
          </div>
        `;
      }
    });
  });
});
