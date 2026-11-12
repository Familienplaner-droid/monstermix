// Potlings – Spiellogik des Fallspiels (ohne Grafik, damit sie automatisch getestet werden kann)
const MonsterGame = (() => {
  const W = 360, H = 520;          // Größe des Topfs in Spiel-Einheiten
  const LINE_Y = 96;               // Rand-Linie: liegt ein Monster länger darüber, ist der Topf voll
  const DROP_Y = 52;               // Höhe, aus der Monster fallen
  const RADII = [0, 17, 24, 32, 42, 54, 68];      // Größe je Stufe 1–6
  const POINTS = [0, 0, 2, 5, 10, 20, 40];        // Punkte für das Erschaffen von Stufe 2–6
  const DRAGON_BONUS = 100;                        // zwei Drachen lösen sich in Feuerwerk auf
  const FAMILIES = ['fire', 'water'];
  const DROP_STAGES = [1, 1, 1, 1, 2, 2, 2, 3];   // was von oben kommt: meist klein
  const STEP = 1000 / 60, COOLDOWN = 450, GRACE = 1200, OVER_AFTER = 1500;
  const REVIVE_CUT = 0.5;          // Weiterspielen: Monster, die über die halbe Topfhöhe ragen, verschwinden

  function rng(seed) {             // fester Startwert -> gleiche Reihenfolge (später fürs Tagesrätsel)
    let a = seed >>> 0;
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  function create(Matter, opts = {}) {
    const { Engine, Bodies, Composite, Events, Body } = Matter;
    const engine = Engine.create({ positionIterations: 10, velocityIterations: 8 });
    engine.gravity.y = 1.5;
    const T = 60, wall = { isStatic: true, friction: 0.3 };
    Composite.add(engine.world, [
      Bodies.rectangle(-T / 2, H / 2 - H, T, H * 4, wall),
      Bodies.rectangle(W + T / 2, H / 2 - H, T, H * 4, wall),
      Bodies.rectangle(W / 2, H + T / 2, W + T * 2, T, wall),
    ]);
    const random = rng(opts.seed == null ? (Math.random() * 2 ** 32) : opts.seed);
    const families = opts.families || FAMILIES;
    const game = { monsters: new Map(), score: 0, time: 0, over: false, readyAt: 0, current: null, drops: 0 };
    const byBody = new Map();
    let nextId = 1, queue = [], events = [];

    function pick() {
      return { family: families[Math.floor(random() * families.length)], stage: DROP_STAGES[Math.floor(random() * DROP_STAGES.length)] };
    }
    game.current = pick();

    function add(family, stage, x, y, angle = 0) {
      const r = RADII[stage];
      const body = Bodies.circle(Math.max(r, Math.min(W - r, x)), y, r, { restitution: 0.12, friction: 0.25, frictionAir: 0.004, density: 0.0012, angle });
      const m = { id: nextId++, family, stage, r, body, since: game.time, above: 0 };
      game.monsters.set(m.id, m); byBody.set(body.id, m);
      Composite.add(engine.world, body);
      return m;
    }
    function remove(m) { Composite.remove(engine.world, m.body); game.monsters.delete(m.id); byBody.delete(m.body.id); }

    function touch(ev) {
      for (const pair of ev.pairs) {
        const a = byBody.get(pair.bodyA.id), b = byBody.get(pair.bodyB.id);
        if (a && b && !a.merging && !b.merging && a.family === b.family && a.stage === b.stage) {
          a.merging = b.merging = true; queue.push([a, b]);
        }
      }
    }
    Events.on(engine, 'collisionStart', touch);
    Events.on(engine, 'collisionActive', touch);

    function drop(x) {
      if (game.over || game.time < game.readyAt) return false;
      const m = add(game.current.family, game.current.stage, x, DROP_Y);
      game.drops++; game.readyAt = game.time + COOLDOWN; game.current = pick();
      events.push({ type: 'drop', id: m.id, family: m.family, stage: m.stage });
      return true;
    }

    function step() {
      if (game.over) return [];
      Engine.update(engine, STEP);
      game.time += STEP;
      for (const [a, b] of queue) {
        const x = (a.body.position.x + b.body.position.x) / 2, y = (a.body.position.y + b.body.position.y) / 2;
        const vx = (a.body.velocity.x + b.body.velocity.x) / 2, vy = (a.body.velocity.y + b.body.velocity.y) / 2;
        remove(a); remove(b);
        if (a.stage < 6) {
          const m = add(a.family, a.stage + 1, x, y, a.body.angle);
          Body.setVelocity(m.body, { x: vx, y: vy });
          game.score += POINTS[m.stage];
          events.push({ type: 'merge', id: m.id, family: m.family, stage: m.stage, x, y });
        } else {
          game.score += DRAGON_BONUS;
          events.push({ type: 'fireworks', family: a.family, x, y });
        }
      }
      queue = [];
      for (const m of game.monsters.values()) {
        // Sicherung: nichts darf durch Wand oder Boden gedrückt werden
        const p = m.body.position, cx = Math.max(m.r, Math.min(W - m.r, p.x)), cy = Math.min(H - m.r, p.y);
        if (cx !== p.x || cy !== p.y) Body.setPosition(m.body, { x: cx, y: cy });
        const high = m.body.position.y - m.r < LINE_Y && game.time - m.since > GRACE;
        m.above = high ? m.above + STEP : 0;
        if (m.above > OVER_AFTER) { game.over = true; events.push({ type: 'over' }); break; }
      }
      const out = events; events = [];
      return out;
    }

    // Hilfe „Verwandeln“: Monster wechselt die Familie, Stufe bleibt
    function transform(id, toFamily) {
      const m = game.monsters.get(id);
      if (!m || game.over || m.merging) return false;
      m.family = toFamily || families[(families.indexOf(m.family) + 1) % families.length];
      events.push({ type: 'transform', id: m.id, family: m.family, stage: m.stage, x: m.body.position.x, y: m.body.position.y });
      return true;
    }
    // Hilfe „Mischen“: der Topf wird kräftig durchgeschüttelt
    function shake() {
      if (game.over || !game.monsters.size) return false;
      for (const m of game.monsters.values()) {
        Body.setVelocity(m.body, { x: (random() - 0.5) * 18, y: -(7 + random() * 8) });
        Body.setAngularVelocity(m.body, (random() - 0.5) * 0.5);
        m.since = game.time; m.above = 0;          // Schonfrist, bis sich alles wieder gesetzt hat
      }
      events.push({ type: 'shake' });
      return true;
    }
    // Weiterspielen nach „Topf voll“ (Belohnung für ein freiwilliges Werbevideo):
    // alle Monster, die in die obere Topfhälfte ragen, verschwinden, der Rest bekommt eine Schonfrist.
    function revive() {
      if (!game.over) return false;
      const removed = [];
      for (const m of [...game.monsters.values()]) {
        if (m.body.position.y - m.r < H * REVIVE_CUT) { removed.push({ family: m.family, x: m.body.position.x, y: m.body.position.y, r: m.r }); remove(m); }
      }
      for (const m of game.monsters.values()) { m.above = 0; m.since = game.time; m.merging = false; }
      queue = [];
      game.over = false; game.readyAt = game.time + COOLDOWN;
      events.push({ type: 'revive', removed });
      return true;
    }
    function monsterAt(x, y) {
      let best = null, bestD = Infinity;
      for (const m of game.monsters.values()) {
        const d = Math.hypot(m.body.position.x - x, m.body.position.y - y) / (m.r + 8);
        if (d < 1 && d < bestD) { best = m; bestD = d; }
      }
      return best;
    }

    return Object.assign(game, { drop, step, add, transform, shake, revive, monsterAt, ready: () => !game.over && game.time >= game.readyAt });
  }

  return { W, H, LINE_Y, DROP_Y, RADII, FAMILIES, STEP, create };
})();
if (typeof module !== 'undefined') module.exports = MonsterGame;
