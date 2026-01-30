@echo off
chcp 65001 >nul
color 0C
cls

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║                                                          ║
echo ║         AUTO-FIX FÜR HUD INSTALLATION FEHLER            ║
echo ║                                                          ║
echo ╔══════════════════════════════════════════════════════════╗
echo.
echo.

REM Get the current directory name
for %%I in (.) do set CURRENT_DIR=%%~nxI

echo Aktueller Ordnername: %CURRENT_DIR%
echo.

REM Check if folder name contains brackets
echo %CURRENT_DIR% | findstr /C:"[" >nul
if %errorlevel% equ 0 (
    echo ❌ FEHLER GEFUNDEN: Ordnername enthält Klammern!
    echo.
    echo Der Ordnername "%CURRENT_DIR%" ist FALSCH.
    echo FiveM Ordner mit [Klammern] sind Kategorien, keine Resources.
    echo.
    echo ══════════════════════════════════════════════════════════
    echo.
    echo LÖSUNG:
    echo.
    echo 1. Schließe dieses Fenster
    echo 2. Gehe eine Ebene höher (in den resources Ordner^)
    echo 3. Benenne den Ordner "%CURRENT_DIR%" um zu "greenzone420_hud"
    echo 4. Ändere in server.cfg: ensure greenzone420_hud
    echo 5. Starte den Server neu
    echo.
    echo ══════════════════════════════════════════════════════════
    echo.
    pause
    exit /b 1
)

REM Check if correct name
if "%CURRENT_DIR%"=="greenzone420_hud" (
    echo ✅ ORDNERNAME IST KORREKT!
    echo.
    echo Der Ordner ist richtig benannt: %CURRENT_DIR%
    echo.
    echo Wenn du trotzdem Fehler bekommst:
    echo 1. Prüfe server.cfg: ensure greenzone420_hud
    echo 2. Prüfe dass fxmanifest.lua im Hauptordner ist
    echo 3. Starte den Server neu
    echo.
    pause
    exit /b 0
)

REM If name is different but no brackets
echo ⚠️  WARNUNG: Unerwarteter Ordnername
echo.
echo Aktuell: %CURRENT_DIR%
echo Erwartet: greenzone420_hud
echo.
echo Empfehlung: Ordner umbenennen zu "greenzone420_hud"
echo.
pause
exit /b 0
