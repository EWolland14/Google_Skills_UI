import React, { useState } from 'react';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ExternalLink, 
  Search, 
  Filter, 
  Sparkles, 
  Globe, 
  Clock, 
  BookOpen,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { JobPosting } from '../../types';
import { liveJobsDatabase } from '../../data/mockData';

interface JobsPortalProps {
  onNavigateToView: (view: string) => void;
  currentUserProfile: {
    name: string;
    major: string;
    concentration: string;
    minor: string;
  };
}

export const JobsPortal: React.FC<JobsPortalProps> = ({ 
  onNavigateToView,
  currentUserProfile
}) => {
  const [jobs, setJobs] = useState<JobPosting[]>(liveJobsDatabase);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [enrolledBridge, setEnrolledBridge] = useState<string[]>([]);

  const filteredJobs = jobs.filter(job => {
    const matchesSource = selectedSource === 'all' || job.source.toLowerCase() === selectedSource.toLowerCase();
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSource && matchesSearch;
  });

  const handleEnrollBridge = (title: string) => {
    if (!enrolledBridge.includes(title)) {
      setEnrolledBridge([...enrolledBridge, title]);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
                Market Telemetry & Requisitions
              </span>
              <span className="text-xs text-google-gray-500 font-mono">
                Jobs.com • Google Careers • Lightcast
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-google-gray-900 mt-1">
              Live Career Opportunities Matched to Your Profile
            </h1>
            <p className="text-xs md:text-sm text-google-gray-600 mt-1">
              Curated requisitions tailored to <strong>{currentUserProfile.name}</strong> ({currentUserProfile.major} • Concentration in {currentUserProfile.concentration} • Minor in {currentUserProfile.minor}).
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-google-gray-600">Active Pipelines:</span>
            <div className="flex items-center space-x-1.5 bg-google-gray-100 px-3 py-1.5 rounded-xl border border-google-gray-200 text-xs font-bold text-google-gray-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>854,300 Aggregated Postings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Badges & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-google-gray-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles by title, skill, or employer..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-google-gray-300 rounded-xl text-xs text-google-gray-900 focus:outline-none focus:ring-2 focus:ring-google-blue shadow-2xs"
          />
        </div>

        {/* Source Pills: All, Google Careers, Jobs.com, Lightcast */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedSource('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedSource === 'all'
                ? 'bg-google-gray-900 text-white'
                : 'bg-white border border-google-gray-300 text-google-gray-700 hover:bg-google-gray-50'
            }`}
          >
            All Sources ({jobs.length})
          </button>
          <button
            onClick={() => setSelectedSource('Google Careers')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
              selectedSource === 'Google Careers'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-blue-200 text-blue-700 hover:bg-blue-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span>Google Careers</span>
          </button>
          <button
            onClick={() => setSelectedSource('Jobs.com')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
              selectedSource === 'Jobs.com'
                ? 'bg-purple-600 text-white'
                : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Globe className="w-3 h-3 text-purple-400" />
            <span>Jobs.com Feed</span>
          </button>
          <button
            onClick={() => setSelectedSource('Lightcast')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
              selectedSource === 'Lightcast'
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>Lightcast Market</span>
          </button>
        </div>
      </div>

      {/* Jobs Feed List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const isBridgeEnrolled = enrolledBridge.includes(job.bridgeCourse.title);
          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm hover:shadow-google-hover hover:border-google-blue/40 transition-all space-y-4"
            >
              {/* Job Card Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      job.source === 'Google Careers' ? 'bg-blue-100 text-blue-800' :
                      job.source === 'Jobs.com' ? 'bg-purple-100 text-purple-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {job.source}
                    </span>
                    <span className="text-xs text-google-gray-500 font-medium">
                      Posted {job.postedDate} • {job.workType}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-google-gray-900 leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-google-gray-600 pt-0.5">
                    <span className="flex items-center font-medium text-google-gray-800">
                      <Building className="w-3.5 h-3.5 text-google-gray-500 mr-1" />
                      {job.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-google-gray-500 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center font-bold text-emerald-700">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600 mr-0.5" />
                      {job.salaryRange}
                    </span>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between self-start bg-blue-50/70 border border-blue-200 rounded-xl px-4 py-2 flex-shrink-0">
                  <span className="text-[10px] font-bold text-google-blue uppercase tracking-wider">
                    Profile Match
                  </span>
                  <div className="text-2xl font-black text-google-blue">
                    {job.matchScore}%
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    ITM + CS Aligned
                  </span>
                </div>
              </div>

              {/* Matched Skills vs Missing Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-google-gray-100 text-xs">
                {/* Matched Skills */}
                <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3 space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-900 uppercase flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                    Verified Skills in Your Transcript:
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.matchedSkills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-emerald-200 text-emerald-900 rounded text-[11px] font-medium shadow-2xs">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills / Readiness Delta */}
                <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-3 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-900 uppercase flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 mr-1" />
                    Readiness Delta Gap:
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.missingSkills.map((gap, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-amber-200 text-amber-900 rounded text-[11px] font-medium shadow-2xs">
                        ⚠️ {gap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bridge Course Action Footer */}
              <div className="bg-google-gray-50 rounded-xl p-3 border border-google-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2 text-xs">
                  <Sparkles className="w-4 h-4 text-google-blue flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-google-gray-900">
                      Recommended Bridge Module:
                    </span>
                    <span className="text-google-gray-700 ml-1.5">
                      {job.bridgeCourse.title} ({job.bridgeCourse.type} • ⏱️ {job.bridgeCourse.duration})
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleEnrollBridge(job.bridgeCourse.title)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 ${
                      isBridgeEnrolled 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-white border border-google-gray-300 text-google-gray-800 hover:bg-google-gray-100'
                    }`}
                  >
                    {isBridgeEnrolled ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Enrolled In Progress</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-3 h-3 text-google-blue" />
                        <span>Take Bridge Module</span>
                      </>
                    )}
                  </button>

                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-google-blue hover:bg-google-blue-hover text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 shadow-sm"
                  >
                    <span>Apply via {job.source}</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
