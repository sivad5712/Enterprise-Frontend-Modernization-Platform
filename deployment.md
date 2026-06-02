# Deployment & Local Operations

This document details local configurations and cloud deployment steps to deploy the consolidated Command Center.

---

## 1. Local Development Setup

Clone the repository and launch standard workspaces.

### Prerequisites
- Node.js (v18.x or newer)
- npm (v9.x or newer)

### Global Dependency Installation
Install dependencies at individual package levels:

```bash
# Install modules
cd apps/react-host-platform && npm install
cd ../angular-healthcare-module && npm install
cd ../vue-cloud-ops-module && npm install
```

### Monorepo Launch Commands
Use root `package.json` workspace shortcuts to serve individual apps:

```bash
# Start Vite React Host (Port 5173)
npm run dev:react

# Start Vue SRE Telemetry (Port 5174)
npm run dev:vue

# Start Angular Healthcare Module (Port 4200)
npm run dev:angular

# Start jQuery Legacy static server (Port 3000)
npm run serve:jquery
```

---

## 2. Vercel Cloud Deployment

The **React Host Platform** is fully configured for seamless Vercel production hosting.

### Vercel Project Configuration:
1. **Root Directory**: `apps/react-host-platform`
2. **Framework Preset**: `Vite`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### Environment Variables
Configure standard key-value pairings inside the Vercel variables dashboard matching `.env.example`:
- `VITE_PLATFORM_ENV`: `production`
- `VITE_API_TIMEOUT`: `15000`
