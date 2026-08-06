// Emit compact trail-data.json for embedding in trail.html
const fs = require('fs');
const legs = JSON.parse(fs.readFileSync(__dirname + '/route.json', 'utf8'));
const prof = JSON.parse(fs.readFileSync(__dirname + '/elevation-fixed.json', 'utf8'));

const r5 = (x) => Math.round(x * 1e5) / 1e5;
const line = (l) => l.map((p) => [r5(p[0]), r5(p[1])]);

// simplify display polylines lightly (keep every point — sizes are fine, but round)
const data = {
  meta: {
    generated: '2026-08-06',
    geometry: 'OpenStreetMap (ODbL) trail ways, stitched; mileage = haversine arc length',
    elevation: 'USGS 3DEP via EPQS point service, sampled every 0.1 mi (0.08 spur), ft',
  },
  legs: {
    day1: line(legs.leg1),          // TH -> Alice -> Twin jct, 6.83 mi
    day2a: line(legs.leg2a),        // Twin jct -> Snowyside -> Toxaway NW, 4.08
    day2b: line(legs.leg2b),        // Toxaway NW -> NE shore (Edith jct), 1.43
    day3a: line(legs.leg3a),        // Edith jct -> Farley -> McDonald jct, 4.07
    day3b: line(legs.leg3b),        // cutoff (reversed): McDonald jct -> TH, 1.84
    spurEdith: line(legs.spurEdith),// Toxaway NE -> Edith Lake, 1.34 one-way
    // cut the pass spur at its 9,418 ft max (mi 2.30) + a bit of context
    spurPass: line(legs.spurPass.slice(0, 0)), // placeholder, replaced below
  },
  profile: {
    main: prof.main.map((p) => [Math.round(p.mi * 100) / 100, p.ele]),
    spurEdith: prof.spurEdith.map((p) => [Math.round(p.mi * 100) / 100, p.ele]),
    spurPass: prof.spurPass.filter((p) => p.mi <= 2.35).map((p) => [Math.round(p.mi * 100) / 100, p.ele]),
  },
};

// spurPass polyline: cut at cumulative 2.30 mi
const R = 3958.8, toR = (d) => (d * Math.PI) / 180;
const hav = (a, b) => {
  const s = Math.sin(toR(b[0] - a[0]) / 2) ** 2 + Math.cos(toR(a[0])) * Math.cos(toR(b[0])) * Math.sin(toR(b[1] - a[1]) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
};
let cum = 0;
const cut = [legs.spurPass[0]];
for (let i = 1; i < legs.spurPass.length; i++) {
  cum += hav(legs.spurPass[i - 1], legs.spurPass[i]);
  cut.push(legs.spurPass[i]);
  if (cum >= 2.30) break;
}
data.legs.spurPass = line(cut);

const bytes = JSON.stringify(data).length;
fs.writeFileSync(__dirname + '/trail-data.json', JSON.stringify(data));
console.log('trail-data.json:', (bytes / 1024).toFixed(0), 'KB');
console.log('spurPass cut at', cum.toFixed(2), 'mi,', cut.length, 'pts, ends', cut[cut.length - 1]);
