import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import ChatScreen from './components/ChatScreen';

const modelColors = {
  claude:  '#f5ede6',
  gpt:     '#e8f2e8',
  gemini:  '#e8eaf5',
  copilot: '#e6eef5',
};

const navColors = {
  home:      '#f5f0eb',
  analytics: '#f5f2e8',
  settings:  '#f0edf2',
};

function App() {
  const [active, setActive]               = useState('home');
  const [selectedModel, setSelectedModel] = useState(null);

  const bgColor =
    selectedModel     ? modelColors[selectedModel]
    : active === 'chat' ? '#f2ede8'
    : navColors[active] || '#f5f0eb';

  return (
    // outer page centers the phone frame
    <div className="page">
      {/* iphone 17 pro frame */}
      <div className="phone-frame">

        {/* status bar - fake but looks real */}
        <div className="status-bar">
          <span className="status-time">9:41</span>
          <div className="status-icons">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="#3a3530">
              <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4"/>
              <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6"/>
              <rect x="9" y="0" width="3" height="12" rx="1"/>
              <rect x="13.5" y="1" width="2" height="10" rx="1"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 24 24" fill="none"
              stroke="#3a3530" strokeWidth="2">
              <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0"/>
              <circle cx="12" cy="20" r="1" fill="#3a3530"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5"
                stroke="#3a3530" strokeOpacity="0.35"/>
              <rect x="2" y="2" width="16" height="8" rx="2" fill="#3a3530"/>
              <path d="M23 4v4a2 2 0 0 0 0-4z" fill="#3a3530" fillOpacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* dynamic notch */}
        <div className="dynamic-island" />

        {/* main app content area */}
        <div
          className="app-screen"
          style={{ backgroundColor: bgColor }}
        >
          {/* if chat and model selected show chat screen */}
          {active === 'chat' && selectedModel ? (
            <ChatScreen model={selectedModel} />
          ) : (
            // otherwise show the page content
            <div className="app-content">
              <h1 className="page-title">
                {active === 'home'      && 'Dashboard'}
                {active === 'chat'      && 'AI Assistant'}
                {active === 'analytics' && 'Analytics'}
                {active === 'settings'  && 'Settings'}
              </h1>
              <p className="page-subtitle">
                {active === 'home'      && 'good morning, vishnupriya'}
                {active === 'chat'      && 'choose a model below'}
                {active === 'analytics' && 'your usage this week'}
                {active === 'settings'  && 'preferences and account'}
              </p>
            </div>
          )}
        </div>

        {/* navbar always at bottom */}
        <NavBar
          active={active}
          setActive={setActive}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        {/* home indicator line */}
        <div className="home-indicator" />

      </div>
    </div>
  );
}

export default App;