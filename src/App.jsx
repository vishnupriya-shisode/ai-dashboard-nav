import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import ChatScreen from './components/ChatScreen';

const modelColors = {
  claude:  '#2d1f14',
  gpt:     '#0f2318',
  gemini:  '#141830',
  copilot: '#0f1e30',
};

const navColors = {
  home:      '#1e140a',
  analytics: '#1a1510',
  settings:  '#180f18',
};

function App() {
  const [active, setActive]               = useState('home');
  const [selectedModel, setSelectedModel] = useState(null);
  const [lightMode, setLightMode]         = useState(false);

  const darkBg =
    selectedModel     ? modelColors[selectedModel]
    : active === 'chat' ? '#1e140a'
    : navColors[active] || '#1e140a';

  const lightBg =
    selectedModel === 'claude'  ? '#fdf0e8'
    : selectedModel === 'gpt'   ? '#eaf7f0'
    : selectedModel === 'gemini'? '#eef0fc'
    : selectedModel === 'copilot'? '#e8f2fc'
    : active === 'analytics'    ? '#f5f2e8'
    : active === 'settings'     ? '#f0edf2'
    : '#f5f0eb';

  const bgColor = lightMode ? lightBg : darkBg;

  const titleColor  = lightMode ? '#2a2520' : 'rgba(255,255,255,0.92)';
  const subColor    = lightMode ? '#8a8480' : 'rgba(255,255,255,0.4)';
  const timeColor   = lightMode ? '#2a2520' : 'rgba(255,255,255,0.9)';
  const iconColor   = lightMode ? '#2a2520' : 'rgba(255,255,255,0.9)';

  return (
    <div className="page">
      <div className="phone-frame">

        <div className="dynamic-island" />

        <div
          className="status-bar"
          style={{ backgroundColor: bgColor }}
        >
          <span className="status-time" style={{ color: timeColor }}>
            9:41
          </span>
          <div className="status-icons">
            <svg width="16" height="12" viewBox="0 0 17 12"
              fill={iconColor}>
              <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.4"/>
              <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" opacity="0.6"/>
              <rect x="9" y="0" width="3" height="12" rx="1"/>
              <rect x="13.5" y="1" width="2.5" height="10" rx="1"/>
            </svg>
            <svg width="15" height="12" viewBox="0 0 24 24"
              fill="none" stroke={iconColor} strokeWidth="2.5">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
              <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
              <circle cx="12" cy="20" r="1.5"
                fill={iconColor} stroke="none"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 27 13" fill="none">
              <rect x="0.5" y="0.5" width="22" height="12"
                rx="3.5" stroke={iconColor} strokeOpacity="0.4"/>
              <rect x="2" y="2" width="17" height="9"
                rx="2" fill={iconColor}/>
              <path d="M24.5 4.5v4a2.5 2.5 0 0 0 0-4z"
                fill={iconColor} opacity="0.5"/>
            </svg>
          </div>
        </div>

        <div
          className="app-screen"
          style={{ backgroundColor: bgColor }}
        >
          {/* liquid glass toggle top right */}
          <button
            className={`glass-toggle ${lightMode ? 'on' : ''}`}
            onClick={() => setLightMode(!lightMode)}
          >
            <div className="glass-toggle-knob">
              {lightMode ? (
                /* sun icon */
                <svg className="toggle-icon" viewBox="0 0 24 24"
                  fill="none" stroke="#c4845a" strokeWidth="2.5"
                  strokeLinecap="round">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2" x2="12" y2="4"/>
                  <line x1="12" y1="20" x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="2" y1="12" x2="4" y2="12"/>
                  <line x1="20" y1="12" x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                /* moon icon */
                <svg className="toggle-icon" viewBox="0 0 24 24"
                  fill="none" stroke="#8a7a6a" strokeWidth="2.5"
                  strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </div>
          </button>

          {active === 'chat' && selectedModel !== null ? (
            <ChatScreen model={selectedModel} lightMode={lightMode} />
          ) : (
            <div className="app-content">
              <h1 className="page-title" style={{ color: titleColor }}>
                {active === 'home'      && 'Dashboard'}
                {active === 'chat'      && 'AI Assistant'}
                {active === 'analytics' && 'Analytics'}
                {active === 'settings'  && 'Settings'}
              </h1>
              <p className="page-subtitle" style={{ color: subColor }}>
                {active === 'home'      && 'good morning, vishnupriya'}
                {active === 'chat'      && 'choose a model below'}
                {active === 'analytics' && 'your usage this week'}
                {active === 'settings'  && 'preferences and account'}
              </p>
            </div>
          )}
        </div>

        <div
          className="phone-bottom"
          style={{ backgroundColor: bgColor }}
        >
          <NavBar
            active={active}
            setActive={setActive}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            lightMode={lightMode}
          />
          <div className="home-indicator-bar" />
        </div>

      </div>
    </div>
  );
}

export default App;