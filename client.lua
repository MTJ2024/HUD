local editMode = false

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
    
    SendNUIMessage({
        type = 'init',
        positions = savedPositions,
        elementSettings = savedElementSettings,
        theme = savedTheme
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
        
        -- Send all data to NUI
        SendNUIMessage({
            type = 'updateHUD',
            data = {
                health = healthPercent,
                armor = armor,
                stamina = math.floor(stamina),
                oxygen = math.floor(oxygen),
                stress = stress,
                sprint = math.floor(sprintEnergy),
                cash = 0, -- Should be integrated with your economy system
                bank = 0, -- Should be integrated with your economy system
                serverName = GetConvar('sv_projectName', 'FiveM Server'),
                compass = direction,
                street = locationText,
                weapon = weaponData,
                vehicle = vehicleData
            }
        })
    end
end)
