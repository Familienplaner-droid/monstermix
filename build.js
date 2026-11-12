// Baut aus Spiellogik, Monster-Bildern und Seite zwei fertige Dateien: dist/Potlings.html (Vorschau) und www/index.html (App)
const fs = require('fs');
const page = fs.readFileSync('src/page.html', 'utf8');
const game = fs.readFileSync('src/game.js', 'utf8');
// Bilder: assets/monster/feuer1.webp ... wasser6.webp, Maße in monster.json (erzeugt von tools/bilder.py)
const FAMILY = { feuer: 'fire', wasser: 'water', erde: 'earth', luft: 'air' };
const info = JSON.parse(fs.readFileSync('assets/monster/monster.json', 'utf8'));
const art = {};
for (const [name, v] of Object.entries(info)) {
  const m = name.match(/^([a-z]+)([1-6])$/); if (!m || !FAMILY[m[1]]) continue;
  art[FAMILY[m[1]] + m[2]] = { src: 'data:image/webp;base64,' + fs.readFileSync('assets/monster/' + name + '.webp').toString('base64'), k: v.k };
}
const html = page.replace('/*__GAME__*/', () => game).replace('/*__ART__*/{}', () => JSON.stringify(art));
fs.mkdirSync('dist', { recursive: true });
fs.mkdirSync('www', { recursive: true });
// 1) Vorschau-Seite für den Browser (lädt die Physik-Bibliothek aus dem Internet)
fs.writeFileSync('dist/Potlings.html', html);
// 2) Seite für die Android-App: vollständig, Physik-Bibliothek eingebaut, läuft ohne Internet
const matter = fs.readFileSync('node_modules/matter-js/build/matter.min.js', 'utf8');
const app = html.replace(/<script src="https:\/\/cdnjs[^"]+"><\/script>/, () => '<script>' + matter + '</script>');
if (app === html) throw new Error('Physik-Bibliothek konnte nicht eingebaut werden');
// Capacitor-Grundgerüst und Werbe-Erweiterung (AdMob) nur in der App
const capCore = fs.readFileSync('node_modules/@capacitor/core/dist/capacitor.js', 'utf8');
const admob = fs.readFileSync('node_modules/@capacitor-community/admob/dist/plugin.js', 'utf8');
const admobVar = (admob.match(/^var (\w+) = \(function/m) || [])[1];
if (!admobVar || !/exports\.AdMob = AdMob/.test(admob)) throw new Error('AdMob-Erweiterung hat ein unerwartetes Format');
const nativeScripts = `<script>${capCore}</script>\n<script>${admob}\nwindow.PotlingsAdMob = ${admobVar};</script>\n`;
fs.writeFileSync('www/index.html', `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<style>
  :root { color-scheme: light; padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); box-sizing: border-box; height: 100%; }
  body { margin: 0; }
  img { max-width: 100%; }
  [hidden] { display: none !important; }
</style>
</head>
<body>
${nativeScripts}${app}
</body>
</html>
`);
console.log('dist/Potlings.html gebaut,', Object.keys(art).length, 'Monster-Bilder,', Math.round(fs.statSync('dist/Potlings.html').size / 1024), 'kB');
