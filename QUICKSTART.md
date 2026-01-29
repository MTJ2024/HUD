# 🚀 Quick Start Guide

## Get GreenZone420 HUD Running in 5 Minutes!

### Step 1: Add to Your Server (1 minute)

1. **Download this repository**
   - Click "Code" → "Download ZIP" on GitHub
   - OR clone: `git clone https://github.com/MTJ2024/HUD.git`

2. **Extract to resources folder**
   ```
   YourServer/
   └── resources/
       └── greenzone420_hud/    ← Put it here
   ```

3. **Add to server.cfg**
   ```cfg
   # GreenZone420 HUD
   ensure greenzone420_hud
   ```

### Step 2: Basic Configuration (2 minutes)

Open `config.lua` and set:

```lua
-- Change to your server name
Config.ServerName = "YourServerName"

-- Choose speed unit
Config.SpeedUnit = "KMH"  -- or "MPH"

-- Basic features (all true by default)
Config.EnableHUD = true
Config.EnableCarSpeedometer = true
Config.ShowHealth = true
Config.ShowArmor = true
```

### Step 3: Start Your Server (1 minute)

```bash
# Start your FiveM server
# Or restart if already running:
restart greenzone420_hud
```

### Step 4: Test In-Game (1 minute)

1. Join your server
2. You should see:
   - ✅ Server logo (top-right)
   - ✅ Time and location (top-left)
   - ✅ Status bars (bottom-right)
3. Get in a vehicle:
   - ✅ Speedometer appears
   - ✅ Fuel and engine info shows

### That's It! 🎉

Your HUD is now running!

---

## Optional: Advanced Setup

### Add Hunger/Thirst Support

If you have `esx_status`:

```lua
Config.ShowHunger = true
Config.ShowThirst = true
```

Make sure esx_status starts **before** the HUD:
```cfg
ensure esx_status
ensure greenzone420_hud
```

### Customize Colors

```lua
Config.ThemeColor = {
    r = 76,   -- Red (0-255)
    g = 175,  -- Green (0-255)
    b = 80    -- Blue (0-255)
}
```

Try these themes:
- **Green (default)**: `{r=76, g=175, b=80}`
- **Blue**: `{r=33, g=150, b=243}`
- **Purple**: `{r=156, g=39, b=176}`
- **Red**: `{r=244, g=67, b=54}`

### Hide Elements You Don't Want

```lua
-- Don't want armor bar?
Config.ShowArmor = false

-- Don't want server logo?
Config.ShowLogo = false

-- Don't want boat speedometer?
Config.EnableBoatSpeedometer = false
```

### Performance Tuning

```lua
-- Update every 100ms (default, balanced)
Config.UpdateInterval = 100

-- Faster updates (smoother, more resource usage)
Config.UpdateInterval = 50

-- Slower updates (less resource usage)
Config.UpdateInterval = 200
```

---

## Common Questions

### Q: HUD not showing?
**A:** 
1. Check console for errors (F8)
2. Make sure ESX is running: `restart es_extended`
3. Restart the HUD: `restart greenzone420_hud`

### Q: Hunger/Thirst bars empty?
**A:** You need `esx_status` installed and running.

### Q: Wrong speed (too fast/slow)?
**A:** Change `Config.SpeedUnit` to "KMH" or "MPH"

### Q: Fuel not showing?
**A:** Install a fuel script (LegacyFuel, okokFuel, etc.)

### Q: Want to hide HUD temporarily?
**A:** Press **F9** for cinematic mode!

---

## Next Steps

- ✅ Read [FEATURES.md](FEATURES.md) for complete feature list
- ✅ Check [INSTALLATION.md](INSTALLATION.md) for detailed setup
- ✅ See [TESTING.md](TESTING.md) for testing guide
- ✅ Review [config.lua](config.lua) for all options

---

## Support

Need help?
1. Check the documentation files
2. Read the config.lua comments
3. Open an issue on GitHub
4. Contact MTJ2025

---

## What You Get

✅ **Professional HUD** - Clean, modern design  
✅ **Fully Configurable** - Every feature toggleable  
✅ **Multi-Vehicle** - Car, boat, aircraft speedometers  
✅ **Complete Stats** - Health, armor, hunger, thirst, stamina  
✅ **GreenZone420 Theme** - Marijuana-inspired branding  
✅ **Optimized** - Lightweight and fast  
✅ **Well Documented** - Easy to use and customize  

---

**Created by MTJ2025 for the FiveM Community**

*Professional quality HUD system for ESX Legacy servers.*

🌿 **GreenZone420** - Where Quality Meets Performance 🌿
