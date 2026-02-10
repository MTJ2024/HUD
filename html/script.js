let editMode = false;
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let elementScales = {}; // Individual scale for each element

// Mouse wheel scaling - PER ELEMENT
document.addEventListener('wheel', function(e) {
    if (editMode) {
        // Find which element is being hovered
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        const hudElement = hoveredElement?.closest('.hud-element');
        
        if (hudElement && hudElement.id) {
            e.preventDefault();
            
            // Get current scale for this element
            let currentScale = elementScales[hudElement.id] || 1.0;
            
            // Adjust scale based on wheel delta
            const delta = e.deltaY > 0 ? -0.05 : 0.05;
            currentScale = Math.max(0.5, Math.min(2.0, currentScale + delta));
            
            // Store and apply scale
            elementScales[hudElement.id] = currentScale;
            hudElement.style.transform = `scale(${currentScale})`;
            
            // Add visual feedback
            hudElement.style.boxShadow = '0 0 20px rgba(255, 204, 0, 0.8)';
            setTimeout(() => {
                hudElement.style.boxShadow = '';
            }, 200);
            
            // Save scales
            saveElementScales(elementScales);
        }
    }
}, { passive: false });

// Initialize
window.addEventListener('message', function(event) {
    const data = event.data;
    
    if (data.type === 'init') {
        loadPositions(data.positions);
        if (data.elementSettings) {
            loadElementSettings(data.elementSettings);
        } else {
            // Load default settings if none exist
            loadDefaultSettings();
        }
        if (data.theme) {
            loadTheme(data.theme);
        }
        if (data.scales) {
            loadElementScales(data.scales);
        }
    } else if (data.type === 'toggleEditMode') {
        toggleEditMode(data.enabled);
    } else if (data.type === 'updateHUD') {
        updateHUDData(data.data);
    }
});

// Load saved positions
function loadPositions(positions) {
    if (!positions || Object.keys(positions).length === 0) {
        return;
    }
    
    Object.keys(positions).forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element && positions[elementId]) {
            element.style.left = positions[elementId].left;
            element.style.top = positions[elementId].top;
            element.style.bottom = 'auto';
            element.style.right = 'auto';
        }
    });
}

// Save current positions
function savePositions() {
    const positions = {};
    const elements = document.querySelectorAll('.hud-element');
    
    elements.forEach(element => {
        positions[element.id] = {
            left: element.style.left,
            top: element.style.top
        };
    });
    
    // Send to Lua
    fetch(`https://${GetParentResourceName()}/savePositions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ positions: positions })
    });
}

// Toggle edit mode
function toggleEditMode(enabled) {
    editMode = enabled;
    const overlay = document.getElementById('edit-overlay');
    const settingsIcon = document.getElementById('settings-icon');
    const elements = document.querySelectorAll('.hud-element');
    
    if (enabled) {
        overlay.classList.remove('hidden');
        settingsIcon.classList.add('visible');
        elements.forEach(el => {
            el.classList.add('edit-mode');
            el.addEventListener('mousedown', startDrag);
        });
    } else {
        overlay.classList.add('hidden');
        settingsIcon.classList.remove('visible');
        elements.forEach(el => {
            el.classList.remove('edit-mode');
            el.removeEventListener('mousedown', startDrag);
        });
        savePositions();
    }
}

// Drag and drop functionality
function startDrag(e) {
    if (!editMode) return;
    
    draggedElement = e.currentTarget;
    draggedElement.classList.add('dragging');
    
    const rect = draggedElement.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    
    e.preventDefault();
}

function drag(e) {
    if (!draggedElement) return;
    
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;
    
    // Constrain to viewport
    const maxX = window.innerWidth - draggedElement.offsetWidth;
    const maxY = window.innerHeight - draggedElement.offsetHeight;
    
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    draggedElement.style.left = newX + 'px';
    draggedElement.style.top = newY + 'px';
    draggedElement.style.bottom = 'auto';
    draggedElement.style.right = 'auto';
}

function stopDrag() {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
        draggedElement = null;
    }
    
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

// Save button
document.getElementById('save-btn').addEventListener('click', function() {
    fetch(`https://${GetParentResourceName()}/closeEditMode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
});

// Element visibility toggles
const elementToggles = {
    'toggle-health': 'health-bar',
    'toggle-armor': 'armor-bar',
    'toggle-stamina': 'stamina-bar',
    'toggle-oxygen': 'oxygen-bar',
    'toggle-stress': 'stress-bar',
    'toggle-sprint': 'sprint-bar',
    'toggle-cash': 'cash-display',
    'toggle-bank': 'bank-display',
    'toggle-server': 'server-display',
    'toggle-id': 'id-display',
    'toggle-compass': 'compass-display',
    'toggle-street': 'street-display',
    'toggle-weapon': 'weapon-display',
    'toggle-speedometer': 'speedometer'
};

// Default settings - what should be visible by default
const defaultElementSettings = {
    'toggle-health': true,
    'toggle-armor': true,
    'toggle-stamina': true,
    'toggle-oxygen': false,  // Hidden by default
    'toggle-stress': false,  // Hidden by default
    'toggle-sprint': false,  // Hidden by default
    'toggle-cash': true,     // Visible individually
    'toggle-bank': true,     // Visible individually
    'toggle-server': true,   // Visible individually
    'toggle-id': true,       // Visible individually
    'toggle-compass': true,  // Visible individually
    'toggle-street': true,   // Visible individually
    'toggle-weapon': true,
    'toggle-speedometer': true
};

// Initialize element toggles
Object.keys(elementToggles).forEach(toggleId => {
    const checkbox = document.getElementById(toggleId);
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            const elementId = elementToggles[toggleId];
            const element = document.getElementById(elementId);
            if (element) {
                if (this.checked) {
                    element.classList.remove('hud-hidden');
                } else {
                    element.classList.add('hud-hidden');
                }
                saveElementSettings();
            }
        });
    }
});

// Theme selector
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const theme = this.dataset.theme;
        
        // Update active button
        themeButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Apply theme to body
        document.body.className = 'theme-' + theme;
        
        // Save theme
        saveTheme(theme);
    });
});

// Save element visibility settings
function saveElementSettings() {
    const settings = {};
    Object.keys(elementToggles).forEach(toggleId => {
        const checkbox = document.getElementById(toggleId);
        if (checkbox) {
            settings[toggleId] = checkbox.checked;
        }
    });
    
    fetch(`https://${GetParentResourceName()}/saveElementSettings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ settings: settings })
    });
}

// Save theme
function saveTheme(theme) {
    fetch(`https://${GetParentResourceName()}/saveTheme`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ theme: theme })
    });
}

// Load element settings
function loadElementSettings(settings) {
    if (!settings) return;
    
    Object.keys(elementToggles).forEach(toggleId => {
        const checkbox = document.getElementById(toggleId);
        const elementId = elementToggles[toggleId];
        const element = document.getElementById(elementId);
        
        if (checkbox && element && settings.hasOwnProperty(toggleId)) {
            checkbox.checked = settings[toggleId];
            if (!settings[toggleId]) {
                element.classList.add('hud-hidden');
            } else {
                element.classList.remove('hud-hidden');
            }
        }
    });
}

// Load default settings
function loadDefaultSettings() {
    Object.keys(defaultElementSettings).forEach(toggleId => {
        const checkbox = document.getElementById(toggleId);
        const elementId = elementToggles[toggleId];
        const element = document.getElementById(elementId);
        
        if (checkbox && element) {
            checkbox.checked = defaultElementSettings[toggleId];
            if (!defaultElementSettings[toggleId]) {
                element.classList.add('hud-hidden');
            } else {
                element.classList.remove('hud-hidden');
            }
        }
    });
}

// Load individual element scales
function loadElementScales(scales) {
    if (!scales || typeof scales !== 'object') return;
    
    elementScales = scales;
    
    // Apply scales to each element
    Object.keys(scales).forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            const scale = parseFloat(scales[elementId]) || 1.0;
            element.style.transform = `scale(${scale})`;
        }
    });
}

// Save individual element scales
function saveElementScales(scales) {
    fetch(`https://${GetParentResourceName()}/saveElementScales`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ scales: scales })
    });
}

// Load theme
function loadTheme(theme) {
    if (!theme) theme = 'blue';
    
    document.body.className = 'theme-' + theme;
    
    themeButtons.forEach(btn => {
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Helper function to get resource name
function GetParentResourceName() {
    // Default to the resource folder name
    let resourceName = 'hud';
    if (window.location.href.includes('://nui/')) {
        const match = window.location.href.match(/nui:\/\/([^\/]+)/);
        if (match) {
            resourceName = match[1];
        }
    }
    return resourceName;
}

// Update HUD data from game
function updateHUDData(data) {
    // Update health
    if (data.health !== undefined) {
        const healthBar = document.querySelector('#health-bar .hud-bar-fill');
        const healthValue = document.querySelector('#health-bar .hud-value');
        if (healthBar) healthBar.style.width = data.health + '%';
        if (healthValue) healthValue.textContent = data.health;
    }
    
    // Update armor
    if (data.armor !== undefined) {
        const armorBar = document.querySelector('#armor-bar .hud-bar-fill');
        const armorValue = document.querySelector('#armor-bar .hud-value');
        if (armorBar) armorBar.style.width = data.armor + '%';
        if (armorValue) armorValue.textContent = data.armor;
    }
    
    // Update stamina
    if (data.stamina !== undefined) {
        const staminaBar = document.querySelector('#stamina-bar .hud-bar-fill');
        const staminaValue = document.querySelector('#stamina-bar .hud-value');
        if (staminaBar) staminaBar.style.width = data.stamina + '%';
        if (staminaValue) staminaValue.textContent = data.stamina;
    }
    
    // Update oxygen
    if (data.oxygen !== undefined) {
        const oxygenBar = document.querySelector('#oxygen-bar .hud-bar-fill');
        const oxygenValue = document.querySelector('#oxygen-bar .hud-value');
        if (oxygenBar) oxygenBar.style.width = data.oxygen + '%';
        if (oxygenValue) oxygenValue.textContent = data.oxygen;
    }
    
    // Update stress
    if (data.stress !== undefined) {
        const stressBar = document.querySelector('#stress-bar .hud-bar-fill');
        const stressValue = document.querySelector('#stress-bar .hud-value');
        if (stressBar) stressBar.style.width = data.stress + '%';
        if (stressValue) stressValue.textContent = data.stress;
    }
    
    // Update sprint energy
    if (data.sprint !== undefined) {
        const sprintBar = document.querySelector('#sprint-bar .hud-bar-fill');
        const sprintValue = document.querySelector('#sprint-bar .hud-value');
        if (sprintBar) sprintBar.style.width = data.sprint + '%';
        if (sprintValue) sprintValue.textContent = data.sprint;
    }
    
    // Update cash
    if (data.cash !== undefined) {
        const cashText = document.querySelector('#cash-display .hud-text');
        if (cashText) cashText.textContent = '$' + formatNumber(data.cash);
    }
    
    // Update bank
    if (data.bank !== undefined) {
        const bankText = document.querySelector('#bank-display .hud-text');
        if (bankText) bankText.textContent = '$' + formatNumber(data.bank);
    }
    
    // Update server name
    if (data.serverName !== undefined) {
        const serverText = document.querySelector('#server-display .hud-text');
        if (serverText) serverText.textContent = data.serverName;
    }
    
    // Update player ID
    if (data.playerId !== undefined) {
        const idText = document.querySelector('#id-display .hud-text');
        if (idText) idText.textContent = 'ID: ' + data.playerId;
    }
    
    // Update compass
    if (data.compass !== undefined) {
        const compassText = document.querySelector('#compass-display .hud-text');
        if (compassText) compassText.textContent = data.compass;
    }
    
    // Update street name
    if (data.street !== undefined) {
        const streetText = document.querySelector('#street-display .hud-text');
        if (streetText) streetText.textContent = data.street;
    }
    
    // Update weapon display
    const weaponDisplay = document.getElementById('weapon-display');
    if (data.weapon && weaponDisplay) {
        weaponDisplay.style.display = 'flex';
        const weaponName = weaponDisplay.querySelector('.weapon-name');
        const weaponId = weaponDisplay.querySelector('.weapon-id');
        const weaponAmmo = weaponDisplay.querySelector('.weapon-ammo');
        
        if (weaponName) weaponName.textContent = data.weapon.name;
        if (weaponId) weaponId.textContent = 'ID: ' + data.weapon.id;
        if (weaponAmmo) weaponAmmo.textContent = data.weapon.ammoInClip + '/' + data.weapon.ammoReserve;
    } else if (weaponDisplay) {
        weaponDisplay.style.display = 'none';
    }
    
    // Update speedometer display
    const speedometer = document.getElementById('speedometer');
    if (data.vehicle && speedometer) {
        speedometer.style.display = 'flex';
        
        const speedoIcon = speedometer.querySelector('.speedo-icon');
        const speedoSpeed = speedometer.querySelector('.speedo-speed');
        const speedoGear = speedometer.querySelector('.speedo-gear');
        
        if (speedoIcon) speedoIcon.textContent = data.vehicle.icon;
        if (speedoSpeed) {
            speedoSpeed.textContent = data.vehicle.speed;
            // Add high-speed indicator
            if (data.vehicle.speed > 160) {
                speedoSpeed.classList.add('high-speed');
            } else {
                speedoSpeed.classList.remove('high-speed');
            }
        }
        if (speedoGear) speedoGear.textContent = data.vehicle.gear;
    } else if (speedometer) {
        speedometer.style.display = 'none';
    }
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

