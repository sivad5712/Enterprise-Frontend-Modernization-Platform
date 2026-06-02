import React, { useState, useEffect } from 'react';
import PageHeader from '../components/layout/PageHeader';
import MetricCard from '../components/cards/MetricCard';
import { platformApi } from '../services/api';
import { Transaction, FraudAlert } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatDateTime } from '../utils/formatters';

const assetsTimeline = [
  { name: 'Jan', value: 2150000000 },
  { name: 'Feb', value: 2280000000 },
  { name: 'Mar', value: 2320000000 },
  { name: 'Apr', value: 2410000000 },
  { name: 'May', value: 2450890000 }
];

export const BankingOperations: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  
  // Filter States
  const [search, setSearch] = useState('');
  const [type, setType] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [suspiciousOnly, setSuspiciousOnly] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBankingData();
  }, [type, status, search, suspiciousOnly]);

  const fetchBankingData = async () => {
    try {
      setLoading(true);
      const [mRes, fRes, tRes] = await Promise.all([
        platformApi.banking.getBankingMetrics(),
        platformApi.banking.getFraudAlerts(),
        platformApi.banking.getTransactions({
          type: type === 'ALL' ? undefined : type,
          status: status === 'ALL' ? undefined : status,
          search: search || undefined,
          isSuspicious: suspiciousOnly ? true : undefined
        })
      ]);
      
      setMetrics(mRes);
      setFraudAlerts(fRes);
      setTransactions(tRes);
    } catch (err) {
      console.error('Failed to load banking ledger', err);
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
        breadcrumbs="COMMAND CENTER / BANKING TELEMETRY"
        title="Core Banking Operations"
        description="Verify global checking/savings assets balances, real-time transfers streams, and automated AI fraud risk alerts."
      />

      {/* KPI Cards Row */}
      {metrics && (
        <div className="dashboard-kpi-row">
          <MetricCard 
            title="Total Assets Under Management"
            value={formatCurrency(metrics.totalAssetsUnderManagement)}
            icon="fa-solid fa-coins"
            trend="4.8%"
            trendUp={true}
            theme="indigo"
          />
          <MetricCard 
            title="Active Operations Accounts"
            value={metrics.activeAccountsCount.toLocaleString()}
            icon="fa-solid fa-address-book"
            theme="cyan"
          />
          <MetricCard 
            title="Daily Clearing Volume"
            value={formatCurrency(metrics.dailyTransactionVolume)}
            icon="fa-solid fa-money-bill-transfer"
            theme="emerald"
          />
          <MetricCard 
            title="AI Fraud Alerts Registered"
            value={metrics.fraudAlertsOpen}
            icon="fa-solid fa-shield-halved"
            theme="rose"
          />
        </div>
      )}

      {/* Analytics Line Chart */}
      <div className="row g-4 mb-5">
        <div className="col-lg-8">
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Consolidated Assets Growth Timeline</h3>
              <span className="badge bg-secondary font-monospace">MoM CY-2026</span>
            </div>
            <div className="chart-container w-100 h-100">
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={assetsTimeline} margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }} />
                  <YAxis stroke="#6b7280" tickFormatter={(v) => `$${v/1000000000}B`} style={{ fontSize: '0.75rem', fontFamily: 'monospace' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px' }}
                    labelStyle={{ color: '#9ca3af', fontFamily: 'monospace' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Fraud alerts widgets list */}
        <div className="col-lg-4">
          <div className="card bg-dark text-light border-secondary h-100">
            <div className="card-header border-secondary bg-secondary bg-opacity-25">
              <h5 className="mb-0 small font-bold"><i className="fa-solid fa-shield-halved me-2 text-danger"></i>AI Fraud Telemetry Alerts</h5>
            </div>
            <div className="card-body">
              <div className="d-flex flex-column gap-3">
                {fraudAlerts.map(alert => (
                  <div key={alert.id} className="p-3 bg-secondary bg-opacity-25 rounded border-start border-4 border-danger small">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <strong className="text-white">{alert.customerName}</strong>
                      <span className="badge bg-danger">Score: {alert.score}</span>
                    </div>
                    <div className="text-secondary mb-1">Amount: <strong>{formatCurrency(alert.amount)}</strong></div>
                    <div className="text-tertiary mt-1 font-monospace" style={{ fontSize: '0.7rem' }}>Reason: {alert.triggerReason}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter panel */}
      <div className="filter-panel">
        <div className="filter-controls w-100 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            {/* Search text field */}
            <div className="search-input-wrapper" style={{ minWidth: '220px' }}>
              <span className="search-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
              <input 
                type="text" 
                className="form-control" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions..."
              />
            </div>

            {/* Type selector */}
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)} 
              className="filter-select"
            >
              <option value="ALL">All Types</option>
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAWAL">Withdrawal</option>
              <option value="TRANSFER">Transfer</option>
              <option value="PAYMENT">Payment</option>
            </select>

            {/* Status selector */}
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="filter-select"
            >
              <option value="ALL">All Statuses</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>

            {/* Suspicious checkbox check */}
            <div className="form-check form-switch ms-3 mb-0">
              <input 
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="check-suspicious" 
                checked={suspiciousOnly}
                onChange={(e) => setSuspiciousOnly(e.target.checked)}
              />
              <label className="form-check-label text-secondary small" htmlFor="check-suspicious">SUSPICIOUS ONLY</label>
            </div>
          </div>

          <button 
            className="btn btn-sm btn-secondary"
            onClick={() => { setSearch(''); setType('ALL'); setStatus('ALL'); setSuspiciousOnly(false); }}
          >
            <i className="fa-solid fa-rotate-left"></i> Reset
          </button>
        </div>
      </div>

      {/* Transactions Data Table */}
      <div className="card bg-dark text-light border-secondary mb-4">
        <div className="card-header border-secondary bg-secondary bg-opacity-25">
          <h5 className="mb-0 small"><i className="fa-solid fa-list-check me-2 text-indigo"></i>Daily Transactions Registry</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive-wrapper">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Customer Name</th>
                  <th>Category</th>
                  <th>Merchant</th>
                  <th>Timestamp</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className={tx.isSuspicious ? 'bg-danger bg-opacity-10' : ''}>
                    <td>
                      <code className="text-indigo">{tx.id}</code>
                      {tx.isSuspicious && <span className="badge bg-danger ms-2">Flagged</span>}
                    </td>
                    <td><strong>{tx.customerName}</strong></td>
                    <td><span className="badge bg-secondary">{tx.category}</span></td>
                    <td>{tx.merchant}</td>
                    <td className="small text-secondary">{formatDateTime(tx.timestamp)}</td>
                    <td className={`font-monospace font-bold ${tx.type === 'DEPOSIT' ? 'text-success' : 'text-white'}`}>
                      {tx.type === 'DEPOSIT' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                    <td>{getStatusBadge(tx.status)}</td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-secondary">
                      No matching transaction entries found in the ledger database registers.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BankingOperations;
