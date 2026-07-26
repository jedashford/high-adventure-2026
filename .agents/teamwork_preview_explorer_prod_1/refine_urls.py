import json
import urllib.request
import urllib.parse
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}

with open("verification_results.json", "r") as f:
    data = json.load(f)

def test_url(url):
    if not url.startswith("https://"):
        url = url.replace("http://", "https://")
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            ctype = resp.headers.get('Content-Type', '').lower()
            if resp.status == 200 and 'image/' in ctype:
                return True, resp.status, ctype, url
    except Exception as e:
        return False, None, str(e), url
    return False, None, "Invalid content type", url

# Specific targeted high quality HTTPS image candidates for products:
specific_candidates = {
    "tent-rei-halfdome": [
        "https://www.switchbacktravel.com/sites/default/files/styles/img_760/public/articles/REI%20Half%20Dome%20SL%202%2B%20backpacking%20tent.jpg",
        "https://www.hikinglife.com/wp-content/uploads/2018/06/REI-Half-Dome-2-Plus.jpg",
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80"
    ],
    "pack-osprey-ace-50": [
        "https://cdn11.bigcommerce.com/s-v29r2wl21x/images/stencil/1280x1280/products/5135/25852/SS23-Ace50-Side-GreenCanopyMatchaGreen__22684.1670924976.jpg",
        "https://www.furtherfaster.co.nz/cdn/shop/files/osprey-ace-50-pack-youth-green-canopy-matcha-green-nz-01.webp?v=1763717696"
    ],
    "filter-sawyer-squeeze": [
        "https://sawyerdirect.net/cdn/shop/files/54122622307_47987a2e9c_k_1200x1200.jpg?v=1742388596",
        "https://www.sectionhiker.com/wp-content/uploads/2011/05/Sawyer-Squeeze-Water-Filter.jpg",
        "https://m.media-amazon.com/images/I/71zD9N2n71L._AC_SL1500_.jpg"
    ]
}

refined = []
for item in data:
    item_id = item['id']
    current_url = item['image_url']
    
    # Check if current_url works with https
    if current_url:
        ok, status, ctype, https_url = test_url(current_url)
        if ok:
            item['image_url'] = https_url
            item['http_status'] = status
            item['mime_type'] = ctype
            item['verified'] = True
            refined.append(item)
            continue
            
    # Try specific candidates
    found = False
    if item_id in specific_candidates:
        for cand in specific_candidates[item_id]:
            ok, status, ctype, https_url = test_url(cand)
            if ok:
                item['image_url'] = https_url
                item['http_status'] = status
                item['mime_type'] = ctype
                item['verified'] = True
                refined.append(item)
                found = True
                break
                
    if not found:
        refined.append(item)

print("\nREFINED ALL HTTPS VERIFICATION:")
print("="*80)
all_ok = True
for r in sorted(refined, key=lambda x: x['id']):
    is_https = r['image_url'].startswith("https://")
    status_str = f"HTTP {r['http_status']} [{r['mime_type']}] (HTTPS: {is_https})"
    print(f"{r['id']:<26} | {status_str:<40} | {r['image_url']}")
    if not r['verified'] or not is_https:
        all_ok = False

print("\nALL 19 PRODUCT URLS HTTPS & VERIFIED:", all_ok)

with open("refined_verification_results.json", "w") as f:
    json.dump(refined, f, indent=2)
