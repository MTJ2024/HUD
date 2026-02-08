local hudActive = true
local cinematicMode = false
local voiceRange = 'normal'

-- ESX initialisieren
ESX = exports["es_extended"]:getSharedObject()

-- Spieler Status
local playerData = {
    health = 100,
    armor = 0,
    hunger = 100,
    thirst = 100,
    stamina = 100,
    oxygen = 100,
    money = 0,
    bank = 0,
    job = 'Zivilist',
    grade = ''
}

-- Fahrzeug Status
local vehicleData = {
    inVehicle = false,
    speed = 0,
    fuel = 0,
    engine = true,
    seatbelt = false,
    gear = 1,
    rpm = 0
}

-- Cinematic Mode Toggle
RegisterCommand('cinematic', function()
    cinematicMode = not cinematicMode
    SendNUIMessage({
        action = 'toggleCinematic',
        state = cinematicMode
    })
    
    if cinematicMode then
        DisplayRadar(false)
    else
        DisplayRadar(Config.ShowMinimap)
    end
end, false)

RegisterKeyMapping('cinematic', 'Toggle Cinematic Mode', 'keyboard', Config.CinematicKey)

-- HUD Toggle
RegisterCommand('hud', function()
    hudActive = not hudActive
    SendNUIMessage({
        action = 'toggleHud',
        state = hudActive
    })
end, false)

RegisterKeyMapping('hud', 'Toggle HUD', 'keyboard', 'F7')

-- Main HUD Update Thread
CreateThread(function()
    while true do
        Wait(Config.RefreshRate)
        
        if hudActive then
            local playerPed = PlayerPedId()
            local playerId = PlayerId()
            
            -- Health & Armor
            playerData.health = math.floor((GetEntityHealth(playerPed) - 100) / (GetEntityMaxHealth(playerPed) - 100) * 100)
            playerData.armor = GetPedArmour(playerPed)
            
            -- Stamina
            playerData.stamina = math.floor((100 - GetPlayerSprintStaminaRemaining(playerId)))
            
            -- Oxygen (nur unter Wasser)
            if IsPedSwimmingUnderWater(playerPed) then
                playerData.oxygen = math.floor(GetPlayerUnderwaterTimeRemaining(playerId) * 10)
            else
                playerData.oxygen = 100
            end
            
            -- ESX Status
            TriggerEvent('esx_status:getStatus', 'hunger', function(status)
                if status then
                    playerData.hunger = math.floor(status.getPercent())
                end
            end)
            
            TriggerEvent('esx_status:getStatus', 'thirst', function(status)
                if status then
                    playerData.thirst = math.floor(status.getPercent())
                end
            end)
            
            -- Geld
            local xPlayer = ESX.GetPlayerData()
            if xPlayer and xPlayer.accounts then
                for _, account in pairs(xPlayer.accounts) do
                    if account.name == 'money' then
                        playerData.money = account.money
                    elseif account.name == 'bank' then
                        playerData.bank = account.money
                    end
                end
            end
            
            -- Job Info
            if xPlayer and xPlayer.job then
                playerData.job = xPlayer.job.label
                playerData.grade = xPlayer.job.grade_label
            end
            
            -- Sende Player Data an NUI
            SendNUIMessage({
                action = 'updatePlayer',
                data = playerData
            })
            
            -- Location & Compass
            if Config.ShowCompass or Config.ShowStreetName then
                local coords = GetEntityCoords(playerPed)
                local heading = GetEntityHeading(playerPed)
                local streetHash, crossingHash = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
                local streetName = GetStreetNameFromHashKey(streetHash)
                local crossingName = GetStreetNameFromHashKey(crossingHash)
                local zone = GetNameOfZone(coords.x, coords.y, coords.z)
                local zoneName = GetLabelText(zone)
                
                SendNUIMessage({
                    action = 'updateLocation',
                    heading = math.floor(heading),
                    street = streetName,
                    crossing = crossingName ~= '' and crossingName or nil,
                    zone = zoneName
                })
            end
            
            -- Waffen Erkennung
            if Config.ShowWeapon then
                local weaponHash = GetSelectedPedWeapon(playerPed)
                local unarmedHash = GetHashKey('WEAPON_UNARMED')
                
                if weaponHash ~= unarmedHash then
                    -- Munition
                    local ammoCount = GetAmmoInPedWeapon(playerPed, weaponHash)
                    local _, clipAmmo = GetAmmoInClip(playerPed, weaponHash)
                    
                    SendNUIMessage({
                        action = 'updateWeapon',
                        hasWeapon = true,
                        ammo = ammoCount,
                        clipAmmo = clipAmmo or 0
                    })
                else
                    SendNUIMessage({
                        action = 'updateWeapon',
                        hasWeapon = false
                    })
                end
            end
        end
    end
end)

-- Vehicle HUD Update Thread
CreateThread(function()
    while true do
        Wait(100)
        
        local playerPed = PlayerPedId()
        
        if IsPedInAnyVehicle(playerPed, false) then
            local vehicle = GetVehiclePedIsIn(playerPed, false)
            
            if vehicle ~= 0 and GetPedInVehicleSeat(vehicle, -1) == playerPed then
                vehicleData.inVehicle = true
                
                -- Geschwindigkeit
                local speed = GetEntitySpeed(vehicle)
                if Config.SpeedUnit == 'kmh' then
                    vehicleData.speed = math.floor(speed * 3.6)
                else
                    vehicleData.speed = math.floor(speed * 2.236936)
                end
                
                -- Kraftstoff (Legacy Fuel oder andere Fuel Scripts)
                if GetResourceState('LegacyFuel') == 'started' then
                    vehicleData.fuel = math.floor(exports['LegacyFuel']:GetFuel(vehicle))
                else
                    vehicleData.fuel = math.floor(GetVehicleFuelLevel(vehicle))
                end
                
                -- Motor & Getriebe
                vehicleData.engine = GetIsVehicleEngineRunning(vehicle)
                vehicleData.gear = GetVehicleCurrentGear(vehicle)
                vehicleData.rpm = math.floor(GetVehicleCurrentRpm(vehicle) * 100)
                
                SendNUIMessage({
                    action = 'updateVehicle',
                    data = vehicleData
                })
            else
                if vehicleData.inVehicle then
                    vehicleData.inVehicle = false
                    SendNUIMessage({
                        action = 'updateVehicle',
                        data = vehicleData
                    })
                end
            end
        else
            if vehicleData.inVehicle then
                vehicleData.inVehicle = false
                SendNUIMessage({
                    action = 'updateVehicle',
                    data = vehicleData
                })
            end
        end
    end
end)

-- Voice Chat Range Update
if Config.ShowVoiceChat then
    AddEventHandler('pma-voice:setTalkingMode', function(mode)
        voiceRange = mode
        SendNUIMessage({
            action = 'updateVoice',
            range = mode
        })
    end)
end

-- Minimap Einstellungen beim Laden
CreateThread(function()
    Wait(500)
    DisplayRadar(Config.ShowMinimap and not cinematicMode)
    
    -- Minimap Position anpassen
    SetRadarBigmapEnabled(false, false)
    SetRadarZoom(1100)
    
    -- Sende Konfiguration an NUI
    SendNUIMessage({
        action = 'setConfig',
        config = Config
    })
end)
