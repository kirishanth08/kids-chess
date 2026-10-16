const fs = require('fs');

const content = fs.readFileSync('stratkids/pricing.html', 'utf8');

const divOpenCount = (content.match(/<div/g) || []).length;
const divCloseCount = (content.match(/<\/div>/g) || []).length;
console.log('div open count:', divOpenCount);
console.log('div close count:', divCloseCount);
console.log('Balance:', divOpenCount === divCloseCount ? 'PERFECT' : 'MISMATCH');

const hasPricingHeader = (content.match(/class="pricing-header"/g) || []).length;
const hasPriceBox = (content.match(/class="pricing-price-box"/g) || []).length;
const hasCtaBox = (content.match(/class="pricing-cta-box mt-auto"/g) || []).length;

console.log('pricing-header count:', hasPricingHeader);
console.log('pricing-price-box count:', hasPriceBox);
console.log('pricing-cta-box count:', hasCtaBox);
