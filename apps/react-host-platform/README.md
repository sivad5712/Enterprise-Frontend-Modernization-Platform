# React Host Platform

This is the primary deployable application shell and the central orchestrator of the **Enterprise Operations Command Center** platform. It operates as the core micro-frontend host, implemented using React 18, Vite, TypeScript, Sass, and Recharts.

## Key Technical Specifications

1. **Vite FS Sandbox Sharing**: Custom Vite configurations allow secure asset and model compilation from directories outside the React package roots (`shared/`).
2. **Dynamic Routes Auth**: Central protected gateways cache mock tokens in local caches and verify access rules.
3. **Recharts Visualizations**: Interactive Area and Line graphs tracking platform growth index and daily transaction summaries.
4. **MFE Adapter Simulation**: Sandboxed live simulated modules loading Angular 17+ and Vue 3 modules structures for recruiters inspect operations.

---

## Local Development Execution

To launch the host platform locally:

```bash
# Install modules
npm install

# Launch development web server on port 5173
npm run dev
```
