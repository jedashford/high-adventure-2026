const fs = require('fs');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const content = fs.readFileSync(htmlPath, 'utf8');
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
const scriptCode = scriptMatch[1];

const lines = scriptCode.split('\n');
for (let i = 0; i < lines.length; i++) {
    try {
        new Function(lines.slice(0, i + 1).join('\n'));
    } catch (e) {
        if (e.name === 'SyntaxError' && !e.message.includes('Unexpected end of input')) {
            console.log(`Line ${i + 1}: ${lines[i]}`);
            console.log(`Error: ${e.message}`);
            break;
        }
    }
}
