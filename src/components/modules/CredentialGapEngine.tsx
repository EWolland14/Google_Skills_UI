import React, { useState } from 'react';
import { 
  Award, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  TrendingUp, 
  GraduationCap, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { StackableCredential, TargetJob } from '../../types';
import { stackableCredentialsList, targetJobsDatabase } from '../../data/mockData';

interface CredentialGapEngineProps {
  onNavigateToView: (view: string) => void;
  initialJobId?: string;
}

export const CredentialGapEngine: React.FC<CredentialGapEngineProps> = ({ 
  onNavigateToView,
  initialJobId = 'job-1'
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(initialJobId);
  const [enrolledBridgeCourses, setEnrolledBridgeCourses] = useState<string[]>([]);

  const selectedJob = targetJobsDatabase.find(j => j.id === selectedJobId) || targetJobsDatabase[0];

  const handleEnrollBridge = (title: string) => {
    if (!enrolledBridgeCourses.includes(title)) {
      setEnrolledBridgeCourses([...enrolledBridgeCourses, title]);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-purple-100 text-purple-800 rounded-full">
                Module 2 Engine
              </span>
              <span className="text-xs text-google-gray-500">Degree Audit & Skill Distance Matrix</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-google-gray-900 mt-1">
              Credential Stackability & Readiness Delta Engine
            </h1>
            <p className="text-xs md:text-sm text-google-gray-600 mt-1">
              Automated audit of completed Georgia Tech MBA records paired with Google Skills competencies. Discovers credentials you are close to earning and computes exact skill deltas for target roles.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigateToView('roi')}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>View Financial ROI Projections</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: Stackable Credentials & Minor Closeness Recommender */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-google-blue" />
            <h2 className="text-lg font-bold text-google-gray-900">
              Stackable Credentials & Minors You Are Close to Earning
            </h2>
          </div>
          <span className="text-xs text-google-gray-600">
            Computed from 7 completed courses
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stackableCredentialsList.map((cred) => {
            const isNearCompletion = cred.percentageComplete >= 70;
            return (
              <div 
                key={cred.id}
                className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-sm hover:shadow-google-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      cred.type === 'graduate_certificate' ? 'bg-amber-100 text-amber-800' :
                      cred.type === 'minor' ? 'bg-indigo-100 text-indigo-800' :
                      cred.type === 'cloud_credential' ? 'bg-blue-100 text-google-blue' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {cred.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs font-extrabold text-google-gray-900">
                      {cred.percentageComplete}%
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-google-gray-900 leading-snug mb-1">
                    {cred.name}
                  </h3>
                  <p className="text-[11px] text-google-gray-600 mb-3">
                    Issued by: {cred.issuer}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-google-gray-200 h-2 rounded-full overflow-hidden mb-3">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isNearCompletion ? 'bg-emerald-500' : 'bg-google-blue'
                      }`}
                      style={{ width: `${cred.percentageComplete}%` }}
                    />
                  </div>

                  <div className="text-xs text-google-gray-700 space-y-1 mb-4">
                    <div className="flex justify-between text-[11px]">
                      <span>Courses Completed:</span>
                      <strong className="text-google-gray-900">{cred.completedCoursesCount} of {cred.totalCoursesRequired}</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Remaining to Earn:</span>
                      <span className="font-semibold text-amber-700">
                        {cred.totalCoursesRequired - cred.completedCoursesCount} course
                      </span>
                    </div>
                  </div>

                  {/* Next Step Pill */}
                  <div className="bg-google-gray-50 border border-google-gray-200 rounded-lg p-2.5 text-[11px] space-y-1">
                    <div className="font-semibold text-google-gray-900">
                      Required Next:
                    </div>
                    {cred.remainingCourses.map((rc, idx) => (
                      <div key={idx} className="text-google-gray-700 leading-tight">
                        <strong>{rc.code}</strong>: {rc.title}
                        <div className="text-[10px] text-google-blue font-medium mt-0.5">
                          ⏱️ {rc.estimatedHours}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-google-gray-100">
                  <button 
                    onClick={() => onNavigateToView('catalog')}
                    className="w-full py-1.5 bg-google-blue-light hover:bg-google-blue text-google-blue hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>Enroll Remaining</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Dynamic "Readiness Delta" View */}
      <div className="bg-white rounded-2xl border-2 border-google-blue/30 p-6 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-google-gray-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-google-blue" />
              <h2 className="text-lg font-bold text-google-gray-900">
                Interactive "Readiness Delta" View
              </h2>
            </div>
            <p className="text-xs text-google-gray-600 mt-0.5">
              Select a target executive or technical role to inspect exact readiness, verified competencies, and targeted bridge curriculum.
            </p>
          </div>

          {/* Role selector dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-google-gray-700">Target Role:</span>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="px-3 py-1.5 bg-white border border-google-gray-300 rounded-lg text-xs font-bold text-google-gray-900 focus:outline-none focus:ring-2 focus:ring-google-blue shadow-sm"
            >
              {targetJobsDatabase.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.level})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Role Overview Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <span className="text-xs font-semibold text-google-gray-600 uppercase tracking-wider">
              Target Position
            </span>
            <h3 className="text-base font-bold text-google-gray-900 mt-0.5">
              {selectedJob.title}
            </h3>
            <p className="text-xs text-google-gray-600">{selectedJob.department} • {selectedJob.level}</p>
          </div>

          <div>
            <span className="text-xs font-semibold text-google-gray-600 uppercase tracking-wider">
              Market Demand
            </span>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <strong className="text-sm font-bold text-emerald-800">{selectedJob.marketDemand}</strong>
            </div>
            <p className="text-[11px] text-google-gray-600">850k+ active aggregator signals</p>
          </div>

          <div>
            <span className="text-xs font-semibold text-google-gray-600 uppercase tracking-wider">
              Compensation Benchmark
            </span>
            <div className="text-base font-bold text-google-gray-900 mt-0.5">
              {selectedJob.medianSalary}
            </div>
            <span className="text-xs font-semibold text-emerald-700">
              Top Band: {selectedJob.topSalaryBand}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center bg-white rounded-xl p-3 border border-blue-200 shadow-sm">
            <span className="text-[11px] font-bold text-google-gray-600 uppercase">
              Current Readiness Score
            </span>
            <div className="text-3xl font-extrabold text-google-blue my-0.5">
              {selectedJob.matchScore}%
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              Delta: {100 - selectedJob.matchScore}% remaining
            </span>
          </div>
        </div>

        {/* Competency Comparison: Acquired vs Readiness Delta Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Acquired Competencies (Green) */}
          <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/30">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h4 className="text-sm font-bold text-emerald-900">
                Acquired Competencies ({selectedJob.acquiredSkills.length} Verified)
              </h4>
            </div>
            <p className="text-xs text-google-gray-600 mb-3">
              Matched from your authenticated Georgia Tech transcript & Google Skills completions:
            </p>
            <ul className="space-y-2">
              {selectedJob.acquiredSkills.map((skill, idx) => (
                <li key={idx} className="flex items-start text-xs text-google-gray-800 bg-white p-2 rounded-lg border border-emerald-100 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Readiness Delta Gaps (Red/Amber) */}
          <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/30">
            <div className="flex items-center space-x-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h4 className="text-sm font-bold text-amber-900">
                Readiness Delta Gaps ({selectedJob.gapSkills.length} Missing Competencies)
              </h4>
            </div>
            <p className="text-xs text-google-gray-600 mb-3">
              Critical competency gaps identified by Google Careers & Jobs.com job requisition requirements:
            </p>
            <ul className="space-y-2">
              {selectedJob.gapSkills.map((gap, idx) => (
                <li key={idx} className="flex items-start text-xs text-google-gray-800 bg-white p-2 rounded-lg border border-amber-100 shadow-2xs">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Targeted Bridge Curriculum (Direct 1-Click Enrollment) */}
        <div className="border-t border-google-gray-200 pt-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-google-gray-900 flex items-center">
                <Sparkles className="w-4 h-4 text-google-blue mr-1.5" />
                Prescribed Bridge Curriculum to Close 100% of Readiness Delta
              </h4>
              <p className="text-xs text-google-gray-600">
                Complete these 3 recommended modules to close the remaining {100 - selectedJob.matchScore}% gap and qualify directly for interviews:
              </p>
            </div>
            <span className="text-xs font-semibold text-google-blue bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Estimated completion: ~22 hours
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedJob.bridgeCourses.map((bridge, idx) => {
              const isEnrolled = enrolledBridgeCourses.includes(bridge.title);
              return (
                <div 
                  key={idx}
                  className="bg-google-gray-50 border border-google-gray-200 rounded-xl p-4 flex flex-col justify-between hover:bg-white hover:border-google-blue transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold mb-2">
                      <span className="px-2 py-0.5 bg-blue-100 text-google-blue rounded">
                        {bridge.type}
                      </span>
                      <span className="text-google-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {bridge.duration}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-google-gray-900 mb-2">
                      {bridge.title}
                    </h5>
                  </div>

                  <button
                    onClick={() => handleEnrollBridge(bridge.title)}
                    className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 ${
                      isEnrolled 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-google-blue hover:bg-google-blue-hover text-white'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Enrolled In Progress</span>
                      </>
                    ) : (
                      <>
                        <span>Enroll in Bridge Lab</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
