fx_version 'cerulean'
game 'gta5'

author 'MTJ2024'
description 'GreenZone420 Professional HUD System for ESX Legacy FiveM GTA V RP Server'
version '1.1.0'

-- Copyright (c) 2024 MTJ2024
-- GreenZone420 HUD System
-- Designed for ESX Legacy 1.8.0+ on FiveM GTA V Roleplay Servers

client_scripts {
    'config.lua',
    'client/main.lua'
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/script.js',
    'html/assets/*.png'
}

-- ESX Legacy Dependency (Required)
dependencies {
    'es_extended'
}

-- Optional but recommended for full functionality
-- esx_status (for hunger/thirst display)
