import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import PlatformTourModal from '../common/PlatformTourModal';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onOpenTour={() => setTourOpen(true)}
      />
      
      <div className="main-content">
        <TopNav 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          onOpenTour={() => setTourOpen(true)}
        />
        <main className="page-container">
          {children}
        </main>
      </div>

      <PlatformTourModal 
        isOpen={tourOpen} 
        onClose={() => setTourOpen(false)} 
      />
    </div>
  );
};
export default AppShell;
