# RMS Enterprise Admin Platform

An enterprise monorepo housing three independent administrative portals: **VM**, **SRMS**, and **OAMS**, sharing a unified design system and core infrastructure.

## Architecture

This project is built using a modern frontend stack designed for scalability and maintainability.

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Monorepo Tooling**: Turborepo
- **State Management**: Redux Toolkit & TanStack Query
- **UI Library**: PrimeReact (Lara Theme) + Vanilla CSS
- **Form Handling**: React Hook Form + Zod

### Monorepo Structure

The workspace is organized into two primary spaces: `apps` and `packages`.

#### Apps (`/apps`)
Independent Next.js applications that can be built and deployed separately.
- `vm`: Virtual Machine administration portal
- `srms`: Samsung Resource Management System
- `oams`: Operations & Access Management System

#### Packages (`/packages`)
Shared modular packages consumed by the apps.
- `@repo/api`: Configured Axios client and TanStack Query setup.
- `@repo/auth`: Authentication context, utilities, and Route Guards (Clean Architecture).
- `@repo/constants`: Shared global constants.
- `@repo/hooks`: Custom React hooks (`useAuth`, `usePermission`, etc.).
- `@repo/layouts`: Standardized page layouts (Sidebar, Header, Topbar).
- `@repo/store`: Central Redux store configuration and slices.
- `@repo/theme`: PrimeReact ThemeProvider and global CSS utilities.
- `@repo/types`: Shared TypeScript interfaces and types.
- `@repo/ui`: Pure reusable UI components wrapping PrimeReact.
- `@repo/utils`: Shared utility functions.
- `@repo/config`: Core configuration injection point (`AppProviders`).

## Development

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
npm install
```

### Running Locally
To start a specific app (e.g., the VM app):
```bash
npm run dev -w @repo/vm
```

Or start all apps concurrently:
```bash
npx turbo run dev
```

### Building for Production
To build a specific app:
```bash
npm run build -w @repo/vm
```

To build all apps and packages:
```bash
npx turbo run build
```

## Creating New Features

When adding new functionality, ask: *Is this specific to an app or shared?*
- If **App-specific**: Add it under `apps/<app>/src/features/<feature-name>`.
- If **Shared**: Add it to the corresponding `@repo/*` package.

All components in `@repo/ui` should be "dumb" pure components without internal business logic. API calls and state management should happen inside the app-level feature architecture.
"# rms-admin" 
