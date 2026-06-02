import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { platformApi } from '../services/api';
import { Transaction } from '../types';
import { formatCurrency, formatDateTime } from '../utils/formatters';

export const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [search]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await platformApi.banking.getTransactions({
        search: search || undefined
      });
      setTransactions(res);
    } catch (err) {
      console.error('Failed to load transactions', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    let cls = 'neutral';
    if (status === 'COMPLETED') cls = 'success';
    else if (status === 'PENDING') cls = 'warning';
    else if (status === 'FAILED') cls = 'danger';
    return <span className={`status-badge ${cls}`}><span className="badge-dot"></span>{status}</span>;
  };

  return (
    <div>
      <PageHeader 
        breadcrumbs="COMMAND CENTER / TRANSACTIONS"
        title="Transactions Ledger"
        description="Verify checking, savings, and transfers events cleared in the corporate ledger."
      />

      <div className="alert alert-secondary bg-secondary bg-opacity-25 border border-secondary p-3 rounded-3 mb-5 d-flex justify-content-between align-items-center">
        <div className="small text-secondary">
          <i className="fa-solid fa-circle-info text-indigo me-2"></i>
          <strong>Tech Highlight:</strong> This portal is built with a lightweight <strong>Vue 3</strong> composition layer.
        </div>
        <span className="badge bg-dark border border-secondary text-secondary font-monospace">Vue MFE Adapted</span>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-panel mb-4 p-3 bg-secondary rounded-3">
        <div className="search-input-wrapper w-100" style={{ maxWidth: '400px' }}>
          <span className="search-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
          <input 
            type="text" 
            className="form-control" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, merchant..."
          />
        </div>
      </div>

      {/* Pristine Clean Table */}
      <div className="card bg-secondary text-light border-secondary shadow-lg">
        <div className="card-body p-0">
          <div className="table-responsive-wrapper">
            <table className="enterprise-table mb-0">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 loading-row text-secondary">
                      <i className="fa-solid fa-spinner fa-spin me-2"></i>Querying ledgers...
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-secondary">
                      No matching transactions found in the database.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="small text-secondary">{formatDateTime(tx.timestamp)}</td>
                      <td>
                        <strong>{tx.customerName}</strong>
                        <div className="secondary-text small" style={{ fontSize: '0.75rem' }}>Merchant: {tx.merchant}</div>
                      </td>
                      <td><span className="badge bg-dark border border-secondary text-secondary">{tx.type}</span></td>
                      <td className="font-monospace font-bold">
                        {tx.type === 'DEPOSIT' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </td>
                      <td>{getStatusBadge(tx.status)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Transactions;
