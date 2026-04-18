import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import ChatScreen from './components/ChatScreen';

const modelColors = {
  claude:  '#fdf0e8',
  gpt:     '#eaf7f0',
  gemini:  '#eef0fc',
  copilot: '#e8f2fc',
};

const navColors = {
  home:      '#f5f0eb',
  analytics: '#f5f2e8',
  settings:  '#f0edf2',
};

function App() {
  const [active, setActive] = useState('home');
  const [selectedModel, setSelectedModel] = useState(null);

  const bgColor =
    selectedModel ? modelColors[selectedModel]
    : active === 'chat' ? '#f5f0eb'
    : navColors[active] || '#f5f0eb';

  return (
    <div className="page">
      <div className="phone-frame">

        <div className="dynamic-island" />

        <div className="status-bar" style={{ background: bgColor }}>
          <span className="status-time">9:41</span>
          <div className="status-icons">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="#1c1c1e">
              <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.3"/>
              <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" opacity="0.6"/>
              <rect x="9" y="0" width="3" height="12" rx="1"/>
              <rect x="13.5" y="1" width="2.5" height="10" rx="1"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 24 24"
              fill="none" stroke="#1c1c1e" strokeWidth="2.5">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
              <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
              <circle cx="12" cy="20" r="1.5" fill="#1c1c1e" stroke="none"/>
            </svg>
            <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
              <rect x="0.5" y="0.5" width="22" height="12"
                rx="3.5" stroke="#1c1c1e" strokeOpacity="0.35"/>
              <rect x="2" y="2" width="17" height="9" rx="2" fill="#1c1c1e"/>
              <path d="M24.5 4.5v4a2.5 2.5 0 0 0 0-4z"
                fill="#1c1c1e" fillOpacity="0.4"/>
            </svg>
          </div>
        </div>

        <div
          className="app-screen"
          style={{ backgroundColor: bgColor }}
        >
          {active === 'chat' && selectedModel !== null ? (
            <ChatScreen model={selectedModel} />
          ) : (
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

        <NavBar
          active={active}
          setActive={setActive}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        <div className="home-indicator" style={{ background: bgColor }}>
          <div className="home-indicator-bar" />
        </div>

      </div>
    </div>
  );
}

export default App;