import React, { useState, useRef } from 'react';

interface VideoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoTourModal: React.FC<VideoTourModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  const milestones = [
    { time: "0:00", title: "Micro-Frontend System Architecture", desc: "React.js Host Core orchestrating three separate sub-applications seamlessly in a single workspace." },
    { time: "0:12", title: "Angular 17 Clinical Cohort", desc: "Demonstrates high-fidelity Angular functional guards, debounced RxJS searches, and clean static models." },
    { time: "0:25", title: "Vue.js Cloud SRE Monitoring Grid", desc: "Live SRE nodes visual grids tracking server responses, pings, and incident resolution status." },
    { time: "0:38", title: "Legacy jQuery AJAX Ticket Adapter", desc: "Bridge pattern adapter converting legacy DOM calls and legacy tickets into modern React state variables." },
    { time: "0:50", title: "Global Design Tokens & CSS3 Sass", desc: "Shared variables, high-contrast text accessibility overrides, and floating 3D perspective cards." }
  ];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const jumpToTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="modal-backdrop d-flex align-items-center justify-content-center" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(3, 3, 3, 0.9)',
      backdropFilter: 'blur(16px)',
      zIndex: 2100,
      padding: '1.5rem'
    }}>
      <div className="card bg-secondary text-light border border-secondary shadow-2xl overflow-hidden" style={{
        maxWidth: '920px',
        width: '100%',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08) !important',
        boxShadow: '0 0 60px rgba(99, 102, 241, 0.2)',
        position: 'relative'
      }}>
        {/* Glow accent */}
        <div style={{ height: '6px', width: '100%', background: 'linear-gradient(90deg, #6366f1, #06b6d4, #10b981)' }} />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="btn-close btn-close-white position-absolute" 
          style={{ top: '1.5rem', right: '1.5rem', zIndex: 10, fontSize: '0.85rem', opacity: 0.6 }}
          aria-label="Close"
        />

        <div className="p-4 p-md-5">
          <div className="d-flex align-items-center gap-2 mb-4">
            <span className="badge bg-indigo-subtle text-indigo font-monospace" style={{
              color: '#a5b4fc',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.35rem 0.75rem',
              borderRadius: '6px'
            }}>
              <i className="fa-solid fa-video me-1.5"></i> PORTFOLIO VIDEO WALKTHROUGH
            </span>
            <h3 className="text-white font-weight-extrabold m-0 h4" style={{ letterSpacing: '-0.5px' }}>Platform Video Guide</h3>
          </div>

          <div className="row g-4">
            {/* Left side: Futuristic Video Player Container */}
            <div className="col-12 col-lg-7">
              <div className="position-relative overflow-hidden rounded-4 bg-black border border-secondary border-opacity-35 shadow-lg animate-fade-in" style={{
                height: '340px',
                width: '100%',
                border: '1px solid rgba(99, 102, 241, 0.2) !important'
              }}>
                <iframe
                  className="w-100 h-100"
                  src="https://www.youtube.com/embed/y881t8ilMyc?autoplay=1&mute=1&loop=1&playlist=y881t8ilMyc&controls=1&showinfo=0&rel=0"
                  title="Platform Video Walkthrough"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              </div>
            </div>

            {/* Right side: Recruiter Milestones Guide */}
            <div className="col-12 col-lg-5 d-flex flex-column justify-content-between">
              <div>
                <h5 className="text-white font-weight-bold mb-3" style={{ fontSize: '0.9rem', letterSpacing: '-0.2px' }}>
                  Recruiter Walkthrough Timestamps
                </h5>
                <p className="text-secondary small mb-4" style={{ lineHeight: '1.4' }}>
                  Click on any milestone below to simulate jumping straight to that technical implementation inside our video stream guide.
                </p>

                <div className="d-flex flex-column gap-3 overflow-y-auto pr-1" style={{ maxHeight: '250px' }}>
                  {milestones.map((m, idx) => {
                    const seconds = idx === 0 ? 0 : idx === 1 ? 12 : idx === 2 ? 25 : idx === 3 ? 38 : 50;
                    return (
                      <div 
                        key={idx}
                        onClick={() => jumpToTime(seconds)}
                        className="p-2.5 rounded-3 bg-dark bg-opacity-40 border border-secondary border-opacity-10 d-flex gap-3 align-items-start cursor-pointer transition-all hover:bg-opacity-80"
                        style={{
                          cursor: 'pointer',
                          background: 'rgba(255, 255, 255, 0.01)',
                          border: '1px solid rgba(255,255,255,0.03)'
                        }}
                      >
                        <span className="badge font-monospace text-indigo" style={{
                          color: '#a5b4fc',
                          background: 'rgba(99, 102, 241, 0.1)',
                          fontSize: '0.68rem',
                          padding: '0.2rem 0.4rem',
                          flexShrink: 0
                        }}>
                          {m.time}
                        </span>
                        <div>
                          <strong className="text-white small d-block mb-1">{m.title}</strong>
                          <span className="text-tertiary" style={{ fontSize: '0.72rem', lineHeight: '1.3', display: 'block' }}>{m.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-top border-secondary border-opacity-10 mt-3 d-flex justify-content-end">
                <button onClick={onClose} className="btn btn-secondary btn-sm px-4" style={{ borderRadius: '6px', fontSize: '0.8rem' }}>
                  Dismiss Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoTourModal;
