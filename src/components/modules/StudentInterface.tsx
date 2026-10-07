import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  ArrowRight, 
  Award, 
  Flame, 
  Play, 
  TrendingUp, 
  Layers, 
  BrainCircuit, 
  Settings2,
  GraduationCap,
  ExternalLink,
  Briefcase,
  Users,
  Edit3
} from 'lucide-react';
import { TranscriptProfile, ElectiveDivergence, UserProfile } from '../../types';
import { initialTranscriptProfile, electiveDivergenceComparison } from '../../data/mockData';

interface StudentInterfaceProps {
  onNavigateToView: (view: string) => void;
  userProfile: UserProfile;
  onOpenProfileSetup: () => void;
}

export const StudentInterface: React.FC<StudentInterfaceProps> = ({ 
  onNavigateToView,
  userProfile,
  onOpenProfileSetup
}) => {
  const [profile, setProfile] = useState<TranscriptProfile>(initialTranscriptProfile);
  const [selectedTrack, setSelectedTrack] = useState<'track_x' | 'track_y'>('track_x');
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'activities' | 'paths'>('activities');

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 900);
  };

  const trackData: ElectiveDivergence = 
    selectedTrack === 'track_x' 
      ? electiveDivergenceComparison.trackX 
      : electiveDivergenceComparison.trackY;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Banner / Academic Verification Pill with Emmett Wolland Profile Info */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-amber-50 border border-blue-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-300 flex items-center justify-center text-amber-700 font-black text-sm">
            GT
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-google-gray-900">{userProfile.name}</span>
              <span className="text-[11px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-semibold border border-emerald-200">
                Official Transcript Verified
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-google-blue rounded-full font-bold">
                google-skills-ui-db
              </span>
            </div>
            <p className="text-xs text-google-gray-700 mt-0.5">
              <strong>{userProfile.major}</strong> • Concentration in <strong>{userProfile.concentration}</strong> • Minor in <strong className="text-indigo-700">{userProfile.minor}</strong>
            </p>
            <p className="text-[11px] text-google-gray-500">
              {userProfile.institution} • GPA: <strong className="text-google-gray-900">{userProfile.gpa}</strong> • Credits: <strong className="text-google-gray-900">{userProfile.totalCredits} Completed</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end md:self-auto">
          <button
            onClick={onOpenProfileSetup}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-google-blue bg-white hover:bg-google-blue-light border border-blue-200 rounded-lg shadow-sm transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile &amp; Resume</span>
          </button>
          <button
            onClick={() => onNavigateToView('jobs')}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-white bg-google-blue hover:bg-google-blue-hover rounded-lg shadow-sm transition-all"
          >
            <Briefcase className="w-3.5 h-3.5 mr-1" />
            <span>Jobs for ITM + CS Minor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Familiar Google Skills Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Hero Course, Activities, & Elective Divergence */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Featured Activity Card (matching Google Skills screenshot) */}
          <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-sm hover:shadow-google-hover transition-all flex flex-col md:flex-row items-center gap-5">
            <div className="w-full md:w-5/12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 flex items-center justify-center border border-blue-100 relative overflow-hidden min-h-[140px]">
              <div className="absolute top-2 left-2 text-[10px] font-bold tracking-wider text-google-blue uppercase bg-white/80 px-2 py-0.5 rounded">
                Bridge Module
              </div>
              <div className="text-center">
                <BrainCircuit className="w-12 h-12 text-google-blue mx-auto mb-2 animate-pulse" />
                <span className="text-xs font-medium text-google-gray-700">Gemini for Data Specialists</span>
              </div>
            </div>

            <div className="w-full md:w-7/12 space-y-2">
              <p className="text-xs text-google-blue font-medium hover:underline cursor-pointer">
                Integrate Generative AI Into Your Data Workflow &gt; Gemini for Data Scientists and Analysts
              </p>
              <h2 className="text-lg font-bold text-google-gray-900 leading-snug">
                Introducing Gemini for data professionals
              </h2>
              <div className="flex items-center space-x-3 text-xs text-google-gray-600">
                <span>⏱️ 6 minutes</span>
                <span>•</span>
                <span className="text-emerald-700 font-medium">Recommended for ITM + CS Minor Core</span>
              </div>
              <div className="pt-2">
                <button className="px-5 py-2 bg-google-blue hover:bg-google-blue-hover text-white text-xs font-medium rounded-full shadow-sm flex items-center space-x-1.5 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabbed Activities & Paths (matching screenshot) */}
          <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-sm">
            <div className="flex items-center space-x-6 border-b border-google-gray-200 pb-3 mb-4">
              <button
                onClick={() => setActiveTab('activities')}
                className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${
                  activeTab === 'activities'
                    ? 'border-google-blue text-google-blue'
                    : 'border-transparent text-google-gray-600 hover:text-google-gray-900'
                }`}
              >
                Activities
              </button>
              <button
                onClick={() => setActiveTab('paths')}
                className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${
                  activeTab === 'paths'
                    ? 'border-google-blue text-google-blue'
                    : 'border-transparent text-google-gray-600 hover:text-google-gray-900'
                }`}
              >
                Paths
              </button>
            </div>

            {/* Activities 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-google-gray-200 rounded-xl p-4 hover:border-google-blue/50 hover:shadow-sm transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-semibold text-purple-700 mb-1">
                    <span className="bg-purple-100 px-2 py-0.5 rounded">Featured</span>
                    <span className="bg-google-gray-100 text-google-gray-600 px-2 py-0.5 rounded">Path</span>
                  </div>
                  <h3 className="text-sm font-bold text-google-gray-900 mb-1">
                    Integrate Generative AI Into Your Data Workflow
                  </h3>
                  <p className="text-xs text-google-gray-600 line-clamp-2 mb-3">
                    This learning path is for data professionals who want to integrate generative AI into their workflow. Learn how to use BigQuery Machine...
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-google-gray-100 text-xs text-google-gray-600">
                  <span>⏱️ 12 hours 20 minutes</span>
                  <button className="w-7 h-7 rounded-full bg-google-blue-light hover:bg-google-blue text-google-blue hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="border border-google-gray-200 rounded-xl p-4 hover:border-google-blue/50 hover:shadow-sm transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-semibold text-purple-700 mb-1">
                    <span className="bg-purple-100 px-2 py-0.5 rounded">Featured</span>
                    <span className="bg-google-gray-100 text-google-gray-600 px-2 py-0.5 rounded">Path</span>
                  </div>
                  <h3 className="text-sm font-bold text-google-gray-900 mb-1">
                    Deploy and Manage Generative AI Models
                  </h3>
                  <p className="text-xs text-google-gray-600 line-clamp-2 mb-3">
                    This learning path provides a comprehensive introduction to machine learning operations (MLOps), with a specific focus on generative...
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-google-gray-100 text-xs text-google-gray-600">
                  <span>⏱️ 18 hours 30 minutes</span>
                  <button className="w-7 h-7 rounded-full bg-google-blue-light hover:bg-google-blue text-google-blue hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="border border-google-gray-200 rounded-xl p-4 hover:border-google-blue/50 hover:shadow-sm transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-semibold text-purple-700 mb-1">
                    <span className="bg-purple-100 px-2 py-0.5 rounded">Featured</span>
                    <span className="bg-google-gray-100 text-google-gray-600 px-2 py-0.5 rounded">Path</span>
                  </div>
                  <h3 className="text-sm font-bold text-google-gray-900 mb-1">
                    Build and Modernize Applications With Generative AI
                  </h3>
                  <p className="text-xs text-google-gray-600 line-clamp-2 mb-3">
                    This learning path is for application developers who want to enhance their projects with the power of generative AI. From understanding...
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-google-gray-100 text-xs text-google-gray-600">
                  <span>⏱️ 22 hours 1 minute</span>
                  <button className="w-7 h-7 rounded-full bg-google-blue-light hover:bg-google-blue text-google-blue hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="border border-google-gray-200 rounded-xl p-4 hover:border-google-blue/50 hover:shadow-sm transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-semibold text-google-gray-700 mb-1">
                    <span className="bg-google-gray-100 px-2 py-0.5 rounded">Course</span>
                  </div>
                  <h3 className="text-sm font-bold text-google-gray-900 mb-1">
                    Gemini for Data Scientists and Analysts
                  </h3>
                  <p className="text-xs text-google-gray-600 line-clamp-2 mb-3">
                    In this course, you learn how Gemini, a generative AI-powered collaborator from Google Cloud, helps analyze customer data...
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-google-gray-100 text-xs text-google-gray-600">
                  <span>⏱️ 2 hours</span>
                  <button className="w-7 h-7 rounded-full bg-google-blue-light hover:bg-google-blue text-google-blue hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <button 
                onClick={() => onNavigateToView('catalog')}
                className="text-xs font-semibold text-google-blue hover:underline"
              >
                View all activities &gt;
              </button>
            </div>
          </div>

          {/* SUPERCHARGED COMPONENT 1: Divergent Elective Skill Extraction & Interest Vector Engine */}
          <div className="bg-white rounded-2xl border-2 border-indigo-200 p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Automated Skill Extraction Engine
            </div>

            <div className="mb-4">
              <h3 className="text-base font-bold text-google-gray-900 flex items-center">
                <Compass className="w-5 h-5 text-indigo-600 mr-2" />
                Divergent Elective Interest Vectors: Georgia Tech ITM + CS Minor
              </h3>
              <p className="text-xs text-google-gray-600 mt-1 leading-relaxed">
                Our semantic parser analyzed your specialized Georgia Tech electives. Contrasting your <strong>Psychology elective (PSYC 6010)</strong> against your <strong>Engineering elective (ME 6101)</strong> reveals two distinct career divergence trajectories:
              </p>
            </div>

            {/* Interactive Vector Selector Switch */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <button
                onClick={() => setSelectedTrack('track_x')}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  selectedTrack === 'track_x'
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-google-gray-200 hover:border-google-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                    Elective: PSYC 6010
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">
                    Match: {electiveDivergenceComparison.trackX.divergenceScore}%
                  </span>
                </div>
                <h4 className="text-sm font-bold text-google-gray-900 mb-1">
                  {electiveDivergenceComparison.trackX.trackName}
                </h4>
                <p className="text-xs text-google-gray-600 mb-2">
                  Cognitive Task Analysis • Human-AI Alignment • Usability
                </p>
                <div className="text-[11px] font-semibold text-indigo-900">
                  Target Role: Director of AI Product Management
                </div>
              </button>

              <button
                onClick={() => setSelectedTrack('track_y')}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  selectedTrack === 'track_y'
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-google-gray-200 hover:border-google-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    Elective: ME 6101
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">
                    Match: {electiveDivergenceComparison.trackY.divergenceScore}%
                  </span>
                </div>
                <h4 className="text-sm font-bold text-google-gray-900 mb-1">
                  {electiveDivergenceComparison.trackY.trackName}
                </h4>
                <p className="text-xs text-google-gray-600 mb-2">
                  Distributed Systems • Fault Tolerance • Pipeline Scale
                </p>
                <div className="text-[11px] font-semibold text-blue-900">
                  Target Role: Staff Cloud Solutions Architect
                </div>
              </button>
            </div>

            {/* Active Vector Deep-Dive Panel */}
            <div className="bg-google-gray-50 rounded-xl p-4 border border-google-gray-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-google-gray-900">
                    Active Vector: {trackData.trackLabel}
                  </span>
                  <span className="text-xs text-google-gray-600 ml-2">
                    (Derived from {trackData.electiveCode}: {trackData.electiveTitle})
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Projected Median TC: {trackData.projectedMedianTC}</span>
                </div>
              </div>

              {/* Extracted Core Competencies */}
              <div>
                <p className="text-[11px] font-semibold text-google-gray-700 uppercase mb-1.5">
                  Extracted Core Competencies:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {trackData.focusAreas.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 bg-white border border-google-gray-300 rounded-md text-xs font-medium text-google-gray-800 shadow-2xs"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => onNavigateToView('readiness')}
                  className="px-3.5 py-1.5 bg-google-blue hover:bg-google-blue-hover text-white text-xs font-semibold rounded-lg shadow-sm flex items-center space-x-1.5"
                >
                  <span>Analyze Readiness Delta for this Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Transcript Details & Parsed Course Ledger */}
          <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-google-gray-900">
                  Parsed Academic Record: Emmett Wolland (Scheller College of Business)
                </h3>
                <p className="text-xs text-google-gray-600">
                  Extracted from Banner Registrar API ({profile.courses.length} courses authenticated in database)
                </p>
              </div>
              <span className="text-xs font-semibold text-google-blue bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                42 Credit Hours Verified
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-google-gray-200 text-google-gray-500 font-semibold">
                    <th className="pb-2">Course Code</th>
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Credits</th>
                    <th className="pb-2">Grade</th>
                    <th className="pb-2">Extracted Skill Signatures</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-google-gray-100">
                  {profile.courses.map((course) => (
                    <tr key={course.id} className="hover:bg-google-gray-50">
                      <td className="py-2.5 font-bold text-google-gray-900">{course.code}</td>
                      <td className="py-2.5 text-google-gray-800 font-medium">{course.title}</td>
                      <td className="py-2.5 text-google-gray-600">{course.credits.toFixed(1)}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[11px]">
                          {course.grade}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <div className="flex flex-wrap gap-1 max-w-sm">
                          {course.extractedSkills.slice(0, 2).map((s, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-google-gray-100 text-google-gray-700 rounded text-[10px]">
                              {s}
                            </span>
                          ))}
                          {course.extractedSkills.length > 2 && (
                            <span className="text-[10px] text-google-gray-500 self-center">
                              +{course.extractedSkills.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Certifications, Streak, Achievements, Progress (from screenshot) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Certifications & Badges Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => onNavigateToView('stackable')}
              className="bg-white rounded-2xl border border-google-gray-200 p-4 shadow-sm hover:shadow-google-hover transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-google-gray-600">Certifications</p>
                <p className="text-2xl font-bold text-google-gray-900 mt-1">1</p>
                <p className="text-[10px] text-google-blue font-medium mt-0.5">1 pending lab</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-google-gray-100 flex items-center justify-center text-google-gray-600">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => onNavigateToView('catalog')}
              className="bg-white rounded-2xl border border-google-gray-200 p-4 shadow-sm hover:shadow-google-hover transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-google-gray-600">Badges</p>
                <p className="text-2xl font-bold text-google-gray-900 mt-1">4</p>
                <p className="text-[10px] text-emerald-600 font-medium mt-0.5">+2 this month</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-google-gray-100 flex items-center justify-center text-google-gray-600">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Current Streak Widget */}
          <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl font-extrabold text-google-gray-900">5</div>
              <div className="flex items-center text-orange-500 font-semibold text-xs">
                <Flame className="w-4 h-4 fill-orange-500 mr-1" />
                <span>Current streak</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'].map((day, i) => (
                <div key={day} className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold mb-1 ${
                    i < 5 
                      ? 'bg-orange-50 border-orange-400 text-orange-600' 
                      : 'border-google-gray-300 text-google-gray-400'
                  }`}>
                    {i < 5 ? '✓' : ''}
                  </div>
                  <span className="text-[10px] text-google-gray-600">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Widget */}
          <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-google-gray-900">Achievements</h4>
              <button className="text-google-gray-400 hover:text-google-gray-600">
                <Settings2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-google-gray-200 rounded-xl p-3 text-center flex flex-col items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                  <Award className="w-7 h-7" />
                </div>
                <p className="text-xs font-semibold text-google-gray-800 mb-2">Path enroll</p>
                <button className="w-full py-1 text-[11px] font-medium bg-google-blue text-white rounded-full hover:bg-google-blue-hover transition-colors">
                  Claim
                </button>
              </div>

              <div className="border border-google-gray-200 rounded-xl p-3 text-center flex flex-col items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Sparkles className="w-7 h-7" />
                </div>
                <p className="text-xs font-semibold text-google-gray-800 mb-2">Get started</p>
                <button className="w-full py-1 text-[11px] font-medium bg-google-blue text-white rounded-full hover:bg-google-blue-hover transition-colors">
                  Claim
                </button>
              </div>
            </div>
          </div>

          {/* Quick Jump to Jobs Portal */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-indigo-700" />
              <h4 className="text-xs font-bold text-indigo-950 uppercase">
                Jobs for ITM + CS Minor
              </h4>
            </div>
            <p className="text-xs text-google-gray-700">
              5 high-match requisitions found on <strong>Jobs.com</strong> and <strong>Google Careers</strong>.
            </p>
            <button
              onClick={() => onNavigateToView('jobs')}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1"
            >
              <span>Explore Jobs &amp; Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress Breakdown Widget */}
          <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-sm">
            <h4 className="text-sm font-bold text-google-gray-900 mb-3">Learning Progress</h4>
            
            <div className="grid grid-cols-2 gap-y-2 text-xs text-google-gray-700 mb-4">
              <div className="flex justify-between pr-2">
                <span>📘 Course</span>
                <strong className="text-google-gray-900">4</strong>
              </div>
              <div className="flex justify-between pl-2">
                <span>🧪 Lab</span>
                <strong className="text-google-gray-900">3</strong>
              </div>
              <div className="flex justify-between pr-2">
                <span>🛡️ Quest</span>
                <strong className="text-google-gray-900">1</strong>
              </div>
              <div className="flex justify-between pl-2">
                <span>📖 Lesson</span>
                <strong className="text-google-gray-900">12</strong>
              </div>
              <div className="flex justify-between pr-2">
                <span>🏫 Classroom</span>
                <strong className="text-google-gray-900">2</strong>
              </div>
              <div className="flex justify-between pl-2">
                <span>🔀 Path</span>
                <strong className="text-google-gray-900">1</strong>
              </div>
            </div>

            <button 
              onClick={() => onNavigateToView('readiness')}
              className="w-full py-2 bg-google-gray-100 hover:bg-google-gray-200 text-google-gray-800 text-xs font-semibold rounded-lg transition-colors"
            >
              View detailed progress
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
