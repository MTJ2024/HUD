local editMode = false
local ESX = nil
local PlayerData = {}

-- Try to get ESX
CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        
        -- Alternative method for newer ESX versions
        if ESX == nil then
            ESX = exports['es_extended']:getSharedObject()
        end
        
        Wait(100)
    end
    
    -- Get player data when ESX is ready
    while not ESX.IsPlayerLoaded() do
        Wait(100)
    end
    
    PlayerData = ESX.GetPlayerData()
end)

-- Update player data on change
RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
    PlayerData = xPlayer
end)

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
    PlayerData.job = job
end)

RegisterNetEvent('esx:setAccountMoney')
AddEventHandler('esx:setAccountMoney', function(account)
    if PlayerData.accounts then
        for i=1, #PlayerData.accounts, 1 do
            if PlayerData.accounts[i].name == account.name then
                PlayerData.accounts[i] = account
                break
            end
        end
    end
end)

-- Load saved positions from KVP storage
local function loadPositions()
    local positions = {}
    local data = GetResourceKvpString('hud_positions')
    if data then
        positions = json.decode(data)
    end
    return positions
end

-- Save positions to KVP storage
local function savePositions(positions)
    SetResourceKvp('hud_positions', json.encode(positions))
end

-- Load element settings
local function loadElementSettings()
    local settings = {}
    local data = GetResourceKvpString('hud_element_settings')
    if data then
        settings = json.decode(data)
    end
    return settings
end

-- Save element settings
local function saveElementSettings(settings)
    SetResourceKvp('hud_element_settings', json.encode(settings))
end

-- Load theme
local function loadTheme()
    local theme = GetResourceKvpString('hud_theme')
    return theme or 'blue'
end

-- Save theme
local function saveTheme(theme)
    SetResourceKvp('hud_theme', theme)
end

-- Load HUD scale
local function loadHudScale()
    local scale = GetResourceKvpString('hud_scale')
    return scale or '1.0'
end

-- Save HUD scale
local function saveHudScale(scale)
    SetResourceKvp('hud_scale', tostring(scale))
end

-- Load individual element scales
local function loadElementScales()
    local scales = {}
    local data = GetResourceKvpString('hud_element_scales')
    if data then
        scales = json.decode(data)
    end
    return scales
end

-- Save individual element scales
local function saveElementScales(scales)
    SetResourceKvp('hud_element_scales', json.encode(scales))
end

-- Toggle edit mode
local function toggleEditMode()
    editMode = not editMode
    SendNUIMessage({
        type = 'toggleEditMode',
        enabled = editMode
    })
    
    if editMode then
        SetNuiFocus(true, true)
        TriggerEvent('chat:addMessage', {
            color = {0, 255, 0},
            multiline = true,
            args = {"HUD", "Edit-Modus aktiviert. Positioniere die HUD-Elemente mit der Maus."}
        })
    else
        SetNuiFocus(false, false)
        TriggerEvent('chat:addMessage', {
            color = {255, 165, 0},
            multiline = true,
            args = {"HUD", "Edit-Modus deaktiviert. Positionen gespeichert."}
        })
    end
end

-- Register keybind for toggle edit mode (F10 key)
RegisterCommand('hudedit', function()
    toggleEditMode()
end, false)

RegisterKeyMapping('hudedit', 'Toggle HUD Edit Mode', 'keyboard', 'F10')

-- Initialize HUD
CreateThread(function()
    -- Wait for NUI to be fully loaded before sending initial data
    Wait(1000)
    local savedPositions = loadPositions()
    local savedElementSettings = loadElementSettings()
    local savedTheme = loadTheme()
    local savedScales = loadElementScales()
    
    SendNUIMessage({
        type = 'init',
        positions = savedPositions,
        elementSettings = savedElementSettings,
        theme = savedTheme,
        scales = savedScales
    })
end)

-- Receive position updates from NUI
RegisterNUICallback('savePositions', function(data, cb)
    savePositions(data.positions)
    cb('ok')
end)

-- Save element settings from NUI
RegisterNUICallback('saveElementSettings', function(data, cb)
    saveElementSettings(data.settings)
    cb('ok')
end)

-- Save theme from NUI
RegisterNUICallback('saveTheme', function(data, cb)
    saveTheme(data.theme)
    cb('ok')
end)

-- Save individual element scales from NUI
RegisterNUICallback('saveElementScales', function(data, cb)
    saveElementScales(data.scales)
    cb('ok')
end)

-- Close edit mode from NUI
RegisterNUICallback('closeEditMode', function(data, cb)
    if editMode then
        toggleEditMode()
    end
    cb('ok')
end)

-- Update HUD data continuously
CreateThread(function()
    while true do
        Wait(100) -- Update every 100ms
        
        local playerPed = PlayerPedId()
        local playerId = PlayerId()
        
        -- Check if pause menu is active (ESC menu)
        local isPauseMenuActive = IsPauseMenuActive()
        
        -- Get player stats
        local health = GetEntityHealth(playerPed) - 100 -- Remove base 100
        local maxHealth = GetEntityMaxHealth(playerPed) - 100
        local healthPercent = math.floor((health / maxHealth) * 100)
        
        local armor = GetPedArmour(playerPed)
        
        -- Stamina (special ability)
        local stamina = 100 - GetPlayerSprintStaminaRemaining(playerId)
        
        -- Oxygen (underwater)
        local oxygen = GetPlayerUnderwaterTimeRemaining(playerId) * 10
        oxygen = math.min(100, math.max(0, oxygen))
        
        -- Stress (simulated - can be replaced with actual stress system)
        local stress = 0 -- This should be integrated with your stress system
        
        -- Sprint energy (stamina remaining for sprint)
        local sprintEnergy = GetPlayerSprintStaminaRemaining(playerId)
        
        -- Get location info
        local coords = GetEntityCoords(playerPed)
        local streetHash, crossingHash = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
        local streetName = GetStreetNameFromHashKey(streetHash)
        local crossingName = GetStreetNameFromHashKey(crossingHash)
        local locationText = streetName
        if crossingName ~= "" then
            locationText = streetName .. " / " .. crossingName
        end
        
        -- Get heading/compass direction
        local heading = GetEntityHeading(playerPed)
        local direction = "N"
        if heading >= 337.5 or heading < 22.5 then
            direction = "N"
        elseif heading >= 22.5 and heading < 67.5 then
            direction = "NE"
        elseif heading >= 67.5 and heading < 112.5 then
            direction = "E"
        elseif heading >= 112.5 and heading < 157.5 then
            direction = "SE"
        elseif heading >= 157.5 and heading < 202.5 then
            direction = "S"
        elseif heading >= 202.5 and heading < 247.5 then
            direction = "SW"
        elseif heading >= 247.5 and heading < 292.5 then
            direction = "W"
        elseif heading >= 292.5 and heading < 337.5 then
            direction = "NW"
        end
        
        -- Get weapon info
        local hasWeapon, currentWeapon = GetCurrentPedWeapon(playerPed, true)
        local weaponData = nil
        
        if hasWeapon and currentWeapon ~= GetHashKey("WEAPON_UNARMED") then
            local weaponName = GetWeapontypeGroup(currentWeapon)
            local ammoInClip = GetAmmoInClip(playerPed, currentWeapon)
            local ammoTotal = GetAmmoInPedWeapon(playerPed, currentWeapon)
            local ammoReserve = ammoTotal - ammoInClip
            
            weaponData = {
                name = GetLabelText(GetWeapontypeModel(currentWeapon)) or "Unknown",
                id = currentWeapon,
                ammoInClip = ammoInClip,
                ammoReserve = ammoReserve,
                ammoTotal = ammoTotal
            }
        end
        
        -- Get vehicle info
        local vehicleData = nil
        local vehicle = GetVehiclePedIsIn(playerPed, false)
        
        if vehicle ~= 0 and GetPedInVehicleSeat(vehicle, -1) == playerPed then
            local speed = GetEntitySpeed(vehicle) * 3.6 -- Convert to km/h
            local gear = GetVehicleCurrentGear(vehicle)
            local maxGears = GetVehicleHandlingFloat(vehicle, 'CHandlingData', 'nInitialDriveGears')
            local rpm = GetVehicleCurrentRpm(vehicle)
            local vehicleClass = GetVehicleClass(vehicle)
            
            -- Determine vehicle icon
            local vehicleIcon = "🚗"
            if vehicleClass == 15 then -- Helicopter
                vehicleIcon = "🚁"
            elseif vehicleClass == 16 then -- Plane
                vehicleIcon = "✈️"
            elseif vehicleClass == 14 then -- Boat
                vehicleIcon = "🚤"
            elseif vehicleClass == 8 then -- Motorcycle
                vehicleIcon = "🏍️"
            elseif vehicleClass == 18 then -- Emergency
                vehicleIcon = "🚑"
            end
            
            -- Get gear display
            local gearDisplay = tostring(gear)
            if gear == 0 then
                gearDisplay = "R"
            elseif not IsVehicleEngineOn(vehicle) then
                gearDisplay = "N"
            end
            
            vehicleData = {
                speed = math.floor(speed),
                gear = gearDisplay,
                rpm = math.floor(rpm * 100),
                icon = vehicleIcon,
                maxSpeed = math.floor(GetVehicleEstimatedMaxSpeed(vehicle) * 3.6)
            }
        end
        
        -- Get ESX account data
        local cash = 0
        local bank = 0
        
        if ESX and PlayerData.accounts then
            for i=1, #PlayerData.accounts, 1 do
                if PlayerData.accounts[i].name == 'money' then
                    cash = PlayerData.accounts[i].money
                elseif PlayerData.accounts[i].name == 'bank' then
                    bank = PlayerData.accounts[i].money
                end
            end
        end
        
        -- Get hunger and thirst from ESX status
        local hunger = 0
        local thirst = 0
        
        TriggerEvent('esx_status:getStatus', 'hunger', function(status)
            if status then
                hunger = math.floor(status.getPercent())
            end
        end)
        
        TriggerEvent('esx_status:getStatus', 'thirst', function(status)
            if status then
                thirst = math.floor(status.getPercent())
            end
        end)
        
        -- Send all data to NUI
        SendNUIMessage({
            type = 'updateHUD',
            isPauseMenuActive = isPauseMenuActive,
            data = {
                health = healthPercent,
                armor = armor,
                stamina = math.floor(stamina),
                oxygen = math.floor(oxygen),
                stress = stress,
                sprint = math.floor(sprintEnergy),
                hunger = hunger,
                thirst = thirst,
                cash = cash,
                bank = bank,
                serverName = GetConvar('sv_projectName', 'FiveM Server'),
                playerId = GetPlayerServerId(playerId),
                compass = direction,
                street = locationText,
                weapon = weaponData,
                vehicle = vehicleData
            }
        })
    end
end)
