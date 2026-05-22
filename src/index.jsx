import React from 'react';
import { createRoot } from 'react-dom/client';
import Page from './app/page';
import { AppProvider } from './context/AppContext';
import './styles/globals.css';
import './styles/tailwind.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <AppProvider>
      <Page />
    </AppProvider>
  );
}
