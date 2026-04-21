<a name="top"></a>
![----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

![NSOC'26](https://img.shields.io/badge/NSOC-2026-orange?style=for-the-badge)

**This project is officially registered under nexus spring of code 2026.**

![----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

# SkillSphere AI

SkillSphere AI is an AI-powered full-stack platform that connects **learning**, **skill evaluation**, and **career readiness** in one ecosystem.

It helps:

- **Students** learn, practice, and become job-ready
- **Tutors** run live, interactive classes
- **Recruiters** discover skilled and better-matched candidates

The platform combines live classroom experiences with AI/ML-driven career tools such as resume analysis, job matching, interview practice, and performance tracking.

---

## Project Vision

SkillSphere AI aims to simplify the path from learning to hiring by giving users practical, actionable insights at every stage:

- Learn skills in real-time
- Measure progress through dashboards
- Improve career assets (resume and interview performance)
- Connect capabilities to hiring needs

---

## Core Features

1. **Live Interactive Classrooms**  
   Real-time learning sessions with video, chat, and collaboration.

2. **AI Resume Analyzer**  
   Resume scoring with improvement suggestions. (Route: `/resume-analyzer`)
   - Drag & Drop / clipboard paste upload
   - ATS score with detailed analysis dashboard
   - Missing keyword identification
   - Live PDF document preview

3. **Resume vs Job Description Matcher**  
   ML-assisted comparison between candidate profile and role requirements.

4. **AI Mock Interview System**  
   Interview practice with structured feedback for improvement.

5. **Skill Tracking Dashboard**  
   Performance insights to help students and tutors track growth.

6. **Secure Authentication & Email Verification**  
   OTP-based registration and password recovery system.
   - 6-digit email OTP verification
   - Secure Password Reset (Forgot Password) flow
   - Protection against user enumeration
   - OTP attempt limiting for security

---

## Target Users

- **Students**: build skills, improve resumes, and prepare for jobs
- **Tutors**: teach and manage live learning experiences
- **Recruiters**: identify skilled candidates more efficiently

---

## Project Goals

- Simplify the journey from learning to getting hired
- Provide AI-powered guidance for career growth
- Enable meaningful collaboration between learners and educators
- Keep the platform modular, scalable, and open-source friendly

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Intelligence Layer:** AI/ML for resume analysis, matching, and recommendations

---

## Scalable Folder Structure

The following structure keeps the project modular and easy to scale for new contributors:

```text
SkillSphere-AI/
├── client/                          # React frontend application
│   ├── public/                      # Static public assets
│   └── src/
│       ├── app/                     # App-level providers, routes, layouts
│       │   ├── App.jsx              # Root router (BrowserRouter + Routes)
│       │   └── Home.jsx             # Placeholder home / landing page
│       ├── modules/                 # Feature-based modules
│       │   ├── auth/                # Login, registration, user session flows
│       │   │   └── components/
│       │   │       └── ComponentDemo.jsx  # Form component showcase (route: /demo)
│       │   ├── classrooms/          # Live class UI, chat, collaboration
│       │   ├── resume-analyzer/     # Resume upload, scoring, suggestions
│       │   ├── job-matcher/         # Resume-to-JD matching UI and results
│       │   ├── mock-interview/      # Interview sessions and feedback views
│       │   └── dashboard/           # Skill/performance analytics UI
│       ├── shared/                  # Reusable UI components and hooks
│       │   ├── components/          # Reusable form & UI primitives
│       │   │   ├── Input.jsx        # Text input with label, error, icons, disabled
│       │   │   ├── Button.jsx       # Button with variants, sizes, loading state
│       │   │   ├── Select.jsx       # Dropdown with label, error, disabled
│       │   │   └── index.js         # Barrel export for all shared components
│       │   └── ui/                  # Reserved for layout/compound components
│       ├── services/                # API communication layer
│       ├── utils/                   # Frontend helper utilities
│       └── assets/                  # Images, icons, static resources
│
├── server/                          # Node.js + Express backend
│   ├── index.js                     # Main server entry point
│   ├── example.env                  # Example environment variables
│   ├── package.json                 # Backend dependencies and scripts
│   └── src/
│       ├── config/                  # Environment and app configuration
│       ├── modules/                 # Domain-based backend modules
│       │   ├── auth/                # Authentication and authorization
│       │   ├── users/               # Student, tutor, recruiter profiles
│       │   ├── classrooms/          # Live class/session management
│       │   ├── resumes/             # Resume parsing and storage handling
│       │   │   ├── controller.js    # Resume upload, analyze, result endpoints
│       │   │   └── routes.js        # Resume-related API routes
│       │   ├── matching/            # Resume vs JD matching logic
│       │   ├── interviews/          # Mock interview orchestration
│       │   └── analytics/           # Skill tracking and reporting
│       ├── middleware/              # Request validation, auth guards, etc.
│       │   └── uploadResume.js      # Multer middleware for resume uploads
│       ├── integrations/            # Third-party services (AI providers, etc.)
│       ├── database/                # Database models/schemas and repositories
│       │   └── db.js                # MongoDB connection setup
│       ├── uploads/                 # Uploaded resume files
│       ├── utils/                   # Backend helper utilities
│       │   └── parseResume.js       # PDF parsing and candidate data extraction
│       └── app/                     # App bootstrap, routes, and server entry
│
├── ai-ml/
│   ├── evaluators/                  # AI/ML evaluation logic for resumes, matching, interviews
│   │   ├── skillEvaluator.js        # Resume vs job skill comparison logic
│   │   └── keywordEvaluator.js      # JD keyword relevance vs resume text
│   │   ├── experienceEvaluator.js   # Candidate vs JD experience-level evaluation
│   │       
│   ├── resume-analysis/             # Resume scoring and feedback pipelines
│   ├── jd-matching/                 # Similarity/matching workflows
│   ├── interview-feedback/          # Interview evaluation logic
│   └── shared/                      # Common data processing utilities
│
├── docs/                            # Product and contributor documentation
│   ├── architecture/                # System architecture explanations
│   ├── api/                         # API behavior and endpoint documentation
│   └── features/                    # Feature-level functional documentation
│
└── README.md                        # Project overview for contributors
│   ├── evaluators/
│   │   └── __tests__/
│   │       └── skillEvaluator.test.js
│   ├── interview-feedback/
│   ├── jd-matching/
│   ├── resume-analysis/
│   └── shared/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.css
│   │   │   ├── App.jsx
│   │   │   ├── index.css
│   │   │   └── main.jsx
│   │   ├── assets/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   └── ComponentDemo.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── classrooms/
│   │   │   ├── dashboard/
│   │   │   ├── job-matcher/
│   │   │   ├── landing/
│   │   │   │   ├── LandingPage.jsx
│   │   │   │   └── components/
│   │   │   │       ├── css/
│   │   │   │       └── jsx/
│   │   │   ├── mock-interview/
│   │   │   ├── profile/
│   │   │   │   ├── ProfilePage.jsx
│   │   │   │   └── components/
│   │   │   │       └── ProfileField.jsx
│   │   │   └── resume-analyzer/
│   │   │       ├── components/
│   │   │       │   ├── AnalysisResult.jsx
│   │   │       │   └── DragDropUpload.jsx
│   │   │       ├── pages/
│   │   │       │   └── ResumeAnalyzerPage.jsx
│   │   │       └── services/
│   │   │           └── resumeService.js
│   │   ├── services/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Select.jsx
│   │   │   │   └── index.js
│   │   │   └── landing_components/
│   │   │       ├── Button.css
│   │   │       ├── Button.jsx
│   │   │       ├── Card.css
│   │   │       ├── Card.jsx
│   │   │       ├── Navbar.css
│   │   │       └── Navbar.jsx
│   │   └── utils/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── tailwind.config.cjs
│   └── vite.config.js
├── docs/
│   ├── api/
│   ├── architecture/
│   ├── features/
│   ├── PROJECT_STRUCTURE.md
│   └── QUALITY_GATES.md
├── server/
│   ├── src/
│   │   ├── app/
│   │   ├── config/
│   │   ├── database/
│   │   │   ├── db.js
│   │   │   └── models/
│   │   │       ├── Resume.js    
│   │   │       └── User.js
│   │   ├── integrations/
│   │   ├── middleware/
│   │   │   └── uploadResume.js
│   │   ├── modules/
│   │   │   ├── analytics/
│   │   │   ├── auth/
│   │   │   │   ├── controller.js
│   │   │   │   ├── routes.js
│   │   │   │   └── service.js
│   │   │   ├── classrooms/
│   │   │   ├── interviews/
│   │   │   ├── matching/
│   │   │   ├── resumes/
│   │   │   │   ├── controller.js
│   │   │   │   └── routes.js
│   │   │   └── users/
│   │   ├── uploads/
│   │   ├── utils/
│   │   │   └── parseResume.js
│   │   └── validations/
│   │       └── authValidation.js
│   ├── example.env
│   ├── index.js
│   └── package.json
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```

## API Endpoints (Implemented)

- `GET /health`
- `POST /api/auth/register` (v2: now includes OTP verification)
- `POST /api/auth/verify-email`
- `POST /api/auth/resend-otp`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `POST /api/auth/login`
- `POST /api/resume/upload`
- `POST /api/resume/analyze`
- `GET /api/resume/result/:id`
- `GET /uploads/:filename`

### Why this structure works

- **Feature-first design:** Easier to assign and scale work across teams
- **Clear boundaries:** Frontend, backend, and AI/ML concerns are separated
- **Contributor-friendly:** New developers can quickly find where to work
- **Future-ready:** Supports adding new learning/career modules without major rewrites

---

```md
### Resume Analyzer Backend Progress

Implemented:

- Resume upload support using multer
- Resume parsing using pdf-parse
- Candidate information extraction from uploaded resumes
- Skill comparison between resume skills and job description skills
- Weighted skill score generation
- Detection of matched skills, missing skills, and extra skills
- Explainable feedback for resume vs JD matching
- MongoDB persistence for parsed resume data and skill match results
- Resume schema for storing uploaded file metadata and parsed candidate information
- GET /api/resume/result/:id endpoint to fetch stored resume records
- Reusable `ai-ml/evaluators/keywordEvaluator.js` for resume vs job description text
- Keyword relevance analysis with matched keywords, missing keywords, and weighted keyword score (`weight` default `0.2`)
- Optional `jobDescription` form field on `POST /api/resume/analyze` to run keyword evaluation alongside parsing
- Reusable `ai-ml/evaluators/experienceEvaluator.js` for resume vs job description experience matching
- Experience extraction supports years and months (examples: `18 months`, `1 year 6 months`, `2+ years`)
- Weighted experience scoring with explainable feedback (`score`, `weight`, `candidateExperience`, `requiredExperience`, `experienceGap`)
- Unit tests for experience evaluator at `ai-ml/evaluators/__tests__/experienceEvaluator.test.js`
- `/api/resume/analyze` now includes `experienceMatch` in response and MongoDB resume records

### Authentication & Security Progress

Implemented:

- OTP-based email verification using Nodemailer
- Dual-mode email service (Console logging for dev, SMTP for production)
- Secure password reset flow with enumeration protection
- 6-digit OTP generation with 5-minute expiry logic
- Brute-force protection via OTP attempt limiting (max 5 attempts)
- Reusable `sendEmail` utility for system-wide notifications
- Input validation using Zod schemas for all auth flows
- JWT-based authentication for stateful sessions
- Role-Based Access Control (RBAC) middleware (`student`, `tutor`, `recruiter`)
- Secure Login endpoint with credential verification
```

## For Open-Source Contributors

If you want to contribute, start by understanding:

1. Which user group your change helps (student, tutor, recruiter)
2. Which module it belongs to (classrooms, resumes, matching, interviews, dashboard)
3. Whether the change impacts frontend, backend, AI/ML, or multiple layers

This approach keeps contributions focused, reviewable, and scalable.

---

## Contributor Resources

- Contribution Guide: `CONTRIBUTING.md`
- Code of Conduct: `CODE_OF_CONDUCT.md`
- Security Policy: `SECURITY.md`
- PR Template: `.github/PULL_REQUEST_TEMPLATE.md`
- Issue Templates: `.github/ISSUE_TEMPLATE/`
- Detailed Structure Notes: `docs/PROJECT_STRUCTURE.md`
- PR Quality Gates: `docs/QUALITY_GATES.md`

## PR Checks and Code Review Safety

Automated checks run on pull requests to `main` through:

- `.github/workflows/pr-quality-checks.yml`

These checks validate docs/workflows and, once app code is added, automatically run lint/test/build for `client`, `server`, and `ai-ml` when their dependency manifests exist.

## 🚀 Running the Project

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run dev
```
## 🔐 Environment Variables Setup

Create a `.env` file inside the `server/` folder and add:

PORT=5000
MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

EMAIL_SERVICE_MODE=console
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_smtp_username
EMAIL_PASS=your_smtp_password
 ## 🔐 Google OAuth Setup

1. Go to Google Cloud Console  
2. Create a new project  
3. Enable OAuth APIs  
4. Create OAuth credentials  
5. Add this redirect URI:

http://localhost:5000/api/auth/google/callback

6. Copy Client ID and Client Secret  
7. Add them to your `.env` file  

Server environment variables (create `server/.env` from `server/example.env`):

- `MONGO_URI` or `MONGODB_URI`
- `PORT` (backend default: `5000`)
- `JWT_SECRET` (required for JWT registration)
- `JWT_EXPIRES_IN` (optional, default is `7d`)

Example local development values:

- `JWT_SECRET=skillsphere_dev_jwt_secret_1234567890abcdef`
- `JWT_EXPIRES_IN=7d`
- `EMAIL_SERVICE_MODE=console` (Use "smtp" for real emails)
- `EMAIL_HOST=smtp.mailtrap.io`
- `EMAIL_PORT=2525`
- `EMAIL_USER=your_smtp_username`
- `EMAIL_PASS=your_smtp_password`

```






```
