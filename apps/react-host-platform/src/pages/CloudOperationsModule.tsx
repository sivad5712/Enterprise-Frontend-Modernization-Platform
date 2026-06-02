import React from 'react';
import PageHeader from '../components/layout/PageHeader';

export const CloudOperationsModule: React.FC = () => {
  return (
    <div>
      <PageHeader 
        breadcrumbs="COMMAND CENTER / MICRO-FRONTEND INTERFACE"
        title="Infrastructure Telemetry"
        description="Federates SRE microservices health statuses, active incident response pipelines, and K8s node scaling."
      />

      <div className="alert alert-success bg-success bg-opacity-10 border-success border-opacity-20 d-flex justify-content-between align-items-center mb-4" role="alert">
        <div>
          <i className="fa-solid fa-circle-info me-2 text-success"></i>
          <strong>SRE Telemetry Sandbox:</strong> Running integrated Vue 3 + TypeScript micro-frontend workspace.
        </div>
        <span className="badge bg-success">STATE: COMPLETED</span>
      </div>

      <div className="row g-4">
        {/* Left Side: Dynamic high fidelity simulator window */}
        <div className="col-lg-8">
          <div className="card bg-dark text-light border-secondary shadow-lg">
            <div className="card-header border-secondary bg-secondary bg-opacity-25 d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-cloud text-cyan"></i>
                <strong className="text-white small font-monospace">Vue MFE Simulator Workspace [Port 5174]</strong>
              </span>
              <div className="d-flex gap-1">
                <span className="badge bg-success p-1">ONLINE</span>
                <span className="badge bg-dark border border-secondary text-secondary p-1 font-monospace">v2.1.0</span>
              </div>
            </div>
            <div className="card-body p-0" style={{ minHeight: '520px', background: '#070a13' }}>
              
              {/* Simulator Header */}
              <div className="bg-secondary bg-opacity-10 border-bottom border-secondary py-3 px-4 d-flex justify-content-between align-items-center">
                <span className="small font-monospace text-secondary"><i className="fa-solid fa-gauge me-1 text-cyan"></i> Core Cluster Telemetry Gateway</span>
                <div className="d-flex gap-3 small text-secondary">
                  <span>Region: <strong>us-central1</strong></span>
                  <span>Active Pods: <strong>24</strong></span>
                </div>
              </div>

              {/* Inner Dashboard Simulator Content */}
              <div className="p-4">
                <div className="row g-3 mb-4">
                  <div className="col-sm-6">
                    <div className="p-3 bg-dark border border-secondary rounded d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-secondary small">OVERALL PLATFORM UPTIME</div>
                        <h4 className="mb-0 text-white font-bold">99.982%</h4>
                      </div>
                      <i className="fa-solid fa-circle-check text-success fa-2x"></i>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-dark border border-secondary rounded d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-secondary small">ACTIVE CRITICAL INCIDENTS</div>
                        <h4 className="mb-0 text-danger font-bold">2 Incidents</h4>
                      </div>
                      <i className="fa-solid fa-triangle-exclamation text-danger fa-2x"></i>
                    </div>
                  </div>
                </div>

                {/* Svc Grid Simulator view */}
                <div className="border border-secondary rounded bg-dark p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0 text-white"><i className="fa-solid fa-server me-2 text-cyan"></i>Telemetry Clusters Health</h6>
                    <span className="badge bg-success">Healthy status</span>
                  </div>

                  <div className="row g-2 text-center small">
                    <div className="col-sm-4">
                      <div className="p-2 bg-secondary bg-opacity-10 rounded border border-secondary">
                        <div className="text-white font-monospace">banking-ledger-api</div>
                        <span className="badge bg-success mt-1">HEALTHY</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="p-2 bg-secondary bg-opacity-10 rounded border border-secondary">
                        <div className="text-white font-monospace">identity-oauth-gateway</div>
                        <span className="badge bg-success mt-1">HEALTHY</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="p-2 bg-secondary bg-opacity-10 rounded border border-secondary">
                        <div className="text-white font-monospace">reports-service</div>
                        <span className="badge bg-danger mt-1">DOWN</span>
                      </div>
                    </div>
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
              <h5 className="mb-0 small"><i className="fa-solid fa-circle-nodes me-2 text-cyan"></i>MFE Architecture Diagnostics</h5>
            </div>
            <div className="card-body">
              <div className="modernization-inspect-panel mt-0 border-cyan border-opacity-35">
                <div className="inspect-header">
                  <div className="inspect-title text-cyan">
                    <i className="fa-brands fa-vuejs"></i>
                    <span>Vue 3 MFE Telemetry</span>
                  </div>
                  <span className="badge bg-cyan bg-opacity-10 text-cyan border border-cyan border-opacity-20">Production</span>
                </div>

                <div className="inspect-details d-flex flex-column gap-2 mb-3">
                  <div className="inspect-metric d-flex justify-content-between">
                    <span className="metric-label">MIGRATION COMPLETENESS:</span>
                    <strong className="metric-value text-success">100%</strong>
                  </div>
                  <div className="inspect-metric d-flex justify-content-between">
                    <span className="metric-label">STANDALONE BUILD SIZE:</span>
                    <strong className="metric-value font-monospace">88 KB</strong>
                  </div>
                  <div className="inspect-metric d-flex justify-content-between">
                    <span className="metric-label">COMPONENTS DESIGN:</span>
                    <strong className="metric-value font-monospace">Composition API</strong>
                  </div>
                </div>

                <div className="inspect-challenges border-top border-secondary pt-3">
                  <h6 className="text-white small mb-2">Modernization Architecture Highlights:</h6>
                  <ul className="text-secondary small ps-3">
                    <li className="mb-2"><strong>Composition API:</strong> Leverages Vue 3 setup patterns for lightweight, easily testable logic blocks.</li>
                    <li className="mb-2"><strong>SVG Data Graphics:</strong> Render metrics trends (traffic latency, resource limits) entirely using standard inline browser SVG elements. Avoids heavy chart package inflation.</li>
                    <li className="mb-2"><strong>Light Bundle Profile:</strong> Vue's minimal package size (88kb standalone) keeps the DevOps dashboard high-speed.</li>
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
export default CloudOperationsModule;
