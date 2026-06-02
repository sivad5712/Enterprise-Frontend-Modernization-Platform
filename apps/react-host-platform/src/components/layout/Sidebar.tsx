import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTour: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpenTour }) => {
  const sessionStr = localStorage.getItem('host_session');
  const user = sessionStr ? JSON.parse(sessionStr) : { name: 'Alex Mercer', role: 'OPERATIONS_MANAGER' };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon" style={{ background: '#6366f1', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', color: 'white' }}>F</div>
          <span className="logo-text">FlowShift</span>
        </div>
        <button className="btn-close btn-close-white d-md-none" onClick={onClose}></button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
          <i className="fa-solid fa-gauge"></i>
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/customers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
          <i className="fa-solid fa-users"></i>
          <span>Customers</span>
        </NavLink>

        <NavLink to="/transactions" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
          <i className="fa-solid fa-receipt"></i>
          <span>Transactions</span>
        </NavLink>

        <NavLink to="/alerts" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>Alerts</span>
        </NavLink>

        <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
          <i className="fa-solid fa-file-lines"></i>
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
          <i className="fa-solid fa-sliders"></i>
          <span>Settings</span>
        </NavLink>

        {/* Highlighted overview button directly inside sidebar */}
        <div className="mt-4 pt-3 border-top border-secondary border-opacity-10 d-flex flex-column gap-2">
          <button 
            onClick={() => { onOpenTour(); onClose(); }}
            className="nav-item border-0 w-100 text-start bg-transparent d-flex align-items-center gap-2 mb-0"
            style={{
              color: '#a5b4fc',
              background: 'rgba(99, 102, 241, 0.05)',
              borderRadius: '8px',
              padding: '0.65rem 0.9rem'
            }}
          >
            <i className="fa-solid fa-circle-info text-indigo" style={{ color: '#6366f1' }}></i>
            <span style={{ fontWeight: 650 }}>Platform Overview</span>
          </button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile-summary">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces" 
            alt="User avatar" 
            className="user-avatar"
          />
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-role font-monospace text-uppercase" style={{ fontSize: '0.6rem' }}>{user.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
