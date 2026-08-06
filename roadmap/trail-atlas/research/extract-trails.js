// Extract trail (and access-road) geometry from the OSM XML export.
// Regex-parse is fine here: OSM XML from cgimap is line-structured.
const fs = require('fs');
const xml = fs.readFileSync(__dirname + '/osm-map-export.xml', 'utf8');

// 1. All node coordinates
const nodes = new Map();
const nodeRe = /<node id="(\d+)"[^>]*? lat="(-?[\d.]+)" lon="(-?[\d.]+)"/g;
let m;
while ((m = nodeRe.exec(xml))) nodes.set(m[1], [Number(m[2]), Number(m[3])]);
console.log('nodes:', nodes.size);

// 2. Ways: split the doc on <way blocks
const ways = [];
const wayBlocks = xml.split('<way ').slice(1);
for (const block of wayBlocks) {
  const body = block.slice(0, block.indexOf('</way>'));
  const id = body.match(/^id="(\d+)"/)?.[1];
  const tags = {};
  const tagRe = /<tag k="([^"]+)" v="([^"]*)"\/>/g;
  let t;
  while ((t = tagRe.exec(body))) tags[t[1]] = t[2];
  if (!tags.highway) continue;
  const refs = [];
  const ndRe = /<nd ref="(\d+)"\/>/g;
  let n;
  while ((n = ndRe.exec(body))) refs.push(n[1]);
  const coords = refs.map((r) => nodes.get(r)).filter(Boolean);
  if (coords.length < 2) continue;
  ways.push({ id, tags, coords });
}
console.log('highway ways:', ways.length);

// 3. Report names so we can pick the loop's trails
const summary = {};
for (const w of ways) {
  const key = `${w.tags.highway} | ${w.tags.name || w.tags.ref || '(unnamed)'}`;
  if (!summary[key]) summary[key] = { ways: 0, pts: 0, ids: [] };
  summary[key].ways++;
  summary[key].pts += w.coords.length;
  summary[key].ids.push(w.id);
}
for (const [k, v] of Object.entries(summary).sort())
  console.log(`${k}  → ${v.ways} way(s), ${v.pts} pts, ids: ${v.ids.slice(0, 8).join(',')}`);

fs.writeFileSync(__dirname + '/trails-extracted.json', JSON.stringify(ways));
console.log('wrote trails-extracted.json');
