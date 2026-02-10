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

-- Register keybind for toggle edit mode (F9 key)
RegisterCommand('hudedit', function()
    toggleEditMode()
end, false)

RegisterKeyMapping('hudedit', 'Toggle HUD Edit Mode', 'keyboard', 'F9')

-- Initialize HUD
CreateThread(function()
    Wait(1000)
    local savedPositions = loadPositions()
    SendNUIMessage({
        type = 'init',
        positions = savedPositions
    })
end)

-- Receive position updates from NUI
RegisterNUICallback('savePositions', function(data, cb)
    savePositions(data.positions)
    cb('ok')
end)

-- Close edit mode from NUI
RegisterNUICallback('closeEditMode', function(data, cb)
    if editMode then
        toggleEditMode()
    end
    cb('ok')
end)
