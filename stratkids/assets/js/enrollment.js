/**
 * STRATKIDS - Enrollment System (Frontend Interactive Demo)
 * Multi-step enrollment wizard, tuition calculator, discounts, and demo confirmation modal
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const modalEl = document.getElementById('enrollmentModal');
  if (!modalEl) return;

  const step1 = document.getElementById('enrollStep1');
  const step2 = document.getElementById('enrollStep2');
  const step3 = document.getElementById('enrollStep3');
  const stepIndicators = document.querySelectorAll('.enroll-step-indicator');

  const nextBtn1 = document.getElementById('enrollNextBtn1');
  const nextBtn2 = document.getElementById('enrollNextBtn2');
  const prevBtn2 = document.getElementById('enrollPrevBtn2');
  const prevBtn3 = document.getElementById('enrollPrevBtn3');
  const confirmBtn = document.getElementById('enrollSubmitBtn');

  const childNameInput = document.getElementById('enrollChildName');
  const parentNameInput = document.getElementById('enrollParentName');
  const parentEmailInput = document.getElementById('enrollParentEmail');

  // Real-time input sanitizer: Name fields MUST NOT accept numbers
  [childNameInput, parentNameInput].forEach(input => {
    if (input) {
      input.addEventListener('input', function() {
        if (/[0-9]/.test(this.value)) {
          this.value = this.value.replace(/[0-9]/g, '');
        }
        if (this.value.trim()) {
          this.classList.remove('is-invalid');
        }
      });
    }
  });

  // Pricing configuration
  const programFees = {
    'little-thinkers': { name: 'Little Thinkers (Ages 5–7)', base: 450, earlyBird: 395 },
    'smart-players': { name: 'Smart Players (Ages 8–10)', base: 520, earlyBird: 460 },
    'strategic-minds': { name: 'Strategic Minds (Ages 11–13)', base: 580, earlyBird: 510 },
    'future-masters': { name: 'Future Masters (Ages 14–16)', base: 650, earlyBird: 575 }
  };

  function updateStep(stepNumber) {
    [step1, step2, step3].forEach(el => {
      if (el) el.classList.add('d-none');
    });

    if (stepNumber === 1 && step1) step1.classList.remove('d-none');
    if (stepNumber === 2 && step2) step2.classList.remove('d-none');
    if (stepNumber === 3 && step3) step3.classList.remove('d-none');

    stepIndicators.forEach((ind, idx) => {
      if (idx + 1 === stepNumber) {
        ind.classList.add('active');
      } else if (idx + 1 < stepNumber) {
        ind.classList.add('completed');
        ind.classList.remove('active');
      } else {
        ind.classList.remove('active', 'completed');
      }
    });
  }

  function calculateSummary() {
    const programSelect = document.getElementById('enrollProgramChoice');
    const siblingCheck = document.getElementById('enrollSiblingDiscount');
    const earlyBirdCheck = document.getElementById('enrollEarlyBirdOption');

    const chosenKey = programSelect ? programSelect.value : 'smart-players';
    const progInfo = programFees[chosenKey] || programFees['smart-players'];

    let tuition = earlyBirdCheck && earlyBirdCheck.checked ? progInfo.earlyBird : progInfo.base;
    let discount = 0;

    if (siblingCheck && siblingCheck.checked) {
      discount = Math.round(tuition * 0.15); // 15% Sibling discount
    }

    const total = tuition - discount;

    const sumChild = document.getElementById('summaryChildName');
    const sumProg = document.getElementById('summaryProgramName');
    const sumTuition = document.getElementById('summaryTuition');
    const sumDiscount = document.getElementById('summaryDiscount');
    const sumTotal = document.getElementById('summaryTotal');

    if (sumChild) sumChild.textContent = (childNameInput && childNameInput.value.trim()) || 'Leo Vance';
    if (sumProg) sumProg.textContent = progInfo.name;
    if (sumTuition) sumTuition.textContent = `$${tuition}`;
    if (sumDiscount) sumDiscount.textContent = discount > 0 ? `-$${discount} (15% Sibling)` : '$0';
    if (sumTotal) sumTotal.textContent = `$${total}`;
  }

  if (nextBtn1) {
    nextBtn1.addEventListener('click', () => {
      let isValid = true;

      // Validate child name: required, letters only, no numbers
      if (childNameInput) {
        const val = childNameInput.value.trim();
        if (!val || /[0-9]/.test(val)) {
          childNameInput.classList.add('is-invalid');
          isValid = false;
        } else {
          childNameInput.classList.remove('is-invalid');
        }
      }

      // Validate parent name: required, letters only, no numbers
      if (parentNameInput) {
        const val = parentNameInput.value.trim();
        if (!val || /[0-9]/.test(val)) {
          parentNameInput.classList.add('is-invalid');
          isValid = false;
        } else {
          parentNameInput.classList.remove('is-invalid');
        }
      }

      // Validate parent email
      if (parentEmailInput) {
        const emailVal = parentEmailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          parentEmailInput.classList.add('is-invalid');
          isValid = false;
        } else {
          parentEmailInput.classList.remove('is-invalid');
        }
      }

      if (!isValid) return;

      updateStep(2);
    });
  }

  if (prevBtn2) {
    prevBtn2.addEventListener('click', () => updateStep(1));
  }

  if (nextBtn2) {
    nextBtn2.addEventListener('click', () => {
      calculateSummary();
      updateStep(3);
    });
  }

  if (prevBtn3) {
    prevBtn3.addEventListener('click', () => updateStep(2));
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const modalBody = modalEl.querySelector('.modal-body');
      const camperName = (childNameInput && childNameInput.value.trim()) || 'Leo Vance';
      const inSubdir = window.location.pathname.includes('/parent-dashboard/') || 
                       window.location.pathname.includes('/auth/') || 
                       window.location.pathname.includes('/utility/');
      const dashboardHref = inSubdir ? '../parent-dashboard/dashboard.html' : 'parent-dashboard/dashboard.html';

      if (modalBody) {
        modalBody.innerHTML = `
          <div class="text-center py-5">
            <div class="badge-emblem badge-gold mb-3 mx-auto" style="width:84px; height:84px; font-size:2.5rem;">
              ♟️
            </div>
            <h3 class="mb-2" style="font-family: var(--sk-font-heading); color: var(--sk-rose);">
              Welcome to StratKids Summer Camp!
            </h3>
            <p class="lead mb-4" style="color: var(--sk-dark);">
              Enrollment Confirmed (Frontend Demo)
            </p>
            <div class="p-3 bg-light rounded-3 mb-4 mx-auto text-start" style="max-width: 440px; border: 2px dashed var(--sk-border-color);">
              <p class="mb-1"><strong>Confirmation Code:</strong> <span class="badge bg-dark">SK-2026-MOVE-8841</span></p>
              <p class="mb-1"><strong>Camper:</strong> <span>${camperName}</span></p>
              <p class="mb-1"><strong>Orientation Day:</strong> Monday, June 22 • 08:45 AM</p>
              <p class="mb-0 text-muted small">A welcome packet with camp checklist and coach welcome video has been sent to your parent email (Simulation).</p>
            </div>
            <div class="d-flex justify-content-center gap-3">
              <a href="${dashboardHref}" class="btn-strat-primary">
                <i class="bi bi-speedometer2"></i> Open Parent Portal
              </a>
              <button type="button" class="btn-strat-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        `;
      }
    });
  }
});
