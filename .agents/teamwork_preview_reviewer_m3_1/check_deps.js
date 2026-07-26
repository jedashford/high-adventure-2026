const fs = require('fs');
const path = require('path');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const content = fs.readFileSync(htmlPath, 'utf8');

console.log('--- CHECKING EXTERNAL DEPENDENCIES ---');
const externalUrls = content.match(/https?:\/\/[^\s"'`>]+/g) || [];
console.log(`Found ${externalUrls.length} http/https URLs:`);
externalUrls.forEach(url => console.log('  -', url));

const cdnMatches = content.match(/(cdn|cdnjs|unpkg|jsdelivr|googleapis|gstatic|fontawesome|tailwind|bootstrap)/gi) || [];
console.log(`Found ${cdnMatches.length} CDN keywords:`);
cdnMatches.forEach(m => console.log('  -', m));

const srcHrefMatches = content.match(/(src|href)\s*=\s*["']([^"']+)["']/g) || [];
console.log(`Found ${srcHrefMatches.length} src/href attributes:`);
srcHrefMatches.forEach(m => console.log('  -', m));
