
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'

// Create root without wrapping App in StrictMode again (since it's already in App.tsx)
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
