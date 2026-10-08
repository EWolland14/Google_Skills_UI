import React from 'react';
import { Menu, Search, Star, Flame, HelpCircle, Globe, ExternalLink, Edit3, Mic, Code } from 'lucide-react';
import { UserProfile } from '../../types';

interface HeaderProps {
  onToggleSidebar?: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  userProfile: UserProfile;
  onOpenProfileSetup: () => void;
  onOpenMockInterview?: () => void;
  onOpenProofOfWork?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  searchQuery,
  setSearchQuery,
  activeView,
  setActiveView,
  userProfile,
  onOpenProfileSetup,
  onOpenMockInterview,
  onOpenProofOfWork
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
        <div className="flex-1 max-w-lg mx-4 hidden md:block">
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

        {/* Right Actions: Feature Buttons, Points, Streak, Profile */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          
          {/* Feature 1: Mock Interview Quick Button */}
          <button
            onClick={onOpenMockInterview}
            className="hidden md:flex items-center space-x-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-google-blue text-xs font-semibold rounded-full border border-blue-200 transition-colors"
            title="Launch AI Mock Interview Sandbox"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>AI Interview</span>
          </button>

          {/* Feature 6: Proof of Work Portfolio Quick Button */}
          <button
            onClick={onOpenProofOfWork}
            className="hidden lg:flex items-center space-x-1 px-3 py-1.5 bg-google-gray-50 hover:bg-google-gray-100 text-google-gray-700 text-xs font-semibold rounded-full border border-google-gray-300 transition-colors"
            title="Inspect Live Proof of Work Code Portfolio"
          >
            <Code className="w-3.5 h-3.5 text-google-blue" />
            <span>Proof of Work</span>
          </button>

          {/* Quick Profile Setup Button */}
          <button
            onClick={onOpenProfileSetup}
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-google-gray-100 hover:bg-google-gray-200 text-google-gray-700 rounded-full text-xs font-medium transition-colors"
            title="Edit Profile & Resume"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Profile</span>
          </button>

          {/* Points / Stars */}
          <div className="flex items-center space-x-1 px-2 py-1 text-google-gray-700 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>120</span>
          </div>

          {/* Flame / Streak */}
          <div className="flex items-center space-x-1 px-2 py-1 text-google-gray-700 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span>5</span>
          </div>

          {/* Avatar Profile */}
          <div 
            onClick={onOpenProfileSetup}
            className="relative group cursor-pointer pl-0.5"
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
