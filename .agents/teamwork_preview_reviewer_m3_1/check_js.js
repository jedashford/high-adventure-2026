const fs = require('fs');
const vm = require('vm');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const content = fs.readFileSync(htmlPath, 'utf8');

const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/i);
if (!scriptMatch) {
    console.error('No <script> tag found!');
    process.exit(1);
}

const jsCode = scriptMatch[1];
console.log('Script code length:', jsCode.length, 'bytes');

// Check syntax using VM Script
try {
    new vm.Script(jsCode);
    console.log('✅ JS Syntax Check: PASSED (No syntax errors)');
} catch (e) {
    console.error('❌ JS Syntax Error:', e.message);
    process.exit(1);
}
