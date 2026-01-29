# Assets Directory

This directory is for HUD assets like images, icons, and logos.

## Optional Assets

You can add custom images here to enhance your HUD:

### Logo Image (Optional)
- File: `logo.png`
- Recommended size: 200x200 pixels
- Format: PNG with transparency
- Usage: Server logo/branding

### Custom Icons (Optional)
- Vehicle icons
- Status icons
- Custom emoji replacements

## Notes

The HUD currently uses emoji characters for icons, which work perfectly without additional assets. If you want to use custom images instead:

1. Add your PNG files to this directory
2. Update `html/index.html` to reference them
3. Modify `html/style.css` for proper styling

Example:
```html
<!-- Replace emoji with image -->
<img src="assets/logo.png" alt="Logo" class="custom-logo">
```

## Current Implementation

The HUD works great without any assets - all icons use Unicode emoji characters that display on all systems:
- 🌿 Cannabis leaf (branding)
- ❤️ Health
- 🛡️ Armor
- 🍔 Hunger
- 💧 Thirst
- ⚡ Stamina
- 🚗 Car
- 🚤 Boat
- ✈️ Aircraft
- ⛽ Fuel
- 🔧 Engine

---

**Created by MTJ2024**
