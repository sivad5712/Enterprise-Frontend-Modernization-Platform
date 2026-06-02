# Accessibility (a11y) Strategy

The platform targets full compliance with **WCAG 2.1 Level AA** standards.

### 1. Semantic HTML & Structural Layouts
- **Correct Nodes**: Leverage unified `<header>`, `<aside>`, `<main>`, `<section>`, and `<footer>` layout tags.
- **Header Order**: Only one `<h1>` per page. Subtitle tags map down cleanly (`<h2>` to `<h5>`).

### 2. Interactive Navigation
- **Keyboard Traversal**: Ensure all custom cards, modals, and buttons allow full keyboard focus tabs transitions.
- **Focus Outlines**: Active elements receive custom focus rings (`outline: none; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.4)`).
- **ARIA Elements**: Screen reader accessibility is supported using clear descriptive properties (`aria-live="assertive"`, `role="alert"`, `aria-label="Close"`).
