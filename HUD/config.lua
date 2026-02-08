Config = {}

-- ============================================
-- HUD LAYOUT POSITIONEN
-- ============================================
-- Status Bars: RECHTS UNTEN (wegen Minimap links)
-- Geld: RECHTS OBEN (unter Servername)
-- Server Logo: RECHTS OBEN
-- Job: RECHTS (über ESX Status Bars)
-- Fahrzeug/Tacho: ZENTRAL UNTEN
-- Navigation/Kompass: ÜBER MINIMAP (links unten)
-- Waffe: ÜBER MINIMAP (links, nur wenn ausgerüstet)
-- Voice Chat: LINKS UNTEN (über Location)
-- ============================================

-- Server Einstellungen
Config.ServerName = 'Greenzone 420' -- Servername

-- HUD Einstellungen
Config.RefreshRate = 200 -- Update-Rate in Millisekunden
Config.ShowCompass = true -- Kompass anzeigen
Config.ShowStreetName = true -- Straßennamen anzeigen
Config.ShowVoiceChat = true -- Voice Chat Indikator
Config.ShowMinimap = true -- Minimap anzeigen
Config.ShowJob = true -- Job anzeigen
Config.ShowWeapon = true -- Waffe anzeigen wenn ausgerüstet

-- Status Bar Einstellungen
Config.ShowHealth = true
Config.ShowArmor = true
Config.ShowHunger = true
Config.ShowThirst = true
Config.ShowStamina = true
Config.ShowOxygen = true

-- Fahrzeug HUD Einstellungen
Config.ShowVehicleHud = true
Config.SpeedUnit = 'kmh' -- 'kmh' oder 'mph'
Config.ShowFuel = true
Config.ShowSeatbelt = true

-- Cinematic Mode
Config.CinematicKey = 'F6' -- Taste für Cinematic Mode
Config.CinematicBlackBars = true

-- Farben (RGB) - Feuerwehr Design: Rot, Silber, Weiß
Config.Colors = {
    health = {r = 220, g = 20, b = 60},      -- Crimson Rot
    armor = {r = 192, g = 192, b = 192},     -- Silber
    hunger = {r = 255, g = 69, b = 0},       -- Orange-Rot
    thirst = {r = 176, g = 196, b = 222},    -- Hell-Silber-Blau
    stamina = {r = 255, g = 255, b = 255},   -- Weiß
    oxygen = {r = 169, g = 169, b = 169},    -- Dunkel-Grau
    speed = {r = 220, g = 20, b = 60},       -- Crimson Rot
    fuel = {r = 255, g = 0, b = 0}           -- Feuerwehr-Rot
}
