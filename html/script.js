// ========================================
// GreenZone420 HUD Script
// Created by MTJ2024
// Professional FiveM HUD JavaScript
// ========================================

// Initialize HUD
document.addEventListener('DOMContentLoaded', function() {
    console.log("GreenZone420 HUD Loaded - Created by MTJ2024");
});

// Listen for NUI messages
window.addEventListener('message', function(event) {
    const data = event.data;
    
    switch(data.action) {
        case 'updateHUD':
            updateHUD(data);
            break;
        case 'hideHUD':
            hideHUD();
            break;
        case 'showHUD':
            showHUD();
            break;
    }
});

// Show HUD
function showHUD() {
    removeClass(getId('status-container'), 'hidden');
    removeClass(getId('location-info'), 'hidden');
    removeClass(getId('player-info'), 'hidden');
    removeClass(getId('money-container'), 'hidden');
    removeClass(getId('job-container'), 'hidden');
}

// Update HUD data
function updateHUD(data) {
    // Show containers
    removeClass(getId('status-container'), 'hidden');
    removeClass(getId('location-info'), 'hidden');
    removeClass(getId('player-info'), 'hidden');
    
    // Update player info
    if (data.playerId && data.playerName) {
        updatePlayerInfo(data.playerId, data.playerName);
    }
    
    // Update status bars
    if (data.showHealth) {
        getId('health-bar').style.display = 'flex';
        updateStatusBar('health', data.health);
        
        // Critical health warning
        if (data.health < 25) {
            addClass(getId('health-bar'), 'health-critical');
        } else {
            removeClass(getId('health-bar'), 'health-critical');
        }
    } else {
        getId('health-bar').style.display = 'none';
    }
    
    if (data.showArmor) {
        getId('armor-bar').style.display = 'flex';
        updateStatusBar('armor', data.armor);
    } else {
        getId('armor-bar').style.display = 'none';
    }
    
    if (data.showHunger) {
        getId('hunger-bar').style.display = 'flex';
        updateStatusBar('hunger', data.hunger);
    } else {
        getId('hunger-bar').style.display = 'none';
    }
    
    if (data.showThirst) {
        getId('thirst-bar').style.display = 'flex';
        updateStatusBar('thirst', data.thirst);
    } else {
        getId('thirst-bar').style.display = 'none';
    }
    
    if (data.showStamina) {
        getId('stamina-bar').style.display = 'flex';
        updateStatusBar('stamina', data.stamina);
    } else {
        getId('stamina-bar').style.display = 'none';
    }
    
    // Update vehicle speedometer
    if (data.isInVehicle && data.showSpeedometer) {
        removeClass(getId('speedometer'), 'hidden');
        getId('speed-value').textContent = data.speed;
        getId('speed-unit').textContent = data.speedUnit.toUpperCase();
        
        // Update vehicle label
        const label = getVehicleLabel(data.vehicleType);
        if (getId('vehicle-label')) {
            getId('vehicle-label').textContent = label;
        }
        
        // Update fuel
        if (data.showFuel && getId('fuel-value')) {
            getId('fuel-value').textContent = data.fuel;
        }
        
        // Update engine health
        if (data.showEngineHealth && getId('engine-value')) {
            getId('engine-value').textContent = data.engineHealth;
        }
    } else {
        addClass(getId('speedometer'), 'hidden');
    }
    
    // Update location and time
    if (data.showTime && getId('time-display')) {
        getId('time-display').textContent = data.time;
    }
    
    if (data.showLocation) {
        if (getId('street-name')) {
            getId('street-name').textContent = data.streetName;
            getId('street-name').style.display = 'block';
        }
        if (getId('zone-name')) {
            getId('zone-name').textContent = data.zoneName;
            getId('zone-name').style.display = 'block';
        }
    } else {
        if (getId('street-name')) getId('street-name').style.display = 'none';
        if (getId('zone-name')) getId('zone-name').style.display = 'none';
    }
    
    // Update money and bank
    if (data.money !== undefined) {
        updateMoney(data.money, data.bank);
    }
    
    // Update job
    if (data.job) {
        updateJob(data.job, data.jobGrade);
    }
    
    // Update weapon
    if (data.weapon) {
        updateWeapon(data.weapon, data.ammo, data.ammoMax);
    }
}

// Update money display
function updateMoney(cash, bank) {
    removeClass(getId('money-container'), 'hidden');
    
    if (getId('cash-value')) {
        getId('cash-value').textContent = '€' + formatNumber(cash);
    }
    
    if (getId('bank-value')) {
        getId('bank-value').textContent = '€' + formatNumber(bank);
    }
}

// Update job display
function updateJob(jobName, jobGrade) {
    removeClass(getId('job-container'), 'hidden');
    
    if (getId('job-name')) {
        getId('job-name').textContent = jobName || 'ARBEITSLOS';
    }
    
    if (getId('job-grade') && jobGrade) {
        getId('job-grade').textContent = jobGrade;
    }
}

// Update weapon display
function updateWeapon(weaponName, ammo, ammoMax) {
    if (weaponName && weaponName !== 'WEAPON_UNARMED') {
        removeClass(getId('weapon-container'), 'hidden');
        
        if (getId('weapon-name')) {
            getId('weapon-name').textContent = formatWeaponName(weaponName);
        }
        
        if (getId('ammo-value')) {
            getId('ammo-value').textContent = ammo + ' / ' + ammoMax;
        }
    } else {
        addClass(getId('weapon-container'), 'hidden');
    }
}

// Format weapon name (remove WEAPON_ prefix)
function formatWeaponName(weaponName) {
    if (!weaponName) return 'WAFFENLOS';
    return weaponName.replace('WEAPON_', '').replace(/_/g, ' ');
}

// Update player info (ID and name)
function updatePlayerInfo(playerId, playerName) {
    if (getId('player-id')) {
        getId('player-id').textContent = '#' + playerId;
    }
    
    if (getId('player-name')) {
        getId('player-name').textContent = playerName;
    }
}

// Format number with thousands separator
function formatNumber(num) {
    if (num === undefined || num === null) return '0';
    return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

// Get vehicle label
function getVehicleLabel(vehicleType) {
    switch(vehicleType) {
        case 'car':
            return 'FAHRZEUG';
        case 'boat':
            return 'BOOT';
        case 'aircraft':
            return 'FLUGZEUG';
        default:
            return 'FAHRZEUG';
    }
}

// Hide HUD
function hideHUD() {
    addClass(getId('status-container'), 'hidden');
    addClass(getId('speedometer'), 'hidden');
    addClass(getId('location-info'), 'hidden');
    addClass(getId('money-container'), 'hidden');
    addClass(getId('job-container'), 'hidden');
    addClass(getId('weapon-container'), 'hidden');
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

