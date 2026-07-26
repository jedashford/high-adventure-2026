import re
import json
import urllib.request
import urllib.parse
import urllib.error
import ssl
import time
import concurrent.futures
from PIL import Image
import io
import sys

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}

def extract_all_declarations(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    start = content.find('const PRODUCTS = [')
    end = content.find('];\n', start)
    if end == -1:
        end = content.find('];', start)
    
    js_code = content[start:end+2]
    lines = js_code.split('\n')
    
    records = []
    current_product_id = "unknown"
    current_product_name = "unknown"
    
    for idx, line in enumerate(lines):
        id_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", line)
        if id_match:
            current_product_id = id_match.group(1)
        name_match = re.search(r"name:\s*['\"]([^'\"]+)['\"]", line)
        if name_match:
            current_product_name = name_match.group(1)
            
        url_match = re.search(r"imageUrl:\s*['\"]([^'\"]+)['\"]", line)
        if url_match:
            url = url_match.group(1)
            records.append({
                'decl_index': len(records) + 1,
                'product_id': current_product_id,
                'product_name': current_product_name,
                'raw_url': url
            })
    return records

def validate_single_url(record):
    raw_url = record['raw_url']
    res = {
        'decl_index': record['decl_index'],
        'product_id': record['product_id'],
        'product_name': record['product_name'],
        'raw_url': raw_url,
        'scheme': None,
        'is_https': False,
        'has_invalid_chars': False,
        'is_relative': False,
        'http_status_head': None,
        'http_status_get': None,
        'content_type': None,
        'content_length': None,
        'width': None,
        'height': None,
        'aspect_ratio': None,
        'aspect_ratio_str': None,
        'error_msg': None,
        'status_summary': 'UNKNOWN'
    }

    # 1. Scheme and Syntax check
    parsed = urllib.parse.urlparse(raw_url)
    res['scheme'] = parsed.scheme
    res['is_https'] = (parsed.scheme == 'https')
    if not parsed.scheme or not parsed.netloc:
        res['is_relative'] = True
        res['error_msg'] = "Relative or malformed URL path"
        res['status_summary'] = "FAIL (Relative/Malformed)"
        return res

    # Check invalid characters
    if any(c in raw_url for c in [' ', '<', '>', '{', '}', '|', '\\', '^', '`']):
        res['has_invalid_chars'] = True

    # 2. HTTP HEAD Validation
    req_head = urllib.request.Request(raw_url, headers=HEADERS, method='HEAD')
    try:
        with urllib.request.urlopen(req_head, context=ctx, timeout=6) as response:
            res['http_status_head'] = response.status
            res['content_type'] = response.headers.get('Content-Type')
            res['content_length'] = response.headers.get('Content-Length')
    except urllib.error.HTTPError as e:
        res['http_status_head'] = e.code
    except Exception as e:
        res['http_status_head'] = f"ERR: {type(e).__name__}"

    # 3. HTTP GET Validation & Image dimensions
    req_get = urllib.request.Request(raw_url, headers=HEADERS, method='GET')
    try:
        with urllib.request.urlopen(req_get, context=ctx, timeout=10) as response:
            res['http_status_get'] = response.status
            if not res['content_type']:
                res['content_type'] = response.headers.get('Content-Type')
            if not res['content_length']:
                res['content_length'] = response.headers.get('Content-Length')
            
            data = response.read()
            if not res['content_length']:
                res['content_length'] = len(data)
                
            try:
                img = Image.open(io.BytesIO(data))
                res['width'], res['height'] = img.size
                if res['height'] > 0:
                    ar = res['width'] / res['height']
                    res['aspect_ratio'] = round(ar, 3)
                    res['aspect_ratio_str'] = f"{res['width']}x{res['height']} ({res['aspect_ratio']}:1)"
            except Exception as img_err:
                res['error_msg'] = f"PIL parse error: {str(img_err)}"
                
    except urllib.error.HTTPError as e:
        res['http_status_get'] = e.code
        res['error_msg'] = f"HTTP Error {e.code}: {e.reason}"
    except Exception as e:
        res['http_status_get'] = f"ERR: {type(e).__name__}"
        res['error_msg'] = str(e)

    # 4. Final summary classification
    status_ok = (res['http_status_get'] == 200)
    ctype = res['content_type'] or ''
    ctype_ok = 'image' in ctype.lower() or 'octet-stream' in ctype.lower()
    
    if not res['is_https']:
        res['status_summary'] = 'FAIL (Insecure HTTP Scheme)'
    elif res['http_status_get'] == 200 and ctype_ok and res['width']:
        res['status_summary'] = 'PASS'
    elif res['http_status_get'] == 200 and not ctype_ok:
        res['status_summary'] = f"FAIL (200 OK but invalid content-type: {res['content_type']})"
    elif res['http_status_get'] == 200 and not res['width']:
        res['status_summary'] = f"FAIL (200 OK but corrupt image)"
    else:
        res['status_summary'] = f"FAIL ({res['http_status_get']}: {res['error_msg']})"

    return res

def main():
    filepath = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html'
    records = extract_all_declarations(filepath)
    print(f"Starting parallel HTTP validation on {len(records)} image URLs...", flush=True)
    
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=25) as executor:
        future_to_rec = {executor.submit(validate_single_url, rec): rec for rec in records}
        for future in concurrent.futures.as_completed(future_to_rec):
            rec = future_to_rec[future]
            try:
                res = future.result()
                results.append(res)
                print(f"[{res['decl_index']}/{len(records)}] {res['product_id']} -> {res['status_summary']} | {res['aspect_ratio_str']} | CT: {res['content_type']}", flush=True)
            except Exception as exc:
                print(f"Record {rec['decl_index']} generated an exception: {exc}", flush=True)

    results.sort(key=lambda x: x['decl_index'])

    with open('/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_challenger_2/validation_results.json', 'w') as f:
        json.dump(results, f, indent=2)

    print(f"\nValidation complete. Total tested: {len(results)}. Saved to validation_results.json", flush=True)

if __name__ == '__main__':
    main()
