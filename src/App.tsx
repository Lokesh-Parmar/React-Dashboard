import React, { useEffect } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { installMockApi } from './utils/mockApi';

function App() {
  useEffect(() => { installMockApi(); }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="p-4 border-b bg-white dark:bg-gray-800 shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Dynamic Dashboard (React 19)</h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
