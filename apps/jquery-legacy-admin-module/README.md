# Legacy Admin Module (jQuery & AJAX)

This module represents the legacy portion of the **Enterprise Operations Command Center** frontend. It simulates a raw jQuery + Bootstrap 5 operations console that still exists in many real companies today.

## Technical Architecture

- **Structure**: Standalone vanilla HTML5 page using standard ESM script integration.
- **Dependencies**: jQuery 3.7.1, Bootstrap 5.3.2, Font Awesome 6.4.0 (all integrated via highly-cached CDNs for zero local build overhead).
- **Core Files**:
  - `index.html`: Base templates with widgets, sidebar panels, modals, and tabs wrappers.
  - `js/app.js`: Main router handling tab activation, modal operations, and events binding.
  - `js/api.js`: Bridge logic binding mock services directly.
  - `js/users.js`: jQuery user management rendering tables, toggling statuses, searching elements.
  - `js/auditLogs.js`: Audit log lists with Load-More pagination.
  - `js/tickets.js`: Customer support ticket resolution.
  - `js/validation.js`: Regular expression corporate authentication check.

---

## Legacy Technical Debt & Challenges

1. **Direct DOM Manipulation**: Building strings of HTML (`html += '<tr>...'`) and updating containers using `$('#id').html(html)` causes high browser repaint costs and is vulnerable to XSS if arguments are unescaped.
2. **Scattered Event Listeners**: Standard click and keystroke delegates are scattered across individual source files, making event tracking difficult without complete source searches.
3. **No Centralized State**: All database arrays are stored directly in individual script closures (`usersList`, `ticketsList`), making cross-app state sharing extremely complex without complete global re-writes.
4. **Manual Validation**: High visual maintenance costs due to manual selector checking instead of declaratively binding states (e.g. Formik, React Hook Form, or Angular Reactive Forms).

---

## Modernization Strategy

- **Phase 1: API Isolation**: Extract all direct query triggers into typed APIs (`shared/mock-api/`). *(COMPLETED)*
- **Phase 2: Host Shell Binding**: Embed the legacy admin console inside a modern host application (React Host Shell). *(COMPLETED)*
- **Phase 3: React Conversion**: Progressively rewrite jQuery selectors and custom templates into reusable React components using high-fidelity modern forms validation. *(UPCOMING)*
