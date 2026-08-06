// Rebuild correct arc-length mile markers for the sampled profile (elevations already fetched).
// The resample points are deterministic, so regenerate them with TRUE cumulative miles and
// join the saved elevations by index.
const fs = require('fs');
const legs = JSON.parse(fs.readFileSync(__dirname + '/route.json', 'utf8'));
const saved = JSON.parse(fs.readFileSync(__dirname + '/elevation.json', 'utf8'));

const R = 3958.8;
const toR = (d) => (d * Math.PI) / 180;
function hav(a, b) {
  const dLat = toR(b[0] - a[0]), dLon = toR(b[1] - a[1]);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a[0])) * Math.cos(toR(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
function resampleTrue(line, step) {
  const out = [{ mi: 0, lat: line[0][0], lng: line[0][1] }];
  let acc = 0, total = 0;
  for (let i = 1; i < line.length; i++) {
    const seg = hav(line[i - 1], line[i]);
    let d = seg;
    while (acc + d >= step) {
      const need = step - acc;
      const f = (seg - d + need) / seg;
      out.push({
        mi: total + (seg - d + need),
        lat: line[i - 1][0] + (line[i][0] - line[i - 1][0]) * f,
        lng: line[i - 1][1] + (line[i][1] - line[i - 1][1]) * f,
      });
      d -= need;
      acc = 0;
    }
    acc += d;
    total += seg;
  }
  out.push({ mi: total, lat: line[line.length - 1][0], lng: line[line.length - 1][1] });
  return out; // NOTE: mi is true arc length; no chord recompute
}

const mainLine = [...legs.leg1, ...legs.leg2a.slice(1), ...legs.leg2b.slice(1), ...legs.leg3a.slice(1), ...legs.leg3b.slice(1)];
const main = resampleTrue(mainLine, 0.1);
const spurEdith = resampleTrue(legs.spurEdith, 0.08);
const spurPass = resampleTrue(legs.spurPass, 0.1);
if (main.length !== saved.main.length || spurEdith.length !== saved.spurEdith.length || spurPass.length !== saved.spurPass.length)
  throw new Error(`count mismatch: ${main.length}/${saved.main.length} ${spurEdith.length}/${saved.spurEdith.length} ${spurPass.length}/${saved.spurPass.length}`);
main.forEach((p, i) => { p.ele = saved.main[i].ele; if (Math.abs(p.lat - saved.main[i].lat) > 1e-6) throw new Error('pt drift @' + i); });
spurEdith.forEach((p, i) => (p.ele = saved.spurEdith[i].ele));
spurPass.forEach((p, i) => (p.ele = saved.spurPass[i].ele));

function gain(points) {
  const sm = points.map((p, i) => {
    const a = points[Math.max(0, i - 1)].ele, b = p.ele, c = points[Math.min(points.length - 1, i + 1)].ele;
    return (a + b + c) / 3;
  });
  let g = 0;
  for (let i = 1; i < sm.length; i++) if (sm[i] > sm[i - 1]) g += sm[i] - sm[i - 1];
  return Math.round(g);
}
const at = (mi) => main.reduce((b, p) => (Math.abs(p.mi - mi) < Math.abs(b.mi - mi) ? p : b));
const maxIn = (a, b) => main.filter((p) => p.mi >= a && p.mi <= b).reduce((x, y) => (y.ele > x.ele ? y : x));

console.log('main total mi:', main[main.length - 1].mi.toFixed(2));
console.log('TH:', main[0].ele);
console.log('Alice (mi 5.96):', at(5.96).ele);
console.log('Twin jct (mi 6.83):', at(6.83).ele);
const snowy = maxIn(6.83, 10.91);
console.log('Snowyside Pass:', snowy.ele, 'at mi', snowy.mi.toFixed(2), snowy.lat.toFixed(4), snowy.lng.toFixed(4));
console.log('Toxaway NW jct (mi 10.91):', at(10.91).ele);
console.log('Toxaway NE / Edith jct (mi 12.34):', at(12.34).ele);
console.log('Farley (mi 14.4):', at(14.4).ele);
console.log('McDonald jct (mi 16.41):', at(16.41).ele);
console.log('cutoff max:', maxIn(16.41, 99).ele);
console.log('end:', main[main.length - 1].ele, 'at mi', main[main.length - 1].mi.toFixed(2));
console.log('MAIN total gain:', gain(main), 'ft');
console.log('day1 gain (0-6.83):', gain(main.filter((p) => p.mi <= 6.83)));
console.log('day2 gain (6.83-12.34):', gain(main.filter((p) => p.mi >= 6.83 && p.mi <= 12.34)));
console.log('day3 gain (12.34-end):', gain(main.filter((p) => p.mi >= 12.34)));
console.log('Edith spur: start', spurEdith[0].ele, 'max', Math.max(...spurEdith.map((p) => p.ele)), 'end(lake)', spurEdith[spurEdith.length - 1].ele, 'one-way mi', spurEdith[spurEdith.length - 1].mi.toFixed(2), 'gain', gain(spurEdith));
const passMax = spurPass.reduce((a, b) => (b.ele > a.ele ? b : a));
console.log('Pass spur MAX:', passMax.ele, 'at mi', passMax.mi.toFixed(2), passMax.lat.toFixed(4), passMax.lng.toFixed(4));
spurPass.forEach((p) => { if (p.mi < passMax.mi + 0.4 && p.mi > passMax.mi - 0.4) console.log('  near-max:', p.mi.toFixed(2), p.ele, p.lat.toFixed(4), p.lng.toFixed(4)); });

fs.writeFileSync(__dirname + '/elevation-fixed.json', JSON.stringify({ main, spurEdith, spurPass }));
console.log('wrote elevation-fixed.json');
