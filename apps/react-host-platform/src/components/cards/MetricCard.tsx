import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  theme?: 'indigo' | 'cyan' | 'emerald' | 'amber' | 'rose';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendUp = true,
  theme = 'indigo'
}) => {
  return (
    <div className={`kpi-card ${theme}`}>
      <div className="kpi-header">
        <span>{title}</span>
        <i className={`${icon} kpi-icon ${theme}`}></i>
      </div>
      <div className="kpi-value">{value}</div>
      {trend && (
        <div className="kpi-footer">
          <span className={`trend-indicator ${trendUp ? 'up' : 'down'}`}>
            <i className={trendUp ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down'}></i>
            {' '}{trend}
          </span>
          <span>vs last month</span>
        </div>
      )}
    </div>
  );
};
export default MetricCard;
