import re
import subprocess
import json

with open('gemini-code-1784928132429.html', 'r', encoding='utf-8') as f:
    html = f.read()

script_match = re.search(r'<script\b[^>]*>(.*?)</script>', html, re.DOTALL)
js_code = script_match.group(1) if script_match else ""

node_script = """
const window = globalThis;
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

console.log("=== CATEGORY SVG DATA MAP ===");
if (typeof CATEGORY_SVG_DATA !== 'undefined') {
    console.log("CATEGORY_SVG_DATA keys:", Object.keys(CATEGORY_SVG_DATA));
} else {
    console.log("CATEGORY_SVG_DATA is undefined!");
}

console.log("\\n=== TESTING getCategorySvgDataUri FOR ALL CATEGORIES ===");
const allCategoriesInProducts = [...new Set(PRODUCTS.map(p => p.category))];
const testCats = [...new Set([...allCategoriesInProducts, "tents", "sleeping_bags", "sleeping bags", "packs", "backpacks", "stoves", "electronics", "apparel", "footwear", "accessories", "climbing", "radios"])];

testCats.forEach(cat => {
    const svgUri = typeof getCategorySvgDataUri === 'function' ? getCategorySvgDataUri(cat) : 'N/A';
    console.log(`Cat '${cat}': SVG URI len = ${svgUri ? svgUri.length : 0}, startsWith data:image/svg+xml = ${svgUri ? svgUri.startsWith('data:image/svg+xml') : false}`);
});

console.log("\\n=== TESTING IMAGE FALLBACK TIER LOGIC ===");
// Mock img element
function createMockImg() {
    return {
        dataset: {},
        src: '',
        onerror: null
    };
}

PRODUCTS.forEach((p, idx) => {
    if (idx < 5 || idx > 45) {
        const mockImg = createMockImg();
        mockImg.dataset.fallbackTier = '1';
        mockImg.src = getProductImageUrl(p);
        console.log(`[Product ${p.id} - ${p.name} (${p.category})]`);
        console.log(`  Initial src: ${mockImg.src.substring(0, 60)}...`);
        
        // Simulate Tier 1 error -> triggers handleImageError
        handleImageError(mockImg, p.category);
        console.log(`  After Tier 1 error -> Tier: ${mockImg.dataset.fallbackTier}, src: ${mockImg.src.substring(0, 60)}...`);
        
        // Simulate Tier 2 error -> triggers handleImageError again
        handleImageError(mockImg, p.category);
        console.log(`  After Tier 2 error -> Tier: ${mockImg.dataset.fallbackTier}, src: ${mockImg.src.substring(0, 60)}...`);
        
        // Simulate Tier 3 error -> triggers handleImageError again
        handleImageError(mockImg, p.category);
        console.log(`  After Tier 3 error -> Tier: ${mockImg.dataset.fallbackTier}, src: ${mockImg.src.substring(0, 60)}...`);
    }
});
"""

with open('/tmp/deep_inspect.js', 'w', encoding='utf-8') as f_out:
    f_out.write(node_script)

res = subprocess.run(['node', '/tmp/deep_inspect.js'], capture_output=True, text=True)
print("STDOUT:")
print(res.stdout)
if res.stderr:
    print("STDERR:")
    print(res.stderr)
