let editMode = false;
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let elementScales = {}; // Individual scale for each element

// Layout Presets
const layoutPresets = {
    'esx-classic': {
        'health-bar': { left: '20px', top: 'auto', bottom: '240px', right: 'auto' },
        'armor-bar': { left: '20px', top: 'auto', bottom: '272px', right: 'auto' },
        'stamina-bar': { left: '20px', top: 'auto', bottom: '304px', right: 'auto' },
        'hunger-bar': { left: '20px', top: 'auto', bottom: '336px', right: 'auto' },
        'thirst-bar': { left: '20px', top: 'auto', bottom: '368px', right: 'auto' },
        'sprint-bar': { left: '20px', top: 'auto', bottom: '400px', right: 'auto' },
        'oxygen-bar': { left: '20px', top: 'auto', bottom: '432px', right: 'auto' },
        'stress-bar': { left: '20px', top: 'auto', bottom: '464px', right: 'auto' },
        'cash-display': { left: 'auto', top: '20px', bottom: 'auto', right: '20px' },
        'bank-display': { left: 'auto', top: '56px', bottom: 'auto', right: '20px' },
        'server-display': { left: '50%', top: '20px', bottom: 'auto', right: 'auto', transform: 'translateX(-50%)' },
        'id-display': { left: '50%', top: '56px', bottom: 'auto', right: 'auto', transform: 'translateX(-50%)' },
        'compass-display': { left: '50%', top: '92px', bottom: 'auto', right: 'auto', transform: 'translateX(-50%)' },
        'street-display': { left: '50%', top: 'auto', bottom: '170px', right: 'auto', transform: 'translateX(-50%)' },
        'weapon-display': { left: '50%', top: 'auto', bottom: '140px', right: 'auto', transform: 'translateX(-50%)' },
        'speedometer': { left: '50%', top: 'auto', bottom: '20px', right: 'auto', transform: 'translateX(-50%)' }
    },
    'minimal-clean': {
        'health-bar': { left: '20px', top: '20px', bottom: 'auto', right: 'auto' },
        'armor-bar': { left: '20px', top: '52px', bottom: 'auto', right: 'auto' },
        'stamina-bar': { left: '20px', top: '84px', bottom: 'auto', right: 'auto' },
        'hunger-bar': { left: '20px', top: '116px', bottom: 'auto', right: 'auto' },
        'thirst-bar': { left: '20px', top: '148px', bottom: 'auto', right: 'auto' },
        'sprint-bar': { left: '20px', top: '180px', bottom: 'auto', right: 'auto' },
        'oxygen-bar': { left: '20px', top: '212px', bottom: 'auto', right: 'auto' },
        'stress-bar': { left: '20px', top: '244px', bottom: 'auto', right: 'auto' },
        'cash-display': { left: 'auto', top: '20px', bottom: 'auto', right: '20px' },
        'bank-display': { left: 'auto', top: '56px', bottom: 'auto', right: '20px' },
        'server-display': { left: 'auto', top: '92px', bottom: 'auto', right: '20px' },
        'id-display': { left: 'auto', top: '128px', bottom: 'auto', right: '20px' },
        'compass-display': { left: 'auto', top: '164px', bottom: 'auto', right: '20px' },
        'street-display': { left: '50%', top: 'auto', bottom: '170px', right: 'auto', transform: 'translateX(-50%)' },
        'weapon-display': { left: '50%', top: 'auto', bottom: '140px', right: 'auto', transform: 'translateX(-50%)' },
        'speedometer': { left: '50%', top: 'auto', bottom: '20px', right: 'auto', transform: 'translateX(-50%)' }
    },
    'traditional': {
        'health-bar': { left: '20px', top: '20px', bottom: 'auto', right: 'auto' },
        'armor-bar': { left: '20px', top: '52px', bottom: 'auto', right: 'auto' },
        'stamina-bar': { left: '20px', top: 'auto', bottom: '120px', right: 'auto' },
        'hunger-bar': { left: '20px', top: 'auto', bottom: '152px', right: 'auto' },
        'thirst-bar': { left: '20px', top: 'auto', bottom: '184px', right: 'auto' },
        'sprint-bar': { left: '20px', top: 'auto', bottom: '216px', right: 'auto' },
        'oxygen-bar': { left: 'auto', top: 'auto', bottom: '120px', right: '20px' },
        'stress-bar': { left: 'auto', top: 'auto', bottom: '152px', right: '20px' },
        'cash-display': { left: 'auto', top: '20px', bottom: 'auto', right: '20px' },
        'bank-display': { left: 'auto', top: '56px', bottom: 'auto', right: '20px' },
        'server-display': { left: 'auto', top: '92px', bottom: 'auto', right: '20px' },
        'id-display': { left: 'auto', top: '128px', bottom: 'auto', right: '20px' },
        'compass-display': { left: 'auto', top: '164px', bottom: 'auto', right: '20px' },
        'street-display': { left: '50%', top: 'auto', bottom: '170px', right: 'auto', transform: 'translateX(-50%)' },
        'weapon-display': { left: '50%', top: 'auto', bottom: '140px', right: 'auto', transform: 'translateX(-50%)' },
        'speedometer': { left: '50%', top: 'auto', bottom: '20px', right: 'auto', transform: 'translateX(-50%)' }
    }
};

function applyPreset(presetName) {
    if (presetName === 'custom') return; // Don't apply preset in custom mode
    
    const preset = layoutPresets[presetName];
    if (!preset) return;
    
    Object.keys(preset).forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            const pos = preset[elementId];
            element.style.left = pos.left;
            element.style.top = pos.top;
            element.style.bottom = pos.bottom;
            element.style.right = pos.right;
            if (pos.transform) {
                element.style.transform = pos.transform;
            } else {
                element.style.transform = elementScales[elementId] ? `scale(${elementScales[elementId]})` : '';
            }
        }
    });
}

function saveSelectedPreset(presetName) {
    localStorage.setItem('hud_selected_preset', presetName);
    fetch(`https://${GetParentResourceName()}/savePreset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preset: presetName })
    });
}

// Ensure element stays within viewport bounds
function constrainElementToViewport(element) {
    if (!element) return;
    
    const scale = elementScales[element.id] || 1.0;
    const scaledWidth = element.offsetWidth * scale;
    const scaledHeight = element.offsetHeight * scale;
    
    // Get current position
    let left = parseFloat(element.style.left) || 0;
    let top = parseFloat(element.style.top) || 0;
    
    // Calculate max positions
    const maxX = window.innerWidth - scaledWidth;
    const maxY = window.innerHeight - scaledHeight;
    
    // Constrain to viewport
    left = Math.max(0, Math.min(left, maxX));
    top = Math.max(0, Math.min(top, maxY));
    
    // Apply constrained positions
    element.style.left = left + 'px';
    element.style.top = top + 'px';
}

// Validate all elements are within viewport
function validateAllElementPositions() {
    const elements = document.querySelectorAll('.hud-element');
    elements.forEach(element => {
        constrainElementToViewport(element);
    });
}

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
            
            // Ensure element stays within viewport after scaling
            constrainElementToViewport(hudElement);
            
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
        // Hide HUD when pause menu is active (ESC pressed)
        const hudContainer = document.getElementById('hud-container');
        if (data.isPauseMenuActive) {
            hudContainer.style.display = 'none';
        } else {
            hudContainer.style.display = 'block';
        }
        
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
            // Parse position values
            let left = parseFloat(positions[elementId].left) || 0;
            let top = parseFloat(positions[elementId].top) || 0;
            
            // Get element dimensions (with scale if applied)
            const scale = elementScales[elementId] || 1.0;
            const scaledWidth = element.offsetWidth * scale;
            const scaledHeight = element.offsetHeight * scale;
            
            // Ensure element stays within viewport bounds
            const maxX = window.innerWidth - scaledWidth;
            const maxY = window.innerHeight - scaledHeight;
            
            // Constrain position to viewport
            left = Math.max(0, Math.min(left, maxX));
            top = Math.max(0, Math.min(top, maxY));
            
            // Apply constrained positions
            element.style.left = left + 'px';
            element.style.top = top + 'px';
            element.style.bottom = 'auto';
            element.style.right = 'auto';
        }
    });
    
    // Validate all positions after a short delay to ensure DOM is updated
    setTimeout(() => {
        validateAllElementPositions();
    }, 100);
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
    const speedometer = document.getElementById('speedometer');
    const weaponDisplay = document.getElementById('weapon-display');
    
    if (enabled) {
        overlay.classList.remove('hidden');
        settingsIcon.classList.add('visible');
        elements.forEach(el => {
            el.classList.add('edit-mode');
            el.addEventListener('mousedown', startDrag);
        });
        
        // Show conditional elements in edit mode for positioning
        if (speedometer) {
            speedometer.style.display = 'flex';
            speedometer.classList.add('edit-placeholder');
        }
        if (weaponDisplay) {
            weaponDisplay.style.display = 'block';
            weaponDisplay.classList.add('edit-placeholder');
        }
        
        // Validate all elements are within viewport when entering edit mode
        setTimeout(() => {
            validateAllElementPositions();
        }, 50);
    } else {
        overlay.classList.add('hidden');
        settingsIcon.classList.remove('visible');
        elements.forEach(el => {
            el.classList.remove('edit-mode');
            el.removeEventListener('mousedown', startDrag);
        });
        
        // Remove edit placeholders - elements will be shown/hidden based on game state
        if (speedometer) {
            speedometer.classList.remove('edit-placeholder');
        }
        if (weaponDisplay) {
            weaponDisplay.classList.remove('edit-placeholder');
        }
        
        // Final validation before saving
        validateAllElementPositions();
        savePositions();
    }
}

// Drag and drop functionality
function startDrag(e) {
    if (!editMode) return;
    
    draggedElement = e.currentTarget;
    draggedElement.classList.add('dragging');
    
    // Account for any scale transform
    const rect = draggedElement.getBoundingClientRect();
    const scale = elementScales[draggedElement.id] || 1.0;
    
    // Calculate offset accounting for scale
    offsetX = (e.clientX - rect.left) / scale;
    offsetY = (e.clientY - rect.top) / scale;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    
    e.preventDefault();
    e.stopPropagation();
}

function drag(e) {
    if (!draggedElement) return;
    
    const scale = elementScales[draggedElement.id] || 1.0;
    const scaledWidth = draggedElement.offsetWidth * scale;
    const scaledHeight = draggedElement.offsetHeight * scale;
    
    let newX = e.clientX - (offsetX * scale);
    let newY = e.clientY - (offsetY * scale);
    
    // Constrain to viewport
    const maxX = window.innerWidth - scaledWidth;
    const maxY = window.innerHeight - scaledHeight;
    
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    draggedElement.style.left = newX + 'px';
    draggedElement.style.top = newY + 'px';
    draggedElement.style.bottom = 'auto';
    draggedElement.style.right = 'auto';
    
    e.preventDefault();
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
    'toggle-hunger': 'hunger-bar',
    'toggle-thirst': 'thirst-bar',
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
    'toggle-hunger': true,   // Visible by default
    'toggle-thirst': true,   // Visible by default
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
                
                // Validate position when toggling visibility in edit mode
                if (editMode) {
                    setTimeout(() => {
                        constrainElementToViewport(element);
                    }, 50);
                }
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
            // Ensure element stays within viewport after applying scale
            constrainElementToViewport(element);
        }
    });
    
    // Additional validation after all scales are applied
    setTimeout(() => {
        validateAllElementPositions();
    }, 100);
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
// Helper function to update circular progress indicators
function updateCircleProgress(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const circle = element.querySelector('.circle-fill');
    const valueDisplay = element.querySelector('.hud-value');
    
    if (circle) {
        // Calculate stroke-dashoffset based on percentage
        // Full circle = 138 (2 * PI * r = 2 * 3.14159 * 22)
        const circumference = 138;
        const offset = circumference - (value / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
    
    if (valueDisplay) {
        valueDisplay.textContent = Math.floor(value);
    }
}

// Helper function to update bar progress
function updateBarProgress(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const barProgress = element.querySelector('.bar-progress');
    const barValue = element.querySelector('.bar-value');
    
    if (barProgress) {
        barProgress.style.width = value + '%';
    }
    
    if (barValue) {
        barValue.textContent = Math.floor(value);
    }
}

function updateHUDData(data) {
    // Update health
    if (data.health !== undefined) {
        updateBarProgress('health-bar', data.health);
    }
    
    // Update armor
    if (data.armor !== undefined) {
        updateBarProgress('armor-bar', data.armor);
    }
    
    // Update stamina
    if (data.stamina !== undefined) {
        updateBarProgress('stamina-bar', data.stamina);
    }
    
    // Update oxygen
    if (data.oxygen !== undefined) {
        updateBarProgress('oxygen-bar', data.oxygen);
    }
    
    // Update stress
    if (data.stress !== undefined) {
        updateBarProgress('stress-bar', data.stress);
    }
    
    // Update sprint energy
    if (data.sprint !== undefined) {
        updateBarProgress('sprint-bar', data.sprint);
    }
    
    // Update hunger
    if (data.hunger !== undefined) {
        updateBarProgress('hunger-bar', data.hunger);
    }
    
    // Update thirst
    if (data.thirst !== undefined) {
        updateBarProgress('thirst-bar', data.thirst);
    }
    
    // Update cash
    if (data.cash !== undefined) {
        const cashValue = document.querySelector('#cash-display .bar-value');
        if (cashValue) cashValue.textContent = '$' + formatNumber(data.cash);
    }
    
    // Update bank
    if (data.bank !== undefined) {
        const bankValue = document.querySelector('#bank-display .bar-value');
        if (bankValue) bankValue.textContent = '$' + formatNumber(data.bank);
    }
    
    // Update server name
    if (data.serverName !== undefined) {
        const serverValue = document.querySelector('#server-display .bar-value');
        if (serverValue) serverValue.textContent = data.serverName;
    }
    
    // Update player ID
    if (data.playerId !== undefined) {
        const idValue = document.querySelector('#id-display .bar-value');
        if (idValue) idValue.textContent = data.playerId;
    }
    
    // Update compass
    if (data.compass !== undefined) {
        const compassValue = document.querySelector('#compass-display .bar-value');
        if (compassValue) compassValue.textContent = data.compass;
    }
    
    // Update street name
    if (data.street !== undefined) {
        const streetValue = document.querySelector('#street-display .bar-value');
        if (streetValue) streetValue.textContent = data.street;
    }
    
    // Update weapon display
    const weaponDisplay = document.getElementById('weapon-display');
    if (data.weapon && weaponDisplay) {
        weaponDisplay.style.display = 'flex';
        const weaponName = weaponDisplay.querySelector('.weapon-name');
        const weaponAmmo = weaponDisplay.querySelector('.weapon-ammo');
        
        if (weaponName) weaponName.textContent = data.weapon.name;
        if (weaponAmmo) weaponAmmo.textContent = data.weapon.ammoInClip + ' / ' + data.weapon.ammoReserve;
    } else if (weaponDisplay && !editMode) {
        weaponDisplay.style.display = 'none';
    }
    
    // Update professional speedometer with indicators for all vehicle types
    const speedometer = document.getElementById('speedometer');
    if (data.vehicle && speedometer) {
        speedometer.style.display = 'block';
        
        const speedNumber = speedometer.querySelector('.speed-number');
        const gearNumber = speedometer.querySelector('.gear-number');
        const gearLabel = speedometer.querySelector('.gear-label');
        const fuelFill = speedometer.querySelector('.fuel-fill');
        
        // Update speed
        if (speedNumber) {
            speedNumber.textContent = data.vehicle.speed;
            // Add high-speed indicator
            if (data.vehicle.speed > 160) {
                speedNumber.classList.add('high-speed');
            } else {
                speedNumber.classList.remove('high-speed');
            }
        }
        
        // Update gear/altitude
        if (gearNumber) gearNumber.textContent = data.vehicle.gear;
        if (gearLabel && data.vehicle.gearLabel) gearLabel.textContent = data.vehicle.gearLabel;
        
        // Update fuel bar
        if (fuelFill && data.vehicle.fuel !== undefined) {
            fuelFill.style.width = data.vehicle.fuel + '%';
            fuelFill.classList.remove('low', 'critical');
            if (data.vehicle.fuel < 25) {
                fuelFill.classList.add('low');
            }
            if (data.vehicle.fuel < 10) {
                fuelFill.classList.add('critical');
            }
        }
        
        // Update indicators
        updateIndicator('ind-engine', data.vehicle.engineOn || false);
        updateIndicator('ind-lights', data.vehicle.lightsOn || false, data.vehicle.lightsOn ? 'active' : '');
        updateIndicator('ind-door', data.vehicle.doorOpen || false, data.vehicle.doorOpen ? 'warning' : '');
        updateIndicator('ind-lock', data.vehicle.locked || false, data.vehicle.locked ? 'active' : '');
        updateIndicator('ind-fuel', data.vehicle.fuel !== undefined ? (data.vehicle.fuel < 25) : false, data.vehicle.fuel < 10 ? 'danger' : (data.vehicle.fuel < 25 ? 'warning' : ''));
        updateIndicator('ind-belt', data.vehicle.seatbelt || false, data.vehicle.seatbelt ? 'active' : 'warning');
        
    } else if (speedometer && !editMode) {
        speedometer.style.display = 'none';
    }
}

// Helper to update vehicle indicators
function updateIndicator(indicatorId, isActive, statusClass = '') {
    const indicator = document.getElementById(indicatorId);
    if (!indicator) return;
    
    indicator.classList.remove('active', 'warning', 'danger');
    
    if (isActive && statusClass) {
        indicator.classList.add(statusClass);
    } else if (isActive) {
        indicator.classList.add('active');
    }
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Window resize handler - ensure all elements stay within new viewport
window.addEventListener('resize', function() {
    validateAllElementPositions();
});

// Load preset on page load (BEFORE elements display - no jumping!)
window.addEventListener('DOMContentLoaded', function() {
    // 1. Load selected preset immediately
    const savedPreset = localStorage.getItem('hud_selected_preset') || 'esx-classic';
    const presetSelector = document.getElementById('layout-preset');
    if (presetSelector) {
        presetSelector.value = savedPreset;
    }
    
    // 2. Apply preset BEFORE anything else (prevents jumping)
    applyPreset(savedPreset);
    
    // 3. Load custom positions only if in custom mode
    if (savedPreset === 'custom') {
        setTimeout(() => {
            loadPositions();
            loadElementScales();
        }, 50);
    }
    
    // 4. Load element settings (visibility toggles)
    setTimeout(() => {
        loadElementSettings();
    }, 100);
    
    // 5. Final validation after everything loaded
    setTimeout(() => {
        validateAllElementPositions();
    }, 150);
});

// Initialize viewport validation on load
window.addEventListener('load', function() {
    validateAllElementPositions();
});

// Layout preset selector event handler
document.addEventListener('DOMContentLoaded', function() {
    const presetSelector = document.getElementById('layout-preset');
    if (presetSelector) {
        presetSelector.addEventListener('change', function() {
            const selectedPreset = this.value;
            
            // Save selection
            saveSelectedPreset(selectedPreset);
            
            // Apply immediately
            if (selectedPreset !== 'custom') {
                applyPreset(selectedPreset);
                validateAllElementPositions();
            }
            
            // Show feedback
            console.log(`Layout changed to: ${selectedPreset}`);
        });
    }
});

