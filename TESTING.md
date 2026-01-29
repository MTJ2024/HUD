# Testing Guide - GreenZone420 HUD

## Manual Testing on Your FiveM Server

### Prerequisites
- FiveM server with ESX Legacy installed
- Server access to add resources
- A client to connect and test

### Testing Checklist

#### 1. Basic Installation Test
- [ ] Resource loads without errors (check server console)
- [ ] No errors in F8 client console
- [ ] HUD appears on screen

#### 2. Configuration Tests
Test each config option by setting to `true` and `false`:

**Main Settings**
- [ ] `Config.EnableHUD` - HUD shows/hides correctly
- [ ] `Config.ServerName` - Name displays correctly
- [ ] `Config.SpeedUnit` - KMH/MPH switches properly

**Status Bars**
- [ ] `Config.ShowHealth` - Health bar shows/hides
- [ ] `Config.ShowArmor` - Armor bar shows/hides  
- [ ] `Config.ShowHunger` - Hunger bar shows/hides (requires esx_status)
- [ ] `Config.ShowThirst` - Thirst bar shows/hides (requires esx_status)
- [ ] `Config.ShowStamina` - Stamina bar shows/hides

**Vehicle Tests**
- [ ] `Config.EnableCarSpeedometer` - Shows in cars/motorcycles
- [ ] `Config.EnableBoatSpeedometer` - Shows in boats
- [ ] `Config.EnableAircraftSpeedometer` - Shows in aircraft
- [ ] `Config.ShowFuel` - Fuel displays correctly
- [ ] `Config.ShowEngineHealth` - Engine health shows

**Display Options**
- [ ] `Config.ShowStreetName` - Street name appears
- [ ] `Config.ShowZoneName` - Zone name appears
- [ ] `Config.Show24HourClock` - Time format switches
- [ ] `Config.ShowLogo` - Server logo shows/hides

**Special Features**
- [ ] Cinematic mode (F9) - HUD toggles on/off
- [ ] Pause menu - HUD hides when pause menu opens
- [ ] Custom minimap - Minimap styling applies

#### 3. Vehicle Type Tests

**Cars/Motorcycles**
1. Spawn a car: `/car adder`
2. Drive and check speedometer displays
3. Verify speed matches vehicle speed
4. Check fuel indicator (if fuel script installed)
5. Damage vehicle and check engine health

**Boats**
1. Spawn a boat: `/car seashark`
2. Drive in water
3. Verify boat speedometer shows
4. Check boat icon appears

**Aircraft**
1. Spawn helicopter: `/car buzzard`
2. Fly and verify aircraft speedometer
3. Check altitude display
4. Verify aircraft icon shows

#### 4. Player Status Tests

**Health**
1. Take damage - health bar should decrease
2. Heal - health bar should increase
3. At <25% health - bar should flash red

**Armor**
1. Add armor: `/givearmor`
2. Verify armor bar fills
3. Take damage - armor should decrease first

**Stamina**
1. Sprint - stamina bar should decrease
2. Rest - stamina should refill

**Hunger/Thirst** (requires esx_status)
1. Wait for hunger/thirst to decrease
2. Eat/drink - bars should refill
3. Verify bars update correctly

#### 5. Performance Tests
- [ ] No FPS drops when HUD is active
- [ ] Smooth animations
- [ ] No console errors during normal use
- [ ] HUD updates properly at configured interval

#### 6. Edge Case Tests
- [ ] Switching between vehicle types
- [ ] Entering/exiting vehicles quickly
- [ ] Death/respawn - HUD reloads correctly
- [ ] Resource restart while in game
- [ ] Multiple players on server

### Expected Behavior

**When Working Correctly:**
- HUD loads within 1-2 seconds of joining
- All enabled features display properly
- Status bars update in real-time
- Vehicle speedometer shows correct speed
- No errors in console
- Smooth performance

**Common Issues:**
1. **HUD not showing**: Check ESX is loaded first
2. **Hunger/Thirst bars missing**: Install esx_status
3. **Fuel not working**: Install a fuel script
4. **Wrong speed**: Check Config.SpeedUnit setting

### Testing Commands

Useful admin commands for testing:
```
/car [vehicle]      - Spawn a vehicle
/heal              - Restore health
/givearmor         - Add armor  
/tp [coords]       - Teleport
/revive            - Revive if dead
```

### Performance Monitoring

In-game console (F8):
```
resmon              - View resource usage
```

The HUD should use minimal resources (< 0.05ms typically).

---

**Created by MTJ2024**
