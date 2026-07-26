import re
import subprocess

with open('gemini-code-1784928132429.html', 'r', encoding='utf-8') as f:
    html = f.read()

script_match = re.search(r'<script\b[^>]*>(.*?)</script>', html, re.DOTALL)
js_code = script_match.group(1) if script_match else ""

node_script = """
const window = globalThis;
let elementsCreated = [];
const document = {
    getElementById: (id) => {
        return {
            id,
            innerText: '',
            innerHTML: '',
            style: {},
            classList: { add: () => {}, remove: () => {}, contains: () => false },
            addEventListener: () => {}
        };
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
};

""" + js_code + """

console.log("=== CHECKING CARD GRID AND TABLE ITEM TEMPLATES ===");

// Check renderProducts card template generation
const allProds = getFilteredAndSortedProducts();
console.log(`Filtering returned ${allProds.length} products`);

let cardImageCount = 0;
let cardClickCount = 0;
let cardOnerrorCount = 0;

let tableImageCount = 0;
let tableClickCount = 0;
let tableOnerrorCount = 0;

// Let's examine render logic strings in HTML source
"""

with open('/tmp/template_check.py', 'w', encoding='utf-8') as f_out:
    f_out.write("""
import re

with open('gemini-code-1784928132429.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Check card template rendering in renderProducts
print("--- Card Grid HTML rendering snippet ---")
card_matches = re.findall(r'<div class="card-image-container".*?</div>', html, re.DOTALL)
for m in card_matches:
    print(m[:300])

print("\\n--- Table Row HTML rendering snippet ---")
table_matches = re.findall(r'<td class="td-product".*?</td>', html, re.DOTALL)
for m in table_matches:
    print(m[:300])

print("\\n--- Searching for openImageLightbox calls in code ---")
lightbox_calls = re.findall(r'openImageLightbox\([^\)]*\)', html)
print(f"Total openImageLightbox occurrences: {len(lightbox_calls)}")
for c in set(lightbox_calls):
    print(" -", c)
""")

import os
os.system("python3 /tmp/template_check.py")
