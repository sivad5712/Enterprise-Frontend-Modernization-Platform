import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { platformApi } from '../services/api';
import { Customer } from '../types';

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await platformApi.banking.getCustomers();
        setCustomers(res);
      } catch (err) {
        console.error('Failed to load customers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleViewDetails = (name: string) => {
    alert(`Opening details view for customer: "${name}"`);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-spinner fa-spin fa-2x text-indigo"></i>
        <p className="text-secondary mt-2">Loading customer profiles...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        breadcrumbs="COMMAND CENTER / CUSTOMERS"
        title="Customer Directory"
        description="Monitor monitored customer accounts status, balance tiers, and recent clearing events."
      />

      <div className="alert alert-secondary bg-secondary bg-opacity-25 border border-secondary p-3 rounded-3 mb-5 d-flex justify-content-between align-items-center">
        <div className="small text-secondary">
          <i className="fa-solid fa-circle-info text-indigo me-2"></i>
          <strong>Tech Highlight:</strong> This portal is built with decoupled <strong>Angular</strong> clinical schemas.
        </div>
        <span className="badge bg-dark border border-secondary text-secondary font-monospace">Angular MFE Adapted</span>
      </div>

      {/* Cards Grid Layout */}
      <div className="row g-4">
        {customers.map((c) => {
          const statusClass = c.kycStatus === 'APPROVED' ? 'success' : 'warning';
          return (
            <div key={c.id} className="col-md-4">
              <div className="customer-card">
                <div className="customer-header">
                  <h4 className="customer-name">{c.name}</h4>
                  <span className={`status-badge ${statusClass}`}>
                    <span className="badge-dot"></span>
                    {c.kycStatus}
                  </span>
                </div>

                <div className="customer-details pt-2 border-top border-secondary border-opacity-10">
                  <div className="detail-row">
                    <span className="text-secondary">Account ID:</span>
                    <strong className="text-white font-monospace">{c.id}</strong>
                  </div>
                  <div className="detail-row">
                    <span className="text-secondary">Risk Rating:</span>
                    <strong className={c.riskScore > 50 ? 'text-danger' : 'text-success'}>
                      {c.riskScore}%
                    </strong>
                  </div>
                  <div className="detail-row">
                    <span className="text-secondary">Joined Date:</span>
                    <span className="text-white">{c.joinedDate}</span>
                  </div>
                  <div className="detail-row">
                    <span className="text-secondary">Corporate Email:</span>
                    <span className="text-white small text-truncate" style={{ maxWidth: '160px' }}>{c.email}</span>
                  </div>
                </div>

                <button 
                  className="btn btn-sm btn-outline-secondary w-100 mt-2 py-2"
                  onClick={() => handleViewDetails(c.name)}
                >
                  <i className="fa-solid fa-circle-user me-1 text-secondary"></i> View Account Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Customers;
