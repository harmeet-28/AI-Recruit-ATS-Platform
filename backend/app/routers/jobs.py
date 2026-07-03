from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post("/")
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db)):
    return crud.create_job(db, job)


@router.get("/")
def get_jobs(db: Session = Depends(get_db)):
    return crud.get_jobs(db)


@router.delete("/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = crud.delete_job(db, job_id)

    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")

    return {"message": "Job deleted successfully"}