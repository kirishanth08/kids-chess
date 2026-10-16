/**
 * STRATKIDS - Skill Progression System
 * Interactive Level Ladder (Beginner -> Foundation -> Intermediate -> Advanced -> Young Strategist)
 * Pure Vanilla JS, No external chart libraries.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const skillData = {
    beginner: {
      title: "Level 1: Beginner",
      badge: "♟️ Chess Explorer",
      progress: "100%",
      status: "Completed",
      description: "Mastered the board layout, ranks, files, diagonals, and how every piece moves with confidence.",
      skills: [
        { name: "Board Orientation & Coordinate System", done: true },
        { name: "Pawn Structure & Promotion Basics", done: true },
        { name: "Piece Values & Exchange Math", done: true },
        { name: "Check & Checkmate Detection", done: true }
      ]
    },
    foundation: {
      title: "Level 2: Foundation",
      badge: "♞ Tactical Knight",
      progress: "100%",
      status: "Completed",
      description: "Understands central control, piece development, King castling safety, and simple 1-move tactics.",
      skills: [
        { name: "Opening Principles (Center Control)", done: true },
        { name: "Forks, Pins, and Skewers (Basic)", done: true },
        { name: "King Castling & Defense Formations", done: true },
        { name: "Back-Rank Mate Mechanics", done: true }
      ]
    },
    intermediate: {
      title: "Level 3: Intermediate (Current Active)",
      badge: "♝ Strategy Bishop",
      progress: "68%",
      status: "In Progress",
      description: "Actively training in 2-to-3 move tactical motifs, pawn structures, and positional outposts.",
      skills: [
        { name: "Discovered Attacks & Double Checks", done: true },
        { name: "Deflection & Decoy Puzzles (20/30)", done: true },
        { name: "Middle-Game Outpost Creation", done: false },
        { name: "Rook Endgames: Lucena & Philidor", done: false }
      ]
    },
    advanced: {
      title: "Level 4: Advanced",
      badge: "♜ Endgame Rook",
      progress: "20%",
      status: "Upcoming",
      description: "Deep calculation techniques, candidate moves evaluation, and positional advantage conversion.",
      skills: [
        { name: "Candidate Move Tree Analysis", done: false },
        { name: "Pawn Breakthroughs in King & Pawn Endings", done: false },
        { name: "Time Management Under Rapid Clocks", done: false },
        { name: "Prophylaxis (Preventing Opponent Plans)", done: false }
      ]
    },
    strategist: {
      title: "Level 5: Young Strategist",
      badge: "👑 Grand Strategist",
      progress: "0%",
      status: "Locked",
      description: "Mastery of camp championship play, psychological resilience, and sportsmanship leadership.",
      skills: [
        { name: "Tournament Game Notation & Post-Game Analysis", done: false },
        { name: "Opening Repertoire Preparation", done: false },
        { name: "Camp Championship Tournament Semifinals", done: false },
        { name: "Peer Strategy Mentorship", done: false }
      ]
    }
  };

  const stepElements = document.querySelectorAll('.milestone-step');
  const levelTitle = document.getElementById('activeLevelTitle');
  const levelBadge = document.getElementById('activeLevelBadge');
  const levelDesc = document.getElementById('activeLevelDesc');
  const levelProgressBar = document.getElementById('activeLevelProgressBar');
  const levelProgressText = document.getElementById('activeLevelProgressText');
  const levelSkillList = document.getElementById('activeLevelSkillList');
  const trackBar = document.querySelector('.level-milestone-track-progress');

  function renderLevel(levelKey) {
    const data = skillData[levelKey];
    if (!data) return;

    if (levelTitle) levelTitle.textContent = data.title;
    if (levelBadge) levelBadge.textContent = data.badge;
    if (levelDesc) levelDesc.textContent = data.description;
    if (levelProgressBar) levelProgressBar.style.width = data.progress;
    if (levelProgressText) levelProgressText.textContent = `${data.progress} Completed (${data.status})`;

    if (levelSkillList) {
      levelSkillList.innerHTML = '';
      data.skills.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center justify-content-between py-2';
        li.innerHTML = `
          <span>
            <i class="bi ${item.done ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'} me-2"></i>
            ${item.name}
          </span>
          <span class="badge ${item.done ? 'bg-success' : 'bg-secondary'} rounded-pill">
            ${item.done ? 'Mastered' : 'In Practice'}
          </span>
        `;
        levelSkillList.appendChild(li);
      });
    }

    // Update track width indicator
    const trackWidths = {
      beginner: '0%',
      foundation: '25%',
      intermediate: '50%',
      advanced: '75%',
      strategist: '100%'
    };
    if (trackBar) {
      trackBar.style.width = trackWidths[levelKey] || '50%';
    }
  }

  stepElements.forEach(step => {
    step.addEventListener('click', () => {
      stepElements.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      const levelKey = step.getAttribute('data-level');
      renderLevel(levelKey);
    });
  });

  // Render initial default (intermediate)
  renderLevel('intermediate');
});
