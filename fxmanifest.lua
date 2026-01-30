fx_version 'cerulean'
game 'gta5'

author 'MTJ2024'
description 'GreenZone420 Professional HUD System for ESX Legacy'
version '1.0.2'

-- ============================================================================
-- INSTALLATION VALIDATION
-- ============================================================================
-- This resource MUST be named 'greenzone420_hud' (without brackets)
-- Folder names with [brackets] are for categories, not individual resources
-- 
-- CORRECT:   resources/greenzone420_hud/
-- INCORRECT: resources/[HUD]/
-- INCORRECT: resources/[greenzone420_hud]/
--
-- If you get warnings about "client" or "html" not having manifests,
-- it means your folder name contains brackets [ ] which is WRONG!
-- ============================================================================

-- Resource name validation
-- This will cause an error if the resource name contains brackets
local resourceName = GetCurrentResourceName()
if resourceName and (string.match(resourceName, '%[') or string.match(resourceName, '%]')) then
    error(string.format(
        '\n\n' ..
        '╔════════════════════════════════════════════════════════════════╗\n' ..
        '║  CRITICAL INSTALLATION ERROR - RESOURCE NAME INVALID          ║\n' ..
        '╚════════════════════════════════════════════════════════════════╝\n\n' ..
        'Resource folder name: "%s"\n\n' ..
        'ERROR: Folder name contains brackets [ or ]\n' ..
        'FiveM uses brackets for CATEGORY folders, not resources!\n\n' ..
        'SOLUTION:\n' ..
        '1. Stop the server\n' ..
        '2. Rename folder from "%s" to "greenzone420_hud"\n' ..
        '3. Update server.cfg: ensure greenzone420_hud\n' ..
        '4. Start the server\n\n' ..
        'See FEHLER_BEHEBEN.txt or run AUTO_FIX.bat / auto_fix.sh\n\n',
        resourceName, resourceName
    ))
end

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
