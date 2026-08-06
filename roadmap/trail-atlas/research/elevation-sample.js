// Sample elevations along the route from USGS EPQS (3DEP), open-elevation as fallback.
const fs = require('fs');
const legs = JSON.parse(fs.readFileSync(__dirname + '/route.json', 'utf8'));

const R = 3958.8;
const toR = (d) => (d * Math.PI) / 180;
function hav(a, b) {
  const dLat = toR(b[0] - a[0]), dLon = toR(b[1] - a[1]);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a[0])) * Math.cos(toR(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// resample a polyline every `step` miles
function resample(line, step) {
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
  // fix cumulative mi
  let cum = 0;
  for (let i = 1; i < out.length; i++) {
    cum += hav([out[i - 1].lat, out[i - 1].lng], [out[i].lat, out[i].lng]);
    out[i].mi = cum;
  }
  return out;
}

const main = resample(
  [...legs.leg1, ...legs.leg2a.slice(1), ...legs.leg2b.slice(1), ...legs.leg3a.slice(1), ...legs.leg3b.slice(1)],
  0.1
);
const spurEdith = resample(legs.spurEdith, 0.08);
const spurPass = resample(legs.spurPass, 0.1);
console.log(`points: main=${main.length} edith=${spurEdith.length} pass=${spurPass.length}`);

async function epqs(p, tries = 3) {
  for (let t = 0; t < tries; t++) {
    try {
      const ctl = new AbortController();
      const to = setTimeout(() => ctl.abort(), 15000);
      const r = await fetch(
        `https://epqs.nationalmap.gov/v1/json?x=${p.lng}&y=${p.lat}&wkid=4326&units=Feet`,
        { signal: ctl.signal }
      );
      clearTimeout(to);
      if (!r.ok) throw new Error('http ' + r.status);
      const j = await r.json();
      const v = Number(j.value);
      if (Number.isFinite(v) && v > 3000 && v < 12000) return v;
      throw new Error('bad value ' + j.value);
    } catch (e) {
      if (t === tries - 1) return null;
      await new Promise((res) => setTimeout(res, 800 * (t + 1)));
    }
  }
}

async function fillEPQS(points, label) {
  let failed = 0, done = 0;
  const CONC = 10;
  let i = 0;
  async function worker() {
    while (i < points.length) {
      const idx = i++;
      const v = await epqs(points[idx]);
      if (v == null) failed++;
      else points[idx].ele = Math.round(v);
      done++;
      if (done % 50 === 0) console.log(`${label}: ${done}/${points.length} (${failed} failed)`);
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  console.log(`${label}: complete, ${failed}/${points.length} failed`);
  return failed;
}

async function fillOpenElevation(points) {
  const missing = points.filter((p) => p.ele == null);
  if (!missing.length) return;
  console.log('open-elevation fallback for', missing.length, 'points');
  for (let i = 0; i < missing.length; i += 100) {
    const batch = missing.slice(i, i + 100);
    const r = await fetch('https://api.open-elevation.com/api/v1/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locations: batch.map((p) => ({ latitude: p.lat, longitude: p.lng })) }),
    });
    const j = await r.json();
    j.results.forEach((res, k) => (batch[k].ele = Math.round(res.elevation * 3.28084)));
  }
}

function gain(points) {
  // 3-pt smoothing then sum positive deltas
  const sm = points.map((p, i) => {
    const a = points[Math.max(0, i - 1)].ele, b = p.ele, c = points[Math.min(points.length - 1, i + 1)].ele;
    return (a + b + c) / 3;
  });
  let g = 0;
  for (let i = 1; i < sm.length; i++) if (sm[i] > sm[i - 1]) g += sm[i] - sm[i - 1];
  return Math.round(g);
}

(async () => {
  await fillEPQS(main, 'main');
  await fillEPQS(spurEdith, 'edith');
  await fillEPQS(spurPass, 'pass');
  await fillOpenElevation(main);
  await fillOpenElevation(spurEdith);
  await fillOpenElevation(spurPass);

  fs.writeFileSync(__dirname + '/elevation.json', JSON.stringify({ main, spurEdith, spurPass }));

  const at = (mi) => main.reduce((b, p) => (Math.abs(p.mi - mi) < Math.abs(b.mi - mi) ? p : b));
  console.log('\n== key elevations (ft, USGS 3DEP) ==');
  console.log('TH (mi 0):', main[0].ele);
  console.log('Alice (mi 5.96):', at(5.96).ele);
  console.log('Twin jct (mi 6.83):', at(6.83).ele);
  const leg2 = main.filter((p) => p.mi > 6.83 && p.mi < 10.91);
  const snowy = leg2.reduce((a, b) => (b.ele > a.ele ? b : a));
  console.log('Snowyside Pass (max on leg2):', snowy.ele, 'at mi', snowy.mi.toFixed(2), snowy.lat.toFixed(4), snowy.lng.toFixed(4));
  console.log('Toxaway NW jct (mi 10.91):', at(10.91).ele);
  console.log('Edith jct / Toxaway NE (mi 12.34):', at(12.34).ele);
  console.log('Farley area (mi ~14.4):', at(14.4).ele);
  console.log('McDonald jct (mi 16.41):', at(16.41).ele);
  console.log('cutoff high point:', main.filter((p) => p.mi > 16.41).reduce((a, b) => (b.ele > a.ele ? b : a)).ele);
  console.log('end (mi', main[main.length - 1].mi.toFixed(2), '):', main[main.length - 1].ele);
  console.log('MAIN total gain:', gain(main), 'ft');
  console.log('Edith spur: start', spurEdith[0].ele, 'max', Math.max(...spurEdith.map((p) => p.ele)), 'lake end', spurEdith[spurEdith.length - 1].ele, 'gain', gain(spurEdith));
  const passMax = spurPass.reduce((a, b) => (b.ele > a.ele ? b : a));
  console.log('Pass spur: start', spurPass[0].ele, 'MAX', passMax.ele, 'at mi', passMax.mi.toFixed(2), passMax.lat.toFixed(4), passMax.lng.toFixed(4), 'gain to max', gain(spurPass.filter((p) => p.mi <= passMax.mi)));
})();
