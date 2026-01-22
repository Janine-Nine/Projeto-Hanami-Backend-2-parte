import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/style.css';


const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // fallback: mount directly to body
  const fallback = document.createElement('div');
  document.body.appendChild(fallback);
  ReactDOM.createRoot(fallback).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}