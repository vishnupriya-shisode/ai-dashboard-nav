import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';

const navItems = [
  {
    id: 'home',
    label: 'Home',
    color: '#c4845a',
    icon: (isActive) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={isActive ? '#c4845a' : '#c0b8b0'}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12L12 3l9 9"/>
        <path d="M9 21V12h6v9"/>
        <path d="M3 21h18"/>
      </svg>
    ),
  },
  {
    id: 'chat',
    label: 'Chat',
    color: '#7a9e87',
    icon: (isActive) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={isActive ? '#7a9e87' : '#c0b8b0'}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'Stats',
    color: '#c4a455',
    icon: (isActive) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={isActive ? '#c4a455' : '#c0b8b0'}
        strokeWidth="1.8" strokeLinecap="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    color: '#9a7a8a',
    icon: (isActive) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={isActive ? '#9a7a8a' : '#c0b8b0'}
        strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

// real LLM brand colors
const models = [
  {
    id: 'claude',
    label: 'Claude',
    color: '#CC785C',
    bg: '#FAE8DC',
    textColor: '#7D3A1F',
    // anthropic inspired icon
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
        <circle cx="20" cy="20" r="20" fill="#CC785C"/>
        <path d="M14 28l6-16 6 16M16.5 22h7" stroke="white"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'gpt',
    label: 'GPT-4',
    color: '#10A37F',
    bg: '#D9F5EC',
    textColor: '#065f46',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
        <circle cx="20" cy="20" r="20" fill="#10A37F"/>
        <path d="M20 10a10 10 0 0 1 7.07 17.07M20 10a10 10 0 0 0-7.07 17.07M20 10v4M20 26v4M12.93 12.93l2.83 2.83M24.24 24.24l2.83 2.83M10 20h4M26 20h4M12.93 27.07l2.83-2.83M24.24 15.76l2.83-2.83"
          stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'gemini',
    label: 'Gemini',
    color: '#4285F4',
    bg: '#E3EFFE',
    textColor: '#1a3a7a',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
        <circle cx="20" cy="20" r="20" fill="#4285F4"/>
        <path d="M20 8c0 6.627-5.373 12-12 12 6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"
          fill="white"/>
      </svg>
    ),
  },
  {
    id: 'copilot',
    label: 'Copilot',
    color: '#0078D4',
    bg: '#DCEFFE',
    textColor: '#003f7a',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
        <circle cx="20" cy="20" r="20" fill="#0078D4"/>
        <path d="M13 20c0-3.866 3.134-7 7-7s7 3.134 7 7M13 20c0 3.866 3.134 7 7 7M13 20h-3M27 20h3M20 27v3"
          stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="3" fill="white"/>
      </svg>
    ),
  },
];

function NavBar({ active, setActive, selectedModel, setSelectedModel }) {
  const [showModels, setShowModels] = useState(false);
  const navRef = useRef(null);

  // close model selector when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowModels(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleNavClick(id) {
    if (id === 'chat') {
      setActive('chat');
      setShowModels(true);
    } else {
      setActive(id);
      setShowModels(false);
      setSelectedModel(null);
    }
  }

  function handleModelClick(modelId) {
    setSelectedModel(modelId);
    setShowModels(false);
  }

  // back button closes chat and goes back to home
  function handleBack() {
    setShowModels(false);
  }

  return (
    <div className="navbar-wrapper" ref={navRef}>
      <div className="navbar">

        {/* DEFAULT NAV */}
        <div className={`nav-state default ${showModels ? 'hidden' : ''}`}>
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={{ '--active-color': item.color }}
                onClick={() => handleNavClick(item.id)}
              >
                <span className="nav-icon">{item.icon(isActive)}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* MODEL SELECT */}
        <div className={`nav-state models ${showModels ? 'visible' : ''}`}>

          {/* back arrow */}
          <button className="model-back" onClick={handleBack}>
            <svg viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            <span className="model-back-label">Back</span>
          </button>

          {models.map((model) => {
            const isSelected = selectedModel === model.id;
            return (
              <button
                key={model.id}
                className={`model-item ${isSelected ? 'selected' : ''}`}
                style={{ '--model-color': model.color }}
                onClick={() => handleModelClick(model.id)}
              >
                <div
                  className="model-avatar"
                  style={{ background: model.bg }}
                >
                  {model.icon}
                </div>
                <span className="model-label">{model.label}</span>
              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default NavBar;