// Pull named point features (peaks, passes) and named lakes from the OSM export,
// then locate our loop's junctions along the stitched chains and measure each leg.
const fs = require('fs');
const xml = fs.readFileSync(__dirname + '/osm-map-export.xml', 'utf8');
const chains = JSON.parse(fs.readFileSync(__dirname + '/chains.json', 'utf8'));

const R = 3958.8;
const toR = (d) => (d * Math.PI) / 180;
function hav(a, b) {
  const dLat = toR(b[0] - a[0]), dLon = toR(b[1] - a[1]);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a[0])) * Math.cos(toR(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// ---- named nodes (peaks, saddles, springs) ----
const namedNodes = [];
const nodeBlockRe = /<node id="(\d+)"[^>]*? lat="(-?[\d.]+)" lon="(-?[\d.]+)"[^>]*>([\s\S]*?)<\/node>/g;
let m;
const nodeCoord = new Map();
// also index ALL node coords for lake centroid math
const allNodeRe = /<node id="(\d+)"[^>]*? lat="(-?[\d.]+)" lon="(-?[\d.]+)"/g;
while ((m = allNodeRe.exec(xml))) nodeCoord.set(m[1], [Number(m[2]), Number(m[3])]);
while ((m = nodeBlockRe.exec(xml))) {
  const tags = {};
  const tagRe = /<tag k="([^"]+)" v="([^"]*)"\/>/g;
  let t;
  while ((t = tagRe.exec(m[4]))) tags[t[1]] = t[2];
  if (tags.name && (tags.natural || tags.mountain_pass || tags.tourism || tags.amenity))
    namedNodes.push({ lat: Number(m[2]), lng: Number(m[3]), name: tags.name, tags });
}
const interesting = namedNodes.filter((n) =>
  /peak|saddle|spring|volcano/.test(n.tags.natural || '') || n.tags.mountain_pass === 'yes'
);
console.log('== named point features ==');
for (const n of interesting.sort((a, b) => a.name.localeCompare(b.name)))
  console.log(
    `${n.tags.natural || 'pass'} | ${n.name} | ${n.lat.toFixed(4)},${n.lng.toFixed(4)} | ele=${n.tags.ele || '?'}`
  );

// ---- named lakes (way polygons with natural=water) ----
console.log('\n== named lakes ==');
const lakes = [];
const wayBlocks = xml.split('<way ').slice(1);
for (const block of wayBlocks) {
  const body = block.slice(0, block.indexOf('</way>'));
  const tags = {};
  const tagRe = /<tag k="([^"]+)" v="([^"]*)"\/>/g;
  let t;
  while ((t = tagRe.exec(body))) tags[t[1]] = t[2];
  if (tags.natural !== 'water' || !tags.name) continue;
  const refs = [];
  const ndRe = /<nd ref="(\d+)"\/>/g;
  let n;
  while ((n = ndRe.exec(body))) refs.push(n[1]);
  const pts = refs.map((r) => nodeCoord.get(r)).filter(Boolean);
  if (!pts.length) continue;
  const lat = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const lng = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  lakes.push({ name: tags.name, lat, lng, ele: tags.ele });
}
for (const l of lakes.sort((a, b) => a.name.localeCompare(b.name)))
  console.log(`${l.name} | ${l.lat.toFixed(4)},${l.lng.toFixed(4)} | ele=${l.ele || '?'}`);
fs.writeFileSync(__dirname + '/features.json', JSON.stringify({ points: interesting, lakes }, null, 1));

// ---- locate key points along chains ----
function along(chain, target) {
  // returns {idx, distAlongMi, offMi} of nearest vertex to target
  let best = { idx: -1, offMi: 1e9 };
  for (let i = 0; i < chain.length; i++) {
    const d = hav(chain[i], target);
    if (d < best.offMi) best = { idx: i, offMi: d };
  }
  let dist = 0;
  for (let i = 1; i <= best.idx; i++) dist += hav(chain[i - 1], chain[i]);
  return { ...best, distAlongMi: dist };
}
const find = (name) => {
  const p = interesting.find((n) => n.name === name) || lakes.find((l) => l.name === name);
  return p ? [p.lat, p.lng] : null;
};

const pc = chains['Pettit Creek Trail'][0];
const ar = chains['Alice Lake-Redfish Lake Trail'][0];
const yb = chains['Yellowbelly Trail'][0];
const el = chains['Edith Lake Trail'][0];
const co = chains['Pettit Lake Cutoff'][0];

console.log('\n== junction / waypoint positions along chains ==');
const report = (label, chainName, chain, target) => {
  if (!target) return console.log(`${label}: NOT FOUND in OSM data`);
  const r = along(chain, target);
  console.log(
    `${label} on [${chainName}]: mile ${r.distAlongMi.toFixed(2)} (offset ${(r.offMi * 5280).toFixed(0)} ft) at ${chain[r.idx][0].toFixed(4)},${chain[r.idx][1].toFixed(4)}`
  );
};
report('Alice Lake', 'Pettit Creek', pc, find('Alice Lake'));
report('Twin Lakes', 'Pettit Creek', pc, find('Twin Lakes'));
report('Twin Lakes', 'Alice-Redfish', ar, find('Twin Lakes'));
report('Snowyside Pass', 'Alice-Redfish', ar, find('Snowyside Pass'));
report('Toxaway Lake', 'Alice-Redfish', ar, find('Toxaway Lake'));
report('Sand Mountain Pass', 'Alice-Redfish', ar, find('Sand Mountain Pass'));
report('YB-trail start A', 'Alice-Redfish', ar, yb[0]);
report('Toxaway Lake', 'Yellowbelly', yb, find('Toxaway Lake'));
report('Edith trail jct (el A)', 'Yellowbelly', yb, el[0]);
report('Edith Lake', 'Edith trail', el, find('Edith Lake'));
report('Farley Lake', 'Yellowbelly', yb, find('Farley Lake'));
report('McDonald Lake', 'Yellowbelly', yb, find('McDonald Lake'));
report('Cutoff north end B', 'Yellowbelly', yb, co[co.length - 1]);
report('Cutoff north end B', 'Yellow Belly Trail', chains['Yellow Belly Trail'][0], co[co.length - 1]);
report('Yellow Belly Lake', 'Yellow Belly Trail', chains['Yellow Belly Trail'][0], find('Yellow Belly Lake'));
report('TH end of cutoff', 'Pettit Creek', pc, co[0]);
