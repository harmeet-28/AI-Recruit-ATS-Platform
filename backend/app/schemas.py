from pydantic import BaseModel


# ---------------- JOB ----------------

class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    description: str
    skills: str


class JobResponse(JobCreate):
    id: int

    class Config:
        from_attributes = True


# ---------------- CANDIDATE ----------------

class CandidateCreate(BaseModel):
    name: str
    email: str
    phone: str
    resume: str = ""
    extracted_skills: str = ""
    match_score: int = 0
    status: str = "Applied"
    job_id: int


class CandidateResponse(CandidateCreate):
    id: int

    class Config:
        from_attributes = True


# ---------------- INTERVIEW ----------------

class InterviewCreate(BaseModel):
    candidate_id: int
    job_id: int
    date: str
    time: str
    mode: str


class InterviewResponse(InterviewCreate):
    id: int

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str