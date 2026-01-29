-- ========================================
-- GreenZone420 HUD Client Script
-- Created by MTJ2024
-- Professional FiveM HUD for ESX Legacy
-- ========================================

ESX = nil
local isHudVisible = true
local cinematicMode = false
local playerLoaded = false

-- Initialize ESX
Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Citizen.Wait(0)
    end
    
    while ESX.GetPlayerData().job == nil do
        Citizen.Wait(10)
    end
    
    playerLoaded = true
end)

-- Main HUD Update Loop
Citizen.CreateThread(function()
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
        local speed = 0
        local fuel = 0
        local engineHealth = 0
        
        if isInVehicle then
            vehicleClass = GetVehicleClass(vehicle)
            local speedVector = GetEntitySpeed(vehicle)
            
            if Config.SpeedUnit == "MPH" then
                speed = math.floor(speedVector * 2.236936)
            else
                speed = math.floor(speedVector * 3.6)
            end
            
            if Config.ShowFuel then
                fuel = GetVehicleFuelLevel(vehicle)
            end
            
            if Config.ShowEngineHealth then
                engineHealth = GetVehicleEngineHealth(vehicle) / 10
            end
        end
        
        -- Determine vehicle type for speedometer
        local vehicleType = "none"
        if isInVehicle then
            if vehicleClass == 15 or vehicleClass == 16 then
                -- Helicopter or Plane
                if Config.EnableAircraftSpeedometer then
                    vehicleType = "aircraft"
                end
            elseif vehicleClass == 14 then
                -- Boat
                if Config.EnableBoatSpeedometer then
                    vehicleType = "boat"
                end
            else
                -- Car/Motorcycle
                if Config.EnableCarSpeedometer then
                    vehicleType = "car"
                end
            end
        end
        
        -- Get location info
        local pos = GetEntityCoords(playerPed)
        local streetHash, crossingHash = GetStreetNameAtCoord(pos.x, pos.y, pos.z)
        local streetName = GetStreetNameFromHashKey(streetHash)
        local zoneName = GetLabelText(GetNameOfZone(pos.x, pos.y, pos.z))
        
        -- Get time
        local hour = GetClockHours()
        local minute = GetClockMinutes()
        local timeString = ""
        
        if Config.Show24HourClock then
            timeString = string.format("%02d:%02d", hour, minute)
        else
            local period = "AM"
            local displayHour = hour
            if hour >= 12 then
                period = "PM"
                if hour > 12 then
                    displayHour = hour - 12
                end
            end
            if displayHour == 0 then
                displayHour = 12
            end
            timeString = string.format("%02d:%02d %s", displayHour, minute, period)
        end
        
        -- Get stamina
        local stamina = 100 - GetPlayerSprintStaminaRemaining(playerId)
        
            -- Send data to NUI
            SendNUIMessage({
                action = "updateHUD",
                data = {
                    health = math.floor(health),
                    armor = armor,
                    stamina = math.floor(stamina),
                    isInVehicle = isInVehicle,
                    vehicleType = vehicleType,
                    speed = speed,
                    fuel = math.floor(fuel),
                    engineHealth = math.floor(engineHealth),
                    streetName = streetName,
                    zoneName = zoneName,
                    time = timeString,
                    speedUnit = Config.SpeedUnit
                }
            })
        end
    end
end)

-- ESX Status (Hunger/Thirst)
if Config.ShowHunger or Config.ShowThirst then
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(1000)
            
            if playerLoaded then
                TriggerEvent('esx_status:getStatus', 'hunger', function(status)
                    if status then
                        local hunger = status.getPercent()
                        SendNUIMessage({
                            action = "updateStatus",
                            status = "hunger",
                            value = math.floor(hunger)
                        })
                    end
                end)
                
                TriggerEvent('esx_status:getStatus', 'thirst', function(status)
                    if status then
                        local thirst = status.getPercent()
                        SendNUIMessage({
                            action = "updateStatus",
                            status = "thirst",
                            value = math.floor(thirst)
                        })
                    end
                end)
            end
        end
    end)
end

-- Minimap customization
if Config.EnableCustomMinimap then
    Citizen.CreateThread(function()
        local minimap = RequestScaleformMovie("minimap")
        
        while not HasScaleformMovieLoaded(minimap) do
            Wait(0)
        end
        
        SetMinimapComponentPosition("minimap", "L", "B", 0.0, -0.047, 0.1638, 0.183)
        SetMinimapComponentPosition("minimap_mask", "L", "B", 0.0, 0.0, 0.128, 0.20)
        SetMinimapComponentPosition("minimap_blur", "L", "B", -0.01, 0.025, 0.262, 0.300)
        
        SetRadarBigmapEnabled(false, false)
        SetRadarZoom(1100)
        
        -- Hide default health/armor bars
        Citizen.InvokeNative(0x0772DF77852C2E30, true)
    end)
end

-- Cinematic Mode Toggle
if Config.EnableCinematicMode then
    RegisterCommand('cinematicmode', function()
        cinematicMode = not cinematicMode
        if cinematicMode then
            ESX.ShowNotification('Cinematic Mode: ~g~ON')
        else
            ESX.ShowNotification('Cinematic Mode: ~r~OFF')
        end
    end, false)
    
    RegisterKeyMapping('cinematicmode', 'Toggle Cinematic Mode', 'keyboard', Config.CinematicModeKey)
end

-- Initialize HUD
Citizen.CreateThread(function()
    Wait(1000)
    SendNUIMessage({
        action = "initHUD",
        config = {
            serverName = Config.ServerName,
            showHealth = Config.ShowHealth,
            showArmor = Config.ShowArmor,
            showHunger = Config.ShowHunger,
            showThirst = Config.ShowThirst,
            showStamina = Config.ShowStamina,
            showFuel = Config.ShowFuel,
            showEngineHealth = Config.ShowEngineHealth,
            showStreetName = Config.ShowStreetName,
            showZoneName = Config.ShowZoneName,
            showLogo = Config.ShowLogo,
            useGreenZoneTheme = Config.UseGreenZoneTheme,
            themeColor = Config.ThemeColor
        }
    })
end)

-- Disable default HUD components
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        
        -- Hide default components
        HideHudComponentThisFrame(1)  -- Wanted Stars
        HideHudComponentThisFrame(2)  -- Weapon Icon
        HideHudComponentThisFrame(3)  -- Cash
        HideHudComponentThisFrame(4)  -- MP Cash
        HideHudComponentThisFrame(6)  -- Vehicle Name
        HideHudComponentThisFrame(7)  -- Area Name
        HideHudComponentThisFrame(8)  -- Vehicle Class
        HideHudComponentThisFrame(9)  -- Street Name
        HideHudComponentThisFrame(13) -- Cash Change
        HideHudComponentThisFrame(17) -- Save Game
        HideHudComponentThisFrame(20) -- Weapon Stats
        
        -- Only show radar when in vehicle or on foot (customize as needed)
        DisplayRadar(true)
    end
end)
