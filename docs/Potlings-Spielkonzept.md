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

- **Tempo-Bonus (Serie):** Wer innerhalb von 3 Sekunden erneut fallen lässt und seit dem letzten Wurf etwas verschmolzen hat, verlängert seine Serie. Ab der dritten schnellen Folge zählen alle Punkte doppelt (×2), bis die Serie abreißt. Anzeige oben links im Topf mit ablaufendem Balken; doppelte Punkte steigen als goldene Zahl auf (umgesetzt). Wer lange überlegt, verliert nichts, bekommt nur keinen Bonus.

- **Nachschub:** rein zufällig, ohne Vorschau auf das übernächste Monster. Von oben kommen nur die Stufen 1 bis 3, kleine häufiger als große (umgesetzt: Stufe 1 zu 50 %, Stufe 2 zu 37,5 %, Stufe 3 zu 12,5 %).
- **Pause zwischen zwei Würfen:** knapp eine halbe Sekunde.
- **Punkte:** für jede Verschmelzung, höhere Stufen zählen mehr (*Vorschlag*, umgesetzt: 2 / 5 / 10 / 20 / 40 Punkte für das Erschaffen der Stufen 2 bis 6, 100 Punkte für ein Drachen-Feuerwerk).
- **Neustart** ist jederzeit kostenlos möglich.
- Es gibt keine Zeitbegrenzung, keine Münzen und keine Sterne.

## Monsterfamilien

Es gibt fünf Familien mit je 6 Stufen. Feuer, Wasser, Erde und Luft haben Bilder; Zucker (rosa) gibt es nur für die Herausforderung „5 Familien“ und hat bisher Platzhalter-Zeichnungen. In jedem Topf spielen normalerweise zwei Familien.

| Stufe | Feuer | Wasser | Erde | Luft | Zucker |
| --- | --- | --- | --- | --- | --- |
| 1 | Funke | Tropfen | Steinchen | Wölkchen | Zuckerkrümel |
| 2 | Flämmchen | Blubb | Kiesel | Windhauch | Bonbon |
| 3 | Glutling | Pfützling | Felsling | Böling | Gummling |
| 4 | Feuerkobold | Wellenwicht | Erdkobold | Sturmkobold | Zuckerkobold |
| 5 | Lavatroll | Nebelgeist | Felstroll | Wolkengeist | Lollitroll |
| 6 | Glutdrache | Meeresdrache | Erddrache | Sturmdrache | Zuckerdrache |

Englische Namen: Spark, Flamelet, Emberling, Fire Goblin, Lava Troll, Ember Dragon · Droplet, Blub, Puddling, Wave Imp, Mist Ghost, Sea Dragon · Pebblet, Pebble, Rockling, Earth Goblin, Rock Troll, Earth Dragon · Cloudlet, Breeze, Gustling, Storm Goblin, Cloud Ghost, Storm Dragon · Sugar Crumb, Bonbon, Gummling, Sugar Goblin, Lolli Troll, Candy Dragon.

Gestaltungsregeln für die Figuren:

- Jede Familie hat eine klare Grundfarbe (Feuer orange-rot, Wasser blau, Erde ocker-braun, Luft weiß-violett, Zucker rosa).
- Jede Stufe ist sichtbar größer und bekommt etwas Neues: Bäckchen, Hörnchen, Hörner, Reißzähne, Krone und Flügel.
- Unter dem Topf zeigt eine Leiste die beiden Reihen des aktuellen Topfs von klein bis groß.

## Spielmodi

Im Fenster „Spielen“ (Knopf mit dem Topf-Namen) gibt es zwei Bereiche (umgesetzt):

- **Geschichte:** die vier Töpfe als Kapitel, immer mit zwei Familien und ohne Zeitdruck.
- **Freies Spiel:** Man stellt sich den Topf selbst zusammen:
  - **Familien:** beliebig 2 bis 5. Feuer und Wasser sind von Anfang an frei, Erde mit dem Pilzwald, Luft mit dem Wolkenberg, Zucker nach dem Ende der Geschichte.
  - **Hintergrund:** jeder Topf-Hintergrund, sobald der Topf in der Geschichte geöffnet ist.
  - **Zeitdruck:** aus, 6 s, 4 s oder 2,5 s. Ein Ring um das wartende Monster läuft ab, dann fällt es an der zuletzt gezielten Stelle; in der letzten Sekunde tickt es leise.
  - Eigener Bestwert für jede Kombination aus Familien und Zeitdruck. Eine laufende Runde wird fortgesetzt, solange die Einstellung gleich bleibt.

Die frühere „Herausforderung“ in den Einstellungen ist im Freien Spiel aufgegangen.

## Pokale

Eine Pokalwand (Pokal-Knopf oben) sammelt Auszeichnungen, die meisten in Bronze, Silber und Gold (umgesetzt). Neue Pokale werden im Spiel eingeblendet. Das Spiel zählt dafür Verschmelzungen, Serien, Drachen, Spieltage usw. auf dem Gerät mit.

| Pokal | Bronze / Silber / Gold |
| --- | --- |
| Topf-Profi | 1000 / 2500 / 5000 Punkte in einer Runde |
| Fleißiger Koch | 100 / 1000 / 5000 Verschmelzungen insgesamt |
| Flinke Finger | Serie von 3 / 6 / 10 schnellen Würfen |
| Kettenreaktion | 3 / 4 / 5 Verschmelzungen durch einen Wurf |
| Drachenhort | Drachen aus 1 / 3 / 5 Familien |
| Feuerwerk | 1 / 5 / 20× zwei Drachen verschmolzen |
| Sammler | 10 / 20 / 30 Monster im Album |
| Weltenbummler | 3 / 5 / 8 Töpfe geöffnet |
| Ende gut, alles gut | Geschichte 1 beendet (nur Gold) |
| Riesentorte | Geschichte 2 beendet (nur Gold) |
| Sturmfest | 500 / 1000 / 2500 Punkte im Freien Spiel mit Zeitdruck 4 s oder schneller |
| Familienfest | 300 / 1000 / 2500 Punkte mit 5 Familien |
| Stammgast | an 3 / 7 / 30 Tagen gespielt |
| Zauberlehrling | 1 / 10 / 50× verwandelt |
| Zweite Chance | 1 / 5 / 20× weitergespielt (Belohnungs-Video) |

## Töpfe

Es gibt vier Töpfe mit je zwei Familien (umgesetzt). Jeder Topf hat seinen eigenen Bestwert und seine eigene laufende Partie. Ein Topf öffnet sich, sobald im vorherigen 1000 Punkte erreicht sind (nach dem Probespielen von 300 erhöht). Einmal geöffnete Töpfe bleiben offen.

| Topf | Familien | Freischaltung |
| --- | --- | --- |
| Monsterwiese | Feuer + Wasser | von Anfang an |
| Pilzwald | Erde + Wasser | 1000 Punkte in Monsterwiese |
| Wolkenberg | Luft + Feuer | 1000 Punkte in Pilzwald |
| Gewitterschlucht | Erde + Luft | 1000 Punkte in Wolkenberg |

## Geschichte

Die vier Töpfe sind die vier Kapitel einer kurzen Bildergeschichte (umgesetzt, Deutsch und Englisch). Jedes Kapitel hat zwei bis vier Seiten mit Bild und ein bis zwei Sätzen. Es erscheint, wenn man einen Topf zum ersten Mal betritt; Prolog und Kapitel 1 beim allerersten Start. Über das Töpfe-Fenster lässt sich alles Gesehene noch einmal ansehen.

Die Familien-Paare der Töpfe sind in der Geschichte begründet: Feuer meidet den Pilzwald, warme Luft trägt Funke auf den Wolkenberg, Erde und Luft wagen sich gemeinsam in die Schlucht.

| Teil | Wann | Inhalt |
| --- | --- | --- |
| Prolog | erster Start | Im Großen Kessel auf der Monsterwiese leben die Potlings. Ein nächtliches Gewitter wirbelt sie in alle Richtungen davon. |
| Kapitel 1 · Monsterwiese | erster Start | Funke und Tropfen wachen in einem alten Topf auf: „Wenn wir zusammenhalten, werden wir groß genug, um sie alle zu suchen.“ |
| Kapitel 2 · Pilzwald | erster Besuch | Steinchen weint, die Erd-Potlings haben sich verirrt. Funke bleibt am Waldrand, Tropfen hilft – Erde und Wasser machen Matsch. |
| Kapitel 3 · Wolkenberg | erster Besuch | Warme Luft trägt Funke nach oben, wo Wölkchen wartet. |
| Kapitel 4 · Gewitterschlucht | erster Besuch | Steinchen und Wölkchen gehen gemeinsam dorthin, wo das Gewitter begann. |
| Epilog | 1000 Punkte in der Gewitterschlucht | Der Wolkengeist donnert nur, weil er nicht schlafen kann. Moosbett und Wiegenlied – er schläft ein, der Himmel wird blau, alle feiern am Großen Kessel. |

Bilder: 7 Szenen (Querformat 4:3) und 4 Topf-Hintergründe (Hochformat 2:3), von einer Bild-KI erzeugt. Solange ein Bild fehlt, zeigt das Spiel die beteiligten Monster vor einem Farbverlauf.


### Geschichte 2: „Die Riesentorte“

Beginnt, sobald in der Gewitterschlucht 1000 Punkte erreicht sind (umgesetzt, Bilder folgen; bis dahin Platzhalter). Der Name „Zuckerfest“ wurde bewusst vermieden, weil er im Deutschen das Fest des Fastenbrechens bezeichnet.

| Teil | Topf | Familien | Inhalt |
| --- | --- | --- | --- |
| Prolog | – | – | Eine Streuselspur führt ins Zuckerland. Der Zuckerdrache sitzt vor einem kalten Ofen; seine Riesentorte ist ohne die verstreuten Zucker-Potlings nicht zu backen. |
| Kapitel 5 | Bonbonbach | Zucker + Wasser | Tropfen fischt mit Zuckerkrümel die Bonbons aus dem Bach. |
| Kapitel 6 | Lebkuchenhöhle | Zucker + Erde | Steinchen gräbt verschüttete Gummlinge aus. |
| Kapitel 7 | Zuckerwattewolken | Zucker + Luft | Wölkchen pustet verhedderte Bonbons frei. |
| Kapitel 8 | Schokovulkan | Zucker + Feuer | Funke heizt den kalten Ofen wieder an. |
| Epilog | 1000 Punkte im Schokovulkan | – | Die Torte wird größer als der Große Kessel; der Zuckerdrache bekommt das erste Stück, der Wolkengeist schläft mit Sahne auf der Nase. |

Dazu ein eigener Pokal „Riesentorte“; der Pokal „Weltenbummler“ zählt jetzt 3 / 5 / 8 geöffnete Töpfe. Die neuen Töpfe stehen auch im Freien Spiel als Hintergrund zur Wahl.

## Hilfen

Es gibt zwei Hilfen, beide als Vorrat, der erhalten bleibt (umgesetzt):

- **Verwandeln:** Der Spieler tippt ein Monster im Topf an, es wechselt die Familie und behält seine Stufe. Bei mehr als zwei Familien wählt er die Zielfamilie aus. Liegt es danach neben einem gleichen Monster, verschmelzen beide sofort.
- **Mischen:** Der Topf wird kräftig durchgeschüttelt. Danach gibt es eine kurze Schonfrist, bis sich alles gesetzt hat.

So bekommt man Hilfen:

- **Startvorrat:** je 3× Verwandeln und Mischen.
- **Tagesgeschenk:** beim ersten Öffnen jedes Tages je 3× Verwandeln und Mischen. Mit einem freiwilligen Video verdoppelt sich das Geschenk auf je 6×. Angezeigt werden die Tage in Folge („3 Tage in Folge“). Ohne Internet gibt es das normale Geschenk.
- **Sammelalbum:** je 3 neu entdeckte Monster → 1× Verwandeln.
- **Weiterspielen** bei „Topf voll“ bleibt eine eigene Belohnung (einmal pro Runde gegen Video).

## Sammelalbum

Jedes Monster wird beim ersten Erscheinen freigeschaltet und im Album mit Bild, Name und kurzem lustigen Text gezeigt (umgesetzt). Noch nicht entdeckte Monster erscheinen als Schatten. Bei einer Neuentdeckung gibt es im Spiel einen kurzen Freudenmoment mit Einblendung und Fanfare.

## Werbung, Kauf und Datenschutz

Das Spiel ist kostenlos und zeigt nur Werbung, die der Spieler selbst auslöst; dazu gibt es einen einmaligen Kauf „Werbefrei“.

- **Belohnungs-Werbung:** nur auf Knopfdruck. Keine Banner, keine Zwangs-Werbung.
  - **Weiterspielen** (umgesetzt, mit Google-Test-Anzeigen): Bei „Topf voll“ einmal pro Runde ein Video ansehen; dafür verschwinden alle Monster, die in die obere Topfhälfte ragen. Bricht man das Video ab, gibt es keine Belohnung.
  - **Tagesgeschenk verdoppeln** (umgesetzt, mit Google-Test-Anzeigen): einmal am Tag je 3× Verwandeln und Mischen zusätzlich.
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
| Musik pro Topf? | Eigene ruhige Musik für jedes Kapitel (später mit Suno). |
| Gibt es einen Ersatz für das Tagesrätsel? | „Tagestopf“: An einem Tag bekommen alle Spieler dieselbe Monster-Reihenfolge, mit eigenem Tages-Bestwert. Funktioniert ohne Server über einen Startwert aus dem Datum. |
| Betriebssystem des Computers? | Nicht mehr nötig: Die App wird automatisch bei GitHub gebaut. |
