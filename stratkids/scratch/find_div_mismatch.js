const fs = require('fs');

const content = fs.readFileSync('stratkids/pricing.html', 'utf8');
const lines = content.split('\n');

let balance = 0;
lines.forEach((line, index) => {
  const opens = (line.match(/<div(\s|>)/gi) || []).length;
  const closes = (line.match(/<\/div>/gi) || []).length;
  balance += opens - closes;
  if (balance < 0) {
    console.log(`Mismatch at line ${index + 1}: balance ${balance}`);
    console.log(`Line: ${line}`);
    balance = 0; // reset
  }
});

console.log('Final balance at end of file:', balance);
