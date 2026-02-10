# HUD System

Ein anpassbares HUD-System für FiveM mit Drag-and-Drop-Positionierung.

## Features

✅ **Kein dauerhaftes Einstellungs-Icon** - Das Einstellungs-Icon (⚙️) wird nur im Edit-Modus angezeigt
✅ **Toggle Edit-Modus** - Drücke **F10**, um den Edit-Modus ein-/auszuschalten
✅ **Drag-and-Drop** - Ziehe HUD-Elemente per Maus an die gewünschte Position
✅ **Automatisches Speichern** - Positionen werden automatisch gespeichert beim Verlassen des Edit-Modus
✅ **Persistente Positionen** - Gespeicherte Positionen bleiben nach Neustart erhalten

## HUD-Elemente

Das System enthält folgende HUD-Elemente:
- ❤️ **Health Bar** (Gesundheit)
- 🛡️ **Armor Bar** (Rüstung)
- ⚡ **Stamina Bar** (Ausdauer)
- 💰 **Money Display** (Geld)
- 📍 **Location Display** (Standort)

## Installation

1. Lade den Ordner in dein FiveM `resources` Verzeichnis
2. Füge `ensure HUD` zu deiner `server.cfg` hinzu
3. Starte den Server neu

## Verwendung

### Edit-Modus aktivieren
1. Drücke **F10** (oder verwende den Befehl `/hudedit`)
2. Das Einstellungs-Icon (⚙️) erscheint oben links
3. Ein Overlay mit Anweisungen wird angezeigt
4. Alle HUD-Elemente bekommen einen gelben gestrichelten Rahmen

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

## Anpassung

### Keybind ändern
Bearbeite `client.lua` und ändere die Zeile:
```lua
RegisterKeyMapping('hudedit', 'Toggle HUD Edit Mode', 'keyboard', 'F10')
```

### HUD-Elemente hinzufügen
1. Füge ein neues Element in `html/index.html` hinzu
2. Style es in `html/style.css`
3. Optional: Aktualisiere die Drag-Logik in `html/script.js`

### Standard-Positionen ändern
Bearbeite die CSS-Regeln in `html/style.css`:
```css
#health-bar {
    bottom: 20px;
    left: 20px;
}
```

## Technische Details

- **Client-seitiges Script**: `client.lua` - Verwaltet Keybinds und Kommunikation
- **UI-Dateien**: `html/` - HTML/CSS/JS für das HUD-Interface
- **Speicher**: Verwendet FiveM's KVP (Key-Value-Pair) System für persistente Datenspeicherung
- **Framework**: Standalone (keine ESX/QB-Core Abhängigkeiten erforderlich)

## Problembehandlung

**HUD wird nicht angezeigt**
- Stelle sicher, dass die Resource gestartet ist (`ensure HUD` in server.cfg)
- Überprüfe die F8 Konsole auf Fehler

**Positionen werden nicht gespeichert**
- Stelle sicher, dass du den Edit-Modus mit F10 beendest (nicht einfach die Seite neu lädt)
- Überprüfe die Konsole auf Fehler bei der KVP-Speicherung

**Keybind funktioniert nicht**
- Überprüfe ob eine andere Resource denselben Keybind verwendet
- Ändere den Keybind in den FiveM Einstellungen oder in `client.lua`

## Support

Bei Problemen oder Fragen, erstelle ein Issue auf GitHub.

## Lizenz

Erstellt von MTJ2024
