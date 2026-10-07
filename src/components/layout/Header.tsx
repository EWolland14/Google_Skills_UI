import React from 'react';
import { Menu, Search, Star, Flame, HelpCircle, Globe, ExternalLink, User, Database, Edit3 } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white border-b border-google-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-google-gray-700 hover:text-google-gray-900 hover:bg-google-gray-100 rounded-full transition-colors"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div 
            onClick={() => setActiveView('dashboard')}
            className="flex items-center space-x-1.5 cursor-pointer select-none group"
          >
            {/* Google Logo text styled */}
            <span className="text-xl font-bold font-sans tracking-tight">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
            <span className="text-xl font-medium text-google-gray-700 ml-1">Skills</span>
            <span className="ml-2 px-2 py-0.5 text-[11px] font-semibold bg-google-blue-light text-google-blue rounded-full border border-blue-200">
              Intelligence
            </span>
          </div>
        </div>

        {/* Center: Search pill */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-google-gray-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn today?"
              className="w-full pl-10 pr-4 py-2 bg-google-gray-100 hover:bg-google-gray-200/70 focus:bg-white text-sm text-google-gray-900 placeholder-google-gray-600 rounded-full border border-transparent focus:border-google-blue focus:outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Right Actions: Database Status, Cloud Console CTA, Points, Streak, Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Quick Edit Profile Button */}
          <button
            onClick={onOpenProfileSetup}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1 bg-white hover:bg-blue-50 text-google-blue text-xs font-semibold rounded-full border border-blue-200 shadow-2xs transition-all"
            title="Edit Profile, Resume, and Sync to Database"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Profile &amp; Resume</span>
          </button>

          {/* Database indicator */}
          <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 bg-google-gray-100 border border-google-gray-200 rounded-full text-[11px] font-mono text-google-gray-700">
            <Database className="w-3 h-3 text-emerald-600" />
            <span>google-skills-ui-db</span>
          </div>

          <div className="hidden lg:flex items-center text-xs text-google-gray-700">
            <a
              href="https://console.cloud.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-white hover:bg-google-gray-100 text-google-blue text-xs font-medium rounded-full border border-google-gray-300 shadow-sm transition-colors flex items-center"
            >
              Cloud Console
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          {/* Points / Stars */}
          <div className="flex items-center space-x-1 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>120</span>
          </div>

          {/* Flame / Streak */}
          <div className="flex items-center space-x-1 px-2.5 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span>5</span>
          </div>

          {/* User Profile Avatar with Emmett Wolland initials */}
          <div 
            onClick={onOpenProfileSetup}
            className="relative group cursor-pointer pl-1"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-[2px] shadow-sm hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-xs text-google-blue overflow-hidden">
                <span className="font-sans font-black">EW</span>
              </div>
            </div>
            {/* Tooltip */}
            <div className="absolute right-0 top-11 hidden group-hover:block bg-google-gray-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
              <p className="font-bold">{userProfile.name}</p>
              <p className="text-[10px] text-google-gray-300">
                {userProfile.concentration} • Minor in {userProfile.minor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
