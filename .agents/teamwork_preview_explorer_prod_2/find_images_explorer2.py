import urllib.request
import urllib.parse
import json
import re
import ssl

# Bypass SSL verification issues if any site has self-signed/chain issues
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

products = [
    # Water Filters / Hydration
    {"id": "filter-sawyer-squeeze", "name": "Sawyer Squeeze Water Filter System", "brand": "Sawyer", "category": "Water Filters/Hydration", "query": "Sawyer Squeeze Water Filter System product image"},
    
    # Electronics / Navigation
    {"id": "elec-garmin-inreach-mini2", "name": "Garmin inReach Mini 2 Satellite Communicator", "brand": "Garmin", "category": "Electronics/Navigation", "query": "Garmin inReach Mini 2 product image"},
    {"id": "elec-nitecore-nb10000", "name": "Nitecore NB10000 Gen 3 Power Bank", "brand": "Nitecore", "category": "Electronics/Navigation", "query": "Nitecore NB10000 Gen 3 Power Bank product image"},
    {"id": "elec-garmin-etrex-22x", "name": "Garmin eTrex 22x Handheld GPS", "brand": "Garmin", "category": "Electronics/Navigation", "query": "Garmin eTrex 22x GPS product image"},
    {"id": "elec-anker-325-20k", "name": "Anker 325 Power Bank 20,000mAh", "brand": "Anker", "category": "Electronics/Navigation", "query": "Anker 325 Power Bank 20000mAh product image"},
    
    # Apparel / Footwear
    {"id": "apparel-patagonia-torrentshell", "name": "Patagonia Torrentshell 3L Rain Jacket", "brand": "Patagonia", "category": "Apparel/Footwear", "query": "Patagonia Torrentshell 3L Rain Jacket product image"},
    {"id": "apparel-mh-ghost-whisperer", "name": "Mountain Hardwear Ghost Whisperer/2 Down Hoody", "brand": "Mountain Hardwear", "category": "Apparel/Footwear", "query": "Mountain Hardwear Ghost Whisperer 2 Down Hoody product image"},
    {"id": "apparel-rei-rainier", "name": "REI Co-op Rainier Rain Jacket", "brand": "REI Co-op", "category": "Apparel/Footwear", "query": "REI Co-op Rainier Rain Jacket product image"},
    {"id": "apparel-smartwool-merino-200", "name": "Smartwool Classic Thermal Merino Base Layer Crew", "brand": "Smartwool", "category": "Apparel/Footwear", "query": "Smartwool Classic Thermal Merino Base Layer Crew product image"},
    
    # Accessories / Tools (Poles & Chairs)
    {"id": "poles-cascade-carbon", "name": "Cascade Mountain Tech Carbon Fiber Trekking Poles", "brand": "Cascade Mountain Tech", "category": "Accessories/Tools", "query": "Cascade Mountain Tech Carbon Fiber Trekking Poles product image"},
    {"id": "poles-bd-trail-pro", "name": "Black Diamond Trail Pro Shock Poles", "brand": "Black Diamond", "category": "Accessories/Tools", "query": "Black Diamond Trail Pro Shock Poles product image"},
    {"id": "chair-helinox-zero", "name": "Helinox Chair Zero", "brand": "Helinox", "category": "Accessories/Tools", "query": "Helinox Chair Zero product image"},
    {"id": "chair-rei-flexlite-air", "name": "REI Co-op Flexlite Air Chair", "brand": "REI Co-op", "category": "Accessories/Tools", "query": "REI Co-op Flexlite Air Chair product image"},
    
    # Lighting / Headlamps
    {"id": "light-bd-spot-400", "name": "Black Diamond Spot 400 Headlamp", "brand": "Black Diamond", "category": "Lighting/Headlamps", "query": "Black Diamond Spot 400 Headlamp product image"},
    {"id": "light-petzl-actik-core", "name": "Petzl Actik Core Headlamp w/ Core Battery", "brand": "Petzl", "category": "Lighting/Headlamps", "query": "Petzl Actik Core Headlamp product image"},
    {"id": "light-nitecore-nu25", "name": "Nitecore NU25 UL Headlamp", "brand": "Nitecore", "category": "Lighting/Headlamps", "query": "Nitecore NU25 UL Headlamp product image"},
    {"id": "light-biolite-325", "name": "Biolite HeadLamp 325", "brand": "Biolite", "category": "Lighting/Headlamps", "query": "Biolite HeadLamp 325 product image"}
]

def search_ddg_image_api(query):
    token_url = f"https://duckduckgo.com/?q={urllib.parse.quote(query)}"
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    try:
        req = urllib.request.Request(token_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
            body = resp.read().decode('utf-8', errors='ignore')
            vqd_match = re.search(r'vqd=([\d-]+)', body)
            if not vqd_match:
                vqd_match = re.search(r'vqd=["\']([\d-]+)["\']', body)
            if not vqd_match:
                return []
            vqd = vqd_match.group(1)
            
        img_url = f"https://duckduckgo.com/i.js?l=us-en&o=json&q={urllib.parse.quote(query)}&vqd={vqd}&f=,,,"
        req2 = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req2, timeout=10, context=ctx) as resp2:
            data = json.loads(resp2.read().decode('utf-8'))
            results = data.get('results', [])
            return [r['image'] for r in results if 'image' in r]
    except Exception as e:
        print(f"DDG Img API error for {query}: {e}")
        return []

def check_url(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    req = urllib.request.Request(url, headers=headers, method='HEAD')
    try:
        with urllib.request.urlopen(req, timeout=6, context=ctx) as resp:
            ctype = resp.headers.get('Content-Type', '').lower()
            if resp.status == 200 and ('image/' in ctype or url.endswith(('.jpg', '.jpeg', '.png', '.webp'))):
                return True, resp.status, ctype
    except Exception:
        pass
        
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=6, context=ctx) as resp:
            ctype = resp.headers.get('Content-Type', '').lower()
            if resp.status == 200 and ('image/' in ctype or 'binary/' in ctype):
                return True, resp.status, ctype
    except Exception as e:
        return False, None, str(e)
    return False, None, "Invalid content type or status"

final_mappings = []

for p in products:
    print(f"\n==========================================")
    print(f"Searching for {p['id']}: {p['name']} ({p['brand']})...")
    img_urls = search_ddg_image_api(p['query'])
    valid_urls = []
    
    # Priority domains: official brand site, rei.com, backcountry.com, public CDNs, etc.
    for u in img_urls:
        if not u.startswith("https://"):
            continue
        ok, status, ctype = check_url(u)
        if ok:
            print(f"  [VERIFIED] HTTP {status} ({ctype}) -> {u}")
            valid_urls.append(u)
            if len(valid_urls) >= 3:
                break
        else:
            print(f"  [REJECTED] -> {u[:80]}")
            
    best_url = valid_urls[0] if valid_urls else "N/A"
    status_str = "Verified (HTTP 200 Image)" if valid_urls else "Failed Verification"
    
    final_mappings.append({
        "id": p["id"],
        "name": p["name"],
        "brand": p["brand"],
        "category": p["category"],
        "url": best_url,
        "status": status_str,
        "all_valid": valid_urls
    })

with open("/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_explorer_prod_2/search_output.json", "w") as f:
    json.dump(final_mappings, f, indent=2)

print("\nDone searching! Results saved to search_output.json")
