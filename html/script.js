let editMode = false;
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

// Initialize
window.addEventListener('message', function(event) {
    const data = event.data;
    
    if (data.type === 'init') {
        loadPositions(data.positions);
    } else if (data.type === 'toggleEditMode') {
        toggleEditMode(data.enabled);
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


