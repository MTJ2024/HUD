# 🚒 Modern Feuerwehr HUD für ESX Legacy

Ein modernes, stylisches und performantes HUD für FiveM ESX Legacy Server im **Feuerwehr-Design** mit Rot, Silber und Weiß.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![FiveM](https://img.shields.io/badge/FiveM-Ready-green.svg)
![ESX](https://img.shields.io/badge/ESX-Legacy-orange.svg)
![Design](https://img.shields.io/badge/Design-Feuerwehr-red.svg)

## 📐 HUD Layout

```
┌─────────────────────────────────────────────────┐
│          🧭 Navigation (Kompass + Straße)       │
│                                        💰 Geld  │
│                                                 │
│  🎤 Voice                                       │
│  (hoch über                                     │
│   Minimap)                            ❤️ Status │
│                    🚗 Tacho              Bars   │
│ 📍Minimap                                       │
│ (Ecke)                                          │
└─────────────────────────────────────────────────┘
```

**Minimap-freundlich:** Voice Chat sitzt **deutlich über** der Minimap,
damit die untere linke Ecke komplett frei bleibt!

## ✨ Features

### 🎯 Status Anzeigen (Rechts Unten)
- **Health** - Gesundheitsanzeige mit dynamischer Farbgebung
- **Armor** - Rüstungsanzeige (versteckt sich bei 0%)
- **Hunger** - Hungeranzeige mit ESX Status Integration
- **Thirst** - Durstandzeige mit ESX Status Integration
- **Stamina** - Ausdaueranzeige
- **Oxygen** - Sauerstoffanzeige (nur unter Wasser sichtbar)

### 💰 Geld System (Rechts Oben)
- Bargeld-Anzeige mit Echtzeit-Updates
- Bank-Kontostand
- Animierte Übergänge bei Änderungen
- Neon-Glow Effekte

### 🚗 Fahrzeug HUD (Zentral Unten)
- **Tacho** - Breites Panorama-Design, flach und übersichtlich
- **Kraftstoff** - Füllstandsanzeige mit Warnungen bei niedrigem Level (Feuerwehr-Rot)
- **Drehzahl (RPM)** - Motor-Drehzahlanzeige in Weiß
- **Gang** - Große Gangschaltung-Anzeige (R/N/1-6)
- Unterstützung für KM/H und MPH
- Kompatibel mit LegacyFuel

### 🧭 Navigation (Zentral Oben)
- **Kompass** - Animierter 360° Kompass
- **Straßennamen** - Aktuelle Straße und Kreuzung
- **Zone** - Aktueller Stadtbezirk
- Smooth Animationen

### 🎤 Voice Chat Integration (Links Unten, über Minimap)
- Voice Range Indicator (Flüstern/Normal/Rufen)
- Sprechanimation mit pulsierenden Balken
- Kompatibel mit pma-voice

### 🎬 Cinematic Mode
- Toggle mit F6 (anpassbar)
- Schwarze Balken oben/unten
- Ausblenden der Minimap
- Reduzierte HUD-Opazität

## 📦 Installation

1. **Download** - Lade das `esx_modernhud` Verzeichnis herunter

2. **Resource Ordner** - Kopiere den Ordner in deinen FiveM `resources` Ordner:
   ```
   server-data/resources/[esx]/esx_modernhud/
   ```

3. **Server.cfg** - Füge folgende Zeile zu deiner `server.cfg` hinzu:
   ```cfg
   ensure esx_modernhud
   ```

4. **Standard HUD ausblenden** - Füge dies zu deiner `server.cfg` oder einer Client-Resource hinzu:
   ```lua
   -- Verstecke Standard GTA HUD Elemente
   CreateThread(function()
       while true do
           Wait(0)
           HideHudComponentThisFrame(1)  -- Wanted Stars
           HideHudComponentThisFrame(2)  -- Weapon Icon
           HideHudComponentThisFrame(3)  -- Cash
           HideHudComponentThisFrame(4)  -- MP Cash
           HideHudComponentThisFrame(6)  -- Vehicle Name
           HideHudComponentThisFrame(7)  -- Area Name
           HideHudComponentThisFrame(8)  -- Vehicle Class
           HideHudComponentThisFrame(9)  -- Street Name
           HideHudComponentThisFrame(13) -- Cash Change
           HideHudComponentThisFrame(17) -- Save Game
           HideHudComponentThisFrame(20) -- Weapon Stats
       end
   end)
   ```

5. **Server Neustarten** - Starte deinen FiveM Server neu

## ⚙️ Konfiguration

Bearbeite die `config.lua` um das HUD anzupassen:

```lua
Config = {}

-- HUD Update Rate (ms)
Config.RefreshRate = 200

-- Feature Toggles
Config.ShowCompass = true
Config.ShowStreetName = true
Config.ShowVoiceChat = true
Config.ShowMinimap = true

-- Status Bars
Config.ShowHealth = true
Config.ShowArmor = true
Config.ShowHunger = true
Config.ShowThirst = true
Config.ShowStamina = true
Config.ShowOxygen = true

-- Fahrzeug Einstellungen
Config.ShowVehicleHud = true
Config.SpeedUnit = 'kmh' -- 'kmh' oder 'mph'
Config.ShowFuel = true

-- Cinematic Mode
Config.CinematicKey = 'F6'

-- Feuerwehr Farben (RGB)
Config.Colors = {
    health = {r = 220, g = 20, b = 60},    -- Crimson Rot
    armor = {r = 192, g = 192, b = 192},   -- Silber
    hunger = {r = 255, g = 69, b = 0},     -- Orange-Rot
    thirst = {r = 176, g = 196, b = 222},  -- Hell-Silber-Blau
    stamina = {r = 255, g = 255, b = 255}, -- Weiß
    oxygen = {r = 169, g = 169, b = 169},  -- Dunkel-Grau
    speed = {r = 220, g = 20, b = 60},     -- Crimson Rot
    fuel = {r = 255, g = 0, b = 0}         -- Feuerwehr-Rot
}
```

## 🎮 Steuerung

| Taste | Aktion |
|-------|--------|
| **F6** | Cinematic Mode Ein/Aus |
| **F7** | HUD Ein/Aus |

## 🔧 Abhängigkeiten

### Erforderlich:
- ✅ **es_extended** (ESX Legacy)
- ✅ **esx_status** (Hunger/Durst)

### Optional:
- 🔶 **LegacyFuel** (Für Kraftstoffanzeige)
- 🔶 **pma-voice** (Für Voice Chat Anzeige)

## 🎨 Design Features

- **Feuerwehr-Farbschema** - Crimson-Rot, Silber & Weiß
- **Breiter Tacho** - Panorama-Design, flach und übersichtlich
- **Glassmorphismus** - Moderne glasartige Oberflächen mit Blur-Effekt
- **Smooth Animationen** - Flüssige Übergänge und Bewegungen
- **Performance-optimiert** - Minimale FPS-Einbußen
- **Responsive Design** - Skaliert automatisch für verschiedene Auflösungen
- **Custom Fonts** - Rajdhani & Orbitron für professionellen Look

## 📊 Performance

- **CPU:** ~0.01ms average
- **Memory:** ~5MB
- **Optimiert** mit will-change CSS Properties
- **Throttled Updates** für bessere Performance

## 🎯 Kompatibilität

- ✅ FiveM Build 2802+
- ✅ ESX Legacy 1.8.0+
- ✅ Alle Auflösungen (1920x1080 empfohlen)
- ✅ Alle Screen-Formate (16:9, 21:9, etc.)

## 🔄 Updates & Support

### Geplante Features:
- [ ] Job-spezifische HUD-Anzeigen
- [ ] Weitere Farbschemas
- [ ] Animations-Optionen
- [ ] Discord Integration
- [ ] Minimap Customization

## 📝 Credits

**Designed & Developed by:** [Your Name]
**Framework:** ESX Legacy
**Design:** Feuerwehr-inspiriert (Rot, Silber, Weiß)
**Theme:** Professional Emergency Services

## 📄 Lizenz

Dieses HUD ist frei verwendbar für persönliche und kommerzielle FiveM Server.
Weitergabe mit Credits erwünscht.

---

## 🐛 Troubleshooting

### HUD wird nicht angezeigt?
1. Prüfe ob `ensure esx_modernhud` in der server.cfg steht
2. Checke die F8 Console auf Fehler
3. Stelle sicher dass ESX richtig läuft

### Farben stimmen nicht?
- Passe die `Config.Colors` in der config.lua an
- RGB Werte von 0-255

### Performance Probleme?
- Erhöhe `Config.RefreshRate` auf 300-500ms
- Deaktiviere nicht benötigte Features in der Config

### Fuel wird nicht angezeigt?
- Installiere LegacyFuel oder ein kompatibles Fuel-Script
- Das HUD funktioniert auch ohne, zeigt dann 0% an

---

**Viel Spaß mit deinem neuen HUD! 🎮✨**
