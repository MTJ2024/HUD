#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

clear

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║         AUTO-FIX FÜR HUD INSTALLATION FEHLER            ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Get current directory name
CURRENT_DIR=$(basename "$PWD")

echo "Aktueller Ordnername: $CURRENT_DIR"
echo ""

# Check if folder name contains brackets
if [[ "$CURRENT_DIR" == *"["* ]] || [[ "$CURRENT_DIR" == *"]"* ]]; then
    echo -e "${RED}❌ FEHLER GEFUNDEN: Ordnername enthält Klammern!${NC}"
    echo ""
    echo "Der Ordnername \"$CURRENT_DIR\" ist FALSCH."
    echo "FiveM Ordner mit [Klammern] sind Kategorien, keine Resources."
    echo ""
    echo "══════════════════════════════════════════════════════════"
    echo ""
    echo "AUTOMATISCHE UMBENENNUNG MÖGLICH!"
    echo ""
    read -p "Soll der Ordner automatisch umbenannt werden? (j/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Jj]$ ]]; then
        cd ..
        if [ -d "greenzone420_hud" ]; then
            echo -e "${RED}Fehler: greenzone420_hud existiert bereits!${NC}"
            echo "Bitte manuell umbenennen oder alten Ordner löschen."
        else
            mv "$CURRENT_DIR" "greenzone420_hud"
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✅ ERFOLGREICH!${NC}"
                echo ""
                echo "Ordner wurde umbenannt zu: greenzone420_hud"
                echo ""
                echo "NÄCHSTE SCHRITTE:"
                echo "1. Ändere in server.cfg: ensure greenzone420_hud"
                echo "2. Starte den Server neu"
                echo ""
            else
                echo -e "${RED}Fehler beim Umbenennen!${NC}"
                echo "Bitte manuell umbenennen."
            fi
        fi
    else
        echo ""
        echo "MANUELLE SCHRITTE:"
        echo "1. Gehe eine Ebene höher (in den resources Ordner)"
        echo "2. Benenne den Ordner \"$CURRENT_DIR\" um zu \"greenzone420_hud\""
        echo "3. Ändere in server.cfg: ensure greenzone420_hud"
        echo "4. Starte den Server neu"
        echo ""
    fi
    exit 1
fi

# Check if correct name
if [ "$CURRENT_DIR" == "greenzone420_hud" ]; then
    echo -e "${GREEN}✅ ORDNERNAME IST KORREKT!${NC}"
    echo ""
    echo "Der Ordner ist richtig benannt: $CURRENT_DIR"
    echo ""
    echo "Wenn du trotzdem Fehler bekommst:"
    echo "1. Prüfe server.cfg: ensure greenzone420_hud"
    echo "2. Prüfe dass fxmanifest.lua im Hauptordner ist"
    echo "3. Starte den Server neu"
    echo ""
    exit 0
fi

# If name is different but no brackets
echo -e "${YELLOW}⚠️  WARNUNG: Unerwarteter Ordnername${NC}"
echo ""
echo "Aktuell: $CURRENT_DIR"
echo "Erwartet: greenzone420_hud"
echo ""
echo "Empfehlung: Ordner umbenennen zu \"greenzone420_hud\""
echo ""

read -p "Automatisch umbenennen? (j/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Jj]$ ]]; then
    cd ..
    if [ -d "greenzone420_hud" ]; then
        echo -e "${RED}Fehler: greenzone420_hud existiert bereits!${NC}"
    else
        mv "$CURRENT_DIR" "greenzone420_hud"
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ ERFOLGREICH umbenannt!${NC}"
            echo "Vergiss nicht server.cfg zu aktualisieren: ensure greenzone420_hud"
        fi
    fi
fi

exit 0
