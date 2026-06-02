import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';

export const Settings: React.FC = () => {
  const [securityMfa, setSecurityMfa] = useState(true);
  const [dbWrites, setDbWrites] = useState(false);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader 
        breadcrumbs="COMMAND CENTER / SETTINGS"
        title="Settings"
        description="Configure application settings, security rules, and system notifications."
      />

      <div className="row">
        <div className="col-lg-7 mx-auto">
          {saved && (
            <div className="alert alert-success bg-success bg-opacity-10 border-success border-opacity-20 mb-4" role="alert">
              <i className="fa-solid fa-circle-check me-2 text-success"></i> Settings saved successfully.
            </div>
          )}

          <form onSubmit={handleSave} className="d-flex flex-column gap-4">
            
            {/* Grouped Section 1: Identity & Authentication */}
            <div className="card bg-secondary text-light border-secondary p-4" style={{ borderRadius: '10px' }}>
              <h6 className="text-secondary small font-monospace mb-3" style={{ letterSpacing: '0.5px' }}>SECURITY & ACCESS</h6>
              <div className="form-check form-switch mb-3">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  role="switch" 
                  id="set-mfa"
                  checked={securityMfa}
                  onChange={(e) => setSecurityMfa(e.target.checked)}
                />
                <label className="form-check-label text-secondary small" htmlFor="set-mfa">FORCE MULTI-FACTOR AUTHENTICATION (MFA) FOR ALL CLINICAL ACCESS</label>
              </div>
              <div className="form-check form-switch mb-0">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  role="switch" 
                  id="set-writes"
                  checked={dbWrites}
                  onChange={(e) => setDbWrites(e.target.checked)}
                />
                <label className="form-check-label text-secondary small" htmlFor="set-writes">ALLOW STANDALONE INLINE WRITES ON LEGACY DB ADAPTERS (UNSAFE)</label>
              </div>
            </div>

            {/* Grouped Section 2: Platform Notifications */}
            <div className="card bg-secondary text-light border-secondary p-4" style={{ borderRadius: '10px' }}>
              <h6 className="text-secondary small font-monospace mb-3" style={{ letterSpacing: '0.5px' }}>NOTIFICATIONS</h6>
              <div className="form-check form-switch mb-0">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  role="switch" 
                  id="set-alerts"
                  checked={systemAlerts}
                  onChange={(e) => setSystemAlerts(e.target.checked)}
                />
                <label className="form-check-label text-secondary small" htmlFor="set-alerts">ENABLE DAILY SECURITY FRAUD SUMMARY NOTIFICATION EMAIL COPIES</label>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="d-flex justify-content-end mt-2">
              <button type="submit" className="btn btn-primary px-4 py-2" style={{ background: '#5b5df6', border: 'none', fontSize: '0.9rem' }}>
                Save Settings
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
export default Settings;
