import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App';
import { DashboardProvider } from './context/DashboardContext';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <DashboardProvider>
      <App />
    </DashboardProvider>
  </React.StrictMode>
);
