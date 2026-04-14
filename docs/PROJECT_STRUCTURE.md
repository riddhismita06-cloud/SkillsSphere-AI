# Project Structure

This document mirrors the repository layout and explains where contributors should work.

## Top-Level Layout

- `client/` React frontend application
- `server/` Node.js and Express backend
- `ai-ml/` AI and machine learning workflows
- `docs/` Product, architecture, API, and contribution docs

## Frontend Modules (`client/src/modules`)

- `auth/` login, signup, session flows
- `classrooms/` real-time class interfaces
- `resume-analyzer/` resume upload and scoring UX
- `job-matcher/` role-match views and results
- `mock-interview/` interview practice sessions and feedback
- `dashboard/` user performance and growth analytics

## Backend Modules (`server/src/modules`)

- `auth/` authentication and authorization
- `users/` profile and role management
- `classrooms/` session orchestration
- `resumes/` parsing and storage handlers
- `matching/` resume and JD matching logic
- `interviews/` mock interview orchestration
- `analytics/` reporting and metrics

## AI/ML Domains (`ai-ml`)

- `resume-analysis/` resume scoring pipelines
- `jd-matching/` semantic matching workflows
- `interview-feedback/` response evaluation and recommendations
- `shared/` reusable AI/ML utilities

## Documentation Areas (`docs`)

- `architecture/` architecture decision records and diagrams
- `api/` endpoint contracts and examples
- `features/` feature-level behavior notes

## Notes

- Empty folders intentionally contain `.gitkeep` so structure is versioned.
- As implementation begins, add module-level README files where needed.
