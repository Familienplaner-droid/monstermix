# Potlings

Niedliches Merge-Fallspiel für Android: Monster fallen in einen Topf, kullern und verschmelzen.

## Testversion aufs Handy laden

Bei jeder Änderung baut GitHub automatisch eine Testversion der App.

1. Auf dem Android-Handy die Seite **Releases** dieses Repositorys öffnen.
2. Unter „Testversion“ die Datei `Potlings-Testversion.apk` herunterladen und antippen.
3. Beim ersten Mal fragt Android, ob Apps aus dieser Quelle installiert werden dürfen – erlauben.

Neue Testversionen lassen sich einfach über die alte installieren; der Spielstand bleibt erhalten.

## Aufbau

| Ordner / Datei | Inhalt |
| --- | --- |
| `src/game.js` | Spielregeln und Physik, ohne Grafik (automatisch getestet) |
| `src/page.html` | Oberfläche, Zeichnen, Töne, Texte in Deutsch und Englisch |
| `assets/original/` | Monster-Bilder im Original |
| `assets/monster/` | freigestellte, verkleinerte Monster-Bilder (erzeugt von `tools/bilder.py`) |
| `test/test.js` | automatische Tests der Regeln plus Zufallspartien |
| `build.js` | baut `dist/Potlings.html` (Vorschau) und `www/index.html` (App) |
| `android/` | Android-Projekt (Capacitor) |
| `docs/` | Spielkonzept |

## Befehle

```
npm install        # einmalig
npm test           # Regeln testen
npm run build      # Spiel bauen
npm run android    # Spiel bauen und ins Android-Projekt kopieren
```

Neues Monster-Bild einbauen: PNG nach `assets/original/` legen (z. B. `feuer2.png`), dann `python3 tools/bilder.py` und `npm run build`.

Geschichtsbilder und Topf-Hintergründe: `szene-<name>.png` bzw. `topf-<name>.png` nach `assets/original/` legen, dann `python3 tools/szenen.py` und `npm run build`. Namen: `szene-prolog1`, `szene-prolog2`, `szene-kapitel1` … `szene-kapitel4`, `szene-epilog`; `topf-wiese`, `topf-wald`, `topf-wolken`, `topf-sturm`.

## Werbung

Nur freiwillige Belohnungs-Videos über Google AdMob (Erweiterung `@capacitor-community/admob`). Zurzeit laufen **Google-Test-Anzeigen**. Im Browser erscheint statt des Videos ein Platzhalter.

Vor der Veröffentlichung umstellen:

1. In `src/page.html` im Abschnitt „Werbung“: `testing: false` und die eigene Anzeigenblock-ID bei `rewardedId` eintragen.
2. In `android/app/src/main/res/values/strings.xml`: `admob_app_id` durch die eigene App-ID aus dem AdMob-Konto ersetzen.
3. Im AdMob-Konto die Einwilligungs-Abfrage (DSGVO-Nachricht) für die App anlegen.
