import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlatformTourModal from '../components/common/PlatformTourModal';

export const LandingPage: React.FC = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    const mockSession = {
      id: 'usr-guest',
      username: 'guest_explorer',
      name: 'Guest Reviewer',
      role: 'PORTFOLIO_VISITOR',
      token: 'guest-bypass-token'
    };

    localStorage.setItem('host_session', JSON.stringify(mockSession));
    navigate('/dashboard');
  };

  return (
    <div className="bg-primary min-vh-100 text-light d-flex flex-column justify-content-between" style={{ overflow: 'hidden' }}>
      {/* Sleek Top Navigation */}
      <nav className="landing-nav" style={{ backgroundColor: '#06070a', borderBottom: '1px solid rgba(255,255,255,0.05)', height: '70px' }}>
        <div className="logo-container">
          <div className="logo-icon" style={{ background: '#6366f1', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', color: 'white' }}>F</div>
          <span className="logo-text" style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.3px', color: 'white' }}>FlowShift Console</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button 
            onClick={() => setIsTourOpen(true)}
            className="btn btn-link text-secondary text-decoration-none small px-3 d-none d-sm-inline-block font-monospace"
            style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}
          >
            <i className="fa-solid fa-circle-play me-1.5 text-indigo" style={{ color: '#6366f1' }}></i> Tour
          </button>
          <button onClick={handleGuestLogin} className="btn btn-outline-secondary btn-sm px-3 text-secondary border-secondary-subtle" style={{ fontSize: '0.82rem', borderRadius: '8px' }}>
            Guest Login
          </button>
          <Link to="/login" className="btn btn-primary btn-sm px-3" style={{ background: '#6366f1', border: 'none', fontSize: '0.82rem', borderRadius: '8px', fontWeight: 600 }}>
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Content Section */}
      <main className="container flex-grow-1 d-flex align-items-center" style={{ paddingTop: '8.5rem', paddingBottom: '4rem' }}>
        <div className="row w-100 align-items-center g-5">
          {/* Text Presentation Column */}
          <div className="col-12 col-lg-6 text-start">
            <span className="badge bg-secondary border border-secondary bg-opacity-20 px-3 py-2 text-secondary mb-4 font-monospace" style={{ fontSize: '0.72rem', letterSpacing: '0.8px', borderColor: 'rgba(255, 255, 255, 0.08) !important', color: '#a5b4fc !important' }}>
              ✨ SENIOR PORTFOLIO: ENTERPRISE SYSTEM INTEGRATION
            </span>
            <h1 className="display-4 font-weight-extrabold text-white mb-3" style={{ fontWeight: 850, letterSpacing: '-1.8px', fontSize: '2.8rem', lineHeight: '1.15' }}>
              Enterprise Modernization <br /> Operations Platform
            </h1>
            <p className="lead text-secondary mb-4" style={{ fontSize: '1rem', lineHeight: '1.6', color: '#94a3b8 !important', maxWidth: '520px' }}>
              Simulates a production-grade legacy-to-modern interface conversion. Monitors banking operations, customers, transactions, alerts, and federated components from one clean Vercel-style console.
            </p>

            {/* Quick Pitch list */}
            <div className="mb-4 text-secondary">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="fa-solid fa-circle-check text-indigo" style={{ color: '#6366f1', fontSize: '0.9rem' }}></i>
                <span className="small text-secondary">4 Frontend frameworks running in unified harmony (React, Vue, Angular, jQuery)</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="fa-solid fa-circle-check text-cyan" style={{ color: '#06b6d4', fontSize: '0.9rem' }}></i>
                <span className="small text-secondary">Stripe-style dashboard aesthetics focusing on micro-interaction readability</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-circle-check text-success" style={{ color: '#10b981', fontSize: '0.9rem' }}></i>
                <span className="small text-secondary">10-second instant Recruiter fast-track bypass with Guest Mode</span>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <button 
                onClick={handleGuestLogin} 
                className="btn btn-primary px-4 py-2.5 font-weight-bold d-flex align-items-center gap-2" 
                style={{ background: '#6366f1', border: 'none', fontSize: '0.9rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)' }}
              >
                <i className="fa-solid fa-bolt text-warning"></i>
                Explore as Guest (Fast Track)
              </button>
              
              <button 
                onClick={() => setIsTourOpen(true)}
                className="btn btn-outline-secondary px-4 py-2.5 d-flex align-items-center gap-2 text-secondary"
                style={{ fontSize: '0.9rem', borderRadius: '8px', borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
              >
                <i className="fa-solid fa-circle-play text-indigo" style={{ color: '#6366f1' }}></i>
                How It Works / Tour
              </button>
            </div>
          </div>

          {/* 3D Isometric Stack Visual Column */}
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center mt-5 mt-lg-0">
            <div className="perspective-container position-relative" style={{ width: '100%', maxWidth: '440px', height: '400px' }}>
              {/* React Host Card - Top */}
              <div className="isometric-card position-absolute w-100 p-3 rounded shadow-2xl bg-secondary border border-secondary" style={{
                top: '0px',
                zIndex: 4,
                borderLeft: '4px solid #6366f1 !important',
                background: 'rgba(12, 13, 18, 0.95)'
              }}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
                    <span className="font-monospace text-white small" style={{ fontSize: '0.72rem', letterSpacing: '0.5px' }}>REACT.JS HOST CORE</span>
                  </div>
                  <span className="badge bg-indigo-subtle text-indigo font-monospace" style={{ color: '#a5b4fc', background: 'rgba(99, 102, 241, 0.1)', fontSize: '0.62rem' }}>ACTIVE ROUTER</span>
                </div>
                <h6 className="text-white font-weight-bold mb-1" style={{ fontSize: '0.88rem' }}>Executive Dashboard Console</h6>
                <p className="text-tertiary mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>Directs authentication, navigations, centralized user state, and compiles global telemetry.</p>
              </div>

              {/* Angular Card - Second */}
              <div className="isometric-card position-absolute w-100 p-3 rounded shadow-xl bg-secondary border border-secondary" style={{
                top: '85px',
                zIndex: 3,
                borderLeft: '4px solid #dd0031 !important',
                opacity: 0.9,
                transform: 'rotateY(-18deg) rotateX(12deg) rotateZ(2deg) translateZ(-40px)',
                background: 'rgba(12, 13, 18, 0.95)'
              }}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dd0031' }} />
                    <span className="font-monospace text-white small" style={{ fontSize: '0.72rem', letterSpacing: '0.5px' }}>ANGULAR STANDALONE</span>
                  </div>
                  <span className="badge bg-danger-subtle text-danger font-monospace" style={{ color: '#fca5a5', background: 'rgba(239, 68, 68, 0.1)', fontSize: '0.62rem' }}>SECURE CONTAINER</span>
                </div>
                <h6 className="text-white font-weight-bold mb-1" style={{ fontSize: '0.88rem' }}>Clinical Care Operations</h6>
                <p className="text-tertiary mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>Implements patient charts cohort explorer, TypeScript interfaces, and debounced reactive search queries.</p>
              </div>

              {/* Vue Card - Third */}
              <div className="isometric-card position-absolute w-100 p-3 rounded shadow-lg bg-secondary border border-secondary" style={{
                top: '170px',
                zIndex: 2,
                borderLeft: '4px solid #42b883 !important',
                opacity: 0.85,
                transform: 'rotateY(-18deg) rotateX(12deg) rotateZ(2deg) translateZ(-80px)',
                background: 'rgba(12, 13, 18, 0.95)'
              }}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#42b883' }} />
                    <span className="font-monospace text-white small" style={{ fontSize: '0.72rem', letterSpacing: '0.5px' }}>VUE.JS TELEMETRY</span>
                  </div>
                  <span className="badge bg-success-subtle text-success font-monospace" style={{ color: '#86efac', background: 'rgba(16, 185, 129, 0.1)', fontSize: '0.62rem' }}>INCIDENT DETECTOR</span>
                </div>
                <h6 className="text-white font-weight-bold mb-1" style={{ fontSize: '0.88rem' }}>Cloud SRE Ops Telemetry</h6>
                <p className="text-tertiary mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>Renders high-frequency Node grid structures and incident ticket trackers using reactive components.</p>
              </div>

              {/* jQuery Card - Bottom */}
              <div className="isometric-card position-absolute w-100 p-3 rounded shadow-md bg-secondary border border-secondary" style={{
                top: '255px',
                zIndex: 1,
                borderLeft: '4px solid #0769ad !important',
                opacity: 0.75,
                transform: 'rotateY(-18deg) rotateX(12deg) rotateZ(2deg) translateZ(-120px)',
                background: 'rgba(12, 13, 18, 0.95)'
              }}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0769ad' }} />
                    <span className="font-monospace text-white small" style={{ fontSize: '0.72rem', letterSpacing: '0.5px' }}>LEGACY JQUERY ADAPTER</span>
                  </div>
                  <span className="badge bg-info-subtle text-info font-monospace" style={{ color: '#93c5fd', background: 'rgba(59, 130, 246, 0.1)', fontSize: '0.62rem' }}>DEPRECATION QUEUE</span>
                </div>
                <h6 className="text-white font-weight-bold mb-1" style={{ fontSize: '0.88rem' }}>Legacy Customer Support Desk</h6>
                <p className="text-tertiary mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>Binds raw legacy DOM endpoints via AJAX proxy adapters to secure legacy enterprise tickets.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Visual Indicator Overview Footer */}
      <footer className="py-4 text-center border-top border-secondary border-opacity-10 text-secondary" style={{ fontSize: '0.78rem' }}>
        <span>Powered by FlowShift Systems © 2026. All rights secured.</span>
      </footer>

      {/* Interactive Platform Tour Modal */}
      <PlatformTourModal 
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onStartGuestMode={handleGuestLogin}
      />
    </div>
  );
};
export default LandingPage;
