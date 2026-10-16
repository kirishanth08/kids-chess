/**
 * StratKids Summer Camp - Dynamic Blog Details System
 * Renders full rich article details based on the '?id=' URL query parameter.
 */

const BLOG_ARTICLES = {
  'screen-focus': {
    id: 'screen-focus',
    title: 'How Strategy Board Games Build Deep Attention in Screen-Distracted Kids',
    category: 'Parenting & Focus',
    badgeClass: 'bg-danger',
    readTime: '6 Min Read',
    date: 'June 12, 2026',
    author: {
      name: 'Elena Rostova',
      role: 'Head Coach & Educational Psychologist',
      badge: 'Author & Head Coach',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      bio: "Elena has coached over 2,000 children across 12 years of scholastic summer camps. She holds a master's degree in Educational Psychology and leads the StratKids curriculum team."
    },
    image: 'assets/images/blog/blog_featured.jpg',
    imageAlt: 'Young campers deeply engaged and calculating chess moves together at summer camp',
    lead: "Parents often tell me with a sigh: 'My 8-year-old can barely sit still for five minutes during math homework, but they can swipe short-form videos for hours.'",
    body: `
      <p>
        This isn't a failure of willpower or bad behavior. Modern digital interfaces are specifically engineered to provide rapid, variable reward loops every three to five seconds. Over time, a young brain naturally recalibrates its dopamine expectation, making low-stimulation activities feel intolerable.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">The Antidote: Tactile, Low-Tech Strategy</h3>
      <p>
        When a child sits down across a physical wooden chessboard or a tactile board game like Quoridor, something remarkable occurs. There are no vibration notifications, no flashing pop-up banners, and no algorithm feeding them the next dopamine hit.
      </p>

      <div class="p-4 rounded-4 my-4" style="background: rgba(158, 211, 220, 0.25); border-left: 5px solid var(--sk-aqua);">
        <p class="fst-italic mb-0 fw-bold" style="color: #1A4D56;">
          &ldquo;Strategy games are unique because the reward is entirely self-generated. The child must invest two minutes of quiet deliberation to experience the triumphant spark of spotting a Knight fork.&rdquo;
        </p>
      </div>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">Rewiring The Habit of 'Pause Before Moving'</h3>
      <p>
        In our summer camp classrooms, our number one rule for beginners is: <em>Hands on your lap until your mind has calculated.</em>
      </p>
      <p>
        For the first two days, kids reflexively reach out to touch pieces instantly. But by day three, you witness the magic transformation. A 7-year-old lifts their hand, pauses mid-air, takes a deliberate breath, leans back in their chair, and surveys the diagonal. That single hesitation is executive function coming alive in real-time.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">Transferring to School &amp; Life</h3>
      <p>
        Teachers frequently tell us that campers return to school in autumn with visibly improved self-regulation. When confronted with a multi-step word problem, they don't panic or give up; they treat it like a candidate move tree:
      </p>
      <ul>
        <li>What is the current position (givens)?</li>
        <li>What are my 3 possible candidate steps?</li>
        <li>What happens if I test choice B?</li>
      </ul>
    `,
    takeaways: [
      {
        num: 1,
        color: 'badge-aqua',
        title: "The 'Hands-on-Lap' Ritual",
        desc: "When playing at home, gently remind your child to rest both hands in their lap until they are ready to announce their move."
      },
      {
        num: 2,
        color: 'badge-gold',
        title: "Praise the 'Why', Not Just the Win",
        desc: "Ask: 'What made you choose that Knight move?' Praise their reasoning and foresight rather than the final checkmate score."
      },
      {
        num: 3,
        color: 'badge-rose',
        title: "Normalize Friendly Defeats",
        desc: "When you win against them, model graciousness: 'You almost had my Bishop on move 12! Let's reset the board and explore that fork.'"
      }
    ],
    challenge: {
      tag: 'Article Tactics Challenge',
      title: 'Try It With Your Child: The Skewer',
      desc: "Black has their King on e8 and Queen on c8 along the same diagonal. Can your child find White's Bishop move that attacks the King and wins the Queen?",
      solution: "1. Bishop to g6+! The Black King must move, and White captures the Queen on c8 next turn. This is called an absolute skewer!"
    },
    related: ['opening-traps', 'resilience-losing', 'spatial-games']
  },

  'opening-traps': {
    id: 'opening-traps',
    title: 'The 3 Most Common Opening Traps (And How to Avoid Them)',
    category: 'Chess Tactics',
    badgeClass: 'bg-warning text-dark',
    readTime: '5 Min Read',
    date: 'June 08, 2026',
    author: {
      name: 'Marcus Vance',
      role: 'National Master & Senior Tactics Coach',
      badge: 'Author & Senior Coach',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Marcus is a USCF National Master and 3-time state scholastic coach. He specializes in opening fundamentals and helping junior players navigate rapid tactical skirmishes.'
    },
    image: 'assets/images/blog/blog_tactics_opening.jpg',
    imageAlt: 'Tactical checkmate and opening moves on tournament chessboard',
    lead: 'In scholastic tournaments, nearly 60% of decisive beginner games end before move 15 because of preventable opening traps and premature Queen attacks.',
    body: `
      <p>
        Every chess beginner inevitably runs into the sting of a 4-move checkmate or a sudden Knight fork that snaps off an undefended Rook. While frustrating in the moment, these tactical ambushes provide the most memorable learning moments in a young player's journey.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">Trap #1: The Scholar's Mate Ambush (4-Move Mate)</h3>
      <p>
        White charges out with 1. e4, brings the Queen to h5 or f3, and points the Bishop directly at f7. Young players panic and try to kick the Queen with 2... g6, inadvertently hanging their e5 pawn and losing their Rook.
      </p>
      <p>
        <strong>The Antidote:</strong> Develop the Queenside Knight first with <code>2... Nc6</code>! This locks down the e5 square. Then, and only then, play <code>3... g6</code> to force the Queen backward.
      </p>

      <div class="p-4 rounded-4 my-4" style="background: rgba(158, 211, 220, 0.25); border-left: 5px solid var(--sk-aqua);">
        <p class="fst-italic mb-0 fw-bold" style="color: #1A4D56;">
          &ldquo;A pawn move in the first four turns that does not stake a claim to the center or free a minor piece is almost always an invitation for trouble.&rdquo;
        </p>
      </div>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">Trap #2: The Fried Liver Knight Sacrifice</h3>
      <p>
        In the Italian Game, White plants a Knight on g5 targeting the fragile f7 square alongside the Bishop on c4. If Black is unprepared, King safety collapses within minutes. Campers learn that recognizing the setup on move 3 allows an immediate neutralizing move with <code>3... d5</code>.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">The 3 Golden Rules of Opening Survival</h3>
      <p>
        We teach our campers to recite these 3 principles before every game:
      </p>
      <ul>
        <li><strong>Control the Center:</strong> Place pawns on e4, d4, e5, or d5.</li>
        <li><strong>Develop Knights Before Bishops:</strong> Minor pieces should spring toward the active center.</li>
        <li><strong>Castle by Move 7:</strong> Put the King in a safe fortress before starting any attack.</li>
      </ul>
    `,
    takeaways: [
      {
        num: 1,
        color: 'badge-aqua',
        title: 'Knights Guard the Core',
        desc: 'Teach your child to develop both Knights toward the center before pushing wing pawns like a3 or h3.'
      },
      {
        num: 2,
        color: 'badge-gold',
        title: 'Castle Early & Safeguard the King',
        desc: 'Aim to castle within the first 6 to 8 moves. An uncastled King in the center is like playing with zero shield.'
      },
      {
        num: 3,
        color: 'badge-rose',
        title: 'Punish Early Queen Moves',
        desc: 'When an opponent moves their Queen out early, develop your own pieces while attacking that Queen to gain free tempo.'
      }
    ],
    challenge: {
      tag: 'Opening Tactics Challenge',
      title: 'Countering the Scholar\'s Mate Queen',
      desc: "White plays 1. e4 e5 2. Qh5. What is Black's soundest defensive move that develops a piece and protects e5?",
      solution: "2... Nc6! Black develops a Knight, guards the vulnerable e5 pawn, and prepares to kick White's Queen with ...Nf6 next turn!"
    },
    related: ['screen-focus', 'digital-clocks', 'spatial-games']
  },

  'resilience-losing': {
    id: 'resilience-losing',
    title: 'What to Say When Your Child Loses a Game: A Guide to Resilience',
    category: 'Parenting & Focus',
    badgeClass: 'bg-info text-dark',
    readTime: '7 Min Read',
    date: 'June 02, 2026',
    author: {
      name: 'Sarah Lin',
      role: 'Child Development Specialist & Mentor',
      badge: 'Author & Youth Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Sarah combines child behavioral psychology with competitive chess coaching. She has guided hundreds of families through the emotional milestones of scholastic competition.'
    },
    image: 'assets/images/blog/blog_parenting_resilience.jpg',
    imageAlt: 'Coach warmly encouraging young campers with chess pieces',
    lead: 'Tears after a lost chess game are not proof that your child isn\'t cut out for strategy; they are proof of how deeply and genuinely they care.',
    body: `
      <p>
        Watching your child crumble after a 40-minute chess battle is heartbreaking for any parent. Our instinct is to rush in and comfort them with statements like: <em>&ldquo;It doesn't matter, it's just a game!&rdquo;</em>
      </p>
      <p>
        Yet to an 8-year-old who poured all their concentration into that board, it <em>did</em> matter. Telling them it didn't unintentionally invalidates their effort and emotional investment.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">The 5-Minute Cool-Down Protocol</h3>
      <p>
        Immediately after a tough loss, adrenaline and cortisol are running high. Rational analysis is biologically impossible in that state. Give your child five minutes of quiet presence. Offer a sip of cool water, a warm hug, and silence.
      </p>

      <div class="p-4 rounded-4 my-4" style="background: rgba(158, 211, 220, 0.25); border-left: 5px solid var(--sk-aqua);">
        <p class="fst-italic mb-0 fw-bold" style="color: #1A4D56;">
          &ldquo;In chess, as in life, losing is simply uncollected data. Every defeat points with surgical accuracy to the exact concept your child is ready to master next.&rdquo;
        </p>
      </div>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">Replace Dismissals with Curious Questions</h3>
      <p>
        Once emotions settle, replace soothing dismissals with curiosity:
      </p>
      <ul>
        <li>&ldquo;You fought hard for that Bishop pair in the opening. Where did the position get tricky?&rdquo;</li>
        <li>&ldquo;What was one move in the middle game that you felt super proud of?&rdquo;</li>
        <li>&ldquo;If we play this game again tomorrow, what would you try differently?&rdquo;</li>
      </ul>
      <p>
        This shifts the child's perspective from <strong>fixed identity</strong> (&ldquo;I am a bad player&rdquo;) to <strong>growth process</strong> (&ldquo;I need to watch out for back-rank mates&rdquo;).
      </p>
    `,
    takeaways: [
      {
        num: 1,
        color: 'badge-aqua',
        title: 'Validate the Emotion First',
        desc: "Acknowledge the heartache before offering advice: 'I saw how hard you worked on that game. It's okay to feel sad.'"
      },
      {
        num: 2,
        color: 'badge-gold',
        title: 'Treat Losses as Scientific Data',
        desc: "Frame every mistake as an exciting discovery: 'Now we know your Knight needs an escape square!'."
      },
      {
        num: 3,
        color: 'badge-rose',
        title: 'Praise Sportsmanship Above Scores',
        desc: "Praise their two-handed handshake and respectful demeanor regardless of whether they won or lost the match."
      }
    ],
    challenge: {
      tag: 'Mindset Reframe Exercise',
      title: 'Turning a Blunder into a Tactical Win',
      desc: "Your child accidentally gives away a Knight on move 14. What prompt can you give them in practice to keep their mental focus intact for the remaining pieces?",
      solution: "'The board has changed, but your pieces are still alive! What is your opponent's new weakness, and how can your Queen and Rook create a counter-threat?'"
    },
    related: ['screen-focus', 'readiness-5yo', 'outdoor-recovery']
  },

  'spatial-games': {
    id: 'spatial-games',
    title: '5 Modern Board Games That Boost Spatial Math Skills',
    category: 'Strategy Games',
    badgeClass: 'bg-danger',
    readTime: '6 Min Read',
    date: 'May 28, 2026',
    author: {
      name: 'David Kim',
      role: 'Logic Games Coordinator & STEM Educator',
      badge: 'Author & STEM Lead',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'David holds an applied mathematics degree from Columbia and designs multi-board logic curricula that link tabletop mechanics to spatial geometry instincts.'
    },
    image: 'assets/images/blog/blog_strategy_boardgames.jpg',
    imageAlt: 'Tabletop strategy board games and pieces',
    lead: 'Spatial reasoning is one of the strongest statistical predictors of future achievement in STEM fields, and modern tabletop strategy games are the ultimate workout for it.',
    body: `
      <p>
        While chess is the undisputed king of classical tactics, today's modern board game renaissance has produced ingenious tabletop experiences that train spatial geometry, pathfinding, and topology in ways children adore.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">1. Quoridor: Dynamic Pathfinding &amp; Maze Construction</h3>
      <p>
        Each player starts on opposite sides of a 9x9 grid. On each turn, you either advance your pawn or place a 2-square wooden fence. The catch? You can never completely block an opponent's path to the goal. Kids learn Dijkstra's pathfinding algorithm intuitively without realizing they are practicing graph theory.
      </p>

      <div class="p-4 rounded-4 my-4" style="background: rgba(158, 211, 220, 0.25); border-left: 5px solid var(--sk-aqua);">
        <p class="fst-italic mb-0 fw-bold" style="color: #1A4D56;">
          &ldquo;Children who manipulate polyominoes and visualize coordinate rotations develop spatial working memory years before seeing their first Cartesian graph.&rdquo;
        </p>
      </div>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">2. Blokus: Polyominoes &amp; Perimeter Defense</h3>
      <p>
        Players place colorful Tetris-like shapes on a grid, touching only at the corners, never edge-to-edge. It requires predicting area density, visualizing rotations in the mind's eye, and exploiting negative space.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">3. Hive: Topological Chess Without a Board</h3>
      <p>
        In Hive, hexagonal insect tiles form their own shifting board. Because tiles must stay contiguous (the &ldquo;One Hive Rule&rdquo;), children experience non-Euclidean connectivity and surround dynamics that directly reinforce chess mating nets.
      </p>
    `,
    takeaways: [
      {
        num: 1,
        color: 'badge-aqua',
        title: 'Weekly Family Game Night',
        desc: 'Dedicate 30 minutes on Friday evening to rotating games like Quoridor, Blokus, and Santorini.'
      },
      {
        num: 2,
        color: 'badge-gold',
        title: 'Prompt Mental Rotations',
        desc: "Ask: 'If you flip that 4-block piece upside down, will it fit inside the blue gap?' to prompt mental transformation."
      },
      {
        num: 3,
        color: 'badge-rose',
        title: 'Connect Tabletop to School Math',
        desc: "Point out parallel lines, acute angles, and coordinate grids during play to make classroom math feel intuitive."
      }
    ],
    challenge: {
      tag: 'Spatial Geometry Puzzle',
      title: 'Quoridor Path Optimization',
      desc: "Your pawn is 3 squares from the finish line, but your opponent has 1 wooden fence left. How do you choose between advancing or forcing an alternate detour?",
      solution: "Always calculate the shortest total Manhattan path distance! If your alternate detour is 4 steps and your opponent's path is 6 steps, prioritize maintaining your path advantage!"
    },
    related: ['opening-traps', 'screen-focus', 'outdoor-recovery']
  },

  'outdoor-recovery': {
    id: 'outdoor-recovery',
    title: 'Why We Spend 75 Minutes Outdoors Every Camp Day',
    category: 'Camp Life',
    badgeClass: 'bg-success',
    readTime: '4 Min Read',
    date: 'May 20, 2026',
    author: {
      name: 'Rachel Green',
      role: 'Camp Operations Director & Youth Athletics Coach',
      badge: 'Author & Wellness Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Rachel oversees camper wellness, physical recreation, and campus life at StratKids. She believes peak cognitive calculation is impossible without gross motor play.'
    },
    image: 'assets/images/blog/blog_outdoor_camp_life.jpg',
    imageAlt: 'Campers playing outdoors in the summer camp lawn',
    lead: 'Ask any Grandmaster how they prepare for a 6-hour championship round, and they will tell you about running, swimming, and fresh air, not just memorizing books.',
    body: `
      <p>
        When parents first read our daily summer camp schedule, some are surprised to see 75 full minutes of outdoor lawn games, relay challenges, and fresh-air giant chess. <em>&ldquo;Isn't this an intensive strategy camp? Shouldn't they be calculating at desks?&rdquo;</em>
      </p>
      <p>
        Cognitive neuroscience provides a crystal-clear answer: intense mental calculation burns through prefrontal cortex glucose rapidly. Without structured physical recovery, diminishing returns set in within 90 minutes.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">The Science of the Outdoor Brain Reset</h3>
      <p>
        When children run, laugh, and catch frisbees on green grass, two critical biological events occur:
      </p>
      <ul>
        <li><strong>Cerebral Oxygenation:</strong> Vigorous aerobic exercise increases blood flow and Brain-Derived Neurotrophic Factor (BDNF), priming synapses for new tactical retention.</li>
        <li><strong>Optic Nerve Relaxation:</strong> Shifting focus from 18 inches (chessboard) to infinity (open trees and sky) eliminates ciliary eye strain and mental fatigue.</li>
      </ul>

      <div class="p-4 rounded-4 my-4" style="background: rgba(158, 211, 220, 0.25); border-left: 5px solid var(--sk-aqua);">
        <p class="fst-italic mb-0 fw-bold" style="color: #1A4D56;">
          &ldquo;Children who run outdoors at midday play afternoon games with 35% fewer blunder rates than those kept inside under fluorescent lights.&rdquo;
        </p>
      </div>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">Giant Lawn Chess: Physicalizing Abstract Tactics</h3>
      <p>
        Our 12-foot giant lawn chess set bridges the gap between bodily movement and abstract geometry. When a child physically carries a 2-foot Rook across the lawn, tactical concepts like ranks, files, and outposts become muscle memory.
      </p>
    `,
    takeaways: [
      {
        num: 1,
        color: 'badge-aqua',
        title: 'The 45-Minute Movement Rule',
        desc: 'At home, cap homework or chess sessions at 45 minutes, followed by 15 minutes of outdoor physical movement.'
      },
      {
        num: 2,
        color: 'badge-gold',
        title: 'Natural Light Regulates Focus',
        desc: 'Midday sunlight exposure regulates dopamine and sleep cycles, dramatically reducing afternoon restlessness.'
      },
      {
        num: 3,
        color: 'badge-rose',
        title: 'Hydration & Nutrition Breaks',
        desc: 'A calculating brain requires steady water and healthy fats (nuts, fruit) to sustain multi-move calculation.'
      }
    ],
    challenge: {
      tag: 'Camp Wellness Tip',
      title: 'The 20-20-20 Eye Break for Young Thinkers',
      desc: "During long board game sessions or chess matches, what simple 20-second visual habit prevents eye fatigue and sharpens tactical vision?",
      solution: "Every 20 minutes, look at an object 20 feet away (or out the window at green trees) for 20 seconds to completely relax your eye's ciliary focus muscles!"
    },
    related: ['resilience-losing', 'digital-clocks', 'screen-focus']
  },

  'digital-clocks': {
    id: 'digital-clocks',
    title: 'Demystifying the Digital Clock for First-Time Competitors',
    category: 'Tournament Tips',
    badgeClass: 'bg-warning text-dark',
    readTime: '5 Min Read',
    date: 'May 15, 2026',
    author: {
      name: 'Elena Rostova',
      role: 'FIDE Master & Tournament Arbiter',
      badge: 'Author & Tournament Arbiter',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      bio: 'Elena has presided over 40+ scholastic tournaments and trained hundreds of first-time competitors on official USCF and FIDE tournament etiquette.'
    },
    image: 'assets/images/blog/blog_tournament_clock.jpg',
    imageAlt: 'Scholastic chess tournament arena with rows of young players',
    lead: 'For a child who has only played casually with family around the kitchen table, the two-sided digital tournament chess clock can look like an intimidating countdown bomb.',
    body: `
      <p>
        The introduction of a digital game timer is the single biggest psychological hurdle for junior tournament players. Seeing numbers ticking down can trigger panic, leading children to play faster than they need to and blunder pieces they would normally spot with ease.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">It Is Not a Countdown; It Is a Fair Allocation</h3>
      <p>
        The first step in clock training is linguistic re-framing. We explain to campers that a clock is not a bomb; it is simply a fair referee ensuring that both players receive an equal share of the day to make their decisions.
      </p>

      <div class="p-4 rounded-4 my-4" style="background: rgba(158, 211, 220, 0.25); border-left: 5px solid var(--sk-aqua);">
        <p class="fst-italic mb-0 fw-bold" style="color: #1A4D56;">
          &ldquo;In a Game-in-30 tournament, you have 1,800 seconds. An average chess game is 40 moves. That means you have nearly 45 seconds for every single decision!&rdquo;
        </p>
      </div>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">The 'Same Hand' Rule</h3>
      <p>
        Official USCF and FIDE tournament rules require players to press the clock paddle using the <em>exact same hand</em> that moved the chess piece. Hovering one hand over the clock while moving with the other is a penalty. We turn this rule into a rhythmic habit in week one of camp.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">Understanding Delay and Increment</h3>
      <p>
        Most modern scholastic tournaments use a 5-second delay or increment (e.g., G/30; d5). This means the clock pauses for five seconds before ticking down! As long as a camper moves within five seconds, they will never lose on time in an endgame. Explaining this gives children immense peace of mind.
      </p>
    `,
    takeaways: [
      {
        num: 1,
        color: 'badge-aqua',
        title: 'Practice with a Kitchen Timer',
        desc: 'Set a 15-minute timer during casual home matches so pressing a paddle or button becomes second nature.'
      },
      {
        num: 2,
        color: 'badge-gold',
        title: 'Same-Hand Muscle Memory',
        desc: 'Remind your child: move the piece, then immediately hit the clock paddle with that exact same hand.'
      },
      {
        num: 3,
        color: 'badge-rose',
        title: 'Breathe Before You Press',
        desc: 'Teach campers to take one steady breath, ensure the piece is firmly placed on its square, and then press.'
      }
    ],
    challenge: {
      tag: 'Tournament Etiquette Quiz',
      title: 'Clock & Notation Precision',
      desc: "If your child completes their move, when should they write down their move on their notation score sheet vs when should they press the clock?",
      solution: "First make the move on the board, immediately press the clock with the same hand to stop your time, and then write down the move on your score sheet while your opponent is thinking!"
    },
    related: ['opening-traps', 'outdoor-recovery', 'resilience-losing']
  },

  'readiness-5yo': {
    id: 'readiness-5yo',
    title: 'Is My 5-Year-Old Ready for Chess? 4 Signs of Readiness',
    category: 'Young Players',
    badgeClass: 'bg-info text-dark',
    readTime: '6 Min Read',
    date: 'May 09, 2026',
    author: {
      name: 'Sarah Lin',
      role: 'Early Childhood Chess Specialist',
      badge: 'Author & Early Learning Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Sarah specializes in preschool and kindergarten cognitive milestones, helping children aged 4 to 6 transition from tactile play into rule-governed strategy games.'
    },
    image: 'assets/images/blog/blog_young_child_readiness.jpg',
    imageAlt: 'Young 5-year-old child learning to move chess pieces on board',
    lead: "Parents of kindergarteners often ask us: 'Is 5 too early for chess? Will they get overwhelmed by all 64 squares and complicated piece movements?'",
    body: `
      <p>
        The truth is, age five is the golden window for introducing spatial games—provided the instruction is play-based and narrative-driven rather than rigid and academic.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">Sign 1: They Understand Directional Opposites</h3>
      <p>
        Can your child distinguish between forward and backward, straight and diagonal, left and right? Chess is built on coordinate grids. If a child enjoys sorting shapes or spotting diagonals on graph paper, their spatial compass is ready.
      </p>

      <div class="p-4 rounded-4 my-4" style="background: rgba(158, 211, 220, 0.25); border-left: 5px solid var(--sk-aqua);">
        <p class="fst-italic mb-0 fw-bold" style="color: #1A4D56;">
          &ldquo;At age five, chess isn't about memorizing grandmaster openings; it is an enchanting story of castles, horses, and brave pawns working together.&rdquo;
        </p>
      </div>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">Sign 2: They Can Handle Turn-Taking</h3>
      <p>
        Can they play a game of Connect Four or Candyland and wait patiently while another person takes a turn without knocking pieces off the board? Turn-taking requires inhibitory control—the exact psychological foundation of chess calculation.
      </p>

      <h3 class="h4 fw-bold mt-5 mb-3" style="color: var(--sk-rose);">Sign 3: The Secret: Start with 'Pawn Wars'</h3>
      <p>
        Never set up all 32 pieces for a five-year-old on day one. Start with just 8 pawns each on the board! The rule is simple: pawns move one square forward, capture diagonally, and the first pawn to reach the other side wins the gold crown. This 3-minute mini-game builds instant confidence.
      </p>
    `,
    takeaways: [
      {
        num: 1,
        color: 'badge-aqua',
        title: 'Start with Mini-Games',
        desc: 'Play Pawn Wars and Knight Maze games before ever introducing the King and Queen.'
      },
      {
        num: 2,
        color: 'badge-gold',
        title: 'Turn Pieces into Characters',
        desc: 'The Knight is a playful horse jumping fences; the Rook is an elevator sliding up and down towering skyscrapers.'
      },
      {
        num: 3,
        color: 'badge-rose',
        title: 'Stop While They Want More',
        desc: 'Keep sessions to 15 minutes. Always end while your child is smiling and asking for one more turn!'
      }
    ],
    challenge: {
      tag: 'Kindergarten Chess Game',
      title: 'The Knight\'s L-Shape Journey',
      desc: "How can you teach a 5-year-old the Knight's L-shape move using their fingers or favorite stickers on the board?",
      solution: "Use the 'Two Steps Forward, One Step Turn' chant! Have the child hop their finger two squares forward, then make an elbow turn left or right into the stable!"
    },
    related: ['screen-focus', 'spatial-games', 'resilience-losing']
  }
};

/**
 * Initializes and dynamically loads the blog article based on '?id=[slug]'
 */
function initBlogDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id') || 'screen-focus';
  const article = BLOG_ARTICLES[articleId] || BLOG_ARTICLES['screen-focus'];

  // 1. Update Document Title
  document.title = `${article.title} | StratKids Summer Camp`;

  // 2. Hero Section
  const categoryBadge = document.getElementById('articleCategoryBadge');
  if (categoryBadge) {
    categoryBadge.className = `badge ${article.badgeClass} px-3 py-2 rounded-pill fw-bold`;
    categoryBadge.textContent = article.category;
  }

  const readTimeBadge = document.getElementById('articleReadTimeBadge');
  if (readTimeBadge) {
    readTimeBadge.textContent = article.readTime;
  }

  const articleTitle = document.getElementById('articleTitle');
  if (articleTitle) {
    articleTitle.textContent = article.title;
  }

  const authorImg = document.getElementById('articleAuthorImg');
  if (authorImg) {
    authorImg.src = article.author.avatar;
    authorImg.alt = article.author.name;
  }

  const authorName = document.getElementById('articleAuthorName');
  if (authorName) {
    authorName.textContent = `By Coach ${article.author.name}`;
  }

  const metaText = document.getElementById('articleMetaText');
  if (metaText) {
    metaText.innerHTML = `Published ${article.date} &bull; StratKids Educational Journal`;
  }

  // 3. Main Body Content
  const heroImg = document.getElementById('articleHeroImg');
  if (heroImg) {
    heroImg.src = article.image;
    heroImg.alt = article.imageAlt;
  }

  const leadEl = document.getElementById('articleLead');
  if (leadEl) {
    leadEl.textContent = article.lead;
  }

  const bodyEl = document.getElementById('articleBodyContent');
  if (bodyEl) {
    bodyEl.innerHTML = article.body;
  }

  // 4. Actionable Takeaways
  const takeawaysContainer = document.getElementById('articleTakeawaysContainer');
  if (takeawaysContainer && article.takeaways) {
    takeawaysContainer.innerHTML = '';
    article.takeaways.forEach(t => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="sk-card h-100">
          <span class="badge-emblem ${t.color} mb-3" style="width: 52px; height: 52px; font-size: 1.5rem;">${t.num}</span>
          <h5 class="fw-bold text-dark">${t.title}</h5>
          <p class="small text-muted mb-0">${t.desc}</p>
        </div>
      `;
      takeawaysContainer.appendChild(col);
    });
  }

  // 5. Challenge Box
  const challengeTag = document.getElementById('articleChallengeTag');
  if (challengeTag) challengeTag.innerHTML = `<i class="bi bi-trophy-fill"></i> ${article.challenge.tag}`;

  const challengeTitle = document.getElementById('articleChallengeTitle');
  if (challengeTitle) challengeTitle.textContent = article.challenge.title;

  const challengeDesc = document.getElementById('articleChallengeDesc');
  if (challengeDesc) challengeDesc.textContent = article.challenge.desc;

  const challengeSolution = document.getElementById('articleChallengeSolution');
  if (challengeSolution) {
    challengeSolution.innerHTML = `<strong>Solution:</strong> ${article.challenge.solution}`;
  }

  // 6. Author Bio Card
  const bioAvatar = document.getElementById('authorBioAvatar');
  if (bioAvatar) {
    bioAvatar.src = article.author.avatar;
    bioAvatar.alt = article.author.name;
  }

  const bioBadge = document.getElementById('authorBioBadge');
  if (bioBadge) bioBadge.textContent = article.author.badge;

  const bioName = document.getElementById('authorBioName');
  if (bioName) bioName.textContent = `${article.author.name}, ${article.author.role}`;

  const bioDesc = document.getElementById('authorBioDesc');
  if (bioDesc) bioDesc.textContent = article.author.bio;

  // 7. Related Articles Grid
  const relatedGrid = document.getElementById('relatedArticlesGrid');
  if (relatedGrid && article.related) {
    relatedGrid.innerHTML = '';
    article.related.forEach(relId => {
      const relArt = BLOG_ARTICLES[relId];
      if (!relArt) return;
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="sk-card h-100 d-flex flex-column">
          <a href="blog-details.html?id=${relArt.id}" class="d-block rounded-3 overflow-hidden mb-3" style="aspect-ratio: 16/10;">
            <img src="${relArt.image}" alt="${relArt.imageAlt}" class="w-100 h-100 object-fit-cover">
          </a>
          <span class="badge ${relArt.badgeClass} align-self-start mb-2">${relArt.category}</span>
          <h5 class="h6 fw-bold mb-2">
            <a href="blog-details.html?id=${relArt.id}" class="text-dark text-decoration-none">${relArt.title}</a>
          </h5>
          <p class="small text-muted mb-3 flex-grow-1">${relArt.lead.substring(0, 95)}...</p>
          <div class="mt-auto">
            <a href="blog-details.html?id=${relArt.id}" class="small fw-bold text-rose">Read Article &rarr;</a>
          </div>
        </div>
      `;
      relatedGrid.appendChild(col);
    });
  }
}

// Run on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlogDetailsPage);
} else {
  initBlogDetailsPage();
}
