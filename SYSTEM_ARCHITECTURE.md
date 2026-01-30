# 🏗️ System Architecture / Systemarchitektur

## GreenZone420 Ecosystem Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    GreenZone420 FiveM Server                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
        ▼                                           ▼
┌───────────────────┐                    ┌──────────────────────┐
│   HUD System      │                    │  Lufttaxi System     │
│  (Dieses Repo)    │                    │  (Lufttaxi Repo)     │
└───────────────────┘                    └──────────────────────┘
        │                                           │
        │                                           │
        ▼                                           ▼
┌───────────────────┐                    ┌──────────────────────┐
│  Für ALLE Spieler │                    │ Nur für Helitaxi     │
│                   │                    │ Mitarbeiter          │
│  • Gesundheit     │                    │                      │
│  • Panzerung      │                    │ • Management UI      │
│  • Hunger/Durst   │                    │ • Garagen-Interface  │
│  • Ausdauer       │                    │ • Benachrichtigungen │
│  • Fahrzeug-Tacho │                    │ • Flottenmanagement  │
│  • Minimap        │                    │ • Finanzverwaltung   │
│  • Standort       │                    │ • Mitarbeiterverwalt.│
│  • Zeit           │                    │ • Terminplanung      │
└───────────────────┘                    └──────────────────────┘
```

## Integration Flow / Integrationsablauf

### 1. Basic Player HUD (Always Active)

```
┌──────────────────┐
│  Player spawnt   │
│  auf Server      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  HUD System      │
│  aktiviert       │
│  automatisch     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Zeigt:          │
│  • HP/Armor      │
│  • Hunger/Thirst │
│  • Vehicle Speed │
│  • Location      │
└──────────────────┘
```

### 2. Helitaxi Employee (Job-Based)

```
┌──────────────────┐
│  Spieler hat     │
│  Helitaxi Job    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Zusätzliche     │
│  UI-Systeme      │
│  verfügbar       │
└────────┬─────────┘
         │
         ├──────────────┐
         │              │
         ▼              ▼
┌──────────────┐  ┌──────────────┐
│ Management   │  │ Garage UI    │
│ Dashboard    │  │              │
│ /lufttaxi    │  │ /heligarage  │
└──────────────┘  └──────────────┘
```

## Command Structure / Befehlsstruktur

### HUD System (Immer aktiv / Always active)
```lua
-- Keine Befehle - Läuft automatisch
-- No commands - Runs automatically

-- Nur Konfiguration in config.lua
Config.EnableHUD = true
Config.ShowHealth = true
Config.EnableCarSpeedometer = true
-- etc.
```

### Lufttaxi System (Job-basiert / Job-based)
```lua
-- Management öffnen / Open management
/lufttaxi

-- Garage öffnen / Open garage  
/heligarage

-- Kinomodus (HUD ausblenden)
/cinematicmode
-- oder / or
F9
```

## Data Flow / Datenfluss

### HUD System → Game State
```lua
-- Client liest Game Natives
local health = GetEntityHealth(PlayerPedId())
local armor = GetPedArmour(PlayerPedId())
local vehicle = GetVehiclePedIsIn(PlayerPedId())

-- Sendet an NUI
SendNUIMessage({
    action = "updateHUD",
    data = {
        health = health,
        armor = armor,
        speed = speed
    }
})
```

### Lufttaxi System → Database
```lua
-- Lädt Firmendaten aus DB
exports.oxmysql:execute('SELECT * FROM helitaxi_company')

-- Speichert Transaktionen
exports.oxmysql:insert('INSERT INTO helitaxi_transactions ...')

-- Update NUI
SendNUIMessage({
    action = "updateStats",
    data = companyData
})
```

## File Structure Comparison / Dateistruktur-Vergleich

### HUD System
```
greenzone420_hud/
├── fxmanifest.lua          # FiveM Manifest
├── config.lua              # Konfiguration
├── client/
│   └── main.lua            # Client-seitige Logik
└── html/
    ├── index.html          # UI Struktur
    ├── style.css           # Styling
    └── script.js           # UI Logik (Vanilla JS)
```

### Lufttaxi System
```
lufttaxi_system/
├── fxmanifest.lua          # FiveM Manifest
├── client.lua              # Client Callbacks
├── server.lua              # Server Logic
├── html/
│   ├── App.tsx             # React Main App
│   ├── components/         # React Components
│   ├── constants.ts        # Konfiguration
│   └── types.ts            # TypeScript Types
└── garagen ui/
    ├── App.tsx             # Garage Interface
    └── components/         # Garage Components
```

## Technology Stack / Technologie-Stack

### HUD System (Einfach / Simple)
```
✓ Vanilla JavaScript
✓ Vanilla CSS
✓ HTML5
✓ Lua (FiveM)
✓ ESX Framework
```

### Lufttaxi System (Advanced)
```
✓ React + TypeScript
✓ Tailwind CSS
✓ Vite Build System
✓ Lucide Icons
✓ Recharts
✓ Lua (FiveM)
✓ ESX Framework
✓ MySQL/OxMySQL
```

## Resource Load Order / Lade-Reihenfolge

```cfg
# server.cfg

# 1. Framework
ensure es_extended
ensure esx_menu
ensure esx_status

# 2. Basic HUD (für alle)
ensure greenzone420_hud

# 3. Job-spezifische Systeme
ensure lufttaxi_system

# 4. Andere Resources
ensure andere_resources
```

## Performance Impact / Performance-Auswirkung

### HUD System
```
Ressourcen-Nutzung: ~0.03-0.05ms
Speicher: ~2-3 MB
Netzwerk: Minimal (nur lokale Daten)
```

### Lufttaxi System
```
Ressourcen-Nutzung: ~0.10-0.15ms (wenn UI offen)
Speicher: ~10-15 MB (React App)
Netzwerk: Moderat (DB-Abfragen, NUI-Updates)
```

## Use Cases / Anwendungsfälle

### Szenario 1: Normaler Spieler
```
✓ HUD System aktiv
✗ Lufttaxi System nicht verfügbar
→ Sieht nur grundlegende Spieler-Stats
```

### Szenario 2: Helitaxi Mitarbeiter
```
✓ HUD System aktiv
✓ Lufttaxi System verfügbar
→ Sieht Spieler-Stats + kann Business verwalten
```

### Szenario 3: Helitaxi Boss
```
✓ HUD System aktiv
✓ Lufttaxi Management voll verfügbar
→ Alle Features + Admin-Funktionen
```

## API Integration / API-Integration

### HUD System Exports
```lua
-- Andere Resources können HUD steuern
exports['greenzone420_hud']:SetHudVisible(false)
exports['greenzone420_hud']:UpdateCustomElement(data)
```

### Lufttaxi System Exports
```lua
-- Andere Resources können Lufttaxi-Daten abrufen
local companyData = exports['lufttaxi_system']:GetCompanyData()
local helis = exports['lufttaxi_system']:GetFleet()
```

---

**Erstellt von MTJ2024 für GreenZone420** 🌿
