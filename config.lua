Config = {}

-- ========================================
-- GreenZone420 HUD Configuration
-- Created by MTJ2025
-- ========================================

-- Main HUD Settings
Config.EnableHUD = true                     -- Enable/Disable the entire HUD system
Config.ServerName = "GreenZone420"          -- Server name displayed on HUD

-- Vehicle Speedometer Settings
Config.EnableCarSpeedometer = true          -- Enable car/motorcycle speedometer
Config.EnableBoatSpeedometer = true         -- Enable boat speedometer
Config.EnableAircraftSpeedometer = true     -- Enable aircraft speedometer

-- Speed Unit
Config.SpeedUnit = "KMH"                    -- "KMH" or "MPH"

-- Minimap Settings
Config.EnableCustomMinimap = true           -- Enable custom minimap styling
Config.MinimapRounded = true                -- Rounded minimap corners
Config.MinimapPosition = "bottom-left"      -- Position: "bottom-left" or "bottom-right"

-- HUD Display Settings
Config.ShowHealth = true                    -- Show health bar
Config.ShowArmor = true                     -- Show armor bar
Config.ShowHunger = true                    -- Show hunger bar (requires esx_status)
Config.ShowThirst = true                    -- Show thirst bar (requires esx_status)
Config.ShowStamina = true                   -- Show stamina bar

-- Vehicle Info Display
Config.ShowFuel = true                      -- Show fuel level (requires fuel script)
Config.ShowEngineHealth = true              -- Show engine health
Config.ShowSeatbelt = true                  -- Show seatbelt status
Config.ShowCruiseControl = true             -- Show cruise control status

-- Visual Settings
Config.ThemeColor = {                       -- Main theme color (GreenZone420 green)
    r = 76,
    g = 175,
    h = 80
}

Config.UseGreenZoneTheme = true             -- Use GreenZone420 marijuana theme
Config.ShowLogo = true                      -- Show server logo on HUD

-- Performance Settings
Config.UpdateInterval = 100                 -- HUD update interval in milliseconds (lower = more frequent updates)
Config.HideInPauseMenu = true               -- Hide HUD when pause menu is open

-- Cinematic Mode
Config.EnableCinematicMode = true           -- Allow players to hide HUD with a key
Config.CinematicModeKey = 'F9'              -- Key to toggle cinematic mode

-- Extra Features
Config.ShowStreetName = true                -- Show current street name
Config.ShowZoneName = true                  -- Show current zone/area name
Config.Show24HourClock = false              -- Use 24-hour format (false = 12-hour with AM/PM)
