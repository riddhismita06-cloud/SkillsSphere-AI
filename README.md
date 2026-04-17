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
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   │   └── pr-quality-checks.yml
│   ├── CODEOWNERS
│   └── PULL_REQUEST_TEMPLATE.md
├── ai-ml/
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
│   │   │   │   ├── login.css
│   │   │   │   ├── Register.jsx
│   │   │   │   └── register.css
│   │   │   ├── classrooms/
│   │   │   ├── dashboard/
│   │   │   ├── job-matcher/
│   │   │   ├── landing/
│   │   │   │   ├── LandingPage.jsx
│   │   │   │   └── components/
│   │   │   │       ├── css/
│   │   │   │       └── jsx/
│   │   │   ├── mock-interview/
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
- `POST /api/auth/register`
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

Server environment variables (create `server/.env` from `server/example.env`):

- `MONGO_URI` or `MONGODB_URI`
- `PORT` (backend default: `5000`)
- `JWT_SECRET` (required for JWT registration)
- `JWT_EXPIRES_IN` (optional, default is `7d`)

Example local development values:

- `JWT_SECRET=skillsphere_dev_jwt_secret_1234567890abcdef`
- `JWT_EXPIRES_IN=7d`

```






```
