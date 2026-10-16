const fs = require('fs');

const loginContent = fs.readFileSync('stratkids/auth/login.html', 'utf8');

const checks = [
  { name: 'Consistent logo', pass: loginContent.includes('favicon.svg') },
  { name: 'Consistent brand title', pass: loginContent.includes('Strat<span>Kids</span>') },
  { name: 'Consistent tagline', pass: loginContent.includes('Think. Play. Grow.') },
  { name: 'Welcome back heading', pass: loginContent.includes('WELCOME BACK TO YOUR STRATKIDS PORTAL') },
  { name: 'Social Google button', pass: loginContent.includes('Sign in with Google') },
  { name: 'Social Apple button', pass: loginContent.includes('Sign in with Apple') },
  { name: 'Continue with email divider', pass: loginContent.includes('OR CONTINUE WITH EMAIL') },
  { name: 'Forgot Password link', pass: loginContent.includes('forgot-password.html') },
  { name: 'Remember me checkbox', pass: loginContent.includes('Remember me on this browser') },
  { name: 'Submit button with lock', pass: loginContent.includes('Sign In to My StratKids') },
  { name: 'Create Parent Account link', pass: loginContent.includes('Create Parent Account') }
];

console.log('--- LOGIN.HTML VALIDATION ---');
checks.forEach(c => console.log(`${c.name.padEnd(32)}: ${c.pass ? 'PASS' : 'FAIL'}`));

const indexContent = fs.readFileSync('stratkids/index.html', 'utf8');
console.log('\n--- INDEX.HTML VALIDATION ---');
console.log('Has Login button before CTA:', indexContent.includes('btn-nav-login'));
console.log('Has Dashboard link next to Contact:', indexContent.includes('nav-dashboard-link'));
console.log('Old portal circle removed from nav-tools:', !indexContent.includes('tool-toggle-btn" title="Parent Portal"'));
