from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
import shutil
import os

from app.database import get_db
from app.ai.parser import extract_text
from app.ai.skills import extract_skills
from app.ai.matcher import calculate_match_score

from app import models

router = APIRouter(
    prefix="/resume",
    tags=["Resume AI"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_resume(
    candidate_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Save PDF
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Find Candidate
    candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id
    ).first()

    if candidate is None:
        return {"error": "Candidate not found"}

    # Find Job
    job = db.query(models.Job).filter(
        models.Job.id == candidate.job_id
    ).first()

    if job is None:
        return {"error": "Job not found"}

    # Extract Resume Text
    resume_text = extract_text(file_path)

    # Extract Resume Skills
    resume_skills = extract_skills(resume_text)

    # Job Skills
    job_skills = [
        skill.strip()
        for skill in job.skills.split(",")
    ]

    # AI Matching
    score, matched = calculate_match_score(
        job_skills,
        resume_skills
    )

    # Update Candidate
    candidate.resume = file.filename
    candidate.extracted_skills = ",".join(resume_skills)
    candidate.match_score = score

    if score >= 70:
        candidate.status = "Shortlisted"
    else:
        candidate.status = "Rejected"

    db.commit()

    return {
    "candidate": candidate.name,
    "job": job.title,
    "resume_skills": resume_skills,
    "matched_skills": matched,
    "missing_skills": [
        skill
        for skill in job_skills
        if skill.lower() not in [s.lower() for s in resume_skills]
    ],
    "score": score,
    "recommendation": (
        "Strong Match"
        if score >= 85
        else "Good Match"
        if score >= 70
        else "Needs Improvement"
    ),
    "status": candidate.status
}