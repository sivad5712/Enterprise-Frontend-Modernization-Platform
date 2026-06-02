import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import MetricCard from '../components/cards/MetricCard';
import PlatformTourModal from '../components/common/PlatformTourModal';
import { platformApi } from '../services/api';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/formatters';

const transactionTrends = [
  { name: '08:00', volume: 42000 },
  { name: '10:00', volume: 85000 },
  { name: '12:00', volume: 145000 },
  { name: '14:00', volume: 92000 },
  { name: '16:00', volume: 110000 }
];

interface FrameworkState {
  id: string;
  name: string;
  version: string;
  status: 'active' | 'connected' | 'reconnecting' | 'offline' | 'legacy';
  statusText: string;
  memory: string;
  latency: string;
  icon: string;
  themeColor: string;
  path: string | null;
  role: string;
}

interface AuditLog {
  timestamp: string;
  system: string;
  event: string;
  type: 'success' | 'warning' | 'info' | 'danger';
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [bankingMetrics, setBankingMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDashboardTourOpen, setIsDashboardTourOpen] = useState(false);

  // Federated Control States (Extended Capabilities)
  const [encryptionMode, setEncryptionMode] = useState(false);
  const [stressLevel, setStressLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [samplingRate, setSamplingRate] = useState(3);

  // Stateful Micro-Frontend Telemetry
  const [frameworks, setFrameworks] = useState<FrameworkState[]>([
    {
      id: "react",
      name: "React.js Host Core",
      version: "v18.2.0",
      status: "active",
      statusText: "PRIMARY INSTANCE",
      memory: "14.2 MB",
      latency: "1.2 ms",
      icon: "fa-brands fa-react",
      themeColor: "#6366f1",
      path: null,
      role: "Global Router, State Core & Styling Orchestrator"
    },
    {
      id: "angular",
      name: "Angular Accounts Portal",
      version: "v17.1.0",
      status: "connected",
      statusText: "ONLINE",
      memory: "21.8 MB",
      latency: "4.8 ms",
      icon: "fa-brands fa-angular",
      themeColor: "#ef4444",
      path: "/healthcare",
      role: "Customer onboarding, account setups & validation routing"
    },
    {
      id: "vue",
      name: "Vue.js Transaction Monitor",
      version: "v3.4.0",
      status: "connected",
      statusText: "SYNCING",
      memory: "11.5 MB",
      latency: "2.4 ms",
      icon: "fa-brands fa-vuejs",
      themeColor: "#10b981",
      path: "/cloud-ops",
      role: "Real-time payment volumes and system performance tracking"
    },
    {
      id: "jquery",
      name: "Legacy jQuery Admin",
      version: "v3.7.1",
      status: "legacy",
      statusText: "BRIDGED ADAPTER",
      memory: "5.3 MB",
      latency: "12.5 ms",
      icon: "fa-solid fa-code-merge",
      themeColor: "#3b82f6",
      path: "/legacy-admin",
      role: "Deprecated legacy CRM DOM operations & tickets adapter"
    }
  ]);

  // Dynamic Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { timestamp: "12:04:12", system: "VUE_MFE_BRIDGE", event: "Transaction telemetry synchronized. All processing hubs reported healthy.", type: "success" },
    { timestamp: "12:02:45", system: "ANGULAR_MFE", event: "Secure account routing filter successfully debounced via RxJS (300ms delay).", type: "info" },
    { timestamp: "12:00:30", system: "LEGACY_JQUERY", event: "Bypassed 14 outdated DOM event listeners, routing legacy logs to React host state.", type: "warning" },
    { timestamp: "11:58:15", system: "PLATFORM_CORE", event: "Alex Mercer authorized successfully. Session JWT token parsed in 1.4ms.", type: "success" }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await platformApi.banking.getBankingMetrics();
        setBankingMetrics(res);
      } catch (err) {
        console.error('Failed to load metrics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle MFE Gateway Simulation Reset
  const handleResetGateway = (id: string, name: string) => {
    setFrameworks(prev => prev.map(fw => {
      if (fw.id === id) {
        return {
          ...fw,
          status: 'reconnecting',
          statusText: 'RESETTING GATEWAY...',
          latency: '...',
          memory: '...'
        };
      }
      return fw;
    }));

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const disconnectLog: AuditLog = {
      timestamp: timeStr,
      system: `${id.toUpperCase()}_MFE_BRIDGE`,
      event: `Simulated manual reset request triggered on ${name}. Closing old sockets...`,
      type: 'warning'
    };
    setAuditLogs(prev => [disconnectLog, ...prev]);

    setTimeout(() => {
      const refreshedLatencyVal = (Math.random() * 6 + (stressLevel === 'high' ? 18 : stressLevel === 'medium' ? 8 : 1)).toFixed(1);
      const refreshedLatency = encryptionMode ? `0x${Math.floor(Math.random() * 65535).toString(16).toUpperCase()} (AES)` : `${refreshedLatencyVal} ms`;
      const refreshedMemory = (Math.random() * 10 + (stressLevel === 'high' ? 38 : stressLevel === 'medium' ? 24 : 12)).toFixed(1) + " MB";

      setFrameworks(prev => prev.map(fw => {
        if (fw.id === id) {
          const originalStatus = id === 'react' ? 'active' : id === 'jquery' ? 'legacy' : 'connected';
          const originalText = id === 'react' ? 'PRIMARY INSTANCE' : id === 'jquery' ? 'BRIDGED ADAPTER' : 'ONLINE';
          return {
            ...fw,
            status: originalStatus as any,
            statusText: originalText,
            latency: refreshedLatency,
            memory: refreshedMemory
          };
        }
        return fw;
      }));

      const reconnectLog: AuditLog = {
        timestamp: new Date().toTimeString().split(' ')[0],
        system: `${id.toUpperCase()}_MFE_BRIDGE`,
        event: `Handshake established. Federated sockets synchronized (Ping: ${refreshedLatency}, Load: ${refreshedMemory}).`,
        type: 'success'
      };
      setAuditLogs(prev => [reconnectLog, ...prev]);
    }, 1500);
  };

  // Force Synchronize All Modules
  const handleForceSync = () => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    
    setFrameworks(prev => prev.map(fw => ({
      ...fw,
      status: 'reconnecting',
      statusText: 'SYNCING DATA...',
      latency: '...',
      memory: '...'
    })));

    const syncLog: AuditLog = {
      timestamp: timeStr,
      system: 'GATEWAY_ORCHESTRATOR',
      event: 'Triggered global diagnostic synchronization check across all federated sub-modules.',
      type: 'info'
    };
    setAuditLogs(prev => [syncLog, ...prev]);

    setTimeout(() => {
      setFrameworks(prev => prev.map(fw => {
        const refreshedLatencyVal = (Math.random() * 7 + (stressLevel === 'high' ? 18 : stressLevel === 'medium' ? 8 : 1)).toFixed(1);
        const refreshedLatency = encryptionMode ? `0x${Math.floor(Math.random() * 65535).toString(16).toUpperCase()} (AES)` : `${refreshedLatencyVal} ms`;
        const refreshedMemory = (Math.random() * 10 + (stressLevel === 'high' ? 38 : stressLevel === 'medium' ? 24 : 12)).toFixed(1) + " MB";
        const originalStatus = fw.id === 'react' ? 'active' : fw.id === 'jquery' ? 'legacy' : 'connected';
        const originalText = fw.id === 'react' ? 'PRIMARY INSTANCE' : fw.id === 'jquery' ? 'BRIDGED ADAPTER' : 'ONLINE';

        return {
          ...fw,
          status: originalStatus as any,
          statusText: originalText,
          latency: refreshedLatency,
          memory: refreshedMemory
        };
      }));

      const syncSuccessLog: AuditLog = {
        timestamp: new Date().toTimeString().split(' ')[0],
        system: 'GATEWAY_ORCHESTRATOR',
        event: 'Global system check successfully verified. 4 modules report synchronized cache structures.',
        type: 'success'
      };
      setAuditLogs(prev => [syncSuccessLog, ...prev]);
    }, 1200);
  };

  // Toggle Payload Encryption Mode (Extended Capability)
  const handleToggleEncryption = () => {
    const nextMode = !encryptionMode;
    setEncryptionMode(nextMode);
    
    const timeStr = new Date().toTimeString().split(' ')[0];
    const encLog: AuditLog = {
      timestamp: timeStr,
      system: 'SECURITY_GATEWAY',
      event: nextMode 
        ? "Cryptographic payload encryption ENABLED. Encrypting MFE bridge packets via AES-256."
        : "Cryptographic payload encryption DISABLED. Sending telemetry packets in plain-text.",
      type: nextMode ? 'success' : 'warning'
    };
    setAuditLogs(prev => [encLog, ...prev]);

    // Instantly translate pings
    setFrameworks(prev => prev.map(fw => {
      if (fw.status === 'reconnecting') return fw;
      
      if (nextMode) {
        return {
          ...fw,
          latency: `0x${Math.floor(Math.random() * 65535).toString(16).toUpperCase()} (AES)`
        };
      } else {
        const standardLat = fw.id === 'react' ? '1.2 ms' : fw.id === 'angular' ? '4.8 ms' : fw.id === 'vue' ? '2.4 ms' : '12.5 ms';
        return {
          ...fw,
          latency: standardLat
        };
      }
    }));
  };

  // Handle Environmental Stress Testing (Extended Capability)
  const handleStressChange = (level: 'low' | 'medium' | 'high') => {
    setStressLevel(level);
    const timeStr = new Date().toTimeString().split(' ')[0];

    let stressLog: AuditLog;
    if (level === 'low') {
      stressLog = {
        timestamp: timeStr,
        system: 'LOAD_BALANCER',
        event: "Simulated load adjusted to LOW. Standard SLA pings active. All systems reporting healthy status.",
        type: 'success'
      };
    } else if (level === 'medium') {
      stressLog = {
        timestamp: timeStr,
        system: 'LOAD_BALANCER',
        event: "Simulated load adjusted to MEDIUM. Pings and memory cache loads scaled. 6 new warning alerts generated.",
        type: 'warning'
      };
    } else {
      stressLog = {
        timestamp: timeStr,
        system: 'LOAD_BALANCER',
        event: "CRITICAL: Simulated load adjusted to HIGH. Spiking MFE memory footprints. CPU core alert limits exceeded!",
        type: 'danger'
      };
    }
    setAuditLogs(prev => [stressLog, ...prev]);

    // Dynamically adjust framework parameters based on load stress
    setFrameworks(prev => prev.map(fw => {
      if (fw.status === 'reconnecting') return fw;
      
      const multiplier = level === 'high' ? 5 : level === 'medium' ? 2.2 : 1;
      const originalMemoryNum = fw.id === 'react' ? 14.2 : fw.id === 'angular' ? 21.8 : fw.id === 'vue' ? 11.5 : 5.3;
      const nextMemory = (originalMemoryNum * (level === 'high' ? 2.5 : level === 'medium' ? 1.5 : 1)).toFixed(1) + " MB";

      if (encryptionMode) {
        return {
          ...fw,
          memory: nextMemory
        };
      } else {
        const originalLatencyNum = fw.id === 'react' ? 1.2 : fw.id === 'angular' ? 4.8 : fw.id === 'vue' ? 2.4 : 12.5;
        const nextLatency = (originalLatencyNum * multiplier).toFixed(1) + " ms";
        return {
          ...fw,
          memory: nextMemory,
          latency: nextLatency
        };
      }
    }));
  };

  return (
    <div>
      <PageHeader 
        breadcrumbs="COMMAND CENTER / OVERVIEW"
        title="Dashboard"
        description="Monitor customers, transactions, alerts, and operational performance from one place."
        action={
          <button 
            onClick={() => setIsDashboardTourOpen(true)}
            className="btn btn-primary d-flex align-items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.55rem 1.1rem',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
            }}
          >
            <i className="fa-solid fa-circle-info"></i>
            <span>How it Works</span>
          </button>
        }
      />

      {/* KPI Cards Row - dynamically updates Open Alerts based on stressLevel */}
      <div className="dashboard-kpi-row mb-5">
        <MetricCard 
          title="Total Customers"
          value="14,205"
          icon="fa-solid fa-users"
          theme="indigo"
        />
        <MetricCard 
          title="Active Accounts"
          value="18,450"
          icon="fa-solid fa-address-book"
          theme="cyan"
        />
        <MetricCard 
          title="Transactions Today"
          value={bankingMetrics ? formatCurrency(bankingMetrics.dailyTransactionVolume) : '$0'}
          icon="fa-solid fa-receipt"
          theme="emerald"
        />
        <MetricCard 
          title="Open Alerts"
          value={stressLevel === 'high' ? "23" : stressLevel === 'medium' ? "14" : "8"}
          icon="fa-solid fa-triangle-exclamation"
          theme={stressLevel === 'high' ? "rose" : stressLevel === 'medium' ? "amber" : "rose"}
        />
      </div>

      {/* Spaced Split Grid */}
      <div className="row g-5 mb-5">
        {/* Left Side: Gorgeous Recharts Area chart */}
        <div className="col-lg-8">
          <div className="chart-card mb-0 h-100 d-flex flex-column justify-content-between">
            <div className="chart-header">
              <h3 className="chart-title text-secondary uppercase font-monospace mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>TRANSACTION TRENDS (24H)</h3>
            </div>
            <div className="chart-container flex-grow-1" style={{ height: '280px', minHeight: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={transactionTrends}>
                  <defs>
                    <linearGradient id="colorTrends" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5b5df6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#5b5df6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#525262" tickLine={false} style={{ fontSize: '0.75rem' }} />
                  <YAxis stroke="#525262" tickLine={false} tickFormatter={(v) => `$${v/1000}K`} style={{ fontSize: '0.75rem' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#121215', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}
                    labelStyle={{ color: '#8e8e9f' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="volume" stroke="#5b5df6" strokeWidth={2} fillOpacity={1} fill="url(#colorTrends)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Side: Recent Activity & Alerts Overview */}
        <div className="col-lg-4 d-flex flex-column gap-4">
          {/* Recent Activity */}
          <div className="card bg-secondary text-light border-secondary p-4 h-50 d-flex flex-column justify-content-between" style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08) !important' }}>
            <h6 className="text-secondary small font-monospace mb-3" style={{ letterSpacing: '0.5px' }}>RECENT ACTIVITY</h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-3 small">
                <i className="fa-solid fa-circle-check text-success mt-1"></i>
                <div>
                  <span className="text-white">Transaction completed</span>
                  <div className="text-secondary mt-0.5" style={{ fontSize: '0.75rem' }}>$2,500 by Sarah Connor</div>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3 small">
                <i className="fa-solid fa-triangle-exclamation text-danger mt-1"></i>
                <div>
                  <span className="text-white">AI Fraud Threat flagged</span>
                  <div className="text-secondary mt-0.5" style={{ fontSize: '0.75rem' }}>$890,000 to Stark Logistics</div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Overview */}
          <div className="card bg-secondary text-light border-secondary p-4 h-50 d-flex flex-column justify-content-between" style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08) !important' }}>
            <h6 className="text-secondary small font-monospace mb-3" style={{ letterSpacing: '0.5px' }}>ALERTS OVERVIEW</h6>
            <div className="d-flex flex-column gap-2 small">
              <div className="d-flex justify-content-between">
                <span className="text-secondary">CRITICAL PRIORITY:</span>
                <strong className="text-danger font-monospace">{stressLevel === 'high' ? '6 Active' : stressLevel === 'medium' ? '3 Active' : '2 Active'}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-secondary">HIGH PRIORITY:</span>
                <strong className="text-warning font-monospace">{stressLevel === 'high' ? '12 Active' : stressLevel === 'medium' ? '7 Active' : '4 Active'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXTENDED CAPABILITY 1: Federated Gateway Config & Stress Testing Panel */}
      <section className="mb-5">
        <div className="card bg-secondary p-4" style={{
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.08) !important',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)'
        }}>
          <h5 className="text-white font-weight-extrabold mb-1" style={{ letterSpacing: '-0.3px', fontSize: '1.05rem' }}>
            <i className="fa-solid fa-sliders text-indigo me-2" style={{ color: '#6366f1' }}></i>
            Federated Gateway Control & Stress testing
          </h5>
          <p className="text-secondary small mb-4">Recruiter Controls: Interact with our simulated environment configurations and view live responsive metrics changes above.</p>
          
          <div className="row g-4">
            {/* Telemetry and encryption control */}
            <div className="col-12 col-md-6 border-end border-secondary border-opacity-10 pr-md-4">
              <h6 className="text-white small font-monospace mb-3" style={{ letterSpacing: '0.5px' }}>GATEWAY CONFIGURATION</h6>
              
              <div className="form-group mb-4">
                <div className="d-flex justify-content-between mb-1.5">
                  <label className="text-secondary small font-bold">Telemetry Sampling Rate</label>
                  <span className="text-indigo font-monospace small" style={{ color: '#a5b4fc', fontWeight: 600 }}>Every {samplingRate}s</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={samplingRate} 
                  onChange={(e) => setSamplingRate(parseInt(e.target.value))}
                  className="w-100 accent-indigo"
                  style={{ accentColor: '#6366f1' }}
                />
              </div>

              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <strong className="text-white small d-block">Secure Payload Encryption</strong>
                  <span className="text-tertiary" style={{ fontSize: '0.72rem' }}>AES-256 secure hash envelope</span>
                </div>
                <div className="form-check form-switch m-0">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="encryptionSwitch"
                    checked={encryptionMode}
                    onChange={handleToggleEncryption}
                    style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                  />
                </div>
              </div>
            </div>

            {/* Environmental stress level buttons */}
            <div className="col-12 col-md-6 pl-md-4 mt-4 mt-md-0">
              <h6 className="text-white small font-monospace mb-3" style={{ letterSpacing: '0.5px' }}>LOAD SIMULATOR STRESS TEST</h6>
              <p className="text-secondary small mb-3">Adjust environmental loads to watch alerts metric cards, MFE memory capacities, and latency pings shift instantly.</p>
              
              <div className="d-flex gap-2">
                <button 
                  onClick={() => handleStressChange('low')}
                  className={`btn btn-sm flex-grow-1 py-2 font-weight-bold transition-all ${stressLevel === 'low' ? 'btn-success text-white' : 'btn-dark text-secondary'}`}
                  style={{
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    border: '1px solid rgba(255,255,255,0.04)',
                    boxShadow: stressLevel === 'low' ? '0 0 10px rgba(16, 185, 129, 0.2)' : 'none'
                  }}
                >
                  <i className="fa-solid fa-circle-check me-1.5"></i> Low Load
                </button>
                <button 
                  onClick={() => handleStressChange('medium')}
                  className={`btn btn-sm flex-grow-1 py-2 font-weight-bold transition-all ${stressLevel === 'medium' ? 'btn-warning text-dark' : 'btn-dark text-secondary'}`}
                  style={{
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    border: '1px solid rgba(255,255,255,0.04)',
                    boxShadow: stressLevel === 'medium' ? '0 0 10px rgba(245, 158, 11, 0.2)' : 'none'
                  }}
                >
                  <i className="fa-solid fa-triangle-exclamation me-1.5"></i> Medium
                </button>
                <button 
                  onClick={() => handleStressChange('high')}
                  className={`btn btn-sm flex-grow-1 py-2 font-weight-bold transition-all ${stressLevel === 'high' ? 'btn-danger text-white' : 'btn-dark text-secondary'}`}
                  style={{
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    border: '1px solid rgba(255,255,255,0.04)',
                    boxShadow: stressLevel === 'high' ? '0 0 10px rgba(239, 68, 68, 0.2)' : 'none'
                  }}
                >
                  <i className="fa-solid fa-fire me-1.5"></i> High Stress
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXTENDED CAPABILITY 2: Federated Micro-Frontend Operations Bridge */}
      <section className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h4 className="text-white font-weight-extrabold mb-1" style={{ letterSpacing: '-0.5px', fontSize: '1.25rem' }}>
              Federated Micro-Frontend Operations Bridge
            </h4>
            <p className="text-secondary small mb-0">Simulates real-time system pings, active memory loads. You can manually restart gateways to test fail-over structures.</p>
          </div>
          <button 
            onClick={handleForceSync}
            className="btn btn-sm btn-outline-indigo font-monospace text-indigo"
            style={{
              borderColor: 'rgba(99, 102, 241, 0.3)',
              background: 'rgba(99,102,241, 0.05)',
              fontSize: '0.72rem',
              borderRadius: '6px',
              padding: '0.4rem 0.8rem'
            }}
          >
            <i className="fa-solid fa-rotate me-1.5"></i> FORCE SYNC GATEWAYS
          </button>
        </div>

        <div className="row g-4">
          {frameworks.map((fw, idx) => (
            <div key={idx} className="col-12 col-md-6 col-xl-3">
              <div 
                className="card bg-secondary p-4 h-100 d-flex flex-column justify-content-between transition-all"
                style={{
                  borderRadius: '14px',
                  border: `1px solid rgba(255, 255, 255, 0.08) !important`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div>
                  {/* Framework Badge header */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span 
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: `rgba(${fw.themeColor === "#6366f1" ? '99,102,241' : fw.themeColor === "#ef4444" ? '239,68,68' : fw.themeColor === "#10b981" ? '16,185,129' : '59,130,246'}, 0.12)`,
                        color: fw.themeColor
                      }}
                    >
                      <i className={`${fw.icon} fa-lg`}></i>
                    </span>
                    <span className="badge font-monospace" style={{
                      fontSize: '0.65rem',
                      background: fw.status === "active" ? 'rgba(99, 102, 241, 0.1)' : fw.status === "reconnecting" ? 'rgba(245, 158, 11, 0.1)' : fw.status === "connected" ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                      color: fw.status === "active" ? '#a5b4fc' : fw.status === "reconnecting" ? '#fcd34d' : fw.status === "connected" ? '#86efac' : '#93c5fd',
                      border: `1px solid rgba(${fw.themeColor === "#6366f1" ? '99,102,241' : fw.themeColor === "#ef4444" ? '239,68,68' : fw.themeColor === "#10b981" ? '16,185,129' : '59,130,246'}, 0.2)`
                    }}>
                      {fw.statusText}
                    </span>
                  </div>

                  <h5 className="text-white font-weight-bold mb-1" style={{ fontSize: '0.98rem' }}>{fw.name}</h5>
                  <span className="font-monospace text-tertiary mb-3 d-block" style={{ fontSize: '0.72rem' }}>BUILD VERSION: {fw.version}</span>
                  <p className="text-secondary small mb-4" style={{ lineHeight: '1.4', fontSize: '0.8rem' }}>{fw.role}</p>
                </div>

                <div>
                  {/* Diagnostics Grid */}
                  <div className="row g-2 mb-4 bg-dark bg-opacity-30 p-2 rounded-3" style={{ border: '1px solid rgba(255, 255, 255, 0.02)' }}>
                    <div className="col-6">
                      <span className="text-tertiary font-monospace d-block" style={{ fontSize: '0.6rem', letterSpacing: '0.5px' }}>MEMORY LOAD</span>
                      <strong className="text-white font-monospace" style={{ fontSize: '0.78rem' }}>
                        {fw.status === 'reconnecting' ? (
                          <i className="fa-solid fa-circle-notch fa-spin text-warning"></i>
                        ) : fw.memory}
                      </strong>
                    </div>
                    <div className="col-6">
                      <span className="text-tertiary font-monospace d-block" style={{ fontSize: '0.6rem', letterSpacing: '0.5px' }}>BRIDGE LATENCY</span>
                      <strong className="text-white font-monospace" style={{ fontSize: '0.78rem' }}>
                        {fw.status === 'reconnecting' ? (
                          <i className="fa-solid fa-circle-notch fa-spin text-warning"></i>
                        ) : fw.latency}
                      </strong>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="d-flex flex-column gap-2">
                    {fw.path && (
                      <button 
                        onClick={() => navigate(fw.path!)}
                        className="btn btn-outline-secondary w-100 py-1.5 d-flex align-items-center justify-content-center gap-1.5 font-weight-bold"
                        style={{
                          fontSize: '0.76rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          background: 'rgba(255, 255, 255, 0.02)',
                          color: fw.themeColor
                        }}
                      >
                        <span>Launch Console</span>
                        <i className="fa-solid fa-arrow-up-right-from-square ms-1" style={{ fontSize: '0.65rem' }}></i>
                      </button>
                    )}

                    <button 
                      onClick={() => handleResetGateway(fw.id, fw.name)}
                      disabled={fw.status === 'reconnecting'}
                      className="btn btn-dark w-100 py-1.5 font-monospace"
                      style={{
                        fontSize: '0.68rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        background: 'rgba(255, 255, 255, 0.01)',
                        color: '#94a3b8'
                      }}
                    >
                      <i className="fa-solid fa-arrow-rotate-left me-1"></i> SIMULATE RESET
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXTENDED CAPABILITY 3: Monospace System Audit logs */}
      <section className="mb-5">
        <div className="card bg-secondary p-4" style={{
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.08) !important',
          boxShadow: '0 4px 30px rgba(0,0,0,0.4)'
        }}>
          <div className="d-flex align-items-center justify-content-between mb-3.5 border-bottom border-secondary border-opacity-10 pb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success" style={{ width: '8px', height: '8px', borderRadius: '50%', padding: 0 }} />
              <h5 className="text-white font-weight-extrabold mb-0" style={{ letterSpacing: '-0.3px', fontSize: '1.05rem' }}>
                System Modernization Audit Log
              </h5>
            </div>
            <button 
              onClick={() => setAuditLogs([])} 
              className="btn btn-link text-tertiary text-decoration-none small p-0 font-monospace"
              style={{ fontSize: '0.72rem' }}
            >
              <i className="fa-solid fa-trash-can me-1"></i> Clear Diagnostics
            </button>
          </div>

          {/* Monospace Code Log Screen */}
          <div 
            className="p-3 bg-black rounded-3 overflow-y-auto"
            style={{
              maxHeight: '200px',
              fontFamily: 'Fira Code, monospace',
              fontSize: '0.8rem',
              border: '1px solid rgba(255,255,255,0.03)'
            }}
          >
            {auditLogs.length === 0 ? (
              <div className="text-center text-tertiary py-4 font-monospace">
                [SYSTEM_IDLE]: Audit registries cleared. Run "Force Sync" or "Simulate Reset" to trigger diagnostics.
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                {auditLogs.map((log, idx) => (
                  <div key={idx} className="d-flex align-items-start gap-2.5 lh-sm">
                    <span className="text-tertiary" style={{ flexShrink: 0 }}>[{log.timestamp}]</span>
                    <span 
                      className="font-monospace fw-bold"
                      style={{
                        color: log.type === 'success' ? '#10b981' : log.type === 'warning' ? '#f59e0b' : log.type === 'danger' ? '#ef4444' : '#3b82f6',
                        flexShrink: 0,
                        fontSize: '0.75rem'
                      }}
                    >
                      [{log.system}]:
                    </span>
                    <span className="text-secondary" style={{ color: '#d1d5db !important' }}>{log.event}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* System Overview Tour Modal */}
      <PlatformTourModal 
        isOpen={isDashboardTourOpen}
        onClose={() => setIsDashboardTourOpen(false)}
      />
    </div>
  );
};
export default Dashboard;
