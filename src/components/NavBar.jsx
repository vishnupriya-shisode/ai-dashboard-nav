import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';

const navItems = [
  {
    id: 'home',
    label: 'Home',
    color: '#c4845a',
    icon: (isActive, light) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={isActive ? '#c4845a' : light ? 'rgba(50,40,30,0.35)' : 'rgba(255,255,255,0.35)'}
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
    icon: (isActive, light) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={isActive ? '#7a9e87' : light ? 'rgba(50,40,30,0.35)' : 'rgba(255,255,255,0.35)'}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'Stats',
    color: '#c4a455',
    icon: (isActive, light) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={isActive ? '#c4a455' : light ? 'rgba(50,40,30,0.35)' : 'rgba(255,255,255,0.35)'}
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
    icon: (isActive, light) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={isActive ? '#9a7a8a' : light ? 'rgba(50,40,30,0.35)' : 'rgba(255,255,255,0.35)'}
        strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

/* ── LLM icons live here ──
   each model has a hand-drawn SVG icon
   these are simplified but recognisable versions
   of each brand's actual logo style            */
const models = [
  {
    id: 'claude',
    label: 'Claude',
    color: '#CC785C',
    bg: '#2d1a0e',
    bgLight: '#FAE8DC',
    // anthropic A shape
    icon: (
      <svg viewBox="0 0 36 36" width="22" height="22" fill="none">
        <rect width="36" height="36" rx="10" fill="#CC785C"/>
        <path
          d="M12 26l6-16 6 16M14.5 21h7"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'gpt',
    label: 'GPT-4',
    color: '#10A37F',
    bg: '#0a1f18',
    bgLight: '#D9F5EC',
    // openai spinning flower shape
    icon: (
      <svg viewBox="0 0 36 36" width="22" height="22" fill="none">
        <rect width="36" height="36" rx="10" fill="#10A37F"/>
        <path
          d="M18 9a9 9 0 0 1 6.364 15.364M18 9a9 9 0 0 0-6.364 15.364M18 9v3M18 24v3M9 18h3M24 18h3M11.636 11.636l2.121 2.121M22.243 22.243l2.121 2.121M11.636 24.364l2.121-2.121M22.243 13.757l2.121-2.121"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="18" cy="18" r="2.5" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'gemini',
    label: 'Gemini',
    color: '#4285F4',
    bg: '#0a1020',
    bgLight: '#E3EFFE',
    // google gemini star shape
    icon: (
      <svg viewBox="0 0 36 36" width="22" height="22" fill="none">
        <rect width="36" height="36" rx="10" fill="#4285F4"/>
        <path
          d="M18 7c0 6.075-4.925 11-11 11 6.075 0 11 4.925 11 11 0-6.075 4.925-11 11-11-6.075 0-11-4.925-11-11z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    id: 'copilot',
    label: 'Copilot',
    color: '#0078D4',
    bg: '#091520',
    bgLight: '#DCEFFE',
    // microsoft copilot shape
    icon: (
      <svg viewBox="0 0 36 36" width="22" height="22" fill="none">
        <rect width="36" height="36" rx="10" fill="#0078D4"/>
        <circle cx="18" cy="15" r="4" fill="white"/>
        <path
          d="M11 27c0-3.866 3.134-7 7-7s7 3.134 7 7"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 18h3M25 18h3"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function NavBar({ active, setActive, selectedModel, setSelectedModel, lightMode }) {
  const [showModels, setShowModels] = useState(false);
  const navRef = useRef(null);

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

  // selecting a model just highlights it
  // does NOT close the selector
  // only Back button closes it
  function handleModelClick(modelId) {
    setSelectedModel(modelId);
  }

  function handleBack() {
    setShowModels(false);
    setActive('home');
    setSelectedModel(null);
  }

  return (
    <div className="navbar-wrapper" ref={navRef}>
      <div className={`navbar ${lightMode ? 'light' : ''}`}>

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
                <span className="nav-icon">
                  {item.icon(isActive, lightMode)}
                </span>
                <span className={`nav-label ${lightMode ? 'light-label' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* MODEL SELECT */}
        <div className={`nav-state models ${showModels ? 'visible' : ''}`}>

          <button
            className={`model-back ${lightMode ? 'light' : ''}`}
            onClick={handleBack}
          >
            <svg viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
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
                  style={{
                    background: lightMode ? model.bgLight : model.bg,
                  }}
                >
                  {model.icon}
                </div>
                <span className={`model-label ${lightMode ? 'light' : ''}`}>
                  {model.label}
                </span>
              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default NavBar;