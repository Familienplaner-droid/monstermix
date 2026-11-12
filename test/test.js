const assert = require('assert');
const Matter = require('matter-js');
const G = require('../src/game.js');
const run = (g, ms) => { for (let t = 0; t < ms; t += G.STEP) g.step(); };
const kinds = g => [...g.monsters.values()].map(m => m.family[0] + m.stage).sort().join(' ');

// gleiche Familie + gleiche Stufe verschmilzt zur nächsten Stufe
let g = G.create(Matter, { seed: 1 });
g.add('fire', 1, 180, 300); g.add('fire', 1, 180, 100); run(g, 3000);
assert.equal(kinds(g), 'f2'); assert.equal(g.score, 2);
// andere Familie verschmilzt nicht
g = G.create(Matter, { seed: 1 });
g.add('fire', 1, 180, 300); g.add('water', 1, 180, 100); run(g, 3000);
assert.equal(kinds(g), 'f1 w1');
// andere Stufe verschmilzt nicht
g = G.create(Matter, { seed: 1 });
g.add('fire', 1, 180, 300); g.add('fire', 2, 180, 100); run(g, 3000);
assert.equal(kinds(g), 'f1 f2');
// Kettenreaktion: 1+1 -> 2, trifft auf 2 -> 3
g = G.create(Matter, { seed: 1 });
g.add('water', 2, 180, 480); g.add('water', 1, 180, 400); g.add('water', 1, 180, 200); run(g, 4000);
assert.equal(kinds(g), 'w3');
// zwei Drachen verschwinden
g = G.create(Matter, { seed: 1 });
g.add('fire', 6, 180, 440); g.add('fire', 6, 180, 200); run(g, 4000);
assert.equal(g.monsters.size, 0); assert.equal(g.score, 100);
// Pause zwischen zwei Würfen
g = G.create(Matter, { seed: 1 });
assert.equal(g.drop(100), true); assert.equal(g.drop(100), false); run(g, 500); assert.equal(g.drop(300), true);
// Topf voll -> Spiel vorbei
g = G.create(Matter, { seed: 1 });
for (let i = 0; i < 40 && !g.over; i++) { g.add('sorte' + i, 5, 180, 60); run(g, 2500); }
assert.equal(g.over, true);
// Hilfe Verwandeln: Wasser wird Feuer und verschmilzt dann mit dem Nachbarn
g = G.create(Matter, { seed: 1 });
g.add('fire', 2, 180, 480); const w = g.add('water', 2, 180, 300); run(g, 3000);
assert.equal(kinds(g), 'f2 w2'); assert.equal(g.monsterAt(w.body.position.x, w.body.position.y).id, w.id);
assert.equal(g.transform(w.id), true); run(g, 1000);
assert.equal(kinds(g), 'f3');
// Hilfe Mischen: alles bleibt im Topf, nichts geht verloren, Spiel endet dadurch nicht sofort
g = G.create(Matter, { seed: 3 });
for (let i = 0; i < 14; i++) g.add('sorte' + i, 1 + i % 4, 30 + i * 22, 400 - (i % 3) * 90);
run(g, 3000); assert.equal(g.shake(), true); run(g, 2000);
assert.equal(g.monsters.size, 14); assert.equal(g.over, false);
for (const m of g.monsters.values()) assert.ok(m.body.position.x >= m.r - 1 && m.body.position.x <= G.W - m.r + 1 && m.body.position.y <= G.H - m.r + 1);
// Weiterspielen: Topf voll -> obere Hälfte wird geleert, Spiel läuft weiter, unten bleibt liegen
g = G.create(Matter, { seed: 1 });
assert.equal(g.revive(), false);
for (let i = 0; i < 40 && !g.over; i++) { g.add('sorte' + i, 5, 180, 60); run(g, 2500); }
assert.equal(g.over, true);
const before = g.monsters.size;
assert.equal(g.revive(), true); assert.equal(g.over, false);
assert.ok(g.monsters.size < before && g.monsters.size > 0, 'Weiterspielen entfernt nur einen Teil');
for (const m of g.monsters.values()) assert.ok(m.body.position.y - m.r >= G.H * 0.5 - 1);
run(g, 4000); assert.equal(g.over, false, 'nach dem Weiterspielen nicht sofort wieder voll');
assert.equal(g.drop(180), true);
// Tempo-Bonus: schnelle Würfe mit Verschmelzung bauen eine Serie auf, ab der dritten zählen Punkte doppelt
g = G.create(Matter, { seed: 5 });
const scoresAfter = [];
[40, 110, 180, 250, 320].forEach(x => {
  g.add('fire', 1, x, G.H - 20); g.current = { family: 'fire', stage: 1 };
  assert.equal(g.drop(x), true); run(g, 2000); scoresAfter.push([g.streak, g.score]);
});
assert.deepEqual(scoresAfter, [[0, 2], [1, 4], [2, 6], [3, 10], [4, 14]]);
run(g, 3500); assert.equal(g.streak, 0, 'Serie endet nach der Tempo-Zeit');
g.current = { family: 'water', stage: 1 }; g.drop(180); assert.equal(g.streak, 0);
// Langsamer Wurf ohne Verschmelzung beendet die Serie ebenfalls
g = G.create(Matter, { seed: 5 });
g.current = { family: 'fire', stage: 1 }; g.drop(60); run(g, 1000);
g.current = { family: 'water', stage: 1 }; g.drop(300); assert.equal(g.streak, 0);
// Gewitter-Modus: Monster fällt nach der eingestellten Zeit von allein, „hold“ hält den Zähler an
g = G.create(Matter, { seed: 6, autoDrop: 4000 });
g.aimX = 90; run(g, 3800); assert.equal(g.drops, 0); assert.ok(g.autoLeft() > 0 && g.autoLeft() < 0.1);
run(g, 400); assert.equal(g.drops, 1);
const m1 = [...g.monsters.values()][0]; assert.ok(Math.abs(m1.body.position.x - 90) < 30, 'fällt an der Zielposition');
g.hold = true; run(g, 9000); assert.equal(g.drops, 1, 'angehalten');
g.hold = false; run(g, 4600); assert.equal(g.drops, 2);
assert.equal(G.create(Matter, { seed: 1 }).autoLeft(), null);
// Fünf Familien: alle kommen von oben, Verwandeln in eine gewählte Familie
g = G.create(Matter, { seed: 7, families: ['fire', 'water', 'earth', 'air', 'candy'] });
const seen = new Set(); for (let i = 0; i < 200; i++) { seen.add(g.current.family); g.readyAt = 0; g.drop(180); g.monsters.forEach(m => g.monsters.size > 5 && 0); }
assert.equal(seen.size, 5);
g = G.create(Matter, { seed: 7, families: ['fire', 'water', 'earth'] });
const tm = g.add('fire', 3, 180, 400);
assert.equal(g.transform(tm.id, 'fire'), false); assert.equal(g.transform(tm.id, 'earth'), true); assert.equal(tm.family, 'earth');
console.log('Regel-Tests: alle bestanden');

// 60 Zufallspartien: nichts fällt aus dem Topf, jede Partie endet, es wird verschmolzen
let scores = [], dropsAll = [];
for (let seed = 1; seed <= 60; seed++) {
  g = G.create(Matter, { seed });
  let r = seed * 7919, t = 0;
  while (!g.over && t < 60 * 60 * 1000) {
    if (g.ready()) { r = (r * 1103515245 + 12345) % 2147483648; g.drop(20 + (r % 320)); }
    run(g, 600); t += 600;
    for (const m of g.monsters.values()) {
      const p = m.body.position;
      assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y), 'Position ungültig');
      assert.ok(p.x > -5 && p.x < G.W + 5 && p.y < G.H + 5, 'Monster außerhalb des Topfs');
    }
  }
  assert.equal(g.over, true, 'Partie endet nicht');
  scores.push(g.score); dropsAll.push(g.drops);
}
scores.sort((a, b) => a - b); dropsAll.sort((a, b) => a - b);
console.log('60 Zufallspartien ok | Punkte min/mittel/max:', scores[0], scores[30], scores[59], '| Würfe min/mittel/max:', dropsAll[0], dropsAll[30], dropsAll[59]);
