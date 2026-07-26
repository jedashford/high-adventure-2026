import re
import json

html_path = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html'
with open(html_path, 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('const PRODUCTS = [')
end_idx = text.find('];', start_idx) + 2
products_code = text[start_idx:end_idx]

# Extract product ID list
product_ids = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"]', products_code)
print(f"Total product IDs found in PRODUCTS: {len(product_ids)}")

# Check duplicate keys for every product block
# Split PRODUCTS by `{` at top level of array
depth = 0
in_array = False
current_block = []
blocks = []

for char in products_code:
    if char == '[':
        if not in_array:
            in_array = True
            continue
    if in_array:
        if char == '{':
            if depth == 0:
                current_block = []
            depth += 1
        if depth > 0:
            current_block.append(char)
        if char == '}':
            depth -= 1
            if depth == 0 and current_block:
                blocks.append(''.join(current_block))
                current_block = []

print(f"Total top-level product object blocks extracted: {len(blocks)}")

all_clean = True
duplicate_report = []

for idx, block in enumerate(blocks):
    # Find all line-level object keys (depth 1 in product object)
    keys = re.findall(r'^\s*([a-zA-Z0-9_]+)\s*:', block, re.MULTILINE)
    key_counts = {}
    for k in keys:
        key_counts[k] = key_counts.get(k, 0) + 1
    
    dups = {k: v for k, v in key_counts.items() if v > 1}
    
    id_match = re.search(r'id:\s*[\'"]([^\'"]+)[\'"]', block)
    p_id = id_match.group(1) if id_match else f"Block_{idx+1}"
    
    # Check specifically for imageUrl key count
    img_url_count = key_counts.get('imageUrl', 0)
    
    if dups or img_url_count != 1:
        all_clean = False
        duplicate_report.append({
            'index': idx + 1,
            'id': p_id,
            'imageUrl_count': img_url_count,
            'all_duplicate_keys': dups
        })

print("\n=======================================================")
print("=== CHECK 1: AST / OBJECT KEY UNIQUENESS AUDIT RESULT ===")
print("=======================================================")

if all_clean:
    print(f"✅ PASS: Audited {len(blocks)} product objects in `PRODUCTS` array.")
    print("   - Duplicate `imageUrl:` keys: 0")
    print("   - Duplicate keys of any kind: 0")
    print("   - Every product object has EXACTLY 1 clean `imageUrl:` property.")
else:
    print(f"❌ FAIL: Found integrity violations in product object keys:")
    print(json.dumps(duplicate_report, indent=2))
