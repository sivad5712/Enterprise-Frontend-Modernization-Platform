import React from 'react';
import PageHeader from '../components/layout/PageHeader';

export const LegacyAdminModule: React.FC = () => {
  return (
    <div>
      <PageHeader 
        breadcrumbs="COMMAND CENTER / MICRO-FRONTEND INTERFACE"
        title="Legacy Operations Console"
        description="Legacy Global Admin Console adapter managing corporate identity records, audit logs, and support tickets."
      />

      <div className="alert alert-warning bg-warning bg-opacity-10 border-warning border-opacity-20 d-flex justify-content-between align-items-center mb-4" role="alert">
        <div>
          <i className="fa-solid fa-triangle-exclamation me-2 text-warning"></i>
          <strong>Legacy Adapter Sandbox:</strong> Running legacy jQuery + AJAX compatibility workspace. Modernization roadmap priority: <strong>HIGH</strong>.
        </div>
        <span className="badge bg-warning text-dark">DEPRECIATION STAGE: 35%</span>
      </div>

      <div className="row g-4">
        {/* Left Side: Dynamic high fidelity simulator window */}
        <div className="col-lg-8">
          <div className="card bg-dark text-light border-secondary shadow-lg">
            <div className="card-header border-secondary bg-secondary bg-opacity-25 d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-terminal text-danger"></i>
                <strong className="text-white small font-monospace">jQuery Legacy Simulator Workspace [Static Host]</strong>
              </span>
              <div className="d-flex gap-1">
                <span className="badge bg-warning text-dark">IN-SERVICE</span>
                <span className="badge bg-dark border border-secondary text-secondary p-1 font-monospace">v0.9.1</span>
              </div>
            </div>
            <div className="card-body p-0" style={{ minHeight: '520px', background: '#070a13' }}>
              
              {/* Simulator Header */}
              <div className="bg-secondary bg-opacity-10 border-bottom border-secondary py-3 px-4 d-flex justify-content-between align-items-center">
                <span className="small font-monospace text-secondary"><i className="fa-solid fa-server me-1 text-warning"></i> Direct Database Adapter Connection</span>
                <div className="d-flex gap-3 small text-secondary">
                  <span>Connection: <strong>UNENCRYPTED (Local)</strong></span>
                  <span>Timeout: <strong>15000ms</strong></span>
                </div>
              </div>

              {/* Inner Dashboard Simulator Content */}
              <div className="p-4">
                <div className="row g-3 mb-4">
                  <div className="col-sm-4">
                    <div className="p-3 bg-dark border border-secondary rounded d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-secondary small">USER REGISTERS</div>
                        <h4 className="mb-0 text-white font-bold">5 Active</h4>
                      </div>
                      <i className="fa-solid fa-users text-secondary fa-2x"></i>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="p-3 bg-dark border border-secondary rounded d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-secondary small">CRITICAL AUDITS</div>
                        <h4 className="mb-0 text-danger font-bold">2 Events</h4>
                      </div>
                      <i className="fa-solid fa-shield-halved text-danger fa-2x"></i>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="p-3 bg-dark border border-secondary rounded d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-secondary small">OPEN TICKETS</div>
                        <h4 className="mb-0 text-warning font-bold">2 Tickets</h4>
                      </div>
                      <i className="fa-solid fa-headset text-warning fa-2x"></i>
                    </div>
                  </div>
                </div>

                {/* Legacy Users Table Simulator view */}
                <div className="border border-secondary rounded bg-dark p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0 text-white"><i className="fa-solid fa-users-gear me-2 text-warning"></i>Identity Database</h6>
                    <span className="badge bg-danger">Manual Table Rendering</span>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-dark table-striped border-secondary mb-0 small">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>usr-001</code></td>
                          <td><strong>Alex Mercer</strong></td>
                          <td>admin&#64;operations.enterprise.com</td>
                          <td><span className="badge bg-secondary">SUPER_ADMIN</span></td>
                          <td><span className="badge bg-success">ACTIVE</span></td>
                        </tr>
                        <tr>
                          <td><code>usr-005</code></td>
                          <td><strong>Walter White</strong></td>
                          <td>old-guard&#64;legacy.enterprise.com</td>
                          <td><span className="badge bg-secondary">BANKING_OPERATOR</span></td>
                          <td><span className="badge bg-danger">SUSPENDED</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Modernization Inspect Panel */}
        <div className="col-lg-4">
          <div className="card bg-dark text-light border-secondary">
            <div className="card-header border-secondary bg-secondary bg-opacity-25">
              <h5 className="mb-0 small"><i className="fa-solid fa-circle-nodes me-2 text-warning"></i>Legacy Migration Diagnostics</h5>
            </div>
            <div className="card-body">
              <div className="modernization-inspect-panel mt-0 border-warning border-opacity-35">
                <div className="inspect-header">
                  <div className="inspect-title text-warning">
                    <i className="fa-solid fa-terminal"></i>
                    <span>jQuery 1.11 Adapter Telemetry</span>
                  </div>
                  <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-20">Adapters active</span>
                </div>

                <div className="inspect-details d-flex flex-column gap-2 mb-3">
                  <div className="inspect-metric d-flex justify-content-between">
                    <span className="metric-label">MIGRATION PROGRESS:</span>
                    <strong className="metric-value text-warning">35% Completed</strong>
                  </div>
                  <div className="inspect-metric d-flex justify-content-between">
                    <span className="metric-label">LEGACY BUILD LOAD:</span>
                    <strong className="metric-value font-monospace">1.4 MB (Heavy)</strong>
                  </div>
                  <div className="inspect-metric d-flex justify-content-between">
                    <span className="metric-label">MIGRATION TARGET:</span>
                    <strong className="metric-value font-monospace">Vite React Component</strong>
                  </div>
                </div>

                <div className="inspect-challenges border-top border-secondary pt-3">
                  <h6 className="text-white small mb-2">Modernization Technical Debt Logs:</h6>
                  <ul className="text-secondary small ps-3">
                    <li className="mb-2"><strong>Direct DOM Mutations:</strong> Standard selectors trigger raw HTML string rewrites which degrades rendering efficiency.</li>
                    <li className="mb-2"><strong>No Shared State:</strong> Close closures store arrays in static local cache spaces. Restricts cross-application data flows.</li>
                    <li className="mb-2"><strong>XSS Vulnerabilities:</strong> Raw elements concatenation causes high risk profiles if data arguments are left unescaped.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LegacyAdminModule;
