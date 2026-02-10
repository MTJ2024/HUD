# HUD System

Ein hochmodernes, anpassbares HUD-System für FiveM mit kreisförmigen Anzeigen, **individueller Element-Skalierung**, Drag-and-Drop-Positionierung und **ESX-Integration**.

## Features

✅ **Moderne Kreisförmige Anzeigen** - Runde, hochmoderne Icons statt traditioneller Balken
✅ **Individual Element Scaling** - Jedes Element EINZELN mit Mausrad skalierbar (0.5x - 2.0x)
✅ **ESX-Integration** - Echte Daten von ESX (Cash, Bank, Spieler-ID)
✅ **Info-Spalte** - Kompakte Übersicht für Cash, Bank, Server, ID, Kompass, Straße
✅ **14 Wählbare HUD-Elemente** - Jedes Element kann einzeln ein-/ausgeblendet werden
✅ **Sinnvolle Defaults** - Cleanes Standard-Layout beim ersten Start
✅ **4 Farbthemen** - Blau, Rot, Grün, Lila
✅ **Toggle Edit-Modus** - Drücke **F10**, um den Edit-Modus ein-/auszuschalten
✅ **Drag-and-Drop** - Ziehe HUD-Elemente per Maus an die gewünschte Position
✅ **Automatisches Speichern** - Positionen, Sichtbarkeit, individuelle Größen und Farbschema
✅ **Persistente Einstellungen** - Alle Einstellungen bleiben nach Neustart erhalten
✅ **Echtzeit-Updates** - Alle Werte werden live vom Spiel aktualisiert
✅ **Tacho für Fahrzeuge** - Clean, zentrierter Tacho für Auto, Flugzeug, Hubschrauber

## HUD-Elemente

Das System enthält folgende wählbare HUD-Elemente:

### Kreisförmige Anzeigen
- ❤️ **Gesundheit** (Health) - Lebensenergie in Prozent *(Standard: Sichtbar)*
- 🛡️ **Rüstung** (Armor) - Rüstungswert in Prozent *(Standard: Sichtbar)*
- ⚡ **Ausdauer** (Stamina) - Allgemeine Ausdauer *(Standard: Sichtbar)*
- 🫁 **Sauerstoff** (Oxygen) - Atemluft unter Wasser *(Standard: Versteckt)*
- 😰 **Stress** - Stresslevel *(Standard: Versteckt)*
- 🏃 **Sprint-Energie** - Verbleibende Sprint-Ausdauer *(Standard: Versteckt)*

### Info-Spalte *(MIT ESX-DATEN!)*
📊 **Info-Spalte** - Kompakte Übersicht in einer Spalte *(Standard: Sichtbar)*
- 💵 Cash - **Echtes Bargeld aus ESX Account** (live)
- 🏦 Bank - **Echtes Bank-Guthaben aus ESX Account** (live)
- 🖥️ Server - Name des Servers
- 🆔 ID - **Echte Spieler-ID vom Server** (automatisch)
- 🧭 Kompass - Himmelsrichtung (live: N, NE, E, SE, S, SW, W, NW)
- 📍 Straße - Aktueller Straßenname mit Kreuzung (live)

### Einzelne Informations-Anzeigen
- 💵 **Bargeld** (Cash) - Einzelanzeige *(Standard: Versteckt, nutze Info-Spalte)*
- 🏦 **Bank** - Einzelanzeige *(Standard: Versteckt, nutze Info-Spalte)*
- 🖥️ **Server Name** - Einzelanzeige *(Standard: Versteckt, nutze Info-Spalte)*
- 🧭 **Kompass** - Einzelanzeige *(Standard: Versteckt, nutze Info-Spalte)*
- 📍 **Straßenname** - Einzelanzeige *(Standard: Versteckt, nutze Info-Spalte)*

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
