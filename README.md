# HUD
Modern Cyberpunk HUD System for ESX Legacy

## Features

### 🎨 Modern Design
- **Circular Progress Indicators**: Modern circular progress rings around icons instead of simple bars
- **Glass-morphism Effects**: Beautiful backdrop blur and transparency effects
- **Smooth Animations**: Fluid transitions and animations throughout the UI
- **Dynamic Colors**: Status-based color changes (e.g., speed changes color at high speeds)
- **Glow Effects**: Customizable glow effects for all elements

### 🎯 Customizable Positioning
- **Drag & Drop**: Players can freely position any HUD element on their screen
- **Persistent Storage**: Positions are saved in localStorage and restored on reload
- **Easy Reset**: One-click button to reset all positions to defaults
- **Edit Mode**: Visual editing mode with highlighted draggable areas

### 📊 Status Indicators
- Health with circular progress and icon
- Armor with circular progress and icon
- Hunger with circular progress and icon
- Thirst with circular progress and icon
- Stamina with circular progress and icon
- Oxygen (shown only when underwater) with circular progress

### 🚗 Vehicle HUD
- **Speed Display**: Large circular speedometer with dynamic color changes
  - Green/White: Normal speed
  - Orange: High speed (>120 km/h)
  - Red: Very high speed (>200 km/h)
- **RPM Indicator**: Visual bar with red warning at high RPM
- **Fuel Gauge**: Visual bar with red warning when low (<20%)
- **Gear Display**: Large animated gear indicator with smooth transitions
- **Shine Effects**: Moving highlight animations on the vehicle panel

### 💰 Money Display
- Cash and Bank balances
- Animated number counters
- Green flash on increase
- Red flash on decrease
- Modern card-style layout

### 🎙️ Voice Chat
- Visual voice indicator
- Range display (whisper/normal/shout)
- Animated bars when talking
- Positioned above minimap

### 🗺️ Location & Compass
- Street name display
- Zone/area name
- Rotating compass with cardinal directions
- Highlighted N/S markers

### ⚙️ Settings Panel
- **Open Settings**: Press `F8` or click the gear icon (⚙️)
- **Toggle Edit Mode**: Enable/disable drag-and-drop positioning
- **Style Options**:
  - Toggle modern icons on/off
  - Toggle glow effects on/off
- **Reset Positions**: Restore default layout

## Keybindings

- `F6`: Toggle Cinematic Mode
- `F7`: Toggle HUD visibility
- `F8`: Open HUD Settings

## Installation

1. Place the `HUD` folder in your resources directory
2. Add `ensure HUD` to your `server.cfg`
3. Restart your server

## Configuration

Edit `config.lua` to customize:

```lua
-- Update rate (milliseconds)
Config.RefreshRate = 200

-- Toggle features
Config.ShowCompass = true
Config.ShowStreetName = true
Config.ShowVoiceChat = true
Config.ShowMinimap = true

-- Status bars
Config.ShowHealth = true
Config.ShowArmor = true
Config.ShowHunger = true
Config.ShowThirst = true
Config.ShowStamina = true
Config.ShowOxygen = true

-- Vehicle HUD
Config.ShowVehicleHud = true
Config.SpeedUnit = 'kmh' -- 'kmh' or 'mph'
Config.ShowFuel = true
Config.ShowSeatbelt = true

-- Customize colors (RGB)
Config.Colors = {
    health = {r = 220, g = 20, b = 60},
    armor = {r = 192, g = 192, b = 192},
    -- ... more colors
}
```

## Credits

- Modern UI design inspired by cyberpunk aesthetics
- Built for ESX Legacy framework
- Uses Orbitron and Rajdhani fonts from Google Fonts

## License

See LICENSE file for details.

