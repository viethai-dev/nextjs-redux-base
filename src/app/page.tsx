import Counter from '../components/Counter';
import AuthForm from '../components/AuthForm';
import UserProfile from '../components/UserProfile';
import ReduxDevTools from '../components/ReduxDevTools';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Next.js Redux Base
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                A complete Redux Toolkit setup with TypeScript
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Redux Connected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Counter Demo */}
          <div className="lg:col-span-1">
            <Counter />
          </div>

          {/* Auth Demo */}
          <div className="lg:col-span-1">
            <AuthForm />
          </div>

          {/* User Profile Demo */}
          <div className="lg:col-span-1">
            <UserProfile />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Features Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Redux Toolkit</h3>
              <p className="text-gray-600 dark:text-gray-400">Modern Redux with simplified boilerplate and TypeScript support</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Async Thunks</h3>
              <p className="text-gray-600 dark:text-gray-400">Handle async operations with createAsyncThunk for API calls</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">TypeScript</h3>
              <p className="text-gray-600 dark:text-gray-400">Full TypeScript support with type-safe Redux actions and state</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tailwind CSS</h3>
              <p className="text-gray-600 dark:text-gray-400">Modern utility-first CSS framework with dark mode support</p>
            </div>
          </div>
        </div>

        {/* Documentation Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Structure</h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 dark:text-gray-400">src/</div>
                <div className="ml-4">
                  <div>├── app/</div>
                  <div>├── components/</div>
                  <div>├── slices/</div>
                  <div>├── store/</div>
                  <div>├── hooks/</div>
                  <div>├── lib/</div>
                  <div>└── types/</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Scripts</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">npm run dev</code>
                  <span className="text-gray-600 dark:text-gray-400">Start development server</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">npm run build</code>
                  <span className="text-gray-600 dark:text-gray-400">Build for production</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">npm run start</code>
                  <span className="text-gray-600 dark:text-gray-400">Start production server</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">npm run lint</code>
                  <span className="text-gray-600 dark:text-gray-400">Run ESLint</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Redux DevTools */}
      <ReduxDevTools />
    </div>
  );
}
