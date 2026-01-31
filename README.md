# GreenZone420 HUD

Ein professionelles HUD-System für **ESX Legacy FiveM GTA V RP Server**.

## Kompatibilität

✅ **ESX Legacy 1.8.0+** (empfohlen: 1.9.0+)  
✅ **FiveM** neueste Version  
✅ **GTA V** Roleplay Server  

## Features

### Spieler-Informationen
- 💚 Gesundheit mit kritischer Warnung
- 🛡️ Panzerung  
- 🍔 Hunger (esx_status)
- 💧 Durst (esx_status)
- ⚡ Ausdauer

### Geld & Job
- 💵 Bargeld-Anzeige (ESX accounts)
- 🏦 Bank-Kontostand (ESX accounts)
- 💼 Job-Name und Rang

### Fahrzeuge
- 🚗 Auto-Tachometer (KMH/MPH)
- 🚤 Boot-Tachometer
- ✈️ Flugzeug-Tachometer
- ⛽ Tankstand
- 🔧 Motor-Zustand

### Waffen
- 🔫 Aktuelle Waffe
- 🎯 Munition (Magazin / Gesamt)

### Navigation
- 📍 Straßenname
- 🗺️ Zone/Gebiet
- 🕐 Echtzeit-Uhr
- 🌿 Server-Name (GREENZONE420)

## Installation

1. Lade das Repository herunter
2. **WICHTIG:** Benenne den Ordner zu `greenzone420_hud` um (KEINE Klammern `[]`!)
3. Kopiere in `resources/greenzone420_hud/`
4. Füge in `server.cfg` hinzu: `ensure greenzone420_hud`
5. **Stelle sicher, dass ESX gestartet ist:** `ensure es_extended`
6. Konfiguriere in `config.lua` nach deinen Wünschen
7. Starte den Server neu: `restart greenzone420_hud`

## ESX Legacy Abhängigkeiten

Dieses HUD benötigt:
- **es_extended** (ESX Legacy Core)
- **esx_status** (für Hunger/Durst) - optional aber empfohlen

## Konfiguration

Alle Einstellungen findest du in `config.lua`:

```lua
Config.ServerName = "GreenZone420"  -- Dein Server-Name
Config.SpeedUnit = "KMH"            -- "KMH" oder "MPH"
Config.UpdateInterval = 100         -- Update-Intervall (ms)
Config.ShowHealth = true            -- Alle Features togglebar
```

## Design

- **GTA V Online Style** - Clean, professionell
- **Keine Minimap-Überlagerung** - Status-Balken links (vertikal)
- **Responsive Layout** - Alles perfekt positioniert
- **Performance-optimiert** - <0.05ms Impact

## Support

Bei Problemen:
1. Prüfe ob ESX Legacy korrekt läuft
2. Prüfe ob der Ordner NICHT `[HUD]` heißt
3. Prüfe die F8-Konsole auf Fehler
4. Starte den Server neu

## Copyright

© 2024 MTJ2024  
Alle Rechte vorbehalten.

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe LICENSE Datei.

---

🌿 **Erstellt von MTJ2024 für GreenZone420**  
**Optimiert für ESX Legacy FiveM GTA V RP Server**
