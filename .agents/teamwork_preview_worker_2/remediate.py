import re
import sys

html_path = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

URL_MAP = {
    'tent-rei-halfdome': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
    'tent-ba-copperspur': 'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?auto=format&fit=crop&w=1200&q=80',
    'tent-marmot-tungsten': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    'tent-nemo-aurora': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    'tent-durston-xmid': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    'tent-naturehike-cloudup': 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
    'tent-ba-craglake': 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?auto=format&fit=crop&w=1200&q=80',
    'bag-kelty-cosmic-down-20': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    'bag-nemo-disco-20': 'https://images.unsplash.com/photo-1541004995602-b3e898709909?auto=format&fit=crop&w=1200&q=80',
    'bag-sts-spark-20': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    'bag-rei-magma-15': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
    'pad-therm-zlite-sol': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    'pad-therm-neoair-xlite': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    'pad-rei-helix': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    'pad-nemo-switchback': 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?auto=format&fit=crop&w=1200&q=80',
    'pack-osprey-atmos-65': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
    'pack-osprey-ace-50': 'https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=1200&q=80',
    'pack-granite-crown3-60': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    'pack-rei-flash-55': 'https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=1200&q=80',
    'stove-msr-pocketrocket-2': 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80',
    'stove-jetboil-flash': 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
    'pot-toaks-750ml': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    'filter-sawyer-squeeze': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'elec-garmin-inreach-mini2': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    'elec-nitecore-nb10000': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80',
    'elec-garmin-etrex-22x': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
    'elec-anker-325-20k': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80',
    'apparel-patagonia-torrentshell': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80',
    'apparel-mh-ghost-whisperer': 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80',
    'apparel-rei-rainier': 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80',
    'apparel-smartwool-merino-200': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
    'poles-durston-iceline': 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
    'poles-bd-alpine-cork': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    'poles-cascade-ultralight': 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80',
    'poles-leki-ultratrail-fx': 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&w=1200&q=80',
    'chair-helinox-zero': 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    'chair-ba-skyline-ul': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    'chair-nemo-moonlite': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    'chair-rei-flexlite-air': 'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?auto=format&fit=crop&w=1200&q=80',
    'light-nitecore-ut27': 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
    'light-nitecore-nu25-ul': 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80',
    'light-petzl-actik-core': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    'light-bd-spot-400-r': 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80',
    'light-biolite-325': 'https://images.unsplash.com/photo-1541004995602-b3e898709909?auto=format&fit=crop&w=1200&q=80'
}

# 1. Clean PRODUCTS array
def update_products_block(match):
    block = match.group(0)
    # Process each product object
    processed_count = [0]
    def fix_product_obj(obj_match):
        obj_str = obj_match.group(0)
        id_m = re.search(r"id:\s*['\"]([^'\"]+)['\"]", obj_str)
        if not id_m:
            return obj_str
        pid = id_m.group(1)
        if pid not in URL_MAP:
            print(f"Warning: {pid} not in URL_MAP")
            return obj_str
        
        processed_count[0] += 1
        new_url = URL_MAP[pid]
        # Remove any existing imageUrl lines in this object
        lines = obj_str.split('\n')
        new_lines = []
        inserted = False
        for line in lines:
            if re.search(r"imageUrl\s*:", line):
                continue
            new_lines.append(line)
            if re.search(r"id:\s*['\"]" + re.escape(pid) + r"['\"]", line) and not inserted:
                # Add single clean imageUrl right after id
                indent = line[:len(line) - len(line.lstrip())]
                new_lines.append(f"{indent}imageUrl: '{new_url}',")
                inserted = True
        return '\n'.join(new_lines)

    fixed_block = re.sub(r"\{\s*\n\s*id:\s*['\"][^'\"]+['\"][\s\S]*?\n\s*\}", fix_product_obj, block)
    print(f"Processed {processed_count[0]} product objects in PRODUCTS array.")
    return fixed_block

content = re.sub(r"const\s+PRODUCTS\s*=\s*\[\s*\{[\s\S]*?\}\s*\];", update_products_block, content, count=1)

# 2. Update CATEGORY_CDN_FALLBACKS
new_category_cdn_fallbacks = """const CATEGORY_CDN_FALLBACKS = {
            'tents': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
            'sleeping_bags': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
            'sleeping_pads': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
            'backpacks': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
            'stoves': 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=800&q=80',
            'electronics': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
            'apparel': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
            'poles': 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
            'chairs': 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
            'poles_chairs': 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
            'lighting': 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80'
        };"""

content = re.sub(r"const\s+CATEGORY_CDN_FALLBACKS\s*=\s*\{[\s\S]*?\};", new_category_cdn_fallbacks, content, count=1)

# 3. Update getCategorySvgDataUri
new_get_category_svg = """function getCategorySvgDataUri(category) {
            const catKey = (category || '').toLowerCase().trim();
            const categorySvgs = {
                'tents': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M60 25 L100 90 H20 Z" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round"/><path d="M60 25 L60 90 M40 90 L60 50 L80 90" fill="none" stroke="#22c55e" stroke-width="3"/><path d="M15 90 H105" stroke="#94a3b8" stroke-width="3"/></svg>`,
                'sleeping_bags': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="35" y="20" width="50" height="80" rx="25" fill="none" stroke="#f59e0b" stroke-width="4"/><path d="M35 50 H85 M35 70 H85" stroke="#38bdf8" stroke-width="3"/><circle cx="60" cy="35" r="8" fill="#38bdf8"/></svg>`,
                'sleeping_pads': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="25" width="60" height="70" rx="6" fill="none" stroke="#22c55e" stroke-width="4"/><line x1="30" y1="40" x2="90" y2="40" stroke="#38bdf8" stroke-width="2"/><line x1="30" y1="55" x2="90" y2="55" stroke="#38bdf8" stroke-width="2"/><line x1="30" y1="70" x2="90" y2="70" stroke="#38bdf8" stroke-width="2"/></svg>`,
                'backpacks': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M35 35 C35 25, 85 25, 85 35 L80 95 C80 98, 40 98, 40 95 Z" fill="none" stroke="#38bdf8" stroke-width="4"/><rect x="42" y="45" width="36" height="25" rx="4" fill="none" stroke="#f59e0b" stroke-width="3"/><path d="M45 25 V15 H75 V25" fill="none" stroke="#22c55e" stroke-width="3"/></svg>`,
                'stoves': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M45 85 H75 V60 H45 Z" fill="none" stroke="#94a3b8" stroke-width="3"/><path d="M35 60 H85 M60 60 V40" stroke="#38bdf8" stroke-width="4"/><path d="M50 40 L60 20 L70 40 Z" fill="#f59e0b" stroke="#ef4444" stroke-width="2"/></svg>`,
                'electronics': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="30" width="60" height="60" rx="10" fill="none" stroke="#38bdf8" stroke-width="4"/><circle cx="60" cy="60" r="15" fill="none" stroke="#22c55e" stroke-width="3"/><path d="M60 20 V30 M60 90 V100 M20 60 H30 M90 60 H100" stroke="#f59e0b" stroke-width="3"/></svg>`,
                'apparel': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M40 30 L60 40 L80 30 L95 45 L85 55 L80 50 V95 H40 V50 L35 55 L25 45 Z" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round"/></svg>`,
                'poles': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><line x1="35" y1="20" x2="85" y2="100" stroke="#22c55e" stroke-width="4"/><line x1="85" y1="20" x2="35" y2="100" stroke="#38bdf8" stroke-width="4"/></svg>`,
                'chairs': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="40" width="60" height="40" rx="6" fill="none" stroke="#f59e0b" stroke-width="4"/><line x1="40" y1="80" x2="30" y2="105" stroke="#38bdf8" stroke-width="4"/><line x1="80" y1="80" x2="90" y2="105" stroke="#38bdf8" stroke-width="4"/></svg>`,
                'poles_chairs': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><line x1="35" y1="20" x2="85" y2="100" stroke="#22c55e" stroke-width="4"/><line x1="85" y1="20" x2="35" y2="100" stroke="#38bdf8" stroke-width="4"/></svg>`,
                'lighting': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="40" y="45" width="40" height="30" rx="5" fill="none" stroke="#f59e0b" stroke-width="4"/><circle cx="60" cy="60" r="8" fill="#38bdf8"/><path d="M20 60 H40 M80 60 H100" stroke="#94a3b8" stroke-width="4"/></svg>`
            };

            const svgContent = categorySvgs[catKey];
            if (svgContent) {
                return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
            }
            return UNIVERSAL_EQUIPMENT_SVG;
        }"""

content = re.sub(r"function\s+getCategorySvgDataUri\([\s\S]*?\n\s*\}", new_get_category_svg, content, count=1)

# 4. Update handleImageError
new_handle_image_error = """function handleImageError(imgEl, category) {
            if (!imgEl) return;

            let tier = parseInt(imgEl.dataset.fallbackTier || '1', 10);
            const catKey = (category || imgEl.dataset.category || '').toLowerCase().trim();

            if (tier === 1) {
                imgEl.dataset.fallbackTier = '2';
                const cdnUrl = CATEGORY_CDN_FALLBACKS[catKey] || CATEGORY_CDN_FALLBACKS['tents'];
                if (cdnUrl && imgEl.src !== cdnUrl) {
                    imgEl.src = cdnUrl;
                    return;
                }
                tier = 2;
            }

            if (tier === 2) {
                imgEl.dataset.fallbackTier = '3';
                const categorySvg = getCategorySvgDataUri(catKey);
                if (categorySvg && imgEl.src !== categorySvg) {
                    imgEl.onerror = null;
                    imgEl.src = categorySvg;
                    return;
                }
                tier = 3;
            }

            imgEl.dataset.fallbackTier = '4';
            imgEl.onerror = null;
            imgEl.src = UNIVERSAL_EQUIPMENT_SVG;
        }"""

content = re.sub(r"function\s+handleImageError\([\s\S]*?\n\s*\}", new_handle_image_error, content, count=1)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully remediated gemini-code-1784928132429.html!")
