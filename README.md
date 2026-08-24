# Host-IN Dashboard

A modern, highly-responsive hosting dashboard built with Next.js App Router and a pure CSS token-based design system.

## Architecture Highlights
- **Next.js App Router**: Optimized for server components and fast page loads.
- **Pure CSS Tokens**: `src/styles/tokens.css` is the single source of truth for all design variables. No Tailwind, no bloated libraries.
- **Custom Gestures**: Mobile sliding sheets and drawers use raw React touch event handling for buttery smooth 60fps animations without heavy dependencies (e.g., `framer-motion`).
- **Dark/Light Mode**: Full contextual theming using CSS variables.

## Getting Started

```bash
npm install
npm run dev
```

## Structure
- `src/app`: Next.js page routing
- `src/components`: UI components organized by domain (`layout`, `dashboard`, `chat`, `ui`)
- `src/styles`: CSS modules and global styles
- `src/context`: React context providers (`ThemeContext`)
- `src/data`: Mock data for the dashboard UI
