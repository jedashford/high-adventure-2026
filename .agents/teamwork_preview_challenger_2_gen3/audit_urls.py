import re
import urllib.request
import urllib.error
import http.client
import ssl
import json
import time

html_path = "/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html"

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract block between `const PRODUCTS = [` and `];`
start_idx = content.find("const PRODUCTS = [")
if start_idx == -1:
    print("Error: PRODUCTS not found")
    exit(1)

# Find ending ]; after start_idx
end_idx = content.find("];", start_idx)
products_block = content[start_idx:end_idx]

# Extract each product object block using regex or bracket counting
# Let's split by `{` and matching `}`
product_matches = re.findall(r'\{\s*id:\s*[\'"]([^\'"]+)[\'"][\s\S]*?imageUrl:\s*[\'"]([^\'"]+)[\'"][\s\S]*?name:\s*[\'"]([^\'"]+)[\'"][\s\S]*?category:\s*[\'"]([^\'"]+)[\'"]', products_block)

print(f"Total products extracted: {len(product_matches)}")

products = []
for p_id, img_url, name, category in product_matches:
    products.append({
        'id': p_id,
        'name': name,
        'category': category,
        'imageUrl': img_url
    })

# If regex missed any fields due to order (e.g. name before imageUrl), let's do a more generic extraction per object
if len(products) != 50:
    print("Warning: regex found", len(products), "products. Let's do object parsing.")
    # Split product_block by product objects
    raw_objects = re.findall(r'\{[^{}]*?id:\s*[\'"]([^\'"]+)[\'"][^{}]*?\}', products_block)
    print("Raw objects count by id:", len(raw_objects))
    
    # Better: find all id, imageUrl, name, category for each product block
    # Split products_block by line or by product items
    product_chunks = products_block.split("{\n                id:")
    if len(product_chunks) > 1:
        products = []
        for chunk in product_chunks[1:]:
            chunk = "id:" + chunk
            id_m = re.search(r'id:\s*[\'"]([^\'"]+)[\'"]', chunk)
            img_m = re.search(r'imageUrl:\s*[\'"]([^\'"]+)[\'"]', chunk)
            name_m = re.search(r'name:\s*[\'"]([^\'"]+)[\'"]', chunk)
            cat_m = re.search(r'category:\s*[\'"]([^\'"]+)[\'"]', chunk)
            
            if id_m and img_m and name_m and cat_m:
                products.append({
                    'id': id_m.group(1),
                    'name': name_m.group(1),
                    'category': cat_m.group(1),
                    'imageUrl': img_m.group(1)
                })

print(f"Final extracted product count: {len(products)}")

# Check category counts
category_counts = {}
for p in products:
    cat = p['category']
    category_counts[cat] = category_counts.get(cat, 0) + 1
print("Category distribution:", category_counts)

# Header for standard browser request
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}

results = []

ssl_context = ssl.create_default_context()

for i, p in enumerate(products, 1):
    url = p['imageUrl']
    p_id = p['id']
    cat = p['category']
    name = p['name']
    
    req_res = {
        'index': i,
        'id': p_id,
        'category': cat,
        'name': name,
        'url': url,
        'status': None,
        'content_type': None,
        'cors_header': None,
        'redirects': 0,
        'final_url': url,
        'error': None,
        'byte_length': 0
    }
    
    try:
        # Create request
        req = urllib.request.Request(url, headers=headers)
        # Follow redirects tracking
        class RedirectHandler(urllib.request.HTTPRedirectHandler):
            def __init__(self):
                self.redirect_count = 0
            def redirect_request(self, req, fp, code, msg, headers, newurl):
                self.redirect_count += 1
                return super().redirect_request(req, fp, code, msg, headers, newurl)
                
        redirect_handler = RedirectHandler()
        opener = urllib.request.build_opener(redirect_handler)
        
        start_time = time.time()
        with opener.open(req, timeout=10) as response:
            req_res['status'] = response.getcode()
            req_res['content_type'] = response.headers.get('Content-Type')
            req_res['cors_header'] = response.headers.get('Access-Control-Allow-Origin')
            req_res['redirects'] = redirect_handler.redirect_count
            req_res['final_url'] = response.geturl()
            content_data = response.read(1024) # read sample or whole file
            req_res['byte_length'] = len(content_data)
            
    except urllib.error.HTTPError as e:
        req_res['status'] = e.code
        req_res['error'] = f"HTTPError {e.code}: {e.reason}"
        req_res['content_type'] = e.headers.get('Content-Type') if e.headers else None
    except urllib.error.URLError as e:
        req_res['status'] = 'URLError'
        req_res['error'] = str(e.reason)
    except Exception as e:
        req_res['status'] = 'Exception'
        req_res['error'] = str(e)
        
    results.append(req_res)
    print(f"[{i:02d}/50] [{cat.upper()}] {p_id}: Status {req_res['status']}, Content-Type: {req_res['content_type']}, CORS: {req_res['cors_header']}, Redirects: {req_res['redirects']}")

# Write detailed test output JSON
with open('audit_results.json', 'w') as out_f:
    json.dump(results, out_f, indent=2)

print("\n--- SUMMARY ---")
status_counts = {}
for r in results:
    s = r['status']
    status_counts[s] = status_counts.get(s, 0) + 1
print("Status counts:", status_counts)
