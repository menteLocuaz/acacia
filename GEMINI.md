# Acacia POS Project Overview

Acacia is a modern Point of Sale (POS) system built with React, TypeScript, and Vite, designed for high-traffic retail environments like supermarkets.

## Architecture

The project follows a feature-based architecture:
- **`src/features`**: Contains core business logic and UI for specific domains.
  - **`login`**: Industrial terminal-style authentication system.
  - **`orders`**: Real-time sales catalog and receipt management.
- **`src/routers`**: Manages application routing using `react-router-dom`.
- **`src/styles`**: Global styling and design tokens.
- **`src/components`**: Reusable UI atoms and molecules.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: `styled-components` (CSS-in-JS)
- **Icons**: `@iconify/react`
- **Build Tool**: Vite
- **Routing**: `react-router-dom`

## Building and Running

### Development
```powershell
npm run dev
```

### Production Build
```powershell
npm run build
```

### Linting
```powershell
npm run lint
```

## Development Conventions

1.  **Component Design**: Use `styled-components` for all UI elements. Follow the "Industrial POS" aesthetic defined in design tokens.
2.  **State Management**: Use local `useState` and `useMemo` for feature-specific state. Complex shared state should reside in feature stores.
3.  **Type Safety**: Maintain strict TypeScript interfaces for all data models (Products, Categories, CartItems).
4.  **Performance**: Memoize expensive calculations (like filtered lists and financial totals) using `useMemo` and `useCallback`.
5.  **Naming**: Use PascalCase for components and camelCase for hooks and utilities.

## Key Files

- `src/features/login/pages/LoginPage.tsx`: The primary entry point for operator authentication.
- `src/features/orders/pages/Orderspages.tsx`: The main sales interface.
- `src/routers/AppRouter.tsx`: Defines the application's navigation flow.
