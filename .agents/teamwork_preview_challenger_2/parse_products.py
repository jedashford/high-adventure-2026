import re
import json
import urllib.request
import urllib.parse
import urllib.error
import ssl
import sys
from PIL import Image
import io

def extract_products():
    with open('/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html', 'r', encoding='utf-8') as f:
        content = f.read()

    start = content.find('const PRODUCTS = [')
    if start == -1:
        print("ERROR: PRODUCTS array start not found")
        return []
    
    end = content.find('];\n', start)
    if end == -1:
        end = content.find('];', start)
    
    js_code = content[start + len('const PRODUCTS = '):end + 1]
    
    # Extract product objects or extract all imageUrl fields
    # Let's inspect product objects structure
    # We can match imageUrl: '...' or "..." or image fields
    matches = re.findall(r"imageUrl:\s*['\"]([^'\"]+)['\"]", js_code)
    print(f"Total imageUrl matches found: {len(matches)}")
    
    # Also search for any other URL strings or image properties
    all_urls = re.findall(r"https?://[^\s'\"\`]+", js_code)
    print(f"Total http/https URLs found: {len(all_urls)}")
    
    return js_code

if __name__ == '__main__':
    extract_products()
