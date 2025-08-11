# Surprise Project - Gaming Desktop Selector

## Project Overview
This is a web application for GitHub Pages that allows someone to select a gaming desktop configuration in a Sims 4-themed interface. This is a **surprise gift project** with a **$800 budget** (displayed as §800 Simoleons in the app).

## GitHub Repository
- **Repository**: MicvanBru/surprise-project
- **Deployment**: GitHub Pages
- **URL**: https://micvanbru.github.io/surprise-project/

## Purpose
A surprise gift application that:
1. Starts with a PIN-protected login screen
2. Allows the recipient to configure a gaming desktop build
3. Shows remaining budget for Sims 4 expansion packs
4. Uses Sims 4 theming throughout (Simoleons currency, plumbob icons, etc.)

## Application Structure

### Pages
1. **index.html** - Login page with 6-digit PIN entry
2. **builder.html** - Desktop tier selection and configuration
3. **summary.html** - Final build summary with remaining budget

### Tiers (Gaming Builds)
- **Newbie Simmer** (Budget): §300 base + §50 power-up
- **Seasoned Player** (Medium): §500 base + §75 power-up  
- **Master Builder** (Premium): §650 base + §100 power-up

### Key Features
- **Budget Tracking**: Real-time remaining budget calculation from §800 total
- **Power-Up Options**: Optional upgrades for better GPU and storage
- **Sims 4 Performance**: Each tier shows expected Sims 4 performance details
- **Visual Desktop Images**: Three different desktop images for each tier
- **Themed Interface**: Uses Sims fonts, plumbob icons, and Simoleon currency

## Technical Details

### File Structure
```
/
├── index.html          # Login page
├── builder.html        # Build selector
├── summary.html        # Summary page
├── css/
│   ├── main.css       # Global styles
│   ├── login.css      # Login page styles
│   ├── builder.css    # Builder page styles
│   └── summary.css    # Summary page styles
├── js/
│   ├── login.js       # PIN validation (code: 241225)
│   ├── builder.js     # Build configuration logic
│   ├── summary.js     # Summary display logic
│   └── common.js      # Shared utilities
├── data/
│   └── components.json # Build configurations and pricing
├── images/
│   ├── tier_1_desktop.png
│   ├── tier_2_desktop.png
│   └── tier_3_desktop.png
└── fonts/
    └── [Sims-themed fonts]
```

### Key Implementation Notes
- **PIN Code**: 241225 (hardcoded in login.js)
- **Session Storage**: Used to pass build configuration between pages
- **Cache Busting**: Added version parameters (?v=1.0) to assets to prevent caching issues
- **Local Development**: Use `http-server -p 8000 -c-1` to run with caching disabled

## Development Commands
```bash
# Start local server without caching
http-server -p 8000 -c-1

# Git commands for deployment
git add .
git commit -m "Your message"
git push origin main
```

## Theming Elements
- **Currency**: Simoleons (§) instead of dollars
- **Icons**: Plumbob (♦) decorations
- **Fonts**: Custom Sims-themed fonts
- **Colors**: Green (#4CAF50) primary theme matching Sims aesthetic
- **Language**: Sims references ("Sul Sul" greeting, etc.)

## Important Considerations
- This is a gift/surprise project - maintain the playful Sims 4 theme
- Budget constraint is firm at §800 total
- Remaining budget is highlighted to show funds for expansion packs
- All prices and specs are fictional/themed for the gift experience