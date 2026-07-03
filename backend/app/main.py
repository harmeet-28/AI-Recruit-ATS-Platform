from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
import app.models

from app.routers import jobs
from app.routers import candidates
from app.routers import resume
from app.routers import interviews
from app.routers import dashboard
from app.routers import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Recruit ATS",
    description="AI Powered Recruitment & Applicant Tracking System",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jobs.router)
app.include_router(candidates.router)
app.include_router(resume.router)
app.include_router(interviews.router)
app.include_router(dashboard.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {
        "message": "🚀 AI Recruit ATS Backend Running Successfully"
    }