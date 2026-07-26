import json

with open('audit_results.json', 'r') as f:
    results = json.load(f)

print("=== RADIOS CATEGORY PRODUCT DETAILS ===")
radios = [r for r in results if r['category'] == 'radios']
for r in radios:
    print(f"ID: {r['id']}")
    print(f"  Name: {r['name']}")
    print(f"  URL: {r['url']}")
    print(f"  Status: {r['status']}")
    print(f"  Content-Type: {r['content_type']}")
    print(f"  CORS Header: {r['cors_header']}")
    print(f"  Redirects: {r['redirects']}")
    print()

print("=== NON-STAR CORS OR SPECIAL CONTENT TYPES ===")
for r in results:
    if r['cors_header'] != '*' or not r['content_type'].startswith('image/'):
        print(f"ID: {r['id']} ({r['category']}) - URL: {r['url']}")
        print(f"  Status: {r['status']}, Type: {r['content_type']}, CORS: {r['cors_header']}")
