# 🚁 Verwandte Projekte / Related Projects

## Lufttaxi UI System

Dieses HUD-System ist Teil eines größeren Projekts. Die komplette Lufttaxi-Verwaltung mit Garage und Benachrichtigungssystem findest du hier:

**Repository:** https://github.com/MTJ2024/Lufttaxi/tree/neues-ui-haupt-und-garage-rohfassung

### Enthaltene Komponenten / Included Components:

#### 1. 🎮 Hauptverwaltung (Main Management UI)
- **Datei:** `App.tsx`
- **Features:**
  - Dashboard mit Unternehmensstatistiken
  - Mitarbeiterverwaltung
  - Hubschrauber-Flottenverwaltung
  - Terminplanung
  - Finanzverwaltung
  - Live-Spielerliste
  - KI-gestützte Geschäftsberatung

#### 2. 🚁 Garagen-UI (Garage Interface)
- **Ordner:** `garagen ui/`
- **Features:**
  - Hubschrauber-Auswahl
  - Startplatz-Wahl (3 Pads)
  - Spawn-Funktionalität
  - Fahrzeugdetails

#### 3. 📢 Benachrichtigungssystem (Notification System)
- **Komponente:** `components/Notify.tsx`
- **Features:**
  - Zugriffsverweigerung
  - System-Meldungen
  - Fehleranzeige

### Technologie / Technology Stack:

```
- React + TypeScript
- Tailwind CSS
- Lucide Icons
- Recharts (für Diagramme)
- Vite (Build Tool)
```

### Integration mit diesem HUD / Integration with this HUD:

Das aktuelle HUD-System (`MTJ2024/HUD`) zeigt Spielerinformationen an:
- Gesundheit, Panzerung, Hunger, Durst
- Fahrzeuggeschwindigkeit (Auto/Boot/Flugzeug)
- Minimap und Standort
- Zeit

Das Lufttaxi-System erweitert dies um:
- Geschäftsverwaltung
- Garagen-Interface
- Benachrichtigungen

### Verwendung / Usage:

#### Für Server-Owner:

1. **Dieses HUD installieren** (grundlegendes HUD für alle Spieler)
   ```bash
   cd resources
   git clone https://github.com/MTJ2024/HUD.git greenzone420_hud
   ```

2. **Lufttaxi-System installieren** (für Lufttaxi-Business)
   ```bash
   cd resources
   git clone -b neues-ui-haupt-und-garage-rohfassung https://github.com/MTJ2024/Lufttaxi.git lufttaxi_system
   ```

3. **In server.cfg hinzufügen:**
   ```cfg
   ensure greenzone420_hud
   ensure lufttaxi_system
   ```

### Entwicklung / Development:

Das Lufttaxi-System ist ein React/TypeScript Projekt:

```bash
cd Lufttaxi
npm install
npm run dev
```

Für die Garage-UI:
```bash
cd "garagen ui"
npm install
npm run dev
```

### Screenshots / Preview:

**Hauptverwaltung:**
- Dashboard mit Statistiken
- Mitarbeiter- und Flottenverwaltung
- Finanzübersicht

**Garagen-UI:**
- Hubschrauber-Auswahl
- Startplatz-Selektion
- Spawn-Button

**Notify:**
- Zugriffskontrolle
- Fehlermeldungen

### Lizenz / License:

Beide Projekte von **MTJ2024** erstellt für **GreenZone420**.

---

## Hinweise für Entwickler / Developer Notes:

### NUI Integration:

Das Lufttaxi-System nutzt NUI (Native UI) für FiveM:

```lua
-- Öffne Hauptverwaltung
RegisterCommand('lufttaxi', function()
    SendNUIMessage({
        action = 'openManagement'
    })
    SetNuiFocus(true, true)
end)

-- Öffne Garage
RegisterCommand('heligarage', function()
    SendNUIMessage({
        action = 'openGarage'
    })
    SetNuiFocus(true, true)
end)
```

### Bridge-Events:

```javascript
// Von Lua zu React
window.addEventListener('message', (event) => {
    if (event.data.action === 'openManagement') {
        // Öffne Management UI
    }
    if (event.data.action === 'updateStats') {
        // Update Statistiken
    }
});

// Von React zu Lua
fetch(`https://${GetParentResourceName()}/spawnHeli`, {
    method: 'POST',
    body: JSON.stringify({
        heliId: 'maverick',
        padId: 1
    })
});
```

### Datenbankintegration:

Das System kann mit MySQL/OxMySQL integriert werden:

```lua
-- Lade Firmen-Daten
exports.oxmysql:execute('SELECT * FROM helitaxi_company WHERE id = ?', {companyId}, function(result)
    -- Sende zu NUI
end)

-- Speichere Transaktion
exports.oxmysql:insert('INSERT INTO helitaxi_transactions (type, amount) VALUES (?, ?)', {
    'flight', 5000
})
```

---

## Support / Unterstützung:

Bei Fragen zu beiden Systemen:
- GitHub Issues öffnen
- Dokumentation lesen
- MTJ2024 kontaktieren

**Erstellt von MTJ2024 für GreenZone420** 🌿
