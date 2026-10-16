const fs = require('fs');
const path = require('path');

const targetDir = 'stratkids/assets/images/blog';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const copyList = [
  {
    src: 'stratkids/assets/images/chess/pexels_8471881.jpg',
    dest: path.join(targetDir, 'blog_featured.jpg')
  },
  {
    src: 'stratkids/assets/images/blog/blog_tactics_opening.jpg', // Keep the checkmate/tactics image
    dest: path.join(targetDir, 'blog_tactics_opening.jpg')
  },
  {
    src: 'stratkids/assets/images/chess/pexels_8466168.jpg',
    dest: path.join(targetDir, 'blog_parenting_resilience.jpg')
  },
  {
    src: 'stratkids/assets/images/blog/blog_strategy_boardgames.jpg', // Keep the Catan hex board game
    dest: path.join(targetDir, 'blog_strategy_boardgames.jpg')
  },
  {
    src: 'stratkids/scratch/test_outdoor.jpg',
    dest: path.join(targetDir, 'blog_outdoor_camp_life.jpg')
  },
  {
    src: 'C:/Users/kiris/.gemini/antigravity-ide/brain/42a57074-8c8a-4dc8-b751-f88620aa791b/scratch/test_kids_tournament.jpg',
    dest: path.join(targetDir, 'blog_tournament_clock.jpg')
  },
  {
    src: 'C:/Users/kiris/.gemini/antigravity-ide/brain/42a57074-8c8a-4dc8-b751-f88620aa791b/scratch/test_Ajedrez_Infantil.jpg',
    dest: path.join(targetDir, 'blog_young_child_readiness.jpg')
  }
];

copyList.forEach(item => {
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, item.dest);
    const sz = fs.statSync(item.dest).size;
    console.log(`Copied ${path.basename(item.dest)} (${sz} bytes)`);
  } else {
    console.error(`Source not found: ${item.src}`);
  }
});
