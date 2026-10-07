export interface CourseRecord {
  id: string;
  code: string;
  title: string;
  institution: string;
  term: string;
  credits: number;
  grade: string;
  category: 'core' | 'elective' | 'lab';
  extractedSkills: string[];
  interestVectorTrack?: 'track_x' | 'track_y' | 'neutral';
}

export interface TranscriptProfile {
  studentName: string;
  program: string;
  institution: string;
  gpa: number;
  totalCredits: number;
  degreeCandidate: string;
  verifiedAt: string;
  courses: CourseRecord[];
}

export interface ElectiveDivergence {
  electiveCode: string;
  electiveTitle: string;
  trackName: string;
  trackLabel: string;
  divergenceScore: number; // 0 - 100
  focusAreas: string[];
  recommendedRoles: string[];
  projectedMedianTC: string;
}

export interface StackableCredential {
  id: string;
  name: string;
  issuer: string;
  type: 'graduate_certificate' | 'minor' | 'cloud_credential' | 'micro_cert';
  totalCoursesRequired: number;
  completedCoursesCount: number;
  percentageComplete: number;
  fulfilledCourses: string[];
  remainingCourses: {
    code: string;
    title: string;
    availableOnGoogleSkills: boolean;
    estimatedHours: string;
  }[];
  badgeIcon: string;
}

export interface TargetJob {
  id: string;
  title: string;
  department: string;
  level: string;
  marketDemand: 'Ultra High' | 'High' | 'Surging';
  matchScore: number; // 0 - 100%
  medianSalary: string;
  topSalaryBand: string;
  acquiredSkills: string[];
  gapSkills: string[];
  bridgeCourses: {
    title: string;
    type: 'Course' | 'Lab' | 'Path';
    duration: string;
    url: string;
  }[];
}

export interface ROIBenchmark {
  courseCombination: string;
  topEarnerPercentage: string; // e.g., "24%"
  thresholdTC: string; // e.g., "$500,000+"
  medianUplift: string; // e.g., "+$85,000 (+38%)"
  percentiles: {
    p25: string;
    p50: string;
    p75: string;
    p90: string;
  };
  sampleCohortSize: number;
  progressionTimeline: {
    stage: string;
    yearsPostGrad: string;
    medianTC: string;
    typicalTitles: string[];
    topCompanies: string[];
  }[];
}

export interface EnterpriseMandate {
  id: string;
  organization: string;
  title: string;
  deadline: string;
  daysRemaining: number;
  targetEmployees: number;
  compliancePercentage: number;
  status: 'In Progress' | 'Action Required' | 'Satisfied';
  departments: {
    name: string;
    headcount: number;
    complianceRate: number;
    skillDebtStatus: 'Low' | 'Moderate' | 'Critical';
  }[];
}

export interface ProofOfLiteracy {
  recipientName: string;
  employeeId: string;
  organization: string;
  credentialTitle: string;
  issueDate: string;
  verificationHash: string;
  standardsCompliance: string[];
  skillsDemonstrated: string[];
}

export interface IngestionPipeline {
  id: string;
  name: string;
  sourceType: 'University Registrar' | 'Enterprise ATS / Careers' | 'Market Aggregator';
  institution: string;
  status: 'Healthy' | 'Syncing' | 'Idle';
  lastSyncTimestamp: string;
  recordsIngested: number;
  protocol: string;
  latencyMs: number;
}

export interface CatalogItem {
  id: string;
  title: string;
  type: 'Course' | 'Lab' | 'Path' | 'Quest';
  badgeType?: 'Skill badge' | 'Certification';
  isFeatured?: boolean;
  description: string;
  duration: string;
  level: 'Introductory' | 'Intermediate' | 'Advanced';
  tags: string[];
}
