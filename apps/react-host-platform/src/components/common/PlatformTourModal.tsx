import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PlatformTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGuestMode?: () => void;
}

export const PlatformTourModal: React.FC<PlatformTourModalProps> = ({
  isOpen,
  onClose,
  onStartGuestMode
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const tourSteps = [
    {
      title: "The Modernization Problem",
      badge: "BUSINESS VISION",
      icon: "fa-solid fa-lightbulb",
      description: "Large financial enterprises often suffer from fragmented internal systems. Legacy admin portals, telemetry dashboards, and client verification logs exist as isolated silos across different technologies.",
      highlight: "This platform unifies legacy silos into a single, high-performance executive dashboard, showing how companies migrate monolithic interfaces to modern architectures without disruption.",
      color: "#6366f1"
    },
    {
      title: "The Federated Tech Engine",
      badge: "ARCHITECTURE STACK",
      icon: "fa-solid fa-network-wired",
      description: "Under the hood, this unified portal hosts and communicates with four distinct frontend technologies, simulating a state-of-the-art micro-frontend federation:",
      bullets: [
        { tech: "React.js Host", desc: "Coordinates user sessions, routing, state management, and executive KPIs." },
        { tech: "Angular Standalone", desc: "Runs client setup portals, IBAN verification rules, and robust guard patterns." },
        { tech: "Vue.js Telemetry", desc: "Monitors live transaction settlements and currency exchange pings." },
        { tech: "Legacy jQuery", desc: "Simulates legacy support desks and ticketing adapters running concurrently." }
      ],
      highlight: "All 4 technologies run in harmony, showcasing senior-level engineering capabilities in system federation, shared SCSS tokens, and TypeScript validation rules.",
      color: "#06b6d4"
    },
    {
      title: "Fast-Track Guest Exploration",
      badge: "GET STARTED INSTANTLY",
      icon: "fa-solid fa-bolt",
      description: "We created a direct pipeline so you don't need to sign up or enter credentials to inspect our features. Tap 'Explore as Guest' to immediately access all active screens.",
      highlight: "In less than 10 seconds, you can review high-frequency charts, modern customer profiles, micro-frontend status controls, and the modernization timeline roadmap.",
      color: "#10b981"
    }
  ];

  const handleNext = () => {
    if (activeStep < tourSteps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleComplete = () => {
    onClose();
    if (onStartGuestMode) {
      onStartGuestMode();
    } else {
      // Default fallback
      const mockSession = {
        id: 'usr-guest',
        username: 'guest_explorer',
        name: 'Guest Reviewer',
        role: 'PORTFOLIO_VISITOR',
        token: 'guest-bypass-token'
      };
      localStorage.setItem('host_session', JSON.stringify(mockSession));
      navigate('/dashboard');
    }
  };

  const step = tourSteps[activeStep];

  return (
    <div className="modal-backdrop d-flex align-items-center justify-content-center" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(3, 3, 3, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 2000,
      padding: '1.5rem'
    }}>
      <div className="card bg-secondary text-light border border-secondary shadow-2xl overflow-hidden" style={{
        maxWidth: '650px',
        width: '100%',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08) !important',
        boxShadow: '0 0 50px rgba(99, 102, 241, 0.15)',
        position: 'relative'
      }}>
        {/* Glow Header */}
        <div style={{
          height: '6px',
          width: '100%',
          background: `linear-gradient(90deg, #6366f1, ${step.color}, #10b981)`
        }} />

        {/* Close button */}
        <button 
          onClick={onClose}
          className="btn-close btn-close-white position-absolute" 
          style={{ top: '1.5rem', right: '1.5rem', zIndex: 10, fontSize: '0.85rem', opacity: 0.6 }}
          aria-label="Close"
        />

        <div className="p-4 p-md-5">
          {/* Badge & Step indicator */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <span className="badge font-monospace text-uppercase" style={{
              background: `rgba(${activeStep === 0 ? '99, 102, 241' : activeStep === 1 ? '6, 182, 212' : '16, 185, 129'}, 0.12)`,
              color: step.color,
              border: `1px solid rgba(${activeStep === 0 ? '99, 102, 241' : activeStep === 1 ? '6, 182, 212' : '16, 185, 129'}, 0.25)`,
              letterSpacing: '1px',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.35rem 0.75rem',
              borderRadius: '6px'
            }}>
              <i className={`${step.icon} me-1.5`}></i> {step.badge}
            </span>
            <span className="font-monospace text-tertiary" style={{ fontSize: '0.8rem' }}>
              STEP {activeStep + 1} OF {tourSteps.length}
            </span>
          </div>

          {/* Carousel Slide Title */}
          <h2 className="text-white font-weight-extrabold mb-3 h3" style={{ letterSpacing: '-0.5px', fontWeight: 800 }}>
            {step.title}
          </h2>

          {/* Slide Description */}
          <p className="text-secondary mb-4" style={{ fontSize: '0.98rem', lineHeight: '1.6' }}>
            {step.description}
          </p>

          {/* Custom bullets for federated tech list */}
          {step.bullets && (
            <div className="mb-4 bg-dark bg-opacity-40 p-3 rounded" style={{
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.03)'
            }}>
              <div className="row g-3">
                {step.bullets.map((b, i) => (
                  <div key={i} className="col-12 col-md-6">
                    <div className="d-flex align-items-start gap-2">
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: i === 0 ? '#6366f1' : i === 1 ? '#61dafb' : i === 2 ? '#42b883' : '#0769ad',
                        marginTop: '7px',
                        flexShrink: 0
                      }} />
                      <div>
                        <strong className="text-white" style={{ fontSize: '0.85rem' }}>{b.tech}:</strong>
                        <p className="text-tertiary mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{b.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Callout box for Highlight */}
          <div className="p-3 mb-4 rounded-3 text-secondary" style={{
            background: 'rgba(255,255,255, 0.02)',
            borderLeft: `3px solid ${step.color}`,
            fontSize: '0.88rem',
            lineHeight: '1.5'
          }}>
            {step.highlight}
          </div>

          {/* Indicators & Actions Row */}
          <div className="d-flex align-items-center justify-content-between mt-5 pt-3 border-top border-secondary border-opacity-10">
            {/* Progress Dots */}
            <div className="d-flex gap-2">
              {tourSteps.map((_, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    width: idx === activeStep ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: idx === activeStep ? step.color : 'rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            {/* Nav Buttons */}
            <div className="d-flex gap-2">
              {activeStep > 0 && (
                <button 
                  onClick={handlePrev} 
                  className="btn btn-secondary px-3"
                  style={{ fontSize: '0.85rem' }}
                >
                  Back
                </button>
              )}
              
              <button 
                onClick={handleNext}
                className="btn btn-primary px-4"
                style={{
                  background: activeStep === tourSteps.length - 1 ? '#10b981' : step.color,
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  boxShadow: activeStep === tourSteps.length - 1 
                    ? '0 0 15px rgba(16, 185, 129, 0.3)' 
                    : `0 0 15px rgba(${activeStep === 0 ? '99, 102, 241' : '6, 182, 212'}, 0.3)`
                }}
              >
                {activeStep === tourSteps.length - 1 ? (
                  <>Explore Platform <i className="fa-solid fa-arrow-right ms-1"></i></>
                ) : (
                  <>Next Step <i className="fa-solid fa-chevron-right ms-1"></i></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlatformTourModal;
