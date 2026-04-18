// useState for tracking if model select is open
import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';

// main nav items - same as before
const navItems = [
  {
    id: 'home',
    label: 'Home',
    color: '#c4845a',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={active ? '#c4845a' : '#b0a89e'}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12L12 3l9 9"/>
        <path d="M9 21V12h6v9"/>
        <path d="M3 12v9h18V12"/>
      </svg>
    ),
  },
  {
    id: 'chat',
    label: 'Chat',
    color: '#7a9e87',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={active ? '#7a9e87' : '#b0a89e'}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'Stats',
    color: '#c4a455',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={active ? '#c4a455' : '#b0a89e'}
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
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={active ? '#9a7a8a' : '#b0a89e'}
        strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

// the 4 AI models with their colors and initials
const models = [
  { id: 'claude', label: 'Claude', initial: 'C', color: '#e07a3a', bg: '#fde8d8' },
  { id: 'gpt', label: 'GPT', initial: 'G', color: '#4a9e5c', bg: '#d8f0de' },
  { id: 'gemini', label: 'Gemini', initial: 'Ge', color: '#5c6bc0', bg: '#dde0f5' },
  { id: 'copilot', label: 'Pilot', initial: 'Co', color: '#3a7ec4', bg: '#d8eaf5' },
];

function NavBar({ active, setActive, selectedModel, setSelectedModel }) {

  // tracks if we are showing the model selector or the normal nav
  const [showModels, setShowModels] = useState(false);

  // ref so we can detect clicks outside the navbar
  const navRef = useRef(null);

  // listen for clicks outside the navbar
  // if user clicks outside and models are showing - close them
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowModels(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    // cleanup when component unmounts - important!!
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // when a nav item is clicked
  function handleNavClick(id) {
    if (id === 'chat') {
      // chat is special - it opens model selector
      setActive('chat');
      setShowModels(true);
    } else {
      // everything else just switches the page
      setActive(id);
      setShowModels(false);
    }
  }

  // when a model is selected
  function handleModelClick(modelId) {
    setSelectedModel(modelId);
    // close model selector after picking
    setShowModels(false);
  }

  return (
    <nav className="navbar" ref={navRef}>

      {/* ── DEFAULT NAV STATE ── */}
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
              <span className="nav-dot" />
            </button>
          );
        })}
      </div>

      {/* ── MODEL SELECT STATE ── */}
      <div className={`nav-state models ${showModels ? 'visible' : ''}`}>
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
                style={{ background: model.bg, color: model.color }}
              >
                {model.initial}
              </div>
              <span className="model-label">{model.label}</span>
            </button>
          );
        })}
      </div>

    </nav>
  );
}

export default NavBar;