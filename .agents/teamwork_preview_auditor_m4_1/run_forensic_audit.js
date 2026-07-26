const fs = require('fs');
const path = require('path');
const vm = require('vm');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const html = fs.readFileSync(htmlPath, 'utf8');

console.log(`Loaded HTML file. Size: ${html.length} bytes, Lines: ${html.split('\n').length}`);

// Check 1: Zero-Dependency Compliance
console.log('\n--- CHECK 1: ZERO-DEPENDENCY COMPLIANCE ---');
const httpRegex = /https?:\/\/[^\s"'`>]+/gi;
const httpMatches = html.match(httpRegex) || [];
console.log(`HTTP/HTTPS URLs found: ${httpMatches.length}`);
if (httpMatches.length > 0) {
    console.log('Matches:', httpMatches);
}

const scriptSrcRegex = /<script[^>]+src=["']([^"']+)["']/gi;
let match;
const externalScripts = [];
while ((match = scriptSrcRegex.exec(html)) !== null) {
    externalScripts.push(match[1]);
}
console.log(`External script sources found: ${externalScripts.length}`);
if (externalScripts.length > 0) {
    console.log('External scripts:', externalScripts);
}

const linkHrefRegex = /<link[^>]+href=["']([^"']+)["']/gi;
const externalLinks = [];
while ((match = linkHrefRegex.exec(html)) !== null) {
    externalLinks.push(match[1]);
}
console.log(`External link hrefs found: ${externalLinks.length}`);
if (externalLinks.length > 0) {
    console.log('External links:', externalLinks);
}

// Extract script tag content
const scriptTagRegex = /<script>([\s\S]*?)<\/script>/gi;
const scripts = [];
while ((match = scriptTagRegex.exec(html)) !== null) {
    scripts.push(match[1]);
}
console.log(`Inline script blocks found: ${scripts.length}`);

// Extract CSS style tag content
const styleTagRegex = /<style>([\s\S]*?)<\/style>/gi;
const styles = [];
while ((match = styleTagRegex.exec(html)) !== null) {
    styles.push(match[1]);
}
console.log(`Inline style blocks found: ${styles.length}`);

// Execute script content in a VM context to inspect window data
console.log('\n--- EXTRACTING DATA MODEL & TESTING LOGIC ---');
