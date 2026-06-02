import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlatformTourModal from '../components/common/PlatformTourModal';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('chief_admin');
  const [password, setPassword] = useState('admin123');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isTourOpen, setIsTourOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!username || !password) return;

    if (username === 'chief_admin' && password === 'admin123') {
      const mockSession = {
        id: 'usr-001',
        username: 'chief_admin',
        name: 'Alex Mercer',
        role: 'OPERATIONS_MANAGER',
        token: 'mock-jwt-super-admin-token-xyz'
      };

      localStorage.setItem('host_session', JSON.stringify(mockSession));
      navigate('/dashboard');
    } else {
      setError('Unauthorized credentials.');
    }
  };

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
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-primary px-3 flex-column">
      {/* Onboarding Guide Trigger */}
      <div className="mb-4 text-center">
        <button 
          onClick={() => setIsTourOpen(true)}
          className="btn btn-sm btn-outline-secondary px-3 py-2 text-secondary font-monospace"
          style={{
            borderRadius: '20px',
            borderColor: 'rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.02)',
            letterSpacing: '0.5px',
            fontSize: '0.78rem'
          }}
        >
          <i className="fa-solid fa-circle-info me-2 text-indigo" style={{ color: '#6366f1' }}></i>
          New here? Explore Platform Tour
        </button>
      </div>

      <div className="card bg-secondary text-light border-secondary p-4 shadow-lg" style={{ maxWidth: '390px', width: '100%', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08) !important' }}>
        <div className="text-center mb-4">
          <div className="logo-icon bg-indigo mx-auto mb-3" style={{ width: '36px', height: '36px', background: '#5b5df6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem', lineHeight: '36px' }}>F</div>
          <h4 className="text-white font-weight-extrabold mb-1" style={{ letterSpacing: '-0.5px' }}>Sign In</h4>
          <p className="text-secondary small">Access the FinTransit Operations Platform</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 px-3 small border-danger-subtle mb-3" role="alert">
            <i className="fa-solid fa-triangle-exclamation me-1"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group mb-3">
            <label className="text-secondary small font-monospace mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>USERNAME</label>
            <input 
              type="text" 
              className={`form-control text-white border-secondary ${submitted && !username ? 'is-invalid' : ''}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. chief_admin"
              style={{ padding: '0.6rem 0.8rem', fontSize: '0.9rem' }}
            />
            {submitted && !username && (
              <div className="invalid-feedback">Username is required.</div>
            )}
          </div>

          <div className="form-group mb-4">
            <label className="text-secondary small font-monospace mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>PASSWORD</label>
            <input 
              type="password" 
              className={`form-control text-white border-secondary ${submitted && !password ? 'is-invalid' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ padding: '0.6rem 0.8rem', fontSize: '0.9rem' }}
            />
            {submitted && !password && (
              <div className="invalid-feedback">Password is required.</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2.5 font-weight-bold mb-3" style={{ background: '#5b5df6', border: 'none', borderRadius: '8px', fontSize: '0.9rem' }}>
            Open Dashboard
          </button>
        </form>

        <div className="position-relative text-center my-3">
          <hr className="border-secondary opacity-20" />
          <span className="position-absolute top-50 start-50 translate-middle px-3 bg-secondary text-tertiary small font-monospace" style={{ fontSize: '0.68rem', letterSpacing: '0.5px' }}>OR</span>
        </div>

        {/* Guest Mode Direct Bypass Action */}
        <button 
          onClick={handleGuestLogin}
          className="btn btn-outline-primary w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
          style={{
            borderColor: 'rgba(99, 102, 241, 0.4)',
            color: '#a5b4fc',
            background: 'rgba(99, 102, 241, 0.04)',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <i className="fa-solid fa-bolt text-warning"></i>
          Explore as Guest (Fast Track)
        </button>
      </div>

      {/* Embedded Onboarding Tour Modal */}
      <PlatformTourModal 
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onStartGuestMode={handleGuestLogin}
      />
    </div>
  );
};
export default Login;
