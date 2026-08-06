// Densify main-loop elevation to 0.05-mi spacing (USGS EPQS) for grade coloring.
const fs = require('fs');
const legs = JSON.parse(fs.readFileSync(__dirname + '/route.json', 'utf8'));
const R = 3958.8, toR = (d) => (d * Math.PI) / 180;
const hav = (a, b) => 2 * R * Math.asin(Math.sqrt(
  Math.sin(toR(b[0]-a[0])/2)**2 + Math.cos(toR(a[0]))*Math.cos(toR(b[0]))*Math.sin(toR(b[1]-a[1])/2)**2));

function resample(line, step) {
  const out = [{ mi: 0, lat: line[0][0], lng: line[0][1] }];
  let acc = 0, total = 0;
  for (let i = 1; i < line.length; i++) {
    const seg = hav(line[i-1], line[i]);
    let d = seg;
    while (acc + d >= step) {
      const need = step - acc;
      const f = (seg - d + need) / seg;
      out.push({ mi: total + (seg - d + need),
        lat: line[i-1][0] + (line[i][0]-line[i-1][0])*f,
        lng: line[i-1][1] + (line[i][1]-line[i-1][1])*f });
      d -= need; acc = 0;
    }
    acc += d; total += seg;
  }
  out.push({ mi: total, lat: line[line.length-1][0], lng: line[line.length-1][1] });
  return out;
}

const mainLine = [...legs.leg1, ...legs.leg2a.slice(1), ...legs.leg2b.slice(1), ...legs.leg3a.slice(1), ...legs.leg3b.slice(1)];
const pts = resample(mainLine, 0.05);
console.log('sampling', pts.length, 'points at 0.05 mi');

async function epqs(p, tries = 3) {
  for (let t = 0; t < tries; t++) {
    try {
      const ctl = new AbortController();
      const to = setTimeout(() => ctl.abort(), 15000);
      const r = await fetch(`https://epqs.nationalmap.gov/v1/json?x=${p.lng}&y=${p.lat}&wkid=4326&units=Feet`, { signal: ctl.signal });
      clearTimeout(to);
      const v = Number((await r.json()).value);
      if (Number.isFinite(v) && v > 3000 && v < 12000) return v;
      throw 0;
    } catch (e) { if (t === tries - 1) return null; await new Promise(res => setTimeout(res, 700 * (t+1))); }
  }
}
(async () => {
  let i = 0, failed = 0, done = 0;
  await Promise.all(Array.from({ length: 10 }, async () => {
    while (i < pts.length) {
      const idx = i++;
      const v = await epqs(pts[idx]);
      if (v == null) failed++; else pts[idx].ele = v;
      if (++done % 100 === 0) console.log(done + '/' + pts.length, failed + ' failed');
    }
  }));
  console.log('done,', failed, 'failed');
  // fill gaps by interpolation
  for (let k = 0; k < pts.length; k++) if (pts[k].ele == null) {
    let a = k-1; while (a >= 0 && pts[a].ele == null) a--;
    let b = k+1; while (b < pts.length && pts[b].ele == null) b++;
    pts[k].ele = (pts[a]?.ele ?? pts[b].ele + 0) && ((pts[a].ele + pts[b].ele) / 2);
  }
  fs.writeFileSync(__dirname + '/grade-samples.json', JSON.stringify(pts));
  // grade distribution (per-hop, then 3-hop smoothed)
  const hops = [];
  for (let k = 1; k < pts.length; k++) {
    const run = (pts[k].mi - pts[k-1].mi) * 5280;
    hops.push({ mi: pts[k-1].mi, g: (pts[k].ele - pts[k-1].ele) / run * 100 });
  }
  const sm = hops.map((h, k) => {
    const w = hops.slice(Math.max(0, k-1), k+2);
    return { mi: h.mi, g: w.reduce((s,x) => s+x.g, 0) / w.length };
  });
  const dist = {};
  for (const h of sm) {
    const a = Math.abs(h.g);
    const b = a < 2 ? 'flat<2' : a < 5 ? '2-5' : a < 10 ? '5-10' : a < 15 ? '10-15' : a < 20 ? '15-20' : '>=20';
    const key = (h.g >= 2 ? 'up ' : h.g <= -2 ? 'down ' : '') + b;
    dist[key] = (dist[key] || 0) + 1;
  }
  console.log('smoothed grade distribution (0.15-mi window):', JSON.stringify(dist, null, 1));
  console.log('max up:', Math.max(...sm.map(h => h.g)).toFixed(1), '% · max down:', Math.min(...sm.map(h => h.g)).toFixed(1), '%');
})();
