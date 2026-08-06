// Stitch named OSM ways into continuous chains and report endpoints + mileage.
const fs = require('fs');
const ways = JSON.parse(fs.readFileSync(__dirname + '/trails-extracted.json', 'utf8'));

const NAMES = [
  'Pettit Creek Trail',
  'Pettit Creek Trail-High Water Route',
  'Alice Lake-Redfish Lake Trail',
  'Edith Lake Trail',
  'Yellowbelly Trail',
  'Yellow Belly Trail',
  'Pettit Lake Cutoff',
];

const R = 3958.8; // miles
function hav(a, b) {
  const toR = (d) => (d * Math.PI) / 180;
  const dLat = toR(b[0] - a[0]),
    dLon = toR(b[1] - a[1]);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toR(a[0])) * Math.cos(toR(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
function lineMiles(coords) {
  let d = 0;
  for (let i = 1; i < coords.length; i++) d += hav(coords[i - 1], coords[i]);
  return d;
}
const key = (c) => c[0].toFixed(5) + ',' + c[1].toFixed(5);

// stitch ways sharing endpoints into chains
function stitch(group) {
  const pool = group.map((w) => ({ id: w.id, coords: [...w.coords] }));
  const chains = [];
  while (pool.length) {
    let chain = pool.shift().coords;
    let grew = true;
    while (grew) {
      grew = false;
      for (let i = 0; i < pool.length; i++) {
        const c = pool[i].coords;
        if (key(chain[chain.length - 1]) === key(c[0])) chain = chain.concat(c.slice(1));
        else if (key(chain[chain.length - 1]) === key(c[c.length - 1]))
          chain = chain.concat([...c].reverse().slice(1));
        else if (key(chain[0]) === key(c[c.length - 1])) chain = c.slice(0, -1).concat(chain);
        else if (key(chain[0]) === key(c[0]))
          chain = [...c].reverse().slice(0, -1).concat(chain);
        else continue;
        pool.splice(i, 1);
        grew = true;
        break;
      }
    }
    chains.push(chain);
  }
  return chains;
}

const out = {};
for (const name of NAMES) {
  const group = ways.filter((w) => (w.tags.name || '') === name);
  if (!group.length) continue;
  const chains = stitch(group);
  out[name] = chains;
  console.log(`\n== ${name}: ${group.length} way(s) → ${chains.length} chain(s)`);
  chains.forEach((c, i) => {
    console.log(
      `  chain ${i}: ${c.length} pts, ${lineMiles(c).toFixed(2)} mi, ` +
        `A=[${c[0][0].toFixed(4)},${c[0][1].toFixed(4)}] B=[${c[c.length - 1][0].toFixed(4)},${c[c.length - 1][1].toFixed(4)}]`
    );
  });
}
fs.writeFileSync(__dirname + '/chains.json', JSON.stringify(out));
console.log('\nwrote chains.json');
