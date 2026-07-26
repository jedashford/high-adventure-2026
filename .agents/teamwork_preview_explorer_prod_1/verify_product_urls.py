import urllib.request
import urllib.parse
import json
import re
import concurrent.futures

# List of assigned products
products = [
    # TENTS
    {
        "id": "tent-rei-halfdome",
        "name": "REI Co-op Half Dome SL 3+",
        "brand": "REI Co-op",
        "category": "Tents",
        "query": "REI Co-op Half Dome SL 3+ tent photo",
        "candidates": [
            "https://www.rei.com/media/83907c0b-1932-47e2-892a-89a19c72ff88",
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
            "https://upload.wikimedia.org/wikipedia/commons/ thumb/7/73/Tent_in_the_wilderness.jpg/1280px-Tent_in_the_wilderness.jpg"
        ]
    },
    {
        "id": "tent-ba-copperspur",
        "name": "Big Agnes Copper Spur HV UL3",
        "brand": "Big Agnes",
        "category": "Tents",
        "query": "Big Agnes Copper Spur HV UL3 tent",
        "candidates": [
            "https://cdn.shopify.com/s/files/1/0252/0593/products/THVCS320-Orange-Fly_1024x1024.jpg",
            "https://www.bigagnes.com/cdn/shop/products/THVCS320-Orange-Fly.jpg"
        ]
    },
    {
        "id": "tent-marmot-tungsten",
        "name": "Marmot Tungsten 3P",
        "brand": "Marmot",
        "category": "Tents",
        "query": "Marmot Tungsten 3P tent",
        "candidates": []
    },
    {
        "id": "tent-nemo-aurora",
        "name": "NEMO Aurora 3P",
        "brand": "NEMO",
        "category": "Tents",
        "query": "NEMO Aurora 3P tent",
        "candidates": []
    },
    {
        "id": "tent-durston-xmid",
        "name": "Durston X-Mid 2",
        "brand": "Durston Gear",
        "category": "Tents",
        "query": "Durston X-Mid 2 tent",
        "candidates": [
            "https://durstongear.com/cdn/shop/files/X-Mid-2-Tent-Fly-Angle.jpg"
        ]
    },
    {
        "id": "tent-naturehike-cloudup",
        "name": "Naturehike Cloud-Up 3",
        "brand": "Naturehike",
        "category": "Tents",
        "query": "Naturehike Cloud-Up 3 tent",
        "candidates": []
    },
    {
        "id": "tent-ba-craglake",
        "name": "Big Agnes Crag Lake SL3 (UL3)",
        "brand": "Big Agnes",
        "category": "Tents",
        "query": "Big Agnes Crag Lake SL3 tent",
        "candidates": []
    },

    # SLEEPING BAGS
    {
        "id": "bag-kelty-cosmic-down-20",
        "name": "Kelty Cosmic Down 20",
        "brand": "Kelty",
        "category": "Sleeping Bags",
        "query": "Kelty Cosmic Down 20 sleeping bag",
        "candidates": []
    },
    {
        "id": "bag-kelty-cosmic-synth-20",
        "name": "Kelty Cosmic Synthetic 20",
        "brand": "Kelty",
        "category": "Sleeping Bags",
        "query": "Kelty Cosmic Synthetic 20 sleeping bag",
        "candidates": []
    },
    {
        "id": "bag-nemo-forte-20",
        "name": "NEMO Forte Endless Promise 20",
        "brand": "NEMO",
        "category": "Sleeping Bags",
        "query": "NEMO Forte Endless Promise 20 sleeping bag",
        "candidates": []
    },
    {
        "id": "bag-rei-magma-15",
        "name": "REI Co-op Magma 15",
        "brand": "REI Co-op",
        "category": "Sleeping Bags",
        "query": "REI Co-op Magma 15 sleeping bag",
        "candidates": []
    },

    # BACKPACKS
    {
        "id": "pack-osprey-atmos-65",
        "name": "Osprey Atmos AG 65",
        "brand": "Osprey",
        "category": "Backpacks",
        "query": "Osprey Atmos AG 65 backpack",
        "candidates": []
    },
    {
        "id": "pack-osprey-ace-50",
        "name": "Osprey Ace 50 Youth Pack",
        "brand": "Osprey",
        "category": "Backpacks",
        "query": "Osprey Ace 50 Youth Pack backpack",
        "candidates": []
    },
    {
        "id": "pack-granite-crown3-60",
        "name": "Granite Gear Crown3 60",
        "brand": "Granite Gear",
        "category": "Backpacks",
        "query": "Granite Gear Crown3 60 backpack",
        "candidates": []
    },
    {
        "id": "pack-rei-flash-55",
        "name": "REI Co-op Flash 55",
        "brand": "REI Co-op",
        "category": "Backpacks",
        "query": "REI Co-op Flash 55 backpack",
        "candidates": []
    },

    # STOVES & KITCHEN
    {
        "id": "stove-msr-pocketrocket-2",
        "name": "MSR PocketRocket 2 Stove",
        "brand": "MSR",
        "category": "Stoves & Kitchen",
        "query": "MSR PocketRocket 2 Stove",
        "candidates": []
    },
    {
        "id": "stove-jetboil-flash",
        "name": "Jetboil Flash Cooking System",
        "brand": "Jetboil",
        "category": "Stoves & Kitchen",
        "query": "Jetboil Flash Cooking System stove",
        "candidates": []
    },
    {
        "id": "pot-toaks-750ml",
        "name": "TOAKS Titanium 750ml Pot",
        "brand": "TOAKS",
        "category": "Stoves & Kitchen",
        "query": "TOAKS Titanium 750ml Pot",
        "candidates": []
    },
    {
        "id": "filter-sawyer-squeeze",
        "name": "Sawyer Squeeze Water Filter System",
        "brand": "Sawyer",
        "category": "Stoves & Kitchen",
        "query": "Sawyer Squeeze Water Filter System",
        "candidates": []
    }
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}

def verify_url(url):
    url = url.strip()
    if not url.startswith('http'):
        return False, None, None
    try:
        # Try HEAD request
        req = urllib.request.Request(url, headers=HEADERS, method='HEAD')
        with urllib.request.urlopen(req, timeout=4) as resp:
            ctype = resp.headers.get('Content-Type', '').lower()
            status = resp.status
            if status == 200 and ('image/' in ctype or url.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))):
                return True, status, ctype
    except Exception:
        pass

    try:
        # Try GET request (read first 512 bytes)
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=5) as resp:
            ctype = resp.headers.get('Content-Type', '').lower()
            status = resp.status
            resp.read(512)
            if status == 200 and 'image/' in ctype:
                return True, status, ctype
    except Exception as e:
        return False, None, str(e)
    return False, None, "Not image content-type"

def search_bing_images(query):
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote(query)}&form=HDRSC2"
    req = urllib.request.Request(url, headers=HEADERS)
    found_urls = []
    try:
        with urllib.request.urlopen(req, timeout=6) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Extract murl (media url) from Bing JSON
            murls = re.findall(r'&quot;murl&quot;:&quot;(https?://[^&]+?\.(?:jpg|jpeg|png|webp)[^&]*)&quot;', html, re.IGNORECASE)
            for u in murls:
                u_clean = urllib.parse.unquote(u)
                if u_clean not in found_urls:
                    found_urls.append(u_clean)
    except Exception as e:
        print(f"Bing search error for '{query}': {e}")
    return found_urls

def process_product(p):
    print(f"[{p['id']}] Processing: {p['name']}...", flush=True)
    urls_to_test = list(p.get('candidates', []))
    
    # Perform web search if needed
    searched_urls = search_bing_images(p['query'])
    urls_to_test.extend(searched_urls)
    
    verified_url = None
    final_status = None
    final_ctype = None
    
    for url in urls_to_test:
        ok, status, ctype = verify_url(url)
        if ok:
            verified_url = url
            final_status = status
            final_ctype = ctype
            print(f"  --> FOUND VALID URL: {status} ({ctype}): {url[:90]}", flush=True)
            break
            
    return {
        "id": p['id'],
        "name": p['name'],
        "brand": p['brand'],
        "category": p['category'],
        "image_url": verified_url,
        "http_status": final_status,
        "mime_type": final_ctype,
        "verified": verified_url is not None
    }

if __name__ == "__main__":
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(process_product, p) for p in products]
        for future in concurrent.futures.as_completed(futures):
            res = future.result()
            results.append(res)
            
    print("\n" + "="*60)
    print("SUMMARY RESULTS:")
    print("="*60)
    for r in sorted(results, key=lambda x: x['id']):
        status_str = f"VERIFIED ({r['http_status']}, {r['mime_type']})" if r['verified'] else "FAILED"
        print(f"{r['id']:<25} | {status_str:<30} | {r['image_url']}")
        
    with open("verification_results.json", "w") as f:
        json.dump(results, f, indent=2)
