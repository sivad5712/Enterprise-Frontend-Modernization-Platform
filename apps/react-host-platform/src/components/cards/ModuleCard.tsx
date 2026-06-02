import React from 'react';
import { Link } from 'react-router-dom';

interface ModuleCardProps {
  title: string;
  framework: string;
  icon: string;
  description: string;
  bundleSize: string;
  modernizationState: number; // percentage
  techClass: 'react' | 'angular' | 'vue' | 'jquery';
  launchPath: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  framework,
  icon,
  description,
  bundleSize,
  modernizationState,
  techClass,
  launchPath
}) => {
  return (
    <div className="module-card">
      <span className={`badge bg-${techClass === 'angular' ? 'danger' : techClass === 'vue' ? 'success' : techClass === 'react' ? 'info' : 'warning text-dark'} module-badge`}>
        {framework}
      </span>
      
      <div className={`module-icon-wrapper ${techClass}`}>
        <i className={icon}></i>
      </div>
      
      <h3 className="module-title">{title}</h3>
      <p className="module-description">{description}</p>
      
      <div className="w-100 border-top border-secondary pt-3 mb-3 text-start small">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">BUNDLE SIZE:</span>
          <strong className="text-white font-monospace">{bundleSize}</strong>
        </div>
        <div>
          <div className="d-flex justify-content-between text-secondary mb-1">
            <span>MODERNIZATION:</span>
            <strong className="text-white font-monospace">{modernizationState}%</strong>
          </div>
          <div className="progress bg-secondary bg-opacity-25" style={{ height: '4px' }}>
            <div 
              className={`progress-bar bg-${techClass === 'angular' ? 'danger' : techClass === 'vue' ? 'success' : techClass === 'react' ? 'info' : 'warning'}`}
              style={{ width: `${modernizationState}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <Link to={launchPath} className="btn btn-sm btn-primary w-100">
        <i className="fa-solid fa-rocket me-1"></i> Launch Simulator
      </Link>
    </div>
  );
};
export default ModuleCard;
