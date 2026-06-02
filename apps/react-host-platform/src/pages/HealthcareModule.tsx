import React from 'react';
import PageHeader from '../components/layout/PageHeader';

export const HealthcareModule: React.FC = () => {
  return (
    <div>
      <PageHeader 
        breadcrumbs="COMMAND CENTER / MICRO-FRONTEND INTERFACE"
        title="Clinical Care Module"
        description="Federates healthcare clinical registries, patient observations data, and claims adjudication metrics."
      />

      <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-20 d-flex justify-content-between align-items-center mb-4" role="alert">
        <div>
          <i className="fa-solid fa-circle-info me-2 text-danger"></i>
          <strong>Clinical Operations Sandbox:</strong> Running integrated Angular 17 micro-frontend simulation workspace.
        </div>
        <span className="badge bg-danger">STATE: COMPLETED</span>
      </div>

      <div className="row g-4">
        {/* Left Side: Dynamic high fidelity simulator window */}
        <div className="col-lg-8">
          <div className="card bg-dark text-light border-secondary shadow-lg">
            <div className="card-header border-secondary bg-secondary bg-opacity-25 d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-square-heart text-danger"></i>
                <strong className="text-white small font-monospace">Angular MFE Simulator Workspace [Port 4200]</strong>
              </span>
              <div className="d-flex gap-1">
                <span className="badge bg-success p-1">ONLINE</span>
                <span className="badge bg-dark border border-secondary text-secondary p-1 font-monospace">v1.2.0</span>
              </div>
            </div>
            <div className="card-body p-0" style={{ minHeight: '520px', background: '#070a13' }}>
              
              {/* Simulator Header */}
              <div className="bg-secondary bg-opacity-10 border-bottom border-secondary py-3 px-4 d-flex justify-content-between align-items-center">
                <span className="small font-monospace text-secondary"><i className="fa-solid fa-shield-halved me-1 text-danger"></i> Secure Health Domain Gateway</span>
                <div className="d-flex gap-3 small text-secondary">
                  <span>Manager: <strong>Stephen Strange</strong></span>
                  <span>MRNs Active: <strong>4</strong></span>
                </div>
              </div>

              {/* Inner Dashboard Simulator Content */}
              <div className="p-4">
                <div className="row g-3 mb-4">
                  <div className="col-sm-6">
                    <div className="p-3 bg-dark border border-secondary rounded d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-secondary small">PATIENTS TRACKED</div>
                        <h4 className="mb-0 text-white font-bold">142,050</h4>
                      </div>
                      <i className="fa-solid fa-hospital-user text-danger fa-2x"></i>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="p-3 bg-dark border border-secondary rounded d-flex justify-content-between align-items-center">
                      <div>
                        <div className="text-secondary small">HCC RISK SCORE</div>
                        <h4 className="mb-0 text-success font-bold">2.14</h4>
                      </div>
                      <i className="fa-solid fa-heart-pulse text-success fa-2x"></i>
                    </div>
                  </div>
                </div>

                {/* Patient Table Simulator view */}
                <div className="border border-secondary rounded bg-dark p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0 text-white"><i className="fa-solid fa-address-book me-2 text-danger"></i>Active Care Gaps</h6>
                    <span className="badge bg-danger">2 Urgent Gaps</span>
                  </div>
                  
                  <div className="table-responsive">
                    <table className="table table-dark table-striped border-secondary mb-0 small">
                      <thead>
                        <tr>
                          <th>MRN</th>
                          <th>Member Name</th>
                          <th>Measure Gaps</th>
                          <th>Severity</th>
                          <th>Due Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>MRN-301982</code></td>
                          <td><strong>Bruce Banner</strong></td>
                          <td>Annual Cardiovascular Assessment</td>
                          <td><span className="badge bg-danger">CRITICAL</span></td>
                          <td className="text-secondary">2026-09-30</td>
                        </tr>
                        <tr>
                          <td><code>MRN-301982</code></td>
                          <td><strong>Bruce Banner</strong></td>
                          <td>Heavy Metal Toxicity Screening</td>
                          <td><span className="badge bg-warning text-dark">HIGH</span></td>
                          <td className="text-secondary">2026-07-15</td>
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
              <h5 className="mb-0 small"><i className="fa-solid fa-circle-nodes me-2 text-danger"></i>MFE Architecture Diagnostics</h5>
            </div>
            <div className="card-body">
              <div className="modernization-inspect-panel mt-0 border-danger border-opacity-35">
                <div className="inspect-header">
                  <div className="inspect-title text-danger">
                    <i className="fa-brands fa-angular"></i>
                    <span>Angular 17 MFE Telemetry</span>
                  </div>
                  <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20">Production</span>
                </div>

                <div className="inspect-details d-flex flex-column gap-2 mb-3">
                  <div className="inspect-metric d-flex justify-content-between">
                    <span className="metric-label">MIGRATION COMPLETENESS:</span>
                    <strong className="metric-value text-success">100%</strong>
                  </div>
                  <div className="inspect-metric d-flex justify-content-between">
                    <span className="metric-label">STANDALONE BUILD SIZE:</span>
                    <strong className="metric-value font-monospace">342 KB</strong>
                  </div>
                  <div className="inspect-metric d-flex justify-content-between">
                    <span className="metric-label">SHARED MODELS TYPING:</span>
                    <strong className="metric-value font-monospace">TypeScript ESM</strong>
                  </div>
                </div>

                <div className="inspect-challenges border-top border-secondary pt-3">
                  <h6 className="text-white small mb-2">Modernization Architecture Highlights:</h6>
                  <ul className="text-secondary small ps-3">
                    <li className="mb-2"><strong>RxJS Debounced Searches:</strong> Solves frame stutters during keyboard listings query events by routing keypress entries through 300ms debounce pipes.</li>
                    <li className="mb-2"><strong>Compliance Guards:</strong> Standard functional guards prevent unauthorized corporate staff from launching clinical patient registries.</li>
                    <li className="mb-2"><strong>Reactive Forms:</strong> Extends deep custom validators for clinical diagnoses codes matching (ICD-10 regex).</li>
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
export default HealthcareModule;
