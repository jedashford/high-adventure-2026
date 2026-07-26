import urllib.request
import urllib.parse
import json
import re

products = [
    {"id": "tent-rei-halfdome", "name": "REI Co-op Half Dome SL 3+", "brand": "REI Co-op", "category": "Tents", "query": "REI Co-op Half Dome SL 3+ tent"},
    {"id": "tent-ba-copperspur", "name": "Big Agnes Copper Spur HV UL3", "brand": "Big Agnes", "category": "Tents", "query": "Big Agnes Copper Spur HV UL3 tent"},
    {"id": "tent-marmot-tungsten", "name": "Marmot Tungsten 3P", "brand": "Marmot", "category": "Tents", "query": "Marmot Tungsten 3P tent"},
    {"id": "tent-nemo-aurora", "name": "NEMO Aurora 3P", "brand": "NEMO", "category": "Tents", "query": "NEMO Aurora 3P tent"},
    {"id": "tent-durston-xmid", "name": "Durston X-Mid 2", "brand": "Durston Gear", "category": "Tents", "query": "Durston X-Mid 2 tent"},
    {"id": "tent-naturehike-cloudup", "name": "Naturehike Cloud-Up 3", "brand": "Naturehike", "category": "Tents", "query": "Naturehike Cloud-Up 3 tent"},
    {"id": "tent-ba-craglake", "name": "Big Agnes Crag Lake SL3 (UL3)", "brand": "Big Agnes", "category": "Tents", "query": "Big Agnes Crag Lake SL3 tent"},
    {"id": "bag-kelty-cosmic-down-20", "name": "Kelty Cosmic Down 20", "brand": "Kelty", "category": "Sleeping Bags", "query": "Kelty Cosmic Down 20 sleeping bag"},
    {"id": "bag-kelty-cosmic-synth-20", "name": "Kelty Cosmic Synthetic 20", "brand": "Kelty", "category": "Sleeping Bags", "query": "Kelty Cosmic Synthetic 20 sleeping bag"},
    {"id": "bag-nemo-forte-20", "name": "NEMO Forte Endless Promise 20", "brand": "NEMO", "category": "Sleeping Bags", "query": "NEMO Forte Endless Promise 20 sleeping bag"},
    {"id": "bag-rei-magma-15", "name": "REI Co-op Magma 15", "brand": "REI Co-op", "category": "Sleeping Bags", "query": "REI Co-op Magma 15 sleeping bag"},
    {"id": "pack-osprey-atmos-65", "name": "Osprey Atmos AG 65", "brand": "Osprey", "category": "Backpacks", "query": "Osprey Atmos AG 65 backpack"},
    {"id": "pack-osprey-ace-50", "name": "Osprey Ace 50 Youth Pack", "brand": "Osprey", "category": "Backpacks", "query": "Osprey Ace 50 Youth Pack backpack"},
    {"id": "pack-granite-crown3-60", "name": "Granite Gear Crown3 60", "brand": "Granite Gear", "category": "Backpacks", "query": "Granite Gear Crown3 60 backpack"},
    {"id": "pack-rei-flash-55", "name": "REI Co-op Flash 55", "brand": "REI Co-op", "category": "Backpacks", "query": "REI Co-op Flash 55 backpack"},
    {"id": "stove-msr-pocketrocket-2", "name": "MSR PocketRocket 2 Stove", "brand": "MSR", "category": "Stoves & Kitchen", "query": "MSR PocketRocket 2 Stove"},
    {"id": "stove-jetboil-flash", "name": "Jetboil Flash Cooking System", "brand": "Jetboil", "category": "Stoves & Kitchen", "query": "Jetboil Flash Cooking System stove"},
    {"id": "pot-toaks-750ml", "name": "TOAKS Titanium 750ml Pot", "brand": "TOAKS", "category": "Stoves & Kitchen", "query": "TOAKS Titanium 750ml Pot"},
    {"id": "filter-sawyer-squeeze", "name": "Sawyer Squeeze Water Filter System", "brand": "Sawyer", "category": "Stoves & Kitchen", "query": "Sawyer Squeeze Water Filter System"}
]

def search_ddg_images(query):
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # find image links or external urls
            urls = re.findall(r'https?://[^\s\'"<>]+?\.(?:png|jpg|jpeg|webp)', html, re.IGNORECASE)
            return urls
    except Exception as e:
        print(f"Error searching {query}: {e}")
        return []

def search_ddg_image_api(query):
    # DDG image search token request
    token_url = f"https://duckduckgo.com/?q={urllib.parse.quote(query)}"
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    try:
        req = urllib.request.Request(token_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            body = resp.read().decode('utf-8', errors='ignore')
            vqd_match = re.search(r'vqd=([\d-]+)', body)
            if not vqd_match:
                vqd_match = re.search(r'vqd=["\']([\d-]+)["\']', body)
            if not vqd_match:
                return []
            vqd = vqd_match.group(1)
            
        img_url = f"https://duckduckgo.com/i.js?l=us-en&o=json&q={urllib.parse.quote(query)}&vqd={vqd}&f=,,,"
        req2 = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req2, timeout=10) as resp2:
            data = json.loads(resp2.read().decode('utf-8'))
            results = data.get('results', [])
            return [r['image'] for r in results if 'image' in r]
    except Exception as e:
        print(f"DDG Img API error for {query}: {e}")
        return []

def check_url(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    # try HEAD first, fallback to GET
    req = urllib.request.Request(url, headers=headers, method='HEAD')
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            ctype = resp.headers.get('Content-Type', '').lower()
            if resp.status == 200 and ('image/' in ctype or url.endswith(('.jpg', '.jpeg', '.png', '.webp'))):
                return True, resp.status, ctype
    except Exception:
        pass
        
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            ctype = resp.headers.get('Content-Type', '').lower()
            if resp.status == 200 and 'image/' in ctype:
                return True, resp.status, ctype
    except Exception as e:
        return False, None, str(e)
    return False, None, "Invalid content type or status"

results = {}
for p in products:
    print(f"\nSearching for {p['id']}: {p['name']}...")
    img_urls = search_ddg_image_api(p['query'])
    valid_found = []
    for u in img_urls[:15]:
        ok, status, ctype = check_url(u)
        if ok:
            print(f"  [OK] {status} {ctype} -> {u}")
            valid_found.append({"url": u, "status": status, "ctype": ctype})
            if len(valid_found) >= 3:
                break
        else:
            print(f"  [FAIL] {ctype} -> {u[:70]}")
    results[p['id']] = valid_found

with open("image_search_results.json", "w") as f:
    json.dump(results, f, indent=2)
