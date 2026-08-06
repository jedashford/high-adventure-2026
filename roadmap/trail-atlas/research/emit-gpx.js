// Emit sawtooth-loop.gpx (+ .kml) — route + key waypoints for GPS apps / Google Earth.
const fs = require('fs');
const legs = JSON.parse(fs.readFileSync(__dirname + '/route.json', 'utf8'));
const main = [...legs.leg1, ...legs.leg2a.slice(1), ...legs.leg2b.slice(1), ...legs.leg3a.slice(1), ...legs.leg3b.slice(1)];

const WPTS = [
  [43.98441, -114.87189, 'Tin Cup (Pettit Lake) Trailhead', 'Start/finish. $10/vehicle/day cash. Self-issue permit box.'],
  [43.93824, -114.95647, 'Twin Lakes camp (night 1)', 'Sites on forested east side; quieter than Alice.'],
  [43.94030, -114.94250, 'Alice Lake peninsula (night 1 fallback)', 'Big-group peninsula; hang all food.'],
  [43.94400, -114.96100, 'Snowyside Pass 9,415 ft', 'High point. Cross before 11 AM. Exposed.'],
  [43.96330, -114.97390, 'Toxaway NW junction - TURN RIGHT', '3-way junction; wrong fork goes to Edna. Right along the lake.'],
  [43.97000, -114.95600, 'Toxaway north shore camp (night 2)', 'Best sites toward the end of the lake, below the trail.'],
  [43.97690, -114.95932, 'Edith Lake (day hike)', '1.0 mi from camp, +490 ft. Not a camp.'],
  [43.97276, -114.96955, 'Sand Mountain Pass 9,282 ft (day hike)', '2.0 mi from NW junction, +890 ft.'],
  [43.97926, -114.93170, 'Farley Lake (lunch, not camp)', 'Limited sites; waterfalls below.'],
  [43.99560, -114.89340, 'McDonald junction - TURN RIGHT', 'Right onto Pettit Lake Cutoff for the cars.'],
  [44.00550, -114.87000, 'Yellow Belly Lake NE cove (night 3 option)', 'Outside wilderness; dispersed sites; swimming.'],
  [43.94800, -114.93000, 'Footbridge - NO RAILINGS (approx)', 'Crossing 5 of 6. One at a time, no stopping mid-span.'],
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Sawtooth High Adventure Trail Atlas" xmlns="http://www.topografix.com/GPX/1/1">
<metadata><name>Alice-Toxaway Loop (Lakeside 14th, Aug 2026)</name>
<desc>18.6 mi clockwise from Tin Cup TH. Geometry: OpenStreetMap (ODbL). Not a substitute for a paper map.</desc></metadata>
${WPTS.map(w => `<wpt lat="${w[0]}" lon="${w[1]}"><name>${esc(w[2])}</name><desc>${esc(w[3])}</desc></wpt>`).join('\n')}
<trk><name>Alice-Toxaway Loop (valley route)</name><trkseg>
${main.map(p => `<trkpt lat="${p[0]}" lon="${p[1]}"/>`).join('\n')}
</trkseg></trk>
<trk><name>Side trip - Edith Lake</name><trkseg>
${legs.spurEdith.map(p => `<trkpt lat="${p[0]}" lon="${p[1]}"/>`).join('\n')}
</trkseg></trk>
<trk><name>Side trip - Sand Mountain Pass</name><trkseg>
${legs.spurPass.map(p => `<trkpt lat="${p[0]}" lon="${p[1]}"/>`).join('\n')}
</trkseg></trk>
</gpx>`;
fs.writeFileSync(__dirname + '/../../../sawtooth-loop.gpx', gpx);

const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2"><Document>
<name>Alice-Toxaway Loop — Sawtooth High Adventure 2026</name>
<Style id="route"><LineStyle><color>ff1f53b4</color><width>4</width></LineStyle></Style>
<Style id="spur"><LineStyle><color>ff3b6d8a</color><width>3</width></LineStyle></Style>
${WPTS.map(w => `<Placemark><name>${esc(w[2])}</name><description>${esc(w[3])}</description><Point><coordinates>${w[1]},${w[0]},0</coordinates></Point></Placemark>`).join('\n')}
<Placemark><name>Main loop (18.6 mi)</name><styleUrl>#route</styleUrl><LineString><tessellate>1</tessellate><coordinates>
${main.map(p => `${p[1]},${p[0]},0`).join(' ')}
</coordinates></LineString></Placemark>
<Placemark><name>Edith Lake spur</name><styleUrl>#spur</styleUrl><LineString><tessellate>1</tessellate><coordinates>
${legs.spurEdith.map(p => `${p[1]},${p[0]},0`).join(' ')}
</coordinates></LineString></Placemark>
<Placemark><name>Sand Mountain Pass spur</name><styleUrl>#spur</styleUrl><LineString><tessellate>1</tessellate><coordinates>
${legs.spurPass.map(p => `${p[1]},${p[0]},0`).join(' ')}
</coordinates></LineString></Placemark>
</Document></kml>`;
fs.writeFileSync(__dirname + '/../../../sawtooth-loop.kml', kml);
console.log('gpx:', (gpx.length/1024).toFixed(0), 'KB · kml:', (kml.length/1024).toFixed(0), 'KB');
