import React, { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { platformApi } from '../services/api';
import { BankingReport } from '../types';
import { formatDateTime } from '../utils/formatters';

export const Reports: React.FC = () => {
  const [reports, setReports] = useState<BankingReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await platformApi.banking.getReports();
        setReports(res);
      } catch (err) {
        console.error('Failed to load reports', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const triggerDownload = (id: string, title: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      alert(`Download simulated successfully for report: "${title}"`);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-spinner fa-spin fa-2x text-indigo"></i>
        <p className="text-secondary mt-2">Loading reports...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        breadcrumbs="COMMAND CENTER / REPORTS"
        title="Audit Reports"
        description="Access and download generated transaction ledgers, security audits, and risk assessment files."
      />

      <div className="card bg-secondary text-light border-secondary shadow-lg">
        <div className="card-body p-0">
          <div className="table-responsive-wrapper">
            <table className="enterprise-table mb-0">
              <thead>
                <tr>
                  <th>Report Title</th>
                  <th>Date Generated</th>
                  <th>Format</th>
                  <th>Weight</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((rep) => (
                  <tr key={rep.id}>
                    <td>
                      <strong>{rep.title}</strong>
                      <div className="secondary-text text-secondary small" style={{ fontSize: '0.75rem' }}>ID: {rep.id}</div>
                    </td>
                    <td className="small text-secondary">{formatDateTime(rep.generatedAt)}</td>
                    <td><span className="badge bg-dark border border-secondary text-secondary">{rep.format}</span></td>
                    <td className="font-monospace small text-secondary">{rep.size}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-secondary px-3 py-1.5"
                        onClick={() => triggerDownload(rep.id, rep.title)}
                        disabled={downloading !== null}
                      >
                        <i className={downloading === rep.id ? "fa-solid fa-spinner fa-spin me-1" : "fa-solid fa-cloud-arrow-down me-1"}></i>
                        {downloading === rep.id ? 'Securing...' : 'Download'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reports;
