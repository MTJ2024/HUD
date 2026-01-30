# 🚁 Related Projects

## Lufttaxi UI System

This HUD system is part of a larger project. The complete helicopter taxi management system with garage and notification components can be found here:

**Repository:** https://github.com/MTJ2024/Lufttaxi/tree/neues-ui-haupt-und-garage-rohfassung

### Included Components:

#### 1. 🎮 Main Management UI
- **File:** `App.tsx`
- **Features:**
  - Dashboard with company statistics
  - Employee management
  - Helicopter fleet management
  - Appointment scheduling
  - Financial management
  - Live player list
  - AI-powered business advice

#### 2. 🚁 Garage Interface
- **Folder:** `garagen ui/`
- **Features:**
  - Helicopter selection
  - Landing pad selection (3 pads)
  - Spawn functionality
  - Vehicle details

#### 3. 📢 Notification System
- **Component:** `components/Notify.tsx`
- **Features:**
  - Access denied notifications
  - System messages
  - Error display

### Technology Stack:

```
- React + TypeScript
- Tailwind CSS
- Lucide Icons
- Recharts (for charts)
- Vite (Build Tool)
```

### Integration with this HUD:

The current HUD system (`MTJ2024/HUD`) displays player information:
- Health, armor, hunger, thirst
- Vehicle speed (car/boat/aircraft)
- Minimap and location
- Time

The Lufttaxi system extends this with:
- Business management
- Garage interface
- Notifications

### Usage:

#### For Server Owners:

1. **Install this HUD** (basic HUD for all players)
   ```bash
   cd resources
   git clone https://github.com/MTJ2024/HUD.git greenzone420_hud
   ```

2. **Install Lufttaxi System** (for helicopter taxi business)
   ```bash
   cd resources
   git clone -b neues-ui-haupt-und-garage-rohfassung https://github.com/MTJ2024/Lufttaxi.git lufttaxi_system
   ```

3. **Add to server.cfg:**
   ```cfg
   ensure greenzone420_hud
   ensure lufttaxi_system
   ```

### Development:

The Lufttaxi system is a React/TypeScript project:

```bash
cd Lufttaxi
npm install
npm run dev
```

For the Garage UI:
```bash
cd "garagen ui"
npm install
npm run dev
```

### Screenshots / Preview:

**Main Management:**
- Dashboard with statistics
- Employee and fleet management
- Financial overview

**Garage UI:**
- Helicopter selection
- Landing pad selection
- Spawn button

**Notify:**
- Access control
- Error messages

### License:

Both projects created by **MTJ2024** for **GreenZone420**.

---

## Developer Notes:

### NUI Integration:

The Lufttaxi system uses NUI (Native UI) for FiveM:

```lua
-- Open main management
RegisterCommand('lufttaxi', function()
    SendNUIMessage({
        action = 'openManagement'
    })
    SetNuiFocus(true, true)
end)

-- Open garage
RegisterCommand('heligarage', function()
    SendNUIMessage({
        action = 'openGarage'
    })
    SetNuiFocus(true, true)
end)
```

### Bridge Events:

```javascript
// From Lua to React
window.addEventListener('message', (event) => {
    if (event.data.action === 'openManagement') {
        // Open management UI
    }
    if (event.data.action === 'updateStats') {
        // Update statistics
    }
});

// From React to Lua
fetch(`https://${GetParentResourceName()}/spawnHeli`, {
    method: 'POST',
    body: JSON.stringify({
        heliId: 'maverick',
        padId: 1
    })
});
```

### Database Integration:

The system can be integrated with MySQL/OxMySQL:

```lua
-- Load company data
exports.oxmysql:execute('SELECT * FROM helitaxi_company WHERE id = ?', {companyId}, function(result)
    -- Send to NUI
end)

-- Save transaction
exports.oxmysql:insert('INSERT INTO helitaxi_transactions (type, amount) VALUES (?, ?)', {
    'flight', 5000
})
```

---

## Support:

For questions about both systems:
- Open GitHub issues
- Read documentation
- Contact MTJ2024

**Created by MTJ2024 for GreenZone420** 🌿
