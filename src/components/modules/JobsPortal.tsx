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
  Mic,
  ShieldCheck,
  Sparkles,
  Award,
  Zap,
  FileText,
  Copy,
  Check,
  X,
  Send,
  UserCheck
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
  
  // Fast-track recruiter state
  const [googleReferralRequested, setGoogleReferralRequested] = useState<boolean>(false);
  const [jobsComPacketSubmitted, setJobsComPacketSubmitted] = useState<boolean>(false);
  
  // ATS Resume Tailoring Modal state
  const [selectedJobForAts, setSelectedJobForAts] = useState<JobPosting | null>(null);
  const [copiedBullets, setCopiedBullets] = useState<boolean>(false);
  const [packetSubmittedForJob, setPacketSubmittedForJob] = useState<string | null>(null);

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

  const handleCopyBullets = (bulletsText: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(bulletsText);
    }
    setCopiedBullets(true);
    setTimeout(() => setCopiedBullets(false), 2500);
  };

  const getTailoredBullets = (job: JobPosting) => {
    return [
      `Architected scalable analytical workflows integrating Georgia Tech MGT 4058 database systems with Google Cloud BigQuery, directly aligning with ${job.company}'s requirements for ${job.title}.`,
      `Engineered robust algorithmic solutions utilizing CS 1332 data structures and systems fundamentals (CS 2110), maintaining a 3.91 GPA across Georgia Tech ITM and Computer Science coursework.`,
      `Synthesized cross-functional business strategy (MGT 6500) and user ergonomics (PSYC 6010) to optimize system delivery pipelines, closing key readiness gaps in ${job.bridgeCourse.title}.`
    ];
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-[11px] font-bold bg-blue-50 text-google-blue border border-blue-200 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-google-blue" />
              Direct Recruiter Fast-Track Active
            </span>
            <span className="text-xs text-google-gray-500 font-mono">
              Jobs.com • Google Careers • Lightcast
            </span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-google-gray-900 mt-1">
            Career Opportunities &amp; Verified Recruiter Pipeline
          </h1>
          <p className="text-xs text-google-gray-600">
            Tailored specifically for <strong>{currentUserProfile.name}</strong> ({currentUserProfile.concentration} • Minor in {currentUserProfile.minor} • Georgia Tech 3.91 GPA).
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto">
          <span className="text-xs text-google-gray-500 hidden sm:inline">Verification:</span>
          <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            GT Banner Transcript Verified
          </span>
        </div>
      </div>

      {/* RECRUITER FAST-TRACK & ATS PIPELINE CARD */}
      <div className="bg-white border border-blue-200 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-google-gray-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-google-blue flex items-center justify-center border border-blue-200">
              <Award className="w-4 h-4 text-google-blue" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-google-gray-900">
                  Verified Recruiter Fast-Track Network
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  3 Direct Pathways Unlocked
                </span>
              </div>
              <p className="text-[11px] text-google-gray-600">
                Your 3.91 GPA, Scheller ITM concentration, and CS Minor coursework bypass standard applicant ATS queues at partner employers.
              </p>
            </div>
          </div>
          <span className="text-[11px] text-google-gray-500 font-mono self-start sm:self-auto">
            Synced with google-skills-ui-db
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Recruiter Pathway 1: Google Cloud APM */}
          <div className="bg-google-gray-50 border border-google-gray-200 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-google-gray-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-google-blue"></span>
                  Google Cloud University Talent Fast-Track
                </span>
                <span className="text-[10px] bg-blue-100 text-google-blue font-bold px-1.5 py-0.5 rounded">
                  APM &amp; Solutions
                </span>
              </div>
              <p className="text-[11px] text-google-gray-600 leading-relaxed">
                Direct screening referral for <strong>Associate Product Manager (APM)</strong> &amp; <strong>Cloud Solutions Consultant</strong> based on verified CS 1332 + MGT 4058 credentials.
              </p>
            </div>

            <div className="pt-2 border-t border-google-gray-200 flex items-center justify-between text-xs">
              <span className="text-google-gray-500 text-[10px]">
                Target: Atlanta &amp; Mountain View
              </span>
              <button
                onClick={() => setGoogleReferralRequested(true)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                  googleReferralRequested
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-google-blue hover:bg-google-blue-hover text-white shadow-2xs'
                }`}
              >
                {googleReferralRequested ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-700" />
                    <span>✓ Referral Requested</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>Request Google Recruiter Intro</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Recruiter Pathway 2: Jobs.com Enterprise AI Consortium */}
          <div className="bg-google-gray-50 border border-google-gray-200 rounded-xl p-3.5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-google-gray-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  Jobs.com Enterprise AI Partner Consortium
                </span>
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">
                  Priority Review
                </span>
              </div>
              <p className="text-[11px] text-google-gray-600 leading-relaxed">
                Guaranteed human recruiter review for <strong>Technical Product Analyst</strong> &amp; <strong>Enterprise AI Associate</strong> roles, bypassing automated filter drops.
              </p>
            </div>

            <div className="pt-2 border-t border-google-gray-200 flex items-center justify-between text-xs">
              <span className="text-google-gray-500 text-[10px]">
                Target: Remote &amp; Hybrid Hubs
              </span>
              <button
                onClick={() => setJobsComPacketSubmitted(true)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                  jobsComPacketSubmitted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-2xs'
                }`}
              >
                {jobsComPacketSubmitted ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-700" />
                    <span>✓ Fast-Track Packet Sent</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3 h-3" />
                    <span>Submit Verified Packet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

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
          const isFastTrackQualified = job.matchScore >= 85;

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs hover:shadow-google-hover transition-all space-y-3.5"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      job.source === 'Google Careers' ? 'bg-blue-50 text-blue-800' :
                      job.source === 'Jobs.com' ? 'bg-purple-50 text-purple-800' :
                      'bg-emerald-50 text-emerald-800'
                    }`}>
                      {job.source}
                    </span>
                    {isFastTrackQualified && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 text-emerald-600 fill-emerald-600" />
                        Fast-Track Recruiter Referral Qualified
                      </span>
                    )}
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

                <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                  {/* FEATURE 1: Launch Mock Interview for this job */}
                  <button
                    onClick={() => onLaunchMockInterview && onLaunchMockInterview(job.title)}
                    className="px-3 py-1.5 bg-white hover:bg-blue-50 border border-blue-300 text-google-blue rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <Mic className="w-3 h-3" />
                    <span>AI Mock Interview</span>
                  </button>

                  {/* ATS Resume Tailor button */}
                  <button
                    onClick={() => setSelectedJobForAts(job)}
                    className="px-3 py-1.5 bg-white hover:bg-purple-50 border border-purple-300 text-purple-700 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <FileText className="w-3 h-3" />
                    <span>ATS Resume Tailor</span>
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

      {/* ATS RESUME KEYWORD TAILOR & RECRUITER PACKET MODAL */}
      {selectedJobForAts && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-google-gray-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-google-gray-200 flex items-center justify-between bg-google-gray-50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-google-blue flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-google-gray-900">
                    ATS Resume Keyword Optimizer &amp; Recruiter Packet
                  </h3>
                  <p className="text-xs text-google-gray-500">
                    {selectedJobForAts.title} • {selectedJobForAts.company}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJobForAts(null)}
                className="p-1 rounded-lg hover:bg-google-gray-200 text-google-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              {/* ATS Parser Compatibility Score */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-google-blue uppercase tracking-wider block">
                    ATS Parser Compatibility
                  </span>
                  <span className="text-sm font-medium text-google-gray-800">
                    Tuned for Workday, Greenhouse &amp; Google Hire parsing algorithms
                  </span>
                </div>
                <div className="text-2xl font-black text-google-blue bg-white px-3 py-1 rounded-xl border border-blue-200 shadow-2xs">
                  {selectedJobForAts.matchScore}%
                </div>
              </div>

              {/* Matched Keywords from Transcript */}
              <div>
                <span className="text-xs font-bold text-google-gray-800 block mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Transcript Keywords Injected into Resume:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJobForAts.matchedSkills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium">
                    ✓ Georgia Tech ITM (3.91 GPA)
                  </span>
                  <span className="px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium">
                    ✓ Computer Science Minor
                  </span>
                </div>
              </div>

              {/* Recommended Injections for 100% Score */}
              <div>
                <span className="text-xs font-bold text-google-gray-800 block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Bridge Course Keywords Recommended to Complete ATS Match:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJobForAts.missingSkills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs font-medium"
                    >
                      + {skill}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-blue-50 border border-blue-200 text-google-blue rounded-lg text-xs font-medium">
                    + Bridge: {selectedJobForAts.bridgeCourse.title}
                  </span>
                </div>
              </div>

              {/* Tailored Bullet Points Ready to Copy */}
              <div className="bg-google-gray-50 border border-google-gray-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-google-gray-900">
                    Tailored Resume Bullets for Emmett Wolland
                  </span>
                  <button
                    onClick={() => handleCopyBullets(getTailoredBullets(selectedJobForAts).join('\n• '))}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                      copiedBullets
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-google-gray-300 hover:bg-google-gray-100 text-google-gray-700'
                    }`}
                  >
                    {copiedBullets ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Bullets</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-google-gray-700 font-sans bg-white p-3 rounded-lg border border-google-gray-200 leading-relaxed">
                  {getTailoredBullets(selectedJobForAts).map((bullet, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-google-blue font-bold">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Fast-Track Recruiter Packet Submission */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">
                    Campus Recruiter Fast-Track Packet
                  </span>
                  <span className="text-[11px] text-emerald-700">
                    Includes verified GT transcript (3.91 GPA), Google Cloud skill proofs &amp; tailored resume.
                  </span>
                </div>
                <button
                  onClick={() => setPacketSubmittedForJob(selectedJobForAts.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                    packetSubmittedForJob === selectedJobForAts.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {packetSubmittedForJob === selectedJobForAts.id ? (
                    <>
                      <Check className="w-3 h-3 text-white" />
                      <span>Packet Submitted</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      <span>Submit to Recruiter</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-google-gray-200 bg-google-gray-50 flex items-center justify-between">
              <span className="text-[11px] text-google-gray-500 font-mono">
                Candidate ID: EW-GT-ITM-CS (Verified)
              </span>
              <button
                onClick={() => setSelectedJobForAts(null)}
                className="px-4 py-1.5 bg-google-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
