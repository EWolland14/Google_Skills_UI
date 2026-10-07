import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { StudentInterface } from './components/modules/StudentInterface';
import { CredentialGapEngine } from './components/modules/CredentialGapEngine';
import { CareerROIEngine } from './components/modules/CareerROIEngine';
import { EnterpriseB2B } from './components/modules/EnterpriseB2B';
import { EcosystemHub } from './components/modules/EcosystemHub';
import { CatalogView } from './components/modules/CatalogView';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderCurrentView = () => {
    switch (activeView) {
      case 'dashboard':
        return <StudentInterface onNavigateToView={setActiveView} />;
      case 'catalog':
        return <CatalogView onNavigateToView={setActiveView} externalSearchQuery={searchQuery} />;
      case 'paths':
        return <StudentInterface onNavigateToView={setActiveView} />;
      case 'stackable':
        return <CredentialGapEngine onNavigateToView={setActiveView} />;
      case 'readiness':
        return <CredentialGapEngine onNavigateToView={setActiveView} initialJobId="job-1" />;
      case 'roi':
        return <CareerROIEngine onNavigateToView={setActiveView} />;
      case 'enterprise':
        return <EnterpriseB2B onNavigateToView={setActiveView} />;
      case 'ecosystem':
        return <EcosystemHub onNavigateToView={setActiveView} />;
      case 'collections':
      case 'subscriptions':
      case 'organizations':
        return (
          <div className="bg-white rounded-2xl border border-google-gray-200 p-8 text-center max-w-2xl mx-auto my-12">
            <h2 className="text-xl font-bold text-google-gray-900 capitalize mb-2">{activeView} Management</h2>
            <p className="text-xs text-google-gray-600 mb-6">
              Institutional synchronization active for Georgia Tech Scheller MBA & Alphabet Enterprise network.
            </p>
            <button
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-2 bg-google-blue text-white rounded-lg text-xs font-semibold"
            >
              Return to Intelligence Dashboard
            </button>
          </div>
        );
      default:
        return <StudentInterface onNavigateToView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] font-sans antialiased text-[#202124]">
      {/* Top Header */}
      <Header
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Body with Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isCollapsed={isSidebarCollapsed}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          {renderCurrentView()}

          {/* Footer matching Google Skills screenshot */}
          <footer className="mt-16 pt-8 pb-12 border-t border-google-gray-200 text-center space-y-4">
            <div className="flex items-center justify-center space-x-1">
              <span className="text-base font-bold font-sans">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
              <span className="text-base font-medium text-google-gray-600 ml-1">Skills</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-google-gray-600">
              <button onClick={() => setActiveView('dashboard')} className="hover:text-google-blue">Dashboard</button>
              <button onClick={() => setActiveView('catalog')} className="hover:text-google-blue">Catalog</button>
              <button onClick={() => setActiveView('paths')} className="hover:text-google-blue">Paths</button>
              <button onClick={() => setActiveView('subscriptions')} className="hover:text-google-blue">Subscriptions</button>
              <button onClick={() => setActiveView('dashboard')} className="hover:text-google-blue">Activities</button>
              <button onClick={() => setActiveView('stackable')} className="hover:text-google-blue">Achievements</button>
              <button onClick={() => setActiveView('enterprise')} className="hover:text-google-blue">Settings</button>
              <span className="text-google-gray-400">|</span>
              <a href="#" className="hover:text-google-blue">Sign out</a>
            </div>

            <div className="flex items-center justify-center space-x-5 text-[11px] text-google-gray-500 pt-1">
              <span>YouTube</span>
              <span>Help Center</span>
              <span>Terms</span>
              <span>Privacy</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
