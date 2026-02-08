fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'Modern Cyberpunk HUD for ESX Legacy'
version '1.0.0'

shared_script '@es_extended/imports.lua'

client_scripts {
    'config.lua',
    'client.lua'
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/script.js'
}

lua54 'yes'
