-- ========================================
-- GreenZone420 HUD Client Script
-- Copyright (c) 2024 MTJ2024
-- Professional FiveM HUD for ESX Legacy
-- ========================================

ESX = nil
local isHudVisible = true
local cinematicMode = false
local playerLoaded = false

-- Initialize ESX (supports both old and new ESX Legacy methods)
Citizen.CreateThread(function()
    -- Try new export method first (ESX Legacy 1.9.0+)
    if exports and exports['es_extended'] then
        ESX = exports['es_extended']:getSharedObject()
    end
    
    -- Fallback to old method if export doesn't exist
    if not ESX then
        while ESX == nil do
            TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
            Citizen.Wait(0)
        end
    end
    
    -- Wait for player data to load
    while not ESX.GetPlayerData or not ESX.GetPlayerData().job do
        Citizen.Wait(10)
    end
    
    playerLoaded = true
end)

-- ESX Legacy Event Listeners for Real-Time Updates
RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
    ESX.PlayerData = xPlayer
    playerLoaded = true
end)

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
    if ESX.PlayerData then
        ESX.PlayerData.job = job
    end
end)

RegisterNetEvent('esx:setAccountMoney')
AddEventHandler('esx:setAccountMoney', function(account)
    if ESX.PlayerData and ESX.PlayerData.accounts then
        for i = 1, #ESX.PlayerData.accounts do
            if ESX.PlayerData.accounts[i].name == account.name then
                ESX.PlayerData.accounts[i] = account
                break
            end
        end
    end
end)

-- Main HUD Update Loop
Citizen.CreateThread(function()
    -- Send initial show message
    Citizen.Wait(1000)
    SendNUIMessage({ action = "showHUD" })
    
    while true do
        Citizen.Wait(Config.UpdateInterval)
        
        if not playerLoaded or not Config.EnableHUD then
            SendNUIMessage({
                action = "hideHUD"
            })
        elseif cinematicMode or (Config.HideInPauseMenu and IsPauseMenuActive()) then
            SendNUIMessage({
                action = "hideHUD"
            })
        else
            local playerPed = PlayerPedId()
            local playerId = PlayerId()
        
        -- Get player stats
        local health = (GetEntityHealth(playerPed) - 100) / (GetEntityMaxHealth(playerPed) - 100) * 100
        local armor = GetPedArmour(playerPed)
        
        -- Get vehicle info
        local vehicle = GetVehiclePedIsIn(playerPed, false)
        local isInVehicle = vehicle ~= 0
        local vehicleClass = nil
        local vehicleType = 'none'
        local speed = 0
        local fuel = 0
        local engineHealth = 0
        
        if isInVehicle then
            vehicleClass = GetVehicleClass(vehicle)
            speed = GetEntitySpeed(vehicle)
            
            -- Determine vehicle type
            if vehicleClass == 14 then
                vehicleType = 'boat'
            elseif vehicleClass == 15 or vehicleClass == 16 then
                vehicleType = 'aircraft'
            else
                vehicleType = 'car'
            end
            
            if Config.SpeedUnit == "kmh" then
                speed = speed * 3.6
            elseif Config.SpeedUnit == "mph" then
                speed = speed * 2.23694
            end
            
            fuel = GetVehicleFuelLevel(vehicle)
            engineHealth = GetVehicleEngineHealth(vehicle) / 10
        end
        
        -- Get ESX status (hunger, thirst)
        local hunger = 0
        local thirst = 0
        
        if ESX and ESX.GetPlayerData then
            TriggerEvent('esx_status:getStatus', 'hunger', function(status)
                if status then hunger = status.getPercent() end
            end)
            
            TriggerEvent('esx_status:getStatus', 'thirst', function(status)
                if status then thirst = status.getPercent() end
            end)
        end
        
        -- Get stamina
        local stamina = 100 - GetPlayerSprintStaminaRemaining(playerId)
        
        -- Get ESX player data
        local money = 0
        local bank = 0
        local job = "Arbeitslos"
        local jobGrade = ""
        
        if ESX and ESX.GetPlayerData then
            local playerData = ESX.GetPlayerData()
            
            -- Get money
            if playerData.accounts then
                for _, account in pairs(playerData.accounts) do
                    if account.name == 'money' then
                        money = account.money
                    elseif account.name == 'bank' then
                        bank = account.money
                    end
                end
            end
            
            -- Get job
            if playerData.job then
                job = playerData.job.label or playerData.job.name
                jobGrade = playerData.job.grade_label or ""
            end
        end
        
        -- Get weapon
        local weaponHash = GetSelectedPedWeapon(playerPed)
        local weaponName = nil
        local ammo = 0
        local ammoMax = 0
        
        if weaponHash and weaponHash ~= GetHashKey("WEAPON_UNARMED") then
            -- Get weapon name from hash
            local _, weaponNamePtr = GetWeapontypeModel(weaponHash)
            weaponName = tostring(weaponNamePtr)
            
            -- Try to get weapon name from hash key
            for name, hash in pairs(Config.Weapons or {}) do
                if hash == weaponHash then
                    weaponName = name
                    break
                end
            end
            
            -- If still not found, use a simple lookup
            if not weaponName or weaponName == "" then
                weaponName = "WEAPON_" .. tostring(weaponHash)
            end
            
            ammo = GetAmmoInPedWeapon(playerPed, weaponHash)
            _, ammoMax = GetMaxAmmo(playerPed, weaponHash)
        end
        
        -- Get location
        local coords = GetEntityCoords(playerPed)
        local streetHash, crossingHash = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
        local streetName = GetStreetNameFromHashKey(streetHash)
        local crossingName = GetStreetNameFromHashKey(crossingHash)
        local zone = GetNameOfZone(coords.x, coords.y, coords.z)
        local zoneName = GetLabelText(zone)
        
        local location = streetName
        if crossingName ~= "" then
            location = location .. " & " .. crossingName
        end
        
        -- Get time
        local hour = GetClockHours()
        local minute = GetClockMinutes()
        local timeString = string.format("%02d:%02d", hour, minute)
        
        -- Get player info
        local serverId = GetPlayerServerId(playerId)
        local playerName = GetPlayerName(playerId)
        
        -- Send data to NUI
        SendNUIMessage({
            action = "updateHUD",
            playerId = serverId,
            playerName = playerName,
            health = math.floor(health),
            armor = math.floor(armor),
            hunger = math.floor(hunger),
            thirst = math.floor(thirst),
            stamina = math.floor(stamina),
            money = money,
            bank = bank,
            job = job,
            jobGrade = jobGrade,
            weapon = weaponName,
            ammo = ammo,
            ammoMax = ammoMax,
            isInVehicle = isInVehicle,
            vehicleClass = vehicleClass,
            vehicleType = vehicleType,
            speed = math.floor(speed),
            speedUnit = Config.SpeedUnit,
            fuel = math.floor(fuel),
            engineHealth = math.floor(engineHealth),
            streetName = location,
            zoneName = zoneName,
            time = timeString,
            showHealth = Config.ShowHealth,
            showArmor = Config.ShowArmor,
            showHunger = Config.ShowHunger,
            showThirst = Config.ShowThirst,
            showStamina = Config.ShowStamina,
            showSpeedometer = Config.ShowSpeedometer,
            showFuel = Config.ShowFuel,
            showEngineHealth = Config.ShowEngineHealth,
            showLocation = Config.ShowLocation,
            showTime = Config.ShowTime,
            showMinimap = Config.ShowMinimap,
            serverName = Config.ServerName,
            showServerLogo = Config.ShowServerLogo
        })
        end
    end
end)

-- Toggle HUD visibility
RegisterCommand(Config.ToggleHUDCommand, function()
    isHudVisible = not isHudVisible
    
    if isHudVisible then
        SendNUIMessage({ action = "showHUD" })
    else
        SendNUIMessage({ action = "hideHUD" })
    end
    
    if Config.ShowNotifications then
        ESX.ShowNotification(isHudVisible and "HUD aktiviert" or "HUD deaktiviert")
    end
end, false)

-- Cinematic mode toggle
RegisterCommand(Config.CinematicModeCommand, function()
    cinematicMode = not cinematicMode
    
    if Config.ShowNotifications then
        ESX.ShowNotification(cinematicMode and "Kinomodus aktiviert" or "Kinomodus deaktiviert")
    end
end, false)

-- Minimap customization
if Config.ShowMinimap and Config.CustomMinimap then
    Citizen.CreateThread(function()
        SetRadarBigmapEnabled(false, false)
        SetRadarZoom(1100)
        
        RequestStreamedTextureDict("squaremap", false)
        if not HasStreamedTextureDictLoaded("squaremap") then
            Wait(150)
        end
        
        SetMinimapClipType(Config.MinimapShape)
        SetMinimapComponentPosition('minimap', 'L', 'B', -0.0045, -0.025, 0.150, 0.188)
        SetMinimapComponentPosition('minimap_mask', 'L', 'B', 0.020, 0.032, 0.111, 0.159)
        SetMinimapComponentPosition('minimap_blur', 'L', 'B', -0.03, -0.002, 0.266, 0.237)
        
        SetBlipAlpha(GetNorthRadarBlip(), 0)
    end)
end

-- Cleanup
AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() then
        SendNUIMessage({ action = "hideHUD" })
        DisplayRadar(true)
    end
end)
