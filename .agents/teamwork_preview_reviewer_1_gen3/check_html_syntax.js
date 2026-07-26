const { HtmlValidate } = require('html-validate');
const fs = require('fs');

const htmlValidate = new HtmlValidate({
    rules: {
        'no-inline-style': 'off',
        'no-trailing-whitespace': 'off',
        'no-implicit-button-type': 'warn'
    }
});

const html = fs.readFileSync('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', 'utf8');
const report = htmlValidate.validateString(html);

console.log('HTML Validation Report (Errors & Warnings):');
console.log('Valid:', report.valid);
console.log('Error Count:', report.errorCount);
console.log('Warning Count:', report.warningCount);

if (report.results && report.results[0] && report.results[0].messages) {
    report.results[0].messages.forEach(msg => {
        console.log(`[${msg.severity === 2 ? 'ERROR' : 'WARN'}] Line ${msg.line}:${msg.column} - ${msg.message} (${msg.ruleId})`);
    });
}
