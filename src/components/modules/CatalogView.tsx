import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  ChevronDown, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  Layers, 
  BookOpen,
  FlaskConical,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { googleSkillsCatalogItems } from '../../data/mockData';
import { CatalogItem } from '../../types';

interface CatalogViewProps {
  onNavigateToView: (view: string) => void;
  externalSearchQuery?: string;
  onLaunchOutageSimulator?: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ 
  onNavigateToView,
  externalSearchQuery = '',
  onLaunchOutageSimulator
}) => {
  const [catalogSearch, setCatalogSearch] = useState(externalSearchQuery);
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredItems = googleSkillsCatalogItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                          item.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(catalogSearch.toLowerCase()));
    const matchesFormat = selectedFormat === 'all' || item.type.toLowerCase() === selectedFormat.toLowerCase();
    const matchesLevel = selectedLevel === 'all' || item.level.toLowerCase() === selectedLevel.toLowerCase();
    return matchesSearch && matchesFormat && matchesLevel;
  });

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Breadcrumb matching screenshot: Home icon > Catalog */}
      <div className="flex items-center space-x-2 text-xs text-google-gray-600">
        <button 
          onClick={() => onNavigateToView('dashboard')}
          className="hover:text-google-blue flex items-center"
        >
          <Home className="w-3.5 h-3.5 mr-1" />
        </button>
        <span>&gt;</span>
        <span className="font-semibold text-google-gray-800">Catalog</span>
      </div>

      {/* Hero Header matching screenshot */}
      <div className="text-center max-w-3xl mx-auto pt-2 pb-4 space-y-3">
        <h1 className="text-2xl md:text-3xl font-extrabold text-google-gray-900 tracking-tight font-sans">
          Explore training your way
        </h1>
        <p className="text-xs md:text-sm text-google-gray-600 leading-relaxed max-w-2xl mx-auto">
          Your home for building AI skills and more. Get hands on with Google Skills Labs, dive into in-depth courses, and learn directly from the experts.
        </p>

        {/* FEATURE 3: Chaos Outage Simulator Callout Button */}
        <div className="pt-1">
          <button
            onClick={onLaunchOutageSimulator}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold shadow-sm transition-all hover:shadow-md animate-pulse"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Launch Production Outage Simulator (Chaos Mode)</span>
          </button>
        </div>

        {/* Catalog Search input matching screenshot */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-google-gray-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              placeholder="Search catalog"
              className="w-full pl-10 pr-4 py-2 bg-google-gray-100 hover:bg-google-gray-200/70 focus:bg-white text-xs md:text-sm text-google-gray-900 rounded-full border border-transparent focus:border-google-blue focus:outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Filter Pills matching screenshot */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button className="px-3 py-1 bg-white border border-google-gray-300 rounded-full text-xs text-google-gray-700 hover:bg-google-gray-50 flex items-center space-x-1 shadow-2xs">
            <span>Credential</span>
            <ChevronDown className="w-3 h-3 text-google-gray-500" />
          </button>
          
          <button 
            onClick={() => setSelectedFormat(selectedFormat === 'all' ? 'Lab' : selectedFormat === 'Lab' ? 'Course' : 'all')}
            className={`px-3 py-1 border rounded-full text-xs flex items-center space-x-1 shadow-2xs transition-colors ${
              selectedFormat !== 'all' 
                ? 'bg-blue-50 border-google-blue text-google-blue font-semibold' 
                : 'bg-white border-google-gray-300 text-google-gray-700 hover:bg-google-gray-50'
            }`}
          >
            <span>Format {selectedFormat !== 'all' ? `(${selectedFormat})` : ''}</span>
            <ChevronDown className="w-3 h-3 text-google-gray-500" />
          </button>

          <button 
            onClick={() => setSelectedLevel(selectedLevel === 'all' ? 'Introductory' : selectedLevel === 'Introductory' ? 'Intermediate' : 'all')}
            className={`px-3 py-1 border rounded-full text-xs flex items-center space-x-1 shadow-2xs transition-colors ${
              selectedLevel !== 'all' 
                ? 'bg-blue-50 border-google-blue text-google-blue font-semibold' 
                : 'bg-white border-google-gray-300 text-google-gray-700 hover:bg-google-gray-50'
            }`}
          >
            <span>Level {selectedLevel !== 'all' ? `(${selectedLevel})` : ''}</span>
            <ChevronDown className="w-3 h-3 text-google-gray-500" />
          </button>

          <button className="px-3 py-1 bg-white border border-google-gray-300 rounded-full text-xs text-google-gray-700 hover:bg-google-gray-50 flex items-center space-x-1 shadow-2xs">
            <span>Duration</span>
            <ChevronDown className="w-3 h-3 text-google-gray-500" />
          </button>
        </div>
      </div>

      {/* Result count line matching screenshot */}
      <div className="flex items-center justify-between text-xs text-google-gray-600 px-1 border-b border-google-gray-200 pb-2">
        <span><strong>1,337 results</strong></span>
        <span>Showing 1 - {filteredItems.length} of 1,337</span>
      </div>

      {/* 4-column card grid matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs hover:shadow-google-hover hover:border-google-blue/40 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Top Tags matching screenshot */}
              <div className="flex items-center space-x-2 text-[10px] font-semibold text-google-gray-700 mb-2.5">
                <span className="bg-google-gray-100 px-2 py-0.5 rounded flex items-center">
                  {item.type === 'Lab' ? (
                    <FlaskConical className="w-3 h-3 mr-1 text-purple-600" />
                  ) : (
                    <BookOpen className="w-3 h-3 mr-1 text-google-blue" />
                  )}
                  {item.type}
                </span>
                {item.badgeType && (
                  <span className="bg-google-gray-100 text-google-gray-600 px-2 py-0.5 rounded">
                    {item.badgeType}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-google-gray-900 group-hover:text-google-blue transition-colors mb-1.5 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-google-gray-600 line-clamp-3 mb-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Footer matching screenshot */}
            <div className="flex items-center justify-between pt-2.5 border-t border-google-gray-100 text-xs text-google-gray-600">
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-google-gray-500" />
                <span>{item.duration}</span>
              </div>

              <div className="flex items-center space-x-1.5">
                {item.type === 'Lab' && (
                  <button
                    onClick={onLaunchOutageSimulator}
                    title="Launch Chaos Mode for this Lab"
                    className="p-1 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </button>
                )}
                <button 
                  onClick={() => alert(`Enrolling in "${item.title}" (${item.duration})`)}
                  title="Start training"
                  className="w-7 h-7 rounded-full bg-sky-100 hover:bg-google-blue text-sky-700 hover:text-white flex items-center justify-center transition-all shadow-2xs"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer matching screenshot */}
      <div className="flex items-center justify-center space-x-4 pt-4 text-xs text-google-gray-600">
        <span>1 - 8 of 1337</span>
        <div className="flex items-center space-x-1">
          <button className="w-7 h-7 rounded-full border border-google-gray-300 flex items-center justify-center text-google-gray-400 hover:bg-google-gray-100">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 rounded-full border border-google-gray-300 flex items-center justify-center text-google-gray-700 hover:bg-google-gray-100">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
