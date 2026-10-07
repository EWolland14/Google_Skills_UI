# Google Skills Supercharged: Career & Skill Intelligence Ecosystem
## Product Requirements Document (PRD) & Enterprise System Architecture Blueprint

- **Document Version**: 1.0.0
- **Author**: Lead Product Manager, Enterprise SaaS Architect & UX/UI Strategist
- **Target Platform**: Google Cloud Run (Containerized Microservices & UI)
- **Status**: Approved for Implementation

---

## 1. Executive Summary & Vision

### 1.1 Strategic Thesis
The modern workforce faces a profound fragmentation between **higher education credentialing**, **hyper-specialized cloud learning**, and **real-time labor market demand**. Higher education institutions (such as Georgia Tech) produce foundational and applied degree credits recorded on static registrar transcripts. Meanwhile, modern enterprise tech leaders demand provable, up-to-the-minute technical literacies (e.g., Generative AI orchestration, MLOps, Enterprise Cloud Infrastructure). 

The **Google Skills Supercharged Career & Skill Intelligence Ecosystem** transforms Google Skills from a standalone course-and-badge catalog into an **end-to-end intelligent career mobility engine**. By preserving the clean, trusted, and familiar Google Skills interface and layering on:
1. Academic Transcript Ingestion & Elective Vector Extraction
2. Stackable Credential & Readiness Delta Computation
3. Data-Backed ROI & Compensation Benchmarking ($500k+ Alumni Cohort Tracking)
4. Enterprise B2B "Proof of Literacy" Governance
5. Cross-Platform University Registrar & Job Aggregator Pipelines

The platform establishes an unbreakable, verifiable bridge connecting **learners, academic institutions, tech employers, and enterprise workforces**.

---

## 2. Target Personas & Core Journeys

| Persona | Role / Context | Primary Pain Point | Core Jobs to Be Done |
| :--- | :--- | :--- | :--- |
| **Alex Rivera** | Georgia Tech MBA Student (Tech Concentration) | Completed coursework in analytics and strategy, but uncertain how electives map to emerging AI Product Management roles. | Upload Georgia Tech transcript; extract latent skills from electives (Cognitive Engineering vs Systems Design); compute Readiness Delta against Lead AI PM roles; identify 1-2 Google Skills bridge labs to become 100% qualified. |
| **Marcus Vance** | Senior Solutions Architect (Mid-Career Switcher) | 8 years in legacy on-prem infrastructure, wants to transition to Cloud AI & Quant Strategy; lacks visibility into financial return. | Benchmark career trajectory against historical Georgia Tech alumni; see tangible ROI data ($500k+ TC probability curve); obtain stackable Graduate Certificate in Decision AI. |
| **Elena Rostova** | VP of Engineering / Chief Learning Officer (Enterprise) | Corporate mandates require 2,500 engineers to demonstrate verified GenAI literacy without disruptive downtime. | Set enterprise compliance mandates; monitor departmental "Skill Debt" heatmaps; issue cryptographically verifiable "Proof of Literacy" badges. |
| **Dr. Harlan Vance** | University Registrar & Dean of Academic Innovation | Institutional credits are trapped in legacy Banner/DegreeWorks siloes; students drop out 1-2 classes shy of stackable minors. | Seamless API synchronization into Google Skills; automated stackable minor recommendations; real-time employment feedback loop. |

---

## 3. High-Level Architectural Topology

```
+--------------------------------------------------------------------------------------------------------------------+
|                                              INGESTION LAYER (Module 5)                                            |
|  +---------------------------+    +----------------------------+    +------------------------------------------+   |
|  | Georgia Tech Registrar    |    | Google Careers             |    | Jobs.com / Lightcast                     |   |
|  | Banner / DegreeWorks REST |    | Job Architecture & Reqs    |    | Real-Time Market Aggregator (850k+ jobs) |   |
|  +-------------+-------------+    +--------------+-------------+    +--------------------+---------------------+   |
+----------------|---------------------------------|---------------------------------------|-------------------------+
                 | (OAuth2/OIDC)                   | (Internal REST)                       | (Pub/Sub Stream)
                 v                                 v                                       v
+--------------------------------------------------------------------------------------------------------------------+
|                                           INTELLIGENCE CORE & DATA ENGINE                                          |
|  +---------------------------------------------------------------------------------------------------------------+ |
|  | Cloud Run Core Service (Node.js/Express + React UI Container)                                                 | |
|  |                                                                                                               | |
|  |  [Module 1] Transcript & Elective Parser (Gemini 1.5 Pro / Vertex AI Document Extraction)                     | |
|  |             - OCR / PDF Ingestion -> Course Code Normalization -> Vector Embedding                            | |
|  |             - Divergent Elective Vector Disambiguation (Cognitive/Human-AI vs Systems/Infra)                  | |
|  |                                                                                                               | |
|  |  [Module 2] Stackable Minor & Readiness Delta Engine                                                          | |
|  |             - Degree Audit Graph (Credit Closeness Distance: Target - Earned = Delta)                         | |
|  |             - Bridge Course & Hands-on Lab Synthesizer                                                        | |
|  |                                                                                                               | |
|  |  [Module 3] ROI & Alumni Benchmarking Engine (BigQuery + Gemini Analytics)                                   | |
|  |             - Alumni Trajectory Graph (GT Cohorts 2018-2025 -> FAANG / High-Growth Tech)                      | |
|  |             - Total Comp Distribution ($500k+ Cohort Probability Density, Median Uplift)                     | |
|  |                                                                                                               | |
|  |  [Module 4] Enterprise B2B Proof of Literacy (Cloud Spanner / Verifiable Ledger)                              | |
|  |             - Corporate Mandate Policy Engine                                                                | |
|  |             - Departmental Skill Debt Matrix & Cryptographic W3C Verifiable Credentials                       | |
|  +---------------------------------------------------------------------------------------------------------------+ |
+--------------------------------------------------------------------------------------------------------------------+
                 |
                 v
+--------------------------------------------------------------------------------------------------------------------+
|                                   UNIFIED USER INTERFACE (Google Material 3 / Google Skills)                       |
|  - Google Skills Header (Search, Streak, Points, Cloud Console Action)                                             |
|  - Navigation Rail: Dashboard | Catalog | Paths | Stackable | Readiness Delta | ROI | Enterprise | Ecosystem Hub  |
+--------------------------------------------------------------------------------------------------------------------+
```

---

## 4. Deep-Dive Functional Component Specifications

### 4.1 Component 1: Student & Professional Interface (Preservation & Expansion)

#### 4.1.1 Aesthetic & Visual Identity Preservation
- **Google Design Tokens**: Strict adherence to Google Material 3 design specs:
  - Font: `Google Sans` headers, `Roboto` body.
  - Colors: Google Blue (`#1a73e8`), Google Red (`#ea4335`), Google Yellow (`#fbbc04`), Google Green (`#34a853`), Slate Gray (`#202124`), Neutral Surface (`#f8f9fa`).
  - Google Skills top header: Pill search input (`What do you want to learn today?`), flame streak counter (`5`), star points counter (`120`), and `Apply your skills in Google Cloud console` CTA.
  - Left navigation rail matching Google Skills: Dashboard, Catalog, Paths, Collections, Credentials, Subscriptions, Organizations.

#### 4.1.2 Georgia Tech Transcript Upload & Automated Parsing
- **Ingestion Support**: PDF, OCR image, or verified Georgia Tech Student Portal JSON dump.
- **Pre-Loaded Sample Dataset**: Real-world Georgia Tech MBA records:
  - `MGT 6500`: Analytical Data Modeling (3.0 Credits, Grade: A)
  - `MGT 6090`: Business Fundamentals & Strategic Formulation (3.0 Credits, Grade: A)
  - `MGT 6203`: Data Analytics in Business (3.0 Credits, Grade: A)
  - `CS 7641`: Machine Learning (3.0 Credits, Grade: A)
  - `MGT 6000`: Financial Management (3.0 Credits, Grade: B+)

#### 4.1.3 Divergent Elective Skill Extraction Engine
A key breakthrough of this system is **automated skill extraction from specialized electives** to contrast divergent interest vectors. When an MBA student selects electives, the platform detects their career divergence:
- **Elective A: `PSYC 6010` (Cognitive Engineering & Human Factors)**
  - *Extracted Skills*: Human-AI Interaction, Mental Models, Cognitive Task Analysis, Usability Heuristics, Behavioral Ergonomics.
  - *Interest Vector Polar*: **Track X: Human-Centered AI & Product Strategy**
  - *Career Target*: Director of AI Product, UX Strategy Lead, Generative AI Interaction Designer.
- **Elective B: `ME 6101` (Engineering Design & Systems Architecture)**
  - *Extracted Skills*: Systems Decomposition, Fault Tolerance, Hardware/Software Interfacing, Scalable Pipeline Design.
  - *Interest Vector Polar*: **Track Y: Systems Engineering & MLOps Infrastructure**
  - *Career Target*: Staff Cloud Solutions Architect, Enterprise MLOps Lead, Distributed Systems Director.

---

### 4.2 Component 2: Credential, Minor, and Gap-Analysis Engine

#### 4.2.1 Stackable Credential & Minor Closeness Algorithm
The platform continuously parses the student’s completed course count against accredited academic certificates and Google Cloud credentials:
$$\text{Stackability Completion Rate} = \frac{|C_{\text{completed}} \cap C_{\text{required}}|}{|C_{\text{required}}|} \times 100\%$$

- **Graduate Certificate in Decision AI (Georgia Tech)**:
  - Required: 4 Courses | Completed: 3 Courses (75% Complete).
  - *Remaining Course*: `MGT 8803 - Deep Learning for Business Applications`.
- **Minor in Computational Finance**:
  - Required: 3 Courses | Completed: 2 Courses (66% Complete).
  - *Remaining Course*: `ISYE 6767 - Quantitative Financial Risk Modeling`.
- **Google Cloud Professional Cloud Architect**:
  - Required: 5 Skill Badges | Completed: 4 Badges (80% Complete).
  - *Remaining Lab*: `Managing Cloud Infrastructure with Terraform`.

#### 4.2.2 Interactive "Readiness Delta" View
When a learner chooses a target role (e.g., **Lead AI Product Manager**):
1. **Overall Match Percentage**: Dynamic score calculated from required vs acquired competencies (e.g., **78% Readiness**).
2. **Acquired Competencies (Green)**:
   - Data Analytics & Predictive Modeling (`MGT 6500`, GT MBA)
   - Business Model Strategy & Financial Valuation (`MGT 6090`, GT MBA)
   - Human-AI Cognitive Design (`PSYC 6010`, GT Elective)
3. **Readiness Delta Gaps (Red/Amber)**:
   - Enterprise Generative AI Model Monitoring & Governance
   - Distributed Multi-Cloud Deployment Patterns (Kubernetes & BigQuery)
4. **Targeted Bridge Curriculum**: Direct 1-click enrollment into Google Skills modules:
   - *Course*: "Integrate Generative AI Into Your Data Workflow" (12 hrs)
   - *Lab*: "Using BigQuery Omni with AWS" (40 mins)

---

### 4.3 Component 3: Data-Driven ROI & Career Benchmarking Engine

#### 4.3.1 Financial Compensation Insights & $500k+ Cohort Modeling
Integrates live labor economics data directly alongside recommended tracks:
- **Highlighted Metric**: **"24% of Georgia Tech alumni with this exact course combination [MBA Core + Decision AI + Google Cloud Architect] report earning $500k+ Total Compensation (TC) within 4 years."**
- **Median Salary Delta**: Shows an **+$85,000 (+38%) compensation premium** over non-cloud-certified MBA graduates.
- **Compensation Percentile Distribution**:
  - 25th Percentile: \$210,000 TC ($165k Base + $35k Equity + $10k Bonus)
  - 50th Percentile (Median): \$320,000 TC ($215k Base + $80k Equity + $25k Bonus)
  - 75th Percentile: \$485,000 TC ($275k Base + $160k Equity + $50k Bonus)
  - 90th Percentile: \$620,000 TC ($330k Base + $225k Equity + $65k Bonus)

#### 4.3.2 Historical Alumni Career Progression Mapping
Visual trajectory mapping tracking real historical cohorts from Georgia Tech records and verified LinkedIn/Lightcast signals:
- **Year 0 (Graduation)**: Associate Product Manager / Cloud Strategy Consultant ($145k-$175k)
- **Year 2 (Post-Grad)**: Senior Technical Product Manager / Cloud Solutions Lead ($240k-$290k)
- **Year 4-5 (Leadership)**: Director of AI Product / Principal Cloud Architect ($480k-$640k)
- **Top Verified Employers**: Google, Anthropic, Stripe, McKinsey Digital, JPMorgan Chase, Amazon AWS.

---

### 4.4 Component 4: Enterprise "Proof of Literacy" Framework (B2B Layer)

#### 4.4.1 Corporate Mandates & Compliance Governance
Enterprises can enforce skill literacy policies across technical and non-technical business units:
- **Mandate Campaign**: *Alphabet Q4 Enterprise Generative AI & Cloud Security Literacy Mandate*.
- **Deadline Enforcement**: 30-day compliance clocks with automated Slack/Email nudges.
- **Departmental Skill Debt Heatmap**:
  - Cloud Architecture Team: 94% Compliant (Low Skill Debt)
  - Financial Modeling Team: 71% Compliant (Moderate Skill Debt)
  - Legacy Software Operations: 48% Compliant (**Critical Skill Debt** - Missing GenAI security credentials)

#### 4.4.2 Verifiable Credentials & Audit Exports
- **Cryptographic Verification**: Generates a verifiable SHA-256 tamper-evident hash for each completed literacy cycle.
- **Export Formats**: W3C Verifiable Credential JSON-LD, PDF Audit Certificate, and HRIS/Workday CSV sync.

---

### 4.5 Component 5: Cross-Platform Ecosystem Integration Pipelines

#### 4.5.1 Ingestion Connectors
1. **Georgia Tech Registrar API (Banner / DegreeWorks)**:
   - Protocol: RESTful OAuth2 / OIDC institutional federation.
   - Frequency: Daily automated batch synchronization or on-demand webhook.
   - Ingests: Course code, title, credits, semester, grade, prerequisite fulfillment.
2. **Google Careers Internal & External Pipeline**:
   - Protocol: Private Google RPC / REST Job Architecture Feed.
   - Frequency: Real-time Pub/Sub push.
   - Ingests: Open requisitions, required competency vectors, compensation bands.
3. **Jobs.com & Lightcast Labor Aggregators**:
   - Protocol: Cloud Pub/Sub streaming pipeline.
   - Frequency: Hourly stream processing of 850,000+ national job openings.
   - Ingests: Emerging skill keyword deltas, regional salary curves.

#### 4.5.2 Data Pipeline ETL Architecture
```
[Registrar / Job APIs]
         │
         ▼
[Cloud Functions Ingestion Worker]
         │
         ▼
[Google Cloud Pub/Sub Topic: incoming-records]
         │
         ▼
[Dataflow / Cloud Run Normalizer & Skill Vectorizer (Gemini API)]
         │
         ▼
[Cloud Spanner / BigQuery: Unified Skill Graph & ROI Index]
         │
         ▼
[Cloud Run Frontend UI: Real-Time Interactive Updates]
```

---

## 5. Deployment Architecture for Google Cloud Run

### 5.1 Containerization Specification
- **Base Image**: `node:22-alpine` for ultra-lean, secure container footprint (<150MB).
- **Process Orchestration**: High-performance Express server hosting compiled static Vite frontend bundle and serving dynamic JSON endpoints.
- **Environment Handling**:
  - `PORT`: Cloud Run standard port (defaults to 8080).
  - `NODE_ENV`: `production`.
  - Health check endpoint: `GET /healthz` returning `200 OK`.

### 5.2 One-Command Cloud Run Deployment
```bash
gcloud run deploy google-skills-intelligence \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

---

## 6. Success Metrics & KPIs

| Metric | Target | Measurement Mechanism |
| :--- | :--- | :--- |
| **Transcript Parsing Accuracy** | 99.4% course code & credit extraction | Automated test suite against registrar transcripts |
| **Stackable Credential Completion Rate** | +42% uplift in minor/certificate completions | Institutional degree audit metrics |
| **Career Transition Velocity** | 3.2 months faster time-to-offer for target roles | Alumni self-reported career progression logs |
| **Enterprise Mandate Compliance** | 95%+ completion within 30-day mandate window | B2B Administrative Analytics Dashboard |
