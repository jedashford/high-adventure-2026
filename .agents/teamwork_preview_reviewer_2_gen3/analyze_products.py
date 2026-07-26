import re
import json

with open('gemini-code-1784928132429.html', 'r', encoding='utf-8') as f:
    html = f.read()

script_match = re.search(r'<script\b[^>]*>(.*?)</script>', html, re.DOTALL)
js_code = script_match.group(1) if script_match else ""

# Extract PRODUCTS array definition
products_match = re.search(r'const PRODUCTS = (\[.*?\]);', js_code, re.DOTALL)
if products_match:
    products_json_str = products_match.group(1)
    # Using python/json or JS to parse products
    with open('/tmp/products_extract.js', 'w', encoding='utf-8') as js_out:
        js_out.write(f"const PRODUCTS = {products_json_str};\nconsole.log(JSON.stringify(PRODUCTS, null, 2));")
    
    import subprocess
    res = subprocess.run(['node', '/tmp/products_extract.js'], capture_output=True, text=True)
    products = json.loads(res.stdout)
    print(f"Loaded {len(products)} products.")
    
    cats = {}
    for p in products:
        c = p['category']
        cats[c] = cats.get(c, 0) + 1
    
    print("\nCategory counts in PRODUCTS:")
    for c, count in sorted(cats.items()):
        print(f" - '{c}': {count}")

    print("\nProduct details per category:")
    for c in sorted(cats.keys()):
        print(f"\nCategory: {c}")
        prods_in_cat = [p for p in products if p['category'] == c]
        for p in prods_in_cat:
            img = p.get('imageUrl', '')
            print(f"  ID: {p['id']}, Name: {p['name']}, Image URL length: {len(img)}")

