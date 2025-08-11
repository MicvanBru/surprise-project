# Surprise Project - Sims 4 Desktop Builder

## Project Overview
A Sims 4-themed surprise gift application where users solve a Wordle-style puzzle to unlock a desktop PC builder experience. The app celebrates a special occasion with a gamified journey from puzzle-solving to selecting computer components.

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
  - Success triggers confetti animation and "Start Building\!" button

### Intro Page
- **Location**: `intro.html`, `js/intro.js`, `css/intro.css`
- **Features**:
  - Displays personalized intro messages from `intro-config.json`
  - Single arrow button (">") for navigation
  - Button transforms to "Let's Build\!" on final slide
  - Full-width responsive layout with centered text

### Desktop Builder
- **Location**: `builder.html`, `js/builder.js`, `css/builder.css`
- **Features**:
  - Three-tier PC configuration system
  - Sims 4-styled component cards with pricing in Simoleons (§)
  - Animated component selection with visual feedback
  - Real-time budget tracking and tier progress
  - Responsive grid layout

### Summary Page
- **Location**: `summary.html`, `js/summary.js`, `css/summary.css`
- **Features**:
  - Displays selected PC configuration
  - Total cost calculation
  - Personalized completion message
  - Option to rebuild configuration

## Design System

### Colors
- Primary Blue: `#00B2CA` (Sims signature color)
- Green: `#90EE90` (success/positive actions)
- Purple: `#9B59B6` (hints/special elements)
- Yellow: `#F1C40F` (warnings/present state)
- Red: `#E74C3C` (errors)

### Typography
- Custom Sims fonts loaded from `/fonts/`
- Responsive sizing using `min()` and `calc()` functions
- Text shadows for depth on colored backgrounds

### Responsive Design
- Mobile-first approach with breakpoints at 480px and 768px
- Viewport-relative units for consistent scaling
- Touch-friendly targets (minimum 44px)
- No-scroll layouts using flexbox and grid

## Key Technical Decisions

### Wordle Implementation
- Pure JavaScript without frameworks
- CSS Grid for game board layout
- Aspect-ratio property for responsive tiles
- LocalStorage for authentication state
- Toast notifications positioned fixed at top

### Layout Strategy
- Full viewport height cards with equal margins
- Flexbox for vertical distribution
- CSS Grid for component layouts
- Smooth transitions using cubic-bezier easing

### Mobile Optimizations
- `100dvh` for dynamic viewport height
- Prevented zoom with viewport meta tag
- Round buttons for better touch targets
- Responsive text sizing with `vw` and `vh` units

## File Structure
```
/
├── index.html (Wordle puzzle login)
├── intro.html (Introduction sequence)
├── builder.html (PC builder interface)
├── summary.html (Configuration summary)
├── css/
│   ├── main.css (Global styles)
│   ├── wordle.css (Puzzle game styles)
│   ├── intro.css (Intro page styles)
│   ├── builder.css (Builder interface styles)
│   └── summary.css (Summary page styles)
├── js/
│   ├── wordle.js (Puzzle game logic)
│   ├── intro.js (Intro sequence logic)
│   ├── builder.js (PC builder logic)
│   ├── summary.js (Summary display logic)
│   └── common.js (Shared utilities)
├── data/
│   └── components.json (PC components database)
├── fonts/ (Sims custom fonts)
└── images/ (Desktop tier images)
```

## Testing Notes
- Test server: `python3 -m http.server 8000`
- Mobile testing critical for touch interactions
- Verify toast notifications appear above all content
- Check transitions between pages maintain state
- Ensure confetti animation performs well on mobile

## Future Considerations
- Could add sound effects for Sims authenticity
- Potential for more puzzle variations
- Component compatibility checking in builder
- Save/share configuration feature
EOF < /dev/null