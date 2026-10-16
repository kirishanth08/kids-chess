const fs = require('fs');

const contactHtml = fs.readFileSync('stratkids/contact.html', 'utf8');
const blogHtml = fs.readFileSync('stratkids/blog.html', 'utf8');
const galleryHtml = fs.readFileSync('stratkids/gallery.html', 'utf8');
const scheduleHtml = fs.readFileSync('stratkids/schedule.html', 'utf8');

console.log('--- TEST 1: contact.html map verification ---');
const hasOldConcept = contactHtml.includes('Safe &amp; Welcoming Campuses') || contactHtml.includes('Tour Our State-of-the-Art Campuses');
console.log('Old "Safe & Welcoming Campuses" concept removed:', !hasOldConcept);
const hasRealMap = contactHtml.includes('<iframe') && contactHtml.includes('maps.google.com');
console.log('Real interactive Google Map embedded:', hasRealMap);
const hasDirections = contactHtml.includes('Campus Address &amp; Access') && contactHtml.includes('Curbside Drop-Off &amp; Parking');
console.log('Campus directions and drop-off loop info present:', hasDirections);

console.log('\n--- TEST 2: blog.html hero filter verification ---');
const blogHeaderMatch = blogHtml.match(/<header[\s\S]*?<\/header>/);
const blogHeaderHasFilter = blogHeaderMatch ? blogHeaderMatch[0].includes('filter-pill-nav') || blogHeaderMatch[0].includes('filter-btn') : false;
console.log('blog.html hero has NO filter buttons:', !blogHeaderHasFilter);
const blogSectionHasFilter = blogHtml.includes('id="blogFilterNav"') && blogHtml.includes('blog-filter-btn');
console.log('blog.html articles section has filter buttons:', blogSectionHasFilter);

console.log('\n--- TEST 3: gallery.html hero filter verification ---');
const galleryHeaderMatch = galleryHtml.match(/<header[\s\S]*?<\/header>/);
const galleryHeaderHasFilter = galleryHeaderMatch ? galleryHeaderMatch[0].includes('filter-pill-nav') || galleryHeaderMatch[0].includes('gallery-filter-btn') : false;
console.log('gallery.html hero has NO filter buttons:', !galleryHeaderHasFilter);
const gallerySectionHasFilter = galleryHtml.includes('SECTION 2: INTERACTIVE MASONRY-STYLE GALLERY GRID') && galleryHtml.includes('gallery-filter-btn');
console.log('gallery.html section 2 has filter buttons:', gallerySectionHasFilter);

console.log('\n--- TEST 4: schedule.html hero filter verification ---');
const scheduleHeaderMatch = scheduleHtml.match(/<header[\s\S]*?<\/header>/);
const scheduleHeaderHasFilter = scheduleHeaderMatch ? scheduleHeaderMatch[0].includes('schedule-week-btn') || scheduleHeaderMatch[0].includes('filter-btn') : false;
console.log('schedule.html hero has NO filter buttons:', !scheduleHeaderHasFilter);
const scheduleSectionHasFilter = scheduleHtml.includes('SECTION 2: INTERACTIVE SCHEDULE FILTER') && scheduleHtml.includes('schedule-week-btn');
console.log('schedule.html section 2 has week filter buttons:', scheduleSectionHasFilter);
