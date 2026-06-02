import React, { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import MetricCard from '../components/cards/MetricCard';
import RoadmapTimeline from '../components/roadmap/RoadmapTimeline';
import { platformApi } from '../services/api';
import { RoadmapItem, MigrationRisk, SuccessMetric } from '../types';

export const ModernizationRoadmap: React.FC = () => {
  const [timeline, setTimeline] = useState<RoadmapItem[]>([]);
  const [risks, setRisks] = useState<MigrationRisk[]>([]);
  const [metrics, setMetrics] = useState<SuccessMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
        const [tRes, rRes, mRes] = await Promise.all([
          platformApi.modernization.getRoadmapTimeline(),
          platformApi.modernization.getMigrationRisks(),
          platformApi.modernization.getSuccessMetrics()
        ]);
        
        setTimeline(tRes);
        setRisks(rRes);
        setMetrics(mRes);
      } catch (err) {
        console.error('Failed to load modernization roadmap', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmapData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-spinner fa-spin fa-2x text-indigo"></i>
        <p className="text-secondary mt-2">Connecting to modernization records database...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        breadcrumbs="COMMAND CENTER / PLATFORM MODERNIZATION"
        title="Frontend Modernization Roadmap"
        description="Verify legacy code retirement progress, target framework migrations schedules, and success validation telemetry."
      />

      {/* Highlights Metrics Row */}
      <div className="dashboard-kpi-row">
        <MetricCard 
          title="Overall Platform Modernization"
          value="74.5%"
          icon="fa-solid fa-percent"
          trend="2.4%"
          trendUp={true}
          theme="indigo"
        />
        <MetricCard 
          title="Active Migration Risks"
          value={risks.length}
          icon="fa-solid fa-shield-halved"
          theme="amber"
        />
        <MetricCard 
          title="Validation Metrics Passing"
          value="4 / 4"
          icon="fa-solid fa-square-check"
          theme="emerald"
        />
        <MetricCard 
          title="Est Legacy Retirement"
          value="Dec 2026"
          icon="fa-solid fa-calendar-days"
          theme="cyan"
        />
      </div>

      <div className="row g-4 mb-5">
        {/* Left Side: Quarterly Roadmap Timeline */}
        <div className="col-lg-5">
          <div className="card bg-dark text-light border-secondary">
            <div className="card-header border-secondary bg-secondary bg-opacity-25">
              <h5 className="mb-0 small"><i className="fa-solid fa-route me-2 text-indigo"></i>Quarterly Migration Timeline</h5>
            </div>
            <div className="card-body">
              <RoadmapTimeline items={timeline} />
            </div>
          </div>
        </div>

        {/* Right Side: Risk Catalog & Success Metrics */}
        <div className="col-lg-7">
          {/* Risks Catalog */}
          <div className="card bg-dark text-light border-secondary mb-4">
            <div className="card-header border-secondary bg-secondary bg-opacity-25">
              <h5 className="mb-0 small"><i className="fa-solid fa-shield-halved me-2 text-warning"></i>Active Modernization Risks</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive-wrapper">
                <table className="enterprise-table">
                  <thead>
                    <tr>
                      <th>Risk Title</th>
                      <th>Impact</th>
                      <th>Probability</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {risks.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <strong>{r.title}</strong>
                          <div className="secondary-text text-wrap" style={{ maxWidth: '280px' }}>{r.description}</div>
                        </td>
                        <td>
                          <span className={`severity-indicator ${r.impact.toLowerCase()}`}>{r.impact}</span>
                        </td>
                        <td>
                          <span className={`severity-indicator ${r.probability.toLowerCase()}`}>{r.probability}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${r.status === 'MITIGATED' ? 'success' : 'warning'}`}>
                            <span className="badge-dot"></span>{r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="card bg-dark text-light border-secondary">
            <div className="card-header border-secondary bg-secondary bg-opacity-25">
              <h5 className="mb-0 small"><i className="fa-solid fa-chart-line me-2 text-success"></i>Migration Success Metrics</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive-wrapper">
                <table className="enterprise-table">
                  <thead>
                    <tr>
                      <th>Validation Metric</th>
                      <th>Baseline</th>
                      <th>Target</th>
                      <th>Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map((m) => (
                      <tr key={m.id}>
                        <td>
                          <strong>{m.metricName}</strong>
                          <div className="secondary-text">Category: {m.category}</div>
                        </td>
                        <td className="font-monospace text-secondary">{m.baselineValue}</td>
                        <td className="font-monospace text-warning">{m.targetValue}</td>
                        <td className="font-monospace text-success font-bold">{m.currentValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModernizationRoadmap;
