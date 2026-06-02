# Testing Strategy & Quality Assurance

This platform defines comprehensive validation protocols to ensure strict production readiness.

---

## 1. Automated Testing Suites

Each micro-frontend module integrates dedicated unit testing profiles:

### 1. React Host Console (Vitest)
- **Target**: Formatter utilities validation, currency and number formats, transaction list filter parameters, and severity badge classes matching.
- **Run Command**:
  ```bash
  npm run test:react
  ```

### 2. Angular Healthcare Module (Jasmine & Karma)
- **Target**: Functional auth/role guards validation, patient profile detail observational checks, and Http interceptors.
- **Run Command**:
  ```bash
  npm run test:angular
  ```

### 3. Vue DevOps SRE Module (Vitest)
- **Target**: Composition telemetry color computations logic, MoM cloud billing alert thresholds, and incident list render configurations.
- **Run Command**:
  ```bash
  npm run test:vue
  ```

---

## 2. Manual Verification Checklist

Verify portal usability before cloud release.

- [ ] **Auth Navigation routing**: Verify that trying to access `/dashboard` without cached session headers triggers immediate redirect to `/login`.
- [ ] **Banking searches**: Check that typing 'Tony' inside the transaction search bar filters results down to Stark's ledger entries.
- [ ] **Angular search debouncing**: Verify that typing rapidly in the clinical portal patient search bar does not trigger redundant queries.
- [ ] **SRE grace cycles**: Click 'Graceful Restart' on SRE microservices health widgets and check that status temporarily switches to DEGRADED before fully restoring to HEALTHY.
