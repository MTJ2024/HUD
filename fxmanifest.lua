fx_version 'cerulean'
game 'gta5'

author 'MTJ2024'
description 'GreenZone420 Professional HUD System for ESX Legacy'
version '1.0.3'

-- Copyright (c) 2024 MTJ2024
-- GreenZone420 HUD System

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

dependencies {
    'es_extended'
}
