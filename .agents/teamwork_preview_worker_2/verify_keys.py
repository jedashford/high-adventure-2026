import re

html_path = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('const PRODUCTS = [')
end_idx = content.find('const CATEGORIES = [')
products_block = content[start_idx:end_idx]

# Split into product object strings
objects = products_block.split('{\n')
counts = {}
for obj in objects:
    id_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", obj)
    if id_match:
        pid = id_match.group(1)
        image_url_matches = re.findall(r"imageUrl\s*:", obj)
        counts[pid] = len(image_url_matches)

print(f"Total products audited: {len(counts)}")
non_single = {k: v for k, v in counts.items() if v != 1}
if non_single:
    print(f"FAILED: Found products with != 1 imageUrl key: {non_single}")
else:
    print("SUCCESS: 100% of product objects have EXACTLY ONE imageUrl key!")
