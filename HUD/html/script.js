// Global Variables
let config = {};
let cinematicMode = false;
let hudVisible = true;
let isInVehicle = false;
let isTalking = false;
let editMode = false;
let draggedElement = null;
let dragOffset = { x: 0, y: 0 };

// Draggable System
function initDraggable() {
    const draggables = document.querySelectorAll('.draggable-container');
    
    draggables.forEach(element => {
        // Load saved position from localStorage
        const savedPosition = localStorage.getItem(`hud-pos-${element.id}`);
        if (savedPosition) {
            const pos = JSON.parse(savedPosition);
            element.style.left = pos.left;
            element.style.top = pos.top;
            element.style.right = 'auto';
            element.style.bottom = 'auto';
            element.style.transform = pos.transform || 'none';
        }
        
        element.addEventListener('mousedown', startDrag);
    });
}

function startDrag(e) {
    if (!editMode) return;
    
    draggedElement = e.currentTarget;
    draggedElement.classList.add('dragging');
    
    const rect = draggedElement.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (!draggedElement) return;
    
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    
    draggedElement.style.left = x + 'px';
    draggedElement.style.top = y + 'px';
    draggedElement.style.right = 'auto';
    draggedElement.style.bottom = 'auto';
    draggedElement.style.transform = 'none';
}

function stopDrag() {
    if (!draggedElement) return;
    
    draggedElement.classList.remove('dragging');
    
    // Save position to localStorage
    const position = {
        left: draggedElement.style.left,
        top: draggedElement.style.top,
        transform: draggedElement.style.transform
    };
    localStorage.setItem(`hud-pos-${draggedElement.id}`, JSON.stringify(position));
    
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    draggedElement = null;
}

function toggleEditMode() {
    editMode = !editMode;
    const draggables = document.querySelectorAll('.draggable-container');
    const editModeText = document.getElementById('edit-mode-text');
    
    if (editMode) {
        draggables.forEach(el => el.classList.add('edit-mode'));
        editModeText.textContent = 'Bearbeitungsmodus deaktivieren';
        document.getElementById('hud-container').style.pointerEvents = 'all';
    } else {
        draggables.forEach(el => el.classList.remove('edit-mode'));
        editModeText.textContent = 'Bearbeitungsmodus aktivieren';
        document.getElementById('hud-container').style.pointerEvents = 'none';
    }
}

function resetPositions() {
    const draggables = document.querySelectorAll('.draggable-container');
    draggables.forEach(element => {
        localStorage.removeItem(`hud-pos-${element.id}`);
        element.style.left = '';
        element.style.top = '';
        element.style.right = '';
        element.style.bottom = '';
        element.style.transform = '';
    });
    alert('Positionen wurden zurückgesetzt!');
    location.reload();
}

function openSettings() {
    document.getElementById('settings-panel').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settings-panel').classList.add('hidden');
    if (editMode) {
        toggleEditMode();
    }
}

function toggleStyle() {
    const showIcons = document.getElementById('show-icons').checked;
    const statusBars = document.querySelectorAll('.status-icon');
    statusBars.forEach(icon => {
        icon.style.display = showIcons ? 'flex' : 'none';
    });
    localStorage.setItem('hud-show-icons', showIcons);
}

function toggleGlow() {
    const showGlow = document.getElementById('show-glow').checked;
    const root = document.documentElement;
    root.style.setProperty('--glow-intensity', showGlow ? '8px' : '0px');
    localStorage.setItem('hud-show-glow', showGlow);
}

// Load preferences
function loadPreferences() {
    const showIcons = localStorage.getItem('hud-show-icons');
    const showGlow = localStorage.getItem('hud-show-glow');
    
    if (showIcons !== null) {
        document.getElementById('show-icons').checked = showIcons === 'true';
        toggleStyle();
    }
    
    if (showGlow !== null) {
        document.getElementById('show-glow').checked = showGlow === 'true';
        toggleGlow();
    }
}

// Format Money
function formatMoney(amount) {
    return '$' + amount.toLocaleString('en-US');
}

// Animate number change
function animateValue(element, start, end, duration = 500) {
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    // Add animation class based on increase/decrease
    if (end > start) {
        element.classList.add('increase');
        setTimeout(() => element.classList.remove('increase'), 500);
    } else if (end < start) {
        element.classList.add('decrease');
        setTimeout(() => element.classList.remove('decrease'), 500);
    }
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = formatMoney(Math.floor(current));
    }, 16);
}

// Update Status Bar
function updateStatusBar(id, value) {
    const fillElement = document.getElementById(id + '-fill');
    const valueElement = document.getElementById(id + '-value');
    const barElement = document.getElementById(id + '-bar');
    const circleElement = document.getElementById(id + '-circle');
    
    if (!fillElement || !valueElement) return;
    
    // Clamp value between 0 and 100
    value = Math.max(0, Math.min(100, value));
    
    // Update fill width
    fillElement.style.width = value + '%';
    
    // Update circular progress
    if (circleElement) {
        const circumference = 100.53; // 2 * PI * 16
        const offset = circumference - (value / 100) * circumference;
        circleElement.style.strokeDashoffset = offset;
    }
    
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
    
    // Money - with animation
    const cashElement = document.getElementById('cash-value');
    const bankElement = document.getElementById('bank-value');
    
    const oldCash = parseInt(cashElement.textContent.replace(/[$,]/g, '')) || 0;
    const oldBank = parseInt(bankElement.textContent.replace(/[$,]/g, '')) || 0;
    
    if (oldCash !== data.money) {
        animateValue(cashElement, oldCash, data.money, 300);
    }
    
    if (oldBank !== data.bank) {
        animateValue(bankElement, oldBank, data.bank, 300);
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
        
        // Speed with smooth animation
        const speedValue = document.getElementById('speed-value');
        const oldSpeed = parseInt(speedValue.textContent) || 0;
        
        // Animate speed change
        if (Math.abs(oldSpeed - data.speed) > 5) {
            speedValue.style.transform = 'scale(1.1)';
            setTimeout(() => speedValue.style.transform = 'scale(1)', 100);
        }
        
        speedValue.textContent = data.speed;
        speedValue.setAttribute('data-speed', data.speed);
        
        // Update speed ring
        const maxSpeed = 300; // Max display speed
        const speedPercent = Math.min((data.speed / maxSpeed) * 100, 100);
        const speedRing = document.getElementById('speed-ring');
        const circumference = 2 * Math.PI * 45; // radius = 45
        const offset = circumference - (speedPercent / 100) * circumference;
        speedRing.style.strokeDashoffset = offset;
        
        // Change color based on speed
        if (data.speed > 200) {
            speedRing.style.stroke = 'rgb(255, 0, 0)';
            speedValue.style.color = 'rgb(255, 0, 0)';
        } else if (data.speed > 120) {
            speedRing.style.stroke = 'rgb(255, 165, 0)';
            speedValue.style.color = 'rgb(255, 165, 0)';
        } else {
            speedRing.style.stroke = 'var(--color-speed)';
            speedValue.style.color = 'var(--color-speed)';
        }
        
        // RPM
        const rpmFill = document.getElementById('rpm-fill');
        const rpmValue = document.getElementById('rpm-value');
        rpmFill.style.width = data.rpm + '%';
        rpmValue.textContent = data.rpm + '%';
        
        // Change RPM color at high RPM
        if (data.rpm > 85) {
            rpmFill.style.background = 'linear-gradient(90deg, rgb(255, 0, 0) 0%, rgba(255, 0, 0, 0.6) 100%)';
            rpmFill.style.boxShadow = '0 0 1vh rgb(255, 0, 0)';
        } else {
            rpmFill.style.background = 'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.6) 100%)';
            rpmFill.style.boxShadow = '0 0 1vh rgb(255, 255, 255)';
        }
        
        // Fuel
        const fuelFill = document.getElementById('fuel-fill');
        const fuelValue = document.getElementById('fuel-value');
        fuelFill.style.width = data.fuel + '%';
        fuelValue.textContent = data.fuel + '%';
        
        // Add warning for low fuel
        if (data.fuel < 20) {
            fuelFill.style.background = 'linear-gradient(90deg, rgb(220, 20, 60) 0%, rgba(220, 20, 60, 0.6) 100%)';
            fuelFill.style.boxShadow = '0 0 1vh rgb(220, 20, 60)';
            fuelValue.style.color = 'rgb(220, 20, 60)';
        } else {
            fuelFill.style.background = 'linear-gradient(90deg, rgb(255, 0, 0) 0%, rgba(255, 0, 0, 0.6) 100%)';
            fuelFill.style.boxShadow = '0 0 1vh rgb(255, 0, 0)';
            fuelValue.style.color = 'var(--color-silver)';
        }
        
        // Gear with animation
        const gearValue = document.getElementById('gear-value');
        const oldGear = gearValue.textContent;
        let newGear;
        
        if (data.gear === 0) {
            newGear = 'R';
        } else if (data.gear === 1 && data.speed < 1) {
            newGear = 'N';
        } else {
            newGear = data.gear.toString();
        }
        
        if (oldGear !== newGear) {
            gearValue.style.transform = 'scale(1.3) rotate(5deg)';
            setTimeout(() => gearValue.style.transform = 'scale(1) rotate(0deg)', 150);
        }
        
        gearValue.textContent = newGear;
        
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
            
        case 'toggleSettings':
            const settingsPanel = document.getElementById('settings-panel');
            if (settingsPanel.classList.contains('hidden')) {
                openSettings();
            } else {
                closeSettings();
            }
            break;
    }
});

// Add smooth transitions on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize draggable system
    initDraggable();
    
    // Load user preferences
    loadPreferences();
    
    // Staggered animation for status bars
    const statusBars = document.querySelectorAll('.status-bar');
    statusBars.forEach((bar, index) => {
        bar.style.animationDelay = (index * 0.1) + 's';
    });
    
    // Initialize compass
    updateCompass(0);
    
    // Close settings with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSettings();
        }
    });
    
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
