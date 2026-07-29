import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { enableDevToolsProtection } from './security/devToolsProtection';
import './styles/global.scss';

enableDevToolsProtection();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
