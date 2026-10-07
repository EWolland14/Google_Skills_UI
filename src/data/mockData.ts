import { 
  TranscriptProfile, 
  ElectiveDivergence, 
  StackableCredential, 
  TargetJob, 
  ROIBenchmark, 
  EnterpriseMandate, 
  IngestionPipeline, 
  CatalogItem 
} from '../types';

export const initialTranscriptProfile: TranscriptProfile = {
  studentName: "Alex Rivera",
  program: "Master of Business Administration (MBA - Technology & Strategy)",
  institution: "Georgia Institute of Technology (Scheller College of Business)",
  gpa: 3.88,
  totalCredits: 36,
  degreeCandidate: "Class of May 2026",
  verifiedAt: "2026-10-05T14:32:00Z via Banner API",
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
      code: "MGT 6090",
      title: "Business Fundamentals & Strategic Formulation",
      institution: "Georgia Tech",
      term: "Fall 2025",
      credits: 3.0,
      grade: "A",
      category: "core",
      extractedSkills: ["Competitive Analysis", "Market Entry Frameworks", "Valuation", "Product Strategy"]
    },
    {
      id: "c3",
      code: "MGT 6203",
      title: "Data Analytics in Business Practice",
      institution: "Georgia Tech",
      term: "Spring 2026",
      credits: 3.0,
      grade: "A",
      category: "core",
      extractedSkills: ["SQL Database Design", "Regression Analysis", "Customer Segmentation", "A/B Testing"]
    },
    {
      id: "c4",
      code: "CS 7641",
      title: "Machine Learning for Enterprise Applications",
      institution: "Georgia Tech",
      term: "Spring 2026",
      credits: 3.0,
      grade: "A",
      category: "core",
      extractedSkills: ["Supervised Learning", "Deep Learning Architectures", "Model Evaluation", "PyTorch"]
    },
    {
      id: "c5",
      code: "MGT 6000",
      title: "Financial Management & Capital Budgeting",
      institution: "Georgia Tech",
      term: "Fall 2025",
      credits: 3.0,
      grade: "B+",
      category: "core",
      extractedSkills: ["DCF Modeling", "Capital Allocation", "Financial Forecasting", "Risk Hedging"]
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
    fulfilledCourses: ["MGT 6500", "MGT 6203", "CS 7641"],
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
    fulfilledCourses: ["MGT 6500", "MGT 6000"],
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
    matchScore: 78,
    medianSalary: "$340,000",
    topSalaryBand: "$520,000+",
    acquiredSkills: [
      "Predictive Analytics & Modeling (GT MGT 6500)",
      "Strategic Market Formulation (GT MGT 6090)",
      "Machine Learning Foundations (GT CS 7641)",
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
    matchScore: 72,
    medianSalary: "$360,000",
    topSalaryBand: "$550,000+",
    acquiredSkills: [
      "Complex Systems Decomposition (GT ME 6101)",
      "Kubernetes Cluster Orchestration (Google Skills)",
      "BigQuery Analytics & Data Cloud (Google Skills)",
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
    matchScore: 65,
    medianSalary: "$420,000",
    topSalaryBand: "$650,000+",
    acquiredSkills: [
      "Financial Modeling & Capital Budgeting (GT MGT 6000)",
      "Analytical Optimization (GT MGT 6500)",
      "Machine Learning Algorithms (GT CS 7641)",
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
  courseCombination: "Georgia Tech MBA Core + Google Cloud Architect + Applied AI Electives",
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
      typicalTitles: ["Associate Product Manager", "Cloud Solutions Consultant", "Senior Strategy Associate"],
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
