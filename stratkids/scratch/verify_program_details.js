const fs = require('fs');

const indexHtml = fs.readFileSync('stratkids/index.html', 'utf8');
const programsHtml = fs.readFileSync('stratkids/programs.html', 'utf8');
const progDetailsHtml = fs.readFileSync('stratkids/program-details.html', 'utf8');

console.log('--- TEST 1: index.html camper hero image ---');
const camperFound = indexHtml.includes('assets/images/camper_hero.jpg');
console.log('camper_hero.jpg present in index.html:', camperFound);

console.log('\n--- TEST 2: Program card images in programs.html ---');
const images = [
  'assets/images/chess/pexels_8465434.jpg',
  'assets/images/chess/pexels_8465448.jpg',
  'assets/images/chess/pexels_8471881.jpg',
  'assets/images/chess/pexels_8466168.jpg',
  'assets/images/chess/pexels_5960157.jpg',
  'assets/images/chess/pexels_957312.jpg'
];
images.forEach(img => {
  console.log(`Image ${img} in programs.html: ${programsHtml.includes(img)}`);
  console.log(`Image ${img} in program-details.html: ${progDetailsHtml.includes(img)}`);
});

console.log('\n--- TEST 3: Pattern sections in program-details.html ---');
console.log('Hero section:', progDetailsHtml.includes('id="programHeroSection"'));
console.log('Explanation section:', progDetailsHtml.includes('id="programExplanationSection"'));
console.log('Traits section:', progDetailsHtml.includes('id="programTraitsSection"'));
console.log('Duration section:', progDetailsHtml.includes('id="programDurationSection"'));
console.log('Benefits section:', progDetailsHtml.includes('id="programBenefitsSection"'));
console.log('FAQ section:', progDetailsHtml.includes('id="programFaqSection"'));
console.log('CTA section:', progDetailsHtml.includes('id="programCtaSection"'));

console.log('\n--- TEST 4: Query parameter links ---');
const ids = [
  'little-thinkers-discovery',
  'little-thinkers-explorer',
  'smart-players-tactics',
  'smart-players-strategist',
  'strategic-minds-tactics',
  'future-masters-tournament'
];
ids.forEach(id => {
  console.log(`ID ${id} in programs.html: ${programsHtml.includes(`program-details.html?id=${id}`)}`);
  console.log(`ID ${id} in index.html: ${indexHtml.includes(`program-details.html?id=${id}`)}`);
});
