const fs = require('fs');

const html = fs.readFileSync('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', 'utf8');

const startIdx = html.indexOf('const PRODUCTS = [');
const endIdx = html.indexOf('];', startIdx);
const productsBlock = html.substring(startIdx, endIdx);

const lines = productsBlock.split('\n');
const items = [];
let current = null;

lines.forEach((line) => {
  const idM = line.match(/id:\s*['"]([^'"]+)['"]/);
  const nameM = line.match(/name:\s*['"]([^'"]+)['"]/);
  const catM = line.match(/category:\s*['"]([^'"]+)['"]/);
  const imgM = line.match(/imageUrl:\s*['"]([^'"]+)['"]/);

  if (idM) {
    if (current) items.push(current);
    current = { id: idM[1], name: '', category: '', urls: [] };
  }
  if (nameM && current) current.name = nameM[1];
  if (catM && current) current.category = catM[1];
  if (imgM && current) current.urls.push(imgM[1]);
});
if (current) items.push(current);

console.log(`Total products parsed: ${items.length}\n`);

items.forEach((item, idx) => {
  console.log(`${idx + 1}. [${item.category}] ${item.id} ("${item.name}")`);
  console.log(`   URL #1: ${item.urls[0] || 'NONE'}`);
  if (item.urls.length > 1) {
    console.log(`   URL #2 (OVERRIDE): ${item.urls[1]}`);
  }
});
