import re

file_path = '/Users/jed/jedstuff/high-adventure/gemini-code-1784928132429.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

url_map = {
    'tent-rei-halfdome': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
    'tent-ba-copperspur': 'https://absolute-snow-content.cdn.rlab.net/original/flsu0031.jpg',
    'tent-marmot-tungsten': 'https://www.bfgcdn.com/1500_1500_90/521-0592-0211/marmot-tungsten-3p-3-person-tent.jpg',
    'tent-nemo-aurora': 'https://cdn.shoplightspeed.com/shops/622237/files/54843417/image.jpg',
    'tent-durston-xmid': 'https://valleyandpeak.co.uk/cdn/shop/files/Durston_Gear_X-Mid_2_Solid_Ultralight_Tent_Double_1024x1024.webp?v=1728381332',
    'tent-naturehike-cloudup': 'https://i5.walmartimages.com/seo/Naturehike-Cloud-up-3-person-Camping-Tent-210T-Polyester-20D-Silicone-Nylon-PU3000-4000mm-Ultralight-Tent-Portable-Outdoor-Tent-Backpack-Hiking-Tent_cf740514-ef20-4045-9a04-c48367d7a0b5.11a9833995bf9fd393988dad749efba7.jpeg',
    'tent-ba-craglake': 'https://cdn11.bigcommerce.com/s-v29r2wl21x/images/stencil/660x733/products/5530/27837/ss23lifestyle2__37554.1671790408.jpg?c=1',

    'bag-kelty-cosmic-down-20': 'https://cdn.absolute-snow.co.uk/fullsize/35413724RR_MAIN_Kelty_S24_CosmicDown_20Long__48623.jpg',
    'bag-kelty-cosmic-synth-20': 'https://cdn.absolute-snow.co.uk/fullsize/Kelty_WomenS_Cosmic_Synthetic_20_Deg_Sleeping_Bag_Green_Gables_Laurel_Green_Tandoori_Spice_520548-12.jpg',
    'bag-nemo-forte-20': 'https://www.mountainsports.com/cdn/shop/files/ForteEndlessPromiseMensSleepingBag202320_FDetail.jpg?v=1742851037',
    'bag-rei-magma-15': 'https://www.adventurealan.com/wp-content/uploads/2021/10/REI-Magma-15-Ultralight-Sleeping-Bag.jpg',

    'pad-therm-zlite-sol': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
    'pad-therm-neoair-xlite': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    'pad-rei-helix': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    'pad-nemo-switchback': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',

    'pack-osprey-atmos-65': 'https://www.glacier-national-park-travel-guide.com/wp-content/uploads/2015/03/Osprey-Atmos-65-AG-EX-Pack-.jpg',
    'pack-osprey-ace-50': 'https://www.furtherfaster.co.nz/cdn/shop/files/osprey-ace-50-pack-youth-green-canopy-matcha-green-nz-01.webp?v=1763717696',
    'pack-granite-crown3-60': 'https://www.campsaver.com/i/zoomed/opplanet-granite-gear-crown-3-backpack-short-dunes-black-60l-50014-7010-main-1.jpg',
    'pack-rei-flash-55': 'https://www.adventurealan.com/wp-content/uploads/2022/04/REI-Co-op-Flash-55-Pack-1.jpg',

    'stove-msr-pocketrocket-2': 'https://content.backcountry.com/images/items/900/CAS/CAS009R/ONECOL.jpg',
    'stove-jetboil-flash': 'https://www.durableknife.com/wp-content/uploads/2026/01/jetboil-flash-cooking-stove-system-gold-scaled.webp',
    'pot-toaks-750ml': 'https://i5.walmartimages.com/seo/TOAKS-Titanium-750ml-Pot-w-Bail-Grey_fd422453-f441-4b7b-83fc-4fbe58d23d55_1.9e1e13249844d37ecfafe9b6e883b9ec.jpeg',
    'filter-sawyer-squeeze': 'https://sawyerdirect.net/cdn/shop/files/54122622307_47987a2e9c_k_1200x1200.jpg?v=1742388596',

    'elec-garmin-inreach-mini2': 'https://media-www.sportchek.ca/product/div-01-hardgoods/dpt-48-electronics/sdpt-14-navigation/333904911/garmin-inreach-mini-2-b2f061a2-ada9-4ec1-95a3-4e2e53badc07-jpgrendition.jpg?imdensity=1&imwidth=1244&impolicy=gZoom',
    'elec-nitecore-nb10000': 'https://down-sg.img.susercontent.com/file/sg-11134207-7rdxr-lz4u8zp24z8adc',
    'elec-garmin-etrex-22x': 'https://www.outdoorsi.com.au/wp-content/uploads/2022/11/Garmin-eTrex-22x-Rugged-Handheld-GPS-Navigator-Black-Navy.jpg',
    'elec-anker-325-20k': 'https://brlhc31l9m.tenbytecdn.com/assets/images/products/power-bank/product_9438_main.webp?w=900',

    'apparel-patagonia-torrentshell': 'https://www.patagonia.com.hk/cdn/shop/files/WBS23_85241_BLK_TM4.jpg?v=1693883676&width=1800',
    'apparel-mh-ghost-whisperer': 'https://images.hardloop.fr/377196/mountain-hardwear-ghost-whisperer-2-hoody-down-jacket-mens.jpg?w=auto&h=auto&q=80',
    'apparel-rei-rainier': 'https://www.adventurealan.com/wp-content/uploads/2021/03/REI-Rainier-Rain-Jacket-1500x1500.jpg',
    'apparel-smartwool-merino-200': 'https://www.wildernessx.com/cdn/shop/files/smartwool-classic-thermal-merino-base-layer-crew-w_1.jpg?v=1718080004&width=1946',

    'poles-durston-iceline': 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    'poles-bd-alpine-cork': 'https://www.vassaroutdoors.com/cdn/shop/products/Black_Diamond_Trail_Pro_Shock_-_1_1024x1024.jpg?v=1571265333',
    'poles-cascade-ultralight': 'https://cascademountaintech.com/cdn/shop/files/trekkingpolelayoutimage_1_1800x1800.jpg?v=1738185232',
    'poles-leki-ultratrail-fx': 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    'poles-cascade-carbon': 'https://cascademountaintech.com/cdn/shop/files/trekkingpolelayoutimage_1_1800x1800.jpg?v=1738185232',
    'poles-bd-trail-pro': 'https://www.vassaroutdoors.com/cdn/shop/products/Black_Diamond_Trail_Pro_Shock_-_1_1024x1024.jpg?v=1571265333',
    'chair-helinox-zero': 'https://www.anacondastores.com/medias/BP90187413-black-2.jpg-SPOTWF-productHero?context=bWFzdGVyfGltYWdlc3w1Mzg1OHxpbWFnZS9qcGVnfGltYWdlcy9oNjgvaDAwLzE0MTUxNjY0MDc0NzgyL0JQOTAxODc0MTMtYmxhY2tfMi5qcGdfU1BPVFdGX3Byb2R1Y3RIZXJvfGUwOGFkOTY3ZTEwMGQ1N2Y1YjJjYjI3ZmZiZTUyNTIzMzM2NTBmMTJmZTBjYzE0NTFkZGI0MGQ0NTEwOWQ0MTQ',
    'chair-rei-flexlite-air': 'https://backpackinglight.com/wp-content/uploads/2024/08/rei-flexlite-air-chair.jpg',

    'light-bd-spot-400': 'https://cdn.snowys.com.au/content/images/thumbs/1247458_spot-400-headlamp-graphite.jpeg',
    'light-petzl-actik-core': 'https://dbyvw4eroffpi.cloudfront.net/product-media/3JS7/2000/2000/Petzl-Actik-Core-Headlamp.jpg',
    'light-nitecore-nu25': 'https://www.andrew-amanda.com/static/images/products/main/20221011152145_76819.super.jpg',
    'light-biolite-325': 'https://d2j6dbq0eux0bg.cloudfront.net/images/113852578/5060716617.jpg'
}

def add_image_url(match):
    pid = match.group(1)
    if pid in url_map:
        return f"id: '{pid}',\n                imageUrl: '{url_map[pid]}',"
    return match.group(0)

# Replace product IDs in content
content = re.sub(r"id:\s*'([^']+)',", add_image_url, content)

new_js_code = """
        /**
         * Category CDN Fallback Map (Tier 2 High-Res Unsplash CDN URLs)
         */
        const CATEGORY_CDN_FALLBACKS = {
            'tents': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
            'sleeping_bags': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
            'sleeping_pads': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
            'backpacks': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
            'stoves': 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=800&q=80',
            'electronics': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
            'apparel': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
            'poles_chairs': 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
            'lighting': 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80'
        };

        /**
         * Universal Base Equipment SVG Data-URI (Tier 4 Fallback)
         */
        const UNIVERSAL_EQUIPMENT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#0f172a"/><circle cx="60" cy="60" r="45" fill="none" stroke="#38bdf8" stroke-width="4"/><path d="M60 25 L85 75 H35 Z" fill="none" stroke="#22c55e" stroke-width="4" stroke-linejoin="round"/><circle cx="60" cy="55" r="8" fill="#f59e0b"/><path d="M40 90 H80" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/></svg>')}`;

        /**
         * Generates Dynamic Vector SVG Data-URI by Category (Tier 3 Corrected Keys)
         */
        function getCategorySvgDataUri(category) {
            const categorySvgs = {
                'tents': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M60 25 L100 90 H20 Z" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round"/><path d="M60 25 L60 90 M40 90 L60 50 L80 90" fill="none" stroke="#22c55e" stroke-width="3"/><path d="M15 90 H105" stroke="#94a3b8" stroke-width="3"/></svg>`,
                'sleeping_bags': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="35" y="20" width="50" height="80" rx="25" fill="none" stroke="#f59e0b" stroke-width="4"/><path d="M35 50 H85 M35 70 H85" stroke="#38bdf8" stroke-width="3"/><circle cx="60" cy="35" r="8" fill="#38bdf8"/></svg>`,
                'sleeping_pads': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="25" width="60" height="70" rx="6" fill="none" stroke="#22c55e" stroke-width="4"/><line x1="30" y1="40" x2="90" y2="40" stroke="#38bdf8" stroke-width="2"/><line x1="30" y1="55" x2="90" y2="55" stroke="#38bdf8" stroke-width="2"/><line x1="30" y1="70" x2="90" y2="70" stroke="#38bdf8" stroke-width="2"/></svg>`,
                'backpacks': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M35 35 C35 25, 85 25, 85 35 L80 95 C80 98, 40 98, 40 95 Z" fill="none" stroke="#38bdf8" stroke-width="4"/><rect x="42" y="45" width="36" height="25" rx="4" fill="none" stroke="#f59e0b" stroke-width="3"/><path d="M45 25 V15 H75 V25" fill="none" stroke="#22c55e" stroke-width="3"/></svg>`,
                'stoves': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M45 85 H75 V60 H45 Z" fill="none" stroke="#94a3b8" stroke-width="3"/><path d="M35 60 H85 M60 60 V40" stroke="#38bdf8" stroke-width="4"/><path d="M50 40 L60 20 L70 40 Z" fill="#f59e0b" stroke="#ef4444" stroke-width="2"/></svg>`,
                'electronics': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="30" y="30" width="60" height="60" rx="10" fill="none" stroke="#38bdf8" stroke-width="4"/><circle cx="60" cy="60" r="15" fill="none" stroke="#22c55e" stroke-width="3"/><path d="M60 20 V30 M60 90 V100 M20 60 H30 M90 60 H100" stroke="#f59e0b" stroke-width="3"/></svg>`,
                'apparel': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><path d="M40 30 L60 40 L80 30 L95 45 L85 55 L80 50 V95 H40 V50 L35 55 L25 45 Z" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round"/></svg>`,
                'poles_chairs': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><line x1="35" y1="20" x2="85" y2="100" stroke="#22c55e" stroke-width="4"/><line x1="85" y1="20" x2="35" y2="100" stroke="#38bdf8" stroke-width="4"/></svg>`,
                'lighting': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%"><rect width="120" height="120" fill="#1e293b"/><rect x="40" y="45" width="40" height="30" rx="5" fill="none" stroke="#f59e0b" stroke-width="4"/><circle cx="60" cy="60" r="8" fill="#38bdf8"/><path d="M20 60 H40 M80 60 H100" stroke="#94a3b8" stroke-width="4"/></svg>`
            };

            const svgContent = categorySvgs[category];
            if (svgContent) {
                return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
            }
            return UNIVERSAL_EQUIPMENT_SVG;
        }

        /**
         * Product Image URL Resolver with 4-Tier Fallback Hierarchy
         * Tier 1: product.imageUrl
         * Tier 2: CATEGORY_CDN_FALLBACKS[category]
         * Tier 3: getCategorySvgDataUri(category)
         * Tier 4: UNIVERSAL_EQUIPMENT_SVG
         */
        function getProductImageUrl(product) {
            if (product && product.imageUrl) return product.imageUrl;
            
            if (product && product.category && CATEGORY_CDN_FALLBACKS[product.category]) {
                return CATEGORY_CDN_FALLBACKS[product.category];
            }
            
            return getCategorySvgDataUri(product ? product.category : '');
        }

        /**
         * Runtime Image Error Handler
         * Cascades: Tier 1 (imageUrl) -> Tier 2 (CDN Fallback) -> Tier 3 (Category SVG) -> Tier 4 (Universal SVG)
         */
        function handleImageError(imgEl, category) {
            const tier = parseInt(imgEl.dataset.fallbackTier || '1', 10);

            if (tier === 1) {
                imgEl.dataset.fallbackTier = '2';
                const cdnUrl = CATEGORY_CDN_FALLBACKS[category];
                if (cdnUrl && imgEl.src !== cdnUrl) {
                    imgEl.src = cdnUrl;
                    return;
                }
            }

            if (tier <= 2) {
                imgEl.dataset.fallbackTier = '3';
                const categorySvg = getCategorySvgDataUri(category);
                if (categorySvg && imgEl.src !== categorySvg) {
                    imgEl.src = categorySvg;
                    return;
                }
            }

            imgEl.dataset.fallbackTier = '4';
            imgEl.onerror = null;
            imgEl.src = UNIVERSAL_EQUIPMENT_SVG;
        }

        /**
         * Image Lightbox Modal Interactive Viewer
         */
        function openImageLightbox(productId) {
            const product = PRODUCTS.find(p => p.id === productId);
            if (!product) return;

            document.getElementById('lightboxTitle').innerText = `${product.brand} - ${product.name}`;
            const imgEl = document.getElementById('lightboxImg');
            imgEl.dataset.fallbackTier = '1';
            imgEl.src = getProductImageUrl(product);
            imgEl.onerror = () => handleImageError(imgEl, product.category);
            
            document.getElementById('lightboxMeta').innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span style="font-size:0.95rem;">Category: <strong style="color:var(--accent-blue);">${product.categoryName}</strong></span>
                    <span class="price-sale" style="font-size:1.25rem; font-weight:800;">$${product.currentPrice} ${product.msrp > product.currentPrice ? `<span class="price-original" style="font-size:0.9rem; font-weight:400; text-decoration:line-through; color:var(--text-muted);">$${product.msrp}</span>` : ''}</span>
                </div>
                <div style="color:var(--text-muted); font-size:0.88rem; margin-bottom:10px;">
                    Weight: <strong>${product.weightDisplay}</strong> • Rating: ⭐ <strong>${product.rating}</strong> (${product.reviewCount} reviews) • Value Score: <strong style="color:var(--accent-green-light);">${product.valueRating}/10</strong>
                </div>
                <div style="font-style:italic; color:var(--accent-blue); background:rgba(56, 189, 248, 0.08); padding:10px 14px; border-radius:8px; border-left:4px solid var(--accent-blue); font-size:0.92rem; text-align:left;">
                    "${product.verdict}"
                </div>
            `;

            const modal = document.getElementById('imageLightboxModal');
            modal.style.display = 'flex';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeImageLightbox(evt) {
            if (!evt || evt.target.id === 'imageLightboxModal' || evt.target.classList.contains('modal-close-btn')) {
                const modal = document.getElementById('imageLightboxModal');
                modal.style.display = 'none';
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
"""

old_func_pattern = r'/\*\*\s*\*\s*Product Image URL Resolver with Category Dynamic SVG Fallbacks\s*\*/\s*function getProductImageUrl\(product\) \{[\s\S]*?return `data:image/svg\+xml;utf8,\$\{encodeURIComponent\(svgContent\)\}`;[\s\S]*?\}'
if 'CATEGORY_CDN_FALLBACKS' not in content:
    content = re.sub(old_func_pattern, new_js_code.strip(), content)

old_table_img = '<img src="${getProductImageUrl(p)}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;" loading="lazy">'
new_table_img = '<img src="${getProductImageUrl(p)}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; cursor:pointer;" loading="lazy" onerror="handleImageError(this, \'${p.category}\')" onclick="openImageLightbox(\'${p.id}\')" title="Click to enlarge product image">'
content = content.replace(old_table_img, new_table_img)

old_card_img = '<img src="${getProductImageUrl(p)}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;" loading="lazy">'
new_card_img = '<img src="${getProductImageUrl(p)}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; cursor:pointer;" loading="lazy" onerror="handleImageError(this, \'${p.category}\')" onclick="openImageLightbox(\'${p.id}\')" title="Click to enlarge product image">'
content = content.replace(old_card_img, new_card_img)

old_modal_img = '<img src="${getProductImageUrl(item)}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;" loading="lazy">'
new_modal_img = '<img src="${getProductImageUrl(item)}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover; cursor:pointer;" loading="lazy" onerror="handleImageError(this, \'${item.category}\')" onclick="openImageLightbox(\'${item.id}\')" title="Click to enlarge product image">'
content = content.replace(old_modal_img, new_modal_img)

old_key_nav = """        function setupKeyboardNav() {
            // Close modal on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeCompareModal();
                }
            });"""

new_key_nav = """        function setupKeyboardNav() {
            // Close modal on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeCompareModal();
                    closeImageLightbox();
                }
            });"""

content = content.replace(old_key_nav, new_key_nav)

lightbox_modal_html = """
    <!-- Product Image Lightbox Modal -->
    <div id="imageLightboxModal" class="modal-backdrop" onclick="closeImageLightbox(event)" style="display:none; align-items:center; justify-content:center;">
        <div class="modal-content" style="max-width: 650px; text-align: center; padding: 24px; position:relative; background: var(--bg-card); border: 1px solid var(--card-border); border-radius: 16px; box-shadow: var(--shadow-deep); color: var(--text-primary);" onclick="event.stopPropagation()">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <h3 id="lightboxTitle" style="color:var(--text-primary); font-size:1.25rem; font-weight:700; margin:0;">Product Image Preview</h3>
                <button onclick="closeImageLightbox()" class="modal-close-btn" aria-label="Close image preview">&times;</button>
            </div>
            <div style="width:100%; height:380px; display:flex; align-items:center; justify-content:center; overflow:hidden; border-radius:12px; border:1px solid var(--card-border); background:#0f172a; margin-bottom:16px;">
                <img id="lightboxImg" src="" alt="" style="max-width:100%; max-height:100%; object-fit:contain;">
            </div>
            <div id="lightboxMeta" style="color:var(--text-secondary); font-size:0.9rem; text-align:left; line-height:1.5;"></div>
        </div>
    </div>
"""

if 'id="imageLightboxModal"' not in content:
    content = content.replace('</body>', lightbox_modal_html.strip() + '\n</body>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESSFULLY RE-SAVED gemini-code-1784928132429.html!")
