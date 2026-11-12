# Monsterbrei

Niedliches Merge-Fallspiel für Android: Monster fallen in einen Topf, kullern und verschmelzen.

## Testversion aufs Handy laden

Bei jeder Änderung baut GitHub automatisch eine Testversion der App.

1. Auf dem Android-Handy die Seite **Releases** dieses Repositorys öffnen.
2. Unter „Testversion“ die Datei `Monsterbrei-Testversion.apk` herunterladen und antippen.
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
| `build.js` | baut `dist/Monsterbrei.html` (Vorschau) und `www/index.html` (App) |
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
