import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NavigationProvider } from './contexts/NavigationContext';
import { ScreenProvider } from './contexts/ScreenContext';
import './styles/design-system.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ScreenProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </ScreenProvider>
  </React.StrictMode>
); 