import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { platformApi } from '../services/api';
import { FraudAlert } from '../types';

export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const res = await platformApi.banking.getFraudAlerts();
        setAlerts(res);
      } catch (err) {
        console.error('Failed to load alerts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
    alert(`Alert ${id} has been dismissed.`);
  };

  const getPriorityClass = (severity: string) => {
    if (severity === 'CRITICAL' || severity === 'HIGH') return 'high';
    if (severity === 'MEDIUM') return 'medium';
    return 'low';
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-spinner fa-spin fa-2x text-indigo"></i>
        <p className="text-secondary mt-2">Loading operations alerts...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        breadcrumbs="COMMAND CENTER / ALERTS"
        title="Operational Alerts"
        description="Verify security flags, transaction category anomalies, and AI fraud scores warnings."
      />

      <div className="alert alert-secondary bg-secondary bg-opacity-25 border border-secondary p-3 rounded-3 mb-5 d-flex justify-content-between align-items-center">
        <div className="small text-secondary">
          <i className="fa-solid fa-circle-info text-indigo me-2"></i>
          <strong>Tech Highlight:</strong> This portal is powered by a high-compliance <strong>jQuery AJAX</strong> adapter core.
        </div>
        <span className="badge bg-dark border border-secondary text-secondary font-monospace">jQuery MFE Adapted</span>
      </div>

      {/* Priority Alert Cards list */}
      <div className="row g-4">
        {alerts.map((a) => {
          const priority = getPriorityClass(a.severity);
          return (
            <div key={a.id} className="col-md-6">
              <div className={`alert-card ${priority}`}>
                <div className="alert-header">
                  <span className={`alert-priority text-uppercase font-monospace ${priority === 'high' ? 'text-danger' : priority === 'medium' ? 'text-warning' : 'text-info'}`} style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                    <i className="fa-solid fa-triangle-exclamation me-1"></i>
                    {a.severity} RISK
                  </span>
                  <span className="badge bg-dark border border-secondary text-secondary small font-monospace">Score: {a.score}%</span>
                </div>

                <div className="alert-body my-3">
                  <h5 className="text-white mb-2">{a.triggerReason}</h5>
                  <div className="d-flex justify-content-between small text-secondary mt-1">
                    <span>Customer: <strong>{a.customerName}</strong></span>
                    <span>Amount: <strong className="text-white">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(a.amount)}</strong></span>
                  </div>
                </div>

                <div className="d-flex gap-2 justify-content-end border-top border-secondary border-opacity-10 pt-3">
                  <button 
                    className="btn btn-sm btn-outline-danger px-3 py-1.5"
                    onClick={() => handleDismiss(a.id)}
                  >
                    Dismiss Alert
                  </button>
                  <button 
                    className="btn btn-sm btn-primary px-3 py-1.5"
                    style={{ background: '#5b5df6', border: 'none' }}
                    onClick={() => alert(`Initiating full fraud investigation review for transaction ${a.transactionId}`)}
                  >
                    Investigate
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {alerts.length === 0 && (
          <div className="col-12 text-center py-5 text-secondary">
            <i className="fa-solid fa-shield-check fa-3x mb-2 text-success"></i>
            <p>No active critical warnings are registered inside the platform queue.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Alerts;
