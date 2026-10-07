# Google Skills Supercharged: Career & Skill Intelligence Ecosystem

An enterprise-grade, academic-stackable career intelligence platform built upon the Google Skills design system. This system unifies higher education transcripts (e.g., Georgia Tech Scheller MBA), cloud competencies, live labor market signals, and enterprise B2B compliance.

Designed for seamless deployment on **Google Cloud Run**.

---

## 🌟 Core Supercharged Modules

### 1. Student & Professional Interface (Preservation & Expansion)
- **Native Google Skills UI**: Faithfully preserves Google Skills top header, search bar ("What do you want to learn today?"), streak flame counter, star points counter, achievements, and course cards.
- **Georgia Tech Transcript Parser**: Extracts academic history (Analytical Data Modeling, Financial Management, AI in Business).
- **Divergent Elective Skill Extraction Engine**: Automatically contrasts specialized electives (e.g., `PSYC 6010 Cognitive Engineering` vs. `ME 6101 Complex Systems Design`) to project divergent career vectors:
  - **Track X**: Human-Centered AI & Product Strategy ($385k median TC)
  - **Track Y**: Systems Engineering & MLOps Infrastructure ($415k median TC)

### 2. Credential, Minor, and Gap-Analysis Engine
- **Stackable Credential Recommender**: Scans completed course counts to recommend credentials users are 1-2 classes away from earning (e.g., *Graduate Certificate in Decision AI*, *Minor in Computational Finance*, *Google Cloud Professional Architect*).
- **Interactive "Readiness Delta" View**: Select any target executive/engineering position (e.g., *Lead AI Product Manager*) to view:
  - Exact Readiness Score (e.g. 78%)
  - Acquired competencies vs. Readiness Delta gaps
  - Direct 1-click enrollment into prescribed bridge courses and labs.

### 3. Data-Driven ROI & Career Benchmarking Engine
- **Hard Financial Insights**: Surfaces empirical compensation data:
  - *"24% of professionals with this exact course combination make $500,000+ per year."*
  - *"Median salary uplift of +$85,000 (+38%) over non-cloud-certified MBA graduates."*
- **Compensation Percentile Distribution**: Visual breakdown of 25th, 50th, 75th, and 90th percentile Total Compensation (TC).
- **Historical Alumni Career Progression**: Visual 5-year post-graduation timeline tracking real Georgia Tech alumni trajectories into Google, Anthropic, Stripe, and McKinsey.

### 4. Enterprise "Proof of Literacy" Framework (B2B Layer)
- **Corporate Mandates**: Allows enterprise clients (e.g., Alphabet Enterprise Network) to enforce annual/quarterly skill literacy mandates with active compliance clocks.
- **Departmental Skill Debt Heatmap**: Highlights teams with critical literacy deficits before SOC2/compliance audits.
- **W3C Verifiable Credentials**: Generates cryptographic SHA-256 tamper-evident tokens and downloadable "Proof of Literacy" credentials.

### 5. Cross-Platform Ecosystem Ingestion Hub
- **Live Ingestion Pipelines**:
  1. *Georgia Tech Registrar*: Banner & DegreeWorks REST API via OAuth2/OIDC.
  2. *Google Careers*: Internal & External Job Architecture and Requisition Stream.
  3. *Jobs.com & Lightcast*: Real-Time National Labor Aggregator (850,000+ postings).
- **Interactive Stream Simulator**: Trigger on-demand syncs and monitor live telemetry.

---

## 🚀 Running Locally

### Prerequisites
- Node.js v20+ or v22+
- npm v10+

### Development Mode
```bash
# 1. Install dependencies
npm install

# 2. Run Vite development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Local Container Run
```bash
# 1. Build the frontend bundle
npm run build

# 2. Start the Express server
npm start
```
The server will start on [http://localhost:8080](http://localhost:8080) with active `/healthz` monitoring.

---

## ☁️ Deploying to Google Cloud Run

This repository is optimized for 1-command deployment onto Google Cloud Run.

### Option 1: Direct Source Deploy (Recommended)
```bash
gcloud run deploy google-skills-ui \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

### Option 2: Pre-Built Container via Google Cloud Build
```bash
# 1. Build the container image in Google Artifact Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/google-skills-ui

# 2. Deploy to Cloud Run
gcloud run deploy google-skills-ui \
  --image gcr.io/YOUR_PROJECT_ID/google-skills-ui \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

---

## 📄 Product Requirements Document (PRD)

For the complete product architecture, persona specifications, data schemas, and API contracts, see [PRD_CAREER_INTELLIGENCE_ECOSYSTEM.md](./PRD_CAREER_INTELLIGENCE_ECOSYSTEM.md).
