import { 
  UserProfile,
  TranscriptProfile, 
  ElectiveDivergence, 
  StackableCredential, 
  TargetJob, 
  ROIBenchmark, 
  EnterpriseMandate, 
  IngestionPipeline, 
  CatalogItem,
  FriendProfile,
  JobPosting,
  DatabaseMetrics
} from '../types';

export const initialUserProfile: UserProfile = {
  name: "Emmett Wolland",
  major: "Business Administration",
  concentration: "Information Technology Management (ITM)",
  minor: "Computer Science",
  institution: "Georgia Institute of Technology (Scheller College of Business & College of Computing)",
  degreeCandidate: "Class of May 2026",
  gpa: 3.91,
  totalCredits: 42,
  transcriptFileName: "Emmett_Wolland_GeorgiaTech_Official_Transcript.pdf",
  transcriptUploaded: true,
  resumeFileName: "Emmett_Wolland_Resume_2026.pdf",
  resumeUploaded: true,
  fieldsOfInterest: [
    "AI Product Management",
    "Cloud Enterprise Architecture",
    "IT Consulting & Digital Strategy",
    "FinTech & Data Engineering"
  ],
  lastSavedAt: "2026-10-07T16:22:00Z",
  lastTransactionHash: "0x4e29a1b9f7c352840d165e381b99a6cf78b4091c5321"
};

export const initialDatabaseMetrics: DatabaseMetrics = {
  databaseName: "google-skills-ui-db",
  deploymentCount: 14,
  totalProfilesSaved: 1,
  totalFriendsTracked: 3,
  activeIntegrations: 3,
  lastSavedTimestamp: "2026-10-07T16:22:00Z"
};

export const initialTranscriptProfile: TranscriptProfile = {
  studentName: "Emmett Wolland",
  program: "Bachelor of Science in Business Administration (Concentration: ITM) with Minor in Computer Science",
  institution: "Georgia Institute of Technology (Scheller College of Business & College of Computing)",
  gpa: 3.91,
  totalCredits: 42,
  degreeCandidate: "Class of May 2026",
  verifiedAt: "2026-10-07T15:30:00Z via Banner API",
  courses: [
    {
      id: "c1",
      code: "MGT 6500",
      title: "Analytical Data Modeling & Decision Optimization",
      institution: "Georgia Tech",
      term: "Fall 2025",
      credits: 3.0,
      grade: "A",
      category: "core",
      extractedSkills: ["Predictive Analytics", "Decision Trees", "Linear Programming", "Python Modeling"]
    },
    {
      id: "c2",
      code: "MGT 4058",
      title: "Database Management Systems for Business (ITM Core)",
      institution: "Georgia Tech",
      term: "Fall 2025",
      credits: 3.0,
      grade: "A",
      category: "core",
      extractedSkills: ["Relational Database Design", "SQL Modeling", "ETL Pipelines", "Data Warehousing"]
    },
    {
      id: "c3",
      code: "CS 1332",
      title: "Data Structures & Algorithms (CS Minor Core)",
      institution: "Georgia Tech",
      term: "Spring 2025",
      credits: 3.0,
      grade: "A",
      category: "core",
      extractedSkills: ["Algorithm Complexity", "Graph Traversal", "Binary Trees", "Dynamic Programming"]
    },
    {
      id: "c4",
      code: "CS 2110",
      title: "Computer Organization & Systems Programming (CS Minor)",
      institution: "Georgia Tech",
      term: "Fall 2025",
      credits: 3.0,
      grade: "A",
      category: "core",
      extractedSkills: ["Systems Architecture", "Memory Management", "C/Assembly", "Process Concurrency"]
    },
    {
      id: "c5",
      code: "MGT 6203",
      title: "Data Analytics in Business Practice (ITM Core)",
      institution: "Georgia Tech",
      term: "Spring 2026",
      credits: 3.0,
      grade: "A",
      category: "core",
      extractedSkills: ["Regression Analysis", "Customer Segmentation", "A/B Testing", "Tableau/Looker"]
    },
    {
      id: "c6",
      code: "PSYC 6010",
      title: "Cognitive Engineering & Human-System Interaction",
      institution: "Georgia Tech",
      term: "Spring 2026",
      credits: 3.0,
      grade: "A",
      category: "elective",
      extractedSkills: [
        "Human-AI Interaction", 
        "Cognitive Task Analysis", 
        "Mental Model Alignment", 
        "Usability Heuristics", 
        "Adaptive Prompt Ergonomics"
      ],
      interestVectorTrack: "track_x"
    },
    {
      id: "c7",
      code: "ME 6101",
      title: "Engineering Design & Complex Systems Architecture",
      institution: "Georgia Tech",
      term: "Spring 2026",
      credits: 3.0,
      grade: "A",
      category: "elective",
      extractedSkills: [
        "Distributed Systems Decomposition", 
        "Reliability & Fault Tolerance", 
        "System Verification", 
        "Scalable Pipeline Architecture", 
        "Latency Optimization"
      ],
      interestVectorTrack: "track_y"
    }
  ]
};

export const initialFriendsList: FriendProfile[] = [
  {
    id: "friend-1",
    name: "Sarah Chen",
    avatar: "SC",
    institution: "Georgia Institute of Technology",
    major: "Computer Science",
    concentration: "Intelligence & Information Internetworks",
    minor: "Technology & Management",
    sharedCoursesCount: 4,
    addedAt: "2026-09-15",
    coursesTaken: [
      { code: "CS 1332", title: "Data Structures & Algorithms", grade: "A", institution: "Georgia Tech", term: "Spring 2025", isSharedWithUser: true },
      { code: "CS 2110", title: "Computer Organization & Systems", grade: "A", institution: "Georgia Tech", term: "Fall 2025", isSharedWithUser: true },
      { code: "CS 3600", title: "Introduction to Artificial Intelligence", grade: "A", institution: "Georgia Tech", term: "Fall 2025", isSharedWithUser: false },
      { code: "CS 4641", title: "Machine Learning Concepts & Practice", grade: "A", institution: "Georgia Tech", term: "Spring 2026", isSharedWithUser: false },
      { code: "MGT 6500", title: "Analytical Data Modeling", grade: "A-", institution: "Georgia Tech", term: "Fall 2025", isSharedWithUser: true },
      { code: "GCP-K8S", title: "Manage Kubernetes in Google Cloud", grade: "Skill Badge", institution: "Google Skills", term: "Summer 2026", isSharedWithUser: true }
    ]
  },
  {
    id: "friend-2",
    name: "David Miller",
    avatar: "DM",
    institution: "Georgia Institute of Technology",
    major: "Business Administration",
    concentration: "Information Technology Management (ITM)",
    minor: "Economics",
    sharedCoursesCount: 3,
    addedAt: "2026-09-20",
    coursesTaken: [
      { code: "MGT 4058", title: "Database Management Systems", grade: "A", institution: "Georgia Tech", term: "Fall 2025", isSharedWithUser: true },
      { code: "MGT 6500", title: "Analytical Data Modeling", grade: "A", institution: "Georgia Tech", term: "Fall 2025", isSharedWithUser: true },
      { code: "CS 1332", title: "Data Structures & Algorithms", grade: "B+", institution: "Georgia Tech", term: "Spring 2025", isSharedWithUser: true },
      { code: "MGT 4052", title: "Systems Analysis and Design", grade: "A", institution: "Georgia Tech", term: "Spring 2026", isSharedWithUser: false },
      { code: "GCP-BQ", title: "Using BigQuery Omni with AWS", grade: "Lab Badge", institution: "Google Skills", term: "Summer 2026", isSharedWithUser: false }
    ]
  },
  {
    id: "friend-3",
    name: "Marcus Vance",
    avatar: "MV",
    institution: "Georgia Institute of Technology",
    major: "Industrial & Systems Engineering",
    concentration: "Economic & Financial Systems",
    minor: "Computer Science",
    sharedCoursesCount: 2,
    addedAt: "2026-10-01",
    coursesTaken: [
      { code: "CS 1332", title: "Data Structures & Algorithms", grade: "A", institution: "Georgia Tech", term: "Spring 2025", isSharedWithUser: true },
      { code: "CS 2110", title: "Computer Organization & Systems", grade: "A", institution: "Georgia Tech", term: "Fall 2025", isSharedWithUser: true },
      { code: "ISYE 6767", title: "Quantitative Financial Risk Modeling", grade: "A", institution: "Georgia Tech", term: "Spring 2026", isSharedWithUser: false },
      { code: "GCP-TF", title: "Managing Cloud Infrastructure with Terraform", grade: "Quest Badge", institution: "Google Skills", term: "Fall 2026", isSharedWithUser: false },
      { code: "GCP-LAKE", title: "Lakehouse: Qwik Start", grade: "Lab Badge", institution: "Google Skills", term: "Fall 2026", isSharedWithUser: false }
    ]
  }
];

export const liveJobsDatabase: JobPosting[] = [
  {
    id: "job-p1",
    title: "Associate Product Manager (APM) - AI & Cloud Platform",
    company: "Google / Alphabet",
    location: "Atlanta, GA / Mountain View, CA (Hybrid)",
    salaryRange: "$165,000 - $210,000 Total Compensation",
    source: "Google Careers",
    matchScore: 92,
    postedDate: "2 hours ago",
    workType: "Hybrid",
    requiredSkills: [
      "Technical Product Strategy",
      "CS Fundamentals & Algorithms (CS 1332)",
      "Database & Analytics Architectures (MGT 4058)",
      "Human-AI User Alignment (PSYC 6010)"
    ],
    matchedSkills: [
      "CS 1332 Data Structures & Algorithms",
      "MGT 4058 Database Management",
      "PSYC 6010 Human-AI Ergonomics",
      "MGT 6500 Analytical Data Modeling"
    ],
    missingSkills: [
      "Gemini Enterprise Evaluation & Guardrails"
    ],
    bridgeCourse: {
      title: "Deploy and Manage Generative AI Models",
      type: "Path",
      duration: "18 hours 30 minutes"
    },
    jobUrl: "https://careers.google.com"
  },
  {
    id: "job-p2",
    title: "Cloud Solutions Consultant (ITM Enterprise Practice)",
    company: "Google Cloud",
    location: "Atlanta, GA / New York, NY",
    salaryRange: "$155,000 - $195,000 Total Compensation",
    source: "Google Careers",
    matchScore: 88,
    postedDate: "1 day ago",
    workType: "Full-time",
    requiredSkills: [
      "Business Information Systems Architecture",
      "Relational & Analytical Database Management",
      "Multi-Cloud Data Warehousing (BigQuery Omni)",
      "Systems Optimization & Reliability"
    ],
    matchedSkills: [
      "MGT 4058 Database Systems (ITM)",
      "CS 2110 Systems Programming",
      "MGT 6500 Optimization Modeling"
    ],
    missingSkills: [
      "Using BigQuery Omni with AWS (Multi-Cloud Lab)"
    ],
    bridgeCourse: {
      title: "Using BigQuery Omni with AWS",
      type: "Lab",
      duration: "40 minutes"
    },
    jobUrl: "https://careers.google.com"
  },
  {
    id: "job-p3",
    title: "Technical Product Analyst - Digital Strategy & ITM",
    company: "Jobs.com Strategic Partner / Lightcast",
    location: "Atlanta, GA (Remote Available)",
    salaryRange: "$138,000 - $175,000 Total Compensation",
    source: "Jobs.com",
    matchScore: 85,
    postedDate: "3 hours ago",
    workType: "Remote",
    requiredSkills: [
      "Data Modeling & Business Formulation",
      "SQL Query Optimization",
      "A/B Experimentation & Analytics",
      "Enterprise SaaS Workflows"
    ],
    matchedSkills: [
      "MGT 6500 Analytical Modeling",
      "MGT 4058 Database Management",
      "MGT 6203 Business Data Analytics"
    ],
    missingSkills: [
      "Implement Cloud Collaboration and Productivity Workflows"
    ],
    bridgeCourse: {
      title: "Implement Cloud Collaboration and Productivity Workflows",
      type: "Course",
      duration: "30 minutes"
    },
    jobUrl: "https://jobs.com"
  },
  {
    id: "job-p4",
    title: "Enterprise AI Solutions Associate",
    company: "Anthropic / Stripe Partner Network",
    location: "San Francisco, CA / Atlanta, GA",
    salaryRange: "$175,000 - $230,000 Total Compensation",
    source: "Jobs.com",
    matchScore: 82,
    postedDate: "5 hours ago",
    workType: "Hybrid",
    requiredSkills: [
      "Human-Centered AI Interfaces",
      "Data Structures & Python Modeling",
      "Enterprise Cloud Orchestration",
      "API Integration & Middleware"
    ],
    matchedSkills: [
      "PSYC 6010 Human-System Ergonomics",
      "CS 1332 Data Structures & Algorithms",
      "MGT 6500 Decision Optimization"
    ],
    missingSkills: [
      "Manage Kubernetes in Google Cloud"
    ],
    bridgeCourse: {
      title: "Manage Kubernetes in Google Cloud",
      type: "Course",
      duration: "30 minutes"
    },
    jobUrl: "https://jobs.com"
  },
  {
    id: "job-p5",
    title: "Quantitative Technology Analyst (ITM / CS)",
    company: "JPMorgan Chase / FinTech Practice",
    location: "New York, NY / Atlanta, GA",
    salaryRange: "$160,000 - $205,000 Total Compensation",
    source: "Lightcast",
    matchScore: 79,
    postedDate: "Just now",
    workType: "Full-time",
    requiredSkills: [
      "Algorithmic Problem Solving (CS 1332)",
      "Enterprise Financial Systems",
      "Cloud Infrastructure as Code",
      "High-Throughput Analytics"
    ],
    matchedSkills: [
      "CS 1332 Data Structures",
      "CS 2110 Systems Organization",
      "MGT 4058 Database Systems"
    ],
    missingSkills: [
      "Managing Cloud Infrastructure with Terraform"
    ],
    bridgeCourse: {
      title: "Managing Cloud Infrastructure with Terraform",
      type: "Course",
      duration: "3 hours 45 minutes"
    },
    jobUrl: "https://jobs.com"
  }
];

export const electiveDivergenceComparison: {
  trackX: ElectiveDivergence;
  trackY: ElectiveDivergence;
} = {
  trackX: {
    electiveCode: "PSYC 6010",
    electiveTitle: "Cognitive Engineering & Human-System Interaction",
    trackName: "Track X: Human-Centered AI & Product Strategy",
    trackLabel: "Human-AI Interaction Vector",
    divergenceScore: 89,
    focusAreas: [
      "User-Centric Generative AI Interfaces",
      "Explainable AI (XAI) Mental Models",
      "Behavioral Ergonomics & Usability",
      "Executive Product Strategy & Market Launch"
    ],
    recommendedRoles: [
      "Director of AI Product Management",
      "Lead Human-AI Experience Strategist",
      "VP of Enterprise Product & Applied AI"
    ],
    projectedMedianTC: "$385,000"
  },
  trackY: {
    electiveCode: "ME 6101",
    electiveTitle: "Engineering Design & Complex Systems Architecture",
    trackName: "Track Y: Systems Engineering & MLOps Infrastructure",
    trackLabel: "Infrastructure & Systems Vector",
    divergenceScore: 92,
    focusAreas: [
      "Distributed Cloud Systems & Fault Tolerance",
      "Enterprise MLOps & Model Pipeline Scalability",
      "Latency & Inference Optimization",
      "Multi-Cloud Governance & Kubernetes Orchestration"
    ],
    recommendedRoles: [
      "Staff Cloud Solutions Architect",
      "Head of Enterprise MLOps & Infra",
      "Principal Distributed Systems Architect"
    ],
    projectedMedianTC: "$415,000"
  }
};

export const stackableCredentialsList: StackableCredential[] = [
  {
    id: "cred-1",
    name: "Graduate Certificate in Decision AI & Applied Analytics",
    issuer: "Georgia Institute of Technology",
    type: "graduate_certificate",
    totalCoursesRequired: 4,
    completedCoursesCount: 3,
    percentageComplete: 75,
    fulfilledCourses: ["MGT 6500", "MGT 6203", "CS 1332"],
    remainingCourses: [
      {
        code: "MGT 8803",
        title: "Deep Learning for Business Applications & Generative Agents",
        availableOnGoogleSkills: true,
        estimatedHours: "24 hours (Transferable Lab Equivalency)"
      }
    ],
    badgeIcon: "award"
  },
  {
    id: "cred-2",
    name: "Minor in Computational Finance & Quantitative Risk",
    issuer: "Georgia Tech Scheller & ISyE",
    type: "minor",
    totalCoursesRequired: 3,
    completedCoursesCount: 2,
    percentageComplete: 66,
    fulfilledCourses: ["MGT 6500", "MGT 4058"],
    remainingCourses: [
      {
        code: "ISYE 6767",
        title: "Quantitative Financial Risk & Algorithmic Hedging",
        availableOnGoogleSkills: true,
        estimatedHours: "18 hours"
      }
    ],
    badgeIcon: "book-open"
  },
  {
    id: "cred-3",
    name: "Google Cloud Professional Enterprise Architect",
    issuer: "Google Cloud",
    type: "cloud_credential",
    totalCoursesRequired: 5,
    completedCoursesCount: 4,
    percentageComplete: 80,
    fulfilledCourses: [
      "Manage Kubernetes in Google Cloud",
      "Derive Insights from BigQuery Data",
      "Using BigQuery Omni with AWS",
      "Share Data Using Google Data Cloud"
    ],
    remainingCourses: [
      {
        code: "GCP-ARCH-05",
        title: "Managing Cloud Infrastructure with Terraform",
        availableOnGoogleSkills: true,
        estimatedHours: "3 hours 45 minutes"
      }
    ],
    badgeIcon: "shield-check"
  },
  {
    id: "cred-4",
    name: "Enterprise Generative AI Prompt & Governance Specialist",
    issuer: "Google Skills Academy",
    type: "micro_cert",
    totalCoursesRequired: 3,
    completedCoursesCount: 2,
    percentageComplete: 67,
    fulfilledCourses: [
      "Integrate Generative AI Into Your Data Workflow",
      "Gemini for Data Scientists and Analysts"
    ],
    remainingCourses: [
      {
        code: "GENAI-GOV-03",
        title: "Deploy and Manage Generative AI Models (MLOps)",
        availableOnGoogleSkills: true,
        estimatedHours: "18 hours 30 minutes"
      }
    ],
    badgeIcon: "sparkles"
  }
];

export const targetJobsDatabase: TargetJob[] = [
  {
    id: "job-1",
    title: "Lead AI Product Manager",
    department: "Applied AI & Cloud Platforms",
    level: "Staff / Principal (L6/L7)",
    marketDemand: "Surging",
    matchScore: 92,
    medianSalary: "$340,000",
    topSalaryBand: "$520,000+",
    acquiredSkills: [
      "Predictive Analytics & Modeling (GT MGT 6500)",
      "Database Systems for Business (GT MGT 4058)",
      "Data Structures & Algorithms (GT CS 1332)",
      "Human-AI Cognitive Ergonomics (GT PSYC 6010)",
      "BigQuery Data Insights (Google Skills)"
    ],
    gapSkills: [
      "Production LLM Evaluation & Guardrails",
      "Multi-Cloud Cross-Silo Data Federation (Omni)",
      "Automated Infrastructure as Code (Terraform)"
    ],
    bridgeCourses: [
      {
        title: "Deploy and Manage Generative AI Models",
        type: "Path",
        duration: "18 hours 30 minutes",
        url: "#"
      },
      {
        title: "Using BigQuery Omni with AWS",
        type: "Lab",
        duration: "40 minutes",
        url: "#"
      },
      {
        title: "Managing Cloud Infrastructure with Terraform",
        type: "Course",
        duration: "3 hours 45 minutes",
        url: "#"
      }
    ]
  },
  {
    id: "job-2",
    title: "Staff Cloud Solutions Architect",
    department: "Enterprise Cloud Engineering",
    level: "Staff (L6)",
    marketDemand: "Ultra High",
    matchScore: 84,
    medianSalary: "$360,000",
    topSalaryBand: "$550,000+",
    acquiredSkills: [
      "Complex Systems Decomposition (GT ME 6101)",
      "Computer Organization & Systems (GT CS 2110)",
      "Database Systems Architecture (GT MGT 4058)",
      "Analytical Optimization (GT MGT 6500)"
    ],
    gapSkills: [
      "Lakehouse Modernization Architectures",
      "Database Migration Service Automation (MySQL to Cloud SQL)",
      "Terraform Enterprise State Management"
    ],
    bridgeCourses: [
      {
        title: "Lakehouse: Qwik Start",
        type: "Lab",
        duration: "20 minutes",
        url: "#"
      },
      {
        title: "Migrate MySQL Data to Cloud SQL Using Database Migration",
        type: "Course",
        duration: "1 hour 15 minutes",
        url: "#"
      },
      {
        title: "Managing Cloud Infrastructure with Terraform",
        type: "Course",
        duration: "3 hours 45 minutes",
        url: "#"
      }
    ]
  },
  {
    id: "job-3",
    title: "Head of Quantitative Strategy & Decision Science",
    department: "Fintech & Quantitative Trading",
    level: "Director (L7/L8)",
    marketDemand: "High",
    matchScore: 78,
    medianSalary: "$420,000",
    topSalaryBand: "$650,000+",
    acquiredSkills: [
      "Database Modeling & SQL (GT MGT 4058)",
      "Analytical Optimization (GT MGT 6500)",
      "Data Structures & Algorithms (GT CS 1332)",
      "Data Analytics in Business (GT MGT 6203)"
    ],
    gapSkills: [
      "Real-Time Stream Processing on GCP (Dataflow)",
      "Algorithmic Risk Hedging (ISYE 6767)",
      "High-Throughput Vector Databases"
    ],
    bridgeCourses: [
      {
        title: "Share Data Using Google Data Cloud",
        type: "Course",
        duration: "30 minutes",
        url: "#"
      },
      {
        title: "Integrate Generative AI Into Your Data Workflow",
        type: "Path",
        duration: "12 hours 20 minutes",
        url: "#"
      }
    ]
  }
];

export const roiBenchmarkData: ROIBenchmark = {
  courseCombination: "Georgia Tech Business ITM + CS Minor + Google Cloud Architect",
  topEarnerPercentage: "24.6%",
  thresholdTC: "$500,000+",
  medianUplift: "+$85,000 (+38.2%)",
  percentiles: {
    p25: "$210,000 TC",
    p50: "$320,000 TC",
    p75: "$485,000 TC",
    p90: "$620,000 TC"
  },
  sampleCohortSize: 1480,
  progressionTimeline: [
    {
      stage: "Year 0: Immediate Post-Graduation",
      yearsPostGrad: "0 - 1 Years",
      medianTC: "$175,000 TC",
      typicalTitles: ["Associate Product Manager (APM)", "Cloud Solutions Consultant", "ITM Strategy Analyst"],
      topCompanies: ["Google", "McKinsey", "Deloitte Consulting", "Amazon"]
    },
    {
      stage: "Year 2 - 3: Mid-Level Acceleration",
      yearsPostGrad: "2 - 3 Years",
      medianTC: "$285,000 TC",
      typicalTitles: ["Senior Technical Product Manager", "Staff Solutions Architect", "Enterprise AI Lead"],
      topCompanies: ["Google Cloud", "Stripe", "Anthropic", "Salesforce"]
    },
    {
      stage: "Year 4 - 5+: Executive & Principal Tier",
      yearsPostGrad: "4 - 5+ Years",
      medianTC: "$515,000 TC",
      typicalTitles: ["Director of AI Products", "Principal Cloud Enterprise Architect", "VP of Technology Strategy"],
      topCompanies: ["Alphabet", "Anthropic", "OpenAI", "JPMorgan Chase"]
    }
  ]
};

export const corporateMandatesData: EnterpriseMandate = {
  id: "mandate-alphabet-2026",
  organization: "Alphabet Enterprise Client Network",
  title: "Q4 2026 Enterprise Generative AI & Cloud Security Literacy Mandate",
  deadline: "November 30, 2026",
  daysRemaining: 54,
  targetEmployees: 3200,
  compliancePercentage: 81.4,
  status: "In Progress",
  departments: [
    {
      name: "Cloud Platform Architecture",
      headcount: 850,
      complianceRate: 94.2,
      skillDebtStatus: "Low"
    },
    {
      name: "Product & Strategy Operations",
      headcount: 620,
      complianceRate: 88.5,
      skillDebtStatus: "Low"
    },
    {
      name: "Financial Technology & Analytics",
      headcount: 940,
      complianceRate: 72.1,
      skillDebtStatus: "Moderate"
    },
    {
      name: "Legacy Systems & DevOps Services",
      headcount: 790,
      complianceRate: 51.8,
      skillDebtStatus: "Critical"
    }
  ]
};

export const ingestionPipelinesList: IngestionPipeline[] = [
  {
    id: "pipe-gt-banner",
    name: "Georgia Tech Academic Registrar (Banner / DegreeWorks API)",
    sourceType: "University Registrar",
    institution: "Georgia Institute of Technology",
    status: "Healthy",
    lastSyncTimestamp: "12 minutes ago (Real-time Webhook)",
    recordsIngested: 48250,
    protocol: "REST / OAuth2 Institutional OIDC",
    latencyMs: 142
  },
  {
    id: "pipe-google-careers",
    name: "Google Careers Job Architecture & Requisition Engine",
    sourceType: "Enterprise ATS / Careers",
    institution: "Alphabet / Google",
    status: "Healthy",
    lastSyncTimestamp: "Just now (Pub/Sub Stream)",
    recordsIngested: 1420,
    protocol: "gRPC Streaming / Internal Pub/Sub",
    latencyMs: 45
  },
  {
    id: "pipe-market-aggregator",
    name: "Jobs.com & Lightcast Real-Time Talent Market Aggregator",
    sourceType: "Market Aggregator",
    institution: "Jobs.com / National Labor Exchange",
    status: "Healthy",
    lastSyncTimestamp: "4 minutes ago (Hourly Delta)",
    recordsIngested: 854300,
    protocol: "Apache Kafka / Cloud Dataflow",
    latencyMs: 310
  }
];

export const googleSkillsCatalogItems: CatalogItem[] = [
  {
    id: "cat-1",
    title: "Manage Kubernetes in Google Cloud",
    type: "Course",
    badgeType: "Skill badge",
    description: "Complete the intermediate Manage Kubernetes in Google Cloud skill badge course to demonstrate skills in the...",
    duration: "30 minutes",
    level: "Intermediate",
    tags: ["Kubernetes", "DevOps", "Containers"]
  },
  {
    id: "cat-2",
    title: "Derive Insights from BigQuery Data",
    type: "Course",
    badgeType: "Skill badge",
    description: "Complete the introductory Derive Insights from BigQuery Data skill badge course to demonstrate skills in the following: Write...",
    duration: "45 minutes",
    level: "Introductory",
    tags: ["BigQuery", "SQL", "Data Analytics"]
  },
  {
    id: "cat-3",
    title: "Using BigQuery Omni with AWS",
    type: "Lab",
    description: "In this lab, you will run BigQuery analytics on data stored in AWS S3 using BigQuery Omni.",
    duration: "40 minutes",
    level: "Intermediate",
    tags: ["BigQuery Omni", "AWS", "Multi-Cloud"]
  },
  {
    id: "cat-4",
    title: "Share Data Using Google Data Cloud",
    type: "Course",
    badgeType: "Skill badge",
    description: "Earn a skill badge by completing the Share Data Using Google Data Cloud skill badge course, where you will gain...",
    duration: "30 minutes",
    level: "Introductory",
    tags: ["Analytics Hub", "Data Governance", "BigQuery"]
  },
  {
    id: "cat-5",
    title: "Lakehouse: Qwik Start",
    type: "Lab",
    description: "In this lab, you will learn how to implement Lakehouse tables using Dataplex and BigQuery.",
    duration: "20 minutes",
    level: "Introductory",
    tags: ["Lakehouse", "Dataplex", "Storage"]
  },
  {
    id: "cat-6",
    title: "Implement Cloud Collaboration and Productivity Workflows",
    type: "Course",
    badgeType: "Skill badge",
    description: "Earn an introductory skill badge by completing the Implement Cloud Collaboration and Productivity Workflows...",
    duration: "30 minutes",
    level: "Introductory",
    tags: ["Workspace", "Cloud Productivity", "APIs"]
  },
  {
    id: "cat-7",
    title: "Migrate MySQL Data to Cloud SQL Using Database Migration...",
    type: "Course",
    badgeType: "Skill badge",
    description: "Complete the introductory Migrate MySQL Data to Cloud SQL Using Database Migration Service skill badge...",
    duration: "1 hour 15 minutes",
    level: "Intermediate",
    tags: ["Database Migration", "Cloud SQL", "MySQL"]
  },
  {
    id: "cat-8",
    title: "Managing Cloud Infrastructure with Terraform",
    type: "Course",
    description: "In this Quest, the experienced user of Google Cloud will learn how to describe and launch cloud resources with...",
    duration: "3 hours 45 minutes",
    level: "Advanced",
    tags: ["Terraform", "Infrastructure as Code", "GCP"]
  }
];
