# Agent Intelligence Hub Agent Instructions

## Overview
The Agent Intelligence Hub is a visual dashboard for Mayoka Inc.'s Cortex Engine. It features a Three.js-powered neural network visualization and a reactive HUD.

## Core Components
- `src/App.tsx`: Main dashboard layout and HUD elements.
- `src/components/NeuralNetwork.tsx`: Three.js visualization of interconnected agent nodes.
- `App.css`: Global styles for the "Neon Surge" aesthetic (glitch effects, neon colors).

## Coding Standards
- **Component Pattern**: Use functional components with hooks.
- **Three.js in React**: Ensure proper resource disposal in `useEffect` cleanup. Use `renderer.dispose()` and `scene.clear()`.
- **Responsive Design**: The UI must adapt to various screen sizes, with the Three.js canvas covering the background.

## Visual Aesthetic
- **Colors**: Use `#00D1FF` (Neon Cyan) and `#FF00FF` (Neon Magenta).
- **Effects**: Implement CSS glitch animations for titles and borders.
- **Typography**: Prefer monospace fonts for a "terminal" feel.

## Future Improvements
- [ ] Implement `react-three-fiber` for more declarative Three.js management.
- [ ] Add real-time telemetry data fetching (mocked or from an API).
- [ ] Integrate a 3D view of individual agents.
- [ ] Add unit tests for React components.
