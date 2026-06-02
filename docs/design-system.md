# Design System Guide

The platform shares unified styles tokens inside the `shared/styles/` directory.

### 1. Typography & Grid Hierarchy
- **Primary Font**: `Outfit` and `Inter` (Sans-serif corporate layout defaults).
- **Console Font**: `Fira Code` (Monospace variables, logs, and git hashes).
- **Layout Widths**: $sidebar-width: 260px, $topnav-height: 70px.
- **Grids Alignment**: Standard Bootstrap 5 responsive grids accelerations.

### 2. Premium Theme Colors Tokens
- **Primary Background**: `#0b0f19` (Dark radial gradient layout).
- **Secondary Cards**: `rgba(17, 24, 39, 0.7)` (Glassmorphic cards backdrop blur properties).
- **indigo Accent**: `#6366f1` (Branding primary actions highlights).
- **Cyan Accent**: `#06b6d4` (DevOps SRE dashboards, graphs).

### 3. Modularity Structure
- `shared/styles/variables.scss`: Holds all central corporate spacing, colors, and shadows variables.
- `shared/styles/mixins.scss`: Houses typography text gradients, responsive breakpoints, custom scrollbars, and focus outlines.
- `shared/styles/badges.scss` & `shared/styles/cards.scss`: Declares unified visual decorations for metric cards, modular launchers, and status indicators.
