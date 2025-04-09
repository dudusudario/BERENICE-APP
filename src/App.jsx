import React from 'react';
import { ToastProvider } from './contexts/ToastContext';
import ExemploToast from './components/ExemploToast';

function App() {
  return (
    <ToastProvider>
      <div className="container mx-auto p-8">
        <ExemploToast />
      </div>
    </ToastProvider>
  );
}

export default App; 