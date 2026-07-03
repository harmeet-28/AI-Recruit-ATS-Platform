# 🤖 AI Recruit - ATS Platform

An **AI-powered Applicant Tracking System (ATS)** built with **React.js, FastAPI, and PostgreSQL**. The platform streamlines the recruitment process by enabling recruiters to manage job postings, candidates, interviews, and perform AI-based resume analysis with automatic skill extraction and candidate-job matching.

---

## 🚀 Features

### 🔐 Authentication
- Admin Login
- User Registration
- Protected Routes
- Session Management

### 📊 Dashboard
- Recruitment Statistics
- Active Jobs Overview
- Candidate Summary
- Interview Overview
- Hiring Pipeline Snapshot

### 💼 Job Management
- Add New Jobs
- View Available Jobs
- Delete Jobs
- Manage Required Skills

### 👥 Candidate Management
- Add Candidates
- Search Candidates
- View Candidate Profile
- Delete Candidates
- Candidate Status Tracking

### 👤 Candidate Profile
- Candidate Details
- AI Match Score
- Extracted Skills
- Recruitment Status

### 📅 Interview Management
- Schedule Interviews
- View Scheduled Interviews
- Delete Interviews

### 🔄 Hiring Pipeline
- Track Recruitment Stages
- Candidate Workflow

### 🤖 AI Resume Analyzer
- Upload Resume (PDF)
- Resume Text Extraction
- Automatic Skill Extraction
- AI Match Score Calculation
- Candidate Recommendation
- Automatic Candidate Status Update

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React
- React Hot Toast

## Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Uvicorn
- pdfplumber

## Database
- PostgreSQL

---

# 📁 Project Structure

```
AI-Recruit-ATS-Platform
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   ├── routers/
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── main.py
│   │
│   ├── uploads/
│   └── requirements.txt
│
├── screenshots/
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/harmeet-28/AI-Recruit-ATS-Platform.git

cd AI-Recruit-ATS-Platform
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger API

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 🗄️ Database Configuration

Create a PostgreSQL database and configure your `.env` file.

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/ats_db
```

---

# 📸 Screenshots

## 🔐 Login

![Login](screenshots/login.png)

---

## 📊 Dashboard Overview

![Dashboard Overview](screenshots/dashboard-overview.png)

---

## 📈 Dashboard Analytics

![Dashboard Analytics](screenshots/dashboard-analytics.png)

---

## 💼 Jobs Management

![Jobs](screenshots/jobs-management.png)

---

## 👥 Candidates Management

![Candidates](screenshots/candidates-management.png)

---

## 👤 Candidate Profile

![Candidate Profile](screenshots/candidate-profile.png)

---

## 📅 Interview Management

![Interview](screenshots/interview-management.png)

---

## 🔄 Hiring Pipeline

![Pipeline](screenshots/pipeline.png)

---

## 🤖 AI Resume Analyzer

![AI Resume Analyzer](screenshots/ai-screening.png)

# 📡 API Endpoints

## Authentication

```
POST /auth/register
POST /auth/login
```

## Jobs

```
GET /jobs
POST /jobs
DELETE /jobs/{id}
```

## Candidates

```
GET /candidates
GET /candidates/{id}
POST /candidates
DELETE /candidates/{id}
```

## Interviews

```
GET /interviews
POST /interviews
DELETE /interviews/{id}
```

## AI Resume

```
POST /resume/upload
```

---

# 🌟 Key Highlights

- Full Stack AI Recruitment Platform
- AI Resume Screening
- Skill Extraction
- Candidate-Job Matching
- Modern Responsive UI
- RESTful API
- PostgreSQL Database Integration
- Secure Authentication
- Clean Project Structure

---

# 🚀 Future Improvements

- JWT Authentication
- Password Encryption (bcrypt)
- Email Notifications
- Analytics Dashboard
- Resume Ranking
- Export Reports (PDF & Excel)
- Dark Mode
- Recruiter Profile Management
- Advanced AI Recommendations

---

# 👨‍💻 Author

**Harmeet Singh**

B.Tech Computer Science & Engineering


### Connect with Me

- GitHub: https://github.com/harmeet-28
- LinkedIn: https://www.linkedin.com/in/harmeet-singh-8b8162337/

---

# ⭐ Show Your Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.

---

# 📄 License

This project is developed for educational and portfolio purposes.
