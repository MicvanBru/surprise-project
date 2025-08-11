# Surprise Project - Sims 4 Desktop Builder

## Project Overview
A Sims 4-themed surprise gift application where users solve a Wordle-style puzzle to unlock a desktop PC builder experience. The app celebrates a special occasion with a gamified journey from puzzle-solving to selecting computer components.

## GitHub Repository
- **Repository**: MicvanBru/surprise-project
- **Deployment**: GitHub Pages
- **URL**: https://micvanbru.github.io/surprise-project/

## Purpose
A surprise gift application that:
1. Starts with a Wordle-style authentication puzzle
2. Presents personalized intro messages
3. Allows the recipient to configure a gaming desktop build
4. Shows remaining budget for Sims 4 expansion packs
5. Uses Sims 4 theming throughout (Simoleons currency, plumbob icons, etc.)

## Current Implementation

### Authentication Flow (Wordle Puzzle)
- **Location**: `index.html`, `js/wordle.js`, `css/wordle.css`
- **Features**:
  - 6-digit code puzzle with Wordle-style gameplay
  - 6 attempts with color-coded feedback (green/yellow/gray)
  - Mobile-friendly numeric keyboard (0-9)
  - Toast notifications for hints and messages
  - Hint appears after 2 failed attempts
  - Correct code: '123456'
  - Success triggers confetti animation and "Start Building!" button

### Intro Page
- **Location**: `intro.html`, `js/intro.js`, `css/intro.css`
- **Features**:
  - Displays personalized intro messages from `intro-config.json`
  - Single arrow button (">") for navigation
  - Button transforms to "Let's Build!" on final slide
  - Full-width responsive layout with centered text

### Desktop Builder
- **Location**: `builder.html`, `js/builder.js`, `css/builder.css`
- **Features**:
  - Three-tier PC configuration system
  - Sims 4-styled component cards with pricing in Simoleons (§)
  - Animated component selection with visual feedback
  - Real-time budget tracking and tier progress
  - 2x2 grid layout for components (CPU, GPU, RAM, Storage)
  - Power Up upgrade options for each tier

### Summary Page
- **Location**: `summary.html`, `js/summary.js`, `css/summary.css`
- **Features**:
  - Displays selected PC configuration
  - Total cost calculation
  - Personalized completion message
  - Option to rebuild configuration
  - Scrollable layout for full component details

### Tiers (Gaming Builds) - August 2025 Realistic Specs
- **Newbie Simmer** (Budget): §400 base + §50 power-up
  - Base: Ryzen 5 5500, RTX 3050, 500GB SSD
  - Powered: Ryzen 5 5500, RX 6600, 500GB SSD
- **Seasoned Player** (Medium): §500 base + §100 power-up
  - Base: Ryzen 5 5500, RX 6600, 500GB SSD
  - Powered: Ryzen 5 5600, RX 6650 XT, 1TB SSD
- **Master Builder** (Premium): §700 base + §50 power-up
  - Base: Ryzen 7 5700X, RX 6700 XT, 1TB SSD
  - Powered: Ryzen 7 5700X, RX 7700 XT, 1TB SSD

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