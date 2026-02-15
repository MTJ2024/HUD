# Professional GTA V HUD System

Ein professionelles, anpassbares HUD-System für FiveM im **GTA V-Stil** mit horizontalen Balken, **individueller Element-Skalierung**, Drag-and-Drop-Positionierung und **vollständiger ESX-Integration**.

## Features

✅ **Professionelles GTA V Design** - Dunkle, sleeke horizontale Balken statt bunter Circles
✅ **Individual Element Scaling** - Jedes Element EINZELN mit Mausrad skalierbar (0.5x - 2.0x)
✅ **ESX-Integration** - Echte Daten von ESX (Cash, Bank, Hunger, Durst, Spieler-ID)
✅ **Viewport-Schutz** - Elemente bleiben IMMER im sichtbaren Bereich (8-fache Validierung)
✅ **Alle Elemente in Edit-Modus sichtbar** - Keine verschwindenden Icons mehr!
✅ **Pause-Menü Integration** - HUD blendet sich automatisch aus wenn ESC gedrückt wird
✅ **16 Einzelne HUD-Elemente** - Jedes Element kann einzeln positioniert, skaliert und ein-/ausgeblendet werden
✅ **120+ Waffennamen** - Deutsche Waffennamen (Pistole, Sturmgewehr, etc.) statt "null"
✅ **Professioneller Speedometer** - Mit 6 Fahrzeugindikatoren (Engine, Lights, Doors, Lock, Fuel, Seatbelt)
✅ **Alle Fahrzeugtypen** - Auto, Boot, Flugzeug, Hubschrauber (mit Höhenanzeige)
✅ **Clean & Readable** - Größere Schrift, besserer Kontrast, optimale Lesbarkeit
✅ **Toggle Edit-Modus** - Drücke **F10**, um den Edit-Modus ein-/auszuschalten
✅ **Drag-and-Drop** - Ziehe HUD-Elemente per Maus an die gewünschte Position
✅ **Automatisches Speichern** - Positionen, Sichtbarkeit, individuelle Größen und Farbschema
✅ **Persistente Einstellungen** - Alle Einstellungen bleiben nach Neustart erhalten
✅ **Echtzeit-Updates** - Alle Werte werden live vom Spiel aktualisiert (100ms Intervall)
✅ **Minimap-Integration** - Status-Balken links neben Minimap positioniert
✅ **Transparente Backgrounds** - 50% transparent mit 3px Blur für cleane Optik

## HUD-Elemente

Das System enthält **16 professionelle HUD-Elemente** im GTA V-Stil:

### Status-Balken (Links neben Minimap)
- **HEALTH** - Lebensenergie mit roter Akzentfarbe *(Standard: Sichtbar)*
- **ARMOR** - Rüstungswert mit blauer Akzentfarbe *(Standard: Sichtbar)*
- **STAMINA** - Allgemeine Ausdauer mit orange Akzentfarbe *(Standard: Sichtbar)*
- **OXYGEN** - Atemluft unter Wasser mit cyan Akzentfarbe *(Standard: Versteckt)*
- **STRESS** - Stresslevel mit roter Akzentfarbe *(Standard: Versteckt)*
- **SPRINT** - Sprint-Energie mit grüner Akzentfarbe *(Standard: Versteckt)*
- **HUNGER** - Hungerstatus mit orange Akzentfarbe **[ESX Status]** *(Standard: Sichtbar)*
- **THIRST** - Durstlevel mit hellblauer Akzentfarbe **[ESX Status]** *(Standard: Sichtbar)*

### Geld-Anzeigen (Rechts oben)
- **CASH** - Bargeld **[ESX Account 'money']** *(Standard: Sichtbar)*
- **BANK** - Bank-Guthaben **[ESX Account 'bank']** *(Standard: Sichtbar)*

### Server-Informationen (Oben mittig)
- **SERVER** - Servername *(Standard: Sichtbar)*
- **ID** - Spieler-ID (automatisch vom Server) *(Standard: Sichtbar)*
- **COMPASS** - Himmelsrichtung (N, NE, E, SE, S, SW, W, NW) *(Standard: Sichtbar)*

### Fahrzeug & Position (Unten mittig)
- **SPEEDOMETER** - Professioneller Tacho mit Fahrzeugindikatoren *(Standard: Konditional - nur in Fahrzeugen)*
- **STREET** - Aktueller Straßenname mit Kreuzung *(Standard: Sichtbar)*
- **WEAPON** - Waffenname mit Munitionsanzeige *(Standard: Konditional - nur wenn Waffe gezogen)*

### Konditionale Anzeigen
- 🔫 **Waffen-Display** - Erscheint nur wenn Waffe gezogen *(Standard: Aktiviert)*
  - Waffenname
  - Waffen-ID
  - Munition (im Magazin / Reserve)
- 🚗 **Tacho** - Erscheint nur im Fahrzeug *(Standard: Aktiviert)*
  - Geschwindigkeit in km/h
  - Aktueller Gang
  - Farbwechsel bei hohen Geschwindigkeiten
  - Unterstützt: Auto, Motorrad, Flugzeug, Hubschrauber, Boot

## Installation

1. Lade den Ordner in dein FiveM `resources` Verzeichnis
2. Füge `ensure HUD` zu deiner `server.cfg` hinzu
3. Starte den Server neu

## Verwendung

### Einstellungspanel öffnen
1. Drücke **F10** (oder verwende den Befehl `/hudedit`)
2. Das Einstellungspanel erscheint mit:
   - Liste aller 14 HUD-Elemente zum Ein-/Ausschalten
   - 4 Farbthemen zur Auswahl
   - Anweisungen für Drag & Drop und Mausrad-Zoom

### Individual Element Scaling (NEU!)
1. Im Edit-Modus (F10 gedrückt)
2. **Maus über gewünschtes Element** bewegen
3. **Mausrad nach oben** = Element größer (bis 2.0x / 200%)
4. **Mausrad nach unten** = Element kleiner (bis 0.5x / 50%)
5. **Gelber Glow** = Visuelles Feedback beim Skalieren
6. **Jedes Element einzeln** einstellbar!
7. Wird automatisch gespeichert

### Alle Elemente in Edit-Modus sichtbar (KRITISCH!)
**Problem gelöst:** Icons verschwinden NIEMALS mehr in F10!

**Was war das Problem?**
- Wenn ein Element in den Einstellungen deaktiviert wurde (Checkbox aus)
- Verschwand es komplett - auch im Edit-Modus
- Konnte nicht mehr positioniert werden
- Frustrierend für Benutzer ❌

**Wie funktioniert es jetzt?**
- **ALLE 14 Elemente sind IMMER sichtbar im Edit-Modus (F10)**
- Deaktivierte Elemente haben:
  - 50% Transparenz (halbtransparent)
  - Roten gestrichelten Rand
  - Können trotzdem positioniert und skaliert werden
- Aktivierte Elemente: Normale Darstellung
- Im Normal-Modus (nicht F10): Nur aktivierte Elemente sichtbar

**Visuelles Feedback:**
```
Aktiviert (Checkbox ✓):
  - ✅ Normal sichtbar
  - ✅ Volle Deckkraft
  - ✅ Normaler Rand

Deaktiviert (Checkbox ✗):
  - ✅ Im F10: Halbtransparent mit rotem gestrichelten Rand
  - ❌ Im Normal-Modus: Versteckt
  - ✅ Kann trotzdem positioniert werden!
```

**Keine verschwindenden Icons mehr - GARANTIERT!** 🎉

### Edit-Modus Placeholders (NEU!)
**Problem:** Speedometer und Waffen-Display sind nur sichtbar wenn im Fahrzeug bzw. Waffe gezogen - wie positionieren?

**Lösung:** In F10 Edit-Modus werden sie als **Placeholder** angezeigt:
- ✅ Speedometer zeigt "120 km/h, D4" als Beispiel
- ✅ Waffen-Display zeigt Beispiel-Waffe
- ✅ Gelber gestrichelter Rand = Edit-Placeholder
- ✅ "Position mich!" Badge zur Orientierung
- ✅ Voll positionierbar und skalierbar
- ✅ Nach F10 Exit: Normal-Modus (nur wenn aktiv)

### Viewport-Schutz (VERSTÄRKT!)
**Problem gelöst:** Icons verschwinden nicht mehr - auch nicht beim Einstellen!

Das System garantiert, dass **ALLE** Elemente IMMER im sichtbaren Bereich bleiben:
- ✅ **8-fache Validierung** an kritischen Punkten
- ✅ Automatische Prüfung beim Laden (100ms Delay)
- ✅ Validierung beim Öffnen Edit-Modus (50ms Delay)
- ✅ Finale Prüfung vor dem Speichern
- ✅ Schutz vor negativen Positionen
- ✅ Berücksichtigt Element-Skalierung
- ✅ Element-Toggle Validierung
- ✅ Window-Resize Handler
- ✅ Elemente können NICHT verloren gehen

**Validierungs-Punkte:**
1. `loadPositions()` - Nach Laden + 100ms Delay
2. `loadElementScales()` - Nach Skalierung + 100ms Delay
3. `toggleEditMode(true)` - Beim Öffnen + 50ms Delay
4. `toggleEditMode(false)` - Vor dem Speichern (SOFORT)
5. Element Toggle - Bei Sichtbarkeitsänderung + 50ms Delay
6. Mouse Wheel - Nach Skalierung (SOFORT)
7. Window Resize - Bei Fenstergrößenänderung (SOFORT)
8. Window Load - Nach Seitenladung (SOFORT)

**Technisch:**
- `constrainElementToViewport(element)` - Hält jedes Element im Viewport
- `validateAllElementPositions()` - Prüft alle Elemente auf einmal
- Smart Timing: 0ms/50ms/100ms delays je nach Kritikalität

### HUD-Elemente wählen
1. Im Einstellungspanel siehst du alle verfügbaren Elemente
2. Aktiviere/Deaktiviere Checkboxen um Elemente ein-/auszublenden
3. **Tipp:** Die Info-Spalte fasst viele Infos kompakt zusammen
4. Einzelne Anzeigen (Cash, Bank, etc.) können versteckt werden
5. Änderungen werden automatisch gespeichert

### Farbthema wählen
1. Wähle eines der 4 verfügbaren Themen:
   - **Blau** - Klassisch, professionell (Standard)
   - **Rot** - Aggressiv, sportlich
   - **Grün** - Natürlich, modern
   - **Lila** - Futuristisch, edel
2. Das gewählte Thema wird sofort angewendet
3. Die Auswahl wird automatisch gespeichert

### Standard-Einstellungen
Beim **ersten Start** sind folgende Elemente sichtbar:
- ✅ Gesundheit, Rüstung, Ausdauer (Kreise links)
- ✅ Info-Spalte (kompakt rechts oben)
- ✅ Waffe (wenn gezogen)
- ✅ Tacho (im Fahrzeug)

**Versteckt** bis manuell aktiviert:
- ❌ Sauerstoff, Stress, Sprint (optional)
- ❌ Einzelne Cash/Bank/Server/Kompass-Anzeigen (Info-Spalte nutzen)

### HUD-Elemente positionieren
1. Klicke auf ein HUD-Element und halte die Maustaste gedrückt
2. Ziehe das Element an die gewünschte Position
3. Lasse die Maustaste los, um das Element zu platzieren
4. Wiederhole dies für alle gewünschten Elemente

### Edit-Modus beenden & Speichern
1. Drücke erneut **F10** oder klicke auf "Speichern & Beenden"
2. Die Positionen werden automatisch gespeichert
3. Das Einstellungs-Icon verschwindet
4. Der normale Spielmodus wird fortgesetzt

### Anpassung

### Keybind ändern
Bearbeite `client.lua` und ändere die Zeile:
```lua
RegisterKeyMapping('hudedit', 'Toggle HUD Edit Mode', 'keyboard', 'F10')
```

### Update-Frequenz ändern
In `client.lua`, Zeile ~75:
```lua
Wait(100) -- Update every 100ms (kann angepasst werden)
```

### Integration mit Economy-System
Ersetze in `client.lua` die Platzhalter:
```lua
-- ESX ist bereits integriert!
-- Cash und Bank werden automatisch aus ESX-Accounts geladen
-- Funktioniert mit ESX 1.2 und ESX Legacy

-- Falls anderes Framework:
cash = YourFramework.GetMoney() 
bank = YourFramework.GetBankMoney()
```

## ESX-Integration

Das HUD ist vollständig mit ESX integriert und zeigt **echte Spielerdaten**:

### Automatische ESX-Erkennung
```lua
-- Unterstützt beide ESX-Versionen
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)  -- Alt
ESX = exports['es_extended']:getSharedObject()                     -- Neu
```

### Live-Daten
- ✅ **Cash** - Aus ESX Account 'money'
- ✅ **Bank** - Aus ESX Account 'bank'
- ✅ **Spieler-ID** - Server ID
- ✅ **Auto-Updates** - Bei Kontoänderungen (esx:setAccountMoney)

### Keine Konfiguration nötig!
Das HUD erkennt ESX automatisch und lädt die Daten. Falls ESX nicht gefunden wird, werden Standard-Werte (0) angezeigt.

### Integration mit Stress-System
Ersetze in `client.lua`:
```lua
stress = 0 -- Ersetze mit deinem Stress-System, z.B.: exports['hud']:GetStress()
```

## Pause-Menü Integration

Das HUD blendet sich **automatisch aus**, wenn das Pause-Menü (ESC) geöffnet wird!

### Funktionsweise
```lua
-- client.lua prüft jede 100ms
local isPauseMenuActive = IsPauseMenuActive()

-- Sendet Status an NUI
SendNUIMessage({
    type = 'updateHUD',
    isPauseMenuActive = isPauseMenuActive,
    data = { ... }
})
```

```javascript
// html/script.js versteckt HUD
if (data.isPauseMenuActive) {
    hudContainer.style.display = 'none';  // HUD versteckt
} else {
    hudContainer.style.display = 'block'; // HUD sichtbar
}
```

### Vorteile
- ✅ **Automatisch** - Keine Konfiguration nötig
- ✅ **Echtzeit** - Reagiert sofort auf ESC
- ✅ **Clean** - Komplettes HUD wird ausgeblendet
- ✅ **Kompatibel** - Funktioniert auf allen FiveM Servern

### Native Funktion
Verwendet die GTA V Native `IsPauseMenuActive()`:
- Gibt `true` zurück wenn Pause-Menü offen ist
- Gibt `false` zurück wenn Pause-Menü geschlossen ist
- Keine zusätzlichen Abhängigkeiten

### Standard-Farbthema ändern
In `html/script.js`, Zeile ~265:
```javascript
if (!theme) theme = 'blue'; // Ändere 'blue' zu 'red', 'green' oder 'purple'
```

## Technische Details

- **Client-seitiges Script**: `client.lua` - Verwaltet Keybinds, Datenerfassung, ESX-Integration und NUI-Kommunikation
- **UI-Dateien**: `html/` - HTML/CSS/JS für das HUD-Interface
- **Speicher**: Verwendet FiveM's KVP (Key-Value-Pair) System für persistente Datenspeicherung
  - `hud_positions` - Positionen der HUD-Elemente
  - `hud_element_settings` - Sichtbarkeit der Elemente
  - `hud_theme` - Gewähltes Farbthema
  - `hud_element_scales` - **Individuelle Größe jedes Elements** (NEU!)
- **Framework**: ESX-kompatibel (automatische Erkennung von ESX 1.2 und Legacy)
- **Update-Frequenz**: 100ms (10x pro Sekunde)
- **Performance**: Optimiert für minimale CPU-Last
- **Individual Scaling**: 0.5x (50%) bis 2.0x (200%) pro Element
- **Default-Settings**: Definiert in `html/script.js` als `defaultElementSettings`

## Farbthemen

### Blau (Standard)
- Primärfarbe: `#3399ff`
- Sekundärfarbe: `#00ccff`
- Akzentfarbe: `#66b3ff`

### Rot
- Primärfarbe: `#ff3366`
- Sekundärfarbe: `#ff6600`
- Akzentfarbe: `#ff9933`

### Grün
- Primärfarbe: `#00ff66`
- Sekundärfarbe: `#00ccaa`
- Akzentfarbe: `#66ff99`

### Lila
- Primärfarbe: `#9c27b0`
- Sekundärfarbe: `#e040fb`
- Akzentfarbe: `#ba68c8`

## Problembehandlung

**HUD wird nicht angezeigt**
- Stelle sicher, dass die Resource gestartet ist (`ensure HUD` in server.cfg)
- Überprüfe die F8 Konsole auf Fehler
- Teste mit `/hudedit` ob das Panel öffnet

**Positionen werden nicht gespeichert**
- Stelle sicher, dass du den Edit-Modus mit F10 beendest
- Überprüfe die Konsole auf KVP-Speicher-Fehler
- Teste mit einem frischen Server-Start

**Elemente werden nicht aktualisiert**
- Überprüfe die F8 Konsole auf JavaScript-Fehler
- Stelle sicher, dass die Resource korrekt geladen wurde
- Prüfe ob andere Resources NUI blockieren

**Tacho wird nicht angezeigt**
- Stelle sicher, dass du im Fahrzeug sitzt
- Überprüfe, ob das Tacho-Element aktiviert ist (F10 -> Checkboxen)
- Du musst der Fahrer sein (nicht Beifahrer)

**Waffe wird nicht angezeigt**
- Stelle sicher, dass eine Waffe gezogen ist (nicht Fäuste)
- Überprüfe, ob das Waffen-Element aktiviert ist
- Teste mit verschiedenen Waffen

**Farbthema ändert sich nicht**
- Öffne F10 und wähle das gewünschte Thema erneut
- Stelle sicher, dass die Auswahl gespeichert wird (keine Konsolenfehler)
- Bei Problemen: Lösche KVP mit `/hudedit` und wähle Thema neu

**Keybind funktioniert nicht**
- Überprüfe ob eine andere Resource denselben Keybind verwendet
- Ändere den Keybind in den FiveM Einstellungen oder in `client.lua`
- Teste mit dem Befehl `/hudedit`

## Support

Bei Problemen oder Fragen, erstelle ein Issue auf GitHub.

## Lizenz

Erstellt von MTJ2024
