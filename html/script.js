// ========================================
// GreenZone420 HUD Script
// Created by MTJ2024
// Professional FiveM HUD JavaScript
// ========================================

let config = {
    serverName: "GreenZone420",
    showHealth: true,
    showArmor: true,
    showHunger: true,
    showThirst: true,
    showStamina: true,
    showFuel: true,
    showEngineHealth: true,
    showStreetName: true,
    showZoneName: true,
    showLogo: true,
    useGreenZoneTheme: true,
    themeColor: { r: 76, g: 175, b: 80 }
};

let themeStylesApplied = false;

// Initialize HUD
document.addEventListener('DOMContentLoaded', function() {
    console.log("GreenZone420 HUD Loaded - Created by MTJ2024");
});

// Listen for NUI messages
window.addEventListener('message', function(event) {
    const data = event.data;
    
    switch(data.action) {
        case 'initHUD':
            initializeHUD(data.config);
            break;
        case 'updateHUD':
            updateHUD(data.data);
            break;
        case 'updateStatus':
            updateStatus(data.status, data.value);
            break;
        case 'hideHUD':
            hideHUD();
            break;
    }
});

// Initialize HUD with config
function initializeHUD(cfg) {
    config = { ...config, ...cfg };
    
    // Show/hide elements based on config
    if (config.showLogo) {
        removeClass(getId('server-logo'), 'hidden');
        getId('server-logo').querySelector('.logo-text').textContent = `🌿 ${config.serverName}`;
    }
    
    // Status bars visibility
    if (!config.showHealth) getId('health-bar').style.display = 'none';
    if (!config.showArmor) getId('armor-bar').style.display = 'none';
    if (!config.showHunger) getId('hunger-bar').style.display = 'none';
    if (!config.showThirst) getId('thirst-bar').style.display = 'none';
    if (!config.showStamina) getId('stamina-bar').style.display = 'none';
    
    // Apply theme
    if (config.useGreenZoneTheme && !themeStylesApplied) {
        applyGreenZoneTheme();
        themeStylesApplied = true;
    }
    
    console.log("HUD Initialized:", config);
}

// Update HUD data
function updateHUD(data) {
    // Update status bars
    if (config.showHealth) {
        updateStatusBar('health', data.health);
        
        // Critical health warning
        if (data.health < 25) {
            addClass(getId('health-bar'), 'health-critical');
        } else {
            removeClass(getId('health-bar'), 'health-critical');
        }
    }
    
    if (config.showArmor) {
        updateStatusBar('armor', data.armor);
    }
    
    if (config.showStamina) {
        updateStatusBar('stamina', data.stamina);
    }
    
    // Update vehicle speedometer
    if (data.isInVehicle && data.vehicleType !== 'none') {
        removeClass(getId('speedometer'), 'hidden');
        getId('speed-value').textContent = data.speed;
        getId('speed-unit').textContent = data.speedUnit;
        
        // Update vehicle icon
        const icon = getVehicleIcon(data.vehicleType);
        getId('vehicle-icon').textContent = icon;
        
        // High speed effect
        if (data.speed > 120) {
            addClass(getId('speed-value'), 'speed-high');
        } else {
            removeClass(getId('speed-value'), 'speed-high');
        }
        
        // Update fuel
        if (config.showFuel) {
            getId('fuel-value').textContent = data.fuel;
            
            // Low fuel warning
            if (data.fuel < 20) {
                addClass(getId('fuel-info'), 'warning');
            } else {
                removeClass(getId('fuel-info'), 'warning');
            }
        }
        
        // Update engine health
        if (config.showEngineHealth) {
            getId('engine-value').textContent = data.engineHealth;
            
            // Engine damage warning
            if (data.engineHealth < 50) {
                addClass(getId('engine-info'), 'warning');
            } else {
                removeClass(getId('engine-info'), 'warning');
            }
        }
    } else {
        addClass(getId('speedometer'), 'hidden');
    }
    
    // Update location and time
    removeClass(getId('location-info'), 'hidden');
    getId('time-display').textContent = data.time;
    
    if (config.showStreetName) {
        getId('street-name').textContent = data.streetName;
        getId('street-name').style.display = 'block';
    } else {
        getId('street-name').style.display = 'none';
    }
    
    if (config.showZoneName) {
        getId('zone-name').textContent = data.zoneName;
        getId('zone-name').style.display = 'block';
    } else {
        getId('zone-name').style.display = 'none';
    }
    
    // Show status container
    removeClass(getId('status-container'), 'hidden');
}

// Update individual status
function updateStatus(statusType, value) {
    updateStatusBar(statusType, value);
}

// Update status bar
function updateStatusBar(type, value) {
    const clampedValue = Math.max(0, Math.min(100, value));
    
    const fillElement = getId(`${type}-bar`).querySelector('.status-fill');
    const valueElement = getId(`${type}-bar`).querySelector('.status-value');
    
    if (fillElement) {
        fillElement.style.width = clampedValue + '%';
    }
    
    if (valueElement) {
        valueElement.textContent = Math.floor(clampedValue);
    }
}

// Get vehicle icon
function getVehicleIcon(vehicleType) {
    switch(vehicleType) {
        case 'car':
            return '🚗';
        case 'boat':
            return '🚤';
        case 'aircraft':
            return '✈️';
        default:
            return '🚗';
    }
}

// Apply GreenZone420 theme
function applyGreenZoneTheme() {
    addClass(document.body, 'greenzone-theme');
    
    // Apply dynamic theme color
    const themeColor = `rgb(${config.themeColor.r}, ${config.themeColor.g}, ${config.themeColor.b})`;
    
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'greenzone-theme-styles';
    style.innerHTML = `
        .status-bar {
            border-left-color: ${themeColor} !important;
        }
        .speedo-container {
            border-color: ${themeColor} !important;
        }
        .location-container {
            border-left-color: ${themeColor} !important;
        }
        .speed-value {
            color: ${themeColor} !important;
        }
        .info-value {
            color: ${themeColor} !important;
        }
        .time-display {
            color: ${themeColor} !important;
        }
    `;
    document.head.appendChild(style);
}

// Hide HUD
function hideHUD() {
    addClass(getId('status-container'), 'hidden');
    addClass(getId('speedometer'), 'hidden');
    addClass(getId('location-info'), 'hidden');
}

// Helper functions
function getId(id) {
    return document.getElementById(id);
}

function addClass(element, className) {
    if (element && !element.classList.contains(className)) {
        element.classList.add(className);
    }
}

function removeClass(element, className) {
    if (element && element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

