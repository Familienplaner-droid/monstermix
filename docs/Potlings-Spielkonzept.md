# Potlings – Spielkonzept

Stand: 12.11.2026 (Fassung 2: Fallspiel statt Wisch-Rätsel, neuer Name Potlings)

## Hinweis für die Umsetzung

Dieses Dokument ist die Vorgabe für das Handyspiel „Potlings“. Die Auftraggeberin bzw. der Auftraggeber hat keine Programmiererfahrung: Bitte Schritt für Schritt vorgehen, jeden Schritt einfach erklären und vor größeren Entscheidungen nachfragen.

- **Beschlossen** ist alles, was nicht als *Vorschlag* markiert ist.
- **Vorschläge** sind sinnvolle Annahmen, die bei Bedarf geändert werden dürfen.
- **Umgesetzt** heißt: im spielbaren Prototyp vorhanden (Stand siehe Umsetzungsplan).

### Was sich gegenüber Fassung 1 geändert hat

| Thema | Fassung 1 | Fassung 2 |
| --- | --- | --- |
| Name | Monsterbrei | Potlings (international verständlich, als Name für eine Spiele-Reihe gedacht) |
| Spielart | Raster mit Wisch-Steuerung (ähnlich 2048) | Fallspiel mit Kullern (ähnlich Fruit Drop / Wassermelonen-Spiel) |
| Aufbau | 5 Welten mit ca. 75 handgebauten Rätsel-Leveln | Nur Endlos mit Highscore |
| Tagesrätsel | Automatisch erzeugtes Rätsel | Entfällt; als *Vorschlag* ersetzt durch den „Tagestopf“ |
| Level-Editor und Löser | Geplant | Entfallen |
| Hindernisse und Spezialfelder | Fels, Eisblock, Treibsand, Zauberpilz, Wolke | Entfallen vorerst (siehe Offene Fragen) |

## Name

Das Spiel heißt **Potlings** – die kleinen Monster, die im Topf leben. Der Name ist bewusst als Name für eine Reihe gewählt: Weitere Spiele können andere Spielprinzipien mit denselben Figuren erzählen (z. B. „Potlings: Drop & Merge“, später „Potlings: Match“).

- Vor der Veröffentlichung noch in den amtlichen Markenregistern prüfen (TMview, deckt Deutschland und die EU ab).
- Technische App-Kennung: `com.potlings.game` – nach der Veröffentlichung im Play Store nicht mehr änderbar.
- Namen ohne das Wort „Monster“ wurden bewusst bevorzugt, weil Monster Energy gegen solche Namen vorgeht.

## Überblick

Potlings ist ein niedliches Geschicklichkeits- und Knobelspiel: Man lässt kleine Monster von oben in einen Topf fallen. Sie kullern und stapeln sich, und zwei gleiche verschmelzen zum nächstgrößeren Monster. Ziel ist ein möglichst hoher Punktestand, bevor der Topf überläuft.

| Eckpunkt | Entscheidung |
| --- | --- |
| Genre | Merge-Fallspiel mit Physik |
| Plattform | Nur Android (Google Play Store) |
| Ziel | Veröffentlichung im Play Store |
| Zielgruppe | Ab 13 Jahren, nicht gezielt für Kinder |
| Stil | Niedlich, Fantasiewesen |
| Spieldauer | Kurze Runden (einige Minuten), langfristig Highscore und Sammelalbum |
| Umfang Version 1 | Endlos-Modus, Sammelalbum, zwei Hilfen |
| Monetarisierung | Kostenlos, freiwillige Belohnungs-Werbung, Kauf „Werbefrei“ für 1,99 € |
| Sprachen | Deutsch und Englisch, alle Texte übersetzbar angelegt |
| Geräte | Computer für die Entwicklung und ein Android-Handy zum Testen sind vorhanden |

## Kernmechanik

Ablauf (umgesetzt):

1. Oben im Topf hängt das nächste Monster. Der Spieler zieht den Finger nach links oder rechts, um zu zielen, und lässt los.
2. Das Monster fällt, kullert und bleibt liegen. Alle Monster sind rund und rollen.
3. Berühren sich zwei Monster **gleicher Familie und gleicher Stufe**, verschmelzen sie an Ort und Stelle zur nächsten Stufe. Kettenreaktionen sind möglich.
4. Monster anderer Familie oder anderer Stufe verschmelzen nicht und liegen im Weg.
5. Zwei Drachen (Stufe 6) derselben Familie lösen sich in einem Feuerwerk auf und schaffen Platz.
6. Bleibt ein Monster länger als etwa 1,5 Sekunden über der gestrichelten Rand-Linie liegen, ist der Topf voll und die Runde vorbei.

Weitere Regeln:

- **Nachschub:** rein zufällig, ohne Vorschau auf das übernächste Monster. Von oben kommen nur die Stufen 1 bis 3, kleine häufiger als große (umgesetzt: Stufe 1 zu 50 %, Stufe 2 zu 37,5 %, Stufe 3 zu 12,5 %).
- **Pause zwischen zwei Würfen:** knapp eine halbe Sekunde.
- **Punkte:** für jede Verschmelzung, höhere Stufen zählen mehr (*Vorschlag*, umgesetzt: 2 / 5 / 10 / 20 / 40 Punkte für das Erschaffen der Stufen 2 bis 6, 100 Punkte für ein Drachen-Feuerwerk).
- **Neustart** ist jederzeit kostenlos möglich.
- Es gibt keine Zeitbegrenzung, keine Münzen und keine Sterne.

## Monsterfamilien

Es gibt zwei Familien mit je 6 Stufen: Feuer und Wasser. Beide bleiben getrennt – das macht das Spiel kniffliger als ein Fallspiel mit nur einer Reihe.

| Stufe | Feuer | Wasser |
| --- | --- | --- |
| 1 | Funke | Tropfen |
| 2 | Flämmchen | Blubb |
| 3 | Glutling | Pfützling |
| 4 | Feuerkobold | Wellenwicht |
| 5 | Lavatroll | Nebelgeist |
| 6 | Glutdrache | Meeresdrache |

Gestaltungsregeln für die Figuren:

- Jede Familie hat eine klare Grundfarbe (Feuer orange-rot, Wasser blau).
- Jede Stufe ist sichtbar größer und bekommt etwas Neues: Bäckchen, Hörnchen, Hörner, Reißzähne, Krone und Flügel.
- Unter dem Topf zeigt eine Leiste beide Reihen von klein bis groß.

Die Familien Erde und Luft aus Fassung 1 sind im Endlos-Spiel vorerst nicht dabei (siehe Offene Fragen).

## Hilfen

Es gibt zwei Hilfen (umgesetzt, noch ohne Werbung):

- **Verwandeln:** Der Spieler tippt ein Monster im Topf an, es wechselt die Familie und behält seine Stufe. Liegt es danach neben einem gleichen Monster, verschmelzen beide sofort.
- **Mischen:** Der Topf wird kräftig durchgeschüttelt. Danach gibt es eine kurze Schonfrist, bis sich alles gesetzt hat.

So bekommt man Hilfen:

- Sammelalbum: je 3 neu entdeckte Monster → 1 Verwandeln (umgesetzt).
- Mischen: 1× pro Runde. *Vorschlag:* Im fertigen Spiel gibt es Mischen nur gegen freiwillige Werbung, weiterhin höchstens 1× pro Runde.
- Freiwillige Werbung ansehen → 1 Verwandeln (noch nicht umgesetzt).
- *Vorschlag:* Tagestopf gespielt → 1 Verwandeln (siehe Offene Fragen).

## Sammelalbum

Jedes Monster wird beim ersten Erscheinen freigeschaltet und im Album mit Bild, Name und kurzem lustigen Text gezeigt (umgesetzt). Noch nicht entdeckte Monster erscheinen als Schatten. Bei einer Neuentdeckung gibt es im Spiel einen kurzen Freudenmoment mit Einblendung und Fanfare.

## Werbung, Kauf und Datenschutz

Das Spiel ist kostenlos und zeigt nur Werbung, die der Spieler selbst auslöst; dazu gibt es einen einmaligen Kauf „Werbefrei“.

- **Belohnungs-Werbung:** nur auf Knopfdruck. Keine Banner, keine Zwangs-Werbung.
  - **Weiterspielen** (umgesetzt, mit Google-Test-Anzeigen): Bei „Topf voll“ einmal pro Runde ein Video ansehen; dafür verschwinden alle Monster, die in die obere Topfhälfte ragen. Bricht man das Video ab, gibt es keine Belohnung.
  - *Vorschlag, noch offen:* Mischen 1× pro Runde gegen Video statt gratis; +1 Verwandeln gegen Video mit Tageslimit.
- **Einwilligung (DSGVO):** Vor dem ersten Video fragt Googles Einwilligungs-Tool (UMP) nach, falls nötig. In den Einstellungen lässt sich die Einwilligung später ändern (umgesetzt; das Formular selbst wird im AdMob-Konto eingerichtet).
- **Kauf „Werbefrei“:** einmalig, 1,99 €. *Vorschlag:* Danach gibt es die Belohnungen ohne Video, mit gleicher Begrenzung.
- **Technik:** Werbung über Google AdMob, Kauf über Google Play Billing (*Vorschlag*).
- **Ohne Internet** muss das Spiel voll spielbar sein; nur Werbung und Kauf brauchen eine Verbindung.

Pflichten vor der Veröffentlichung (aus allgemeinem Wissen, bitte bei der Umsetzung aktuell prüfen):

- Google-Play-Entwicklerkonto, ungefähr 25 US-Dollar einmalig.
- Einwilligungsabfrage für personalisierte Werbung in der EU (DSGVO), z. B. über Googles Consent-Tool.
- Datenschutzerklärung als Webseite und die Angaben zur Datensicherheit im Play Store.
- Altersfreigabe-Fragebogen im Play Store. Das Spiel richtet sich nicht gezielt an Kinder, daher gelten die normalen Werbe-Regeln.

## Stil, Bildschirme und Ton

Der Stil ist niedlich und weich: runde Formen, kräftige Farben, Monster mit großen Augen.

- **Ausrichtung:** Hochformat, mit einer Hand spielbar.
- **Animationen:** Monster rollen, hüpfen beim Verschmelzen kurz und blinzeln ab und zu. Funken beim Verschmelzen, Feuerwerk bei zwei Drachen.
- **Grafik:** Die KI zeichnet alle Monster als Vektorgrafiken (SVG) im Code. Jede Grafik ist einzeln austauschbar.
- **Ton:** Geräusche beim Fallen, Verschmelzen, Entdecken und bei „Topf voll“, dazu leise Hintergrundmusik. Ton und Musik sind getrennt abschaltbar. Alle Töne werden im Gerät erzeugt, es gibt keine Tondateien.

Bildschirme:

1. Spiel: Logo, Punkte und Bestwert, Topf, Hilfen, Monster-Leiste (umgesetzt)
2. „Topf voll“-Fenster mit Punktestand (umgesetzt)
3. Sammelalbum (umgesetzt)
4. Einstellungen: Ton, Musik, Sprache, alles zurücksetzen (umgesetzt); später Werbefrei kaufen, Käufe wiederherstellen, Datenschutz
5. *Vorschlag:* eigener Startbildschirm mit Logo erst in der Android-App

## Technik

- Das Spiel ist ein Web-Spiel und wird später mit Capacitor als Android-App verpackt. So lässt sich jeder Zwischenstand sofort im Handy-Browser ausprobieren.
- Die Physik (Fallen, Kullern, Zusammenstöße) übernimmt die fertige Bibliothek Matter.js.
- Spiellogik (Regeln, Verschmelzen, Punkte, Topf voll, Hilfen) ist strikt von der Grafik getrennt und wird automatisch getestet, zusätzlich mit Zufallspartien.
- Der Spielstand wird lokal auf dem Gerät gespeichert: Bestwert, Album, Hilfen, Einstellungen und die laufende Runde.
- *Vorschlag:* Beim Verpacken als App auf TypeScript umstellen und Matter.js mit einpacken, damit das Spiel ohne Internet läuft.

## Umsetzungsplan

| Schritt | Inhalt | Stand |
| --- | --- | --- |
| 1 | Prototyp: Topf, Feuer und Wasser, Fallen, Verschmelzen, Topf voll | Fertig |
| 2 | Spielgefühl: Töne, Musik, Blinzeln, Funken, Freudenmoment | Fertig, Feinschliff nach dem Probespielen |
| 3 | Sammelalbum, Speichern, Einstellungen | Fertig |
| 4 | Hilfen Verwandeln und Mischen (ohne Werbung) | Fertig |
| 5 | Ausbalancieren nach Probespielen: Topfgröße, Monstergrößen, Punkte, Häufigkeiten | Offen |
| 6 | Android-App: mit Capacitor verpacken, auf dem eigenen Handy installieren, App-Symbol | Fertig (automatischer Bau über GitHub; vorläufiges Symbol) |
| 7 | Werbung und Kauf: Belohnungs-Videos, Einwilligungsabfrage, „Werbefrei“ | Weiterspielen gegen Video fertig (Test-Anzeigen); AdMob-Konto, weitere Belohnungen und „Werbefrei“ offen |
| 8 | Veröffentlichung: Store-Texte und Bilder, Datenschutzerklärung, zuerst ein geschlossener Test im Play Store | Offen |

Nach jedem Schritt gibt es eine spielbare Version zum Ausprobieren.

## Offene Fragen

| Frage | Vorschlag |
| --- | --- |
| Was wird aus Erde und Luft? | Als freischaltbare „Töpfe“: Ab einem bestimmten Bestwert öffnet sich ein neuer Topf mit eigenem Hintergrund und eigener Musik. In späteren Töpfen spielen Erde und Luft mit, was das Spiel schwerer macht. |
| Was wird aus den 5 Welten? | Als Themen für diese Töpfe weiterverwenden: Monsterwiese, Vulkan & Meer, Eisgebirge & Wüste, Pilzwald & Sumpf, Süßigkeitenland & Wolken. |
| Gibt es einen Ersatz für das Tagesrätsel? | „Tagestopf“: An einem Tag bekommen alle Spieler dieselbe Monster-Reihenfolge, mit eigenem Tages-Bestwert. Funktioniert ohne Server über einen Startwert aus dem Datum. |
| Betriebssystem des Computers? | Wird für Schritt 6 gebraucht (Windows, Mac oder Linux). |
