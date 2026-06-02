import React from 'react';
import { RoadmapItem } from '../../types';

interface RoadmapTimelineProps {
  items: RoadmapItem[];
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ items }) => {
  const getStatusClass = (status: string) => {
    if (status === 'COMPLETED') return 'completed';
    if (status === 'IN_PROGRESS') return 'in_progress';
    return '';
  };

  const getFrameworkBadge = (framework: string) => {
    if (framework === 'REACT') return 'bg-info text-dark';
    if (framework === 'ANGULAR') return 'bg-danger';
    if (framework === 'VUE') return 'bg-success';
    return 'bg-secondary';
  };

  return (
    <div className="modernization-timeline">
      {items.map((item) => (
        <div key={item.id} className="timeline-item">
          <div className={`timeline-badge ${getStatusClass(item.status)}`}></div>
          <div className="timeline-content p-3 bg-secondary bg-opacity-25 rounded border border-secondary border-opacity-50">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-dark font-monospace text-warning">{item.quarter}</span>
              <span className={`badge ${getFrameworkBadge(item.targetFramework)}`}>
                {item.targetFramework}
              </span>
            </div>
            <h5 className="text-white mb-2">{item.title}</h5>
            <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary border-opacity-50 small">
              <span className="text-secondary">
                Status: <strong className={item.status === 'COMPLETED' ? 'text-success' : item.status === 'IN_PROGRESS' ? 'text-cyan' : 'text-secondary'}>{item.status}</strong>
              </span>
              {item.dependencies.length > 0 && (
                <span className="text-secondary">
                  Depends: <code>{item.dependencies.join(', ')}</code>
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default RoadmapTimeline;
