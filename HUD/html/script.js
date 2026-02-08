// Global Variables
let config = {};
let cinematicMode = false;
let hudVisible = true;
let isInVehicle = false;
let isTalking = false;

// Format Money
function formatMoney(amount) {
    return '$' + amount.toLocaleString('en-US');
}

// Update Status Bar
function updateStatusBar(id, value) {
    const fillElement = document.getElementById(id + '-fill');
    const valueElement = document.getElementById(id + '-value');
    const barElement = document.getElementById(id + '-bar');
    
    if (!fillElement || !valueElement) return;
    
    // Clamp value between 0 and 100
    value = Math.max(0, Math.min(100, value));
    
    // Update fill width
    fillElement.style.width = value + '%';
    
    // Update text value
    valueElement.textContent = Math.floor(value);
    
    // Add warning state for low values
    if (value < 25) {
        barElement.classList.add('warning');
    } else {
        barElement.classList.remove('warning');
    }
    
    // Hide bar if value is 0 and it's armor or oxygen
    if ((id === 'armor' || id === 'oxygen') && value === 0) {
        barElement.classList.add('hidden');
    } else if (id === 'oxygen' && value < 100) {
        barElement.classList.remove('hidden');
    }
}

// Update Player Data
function updatePlayerData(data) {
    // Health
    updateStatusBar('health', data.health);
    
    // Armor
    updateStatusBar('armor', data.armor);
    
    // Hunger
    if (config.ShowHunger) {
        updateStatusBar('hunger', data.hunger);
    }
    
    // Thirst
    if (config.ShowThirst) {
        updateStatusBar('thirst', data.thirst);
    }
    
    // Stamina
    if (config.ShowStamina) {
        updateStatusBar('stamina', data.stamina);
    }
    
    // Oxygen
    if (config.ShowOxygen) {
        updateStatusBar('oxygen', data.oxygen);
    }
    
    // Money
    document.getElementById('cash-value').textContent = formatMoney(data.money);
    document.getElementById('bank-value').textContent = formatMoney(data.bank);
    
    // Job
    if (data.job) {
        const jobName = document.getElementById('job-name');
        if (data.grade && data.grade !== '') {
            jobName.textContent = data.job + ' - ' + data.grade;
        } else {
            jobName.textContent = data.job;
        }
    }
}

// Update Vehicle Data
function updateVehicleData(data) {
    const vehicleContainer = document.getElementById('vehicle-container');
    
    if (data.inVehicle) {
        if (!isInVehicle) {
            vehicleContainer.classList.remove('hidden');
            isInVehicle = true;
        }
        
        // Speed
        const speedValue = document.getElementById('speed-value');
        speedValue.textContent = data.speed;
        
        // Update speed ring
        const maxSpeed = 300; // Max display speed
        const speedPercent = (data.speed / maxSpeed) * 100;
        const speedRing = document.getElementById('speed-ring');
        const circumference = 2 * Math.PI * 45; // radius = 45
        const offset = circumference - (speedPercent / 100) * circumference;
        speedRing.style.strokeDashoffset = offset;
        
        // RPM
        const rpmFill = document.getElementById('rpm-fill');
        const rpmValue = document.getElementById('rpm-value');
        rpmFill.style.width = data.rpm + '%';
        rpmValue.textContent = data.rpm + '%';
        
        // Fuel
        const fuelFill = document.getElementById('fuel-fill');
        const fuelValue = document.getElementById('fuel-value');
        fuelFill.style.width = data.fuel + '%';
        fuelValue.textContent = data.fuel + '%';
        
        // Add warning for low fuel
        if (data.fuel < 20) {
            fuelFill.style.background = 'linear-gradient(90deg, rgb(220, 20, 60) 0%, rgba(220, 20, 60, 0.6) 100%)';
            fuelFill.style.boxShadow = '0 0 1vh rgb(220, 20, 60)';
        } else {
            fuelFill.style.background = 'linear-gradient(90deg, rgb(255, 0, 0) 0%, rgba(255, 0, 0, 0.6) 100%)';
            fuelFill.style.boxShadow = '0 0 1vh rgb(255, 0, 0)';
        }
        
        // Gear
        const gearValue = document.getElementById('gear-value');
        if (data.gear === 0) {
            gearValue.textContent = 'R';
        } else if (data.gear === 1 && data.speed < 1) {
            gearValue.textContent = 'N';
        } else {
            gearValue.textContent = data.gear;
        }
        
    } else {
        if (isInVehicle) {
            vehicleContainer.classList.add('hidden');
            isInVehicle = false;
        }
    }
}

// Update Location & Compass
function updateLocation(data) {
    // Update street name
    const streetName = document.getElementById('street-name');
    if (data.crossing) {
        streetName.textContent = data.street + ' / ' + data.crossing;
    } else {
        streetName.textContent = data.street;
    }
    
    // Update zone
    const zoneName = document.getElementById('zone-name');
    zoneName.textContent = data.zone;
    
    // Update compass
    updateCompass(data.heading);
}

// Update Compass Rotation
function updateCompass(heading) {
    const compass = document.getElementById('compass');
    if (!compass) return;
    
    // Calculate offset for smooth rotation
    // Each direction is spaced 12vh apart (2vh padding * 6 items)
    const offset = -(heading / 360) * (8 * 12); // 8 directions, 12vh spacing
    compass.style.transform = `translateX(${offset}vh) translateY(-50%)`;
}

// Update Voice Chat
function updateVoiceChat(range) {
    const voiceContainer = document.getElementById('voice-container');
    
    // Remove all range classes
    voiceContainer.querySelector('.voice-indicator').classList.remove('range-whisper', 'range-normal', 'range-shout');
    
    // Add current range class
    if (range === 1) {
        voiceContainer.querySelector('.voice-indicator').classList.add('range-whisper');
    } else if (range === 2) {
        voiceContainer.querySelector('.voice-indicator').classList.add('range-normal');
    } else if (range === 3) {
        voiceContainer.querySelector('.voice-indicator').classList.add('range-shout');
    }
}

// Update Weapon Display
function updateWeapon(data) {
    const weaponContainer = document.getElementById('weapon-container');
    
    if (data.hasWeapon) {
        weaponContainer.classList.remove('hidden');
        const ammoDisplay = document.getElementById('weapon-ammo');
        ammoDisplay.textContent = data.clipAmmo + ' / ' + data.ammo;
    } else {
        weaponContainer.classList.add('hidden');
    }
}

// Toggle Cinematic Mode
function toggleCinematic(state) {
    cinematicMode = state;
    const cinematicBars = document.getElementById('cinematic-bars');
    
    if (cinematicMode) {
        cinematicBars.classList.remove('hidden');
        document.getElementById('hud-container').style.opacity = '0.3';
    } else {
        cinematicBars.classList.add('hidden');
        document.getElementById('hud-container').style.opacity = '1';
    }
}

// Toggle HUD Visibility
function toggleHud(state) {
    hudVisible = state;
    const hudContainer = document.getElementById('hud-container');
    
    if (hudVisible) {
        hudContainer.style.display = 'block';
        setTimeout(() => {
            hudContainer.style.opacity = '1';
        }, 10);
    } else {
        hudContainer.style.opacity = '0';
        setTimeout(() => {
            hudContainer.style.display = 'none';
        }, 300);
    }
}

// Set Configuration
function setConfig(newConfig) {
    config = newConfig;
    
    // Apply config settings
    if (!config.ShowHealth) {
        document.getElementById('health-bar').classList.add('hidden');
    }
    if (!config.ShowArmor) {
        document.getElementById('armor-bar').classList.add('hidden');
    }
    if (!config.ShowHunger) {
        document.getElementById('hunger-bar').classList.add('hidden');
    }
    if (!config.ShowThirst) {
        document.getElementById('thirst-bar').classList.add('hidden');
    }
    if (!config.ShowStamina) {
        document.getElementById('stamina-bar').classList.add('hidden');
    }
    if (!config.ShowOxygen) {
        document.getElementById('oxygen-bar').classList.add('hidden');
    }
    if (!config.ShowCompass) {
        document.getElementById('location-container').classList.add('hidden');
    }
    if (!config.ShowVoiceChat) {
        document.getElementById('voice-container').classList.add('hidden');
    }
    if (!config.ShowJob) {
        document.getElementById('job-container').classList.add('hidden');
    }
    if (!config.ShowWeapon) {
        document.getElementById('weapon-container').classList.add('hidden');
    }
    
    // Update server name if provided
    if (config.ServerName) {
        document.querySelector('.server-name').textContent = config.ServerName;
    }
    
    // Update speed unit
    if (config.SpeedUnit === 'mph') {
        document.querySelector('.speed-unit').textContent = 'MPH';
    }
    
    // Apply custom colors if provided
    if (config.Colors) {
        const root = document.documentElement;
        Object.keys(config.Colors).forEach(key => {
            const color = config.Colors[key];
            root.style.setProperty(`--color-${key}`, `rgb(${color.r}, ${color.g}, ${color.b})`);
        });
    }
}

// NUI Message Handler
window.addEventListener('message', function(event) {
    const data = event.data;
    
    switch(data.action) {
        case 'updatePlayer':
            updatePlayerData(data.data);
            break;
            
        case 'updateVehicle':
            updateVehicleData(data.data);
            break;
            
        case 'updateLocation':
            updateLocation(data);
            break;
            
        case 'updateVoice':
            updateVoiceChat(data.range);
            break;
            
        case 'updateWeapon':
            updateWeapon(data);
            break;
            
        case 'toggleCinematic':
            toggleCinematic(data.state);
            break;
            
        case 'toggleHud':
            toggleHud(data.state);
            break;
            
        case 'setConfig':
            setConfig(data.config);
            break;
            
        case 'setTalking':
            const voiceIcon = document.getElementById('voice-icon');
            const voiceIndicator = document.querySelector('.voice-indicator');
            if (data.state) {
                voiceIcon.classList.add('talking');
                voiceIndicator.classList.add('talking');
            } else {
                voiceIcon.classList.remove('talking');
                voiceIndicator.classList.remove('talking');
            }
            break;
    }
});

// Add smooth transitions on page load
document.addEventListener('DOMContentLoaded', function() {
    // Staggered animation for status bars
    const statusBars = document.querySelectorAll('.status-bar');
    statusBars.forEach((bar, index) => {
        bar.style.animationDelay = (index * 0.1) + 's';
    });
    
    // Initialize compass
    updateCompass(0);
    
    // Test animations
    console.log('Modern HUD loaded successfully! 🎮');
});

// Add warning animation for low health
setInterval(() => {
    const healthBar = document.getElementById('health-bar');
    const healthValue = parseInt(document.getElementById('health-value').textContent);
    
    if (healthValue < 25 && healthValue > 0) {
        healthBar.style.animation = 'healthWarning 1s ease-in-out infinite';
    } else {
        healthBar.style.animation = 'none';
    }
}, 1000);

// Add health warning animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes healthWarning {
        0%, 100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-2px);
        }
        75% {
            transform: translateX(2px);
        }
    }
`;
document.head.appendChild(style);
