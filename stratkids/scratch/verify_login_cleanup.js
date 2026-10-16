const fs = require('fs');

const content = fs.readFileSync('stratkids/auth/login.html', 'utf8');

console.log('Has navbar-brand:', content.includes('class="navbar-brand"'));
console.log('Has Camp Home:', content.includes('Camp Home'));
console.log('Has Demo Account alert:', content.includes('Demo Account'));
console.log('Has Theme toggle:', content.includes('theme-toggle-btn'));
console.log('Has RTL toggle:', content.includes('rtl-toggle-btn'));
console.log('Has Card Logo:', content.includes('favicon.svg'));
console.log('Has Card Title:', content.includes('WELCOME BACK TO YOUR STRATKIDS PORTAL'));
