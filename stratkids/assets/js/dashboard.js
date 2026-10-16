/**
 * STRATKIDS - Parent Dashboard Controller
 * Full interactive functionality for all dashboard pages:
 * - Constant sidebar & scrollable content layout
 * - Toast notification feedback system (replacing alerts)
 * - Multi-child switching (persisted via localStorage)
 * - Real simulated document & certificate downloaders (Blob generation)
 * - Interactive calendar sync (.ics export)
 * - Interactive multi-contact chat messenger with live responses
 * - Dynamic modal workflows (Add Camper, Add Pickup Delegate, Update Payment Card, Transfer Session)
 * - Input sanitization & phone/name masking
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. FLOATING TOAST NOTIFICATION SYSTEM
  // =========================================================================
  let toastContainer = document.getElementById('skToastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'skToastContainer';
    toastContainer.style.cssText = `
      position: fixed;
      top: 75px;
      right: 25px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
      max-width: 380px;
    `;
    document.body.appendChild(toastContainer);
  }

  function showToast(title, message, iconClass = 'bi-check-circle-fill text-success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      background: rgba(17, 26, 32, 0.95);
      color: #FFFFFF;
      padding: 14px 18px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(158, 211, 220, 0.3);
      display: flex;
      align-items: flex-start;
      gap: 12px;
      pointer-events: auto;
      transform: translateX(120%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
      opacity: 0;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    `;

    toast.innerHTML = `
      <i class="bi ${iconClass} fs-5" style="margin-top: 1px;"></i>
      <div style="flex-grow: 1; font-size: 0.9rem;">
        <strong style="display: block; font-family: var(--sk-font-heading); font-size: 0.98rem; margin-bottom: 2px;">${escapeHtml(title)}</strong>
        <span style="opacity: 0.85; line-height: 1.35; display: block; font-size: 0.82rem;">${escapeHtml(message)}</span>
      </div>
      <button type="button" style="background: none; border: none; color: #fff; opacity: 0.6; cursor: pointer; padding: 0 4px; font-size: 1.1rem;" aria-label="Close">&times;</button>
    `;

    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => {
      dismissToast(toast);
    });

    toastContainer.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });

    // Auto dismiss after 4.5s
    const timer = setTimeout(() => {
      dismissToast(toast);
    }, 4500);

    function dismissToast(el) {
      clearTimeout(timer);
      el.style.transform = 'translateX(120%)';
      el.style.opacity = '0';
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 350);
    }
  }

  // =========================================================================
  // 2. FILE DOWNLOAD UTILITY (Real Blob Generation)
  // =========================================================================
  function downloadBlob(filename, content, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  // =========================================================================
  // 3. INPUT RESTRICTIONS (Names block numbers, Phone/Card block letters)
  // =========================================================================
  function isNameInput(input) {
    const type = input.getAttribute('type') || 'text';
    if (type !== 'text') return false;
    const info = (input.name + ' ' + input.id + ' ' + (input.placeholder || '')).toLowerCase();
    return info.includes('name') || info.includes('vance') || info.includes('child') || info.includes('nickname') || info.includes('guardian') || info.includes('delegate');
  }

  function isNumericInput(input) {
    const type = input.getAttribute('type') || '';
    const info = (input.name + ' ' + input.id + ' ' + (input.placeholder || '')).toLowerCase();
    return type === 'tel' || type === 'number' || info.includes('phone') || info.includes('card') || info.includes('cvc') || info.includes('amount');
  }

  document.querySelectorAll('input').forEach(input => {
    if (isNameInput(input)) {
      input.addEventListener('input', function() {
        if (/[0-9]/.test(this.value)) {
          this.value = this.value.replace(/[0-9]/g, '');
        }
      });
      input.addEventListener('blur', function() {
        if (/[0-9]/.test(this.value)) {
          this.value = this.value.replace(/[0-9]/g, '');
        }
      });
    }

    if (isNumericInput(input)) {
      input.addEventListener('input', function() {
        const type = this.getAttribute('type');
        if (type === 'tel' || this.id.includes('phone')) {
          if (/[a-zA-Z]/.test(this.value)) {
            this.value = this.value.replace(/[a-zA-Z]/g, '');
          }
        } else if (type === 'number' || this.id.includes('card') || this.id.includes('cvc') || this.id.includes('amount')) {
          if (/[^\d\s\-]/.test(this.value)) {
            this.value = this.value.replace(/[^\d\s\-]/g, '');
          }
        }
      });
    }
  });

  // =========================================================================
  // 4. MULTI-CHILD SWITCHER (Leo Vance vs Maya Vance)
  // =========================================================================
  const childrenData = {
    leo: {
      key: "leo",
      name: "Leo Vance",
      age: "7 Years Old",
      program: "Little Thinkers: Discovery Pod",
      week: "Week 2 • June 22 – June 26",
      avatarBg: "var(--sk-aqua)",
      skillLevel: "Foundation (Level 2)",
      progressPercent: 45,
      nextSession: "Tomorrow, 09:00 AM",
      nextActivity: "Knight Outpost & Center Pawns Challenge",
      recentAchievement: "🌟 First Checkmate Badge",
      campFeeTotal: "$450.00",
      campFeePaid: "$450.00",
      campFeeDue: "$0.00",
      paymentStatus: "Paid in Full",
      room: "Pawns Studio A • North Hall"
    },
    maya: {
      key: "maya",
      name: "Maya Vance",
      age: "11 Years Old",
      program: "Strategic Minds: Tactics & Rapid Championship",
      week: "Week 3 • June 29 – July 03",
      avatarBg: "var(--sk-rose)",
      skillLevel: "Intermediate (Level 3)",
      progressPercent: 68,
      nextSession: "Thursday, 10:00 AM",
      nextActivity: "Discovered Attacks & Rapid Tournament Simulation",
      recentAchievement: "🏆 Tactical Thinker Trophy",
      campFeeTotal: "$580.00",
      campFeePaid: "$300.00",
      campFeeDue: "$280.00",
      paymentStatus: "Partial (Installment Due June 20)",
      room: "Grandmaster Hall B • Center"
    }
  };

  const childButtons = document.querySelectorAll('.child-select-pill');

  function updateChildUI(childKey) {
    const data = childrenData[childKey] || childrenData.leo;
    try {
      localStorage.setItem('sk_selected_child', childKey);
    } catch (e) {}

    document.querySelectorAll('.data-child-name').forEach(el => el.textContent = data.name);
    document.querySelectorAll('.data-child-age').forEach(el => el.textContent = data.age);
    document.querySelectorAll('.data-child-program').forEach(el => el.textContent = data.program);
    document.querySelectorAll('.data-child-week').forEach(el => el.textContent = data.week);
    document.querySelectorAll('.data-child-skill').forEach(el => el.textContent = data.skillLevel);
    document.querySelectorAll('.data-child-next-time').forEach(el => el.textContent = data.nextSession);
    document.querySelectorAll('.data-child-next-act').forEach(el => el.textContent = data.nextActivity);
    document.querySelectorAll('.data-child-badge').forEach(el => el.textContent = data.recentAchievement);
    document.querySelectorAll('.data-child-fee-total').forEach(el => el.textContent = data.campFeeTotal);
    document.querySelectorAll('.data-child-fee-paid').forEach(el => el.textContent = data.campFeePaid);
    document.querySelectorAll('.data-child-fee-due').forEach(el => el.textContent = data.campFeeDue);

    const progBar = document.getElementById('dashChildProgressBar');
    if (progBar) progBar.style.width = `${data.progressPercent}%`;

    const progText = document.getElementById('dashChildProgressText');
    if (progText) progText.textContent = `${data.progressPercent}% Complete`;

    // Highlight active child pills
    childButtons.forEach(btn => {
      if (btn.getAttribute('data-child') === childKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  childButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const childKey = btn.getAttribute('data-child');
      updateChildUI(childKey);
      const childName = childrenData[childKey]?.name || 'Camper';
      showToast('Active Camper Switched', `Viewing dashboard records for ${childName}`, 'bi-person-check-fill text-info');
    });
  });

  // Initialize stored child preference
  const savedChild = (typeof localStorage !== 'undefined') ? localStorage.getItem('sk_selected_child') : null;
  if (savedChild && childrenData[savedChild]) {
    updateChildUI(savedChild);
  }

  // =========================================================================
  // 5. CALENDAR SYNC (.ICS DOWNLOAD) (daily-schedule.html)
  // =========================================================================
  const btnSyncCal = document.getElementById('btnSyncCalendar');
  if (btnSyncCal) {
    btnSyncCal.addEventListener('click', () => {
      const activeName = document.querySelector('.data-child-name')?.textContent || 'Leo Vance';
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//StratKids Chess Camp//Daily Schedule//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:stratkids-2026-session-01@stratkids.com',
        'DTSTAMP:20260622T080000Z',
        'DTSTART:20260622T090000',
        'DTEND:20260622T123000',
        `SUMMARY:StratKids Chess Camp - ${activeName}`,
        'DESCRIPTION:Daily chess strategy, tactical puzzles, paired board drills, and outdoor recess.',
        'LOCATION:Pawns Studio A, StratKids Campus, 120 Chess Way, Boston, MA',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      downloadBlob(`StratKids_Camp_Schedule_${activeName.replace(/\s+/g, '_')}.ics`, ics, 'text/calendar');
      showToast('Calendar Synced', `Downloaded .ics schedule for ${activeName}. Open the file to add to Apple or Google Calendar.`, 'bi-calendar-check-fill text-success');
    });
  }

  // =========================================================================
  // 6. TAX STATEMENT DOWNLOAD (payments.html)
  // =========================================================================
  const btnTax = document.getElementById('btnDownloadTaxStatement');
  if (btnTax) {
    btnTax.addEventListener('click', () => {
      const content = [
        '====================================================================',
        'STRATKIDS CHESS & STRATEGY SUMMER CAMP - 2026 ANNUAL TAX STATEMENT',
        'Official Dependent Care Expense Statement',
        '====================================================================',
        '',
        'CAMP PROVIDER DETAILS:',
        'Organization: StratKids Chess & Strategy Camp LLC',
        'Federal Tax Identification (EIN): 82-9481023',
        'Campus Location: 120 Chess Way, Grandmaster Center, Boston, MA 02108',
        'Director Contact: finance@stratkids-camp.com | (555) 787-2854',
        '',
        'GUARDIAN DETAILS:',
        'Primary Guardian: Sarah Vance',
        'Billing Address: 742 Evergreen Terrace, Springfield, CA 90210',
        'Account Ref: SK-ACCT-889102',
        '',
        'ITEMIZED DEPENDENT TUITION PAID IN CALENDAR YEAR 2026:',
        '1. Camper: Leo Vance (DOB: 05/14/2019)',
        '   Program: Little Thinkers: Discovery Pod (Week 2 • June 22-26)',
        '   Transaction Ref: TXN-STRAT-89104 (Paid May 10, 2026)',
        '   Tuition Paid: $400.00',
        '',
        '2. Camper: Maya Vance (DOB: 08/21/2014)',
        '   Program: Strategic Minds: Tactics & Rapid (Week 3 • June 29-July 3)',
        '   Transaction Ref: TXN-STRAT-89105 (Paid May 10, 2026 - Installment 1)',
        '   Tuition Paid: $350.00',
        '',
        '--------------------------------------------------------------------',
        'TOTAL ELIGIBLE DEPENDENT EXPENSES PAID TO DATE: $750.00',
        'PENDING SCHEDULED INSTALLMENTS: $280.00 (Due June 20, 2026)',
        '--------------------------------------------------------------------',
        '',
        'Verified by: Financial Comptroller, StratKids Operations',
        'Document Generated: ' + new Date().toLocaleDateString(),
        '===================================================================='
      ].join('\n');

      downloadBlob('StratKids_2026_Tax_Statement_EIN-82-9481023.txt', content);
      showToast('Tax Statement Exported', 'Comprehensive 2026 Dependent Care Tax Statement (EIN #82-9481023) downloaded.', 'bi-file-earmark-text-fill text-success');
    });
  }

  // =========================================================================
  // 7. PAYMENT RECEIPTS (payments.html)
  // =========================================================================
  document.querySelectorAll('.btn-download-receipt').forEach(btn => {
    btn.addEventListener('click', () => {
      const txn = btn.getAttribute('data-txn') || 'TXN-STRAT-89104';
      const isMaya = txn.includes('89105');
      const camper = isMaya ? 'Maya Vance' : 'Leo Vance';
      const amount = isMaya ? '$350.00' : '$400.00';

      const content = [
        '====================================================================',
        'STRATKIDS CHESS & STRATEGY SUMMER CAMP - OFFICIAL PAYMENT RECEIPT',
        '====================================================================',
        `Receipt Reference: ${txn}`,
        `Payment Date: May 10, 2026`,
        `Payment Method: Visa ending in ••4102 (Approved: Auth #09281)`,
        `Guardian: Sarah Vance <sarah.vance@example.com>`,
        `Camper: ${camper}`,
        `Item: Summer 2026 Camp Tuition`,
        `Amount Paid: ${amount}`,
        `Balance Due: $0.00`,
        '--------------------------------------------------------------------',
        'Thank you for enrolling with StratKids Camp! Think. Play. Grow.',
        'Support: support@stratkids-camp.com',
        '===================================================================='
      ].join('\n');

      downloadBlob(`StratKids_Receipt_${txn}.txt`, content);
      showToast('Receipt Downloaded', `Official PDF receipt for ${txn} (${amount}) exported.`, 'bi-receipt text-success');
    });
  });

  // =========================================================================
  // 8. ENROLLMENT VOUCHERS (enrollments.html)
  // =========================================================================
  document.querySelectorAll('.btn-download-voucher').forEach(btn => {
    btn.addEventListener('click', () => {
      const camper = btn.getAttribute('data-camper') || 'Camper';
      const ref = btn.getAttribute('data-ref') || 'SK-2026-8812';

      const content = [
        '====================================================================',
        'STRATKIDS SUMMER CAMP - OFFICIAL ENROLLMENT CONFIRMATION VOUCHER',
        '====================================================================',
        `Camper Name: ${camper}`,
        `Registration Ref: ${ref}`,
        `Security Curbside PIN: 8841`,
        `Primary Guardian: Sarah Vance (+1 555-019-2831)`,
        `Session Dates: Summer Camp 2026`,
        `Status: CONFIRMED & SEED RESERVED`,
        '',
        'CAMPUS CHECK-IN PROTOCOL:',
        '1. Curbside drop-off is between 08:45 AM and 09:00 AM.',
        '2. Present this voucher or state your 4-digit security PIN: 8841.',
        '3. Pickups require an authorized photo-verified delegate.',
        '',
        'StratKids Camp Administration - Think. Play. Grow.',
        '===================================================================='
      ].join('\n');

      downloadBlob(`StratKids_Enrollment_Voucher_${camper.replace(/\s+/g, '_')}.txt`, content);
      showToast('Voucher Exported', `Official enrollment pass for ${camper} (Ref ${ref}) downloaded.`, 'bi-file-earmark-check-fill text-success');
    });
  });

  // =========================================================================
  // 9. PROGRESS REPORT PDF EXPORT (skill-progress.html)
  // =========================================================================
  const btnExportProg = document.getElementById('btnExportProgressPdf');
  if (btnExportProg) {
    btnExportProg.addEventListener('click', () => {
      const activeName = document.querySelector('.data-child-name')?.textContent || 'Leo Vance';
      const activeSkill = document.querySelector('.data-child-skill')?.textContent || 'Foundation (Level 2)';

      const content = [
        '====================================================================',
        'STRATKIDS CHESS & STRATEGY CAMP - WEEKLY SKILL PROGRESSION REPORT',
        '====================================================================',
        `Camper Name: ${activeName}`,
        `Current Milestone Level: ${activeSkill}`,
        `Report Period: Summer 2026 Week 2`,
        `Lead Evaluator: Elena Rostova, FIDE Master`,
        '',
        'COMPETENCY EVALUATION CHECKPOINTS:',
        ' [✓] Board Coordinates & Notation (A1-H8): 100% Mastery',
        ' [✓] Piece Values & Center Pawn Dominance: 100% Mastery',
        ' [✓] King Safety & Castling Protection: 100% Mastery',
        ' [→] Knight Fork Tactics & Double Attack: 68% (In Practice, 3/5 Solved)',
        ' [ ] Pawn Promotion & Endgame Technique: Upcoming',
        '',
        'COACH EVALUATION SUMMARY:',
        `"${activeName} has demonstrated exceptional tactical perception and wonderful sportsmanship during paired drills. Quick to recognize hidden pins and supports teammates with positive attitude."`,
        '===================================================================='
      ].join('\n');

      downloadBlob(`StratKids_Progress_Report_${activeName.replace(/\s+/g, '_')}.txt`, content);
      showToast('Progress Report Exported', `Weekly analytical report for ${activeName} downloaded.`, 'bi-ladder text-info');
    });
  }

  // Request Milestone Review
  const btnMilestoneCheck = document.getElementById('btnRequestMilestoneCheck');
  if (btnMilestoneCheck) {
    btnMilestoneCheck.addEventListener('click', () => {
      const activeName = document.querySelector('.data-child-name')?.textContent || 'Leo Vance';
      showToast('Milestone Check Requested', `Coach Elena has received your review request for ${activeName}'s current level and will evaluate during today's afternoon briefing.`, 'bi-chat-quote-fill text-rose');
    });
  }

  // =========================================================================
  // 10. CERTIFICATES ACTIONS (certificates.html)
  // =========================================================================
  const btnDownloadAllCert = document.getElementById('btnDownloadAllCertificates');
  if (btnDownloadAllCert) {
    btnDownloadAllCert.addEventListener('click', () => {
      const zipSummary = [
        '====================================================================',
        'STRATKIDS CHESS CAMP - FAMILY CERTIFICATES ARCHIVE PACKAGE',
        '====================================================================',
        'Included High-Resolution Credentials:',
        '1. Maya Vance - Certificate of Strategy Excellence (SK-2025-CERT-884)',
        '2. Leo Vance - Provisional Little Thinkers Explorer Diploma (SK-2026-DRAFT)',
        '',
        'Both documents verified by StratKids FIDE Certified Instructors.',
        '===================================================================='
      ].join('\n');

      downloadBlob('StratKids_Family_Certificates_2026.txt', zipSummary);
      showToast('Certificates Package Exported', 'All family certificates and diplomas downloaded in print package.', 'bi-award-fill text-warning');
    });
  }

  const btnDownloadCertMaya = document.getElementById('btnDownloadCertMaya');
  if (btnDownloadCertMaya) {
    btnDownloadCertMaya.addEventListener('click', () => {
      const certDoc = [
        '====================================================================',
        'STRATKIDS CHESS & STRATEGY CAMP - CERTIFICATE OF STRATEGY EXCELLENCE',
        '====================================================================',
        'Awarded with Distinction to: MAYA VANCE',
        'For: Outstanding tactical calculation, sportsmanship & tournament play',
        'Program: Smart Players Bootcamp (Summer 2025)',
        'Credential ID: SK-2025-CERT-884',
        'Verified by: Elena Rostova (FM) & Marcus Chen (Director)',
        '===================================================================='
      ].join('\n');

      downloadBlob('StratKids_Certificate_Maya_Vance.txt', certDoc);
      showToast('Diploma Downloaded', 'Official Certificate of Strategy Excellence downloaded for Maya Vance.', 'bi-patch-check-fill text-success');
    });
  }

  const btnPreviewCertLeo = document.getElementById('btnPreviewCertLeo');
  if (btnPreviewCertLeo) {
    btnPreviewCertLeo.addEventListener('click', () => {
      const modalEl = document.getElementById('certPreviewModal');
      if (modalEl) {
        const titleEl = modalEl.querySelector('h2');
        const progEl = modalEl.querySelector('h3');
        if (titleEl) titleEl.textContent = 'Leo Vance';
        if (progEl) progEl.textContent = 'Little Thinkers Chess Explorer Diploma';

        if (typeof bootstrap !== 'undefined') {
          const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
          modalInstance.show();
        }
      }
    });
  }

  const btnPrintCert = document.getElementById('btnPrintCertificate');
  if (btnPrintCert) {
    btnPrintCert.addEventListener('click', () => {
      showToast('Opening Print Dialog', 'Preparing 300DPI print layout...', 'bi-printer-fill text-primary');
      setTimeout(() => {
        window.print();
      }, 350);
    });
  }

  // =========================================================================
  // 11. ADD PICKUP DELEGATE MODAL & WORKFLOW (profile.html)
  // =========================================================================
  const addDelegateForm = document.getElementById('addDelegateForm');
  if (addDelegateForm) {
    addDelegateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('delegateFullName');
      const relationInput = document.getElementById('delegateRelation');
      const phoneInput = document.getElementById('delegatePhone');

      if (!nameInput || !phoneInput) return;

      const nameVal = nameInput.value.trim();
      const relVal = relationInput ? relationInput.value.trim() : 'Authorized Contact';
      const phoneVal = phoneInput.value.trim();

      if (!nameVal || !phoneVal) return;

      const container = document.getElementById('delegatesListContainer');
      if (container) {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        col.innerHTML = `
          <div class="p-3 rounded-4 border bg-light h-100 shadow-sm" style="border-left: 4px solid var(--sk-rose) !important;">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <strong class="text-dark small">${escapeHtml(nameVal)} (${escapeHtml(relVal)})</strong>
              <span class="badge bg-success rounded-pill">Authorized</span>
            </div>
            <div class="small text-muted">Phone: ${escapeHtml(phoneVal)} • Added by Guardian</div>
            <div class="small text-success"><i class="bi bi-shield-check me-1"></i>Curbside pickup security cleared</div>
          </div>
        `;
        container.appendChild(col);
      }

      addDelegateForm.reset();

      const modalEl = document.getElementById('addDelegateModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const inst = bootstrap.Modal.getInstance(modalEl);
        if (inst) inst.hide();
      }

      showToast('Authorized Delegate Added', `${nameVal} has been added to the curbside pickup security list.`, 'bi-person-check-fill text-success');
    });
  }

  // =========================================================================
  // 12. UPDATE PAYMENT CARD MODAL & WORKFLOW (payments.html)
  // =========================================================================
  const updateCardForm = document.getElementById('updateCardForm');
  if (updateCardForm) {
    updateCardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const numInput = document.getElementById('newCardNumber');
      const expInput = document.getElementById('newCardExpiry');

      const numVal = numInput ? numInput.value.replace(/\s+/g, '') : '4102';
      const last4 = numVal.length >= 4 ? numVal.slice(-4) : '9981';
      const expVal = expInput ? expInput.value : '09/2029';

      const cardDisplay = document.getElementById('activeCardDisplay');
      if (cardDisplay) {
        cardDisplay.textContent = `Visa ending in ••${last4}`;
      }
      const cardExpDisplay = document.getElementById('activeCardExpiryDisplay');
      if (cardExpDisplay) {
        cardExpDisplay.textContent = `Expires ${expVal} • Default Payment`;
      }

      updateCardForm.reset();

      const modalEl = document.getElementById('updateCardModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const inst = bootstrap.Modal.getInstance(modalEl);
        if (inst) inst.hide();
      }

      showToast('Payment Card Updated', `Default billing method updated to Visa ending in ••${last4}.`, 'bi-credit-card-2-front-fill text-success');
    });
  }

  // =========================================================================
  // 13. INTERACTIVE CHAT MESSENGER (messages.html)
  // =========================================================================
  const chatContacts = {
    elena: {
      name: "Coach Elena Rostova, FIDE Master",
      initials: "ER",
      status: "Active in Pawns Studio A",
      avatarBg: "var(--sk-rose)",
      messages: [
        { sender: "staff", name: "Coach Elena Rostova", text: "Good morning Sarah! Just wanted to share that Leo did a wonderful job with his knight outposts during this morning's warm-up challenge!", time: "09:42 AM" },
        { sender: "parent", name: "Sarah Vance", text: "That's amazing to hear! Thank you for the update. Will he need his notebook for this afternoon's team games?", time: "09:55 AM" },
        { sender: "staff", name: "Coach Elena Rostova", text: "Yes, please keep it in his backpack. We'll be stamping today's completion star right before dismissal at 12:30 PM!", time: "10:14 AM" }
      ],
      reply: "Thank you for the note, Sarah! We have made a note in the room binder. Looking forward to another exciting tactics session!"
    },
    marcus: {
      name: "Marcus Chen, Camp Director",
      initials: "MC",
      status: "Campus Operations Office",
      avatarBg: "var(--sk-aqua)",
      messages: [
        { sender: "staff", name: "Marcus Chen (Director)", text: "Hi Sarah, welcome to Summer 2026! We noticed Maya is registered for Strategic Minds Week 3. Her DGT clock and team jersey are reserved.", time: "Yesterday" },
        { sender: "parent", name: "Sarah Vance", text: "Thank you Marcus! Are guardians allowed to attend Friday's championship prize presentation?", time: "Yesterday" },
        { sender: "staff", name: "Marcus Chen (Director)", text: "Absolutely! The awards ceremony begins at 03:45 PM in Grandmaster Hall. Parents and siblings are warmly welcomed.", time: "Yesterday" }
      ],
      reply: "Hello Sarah, thanks for reaching out. The administration desk is always available for schedule or room questions."
    },
    hannah: {
      name: "Nurse Hannah (Campus Medical)",
      initials: "HN",
      status: "Health Center • First Aid Room 2",
      avatarBg: "var(--sk-yellow)",
      messages: [
        { sender: "staff", name: "Nurse Hannah (First Aid)", text: "Hello Mrs. Vance, confirming that Leo's EpiPen and peanut allergy care plan are safely logged in Studio A.", time: "June 12" },
        { sender: "parent", name: "Sarah Vance", text: "Thank you Nurse Hannah. He always keeps a backup in his blue lunch tote as well.", time: "June 12" },
        { sender: "staff", name: "Nurse Hannah (First Aid)", text: "Noted! All counselors have been briefed and Studio A is a strict nut-free zone.", time: "June 12" }
      ],
      reply: "Received! Camper wellness and dietary safety are our highest priorities. Let us know if any daily medications change."
    }
  };

  let activeChatContact = 'elena';
  const chatMessagesBox = document.getElementById('chatMessagesContainer');
  const chatInput = document.getElementById('chatInputMessage');
  const chatForm = document.getElementById('dashboardChatForm');

  function renderChat(contactKey) {
    const contact = chatContacts[contactKey];
    if (!contact || !chatMessagesBox) return;

    activeChatContact = contactKey;

    const nameEl = document.getElementById('chatHeaderContactName');
    const statusEl = document.getElementById('chatHeaderContactStatus');
    const avatarEl = document.getElementById('chatHeaderAvatar');

    if (nameEl) nameEl.textContent = contact.name;
    if (statusEl) statusEl.innerHTML = `<i class="bi bi-circle-fill me-1" style="font-size: 0.5rem;"></i>${contact.status}`;
    if (avatarEl) {
      avatarEl.textContent = contact.initials;
      avatarEl.style.background = contact.avatarBg;
      avatarEl.style.color = contact.avatarBg.includes('yellow') ? '#26333A' : '#FFFFFF';
    }

    chatMessagesBox.innerHTML = '';
    contact.messages.forEach(msg => {
      appendChatMessage(msg.sender, msg.name, msg.text, msg.time);
    });
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
  }

  function appendChatMessage(sender, name, text, time) {
    if (!chatMessagesBox) return;
    const isParent = sender === 'parent';
    const bubble = document.createElement('div');
    bubble.className = `d-flex justify-content-${isParent ? 'end' : 'start'} mb-3`;
    bubble.innerHTML = isParent ? `
      <div class="p-3 rounded-4 shadow-sm text-end" style="background-color: var(--sk-rose); color: #fff; max-width: 75%;">
        <p class="mb-1">${escapeHtml(text)}</p>
        <span class="small opacity-75" style="font-size: 0.72rem;">${escapeHtml(time)} • Sarah Vance</span>
      </div>
    ` : `
      <div class="p-3 rounded-4 shadow-sm text-start" style="background-color: var(--sk-surface-card); border: 2px solid var(--sk-aqua); max-width: 75%;">
        <strong class="d-block mb-1 text-primary" style="font-size: 0.85rem;"><i class="bi bi-shield-check"></i> ${escapeHtml(name)}</strong>
        <p class="mb-1">${escapeHtml(text)}</p>
        <span class="small text-muted" style="font-size: 0.72rem;">${escapeHtml(time)} • Camp Staff</span>
      </div>
    `;
    chatMessagesBox.appendChild(bubble);
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
  }

  // Handle contact list clicks
  document.querySelectorAll('.chat-contact-item').forEach(item => {
    item.addEventListener('click', () => {
      const key = item.getAttribute('data-contact');
      if (key && chatContacts[key]) {
        document.querySelectorAll('.chat-contact-item').forEach(i => i.classList.remove('active-contact'));
        item.classList.add('active-contact');
        renderChat(key);
      }
    });
  });

  if (chatForm && chatInput && chatMessagesBox) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      appendChatMessage('parent', 'Sarah Vance', text, 'Just now');
      chatInput.value = '';

      const currentContact = chatContacts[activeChatContact];
      if (currentContact) {
        currentContact.messages.push({
          sender: 'parent',
          name: 'Sarah Vance',
          text: text,
          time: 'Just now'
        });

        setTimeout(() => {
          appendChatMessage('staff', currentContact.name, currentContact.reply, 'Just now');
          currentContact.messages.push({
            sender: 'staff',
            name: currentContact.name,
            text: currentContact.reply,
            time: 'Just now'
          });
        }, 1100);
      }
    });
  }

  // =========================================================================
  // 14. PROFILE & PREFERENCES (profile.html)
  // =========================================================================
  const guardianForm = document.getElementById('primaryGuardianForm');
  if (guardianForm) {
    guardianForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Guardian Details Saved', 'Contact information, cell numbers, and address successfully updated.', 'bi-check-circle-fill text-success');
    });
  }

  const passwordForm = document.getElementById('passwordUpdateForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPass = document.getElementById('newPassword');
      const confirmPass = document.getElementById('confirmPassword');

      if (!newPass || !confirmPass) return;

      if (newPass.value.length < 8) {
        showToast('Password Error', 'New password must be at least 8 characters long.', 'bi-exclamation-triangle-fill text-warning');
        return;
      }

      if (newPass.value !== confirmPass.value) {
        showToast('Password Mismatch', 'The confirmation password does not match. Please re-enter.', 'bi-exclamation-circle-fill text-danger');
        return;
      }

      passwordForm.reset();
      showToast('Password Updated', 'Your parent portal security credentials have been successfully updated.', 'bi-shield-lock-fill text-success');
    });
  }

  // Notification toggles
  document.querySelectorAll('.form-check-input[role="switch"]').forEach(toggle => {
    toggle.addEventListener('change', () => {
      showToast('Preference Updated', 'Your camp alert notification preferences have been saved.', 'bi-bell-fill text-warning');
    });
  });

  // =========================================================================
  // 15. ADD CHILD FORM (children.html)
  // =========================================================================
  const addChildForm = document.getElementById('addChildForm');
  if (addChildForm) {
    addChildForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('newChildFullName');
      const name = nameInput ? nameInput.value.trim() : 'Camper';

      const modalEl = document.getElementById('addChildModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const inst = bootstrap.Modal.getInstance(modalEl);
        if (inst) inst.hide();
      }

      showToast('New Profile Created', `Child profile for ${name} has been created and sibling discount applied!`, 'bi-person-plus-fill text-success');
      addChildForm.reset();
    });
  }

  // =========================================================================
  // 16. DEMO PAYMENT SIMULATOR (payments.html)
  // =========================================================================
  const paymentForm = document.getElementById('demoPaymentForm');
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusDiv = document.getElementById('paymentModalResult');
      if (statusDiv) {
        statusDiv.innerHTML = `
          <div class="alert alert-success d-flex align-items-center gap-2 mt-3" role="alert">
            <i class="bi bi-check-circle-fill text-success fs-4"></i>
            <div>
              <strong>Payment Processed Successfully!</strong><br>
              <span class="small">Transaction Ref: <strong>TXN-STRAT-99201</strong>. A digital receipt has been sent to your primary email.</span>
            </div>
          </div>
        `;
      }
      showToast('Payment Successful', 'Transaction Ref: TXN-STRAT-99201. Confirmation emailed to sarah.vance@example.com.', 'bi-wallet-fill text-success');
      paymentForm.reset();
    });
  }

  // =========================================================================
  // 17. SESSION TRANSFER & CONFERENCE (enrollments.html & messages.html)
  // =========================================================================
  const transferForm = document.getElementById('transferSessionForm');
  if (transferForm) {
    transferForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modalEl = document.getElementById('changeSessionModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const inst = bootstrap.Modal.getInstance(modalEl);
        if (inst) inst.hide();
      }
      showToast('Session Transfer Requested', 'Our camp director will confirm room placement within 4 hours.', 'bi-arrow-repeat text-info');
    });
  }

  const confForm = document.getElementById('conferenceForm');
  if (confForm) {
    confForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modalEl = document.getElementById('conferenceModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const inst = bootstrap.Modal.getInstance(modalEl);
        if (inst) inst.hide();
      }
      showToast('Conference Booked', 'Coach conference requested! A calendar invite has been emailed to you.', 'bi-calendar-event-fill text-success');
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
});
