// Compute smoothed grade along the loop, bucket it, and paint the buckets back
// onto the FULL-RESOLUTION polyline (so hairpins stay crisp). Regenerates trail-data.js.
const fs = require('fs');
const legs = JSON.parse(fs.readFileSync(__dirname + '/route.json', 'utf8'));
const samples = JSON.parse(fs.readFileSync(__dirname + '/grade-samples.json', 'utf8')); // 0.05-mi pts
const existing = JSON.parse(fs.readFileSync(__dirname + '/trail-data.json', 'utf8'));

const R = 3958.8, toR = (d) => (d * Math.PI) / 180;
const hav = (a, b) => 2 * R * Math.asin(Math.sqrt(
  Math.sin(toR(b[0]-a[0])/2)**2 + Math.cos(toR(a[0]))*Math.cos(toR(b[0]))*Math.sin(toR(b[1]-a[1])/2)**2));
const r5 = (x) => Math.round(x * 1e5) / 1e5;

// per-hop grade (%), then centered 3-hop smoothing (~0.15-mi window)
const hops = [];
for (let k = 1; k < samples.length; k++) {
  const run = (samples[k].mi - samples[k-1].mi) * 5280;
  hops.push({ m0: samples[k-1].mi, m1: samples[k].mi, g: (samples[k].ele - samples[k-1].ele) / run * 100 });
}
const sm = hops.map((h, k) => {
  const w = hops.slice(Math.max(0, k-1), k+2);
  return { ...h, g: w.reduce((s,x) => s + x.g, 0) / w.length };
});

// buckets fitted to this trail's real distribution (smoothed max 12.5% up / 16.2% down):
// ±2 flat · 2-5 gentle · 5-8 moderate · 8-12 steep · >=12 very steep
function bucket(g) {
  const s = Math.sign(g), a = Math.abs(g);
  if (a < 2) return 0;
  const k = a < 5 ? 1 : a < 8 ? 2 : a < 12 ? 3 : 4;
  return s * k; // -4..4
}
const dist = {};
sm.forEach(h => { const b = bucket(h.g); dist[b] = (dist[b] || 0) + 1; });
console.log('bucket distribution (hops of 0.05 mi):', JSON.stringify(dist));
console.log('max up', Math.max(...sm.map(h=>h.g)).toFixed(1), '% · max down', Math.min(...sm.map(h=>h.g)).toFixed(1), '%');

// full-res line + cumulative miles
const mainLine = [...legs.leg1, ...legs.leg2a.slice(1), ...legs.leg2b.slice(1), ...legs.leg3a.slice(1), ...legs.leg3b.slice(1)];
const cum = [0];
for (let i = 1; i < mainLine.length; i++) cum.push(cum[i-1] + hav(mainLine[i-1], mainLine[i]));

const bucketAtMile = (mi) => {
  let lo = 0, hi = sm.length - 1;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (sm[mid].m1 < mi) lo = mid + 1; else hi = mid; }
  return bucket(sm[lo].g);
};
const gradeAtMile = (mi) => {
  let lo = 0, hi = sm.length - 1;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (sm[mid].m1 < mi) lo = mid + 1; else hi = mid; }
  return sm[lo].g;
};

// split full-res line into constant-bucket segments
const segs = [];
let curB = bucketAtMile(0.001), start = 0;
for (let i = 1; i < mainLine.length; i++) {
  const b = bucketAtMile(cum[i]);
  if (b !== curB || i === mainLine.length - 1) {
    const end = i === mainLine.length - 1 ? i : i; // include boundary vertex in both segs for continuity
    segs.push({ b: curB, m0: Math.round(cum[start]*100)/100, m1: Math.round(cum[end]*100)/100,
                pts: mainLine.slice(start, end + 1).map(p => [r5(p[0]), r5(p[1])]) });
    start = i; curB = b;
  }
}
console.log('grade segments:', segs.length, '— avg', (cum[cum.length-1]/segs.length).toFixed(2), 'mi each');

// ribbon for the elevation chart: [mi, smoothed grade%] per hop
const ribbon = sm.map(h => [Math.round(h.m0*100)/100, Math.round(h.g*10)/10]);

existing.grade = { segs, ribbon,
  meta: 'grade % = rise/run between USGS 3DEP samples every 0.05 mi, centered 0.15-mi smoothing; sign = clockwise (our) direction of travel' };
fs.writeFileSync(__dirname + '/trail-data.json', JSON.stringify(existing));
const out = '// Generated 2026-08-06 — trail geometry (OpenStreetMap, ODbL) + elevation profile + grade coloring (USGS 3DEP).\n' +
  '// Spurs end at Edith Lake (8,671 ft) and Sand Mountain Pass saddle (9,282 ft) per direct EPQS checks.\n' +
  '// Grade: 0.05-mi USGS samples, 0.15-mi smoothing, buckets ±2/5/10/15%; sign = clockwise travel.\n' +
  '// Regenerate via roadmap/trail-atlas/research/*.js — do not hand-edit coordinates.\n' +
  'window.TRAIL = ' + JSON.stringify(existing) + ';\n';
fs.writeFileSync(__dirname + '/../../../trail-data.js', out);
console.log('trail-data.js:', (out.length/1024).toFixed(0), 'KB');
