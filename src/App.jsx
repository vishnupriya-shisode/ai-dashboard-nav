// react and useState - we need multiple states now
import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';

// each AI model has its own soft background color
// these are muted so they dont hurt ur eyes lol
const modelColors = {
  claude: '#f5ede6',
  gpt: '#e8f2e8',
  gemini: '#e8eaf5',
  copilot: '#e6eef5',
};

// each nav section also has its own bg color
// for when ur on home analytics or settings
const navColors = {
  home: '#f5f0eb',
  analytics: '#f5f2e8',
  settings: '#f0edf2',
};

function App() {
  // which main nav item is active - starts on home
  const [active, setActive] = useState('home');

  // which AI model is selected - starts as null (none selected)
  const [selectedModel, setSelectedModel] = useState(null);

  // figure out what background to show
  // if a model is selected use model color
  // if on chat but no model yet use a neutral warm color
  // otherwise use the nav section color
  const bgColor =
    selectedModel ? modelColors[selectedModel]
    : active === 'chat' ? '#f2ede8'
    : navColors[active] || '#f5f0eb';

  return (
    <div
      className="app"
      style={{ backgroundColor: bgColor }}
    >
      <div className="app-content">

        {/* title changes based on whats active */}
        <h1 className="page-title">
          {active === 'home' && 'Dashboard'}
          {active === 'chat' && !selectedModel && 'AI Assistant'}
          {active === 'chat' && selectedModel === 'claude' && 'Claude'}
          {active === 'chat' && selectedModel === 'gpt' && 'ChatGPT'}
          {active === 'chat' && selectedModel === 'gemini' && 'Gemini'}
          {active === 'chat' && selectedModel === 'copilot' && 'Copilot'}
          {active === 'analytics' && 'Analytics'}
          {active === 'settings' && 'Settings'}
        </h1>

        {/* subtitle also changes */}
        <p className="page-subtitle">
          {active === 'home' && 'good morning, vishnupriya'}
          {active === 'chat' && !selectedModel && 'choose a model to start'}
          {active === 'chat' && selectedModel && 'ready when you are'}
          {active === 'analytics' && 'your usage this week'}
          {active === 'settings' && 'preferences and account'}
        </p>

        {/* show selected model badge if one is chosen */}
        {active === 'chat' && selectedModel && (
          <div className="model-badge">
            <span
              className="model-dot"
              style={{ background: modelDotColors[selectedModel] }}
            />
            {selectedModel.charAt(0).toUpperCase() + selectedModel.slice(1)}
          </div>
        )}

      </div>

      {/* pass everything navbar needs as props */}
      <NavBar
        active={active}
        setActive={setActive}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />

    </div>
  );
}

// dot colors for the model badge - slightly darker than bg
const modelDotColors = {
  claude: '#e07a3a',
  gpt: '#4a9e5c',
  gemini: '#5c6bc0',
  copilot: '#3a7ec4',
};

export default App;