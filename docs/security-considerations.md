# Security Considerations

The platform establishes robust security layers to manage sensitive corporate datasets.

### 1. Role-Based Access Control (RBAC)
- **Clinical Suite Access**: Strict functional guards check authentication sessions before mounting clinical modules. Tries to prevent non-authorized personnel (e.g. standard banking operators) from viewing clinical charts.

### 2. Client Side Protections
- **Manual HTML Escaping**: Legacy jQuery templates concatenate database fields after routing string parameters through an XSS sanitizer:
  ```javascript
  export function escapeHTML(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  ```
- **JWT Headers Interceptor**: Standard HTTP interceptors append Authorization bearer headers (`Authorization: Bearer <token>`) to outbound clinical requests automatically.

### 3. Future Authentications Pipeline
- **OAuth2 / OIDC**: The blueprint proposes migrating local sessions to a centralized Identity Provider (e.g. Okta, Keycloak) utilizing secure authorization code flow with PKCE authentication.
