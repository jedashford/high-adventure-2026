import re
import json

html_path = "/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html"

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find PRODUCTS array
match = re.search(r'const\s+PRODUCTS\s*=\s*(\[.*?\]);', content, re.DOTALL)
if not match:
    # Try finding PRODUCTS = [ ... ] without const or matching across brackets
    match = re.search(r'PRODUCTS\s*=\s*(\[[\s\S]*?\]);', content)

if match:
    products_str = match.group(1)
    print("Found PRODUCTS match length:", len(products_str))
    # Let's inspect some of it or parse it
    try:
        # Note: JS objects might have unquoted keys or single quotes or trailing commas
        # Let's clean JS object syntax to JSON if needed, or use JS parser / regex to extract items
        items = re.findall(r'\{\s*id:\s*["\']?([^"',\s]+)["\']?.*?name:\s*["\']([^"\'\n]+)["\'].*?imageUrl:\s*["\']([^"\'\n]+)["\']', products_str, re.DOTALL)
        print(f"Extracted {len(items)} items using regex.")
        for item in items[:5]:
            print(item)
    except Exception as e:
        print("Regex error:", e)
else:
    print("PRODUCTS array not found with standard regex.")
