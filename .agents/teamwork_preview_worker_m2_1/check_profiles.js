const fs = require('fs');

const htmlPath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html';
const content = fs.readFileSync(htmlPath, 'utf8');
const scriptCode = content.match(/<script>([\s\S]*?)<\/script>/)[1];

const products = eval(scriptCode.match(/const PRODUCTS = (\[[\s\S]*?\]);/)[1]);

const profiles = ['all', 'adult', 'youth', 'ultralight', 'budget'];

profiles.forEach(prof => {
    let count = 0;
    products.forEach(p => {
        const tags = p.profileTags || p.profiles || [];
        if (prof === 'all' || tags.includes(prof)) {
            count++;
        }
    });
    console.log(`Profile '${prof}': ${count} products`);
});
