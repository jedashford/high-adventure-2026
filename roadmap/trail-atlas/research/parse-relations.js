// Parse OSM relations (multipolygon lakes) to get Alice / Toxaway / Farley etc.
const fs = require('fs');
const xml = fs.readFileSync(__dirname + '/osm-map-export.xml', 'utf8');

// node coords
const nodeCoord = new Map();
let m;
const allNodeRe = /<node id="(\d+)"[^>]*? lat="(-?[\d.]+)" lon="(-?[\d.]+)"/g;
while ((m = allNodeRe.exec(xml))) nodeCoord.set(m[1], [Number(m[2]), Number(m[3])]);

// way -> coords
const wayCoords = new Map();
for (const block of xml.split('<way ').slice(1)) {
  const body = block.slice(0, block.indexOf('</way>'));
  const id = body.match(/^id="(\d+)"/)?.[1];
  const refs = [];
  const ndRe = /<nd ref="(\d+)"\/>/g;
  let n;
  while ((n = ndRe.exec(body))) refs.push(n[1]);
  wayCoords.set(id, refs.map((r) => nodeCoord.get(r)).filter(Boolean));
}

// relations with natural=water and a name
const out = [];
for (const block of xml.split('<relation ').slice(1)) {
  const body = block.slice(0, block.indexOf('</relation>'));
  const tags = {};
  const tagRe = /<tag k="([^"]+)" v="([^"]*)"\/>/g;
  let t;
  while ((t = tagRe.exec(body))) tags[t[1]] = t[2];
  if (tags.natural !== 'water' || !tags.name) continue;
  const memRe = /<member type="way" ref="(\d+)"/g;
  const pts = [];
  let mm;
  while ((mm = memRe.exec(body))) {
    const c = wayCoords.get(mm[1]);
    if (c) pts.push(...c);
  }
  if (!pts.length) continue;
  const lats = pts.map((p) => p[0]), lngs = pts.map((p) => p[1]);
  out.push({
    name: tags.name,
    lat: lats.reduce((a, b) => a + b) / lats.length,
    lng: lngs.reduce((a, b) => a + b) / lngs.length,
    bbox: [Math.min(...lats), Math.min(...lngs), Math.max(...lats), Math.max(...lngs)],
  });
}
for (const l of out.sort((a, b) => a.name.localeCompare(b.name)))
  console.log(
    `${l.name} | centroid ${l.lat.toFixed(4)},${l.lng.toFixed(4)} | bbox ${l.bbox.map((x) => x.toFixed(4)).join(' ')}`
  );
fs.writeFileSync(__dirname + '/relation-lakes.json', JSON.stringify(out, null, 1));
