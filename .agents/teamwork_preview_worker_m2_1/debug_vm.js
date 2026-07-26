const fs = require('fs');
const vm = require('vm');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const content = fs.readFileSync(htmlPath, 'utf8');
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
const scriptCode = scriptMatch[1];

try {
    const context = { window: {}, document: { addEventListener: () => {} } };
    vm.createContext(context);
    vm.runInContext(scriptCode, context);
    console.log('✅ VM Context Execution Success!');
    console.log('Parsed PRODUCTS count:', context.PRODUCTS.length);
} catch (e) {
    console.error('Execution error:', e);
}
