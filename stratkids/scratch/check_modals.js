const fs = require('fs');
const path = require('path');

const allHtml = fs.readdirSync('stratkids', { withFileTypes: true })
  .filter(d => !d.isDirectory() && d.name.endsWith('.html'))
  .map(d => 'stratkids/' + d.name);

allHtml.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasModal = content.includes('id="enrollmentModal"');
  const hasIndexLink = content.includes('index.html#enrollmentModal');
  console.log(f, ': hasModal =', hasModal, ', hasIndexLink =', hasIndexLink);
});
