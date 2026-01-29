# Installation Guide - GreenZone420 HUD

## Quick Start (5 Minutes)

### Step 1: Download
1. Download this repository as ZIP or clone it
2. Extract to your FiveM server's `resources` folder
3. Rename the folder to `greenzone420_hud` (optional but recommended)

### Step 2: Configuration
1. Open `config.lua` in a text editor
2. Change `Config.ServerName` to your server name (or keep "GreenZone420")
3. Set `Config.SpeedUnit` to either "KMH" or "MPH"
4. Enable/disable features by setting them to `true` or `false`

### Step 3: Server Setup
1. Open your `server.cfg` file
2. Add this line: `ensure greenzone420_hud`
3. Save the file

### Step 4: Start
1. Restart your FiveM server
2. Join the server
3. The HUD will automatically load!

## Detailed Configuration

### Basic Settings
```lua
-- Enable or disable the entire HUD
Config.EnableHUD = true

-- Your server name (shows in top-right corner)
Config.ServerName = "GreenZone420"

-- Speed measurement unit
Config.SpeedUnit = "KMH"  -- Change to "MPH" for miles per hour
```

### Speedometer Options
```lua
-- Enable speedometer for different vehicle types
Config.EnableCarSpeedometer = true      -- Cars and motorcycles
Config.EnableBoatSpeedometer = true     -- Boats and jet skis
Config.EnableAircraftSpeedometer = true -- Planes and helicopters
```

### Status Bars
```lua
-- Choose which status bars to display
Config.ShowHealth = true    -- Health bar
Config.ShowArmor = true     -- Armor bar
Config.ShowHunger = true    -- Hunger (needs esx_status)
Config.ShowThirst = true    -- Thirst (needs esx_status)
Config.ShowStamina = true   -- Stamina bar
```

### Vehicle Information
```lua
-- Additional vehicle info
Config.ShowFuel = true          -- Fuel gauge
Config.ShowEngineHealth = true  -- Engine damage indicator
```

### Display Options
```lua
-- Location and time
Config.ShowStreetName = true    -- Current street
Config.ShowZoneName = true      -- Current area/zone
Config.Show24HourClock = false  -- false = 12-hour with AM/PM

-- Visual elements
Config.ShowLogo = true              -- Server logo
Config.UseGreenZoneTheme = true     -- GreenZone420 theme
```

### Advanced Settings
```lua
-- Performance
Config.UpdateInterval = 100  -- Update every 100ms (lower = more frequent)

-- Minimap
Config.EnableCustomMinimap = true
Config.MinimapRounded = true
Config.MinimapPosition = "bottom-left"

-- Cinematic mode
Config.EnableCinematicMode = true
Config.CinematicModeKey = 'F9'  -- Key to toggle HUD
```

## Dependencies

### Required
- **ESX Legacy** - The HUD is built for ESX Legacy servers

### Optional
- **esx_status** - Needed for hunger and thirst bars
- **Fuel Script** - Any fuel script (LegacyFuel, okokFuel, etc.) for fuel display

## Troubleshooting

### HUD Not Showing
1. Make sure the resource is started: `/restart greenzone420_hud`
2. Check F8 console for errors
3. Verify ESX is loaded: `/restart es_extended`
4. Make sure `Config.EnableHUD = true` in config.lua

### Hunger/Thirst Not Working
- Install and start `esx_status` resource
- Make sure esx_status is started BEFORE this HUD

### Speedometer Not Showing
1. Check that vehicle speedometer is enabled in config
2. Make sure you're in a vehicle
3. Verify the vehicle type matches enabled speedometers

### Wrong Speed Unit
- Change `Config.SpeedUnit` in config.lua to "KMH" or "MPH"
- Restart the resource

### Fuel Not Showing
- Ensure you have a fuel script installed
- Enable fuel display: `Config.ShowFuel = true`
- The HUD uses `GetVehicleFuelLevel()` native

## Customization Tips

### Change Server Name
```lua
Config.ServerName = "YourServerName"
```

### Change Theme Color
```lua
Config.ThemeColor = {
    r = 255,  -- Red
    g = 0,    -- Green  
    b = 0     -- Blue
}
-- Example: Red theme = {r=255, g=0, b=0}
-- Example: Blue theme = {r=0, g=100, b=255}
```

### Disable Specific Features
Just set any Config option to `false`:
```lua
Config.ShowArmor = false      -- Hides armor bar
Config.ShowStamina = false    -- Hides stamina bar
Config.ShowLogo = false       -- Hides server logo
```

## Performance Optimization

### For Lower-End Servers
```lua
Config.UpdateInterval = 200  -- Update less frequently
Config.EnableCustomMinimap = false  -- Use default minimap
```

### For High-End Servers
```lua
Config.UpdateInterval = 50   -- Smoother updates
```

## Support

If you need help:
1. Check this guide first
2. Read the main README.md
3. Check F8 console for errors
4. Open an issue on GitHub with error details

---

**Created by MTJ2024 for GreenZone420**
