# Angular Healthcare Module

This module represents the structured, highly-compliant care management portion of the **Enterprise Operations Command Center** platform. It operates as an embedded micro-frontend designed with Angular (v17+) and TypeScript.

## Key Features

1. **Dashboard Overview**: Telemetry KPI indicators monitoring patient counts, HEDIS score gaps, and clinical risk trends.
2. **Patient Directory**: Debounced cohort searches leveraging standard RxJS pipeline flows.
3. **Interactive Observations**: Active patient details panel loading electronic health observations (blood pressures, glucose indices, weights).
4. **Compliance Checking**: Role guards preventing non-clinical staff from accessing member files.

---

## Standalone Execution

To run this module independently:

```bash
# Install packages
npm install

# Start development server on port 4200
npm start
```
