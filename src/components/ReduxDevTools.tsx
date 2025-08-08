'use client';

import { useAppSelector } from '../store/store';
import { useState } from 'react';

export default function ReduxDevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const counter = useAppSelector((state) => state.counter);
  const auth = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow-lg"
      >
        {isOpen ? 'Hide' : 'Show'} Redux State
      </button>

      {/* DevTools Panel */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-96 bg-white border border-gray-300 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Redux State</h3>
            
            <div className="space-y-4">
              {/* Counter State */}
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Counter</h4>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                  {JSON.stringify(counter, null, 2)}
                </pre>
              </div>

              {/* Auth State */}
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Auth</h4>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                  {JSON.stringify(auth, null, 2)}
                </pre>
              </div>

              {/* User State */}
              <div>
                <h4 className="font-semibold text-purple-600 mb-2">User</h4>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
