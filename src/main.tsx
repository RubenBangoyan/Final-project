import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { StrictMode } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
