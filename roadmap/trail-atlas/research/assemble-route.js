// Assemble the loop's ordered legs from stitched chains + write route.json.
const fs = require('fs');
const chains = JSON.parse(fs.readFileSync(__dirname + '/chains.json', 'utf8'));

const R = 3958.8;
const toR = (d) => (d * Math.PI) / 180;
function hav(a, b) {
  const dLat = toR(b[0] - a[0]), dLon = toR(b[1] - a[1]);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a[0])) * Math.cos(toR(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
const miles = (c) => { let d = 0; for (let i = 1; i < c.length; i++) d += hav(c[i - 1], c[i]); return d; };
function nearestIdx(chain, target) {
  let bi = 0, bd = 1e9;
  chain.forEach((p, i) => { const d = hav(p, target); if (d < bd) { bd = d; bi = i; } });
  return { idx: bi, offMi: bd };
}

const pc = chains['Pettit Creek Trail'][0];               // TH -> Twin jct (6.83)
const ar = chains['Alice Lake-Redfish Lake Trail'][0];    // Twin jct -> ... -> north
const yb = chains['Yellowbelly Trail'][0];                // Toxaway NW -> McDonald jct (5.50)
const el = chains['Edith Lake Trail'][0];                 // Toxaway NE shore -> Edith (1.34)
const co = chains['Pettit Lake Cutoff'][0];               // near-TH -> McDonald jct (1.84)

// orientation checks
console.log('pc starts at TH?', pc[0]);                   // expect 43.9844,-114.8719
console.log('co starts near TH?', co[0], 'ends', co[co.length - 1]);

// key indices
const aliceC = [43.9389, -114.9439];
const alice = nearestIdx(pc, aliceC);
console.log('Alice nearest on pc: idx', alice.idx, 'mile', miles(pc.slice(0, alice.idx + 1)).toFixed(2), 'off', (alice.offMi * 5280).toFixed(0), 'ft');

const ybStartOnAr = nearestIdx(ar, yb[0]);
console.log('YB jct on ar: idx', ybStartOnAr.idx, 'mile', miles(ar.slice(0, ybStartOnAr.idx + 1)).toFixed(2));

const edithJctOnYb = nearestIdx(yb, el[0]);
console.log('Edith jct on yb: idx', edithJctOnYb.idx, 'mile', miles(yb.slice(0, edithJctOnYb.idx + 1)).toFixed(2));

const mushroom = nearestIdx(ar, [43.9896, -114.9641]);
console.log('Mushroom Lake vs ar: idx', mushroom.idx, 'mile', miles(ar.slice(0, mushroom.idx + 1)).toFixed(2), 'off', (mushroom.offMi).toFixed(2), 'mi');
const imogene = nearestIdx(ar, [43.9951, -114.9535]);
console.log('Imogene Lake vs ar: idx', imogene.idx, 'mile', miles(ar.slice(0, imogene.idx + 1)).toFixed(2), 'off', (imogene.offMi).toFixed(2), 'mi');

// ---- legs ----
// Day 1: TH -> Alice -> Twin jct  (pc entire)
const leg1 = pc;
// Day 2: Twin jct -> Snowyside -> Toxaway NW jct (ar 0..ybjct)  + yb 0..edithJct (to NE-shore camps)
const leg2a = ar.slice(0, ybStartOnAr.idx + 1);
const leg2b = yb.slice(0, edithJctOnYb.idx + 1);
// Day 3: yb edithJct..end  + cutoff reversed  (co runs near-TH -> McDonald jct, so reverse)
const leg3a = yb.slice(edithJctOnYb.idx);
const leg3b = [...co].reverse();
// Optional spurs
const spurEdith = el;                                     // Toxaway NE shore -> Edith Lake
const spurPass = ar.slice(ybStartOnAr.idx, mushroom.idx + 1); // Toxaway NW jct -> toward Sand Mtn Pass area

const legs = { leg1, leg2a, leg2b, leg3a, leg3b, spurEdith, spurPass };
for (const [k, v] of Object.entries(legs))
  console.log(k, ':', v.length, 'pts,', miles(v).toFixed(2), 'mi,', 'A', v[0].map(x=>x.toFixed(4)).join(','), 'B', v[v.length-1].map(x=>x.toFixed(4)).join(','));

console.log('\nMAIN LOOP TOTAL:', (miles(leg1) + miles(leg2a) + miles(leg2b) + miles(leg3a) + miles(leg3b)).toFixed(2), 'mi (TH back to cutoff/TH junction)');

fs.writeFileSync(__dirname + '/route.json', JSON.stringify(legs));
console.log('wrote route.json');
