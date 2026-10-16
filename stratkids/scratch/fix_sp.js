const fs = require('fs');
let s = fs.readFileSync('parent-dashboard/skill-progress.html', 'utf8');
let idx = s.indexOf('Strategy Bishop');
let lineStart = s.lastIndexOf('\n', idx);
let lineEnd = s.indexOf('\n', idx);
s = s.substring(0, lineStart + 1) + '                <i class="bi bi-award-fill me-1"></i> Strategy Bishop' + s.substring(lineEnd);
fs.writeFileSync('parent-dashboard/skill-progress.html', s, 'utf8');
console.log('Fixed skill-progress.html successfully!');
