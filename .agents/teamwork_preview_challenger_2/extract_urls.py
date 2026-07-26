import re
import json
import urllib.request
import urllib.parse
import urllib.error
import ssl
from PIL import Image
import io

def get_urls_from_products_array(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    start = content.find('const PRODUCTS = [')
    if start == -1:
        raise ValueError("const PRODUCTS = [ not found")
    
    end = content.find('];\n', start)
    if end == -1:
        end = content.find('];', start)
    
    js_code = content[start:end+2]
    
    # Extract line by line to keep track of line numbers and product context
    lines = js_code.split('\n')
    
    records = []
    current_product = None
    
    for i, line in enumerate(lines):
        # check for product id
        id_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", line)
        if id_match:
            current_product = id_match.group(1)
        
        url_match = re.search(r"imageUrl:\s*['\"]([^'\"]+)['\"]", line)
        if url_match:
            url = url_match.group(1)
            records.append({
                'line_in_js': i + 1,
                'product_id': current_product,
                'url': url
            })
            
    return records

if __name__ == '__main__':
    records = get_urls_from_products_array('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html')
    print(f"Extracted {len(records)} imageUrl declarations from PRODUCTS array.")
    for r in records[:5]:
        print(r)
