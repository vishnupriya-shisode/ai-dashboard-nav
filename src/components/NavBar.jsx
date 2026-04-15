// useState to track which icon is hovered
// we get active and setActive from App.jsx as props
import React, { useState } from 'react';
import './NavBar.css';

// each nav item as an object
// color = the earth tone for that section
// label = text under icon when active
const navItems = [
  {
    id: 'home',
    label: 'Home',
    color: '#c4845a',
    // house icon - simple svg drawn by hand
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={active ? '#c4845a' : '#b0a89e'}
        strokeWidth="1.8" strokeLinecap="round">
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
    // chat bubble icon for the AI assistant
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none"
        stroke={active ? '#7a9e87' : '#b0a89e'}
        strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'Analytics',
    color: '#c4a455',
    // bar chart icon for analytics
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
    // gear icon for settings
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

// NavBar gets active and setActive from App.jsx
// active = which one is selected
// setActive = function to change which one is selected
function NavBar({ active, setActive }) {

  return (
    <nav className="navbar">

      {/* loop through each nav item and render it */}
      {navItems.map((item) => {

        // is this item the currently active one?
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}

            // CSS variable so the ::before circle knows what color to use
            // this is how we pass dynamic colors into CSS pseudo elements
            style={{ '--active-color': item.color }}

            // when clicked update which item is active in App.jsx
            onClick={() => setActive(item.id)}
          >
            {/* render the svg icon, passing isActive so it knows what color */}
            <span className="nav-icon">
              {item.icon(isActive)}
            </span>

            {/* label fades in when active via css */}
            <span className="nav-label">{item.label}</span>

            {/* tiny dot below the navbar */}
            <span className="nav-dot" />

          </button>
        );
      })}

    </nav>
  );
}

export default NavBar;