import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  Award, 
  Flame, 
  BrainCircuit, 
  Settings2,
  GraduationCap,
  Briefcase,
  Edit3,
  CheckCircle2,
  Compass,
  TrendingUp,
  BookOpen
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
  const [profile] = useState<TranscriptProfile>(initialTranscriptProfile);
  const [selectedTrack, setSelectedTrack] = useState<'track_x' | 'track_y'>('track_x');
  const [dashboardTab, setDashboardTab] = useState<'activities' | 'divergence' | 'transcript'>('activities');

  const trackData: ElectiveDivergence = 
    selectedTrack === 'track_x' 
      ? electiveDivergenceComparison.trackX 
      : electiveDivergenceComparison.trackY;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Clean Academic Profile Banner */}
      <div className="bg-white border border-google-gray-200 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-black text-sm flex-shrink-0">
            GT
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-google-gray-900">{userProfile.name}</h1>
              <span className="text-[11px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-semibold">
                Official Transcript Verified
              </span>
            </div>
            <p className="text-xs text-google-gray-600 mt-0.5">
              {userProfile.major} (<strong>{userProfile.concentration}</strong>) • Minor in <strong className="text-google-blue">{userProfile.minor}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto">
          <button
            onClick={onOpenProfileSetup}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-google-gray-700 bg-google-gray-50 hover:bg-google-gray-100 border border-google-gray-200 rounded-lg transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => onNavigateToView('jobs')}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-google-blue hover:bg-google-blue-hover rounded-lg shadow-2xs transition-colors"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Jobs for ITM + CS</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout (Matching Google Skills Reference Image) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Hero Module & Content Tabs */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Featured Hero Card (exact replica of Google Skills reference screenshot) */}
          <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs flex flex-col md:flex-row items-center gap-5">
            <div className="w-full md:w-5/12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 flex flex-col items-center justify-center border border-blue-100 min-h-[140px] text-center">
              <BrainCircuit className="w-10 h-10 text-google-blue mb-2" />
              <span className="text-xs font-medium text-google-gray-700">Gemini for data professionals</span>
            </div>

            <div className="w-full md:w-7/12 space-y-2">
              <p className="text-xs text-google-blue font-medium cursor-pointer hover:underline">
                Integrate Generative AI Into Your Data Workflow &gt; Gemini for Data Scientists and Analysts
              </p>
              <h2 className="text-base md:text-lg font-bold text-google-gray-900 leading-snug">
                Introducing Gemini for data professionals
              </h2>
              <div className="flex items-center space-x-2 text-xs text-google-gray-500">
                <span>⏱️ 6 minutes</span>
                <span>•</span>
                <span className="text-emerald-700 font-medium">Recommended for ITM Core</span>
              </div>
              <div className="pt-2">
                <button className="px-5 py-1.5 bg-google-blue hover:bg-google-blue-hover text-white text-xs font-medium rounded-full shadow-2xs flex items-center space-x-1.5 transition-colors">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Start</span>
                </button>
              </div>
            </div>
          </div>

          {/* Clean Dashboard Content Tabs */}
          <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs space-y-5">
            
            {/* Tab Bar */}
            <div className="flex items-center space-x-6 border-b border-google-gray-200 pb-2">
              <button
                onClick={() => setDashboardTab('activities')}
                className={`text-xs md:text-sm font-semibold pb-2 border-b-2 transition-colors ${
                  dashboardTab === 'activities'
                    ? 'border-google-blue text-google-blue'
                    : 'border-transparent text-google-gray-500 hover:text-google-gray-800'
                }`}
              >
                Activities &amp; Paths
              </button>
              <button
                onClick={() => setDashboardTab('divergence')}
                className={`text-xs md:text-sm font-semibold pb-2 border-b-2 transition-colors ${
                  dashboardTab === 'divergence'
                    ? 'border-google-blue text-google-blue'
                    : 'border-transparent text-google-gray-500 hover:text-google-gray-800'
                }`}
              >
                Elective Career Divergence
              </button>
              <button
                onClick={() => setDashboardTab('transcript')}
                className={`text-xs md:text-sm font-semibold pb-2 border-b-2 transition-colors ${
                  dashboardTab === 'transcript'
                    ? 'border-google-blue text-google-blue'
                    : 'border-transparent text-google-gray-500 hover:text-google-gray-800'
                }`}
              >
                Georgia Tech Transcript ({profile.courses.length})
              </button>
            </div>

            {/* TAB 1: Authentic 2x2 Grid from Google Skills Screenshot */}
            {dashboardTab === 'activities' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-google-gray-200 rounded-xl p-4 hover:border-google-blue/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5 text-[10px] font-semibold text-purple-700 mb-1">
                        <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">Featured</span>
                        <span className="bg-google-gray-100 text-google-gray-600 px-1.5 py-0.5 rounded">Path</span>
                      </div>
                      <h3 className="text-xs md:text-sm font-bold text-google-gray-900 mb-1 leading-snug">
                        Integrate Generative AI Into Your Data Workflow
                      </h3>
                      <p className="text-[11px] text-google-gray-600 line-clamp-2 mb-3">
                        This learning path is for data professionals who want to integrate generative AI into their workflow. Learn BigQuery Machine...
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-google-gray-100 text-xs text-google-gray-500">
                      <span>⏱️ 12 hours 20 mins</span>
                      <button 
                        onClick={() => onNavigateToView('catalog')}
                        className="w-7 h-7 rounded-full bg-google-blue-light hover:bg-google-blue text-google-blue hover:text-white flex items-center justify-center transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="border border-google-gray-200 rounded-xl p-4 hover:border-google-blue/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5 text-[10px] font-semibold text-purple-700 mb-1">
                        <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">Featured</span>
                        <span className="bg-google-gray-100 text-google-gray-600 px-1.5 py-0.5 rounded">Path</span>
                      </div>
                      <h3 className="text-xs md:text-sm font-bold text-google-gray-900 mb-1 leading-snug">
                        Deploy and Manage Generative AI Models
                      </h3>
                      <p className="text-[11px] text-google-gray-600 line-clamp-2 mb-3">
                        Provides a comprehensive introduction to machine learning operations (MLOps) with a specific focus on generative AI...
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-google-gray-100 text-xs text-google-gray-500">
                      <span>⏱️ 18 hours 30 mins</span>
                      <button 
                        onClick={() => onNavigateToView('catalog')}
                        className="w-7 h-7 rounded-full bg-google-blue-light hover:bg-google-blue text-google-blue hover:text-white flex items-center justify-center transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="border border-google-gray-200 rounded-xl p-4 hover:border-google-blue/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5 text-[10px] font-semibold text-purple-700 mb-1">
                        <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">Featured</span>
                        <span className="bg-google-gray-100 text-google-gray-600 px-1.5 py-0.5 rounded">Path</span>
                      </div>
                      <h3 className="text-xs md:text-sm font-bold text-google-gray-900 mb-1 leading-snug">
                        Build and Modernize Applications With Generative AI
                      </h3>
                      <p className="text-[11px] text-google-gray-600 line-clamp-2 mb-3">
                        Enhance applications with the power of generative AI. From understanding foundation models to building agentic pipelines...
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-google-gray-100 text-xs text-google-gray-500">
                      <span>⏱️ 22 hours 1 min</span>
                      <button 
                        onClick={() => onNavigateToView('catalog')}
                        className="w-7 h-7 rounded-full bg-google-blue-light hover:bg-google-blue text-google-blue hover:text-white flex items-center justify-center transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="border border-google-gray-200 rounded-xl p-4 hover:border-google-blue/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5 text-[10px] font-semibold text-google-gray-700 mb-1">
                        <span className="bg-google-gray-100 px-1.5 py-0.5 rounded">Course</span>
                      </div>
                      <h3 className="text-xs md:text-sm font-bold text-google-gray-900 mb-1 leading-snug">
                        Gemini for Data Scientists and Analysts
                      </h3>
                      <p className="text-[11px] text-google-gray-600 line-clamp-2 mb-3">
                        Learn how Gemini helps analyze customer data, optimize SQL transformations, and uncover predictive insights...
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-google-gray-100 text-xs text-google-gray-500">
                      <span>⏱️ 2 hours</span>
                      <button 
                        onClick={() => onNavigateToView('catalog')}
                        className="w-7 h-7 rounded-full bg-google-blue-light hover:bg-google-blue text-google-blue hover:text-white flex items-center justify-center transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button 
                    onClick={() => onNavigateToView('catalog')}
                    className="text-xs font-semibold text-google-blue hover:underline"
                  >
                    View all activities &gt;
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Clean Elective Career Divergence View */}
            {dashboardTab === 'divergence' && (
              <div className="space-y-4">
                <p className="text-xs text-google-gray-600">
                  Select an elective vector to see how your course choices shape your recommended career trajectory:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Track X */}
                  <div
                    onClick={() => setSelectedTrack('track_x')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedTrack === 'track_x'
                        ? 'border-google-blue bg-blue-50/40 ring-1 ring-google-blue'
                        : 'border-google-gray-200 hover:border-google-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-google-blue bg-blue-100 px-2 py-0.5 rounded">
                        PSYC 6010 (Cognitive Engineering)
                      </span>
                      <span className="text-xs font-bold text-emerald-700">89% Match</span>
                    </div>
                    <h4 className="text-sm font-bold text-google-gray-900 mb-1">
                      Track X: Human-Centered AI &amp; Product Strategy
                    </h4>
                    <p className="text-xs text-google-gray-600 mb-2">
                      Human-AI Interaction • Mental Model Alignment • Usability Heuristics
                    </p>
                    <div className="text-xs font-semibold text-google-blue">
                      Target Role: Lead AI Product Manager ($340k TC)
                    </div>
                  </div>

                  {/* Track Y */}
                  <div
                    onClick={() => setSelectedTrack('track_y')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedTrack === 'track_y'
                        ? 'border-google-blue bg-blue-50/40 ring-1 ring-google-blue'
                        : 'border-google-gray-200 hover:border-google-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                        ME 6101 (Systems Architecture)
                      </span>
                      <span className="text-xs font-bold text-emerald-700">92% Match</span>
                    </div>
                    <h4 className="text-sm font-bold text-google-gray-900 mb-1">
                      Track Y: Systems Engineering &amp; MLOps
                    </h4>
                    <p className="text-xs text-google-gray-600 mb-2">
                      Distributed Systems • Fault Tolerance • Pipeline Scale
                    </p>
                    <div className="text-xs font-semibold text-indigo-700">
                      Target Role: Staff Cloud Solutions Architect ($360k TC)
                    </div>
                  </div>
                </div>

                {/* Selected Track Details */}
                <div className="bg-google-gray-50 border border-google-gray-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-google-gray-900">
                      Core Competencies Extracted:
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      Median TC: {trackData.projectedMedianTC}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {trackData.focusAreas.map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white border border-google-gray-200 rounded text-xs text-google-gray-800">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 text-right">
                    <button
                      onClick={() => onNavigateToView('readiness')}
                      className="text-xs font-bold text-google-blue hover:underline"
                    >
                      Inspect Readiness Delta for this Track &gt;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Clean Transcript & Skills Ledger */}
            {dashboardTab === 'transcript' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-google-gray-200 text-google-gray-500 font-semibold">
                      <th className="pb-2">Course Code</th>
                      <th className="pb-2">Title</th>
                      <th className="pb-2">Credits</th>
                      <th className="pb-2">Grade</th>
                      <th className="pb-2">Extracted Competencies</th>
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
            )}

          </div>

        </div>

        {/* Right Column (4 cols): Exact Replica of Google Skills Reference Image */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Stat Tiles: Certifications (1) & Badges (4) */}
          <div className="grid grid-cols-2 gap-3.5">
            <div 
              onClick={() => onNavigateToView('stackable')}
              className="bg-white rounded-2xl border border-google-gray-200 p-4 shadow-2xs hover:shadow-google-hover transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-google-gray-600">Certifications</p>
                <p className="text-2xl font-bold text-google-gray-900 mt-0.5">1</p>
                <p className="text-[10px] text-google-blue font-medium">1 in progress</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-google-gray-100 flex items-center justify-center text-google-gray-600">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div 
              onClick={() => onNavigateToView('catalog')}
              className="bg-white rounded-2xl border border-google-gray-200 p-4 shadow-2xs hover:shadow-google-hover transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-google-gray-600">Badges</p>
                <p className="text-2xl font-bold text-google-gray-900 mt-0.5">4</p>
                <p className="text-[10px] text-emerald-600 font-medium">+2 this month</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-google-gray-100 flex items-center justify-center text-google-gray-600">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Current Streak Widget */}
          <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl font-black text-google-gray-900">5</div>
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
                  <span className="text-[10px] text-google-gray-500">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Card */}
          <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-google-gray-900 uppercase tracking-wider">Achievements</h4>
              <button className="text-google-gray-400 hover:text-google-gray-600">
                <Settings2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-google-gray-200 rounded-xl p-3 text-center flex flex-col items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1.5">
                  <Award className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-google-gray-800 mb-2">Path enroll</p>
                <button className="w-full py-1 text-[11px] font-medium bg-google-blue text-white rounded-full hover:bg-google-blue-hover transition-colors">
                  Claim
                </button>
              </div>

              <div className="border border-google-gray-200 rounded-xl p-3 text-center flex flex-col items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-google-blue mb-1.5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-google-gray-800 mb-2">Get started</p>
                <button className="w-full py-1 text-[11px] font-medium bg-google-blue text-white rounded-full hover:bg-google-blue-hover transition-colors">
                  Claim
                </button>
              </div>
            </div>
          </div>

          {/* Progress Breakdown Card */}
          <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs">
            <h4 className="text-xs font-bold text-google-gray-900 uppercase tracking-wider mb-3">
              Learning Progress
            </h4>
            
            <div className="grid grid-cols-2 gap-y-1.5 text-xs text-google-gray-700 mb-3">
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
            </div>

            <button 
              onClick={() => onNavigateToView('readiness')}
              className="w-full py-1.5 bg-google-gray-100 hover:bg-google-gray-200 text-google-gray-800 text-xs font-semibold rounded-lg transition-colors"
            >
              View readiness details
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
