const fs = require('fs');

const html = fs.readFileSync('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', 'utf8');

const startIdx = html.indexOf('const PRODUCTS = [');
let open = 0, endIdx = -1;
for (let i = startIdx + 17; i < html.length; i++) {
  if (html[i] === '[') open++;
  if (html[i] === ']') { open--; if (open === 0) { endIdx = i + 1; break; } }
}

const productsBlock = html.substring(startIdx, endIdx);

// Extract individual product objects by splitting or parsing
// Since object literal keys might have syntax, let's parse using eval/Function safely or regex
// Let's first inspect raw text chunks between `{` and `}`
const lines = productsBlock.split('\n');
let currentProduct = null;
const products = [];

lines.forEach((line, lineNo) => {
  const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  const nameMatch = line.match(/name:\s*['"]([^'"]+)['"]/);
  const catMatch = line.match(/category:\s*['"]([^'"]+)['"]/);
  const imgMatch = line.match(/imageUrl:\s*['"]([^'"]+)['"]/);

  if (idMatch) {
    if (currentProduct) products.push(currentProduct);
    currentProduct = { id: idMatch[1], name: '', category: '', imageUrls: [] };
  }
  if (nameMatch && currentProduct) {
    currentProduct.name = nameMatch[1];
  }
  if (catMatch && currentProduct) {
    currentProduct.category = catMatch[1];
  }
  if (imgMatch && currentProduct) {
    currentProduct.imageUrls.push(imgMatch[1]);
  }
});
if (currentProduct) products.push(currentProduct);

console.log(`Total products parsed: ${products.length}`);
products.forEach((p, i) => {
  console.log(`${i + 1}. ID: ${p.id} | Cat: ${p.category} | Name: ${p.name}`);
  console.log(`   Image URLs (${p.imageUrls.length}):`);
  p.imageUrls.forEach((u, uidx) => console.log(`     [${uidx + 1}] ${u}`));
});
