/**
 * STRATKIDS - Main JavaScript
 * Handles sticky navbar, back-to-top button, active nav states, counters, tooltips
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Universal Input Restrictions: Name fields strictly reject numbers; Phone/Number fields strictly reject letters
  document.addEventListener('input', (e) => {
    const target = e.target;
    if (!target || target.tagName !== 'INPUT') return;

    const type = target.getAttribute('type') || 'text';
    const tag = (target.name + ' ' + target.id + ' ' + (target.placeholder || '')).toLowerCase();
    const isName = type === 'text' && (tag.includes('name') || tag.includes('child') || tag.includes('parent') || tag.includes('guardian') || tag.includes('nickname') || tag.includes('camper') || tag.includes('vance'));
    const isPhone = type === 'tel' || tag.includes('phone') || tag.includes('mobile');
    const isPureNumber = type === 'number' || tag.includes('card') || tag.includes('cvc') || tag.includes('amount');

    if (isName) {
      if (/[0-9]/.test(target.value)) {
        target.value = target.value.replace(/[0-9]/g, '');
      }
    } else if (isPhone) {
      if (/[a-zA-Z]/.test(target.value)) {
        target.value = target.value.replace(/[a-zA-Z]/g, '');
      }
    } else if (isPureNumber) {
      if (/[^\d\s\-]/.test(target.value)) {
        target.value = target.value.replace(/[^\d\s\-]/g, '');
      }
    }
  });

  // 1. Sticky Navbar Shrink on Scroll
  const navbar = document.querySelector('.stratkids-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Active Nav Link Detector
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.stratkids-navbar .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkFile = href.split('/').pop();
      if (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html')) {
        link.classList.add('active');
      }
    }
  });

  // 3. Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Subtle Counter Animation for Stats
  const statNumbers = document.querySelectorAll('.stat-count');
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || el.innerText, 10);
          if (!isNaN(target)) {
            let start = 0;
            const duration = 1400;
            const stepTime = Math.abs(Math.floor(duration / target)) || 20;
            const timer = setInterval(() => {
              start += Math.ceil(target / 40);
              if (start >= target) {
                el.innerText = target.toLocaleString();
                clearInterval(timer);
              } else {
                el.innerText = start.toLocaleString();
              }
            }, stepTime);
          }
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(num => observer.observe(num));
  }

  // 5. Bootstrap Tooltip Initialization
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  // 6. Interactive Chess Tactical Puzzle Widget Engine (Supports all puzzle instances)
  const puzzleWidgets = document.querySelectorAll('.tactical-puzzle-widget');
  puzzleWidgets.forEach(puzzleWidget => {
    const choiceBtns = puzzleWidget.querySelectorAll('.puzzle-choice-btn');
    const feedbackBox = puzzleWidget.querySelector('.puzzle-feedback-msg');
    const targetSquares = puzzleWidget.querySelectorAll('.mini-square[data-sq]');

    choiceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        const targetSq = btn.getAttribute('data-target-sq');

        choiceBtns.forEach(b => b.classList.remove('correct', 'wrong'));
        targetSquares.forEach(sq => sq.classList.remove('sq-highlight', 'sq-target'));

        if (isCorrect) {
          btn.classList.add('correct');
          if (feedbackBox) {
            feedbackBox.className = 'puzzle-feedback-msg feedback-success';
            feedbackBox.innerHTML = '<i class="bi bi-trophy-fill me-2 text-warning"></i> <strong>Brilliant Move! Checkmate in 1!</strong> (+50 Camp XP Unlocked)';
          }
          if (targetSq) {
            const sqEl = puzzleWidget.querySelector(`.mini-square[data-sq="${targetSq}"]`);
            if (sqEl) sqEl.classList.add('sq-highlight');
          }
        } else {
          btn.classList.add('wrong');
          const hint = btn.getAttribute('data-hint') || 'Close! But the king escapes. Look for the protected knight fork!';
          if (feedbackBox) {
            feedbackBox.className = 'puzzle-feedback-msg feedback-fail';
            feedbackBox.innerHTML = `<i class="bi bi-lightbulb-fill me-2 text-warning"></i> ${hint}`;
          }
        }
      });
    });
  });

  // 7. Dual Perspective Lens Switcher ("Camper Fun" vs "Parent Peace of Mind")
  const lensBox = document.querySelector('.perspective-lens-box');
  if (lensBox) {
    const lensBtns = lensBox.querySelectorAll('.lens-btn');
    const camperViews = document.querySelectorAll('.lens-view-camper');
    const parentViews = document.querySelectorAll('.lens-view-parent');

    lensBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lensType = btn.getAttribute('data-lens');
        lensBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (lensType === 'camper') {
          camperViews.forEach(v => v.classList.remove('d-none'));
          parentViews.forEach(v => v.classList.add('d-none'));
        } else {
          camperViews.forEach(v => v.classList.add('d-none'));
          parentViews.forEach(v => v.classList.remove('d-none'));
        }
      });
    });
  }

  // 8. Interactive Live Tuition Estimator (Pricing Page & Enrollment)
  const tuitionSlider = document.getElementById('calcWeeksRange');
  if (tuitionSlider) {
    const weeksVal = document.getElementById('calcWeeksVal');
    const siblingCheck = document.getElementById('calcSiblingToggle');
    const lunchCheck = document.getElementById('calcLunchToggle');
    const totalPriceEl = document.getElementById('calcTotalOutput');
    const pricePerWeekEl = document.getElementById('calcPerWeekOutput');

    function updateTuition() {
      const weeks = parseInt(tuitionSlider.value, 10) || 1;
      if (weeksVal) weeksVal.textContent = `${weeks} ${weeks === 1 ? 'Week' : 'Weeks'}`;

      let basePerWeek = 480;
      if (weeks >= 4) basePerWeek = 430; // 4+ weeks bundle
      if (weeks >= 8) basePerWeek = 390; // Full summer bundle

      let total = basePerWeek * weeks;
      if (lunchCheck && lunchCheck.checked) {
        total += 65 * weeks; // Catered lunch & snack
      }
      if (siblingCheck && siblingCheck.checked) {
        total = Math.round(total * 0.85); // 15% Sibling Credit
      }

      if (totalPriceEl) totalPriceEl.textContent = `$${total.toLocaleString()}`;
      if (pricePerWeekEl) pricePerWeekEl.textContent = `$${Math.round(total / weeks)}/wk`;
    }

    tuitionSlider.addEventListener('input', updateTuition);
    if (siblingCheck) siblingCheck.addEventListener('change', updateTuition);
    if (lunchCheck) lunchCheck.addEventListener('change', updateTuition);
    updateTuition();
  }

  // 9. Interactive Camp Track / Pod Selector
  const podFinder = document.querySelector('.interactive-pod-finder');
  if (podFinder) {
    const podTabs = podFinder.querySelectorAll('.pod-tab-btn');
    const podTitle = podFinder.querySelector('.pod-target-title');
    const podAge = podFinder.querySelector('.pod-target-age');
    const podFocus = podFinder.querySelector('.pod-target-focus');
    const podBadge = podFinder.querySelector('.pod-target-badge');

    const podData = {
      pawns: {
        title: 'Little Pawns Strategy Club',
        age: 'Ages 5–7 • 1:5 Pod Ratio',
        focus: 'Playful piece adventures, giant outdoor board games, pattern discovery & story-driven checkmate quests.',
        badge: 'Beginner Foundations'
      },
      knights: {
        title: 'Tactics Knights Arena',
        age: 'Ages 8–10 • 1:6 Pod Ratio',
        focus: 'Forks, skewers, pin tactics, speed calculation drills, time management & tabletop strategy relays.',
        badge: 'Intermediate Tactics'
      },
      kings: {
        title: 'Grandmaster Minds Prep',
        age: 'Ages 11–14 • 1:6 Pod Ratio',
        focus: 'Deep candidate calculation trees, tournament clock pressure, endgame theory & post-game master notation review.',
        badge: 'Advanced Masters'
      }
    };

    podTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const podKey = tab.getAttribute('data-pod');
        podTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        if (podData[podKey]) {
          if (podTitle) podTitle.textContent = podData[podKey].title;
          if (podAge) podAge.innerHTML = podData[podKey].age;
          if (podFocus) podFocus.textContent = podData[podKey].focus;
          if (podBadge) podBadge.textContent = podData[podKey].badge;
        }
      });
    });
  }

  // ==========================================================================
  // 10. Interactive Chess Coins Academy & Movement Visualizer Engine
  // ==========================================================================
  const visualizerBoardEl = document.getElementById('visualizerBoard');
  const coinSelectorList = document.getElementById('coinSelectorList');

  if (visualizerBoardEl && coinSelectorList) {
    let currentPiece = 'king';
    let isWhitePiece = true;
    let piecePos = [3, 4]; // default row 3, col 4 (d5 / e5 area)

    const pieceDatabase = {
      king: {
        name: 'The King',
        glyphWhite: '\u2654',
        glyphBlack: '\u265A',
        badge: 'Supreme Leader',
        value: 'Infinite Value',
        title: 'How the King Moves',
        desc: 'The King moves exactly 1 square in any direction: vertically, horizontally, or diagonally. He can never step onto a square under attack by an enemy piece.',
        special: 'Castling! The King steps 2 squares toward a Rook while the Rook hops right over him into safety.',
        tip: 'Keep your King castled safely in the opening, then bring him actively into the center during the endgame!',
        defaultPos: [3, 4]
      },
      queen: {
        name: 'The Queen',
        glyphWhite: '\u2655',
        glyphBlack: '\u265B',
        badge: 'Tactical Powerhouse',
        value: '9 Points',
        title: 'How the Queen Moves',
        desc: 'The Queen is the most lethal piece on the board. She combines the powers of the Rook and Bishop, moving any number of vacant squares in any direction: rank, file, or diagonal!',
        special: 'Multi-direction fork! Can threaten a check on the King and capture an unprotected Rook at the same time.',
        tip: 'Don\'t bring the Queen out too early in the game, or enemy pawns and knights will chase her around!',
        defaultPos: [3, 3]
      },
      rook: {
        name: 'The Rook / Castle',
        glyphWhite: '\u2656',
        glyphBlack: '\u265C',
        badge: 'The Cannon Tower',
        value: '5 Points',
        title: 'How the Rook Moves',
        desc: 'The Rook travels in completely straight lines: forward, backward, left, or right along any rank or file as far as open space allows.',
        special: 'Controls open files and delivers deadly back-rank checkmates with the King or other Rook.',
        tip: 'Connect your two Rooks along the back row and place them on open files to control the board!',
        defaultPos: [3, 3]
      },
      bishop: {
        name: 'The Bishop',
        glyphWhite: '\u2657',
        glyphBlack: '\u265D',
        badge: 'Diagonal Sniper',
        value: '3 Points',
        title: 'How the Bishop Moves',
        desc: 'The Bishop glides diagonally along squares of its own color. One Bishop is light-squared and the other is dark-squared, never leaving its chosen color highway.',
        special: 'Long-range pins! Can pin an enemy knight or queen against the opponent\'s king from across the entire board.',
        tip: 'A pair of Bishops working together can sweep the entire board and control both colors!',
        defaultPos: [3, 4]
      },
      knight: {
        name: 'The Knight / Horse',
        glyphWhite: '\u2658',
        glyphBlack: '\u265E',
        badge: 'The Leaping Ninja',
        value: '3 Points',
        title: 'How the Knight Moves',
        desc: 'The Knight moves in a special \'L\' shape: 2 squares in one direction, and then 1 square perpendicular. It is the ONLY piece on the chessboard that can leap over other pieces!',
        special: 'Royal Fork! Can jump over pawns to simultaneously attack King, Queen, and Rook.',
        tip: 'A Knight on the rim is dim! Position your knights in the center of the board where they control 8 squares instead of only 2.',
        defaultPos: [3, 3]
      },
      pawn: {
        name: 'The Pawn',
        glyphWhite: '\u2659',
        glyphBlack: '\u265F',
        badge: 'The Foot Soldier',
        value: '1 Point',
        title: 'How the Pawn Moves',
        desc: 'Pawns march forward 1 square at a time. On their very first move, they have the option to advance 2 squares forward. Unlike other pieces, pawns CAPTURE diagonally 1 square forward!',
        special: 'Pawn Promotion! If a brave pawn reaches the other side of the board (8th rank), it can promote into a Queen!',
        tip: 'Pawns can never move backwards, so think twice before pushing them forward!',
        defaultPos: [5, 3]
      }
    };

    let movesCounter = 0;

    const vectorStyles = {
      king: 'Omni 1-Step',
      queen: 'Rays (Rank/File/Diag)',
      rook: 'Straight Lines (Rank/File)',
      bishop: 'Diagonal Rays',
      knight: 'L-Shape Leap (2+1)',
      pawn: 'Advance + Diagonal Strike'
    };

    const coachChallenges = {
      king: 'Master Challenge: Move the King to any corner (a1, h1, a8, h8) to see his coverage shrink from 8 squares down to 3!',
      queen: 'Master Challenge: Place the Queen in the center (d4/e5) where she sweeps up to 27 squares simultaneously!',
      rook: 'Master Challenge: Move the Rook anywhere on an open board—notice it always commands exactly 14 squares!',
      bishop: 'Master Challenge: Notice the Bishop glides strictly along light or dark squares without ever jumping colors!',
      knight: 'Master Challenge: Test the "Knight on the rim is dim" principle—observe how corner knights only reach 2 squares!',
      pawn: 'Master Challenge: March the Pawn toward the 8th rank to visualize how foot soldiers become Queens!'
    };

    function getAlgebraicSquare(r, c) {
      const file = String.fromCharCode(97 + c);
      const rank = 8 - r;
      return `${file}${rank}`;
    }

    function getBoardZone(r, c) {
      if ((r === 3 || r === 4) && (c === 3 || c === 4)) return 'Center Core';
      if (r >= 2 && r <= 5 && c >= 2 && c <= 5) return 'Extended Center';
      if ((r === 0 || r === 7) && (c === 0 || c === 7)) return 'Corner Outpost';
      if (r === 0 || r === 7 || c === 0 || c === 7) return 'Board Rim';
      return 'Active Flank';
    }

    function inBounds(r, c) {
      return r >= 0 && r < 8 && c >= 0 && c < 8;
    }

    function calculateValidMoves(type, r, c) {
      const moves = [];
      const captures = [];

      if (type === 'king') {
        const deltas = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
        deltas.forEach(([dr, dc]) => {
          if (inBounds(r + dr, c + dc)) moves.push([r + dr, c + dc]);
        });
      } else if (type === 'queen') {
        const directions = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
        directions.forEach(([dr, dc]) => {
          let step = 1;
          while (inBounds(r + dr * step, c + dc * step)) {
            moves.push([r + dr * step, c + dc * step]);
            step++;
          }
        });
      } else if (type === 'rook') {
        const directions = [[-1,0], [1,0], [0,-1], [0,1]];
        directions.forEach(([dr, dc]) => {
          let step = 1;
          while (inBounds(r + dr * step, c + dc * step)) {
            moves.push([r + dr * step, c + dc * step]);
            step++;
          }
        });
      } else if (type === 'bishop') {
        const directions = [[-1,-1], [-1,1], [1,-1], [1,1]];
        directions.forEach(([dr, dc]) => {
          let step = 1;
          while (inBounds(r + dr * step, c + dc * step)) {
            moves.push([r + dr * step, c + dc * step]);
            step++;
          }
        });
      } else if (type === 'knight') {
        const deltas = [[-2,-1], [-2,1], [-1,-2], [-1,2], [1,-2], [1,2], [2,-1], [2,1]];
        deltas.forEach(([dr, dc]) => {
          if (inBounds(r + dr, c + dc)) moves.push([r + dr, c + dc]);
        });
      } else if (type === 'pawn') {
        const forward = isWhitePiece ? -1 : 1;
        // Forward 1 step
        if (inBounds(r + forward, c)) moves.push([r + forward, c]);
        // Initial 2 steps
        const homeRank = isWhitePiece ? 6 : 1;
        if (r === homeRank || r === 5) {
          if (inBounds(r + forward * 2, c)) moves.push([r + forward * 2, c]);
        }
        // Diagonal capture targets
        if (inBounds(r + forward, c - 1)) captures.push([r + forward, c - 1]);
        if (inBounds(r + forward, c + 1)) captures.push([r + forward, c + 1]);
      }

      return { moves, captures };
    }

    function renderVisualizer() {
      visualizerBoardEl.innerHTML = '';
      const pieceInfo = pieceDatabase[currentPiece];
      const { moves, captures } = calculateValidMoves(currentPiece, piecePos[0], piecePos[1]);

      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const cell = document.createElement('div');
          const isLight = (r + c) % 2 === 0;
          cell.className = `board-cell ${isLight ? 'sq-white' : 'sq-black'}`;
          cell.setAttribute('data-r', r);
          cell.setAttribute('data-c', c);

          const isCurrentPieceSquare = (r === piecePos[0] && c === piecePos[1]);
          const isValidMove = moves.some(([mr, mc]) => mr === r && mc === c);
          const isCapture = captures.some(([cr, cc]) => cr === r && cc === c);

          if (isCurrentPieceSquare) {
            cell.classList.add('sq-selected');
            const glyph = isWhitePiece ? pieceInfo.glyphWhite : pieceInfo.glyphBlack;
            cell.innerHTML = `<span class="piece-glyph ${isWhitePiece ? 'white-piece' : 'black-piece'}">${glyph}</span>`;
          } else if (isValidMove) {
            cell.classList.add('sq-valid-move');
          } else if (isCapture) {
            cell.classList.add('sq-valid-move', 'sq-capture-target');
            // Show demo target piece on capture square
            cell.innerHTML = `<span class="piece-glyph black-piece" style="opacity: 0.6; font-size: 1.3rem;">\u265F</span>`;
          }

          cell.addEventListener('click', () => {
            if (piecePos[0] !== r || piecePos[1] !== c) {
              movesCounter++;
            }
            piecePos = [r, c];
            renderVisualizer();
          });

          visualizerBoardEl.appendChild(cell);
        }
      }

      // Update Live Telemetry & Stats Elements
      const vActiveSquare = document.getElementById('vActiveSquare');
      const vMoveCounter = document.getElementById('vMoveCounter');
      const vStatCoverage = document.getElementById('vStatCoverage');
      const vStatVector = document.getElementById('vStatVector');
      const vStatZone = document.getElementById('vStatZone');
      const vCoachChallenge = document.getElementById('vCoachChallenge');
      const telemetryPieceBadge = document.getElementById('telemetryPieceBadge');

      if (vActiveSquare) vActiveSquare.textContent = getAlgebraicSquare(piecePos[0], piecePos[1]);
      if (vMoveCounter) vMoveCounter.textContent = movesCounter;
      if (vStatCoverage) vStatCoverage.textContent = `${moves.length + captures.length} Squares`;
      if (vStatVector) vStatVector.textContent = vectorStyles[currentPiece] || 'Dynamic';
      if (vStatZone) vStatZone.textContent = getBoardZone(piecePos[0], piecePos[1]);
      if (vCoachChallenge) vCoachChallenge.innerHTML = coachChallenges[currentPiece] || 'Explore moves by tapping any highlighted square.';
      if (telemetryPieceBadge) telemetryPieceBadge.innerHTML = `<i class="bi bi-cpu-fill text-info me-1"></i> ${pieceInfo.name} Telemetry`;
    }

    function updateGuideBox() {
      const info = pieceDatabase[currentPiece];
      const guideTitle = document.getElementById('guideTitle');
      const guideBadge = document.getElementById('guideBadge');
      const guideValue = document.getElementById('guideValue');
      const guideDesc = document.getElementById('guideDesc');
      const guideSpecial = document.getElementById('guideSpecial');
      const guideTip = document.getElementById('guideTip');

      if (guideTitle) guideTitle.textContent = info.title;
      if (guideBadge) guideBadge.innerHTML = `<i class="bi bi-shield-fill-check"></i> ${info.badge}`;
      if (guideValue) guideValue.textContent = info.value;
      if (guideDesc) guideDesc.textContent = info.desc;
      if (guideSpecial) guideSpecial.textContent = info.special;
      if (guideTip) guideTip.innerHTML = `<i class="bi bi-chat-quote-fill text-warning me-1"></i> <strong>Coach Tip:</strong> &ldquo;${info.tip}&rdquo;`;
    }

    // Handle Coin Card Button Clicks
    const coinButtons = coinSelectorList.querySelectorAll('.coin-card-btn');
    coinButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        coinButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPiece = btn.getAttribute('data-piece');
        piecePos = [...pieceDatabase[currentPiece].defaultPos];
        updateGuideBox();
        renderVisualizer();
      });
    });

    // Reset Visualizer Button
    const btnResetVisualizer = document.getElementById('btnResetVisualizer');
    if (btnResetVisualizer) {
      btnResetVisualizer.addEventListener('click', () => {
        piecePos = [...pieceDatabase[currentPiece].defaultPos];
        renderVisualizer();
      });
    }

    // Toggle Coin Color Button
    const btnTogglePieceColor = document.getElementById('btnTogglePieceColor');
    if (btnTogglePieceColor) {
      btnTogglePieceColor.addEventListener('click', () => {
        isWhitePiece = !isWhitePiece;
        renderVisualizer();
      });
    }

    // Initial Visualizer Render
    updateGuideBox();
    renderVisualizer();
  }

  // ==========================================================================
  // 11. Playable Daily Puzzle Chessboard Engine (Direct Piece Movement)
  // ==========================================================================
  const playableChessboardEl = document.getElementById('playableChessboard');
  if (playableChessboardEl) {
    const feedbackEl = document.getElementById('playablePuzzleFeedback');
    const capturedTrayEl = document.getElementById('capturedTray');
    const btnResetPuzzle = document.getElementById('btnResetPlayableBoard');
    const btnPuzzleHint = document.getElementById('btnPuzzleHint');
    const btnPuzzleFreePlay = document.getElementById('btnPuzzleFreePlay');

    let isFreePlay = false;
    let selectedSquare = null;
    let capturedList = [];

    // Puzzle Initial Position (Smothered Mate in 1)
    // Board 8x8 representation: null or { type, isWhite, glyph }
    function getInitialPuzzleState() {
      const b = Array(8).fill(null).map(() => Array(8).fill(null));

      // White Pieces
      b[7][6] = { type: 'king', isWhite: true, glyph: '\u2654' }; // g1
      b[7][4] = { type: 'rook', isWhite: true, glyph: '\u2656' }; // e1
      b[6][5] = { type: 'pawn', isWhite: true, glyph: '\u2659' }; // f2
      b[6][6] = { type: 'pawn', isWhite: true, glyph: '\u2659' }; // g2
      b[6][7] = { type: 'pawn', isWhite: true, glyph: '\u2659' }; // h2
      b[3][3] = { type: 'queen', isWhite: true, glyph: '\u2655' }; // d5
      b[3][6] = { type: 'knight', isWhite: true, glyph: '\u2658' }; // g5

      // Black Pieces
      b[0][7] = { type: 'king', isWhite: false, glyph: '\u265A' }; // h8
      b[0][5] = { type: 'rook', isWhite: false, glyph: '\u265C' }; // f8
      b[1][5] = { type: 'pawn', isWhite: false, glyph: '\u265F' }; // f7
      b[1][6] = { type: 'pawn', isWhite: false, glyph: '\u265F' }; // g7
      b[1][7] = { type: 'pawn', isWhite: false, glyph: '\u265F' }; // h7

      return b;
    }

    let boardState = getInitialPuzzleState();

    function renderPlayableBoard() {
      playableChessboardEl.innerHTML = '';

      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const cell = document.createElement('div');
          const isLight = (r + c) % 2 === 0;
          cell.className = `board-cell ${isLight ? 'sq-white' : 'sq-black'}`;
          cell.setAttribute('data-r', r);
          cell.setAttribute('data-c', c);

          const piece = boardState[r][c];

          if (selectedSquare && selectedSquare[0] === r && selectedSquare[1] === c) {
            cell.classList.add('sq-selected');
          }

          if (piece) {
            cell.classList.add('sq-has-piece');
            cell.innerHTML = `<span class="piece-glyph ${piece.isWhite ? 'white-piece' : 'black-piece'}">${piece.glyph}</span>`;
          }

          // If a square is selected, highlight valid destinations
          if (selectedSquare) {
            const [sr, sc] = selectedSquare;
            const srcPiece = boardState[sr][sc];
            if (srcPiece) {
              const isTarget = isLegalMove(srcPiece, sr, sc, r, c);
              if (isTarget) {
                cell.classList.add('sq-valid-move');
                if (piece && piece.isWhite !== srcPiece.isWhite) {
                  cell.classList.add('sq-capture-target');
                }
              }
            }
          }

          cell.addEventListener('click', () => handleCellClick(r, c));
          playableChessboardEl.appendChild(cell);
        }
      }
    }

    function isLegalMove(piece, fromR, fromC, toR, toC) {
      if (fromR === toR && fromC === toC) return false;
      const targetPiece = boardState[toR][toC];
      if (targetPiece && targetPiece.isWhite === piece.isWhite && !isFreePlay) return false;

      if (isFreePlay) return true; // In free sandbox mode, campers can place pieces anywhere

      const dr = toR - fromR;
      const dc = toC - fromC;

      if (piece.type === 'queen') {
        // Must be straight or diagonal
        if (Math.abs(dr) === Math.abs(dc) || dr === 0 || dc === 0) return true;
      } else if (piece.type === 'knight') {
        if ((Math.abs(dr) === 2 && Math.abs(dc) === 1) || (Math.abs(dr) === 1 && Math.abs(dc) === 2)) return true;
      } else if (piece.type === 'king') {
        if (Math.abs(dr) <= 1 && Math.abs(dc) <= 1) return true;
      } else if (piece.type === 'rook') {
        if (dr === 0 || dc === 0) return true;
      } else if (piece.type === 'pawn') {
        const f = piece.isWhite ? -1 : 1;
        if (dr === f && dc === 0 && !targetPiece) return true;
        if (dr === f && Math.abs(dc) === 1 && targetPiece) return true;
      }

      return false;
    }

    function coordsToName(r, c) {
      const file = String.fromCharCode('a'.charCodeAt(0) + c);
      const rank = 8 - r;
      return `${file}${rank}`;
    }

    function handleCellClick(r, c) {
      const clickedPiece = boardState[r][c];

      // If nothing selected yet:
      if (!selectedSquare) {
        if (clickedPiece) {
          selectedSquare = [r, c];
          renderPlayableBoard();
          if (feedbackEl) {
            feedbackEl.className = 'puzzle-feedback-msg feedback-idle';
            feedbackEl.innerHTML = `<i class="bi bi-crosshair text-primary me-2"></i> Selected <strong>${clickedPiece.isWhite ? 'White' : 'Black'} ${clickedPiece.type}</strong> at <strong>${coordsToName(r, c)}</strong>. Choose destination square!`;
          }
        }
        return;
      }

      // If already selected, check if clicked the same piece (deselect)
      const [sr, sc] = selectedSquare;
      if (sr === r && sc === c) {
        selectedSquare = null;
        renderPlayableBoard();
        return;
      }

      // Check if moving to valid square
      const srcPiece = boardState[sr][sc];
      if (srcPiece && isLegalMove(srcPiece, sr, sc, r, c)) {
        // Check capture
        const destPiece = boardState[r][c];
        if (destPiece) {
          capturedList.push(destPiece.glyph);
          if (capturedTrayEl) {
            capturedTrayEl.innerHTML = capturedList.map(g => `<span class="badge bg-white border text-dark me-1">${g}</span>`).join('');
          }
        }

        // Execute Move
        boardState[r][c] = srcPiece;
        boardState[sr][sc] = null;
        selectedSquare = null;
        renderPlayableBoard();

        const moveName = `${srcPiece.type.toUpperCase()} to ${coordsToName(r, c)}`;

        // Check Winning Condition (White Queen to h7: r=1, c=7)
        if (srcPiece.type === 'queen' && srcPiece.isWhite && r === 1 && c === 7) {
          if (feedbackEl) {
            feedbackEl.className = 'puzzle-feedback-msg feedback-success';
            feedbackEl.innerHTML = `<i class="bi bi-trophy-fill text-warning me-2"></i> <strong>CHECKMATE! Qxh7#!</strong> White delivers direct mate supported by the Knight on g5! (+100 Camp XP Unlocked!)`;
          }
        } else {
          if (feedbackEl) {
            feedbackEl.className = 'puzzle-feedback-msg feedback-idle';
            feedbackEl.innerHTML = `<i class="bi bi-check2-circle text-success me-2"></i> Played <strong>${moveName}</strong>! Keep strategizing.`;
          }
        }
      } else {
        // Clicked another own piece? Change selection
        if (clickedPiece && clickedPiece.isWhite === srcPiece.isWhite) {
          selectedSquare = [r, c];
          renderPlayableBoard();
        } else {
          selectedSquare = null;
          renderPlayableBoard();
        }
      }
    }

    if (btnResetPuzzle) {
      btnResetPuzzle.addEventListener('click', () => {
        boardState = getInitialPuzzleState();
        selectedSquare = null;
        capturedList = [];
        if (capturedTrayEl) capturedTrayEl.innerHTML = '<span class="text-muted small fst-italic">None yet</span>';
        if (feedbackEl) {
          feedbackEl.className = 'puzzle-feedback-msg feedback-idle';
          feedbackEl.innerHTML = '<i class="bi bi-arrow-counterclockwise text-primary me-2"></i> Board reset! White to Move &bull; Mate in 1.';
        }
        renderPlayableBoard();
      });
    }

    if (btnPuzzleHint) {
      btnPuzzleHint.addEventListener('click', () => {
        if (feedbackEl) {
          feedbackEl.className = 'puzzle-feedback-msg feedback-fail';
          feedbackEl.innerHTML = `<i class="bi bi-lightbulb-fill text-warning me-2"></i> <strong>Coach Hint:</strong> Black\'s King is trapped in the corner on h8 with no escape squares! Notice White\'s Queen on d5 and Knight on g5. Look closely at <strong>h7</strong>!`;
        }
      });
    }

    if (btnPuzzleFreePlay) {
      btnPuzzleFreePlay.addEventListener('click', () => {
        isFreePlay = !isFreePlay;
        btnPuzzleFreePlay.classList.toggle('btn-primary', isFreePlay);
        btnPuzzleFreePlay.classList.toggle('btn-outline-secondary', !isFreePlay);
        if (feedbackEl) {
          feedbackEl.className = 'puzzle-feedback-msg feedback-idle';
          feedbackEl.innerHTML = isFreePlay 
            ? '<i class="bi bi-controller text-success me-2"></i> <strong>Free Sandbox Mode ON:</strong> You can place and move any piece to any square!'
            : '<i class="bi bi-puzzle text-primary me-2"></i> <strong>Tactical Mode Active:</strong> Standard chess move rules apply.';
        }
      });
    }

    // Initial render of playable board
    renderPlayableBoard();
  }
});


