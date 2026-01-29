// ========================================
// GreenZone420 HUD Script
// Created by MTJ2025
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

// Initialize HUD
$(document).ready(function() {
    console.log("GreenZone420 HUD Loaded - Created by MTJ2025");
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
        $('#server-logo').removeClass('hidden');
        $('.logo-text').text(`🌿 ${config.serverName}`);
    }
    
    // Status bars visibility
    if (!config.showHealth) $('#health-bar').hide();
    if (!config.showArmor) $('#armor-bar').hide();
    if (!config.showHunger) $('#hunger-bar').hide();
    if (!config.showThirst) $('#thirst-bar').hide();
    if (!config.showStamina) $('#stamina-bar').hide();
    
    // Apply theme
    if (config.useGreenZoneTheme) {
        applyGreenZoneTheme();
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
            $('#health-bar').addClass('health-critical');
        } else {
            $('#health-bar').removeClass('health-critical');
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
        $('#speedometer').removeClass('hidden');
        $('#speed-value').text(data.speed);
        $('#speed-unit').text(data.speedUnit);
        
        // Update vehicle icon
        const icon = getVehicleIcon(data.vehicleType);
        $('#vehicle-icon').text(icon);
        
        // High speed effect
        if (data.speed > 120) {
            $('#speed-value').addClass('speed-high');
        } else {
            $('#speed-value').removeClass('speed-high');
        }
        
        // Update fuel
        if (config.showFuel) {
            $('#fuel-value').text(data.fuel);
            
            // Low fuel warning
            if (data.fuel < 20) {
                $('#fuel-info').addClass('warning');
            } else {
                $('#fuel-info').removeClass('warning');
            }
        }
        
        // Update engine health
        if (config.showEngineHealth) {
            $('#engine-value').text(data.engineHealth);
            
            // Engine damage warning
            if (data.engineHealth < 50) {
                $('#engine-info').addClass('warning');
            } else {
                $('#engine-info').removeClass('warning');
            }
        }
    } else {
        $('#speedometer').addClass('hidden');
    }
    
    // Update location and time
    $('#location-info').removeClass('hidden');
    $('#time-display').text(data.time);
    
    if (config.showStreetName) {
        $('#street-name').text(data.streetName);
        $('#street-name').show();
    } else {
        $('#street-name').hide();
    }
    
    if (config.showZoneName) {
        $('#zone-name').text(data.zoneName);
        $('#zone-name').show();
    } else {
        $('#zone-name').hide();
    }
    
    // Show status container
    $('#status-container').removeClass('hidden');
}

// Update individual status
function updateStatus(statusType, value) {
    updateStatusBar(statusType, value);
}

// Update status bar
function updateStatusBar(type, value) {
    const clampedValue = Math.max(0, Math.min(100, value));
    
    $(`#${type}-bar .status-fill`).css('width', clampedValue + '%');
    $(`#${type}-bar .status-value`).text(Math.floor(clampedValue));
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
    $('body').addClass('greenzone-theme');
    
    // You can add more theme customizations here
    const themeColor = `rgb(${config.themeColor.r}, ${config.themeColor.g}, ${config.themeColor.b})`;
    
    // Apply dynamic theme color
    $('<style>')
        .prop('type', 'text/css')
        .html(`
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
        `)
        .appendTo('head');
}

// Hide HUD
function hideHUD() {
    $('#status-container').addClass('hidden');
    $('#speedometer').addClass('hidden');
    $('#location-info').addClass('hidden');
}

// Smooth number animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        $(element).text(current);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Warning flash effect
function flashWarning(element) {
    $(element).fadeOut(200).fadeIn(200);
}
