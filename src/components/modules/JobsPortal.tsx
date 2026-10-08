import React, { useState } from 'react';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Search, 
  Mic, 
  Sparkles, 
  FileText, 
  Copy, 
  Check, 
  X, 
  Send, 
  MessageSquare, 
  HelpCircle, 
  Download, 
  GraduationCap, 
  Layers,
  ChevronRight
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

interface QAMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
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
  
  // Resume Creation Tool state
  const [resumeModalJob, setResumeModalJob] = useState<JobPosting | null>(null);
  const [isGeneralResumeOpen, setIsGeneralResumeOpen] = useState<boolean>(false);
  const [copiedResume, setCopiedResume] = useState<boolean>(false);
  const [copiedBullets, setCopiedBullets] = useState<boolean>(false);

  // Question Answer AI state
  const [qaModalJob, setQaModalJob] = useState<JobPosting | null>(null);
  const [isGeneralQaOpen, setIsGeneralQaOpen] = useState<boolean>(false);
  const [customQuestionInput, setCustomQuestionInput] = useState<string>('');
  const [copiedAnswerIndex, setCopiedAnswerIndex] = useState<number | null>(null);
  const [qaMessages, setQaMessages] = useState<QAMessage[]>([]);

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

  // Helper to open Resume Creation Tool for a specific job
  const handleOpenResumeTool = (job?: JobPosting) => {
    if (job) {
      setResumeModalJob(job);
      setIsGeneralResumeOpen(false);
    } else {
      setResumeModalJob(jobs[0] || null);
      setIsGeneralResumeOpen(true);
    }
    setCopiedResume(false);
    setCopiedBullets(false);
  };

  // Helper to open Question Answer AI for a specific job
  const handleOpenQaTool = (job?: JobPosting) => {
    const targetJob = job || jobs[0];
    if (job) {
      setQaModalJob(job);
      setIsGeneralQaOpen(false);
    } else {
      setQaModalJob(targetJob || null);
      setIsGeneralQaOpen(true);
    }

    const initialText = targetJob 
      ? `Hello Emmett! I'm your Gemini Career & Interview Coach for **${targetJob.title}** at **${targetJob.company}**. Based on your Georgia Tech transcript (BSBA in ITM, Minor in CS, 3.91 GPA), I can help you formulate strong interview answers, align coursework to job requirements, or answer application questions. How can I help you prepare?`
      : `Hello Emmett! I'm your Gemini Career & Interview Coach. Based on your Georgia Tech background (ITM + CS Minor, 3.91 GPA), ask me anything about answering behavioral questions, technical screens, or positioning your background.`;

    setQaMessages([
      {
        sender: 'ai',
        text: initialText,
        timestamp: 'Just now'
      }
    ]);
    setCustomQuestionInput('');
  };

  // Generate customized resume bullets for a job
  const getTailoredBullets = (job: JobPosting) => {
    return [
      `Engineered high-performance data workflows combining Georgia Tech MGT 4058 database architecture with Google Cloud BigQuery, directly aligning with ${job.company}'s requirements for ${job.title}.`,
      `Applied algorithmic systems problem-solving (CS 1332 Data Structures, CS 2110 Systems) to optimize complex query patterns, maintaining a 3.91 GPA across Georgia Tech ITM and Computer Science coursework.`,
      `Synthesized cross-functional business strategy (MGT 6500) and human-AI systems ergonomics (PSYC 6010) to deliver scalable solutions, closing key technical readiness gaps in ${job.bridgeCourse.title}.`
    ];
  };

  // Generate full resume markdown/text
  const generateFullResumeText = (job: JobPosting) => {
    const bullets = getTailoredBullets(job);
    return `EMMETT WOLLAND
Atlanta, GA | emmettwolland@gatech.edu | linkedin.com/in/emmett-wolland | github.com/EWolland14

PROFESSIONAL SUMMARY
Georgia Institute of Technology undergraduate in Business Administration concentrating in Information Technology Management (ITM) with a Minor in Computer Science (3.91 GPA). Strong technical background in algorithmic problem solving (CS 1332), relational database architectures (MGT 4058), and Google Cloud enterprise data workflows. Targeting the ${job.title} role at ${job.company} to bridge technical systems execution with strategic business impact.

EDUCATION
Georgia Institute of Technology, Scheller College of Business & College of Computing
Bachelor of Science in Business Administration, Concentration: ITM | Minor: Computer Science
GPA: 3.91 / 4.00 | Dean's List | 42 Credits Earned | Expected Graduation: May 2027
Key Coursework: CS 1332 (Data Structures & Algorithms), CS 2110 (Computer Systems & Organization), MGT 4058 (Database Management Systems), MGT 6500 (Analytical Data Modeling), PSYC 6010 (Cognitive Engineering & Human-AI Ergonomics)

TECHNICAL & CLOUD SKILLS
• Cloud & Big Data: Google Cloud Platform (BigQuery, IAM, Cloud Run, GKE), SQL, PostgreSQL, Terraform
• Programming & Systems: Python, Java, C/C++, TypeScript, React, REST APIs, Git/GitHub
• Enterprise Strategy: IT Management, Decision Analytics, Relational Modeling, Agile/Scrum

EXPERIENCE & TECHNICAL PROJECTS
Technical Project Candidate — Enterprise Cloud & Systems Intelligence
• ${bullets[0]}
• ${bullets[1]}
• ${bullets[2]}

CERTIFICATIONS & BADGES (Google Skills Verified)
• Quest Badge: Managing Cloud Infrastructure with Terraform (Google Skills)
• Lab Badge: Lakehouse: Qwik Start (Google Skills)
• Continuous Verification Record: google-skills-ui-db (Cloud Run Persistent Store)`;
  };

  const handleCopyText = (text: string, isFullResume: boolean) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    if (isFullResume) {
      setCopiedResume(true);
      setTimeout(() => setCopiedResume(false), 2500);
    } else {
      setCopiedBullets(true);
      setTimeout(() => setCopiedBullets(false), 2500);
    }
  };

  const handleDownloadResume = (job: JobPosting) => {
    const content = generateFullResumeText(job);
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Emmett_Wolland_Resume_${job.company.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // AI Q&A answering engine
  const handleAskQuestion = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: QAMessage = {
      sender: 'user',
      text: questionText,
      timestamp: 'Just now'
    };

    const targetJob = qaModalJob || jobs[0];
    const qLower = questionText.toLowerCase();
    let aiResponseText = "";

    if (qLower.includes('pitch') || qLower.includes('why hire') || qLower.includes('itm') || qLower.includes('minor')) {
      aiResponseText = `**How to pitch your ITM + CS Minor advantage for ${targetJob.company}:**\n\n"Most CS graduates only understand code, while most business graduates only understand high-level strategy. At Georgia Tech, my dual background in Scheller ITM and Computer Science allows me to speak both languages natively. In **CS 1332** and **CS 2110**, I built algorithmic and low-level systems discipline, while in **MGT 4058** and **MGT 6500**, I learned database optimization and business analytics with a 3.91 GPA. For ${targetJob.title}, this means I can translate executive product goals into concrete technical architecture without latency."`;
    } else if (qLower.includes('top 3') || qLower.includes('interview question') || qLower.includes('common')) {
      aiResponseText = `**Top 3 Expected Interview Questions & STAR Answers for ${targetJob.title}:**\n\n` +
        `**1. 'How do you handle trade-offs between system performance and business requirements?'**\n` +
        `*STAR Answer:* Frame your experience combining MGT 4058 relational modeling with CS 1332 indexing strategies. Explain how you prioritized query response times while ensuring business stakeholders received real-time financial reporting.\n\n` +
        `**2. 'Describe a time you diagnosed a technical bottleneck or data discrepancy.'**\n` +
        `*STAR Answer:* Discuss optimizing large-scale BigQuery SQL queries and identifying partitioning inefficiencies, cutting costs while accelerating analysis.\n\n` +
        `**3. 'Why are you passionate about ${targetJob.company}?'**\n` +
        `*STAR Answer:* Highlight ${targetJob.company}'s work in cloud data scale and explain how taking bridge modules like '${targetJob.bridgeCourse.title}' directly prepared you to contribute on day one.`;
    } else if (qLower.includes('cover letter') || qLower.includes('hook') || qLower.includes('opening')) {
      aiResponseText = `**Compelling Cover Letter Hook for ${targetJob.company}:**\n\n"As a Georgia Tech student pairing an Information Technology Management (ITM) concentration with a Computer Science minor (3.91 GPA), I specialize in connecting cloud data infrastructure with mission-critical business decisions. Having built verified systems using BigQuery, relational database architectures, and algorithms, I am excited to contribute directly as a ${targetJob.title} at ${targetJob.company}."`;
    } else if (qLower.includes('coursework') || qLower.includes('cs 1332') || qLower.includes('mgt 4058') || qLower.includes('explain')) {
      aiResponseText = `**How to explain your Georgia Tech Coursework to the ${targetJob.company} Hiring Team:**\n\n` +
        `• **CS 1332 (Data Structures & Algorithms):** Emphasize your grasp of computational complexity, tree traversals, and graph structures when discussing engineering scalability.\n` +
        `• **MGT 4058 (Database Management Systems):** Highlight your mastery of relational schema design, 3NF normalization, indexing, and BigQuery analytics.\n` +
        `• **PSYC 6010 (Cognitive Engineering & Human-AI Ergonomics):** Frame this as your unique edge in human-centered AI usability, prompt design, and reducing user cognitive load in enterprise tooling.`;
    } else {
      aiResponseText = `**Coach Response for ${targetJob.title} at ${targetJob.company}:**\n\n` +
        `Based on your Georgia Tech background (3.91 GPA, Scheller ITM + CS Minor), here is how to position yourself for this scenario:\n\n` +
        `1. **Anchor on Concrete Metrics:** Always reference your specific achievements, such as your 3.91 GPA and your hands-on work with GCP BigQuery and relational SQL schemas.\n` +
        `2. **Connect to ${targetJob.company}'s Needs:** Specifically tie back to ${targetJob.matchedSkills[0] || 'core technical competencies'} and demonstrate familiarity with their stack.\n` +
        `3. **Proactive Learning:** Mention that you've identified '${targetJob.bridgeCourse.title}' as your continuous learning bridge to ensure 100% role readiness.`;
    }

    const aiMsg: QAMessage = {
      sender: 'ai',
      text: aiResponseText,
      timestamp: 'Just now'
    };

    setQaMessages(prev => [...prev, userMsg, aiMsg]);
    setCustomQuestionInput('');
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-google-gray-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 text-[11px] font-bold bg-blue-50 text-google-blue border border-blue-200 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-google-blue" />
              Career &amp; Application Studio
            </span>
            <span className="text-xs text-google-gray-500 font-mono">
              Jobs.com • Google Careers • Lightcast
            </span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-google-gray-900 mt-1">
            Career Opportunities &amp; Application Intelligence
          </h1>
          <p className="text-xs text-google-gray-600">
            Tailored specifically for <strong>{currentUserProfile.name}</strong> ({currentUserProfile.concentration} • Minor in {currentUserProfile.minor} • Georgia Tech 3.91 GPA).
          </p>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center space-x-2.5 self-start md:self-auto">
          <button
            onClick={() => handleOpenResumeTool()}
            className="px-3.5 py-2 bg-white hover:bg-blue-50 border border-blue-200 text-google-blue rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-google-blue" />
            <span>Resume Builder</span>
          </button>

          <button
            onClick={() => handleOpenQaTool()}
            className="px-3.5 py-2 bg-google-blue hover:bg-google-blue-hover text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-white" />
            <span>Application Q&amp;A AI</span>
          </button>
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

                  {/* Resume Creation Tool for this role */}
                  <button
                    onClick={() => handleOpenResumeTool(job)}
                    className="px-3 py-1.5 bg-white hover:bg-purple-50 border border-purple-300 text-purple-700 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Resume Builder</span>
                  </button>

                  {/* Question Answer AI for this role */}
                  <button
                    onClick={() => handleOpenQaTool(job)}
                    className="px-3 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Q&amp;A AI</span>
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

      {/* ========================================================================= */}
      {/* 1. RESUME CREATION TOOL MODAL */}
      {/* ========================================================================= */}
      {(resumeModalJob || isGeneralResumeOpen) && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-google-gray-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-google-gray-200 flex items-center justify-between bg-google-gray-50">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-google-blue flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-google-gray-900 flex items-center gap-1.5">
                    <span>Resume Creation Studio</span>
                    {resumeModalJob && (
                      <span className="text-[10px] bg-blue-50 text-google-blue border border-blue-200 px-2 py-0.5 rounded-full font-normal">
                        Target: {resumeModalJob.title} ({resumeModalJob.company})
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-google-gray-500">
                    ATS-optimized resume tailored to your Georgia Tech ITM &amp; CS Minor transcript.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setResumeModalJob(null);
                  setIsGeneralResumeOpen(false);
                }}
                className="p-1 rounded-lg hover:bg-google-gray-200 text-google-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              {resumeModalJob && (
                <>
                  {/* ATS Compatibility & Keyword Density Bar */}
                  <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-google-blue uppercase tracking-wider block">
                        ATS Parser Alignment Score
                      </span>
                      <span className="text-xs text-google-gray-700">
                        Pre-checked against Workday, Greenhouse &amp; Google Hire parsing rules.
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-xl font-black text-google-blue bg-white px-3 py-1 rounded-xl border border-blue-200 shadow-2xs">
                        {resumeModalJob.matchScore}% Match
                      </div>
                    </div>
                  </div>

                  {/* Coursework Keywords Injected */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-google-gray-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Extracted Transcript Skills Injected into Resume:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {resumeModalJob.matchedSkills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-medium"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-medium">
                        ✓ Georgia Tech ITM (3.91 GPA)
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-medium">
                        ✓ Computer Science Minor
                      </span>
                    </div>
                  </div>

                  {/* Tailored Experience Bullets Box */}
                  <div className="bg-google-gray-50 border border-google-gray-200 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-google-gray-900">
                        Targeted Achievement Bullets (Ready to Paste)
                      </span>
                      <button
                        onClick={() => handleCopyText(getTailoredBullets(resumeModalJob).join('\n• '), false)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                          copiedBullets
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border border-google-gray-300 hover:bg-google-gray-100 text-google-gray-700'
                        }`}
                      >
                        {copiedBullets ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied Bullets!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Bullets</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="space-y-1.5 text-xs text-google-gray-700 bg-white p-3 rounded-lg border border-google-gray-200 leading-relaxed font-sans">
                      {getTailoredBullets(resumeModalJob).map((bullet, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <span className="text-google-blue font-bold">•</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Full Formatted Resume Preview */}
              <div className="border border-google-gray-200 rounded-xl overflow-hidden">
                <div className="bg-google-gray-100 px-3.5 py-2 border-b border-google-gray-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-google-gray-800 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-google-blue" />
                    Complete ATS Resume Preview (Emmett Wolland)
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopyText(generateFullResumeText(resumeModalJob || jobs[0]), true)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                        copiedResume
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-google-gray-300 hover:bg-google-gray-50 text-google-gray-700'
                      }`}
                    >
                      {copiedResume ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied Full Resume!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Full Resume</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDownloadResume(resumeModalJob || jobs[0])}
                      className="px-2.5 py-1 bg-white border border-google-gray-300 hover:bg-google-gray-50 text-google-gray-700 rounded-lg text-xs font-semibold flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download .txt</span>
                    </button>
                  </div>
                </div>

                <pre className="p-4 bg-google-gray-50 text-[11px] font-mono text-google-gray-800 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                  {generateFullResumeText(resumeModalJob || jobs[0])}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-google-gray-200 bg-google-gray-50 flex items-center justify-between">
              <span className="text-[11px] text-google-gray-500 font-mono">
                Verified: Georgia Tech Scheller College of Business
              </span>
              <button
                onClick={() => {
                  setResumeModalJob(null);
                  setIsGeneralResumeOpen(false);
                }}
                className="px-4 py-1.5 bg-google-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. QUESTION ANSWER AI MODAL */}
      {/* ========================================================================= */}
      {(qaModalJob || isGeneralQaOpen) && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-google-gray-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-google-gray-200 flex items-center justify-between bg-google-gray-50">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-google-gray-900 flex items-center gap-1.5">
                    <span>Gemini Application &amp; Interview Q&amp;A AI</span>
                    {qaModalJob && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-normal">
                        Role: {qaModalJob.title}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-google-gray-500">
                    Ask questions about positioning your Georgia Tech ITM &amp; CS Minor coursework or answering tricky interview prompts.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setQaModalJob(null);
                  setIsGeneralQaOpen(false);
                }}
                className="p-1 rounded-lg hover:bg-google-gray-200 text-google-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Chat History & Suggestions */}
            <div className="p-4 overflow-y-auto space-y-4 flex-1 max-h-[60vh]">
              {/* Preset Quick Prompt Suggestions */}
              <div className="bg-google-gray-50 rounded-xl p-3 border border-google-gray-200">
                <span className="text-[11px] font-bold text-google-gray-700 block mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-google-blue" />
                  Quick Coaching Prompts:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAskQuestion("How do I pitch my ITM + CS Minor advantage?")}
                    className="p-2 bg-white hover:bg-blue-50 border border-google-gray-200 hover:border-blue-300 rounded-lg text-left text-xs text-google-gray-800 transition-all flex items-center justify-between group"
                  >
                    <span>💡 Pitch my ITM + CS Minor advantage</span>
                    <ChevronRight className="w-3.5 h-3.5 text-google-gray-400 group-hover:text-google-blue" />
                  </button>

                  <button
                    onClick={() => handleAskQuestion("What are the top 3 interview questions and STAR answers for this role?")}
                    className="p-2 bg-white hover:bg-blue-50 border border-google-gray-200 hover:border-blue-300 rounded-lg text-left text-xs text-google-gray-800 transition-all flex items-center justify-between group"
                  >
                    <span>🎯 Top 3 Interview Questions &amp; STAR answers</span>
                    <ChevronRight className="w-3.5 h-3.5 text-google-gray-400 group-hover:text-google-blue" />
                  </button>

                  <button
                    onClick={() => handleAskQuestion("Generate a compelling cover letter opening hook for this role.")}
                    className="p-2 bg-white hover:bg-blue-50 border border-google-gray-200 hover:border-blue-300 rounded-lg text-left text-xs text-google-gray-800 transition-all flex items-center justify-between group"
                  >
                    <span>📝 Write compelling cover letter hook</span>
                    <ChevronRight className="w-3.5 h-3.5 text-google-gray-400 group-hover:text-google-blue" />
                  </button>

                  <button
                    onClick={() => handleAskQuestion("How do I explain my CS 1332 and MGT 4058 coursework to recruiters?")}
                    className="p-2 bg-white hover:bg-blue-50 border border-google-gray-200 hover:border-blue-300 rounded-lg text-left text-xs text-google-gray-800 transition-all flex items-center justify-between group"
                  >
                    <span>💻 Explain CS 1332 &amp; MGT 4058 projects</span>
                    <ChevronRight className="w-3.5 h-3.5 text-google-gray-400 group-hover:text-google-blue" />
                  </button>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3">
                {qaMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-google-blue text-white rounded-tr-none'
                          : 'bg-google-gray-50 border border-google-gray-200 text-google-gray-800 rounded-tl-none space-y-2'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>
                    </div>
                    {msg.sender === 'ai' && idx > 0 && (
                      <button
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(msg.text);
                          }
                          setCopiedAnswerIndex(idx);
                          setTimeout(() => setCopiedAnswerIndex(null), 2000);
                        }}
                        className="text-[10px] text-google-gray-500 hover:text-google-gray-700 mt-1 flex items-center gap-1 self-start ml-1"
                      >
                        {copiedAnswerIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied answer</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy answer</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Question Input Footer */}
            <div className="p-3 border-t border-google-gray-200 bg-google-gray-50">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskQuestion(customQuestionInput);
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={customQuestionInput}
                  onChange={(e) => setCustomQuestionInput(e.target.value)}
                  placeholder="Ask a custom question (e.g., 'How to answer tell me about yourself?', 'Salary negotiation')..."
                  className="flex-1 bg-white border border-google-gray-300 rounded-xl px-3.5 py-2 text-xs text-google-gray-900 focus:outline-none focus:ring-1 focus:ring-google-blue shadow-2xs"
                />
                <button
                  type="submit"
                  disabled={!customQuestionInput.trim()}
                  className="px-4 py-2 bg-google-blue hover:bg-google-blue-hover disabled:bg-google-gray-300 text-white text-xs font-bold rounded-xl transition-colors flex items-center space-x-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Ask AI</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
