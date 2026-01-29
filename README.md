# 🌿 GreenZone420 Professional HUD System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-green)
![FiveM](https://img.shields.io/badge/FiveM-ESX%20Legacy-blue)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

**Professional HUD System for FiveM ESX Legacy Servers**

Created by **MTJ2025** for GreenZone420

</div>

---

## 📋 Features

### ✨ Core Features
- **Fully Configurable** - All features can be enabled/disabled via config.lua
- **ESX Legacy Compatible** - Designed specifically for ESX Legacy servers
- **Performance Optimized** - Minimal resource usage with smooth animations
- **Modern UI Design** - Clean, professional interface with GreenZone420 branding

### 🚗 Vehicle Systems
- **Car/Motorcycle Speedometer** - Display speed in KMH or MPH
- **Boat Speedometer** - Specialized speedometer for watercraft
- **Aircraft Speedometer** - Aviation speedometer for helicopters and planes
- **Fuel Indicator** - Real-time fuel level display
- **Engine Health** - Monitor vehicle condition

### 👤 Player Stats
- **Health Bar** - Visual health indicator
- **Armor Bar** - Shield/armor display
- **Hunger Bar** - Food level (requires esx_status)
- **Thirst Bar** - Hydration level (requires esx_status)
- **Stamina Bar** - Sprint stamina indicator

### 🗺️ Location & Time
- **Custom Minimap** - Rounded, styled minimap
- **Street Names** - Current street display
- **Zone Names** - Area/district names
- **Time Display** - 12/24 hour format support

### 🎨 GreenZone420 Theme
- **Custom Branding** - Server logo and name display
- **Marijuana Theme** - Subtle cannabis-inspired design elements
- **Green Color Scheme** - Professional green accents
- **Smooth Animations** - Polished visual effects

### 🎮 Extra Features
- **Cinematic Mode** - Toggle HUD visibility (F9 by default)
- **Auto-Hide in Menus** - HUD hides when pause menu is open
- **Vehicle Type Detection** - Automatic switching between car/boat/aircraft displays

---

## 📦 Installation

### Requirements
- **FiveM Server**
- **ESX Legacy** framework
- **esx_status** (optional, for hunger/thirst)
- **Fuel script** (optional, any compatible fuel resource)

### Installation Steps

1. **Download the Resource**
   ```bash
   cd resources
   git clone https://github.com/MTJ2024/HUD.git greenzone420_hud
   ```

2. **Add to server.cfg**
   ```cfg
   ensure greenzone420_hud
   ```

3. **Configure the HUD**
   - Edit `config.lua` to customize features
   - Set your server name, enable/disable features
   - Choose speed unit (KMH/MPH)

4. **Restart Server**
   ```bash
   restart greenzone420_hud
   ```

---

## ⚙️ Configuration

Open `config.lua` to customize the HUD:

### Main Settings
```lua
Config.EnableHUD = true                     -- Enable/Disable entire HUD
Config.ServerName = "GreenZone420"          -- Your server name
Config.SpeedUnit = "KMH"                    -- "KMH" or "MPH"
```

### Vehicle Speedometers
```lua
Config.EnableCarSpeedometer = true          -- Cars/Motorcycles
Config.EnableBoatSpeedometer = true         -- Boats
Config.EnableAircraftSpeedometer = true     -- Aircraft
```

### Player Status Bars
```lua
Config.ShowHealth = true                    -- Health bar
Config.ShowArmor = true                     -- Armor bar
Config.ShowHunger = true                    -- Hunger bar
Config.ShowThirst = true                    -- Thirst bar
Config.ShowStamina = true                   -- Stamina bar
```

### Visual Settings
```lua
Config.UseGreenZoneTheme = true             -- GreenZone420 theme
Config.ShowLogo = true                      -- Server logo
Config.EnableCustomMinimap = true           -- Custom minimap
```

### Performance
```lua
Config.UpdateInterval = 100                 -- Update frequency (ms)
```

---

## 🎮 Usage

### Player Commands
- **F9** - Toggle Cinematic Mode (hide/show HUD)
- Or use `/cinematicmode` command

### For Server Owners
All configuration is done in `config.lua` - no need to edit the core scripts.

---

## 🎨 Customization

### Changing Theme Colors
Edit the theme color in `config.lua`:
```lua
Config.ThemeColor = {
    r = 76,   -- Red value (0-255)
    g = 175,  -- Green value (0-255)
    b = 80    -- Blue value (0-255)
}
```

### Changing Server Name
```lua
Config.ServerName = "YourServerName"
```

### Minimap Position
```lua
Config.MinimapPosition = "bottom-left"      -- or "bottom-right"
```

---

## 🔧 Compatibility

### Tested With
- ✅ ESX Legacy 1.8+
- ✅ esx_status
- ✅ LegacyFuel
- ✅ okokFuel
- ✅ Any standard ESX setup

### Known Issues
- None reported - if you find any, please open an issue on GitHub

---

## 📸 Screenshots

*(Screenshots will be added here)*

---

## 🤝 Support

For support, questions, or feature requests:
- Open an issue on GitHub
- Contact MTJ2024

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Credits

**Created by MTJ2024**
- Developed for GreenZone420 Server
- Professional FiveM HUD System
- Built with care and attention to detail

---

## 🌟 Features Breakdown

### What Makes This HUD Special?

1. **True/False Configuration** - Every single feature can be toggled in config.lua
2. **Vehicle Detection** - Automatically shows the right speedometer for your vehicle type
3. **Performance First** - Optimized to use minimal resources
4. **ESX Integration** - Perfect integration with ESX Legacy
5. **Modern Design** - Clean, professional UI that looks great
6. **GreenZone420 Branding** - Custom theme for your server
7. **Easy Installation** - Just drag, drop, and configure
8. **No Dependencies** - Core features work standalone (hunger/thirst optional)

---

## 🚀 Future Updates

Planned features for future versions:
- Voice indicator integration
- Job-specific HUD elements
- Additional vehicle information
- More theme options
- Weapon display
- Money display options

---

<div align="center">

**Made with ❤️ by MTJ2024 for the FiveM Community**

🌿 GreenZone420 - *Where Quality Meets Performance* 🌿

</div>
