import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TopNavProps {
  onToggleSidebar: () => void;
  onOpenTour: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onToggleSidebar, onOpenTour }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('host_session');
    navigate('/login');
  };

  return (
    <nav className="top-nav">
      <div className="nav-left">
        <button className="sidebar-toggle btn btn-link text-white p-0" onClick={onToggleSidebar}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div className="nav-right gap-2">
        <div className="system-status-indicator d-none d-lg-flex me-2">
          <span className="indicator-dot"></span>
          <span className="font-monospace text-uppercase" style={{ fontSize: '0.72rem', fontWeight: 600 }}>PLATFORM CORE: SECURE</span>
        </div>

        {/* Global Architecture Overview launcher */}
        <button 
          className="btn btn-sm btn-outline-indigo text-indigo border-indigo-subtle d-flex align-items-center gap-2"
          onClick={onOpenTour}
          style={{
            borderColor: 'rgba(99, 102, 241, 0.35)',
            color: '#a5b4fc',
            background: 'rgba(99, 102, 241, 0.08)',
            fontSize: '0.8rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            fontWeight: 600
          }}
        >
          <i className="fa-solid fa-circle-info text-indigo" style={{ color: '#6366f1' }}></i>
          <span>System Overview</span>
        </button>

        <button 
          className="btn btn-sm btn-outline-secondary text-white border-secondary d-flex align-items-center gap-2 ms-1"
          onClick={handleLogout}
          style={{
            fontSize: '0.8rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px'
          }}
        >
          <i className="fa-solid fa-power-off"></i>
          <span>Log Out</span>
        </button>
      </div>
    </nav>
  );
};
export default TopNav;
