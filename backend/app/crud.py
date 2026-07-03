from sqlalchemy.orm import Session
from app import models, schemas


def create_job(db: Session, job: schemas.JobCreate):
    db_job = models.Job(**job.model_dump())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job


def get_jobs(db: Session):
    return db.query(models.Job).order_by(models.Job.id.desc()).all()


def delete_job(db: Session, job_id: int):
    job = db.query(models.Job).filter(
        models.Job.id == job_id
    ).first()

    if job is None:
        return None

    db.query(models.Interview).filter(
        models.Interview.job_id == job_id
    ).delete(synchronize_session=False)

    db.query(models.Candidate).filter(
        models.Candidate.job_id == job_id
    ).delete(synchronize_session=False)

    db.delete(job)
    db.commit()

    return job


def create_candidate(db: Session, candidate: schemas.CandidateCreate):
    db_candidate = models.Candidate(**candidate.model_dump())
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)
    return db_candidate


def get_candidates(db: Session):
    return db.query(models.Candidate).order_by(models.Candidate.id.desc()).all()


def get_candidate(db: Session, candidate_id: int):
    return db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id
    ).first()


def delete_candidate(db: Session, candidate_id: int):
    candidate = db.query(models.Candidate).filter(
        models.Candidate.id == candidate_id
    ).first()

    if candidate is None:
        return None

    db.query(models.Interview).filter(
        models.Interview.candidate_id == candidate_id
    ).delete(synchronize_session=False)

    db.delete(candidate)
    db.commit()

    return candidate


def create_interview(db: Session, interview: schemas.InterviewCreate):
    db_interview = models.Interview(**interview.model_dump())
    db.add(db_interview)
    db.commit()
    db.refresh(db_interview)
    return db_interview


def get_interviews(db: Session):
    interviews = db.query(models.Interview).all()

    data = []

    for interview in interviews:

        candidate = db.query(models.Candidate).filter(
            models.Candidate.id == interview.candidate_id
        ).first()

        job = db.query(models.Job).filter(
            models.Job.id == interview.job_id
        ).first()

        data.append({
            "id": interview.id,
            "candidate_id": interview.candidate_id,
            "candidate_name": candidate.name if candidate else "Unknown",
            "job_id": interview.job_id,
            "job_title": job.title if job else "Unknown",
            "date": interview.date,
            "time": interview.time,
            "mode": interview.mode,
            "status": "Scheduled",
        })

    return data


def delete_interview(db: Session, interview_id: int):
    interview = db.query(models.Interview).filter(
        models.Interview.id == interview_id
    ).first()

    if interview is None:
        return None

    db.delete(interview)
    db.commit()

    return interview

def dashboard_stats(db: Session):
    jobs = db.query(models.Job).count()

    candidates = db.query(models.Candidate).count()

    interviews = db.query(models.Interview).count()

    shortlisted = db.query(models.Candidate).filter(
        models.Candidate.status == "Shortlisted"
    ).count()

    applied = db.query(models.Candidate).filter(
        models.Candidate.status == "Applied"
    ).count()

    rejected = db.query(models.Candidate).filter(
        models.Candidate.status == "Rejected"
    ).count()

    interviewing = db.query(models.Candidate).filter(
        models.Candidate.status == "Interview"
    ).count()

    selected = db.query(models.Candidate).filter(
        models.Candidate.status == "Selected"
    ).count()

    recent = (
        db.query(models.Candidate)
        .order_by(models.Candidate.id.desc())
        .limit(5)
        .all()
    )

    return {
        "jobs": jobs,
        "candidates": candidates,
        "interviews": interviews,
        "shortlisted": shortlisted,
        "applied": applied,
        "rejected": rejected,
        "interviewing": interviewing,
        "selected": selected,
        "recent": recent,
    }

from app import models

def create_user(db: Session, user):
    db_user = models.User(
        username=user.username,
        email=user.email,
        password=user.password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(
        models.User.email == email
    ).first()