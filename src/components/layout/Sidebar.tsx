import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  GitFork, 
  Boxes, 
  Award, 
  CreditCard, 
  Building2, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Network,
  Sparkles,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isCollapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  isCollapsed
}) => {
  const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'catalog', label: 'Catalog', icon: BookOpen },
    { id: 'paths', label: 'Paths', icon: GitFork },
  ];

  const intelligenceNavItems = [
    { 
      id: 'stackable', 
      label: 'Stackable Credentials', 
      icon: Award, 
      badge: 'Academic' 
    },
    { 
      id: 'readiness', 
      label: 'Readiness Delta', 
      icon: Target, 
      badge: 'Gap Engine' 
    },
    { 
      id: 'roi', 
      label: 'Career ROI & Alumni', 
      icon: TrendingUp, 
      badge: '$500k+' 
    },
    { 
      id: 'enterprise', 
      label: 'Proof of Literacy', 
      icon: ShieldCheck, 
      badge: 'B2B' 
    },
    { 
      id: 'ecosystem', 
      label: 'Ecosystem Ingestion', 
      icon: Network, 
      badge: 'Live Sync' 
    },
  ];

  const secondaryNavItems = [
    { id: 'collections', label: 'Collections', icon: Boxes },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'organizations', label: 'Organizations', icon: Building2 },
  ];

  return (
    <aside 
      className={`bg-white border-r border-google-gray-200 transition-all duration-200 flex flex-col justify-between select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="py-3 overflow-y-auto">
        {/* Core Google Skills Navigation */}
        <div className="px-3 mb-2">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold text-google-gray-500 uppercase tracking-wider mb-1">
              Google Skills
            </p>
          )}
          <nav className="space-y-1">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  title={item.label}
                  className={`w-full flex items-center px-3 py-2.5 rounded-r-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-google-blue-light text-google-blue font-semibold border-l-4 border-google-blue'
                      : 'text-google-gray-700 hover:bg-google-gray-100 hover:text-google-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-google-blue' : 'text-google-gray-600'}`} />
                  {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Supercharged Career & Skill Intelligence Section */}
        <div className="px-3 my-4 pt-3 border-t border-google-gray-200">
          {!isCollapsed && (
            <div className="px-3 flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-google-blue uppercase tracking-wider flex items-center">
                <Sparkles className="w-3 h-3 mr-1 text-google-blue" />
                Intelligence Ecosystem
              </span>
            </div>
          )}
          <nav className="space-y-1">
            {intelligenceNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  title={item.label}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-r-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-google-blue-light text-google-blue font-semibold border-l-4 border-google-blue'
                      : 'text-google-gray-700 hover:bg-google-gray-100 hover:text-google-gray-900'
                  }`}
                >
                  <div className="flex items-center truncate">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-google-blue' : 'text-google-gray-600'}`} />
                    {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
                  </div>
                  {!isCollapsed && item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive 
                        ? 'bg-google-blue text-white' 
                        : 'bg-google-gray-100 text-google-gray-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Secondary Standard Items */}
        <div className="px-3 pt-3 border-t border-google-gray-200">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold text-google-gray-500 uppercase tracking-wider mb-1">
              Management
            </p>
          )}
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  title={item.label}
                  className={`w-full flex items-center px-3 py-2.5 rounded-r-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-google-blue-light text-google-blue font-semibold border-l-4 border-google-blue'
                      : 'text-google-gray-700 hover:bg-google-gray-100 hover:text-google-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-google-blue' : 'text-google-gray-600'}`} />
                  {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Georgia Tech Institutional Sync Footer Card */}
      {!isCollapsed && (
        <div className="p-3 m-3 bg-gradient-to-br from-amber-50 to-blue-50 border border-amber-200/80 rounded-xl">
          <div className="flex items-center space-x-2 mb-1.5">
            <GraduationCap className="w-4 h-4 text-amber-700" />
            <span className="text-[11px] font-bold text-amber-900">Georgia Tech Active</span>
          </div>
          <p className="text-[10px] text-google-gray-600 leading-tight mb-2">
            DegreeWorks & Banner synced. 36 Credits verified.
          </p>
          <div className="flex items-center justify-between text-[10px] text-google-blue font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>OIDC Verified</span>
          </div>
        </div>
      )}
    </aside>
  );
};
