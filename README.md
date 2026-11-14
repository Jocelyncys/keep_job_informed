# PathFinder AI — Candidate Application Stage Tracker & Interview Hub

A modern web application built to solve the **"Application Black Hole"** for job candidates. Gives seekers full transparency over their job search stages, customizes CVs to match target Job Descriptions, generates polite follow-up emails during long recruiter silences, and provides role-specific interview coaching with STAR framework answers.

---

## 🌟 Key Features

1. **Candidate Stage Pipeline (No More Black Hole)**:
   - Visual stages: `Applied` ➔ `Under Review` ➔ `Action Required` ➔ `Interviewing` ➔ `Offer` ➔ `Archived`.
   - **Silence Alert**: Flags applications where no update has occurred for 5+ business days.
   - **AI Follow-up Generator**: 1-click polite email generator tailored to the company and recruiter.

2. **AI CV & Resume Customizer**:
   - Compares your base profile & experiences against any target Job Description.
   - Calculates ATS Match % and highlights matching vs. missing keywords.
   - Rewrites achievement bullet points with quantifiable metrics matching the role.

3. **AI Interview Prep & Success Coach**:
   - Generates 4 categories of questions:
     - Technical & Architecture Drill
     - Behavioral Questions with **STAR method** (Situation, Task, Action, Result) tips using your actual past projects
     - Resume Deep Dive / Gap Questions
     - Smart Reverse Questions to ask the hiring team
   - Printable 1-Page Interview Day Cheat Sheet.

4. **Multi-Platform Sync (LinkedIn, Indeed, JobStreet, ATS)**:
   - Transactional email parser (paste recruiter emails to auto-detect and update application stages).
   - URL importer for job postings.

---

## 🚀 Running Locally

```bash
# Navigate to the project directory
cd candidate-tracker-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## ☁️ Easiest Deployment to Google Cloud Run

Deploying to Google Cloud Run takes **just 1 command** using the pre-configured `Dockerfile` and `nginx.conf`:

### Prerequisites
1. Have the [Google Cloud CLI (`gcloud`)](https://cloud.google.com/sdk/docs/install) installed.
2. Log into your Google Cloud account:
   ```bash
   gcloud auth login
   ```
3. Set your active Google Cloud project:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

### 1-Command Deployment:
```bash
gcloud run deploy candidate-hub --source . --port 8080 --region us-central1 --allow-unauthenticated
```

#### What happens behind the scenes:
1. Google Cloud Build packages your code using the multi-stage `Dockerfile`.
2. Stage 1 compiles the optimized React/Vite production bundle.
3. Stage 2 packages it inside a lightweight **Nginx Alpine** web server listening on port `8080`.
4. Cloud Run automatically provisions HTTPS, sets up custom domains, and scales to zero when idle (100% eligible for Google Cloud Free Tier).
