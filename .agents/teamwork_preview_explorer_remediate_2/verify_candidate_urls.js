const { chromium } = require('playwright');
const fs = require('fs');

const candidateProducts = [
  // Tents
  { id: 'tent-rei-halfdome', name: 'REI Co-op Half Dome SL 3+', category: 'tents', url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80' },
  { id: 'tent-ba-copperspur', name: 'Big Agnes Copper Spur HV UL3', category: 'tents', url: 'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?auto=format&fit=crop&w=1200&q=80' },
  { id: 'tent-marmot-tungsten', name: 'Marmot Tungsten 3P', category: 'tents', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80' },
  { id: 'tent-nemo-aurora', name: 'NEMO Aurora 3P', category: 'tents', url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80' },
  { id: 'tent-durston-xmid', name: 'Durston X-Mid 2', category: 'tents', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' },
  { id: 'tent-naturehike-cloudup', name: 'Naturehike Cloud-Up 3', category: 'tents', url: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80' },
  { id: 'tent-ba-craglake', name: 'Big Agnes Crag Lake SL3 (UL3)', category: 'tents', url: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?auto=format&fit=crop&w=1200&q=80' },

  // Sleeping Bags
  { id: 'bag-kelty-cosmic-down-20', name: 'Kelty Cosmic Down 20', category: 'sleeping_bags', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80' },
  { id: 'bag-nemo-disco-20', name: 'NEMO Disco Endless Promise 20 Down', category: 'sleeping_bags', url: 'https://images.unsplash.com/photo-1541004995602-b3e898709909?auto=format&fit=crop&w=1200&q=80' },
  { id: 'bag-sts-spark-20', name: 'Sea to Summit Spark 20 Down', category: 'sleeping_bags', url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80' },
  { id: 'bag-rei-magma-15', name: 'REI Co-op Magma 15 Down', category: 'sleeping_bags', url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80' },

  // Sleeping Pads
  { id: 'pad-therm-zlite-sol', name: 'Therm-a-Rest Z Lite Sol Foam Pad', category: 'sleeping_pads', url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80' },
  { id: 'pad-therm-neoair-xlite', name: 'Therm-a-Rest NeoAir XLite NXT', category: 'sleeping_pads', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' },
  { id: 'pad-rei-helix', name: 'REI Co-op Helix Insulated Air Pad', category: 'sleeping_pads', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80' },
  { id: 'pad-nemo-switchback', name: 'NEMO Switchback Foam Pad', category: 'sleeping_pads', url: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?auto=format&fit=crop&w=1200&q=80' },

  // Backpacks
  { id: 'pack-osprey-atmos-65', name: 'Osprey Atmos AG 65', category: 'backpacks', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80' },
  { id: 'pack-osprey-ace-50', name: 'Osprey Ace 50 Youth Pack', category: 'backpacks', url: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=1200&q=80' },
  { id: 'pack-granite-crown3-60', name: 'Granite Gear Crown3 60', category: 'backpacks', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80' },
  { id: 'pack-rei-flash-55', name: 'REI Co-op Flash 55', category: 'backpacks', url: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80' },

  // Stoves / Cookware / Filters
  { id: 'stove-msr-pocketrocket-2', name: 'MSR PocketRocket 2 Stove', category: 'stoves', url: 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80' },
  { id: 'stove-jetboil-flash', name: 'Jetboil Flash Cooking System', category: 'stoves', url: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80' },
  { id: 'pot-toaks-750ml', name: 'TOAKS Titanium 750ml Pot', category: 'stoves', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80' },
  { id: 'filter-sawyer-squeeze', name: 'Sawyer Squeeze Water Filter System', category: 'stoves', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },

  // Electronics
  { id: 'elec-garmin-inreach-mini2', name: 'Garmin inReach Mini 2 Satellite Communicator', category: 'electronics', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80' },
  { id: 'elec-nitecore-nb10000', name: 'Nitecore NB10000 Gen 3 Power Bank', category: 'electronics', url: 'https://images.unsplash.com/photo-1609592424074-266100911ef6?auto=format&fit=crop&w=1200&q=80' },
  { id: 'elec-garmin-etrex-22x', name: 'Garmin eTrex 22x Handheld GPS', category: 'electronics', url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80' },
  { id: 'elec-anker-325-20k', name: 'Anker 325 Power Bank 20,000mAh', category: 'electronics', url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80' },

  // Apparel
  { id: 'apparel-patagonia-torrentshell', name: 'Patagonia Torrentshell 3L Rain Jacket', category: 'apparel', url: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=80' },
  { id: 'apparel-mh-ghost-whisperer', name: 'Mountain Hardwear Ghost Whisperer/2 Down Hoody', category: 'apparel', url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80' },
  { id: 'apparel-rei-rainier', name: 'REI Co-op Rainier Rain Jacket', category: 'apparel', url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80' },
  { id: 'apparel-smartwool-merino-200', name: 'Smartwool Classic Thermal Merino Base Layer Crew', category: 'apparel', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80' },

  // Poles
  { id: 'poles-durston-iceline', name: 'Durston Iceline Carbon Trekking Poles', category: 'poles', url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80' },
  { id: 'poles-bd-alpine-cork', name: 'Black Diamond Alpine Carbon Cork Poles', category: 'poles', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80' },
  { id: 'poles-cascade-ultralight', name: 'Cascade Mountain Tech Carbon Ultralight', category: 'poles', url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80' },
  { id: 'poles-leki-ultratrail-fx', name: 'Leki Ultra Trail FX.One Folding Carbon Poles', category: 'poles', url: 'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&w=1200&q=80' },

  // Chairs
  { id: 'chair-helinox-zero', name: 'Helinox Chair Zero', category: 'chairs', url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80' },
  { id: 'chair-ba-skyline-ul', name: 'Big Agnes Skyline UL Chair', category: 'chairs', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80' },
  { id: 'chair-nemo-moonlite', name: 'NEMO Moonlite Reclining Chair', category: 'chairs', url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80' },
  { id: 'chair-rei-flexlite-air', name: 'REI Co-op Flexlite Air Chair', category: 'chairs', url: 'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?auto=format&fit=crop&w=1200&q=80' },

  // Lighting
  { id: 'light-nitecore-ut27', name: 'Nitecore UT27 800 Lumen Headlamp', category: 'lighting', url: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80' },
  { id: 'light-nitecore-nu25-ul', name: 'Nitecore NU25 UL Headlamp', category: 'lighting', url: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80' },
  { id: 'light-petzl-actik-core', name: 'Petzl Actik Core Headlamp w/ Core Battery', category: 'lighting', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80' },
  { id: 'light-bd-spot-400-r', name: 'Black Diamond Spot 400-R Headlamp', category: 'lighting', url: 'https://images.unsplash.com/photo-1525811902-f2342640856e?auto=format&fit=crop&w=1200&q=80' },
  { id: 'light-biolite-325', name: 'Biolite HeadLamp 325', category: 'lighting', url: 'https://images.unsplash.com/photo-1541004995602-b3e898709909?auto=format&fit=crop&w=1200&q=80' }
];

async function verifyAllCandidates() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const testHtml = `<!DOCTYPE html>
  <html>
  <head><title>Candidate Image Verification</title></head>
  <body>
    ${candidateProducts.map((p, idx) => `
      <div id="item-${idx}">
        <h4>${idx + 1}. [${p.category}] ${p.id} - ${p.name}</h4>
        <img id="img-${idx}" src="${p.url}" style="max-width:100px; max-height:100px;" />
      </div>
    `).join('\n')}
  </body>
  </html>`;

  await page.setContent(testHtml, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const results = await page.evaluate((prods) => {
    return prods.map((p, idx) => {
      const img = document.getElementById(`img-${idx}`);
      return {
        ...p,
        naturalWidth: img ? img.naturalWidth : 0,
        naturalHeight: img ? img.naturalHeight : 0,
        complete: img ? img.complete : false,
        loaded: img && img.naturalWidth > 0
      };
    });
  }, candidateProducts);

  await browser.close();

  let pass = 0;
  let fail = 0;

  console.log('\n=================================================');
  console.log('    UNSPLASH CANDIDATE URL VERIFICATION REPORT   ');
  console.log('=================================================\n');

  results.forEach((r, idx) => {
    if (r.loaded) {
      pass++;
      console.log(`✅ [${idx + 1}/${results.length}] ${r.id} (${r.naturalWidth}x${r.naturalHeight}): ${r.url}`);
    } else {
      fail++;
      console.log(`❌ [${idx + 1}/${results.length}] ${r.id} FAILED (0x0): ${r.url}`);
    }
  });

  console.log('\n=================================================');
  console.log(`TOTAL CANDIDATE PRODUCTS: ${results.length}`);
  console.log(`PASSED (100% hotlink success): ${pass}`);
  console.log(`FAILED: ${fail}`);
  console.log('=================================================\n');

  fs.writeFileSync('/Users/jed/jedstuff/high-adventure/.agents/teamwork_preview_explorer_remediate_2/verified_candidates.json', JSON.stringify(results, null, 2));
}

verifyAllCandidates().catch(err => {
  console.error(err);
  process.exit(1);
});
