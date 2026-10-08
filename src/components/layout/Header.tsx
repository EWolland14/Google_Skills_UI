import React from 'react';
import { Menu, Search, Star, Flame, HelpCircle, Globe, ExternalLink, Edit3, Database } from 'lucide-react';
import { UserProfile } from '../../types';

interface HeaderProps {
  onToggleSidebar?: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  userProfile: UserProfile;
  onOpenProfileSetup: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  searchQuery,
  setSearchQuery,
  activeView,
  setActiveView,
  userProfile,
  onOpenProfileSetup
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-google-gray-200">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16 max-w-[1600px] mx-auto w-full">
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-google-gray-700 hover:text-google-gray-900 hover:bg-google-gray-100 rounded-full transition-colors"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div 
            onClick={() => setActiveView('dashboard')}
            className="flex items-center space-x-1.5 cursor-pointer select-none"
          >
            <span className="text-xl font-bold font-sans tracking-tight">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
            <span className="text-xl font-medium text-google-gray-700 ml-0.5">Skills</span>
          </div>
        </div>

        {/* Center: Search pill */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-google-gray-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn today?"
              className="w-full pl-10 pr-4 py-2 bg-google-gray-100 hover:bg-google-gray-200/70 focus:bg-white text-xs md:text-sm text-google-gray-900 placeholder-google-gray-500 rounded-full border border-transparent focus:border-google-blue focus:outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Right Actions: Clean, Uncluttered, Exact Google Style */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Cloud Console Link */}
          <div className="hidden lg:flex items-center text-xs text-google-gray-600 mr-1">
            <span>Apply skills in Cloud Console</span>
            <a
              href="https://console.cloud.google.com"
              target="_blank"
              rel="noreferrer"
              className="ml-2 px-3 py-1 bg-white hover:bg-google-gray-100 text-google-blue text-xs font-medium rounded-full border border-google-gray-300 shadow-2xs transition-colors flex items-center"
            >
              Get started
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          {/* Quick Profile Setup Button */}
          <button
            onClick={onOpenProfileSetup}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-google-gray-100 hover:bg-blue-50 text-google-gray-700 hover:text-google-blue rounded-full text-xs font-medium border border-google-gray-200 transition-colors"
            title="Edit Profile, Resume & Settings"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Profile</span>
          </button>

          {/* Points / Stars */}
          <div className="flex items-center space-x-1 px-2.5 py-1 text-google-gray-700 text-xs font-semibold">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>120</span>
          </div>

          {/* Flame / Streak */}
          <div className="flex items-center space-x-1 px-2.5 py-1 text-google-gray-700 text-xs font-semibold">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>5</span>
          </div>

          {/* Help & Globe */}
          <button className="p-1.5 text-google-gray-600 hover:text-google-gray-900 hover:bg-google-gray-100 rounded-full hidden sm:block">
            <HelpCircle className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-google-gray-600 hover:text-google-gray-900 hover:bg-google-gray-100 rounded-full hidden sm:block">
            <Globe className="w-4 h-4" />
          </button>

          {/* Avatar Profile */}
          <div 
            onClick={onOpenProfileSetup}
            className="relative group cursor-pointer pl-1"
          >
            <div className="w-8 h-8 rounded-full bg-google-blue text-white flex items-center justify-center font-bold text-xs shadow-2xs hover:ring-2 hover:ring-google-blue/30 transition-all">
              <span>EW</span>
            </div>
            {/* Tooltip */}
            <div className="absolute right-0 top-10 hidden group-hover:block bg-google-gray-900 text-white text-[11px] py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
              <p className="font-bold">{userProfile.name}</p>
              <p className="text-google-gray-300">
                {userProfile.concentration} • Minor in {userProfile.minor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
