import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './firebase';
import AuthGate from './AuthGate';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthGate />
  </StrictMode>
);