const fs = require('fs');

const files = [
  'stratkids/about.html',
  'stratkids/blog-details.html',
  'stratkids/blog.html',
  'stratkids/camp-life.html',
  'stratkids/contact.html',
  'stratkids/faqs.html',
  'stratkids/gallery.html',
  'stratkids/pricing.html',
  'stratkids/program-details.html',
  'stratkids/programs.html',
  'stratkids/schedule.html',
  'stratkids/utility/404.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(f, ': has forms.js =', content.includes('forms.js'));
});
