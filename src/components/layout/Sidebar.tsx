import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  GitFork, 
  Award, 
  Building2, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Network,
  GraduationCap,
  Briefcase,
  Users
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isCollapsed: boolean;
  friendsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  isCollapsed,
  friendsCount = 3
}) => {
  const learningItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'catalog', label: 'Catalog', icon: BookOpen },
    { id: 'paths', label: 'Paths', icon: GitFork },
  ];

  const careerIntelligenceItems = [
    { id: 'jobs', label: 'Jobs & Opportunities', icon: Briefcase },
    { id: 'friends', label: 'Friends Network', icon: Users },
    { id: 'stackable', label: 'Stackable Credentials', icon: Award },
    { id: 'readiness', label: 'Readiness Delta', icon: Target },
    { id: 'roi', label: 'Career ROI & Alumni', icon: TrendingUp },
  ];

  const enterpriseItems = [
    { id: 'enterprise', label: 'Proof of Literacy', icon: ShieldCheck },
    { id: 'ecosystem', label: 'Ecosystem Ingestion', icon: Network },
  ];

  return (
    <aside 
      className={`bg-white border-r border-google-gray-200 transition-all duration-200 flex flex-col justify-between select-none ${
        isCollapsed ? 'w-18' : 'w-60'
      }`}
    >
      <div className="py-2 overflow-y-auto">
        {/* Core Learning Navigation */}
        <div className="px-2 mb-2">
          {!isCollapsed && (
            <p className="px-3 pt-2 text-[11px] font-semibold text-google-gray-500 uppercase tracking-wider mb-1">
              Learning
            </p>
          )}
          <nav className="space-y-0.5">
            {learningItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  title={item.label}
                  className={`w-full flex items-center px-3 py-2 rounded-r-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-google-blue-light text-google-blue font-semibold border-l-3 border-google-blue'
                      : 'text-google-gray-700 hover:bg-google-gray-100 hover:text-google-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-google-blue' : 'text-google-gray-600'}`} />
                  {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Career & Intelligence Navigation */}
        <div className="px-2 my-2 pt-2 border-t border-google-gray-100">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold text-google-gray-500 uppercase tracking-wider mb-1">
              Careers &amp; Network
            </p>
          )}
          <nav className="space-y-0.5">
            {careerIntelligenceItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  title={item.label}
                  className={`w-full flex items-center px-3 py-2 rounded-r-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-google-blue-light text-google-blue font-semibold border-l-3 border-google-blue'
                      : 'text-google-gray-700 hover:bg-google-gray-100 hover:text-google-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-google-blue' : 'text-google-gray-600'}`} />
                  {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Enterprise & Governance */}
        <div className="px-2 my-2 pt-2 border-t border-google-gray-100">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold text-google-gray-500 uppercase tracking-wider mb-1">
              Enterprise &amp; Sync
            </p>
          )}
          <nav className="space-y-0.5">
            {enterpriseItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  title={item.label}
                  className={`w-full flex items-center px-3 py-2 rounded-r-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-google-blue-light text-google-blue font-semibold border-l-3 border-google-blue'
                      : 'text-google-gray-700 hover:bg-google-gray-100 hover:text-google-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-google-blue' : 'text-google-gray-600'}`} />
                  {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Georgia Tech ITM & Database Sync Footer Card */}
      {!isCollapsed && (
        <div className="p-3 m-2.5 bg-google-gray-50 border border-google-gray-200 rounded-xl">
          <div className="flex items-center space-x-1.5 mb-1">
            <GraduationCap className="w-3.5 h-3.5 text-google-gray-700" />
            <span className="text-[11px] font-bold text-google-gray-800">Georgia Tech</span>
          </div>
          <p className="text-[10px] text-google-gray-500 leading-snug">
            Business ITM + CS Minor verified.
          </p>
          <div className="flex items-center justify-between text-[10px] text-google-gray-600 font-medium mt-1.5 pt-1.5 border-t border-google-gray-200">
            <span className="font-mono text-[9px] text-google-gray-400">google-skills-ui-db</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
        </div>
      )}
    </aside>
  );
};
