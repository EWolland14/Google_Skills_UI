import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const DB_NAME = "google-skills-ui-db";
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, `${DB_NAME}.json`);

app.use(express.json());

// Ensure database directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default database state
const defaultDbState = {
  meta: {
    databaseName: DB_NAME,
    version: "1.2.0",
    createdAt: new Date().toISOString(),
    deploymentCount: 15,
    lastDeploymentAt: new Date().toISOString()
  },
  profile: {
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
    lastSavedAt: new Date().toISOString(),
    lastTransactionHash: "0x4e29a1b9f7c352840d165e381b99a6cf78b4091c5321"
  },
  friends: [
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
  ],
  transactions: []
};

// Database helper functions
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDbState, null, 2));
      return defaultDbState;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database:", err);
    return defaultDbState;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error("Error writing to database:", err);
    return false;
  }
}

// Ensure database file exists on startup
readDb();

// Serve static assets built by Vite
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Health check endpoint for Google Cloud Run
app.get('/healthz', (req, res) => {
  const db = readDb();
  res.status(200).json({
    status: 'healthy',
    service: 'google-skills-intelligence',
    database: DB_NAME,
    deploymentCount: db.meta.deploymentCount,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// GET /api/profile
app.get('/api/profile', (req, res) => {
  const db = readDb();
  res.json({
    success: true,
    database: DB_NAME,
    profile: db.profile
  });
});

// POST /api/profile - Writes to google-skills-ui-db and returns confirmation
app.post('/api/profile', (req, res) => {
  const db = readDb();
  const updatedProfile = req.body;
  const timestamp = new Date().toISOString();
  
  // Create cryptographic transaction hash
  const txHash = '0x' + crypto.createHash('sha256')
    .update(JSON.stringify(updatedProfile) + timestamp)
    .digest('hex').substring(0, 44);

  const profileRecord = {
    ...db.profile,
    ...updatedProfile,
    lastSavedAt: timestamp,
    lastTransactionHash: txHash
  };

  db.profile = profileRecord;
  db.transactions.push({
    type: 'PROFILE_UPDATE',
    timestamp,
    txHash,
    user: profileRecord.name
  });

  writeDb(db);

  console.log(`[${DB_NAME}] Profile updated for ${profileRecord.name} (Tx: ${txHash})`);

  res.status(200).json({
    success: true,
    message: `Successfully written to database: ${DB_NAME}`,
    dbName: DB_NAME,
    transactionHash: txHash,
    timestamp: timestamp,
    profile: profileRecord
  });
});

// GET /api/friends
app.get('/api/friends', (req, res) => {
  const db = readDb();
  res.json({
    success: true,
    database: DB_NAME,
    friends: db.friends
  });
});

// POST /api/friends - Add a friend and their courses to google-skills-ui-db
app.post('/api/friends', (req, res) => {
  const db = readDb();
  const { name, major, minor, institution, coursesTaken } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, error: 'Friend name is required' });
  }

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  const newFriend = {
    id: `friend-${Date.now()}`,
    name,
    avatar: initials || 'FR',
    institution: institution || 'Georgia Institute of Technology',
    major: major || 'Computer Science',
    minor: minor || 'Information Technology Management',
    sharedCoursesCount: (coursesTaken || []).filter(c => c.isSharedWithUser).length,
    addedAt: new Date().toISOString().split('T')[0],
    coursesTaken: coursesTaken || []
  };

  db.friends.unshift(newFriend);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: `Friend "${name}" successfully added to database: ${DB_NAME}`,
    dbName: DB_NAME,
    friend: newFriend
  });
});

// GET /api/metrics - Metrics across deployments
app.get('/api/metrics', (req, res) => {
  const db = readDb();
  res.json({
    success: true,
    databaseName: DB_NAME,
    deploymentCount: db.meta.deploymentCount,
    totalProfilesSaved: (db.transactions || []).length + 1,
    totalFriendsTracked: db.friends.length,
    activeIntegrations: 3,
    lastSavedTimestamp: db.profile.lastSavedAt
  });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 Google Skills Ecosystem running on port ${PORT}`);
  console.log(`💾 Database: ${DB_NAME} initialized`);
  console.log(`🩺 Health check: http://0.0.0.0:${PORT}/healthz`);
  console.log(`=======================================================`);
});
