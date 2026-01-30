╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ⚠️  ⚠️  ⚠️   READ BEFORE INSTALLING   ⚠️  ⚠️  ⚠️                      ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝


ERROR: "[HUD] is a category, but has a resource manifest"
═══════════════════════════════════════════════════════════════════════════

ARE YOU GETTING THIS ERROR?
→ Your folder name is WRONG!


❌ WRONG:
──────────────────────────────────────────────────────────────────────────
resources/[HUD]/                    ← WITH brackets = ERROR!
resources/[greenzone420_hud]/       ← WITH brackets = ERROR!

server.cfg: ensure [HUD]            ← WRONG!


✅ CORRECT:
──────────────────────────────────────────────────────────────────────────
resources/greenzone420_hud/         ← WITHOUT brackets = CORRECT!

server.cfg: ensure greenzone420_hud ← CORRECT!


INSTALLATION STEP BY STEP:
═══════════════════════════════════════════════════════════════════════════

1. DOWNLOAD
   - Download this repository as ZIP
   - OR: git clone https://github.com/MTJ2024/HUD.git

2. NAME THE FOLDER CORRECTLY
   - Extract the folder
   - Rename it to: greenzone420_hud
   - DO NOT use brackets [ ]!

3. COPY TO SERVER
   - Copy greenzone420_hud to: /resources/greenzone420_hud/
   
4. EDIT SERVER.CFG
   Add this line:
   ensure greenzone420_hud

5. START SERVER
   - No more warnings!


WHY NO BRACKETS?
═══════════════════════════════════════════════════════════════════════════

FiveM Folder Rules:

[folder]  = CATEGORY FOLDER (contains multiple resources)
           Example: [esx], [standalone]
           
folder    = SINGLE RESOURCE (one resource)
           Example: greenzone420_hud, esx_menu


IF YOU STILL HAVE ERRORS:
═══════════════════════════════════════════════════════════════════════════

1. Check folder name:
   - No [ and ] brackets
   - Just greenzone420_hud

2. Check folder structure:
   greenzone420_hud/
   ├── fxmanifest.lua  ← MUST be here!
   ├── config.lua
   ├── client/
   │   └── main.lua
   └── html/
       ├── index.html
       ├── style.css
       └── script.js

3. Check server.cfg:
   ensure greenzone420_hud  ← WITHOUT brackets!


SUPPORT:
═══════════════════════════════════════════════════════════════════════════
See: README.md for full documentation
See: INSTALLATION.md for detailed installation


Created by MTJ2024
