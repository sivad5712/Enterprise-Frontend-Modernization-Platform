# Vue Cloud Operations Module

This module represents the SRE, DevOps, and Platform Engineering portion of the **Enterprise Operations Command Center** platform. It operates as an embedded micro-frontend designed with Vue 3 and TypeScript.

## Key Features

1. **Lightweight Dashboard**: Dynamic telemetries panel detailing regional up-time statistics, monthly expenses MoM indexes, and active service deployments status.
2. **Svc Health Indicator**: Interactive microservice clusters widgets rendering CPU/memory loads, latency ratings, error indexes, and support for graceful graceful restarts.
3. **SVG latency graphics**: Clean, fully responsive line/area traffic graphs built using standard SVG nodes.
4. **Incidents Management**: DevOps incident alert logs supporting inline resolve callbacks.

---

## Standalone Execution

To run this module independently:

```bash
# Install packages
npm install

# Start Vite dev server on port 5174
npm run dev
```
