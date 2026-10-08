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
  Globe, 
  BookOpen,
  TrendingUp,
  Eye,
  EyeOff,
  Mic,
  ShieldCheck,
  Sparkles
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
  onLaunchMockInterview?: (roleTitle: string) => void;
}

export const JobsPortal: React.FC<JobsPortalProps> = ({ 
  onNavigateToView,
  currentUserProfile,
  onLaunchMockInterview
}) => {
  const [jobs] = useState<JobPosting[]>(liveJobsDatabase);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [enrolledBridge, setEnrolledBridge] = useState<string[]>([]);
  const [reverseRecruitingActive, setReverseRecruitingActive] = useState<boolean>(true);

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
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
              Live Market Requisitions
            </span>
            <span className="text-xs text-google-gray-500 font-mono">
              Jobs.com • Google Careers • Lightcast
            </span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-google-gray-900 mt-1">
            Career Opportunities for ITM + Computer Science Minor
          </h1>
          <p className="text-xs text-google-gray-600">
            Tailored specifically for <strong>{currentUserProfile.name}</strong> ({currentUserProfile.concentration} • Minor in {currentUserProfile.minor}).
          </p>
        </div>

        {/* FEATURE 8: Anonymous Reverse Recruiting Mode Toggle */}
        <div className="flex items-center space-x-3 bg-google-gray-50 border border-google-gray-200 rounded-xl p-2.5 self-start md:self-auto">
          <div className="flex items-center space-x-2">
            {reverseRecruitingActive ? (
              <Eye className="w-4 h-4 text-emerald-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-google-gray-400" />
            )}
            <div>
              <span className="text-xs font-bold text-google-gray-900 block">
                Reverse Recruiting
              </span>
              <span className="text-[10px] text-google-gray-500">
                {reverseRecruitingActive ? 'Anonymous profile active' : 'Disabled'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setReverseRecruitingActive(!reverseRecruitingActive)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              reverseRecruitingActive
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-google-gray-200 text-google-gray-700'
            }`}
          >
            {reverseRecruitingActive ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* FEATURE 8 CARD: Inbound Recruiter Bids (When active) */}
      {reverseRecruitingActive && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-emerald-500/40 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Reverse Recruiting Active: Candidate #GT-ITM-CS-92
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Personal identity hidden until you accept an interview invitation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {/* Inbound Bid 1 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white">Google Cloud APM Screening Invitation</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">NEW BID</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Target: <strong>Associate Product Manager</strong> • Guaranteed Range: <strong className="text-emerald-400">$175k - $215k TC</strong>
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[10px]">Criteria: GT ITM + 90%+ Readiness</span>
                <button 
                  onClick={() => alert('Accepted Google Cloud APM Screening Invitation! Interview scheduled.')}
                  className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg font-bold text-xs"
                >
                  Accept &amp; Reveal Profile
                </button>
              </div>
            </div>

            {/* Inbound Bid 2 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white">Jobs.com Enterprise AI Partner Invitation</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono">NEW BID</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Target: <strong>Enterprise AI Strategy Analyst</strong> • Guaranteed Range: <strong className="text-emerald-400">$160k - $190k TC</strong>
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[10px]">Criteria: Business ITM + BigQuery</span>
                <button 
                  onClick={() => alert('Accepted Jobs.com Enterprise AI Invitation! Interview scheduled.')}
                  className="px-2.5 py-1 bg-blue-500 hover:bg-blue-400 text-slate-950 rounded-lg font-bold text-xs"
                >
                  Accept &amp; Reveal Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Source Filter Chips */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-google-gray-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles by title, skill, or employer..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-google-gray-300 rounded-xl text-xs text-google-gray-900 focus:outline-none focus:ring-1 focus:ring-google-blue shadow-2xs"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedSource('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedSource === 'all'
                ? 'bg-google-gray-900 text-white'
                : 'bg-white border border-google-gray-300 text-google-gray-700 hover:bg-google-gray-50'
            }`}
          >
            All Sources ({jobs.length})
          </button>
          <button
            onClick={() => setSelectedSource('Google Careers')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedSource === 'Google Careers'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-blue-200 text-blue-700 hover:bg-blue-50'
            }`}
          >
            Google Careers
          </button>
          <button
            onClick={() => setSelectedSource('Jobs.com')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedSource === 'Jobs.com'
                ? 'bg-purple-600 text-white'
                : 'bg-white border border-purple-200 text-purple-700 hover:bg-purple-50'
            }`}
          >
            Jobs.com
          </button>
          <button
            onClick={() => setSelectedSource('Lightcast')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedSource === 'Lightcast'
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Lightcast
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
              className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs hover:shadow-google-hover transition-all space-y-3.5"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      job.source === 'Google Careers' ? 'bg-blue-50 text-blue-800' :
                      job.source === 'Jobs.com' ? 'bg-purple-50 text-purple-800' :
                      'bg-emerald-50 text-emerald-800'
                    }`}>
                      {job.source}
                    </span>
                    <span className="text-xs text-google-gray-500 font-medium">
                      Posted {job.postedDate} • {job.workType}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-google-gray-900 leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-google-gray-600">
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
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between bg-blue-50/70 border border-blue-200 rounded-xl px-3.5 py-1.5 flex-shrink-0">
                  <span className="text-[10px] font-bold text-google-blue uppercase">
                    Profile Match
                  </span>
                  <div className="text-xl font-black text-google-blue">
                    {job.matchScore}%
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    ITM + CS Minor
                  </span>
                </div>
              </div>

              {/* Matched vs Missing Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-google-gray-100 text-xs">
                <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-2.5">
                  <span className="text-[10px] font-bold text-emerald-900 uppercase flex items-center">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1" />
                    Verified in Your Transcript:
                  </span>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {job.matchedSkills.map((s, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-white border border-emerald-200 text-emerald-900 rounded text-[10px] font-medium">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-2.5">
                  <span className="text-[10px] font-bold text-amber-900 uppercase flex items-center">
                    <AlertCircle className="w-3 h-3 text-amber-600 mr-1" />
                    Readiness Delta Gap:
                  </span>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {job.missingSkills.map((gap, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-white border border-amber-200 text-amber-900 rounded text-[10px] font-medium">
                        ⚠️ {gap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="bg-google-gray-50 rounded-xl p-2.5 border border-google-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="text-xs text-google-gray-700">
                  <span className="font-semibold text-google-gray-900">Recommended Bridge:</span> {job.bridgeCourse.title} (⏱️ {job.bridgeCourse.duration})
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  {/* FEATURE 1: Launch Mock Interview for this job */}
                  <button
                    onClick={() => onLaunchMockInterview && onLaunchMockInterview(job.title)}
                    className="px-3 py-1.5 bg-white hover:bg-blue-50 border border-blue-300 text-google-blue rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <Mic className="w-3 h-3" />
                    <span>AI Mock Interview</span>
                  </button>

                  <button
                    onClick={() => handleEnrollBridge(job.bridgeCourse.title)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1 ${
                      isBridgeEnrolled 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-white border border-google-gray-300 text-google-gray-800 hover:bg-google-gray-100'
                    }`}
                  >
                    {isBridgeEnrolled ? '✓ Enrolled' : 'Take Bridge Module'}
                  </button>

                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-google-blue hover:bg-google-blue-hover text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
                  >
                    <span>Apply</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
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
