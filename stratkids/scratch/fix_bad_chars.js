const fs = require('fs');

// Fix skill-progress.html
let sp = fs.readFileSync('parent-dashboard/skill-progress.html', 'utf8');
sp = sp.replace(/â™\s+Strategy Bishop/g, '<i class="bi bi-award-fill me-1"></i> Strategy Bishop');
fs.writeFileSync('parent-dashboard/skill-progress.html', sp, 'utf8');
console.log('Fixed skill-progress.html');

// Fix 404.html
let p404 = fs.readFileSync('utility/404.html', 'utf8');
p404 = p404.replace(/â™”/g, '♔');
p404 = p404.replace(/â™š/g, '♚');
p404 = p404.replace(/â™ž/g, '♞');
p404 = p404.replace(/â™˜/g, '♖');
p404 = p404.replace(/â™•/g, '♕');
fs.writeFileSync('utility/404.html', p404, 'utf8');
console.log('Fixed 404.html');
