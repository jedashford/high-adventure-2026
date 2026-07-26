import re
import urllib.request
import ssl
import json
import time

html_path = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html'
with open(html_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Extract imageUrls from PRODUCTS
start_idx = text.find('const PRODUCTS = [')
end_idx = text.find('];', start_idx) + 2
products_code = text[start_idx:end_idx]

product_urls = re.findall(r'imageUrl:\s*[\'"](https?://[^\'"]+)[\'"]', products_code)

# Extract fallback URLs from CATEGORY_CDN_FALLBACKS or anywhere in JS
fallback_urls = re.findall(r'[\'"](https://images\.unsplash\.com/[^\'"]+)[\'"]', text)

# Deduplicate URLs while retaining source context
all_urls = sorted(list(set(product_urls + fallback_urls)))

print(f"Extracted {len(all_urls)} unique HTTPS image URLs from gemini-code-1784928132429.html...")

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
}

results = []
failures = []

for idx, url in enumerate(all_urls):
    req = urllib.request.Request(url, headers=headers, method='HEAD')
    status = None
    error_msg = None
    try:
        with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
            status = resp.getcode()
    except urllib.error.HTTPError as e:
        # Retry with GET if HEAD is forbidden/not allowed
        status = e.code
        if status in [403, 405]:
            try:
                get_req = urllib.request.Request(url, headers=headers, method='GET')
                with urllib.request.urlopen(get_req, timeout=10, context=ctx) as resp:
                    status = resp.getcode()
            except Exception as e2:
                error_msg = str(e2)
        else:
            error_msg = str(e)
    except Exception as e:
        error_msg = str(e)

    record = {
        'index': idx + 1,
        'url': url,
        'status': status,
        'error': error_msg
    }
    results.append(record)
    
    if status != 200:
        failures.append(record)
        print(f"❌ [{idx+1}/{len(all_urls)}] FAILED: HTTP {status} ({error_msg}) -> {url[:80]}...")
    else:
        print(f"✓ [{idx+1}/{len(all_urls)}] HTTP 200 OK -> {url[:80]}...")

print("\n=======================================================")
print("=== CHECK 2: NETWORK IMAGE URL VALIDITY AUDIT RESULT ===")
print("=======================================================")

print(f"Total Image URLs Audited: {len(all_urls)}")
print(f"HTTP 200 Successes: {len(all_urls) - len(failures)}")
print(f"HTTP Failures (404/400/500/errors): {len(failures)}")

if len(failures) == 0:
    print("\n✅ PASS: 100% of product and fallback image links returned HTTP 200 OK! Zero HTTP 404/400 errors.")
else:
    print(f"\n❌ FAIL: Found {len(failures)} failing image URLs:")
    print(json.dumps(failures, indent=2))
