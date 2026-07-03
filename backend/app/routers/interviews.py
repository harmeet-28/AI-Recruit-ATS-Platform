from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"]
)


@router.post("/")
def create_interview(
    interview: schemas.InterviewCreate,
    db: Session = Depends(get_db),
):
    return crud.create_interview(db, interview)


@router.get("/")
def get_interviews(
    db: Session = Depends(get_db),
):
    return crud.get_interviews(db)


@router.delete("/{interview_id}")
def delete_interview(
    interview_id: int,
    db: Session = Depends(get_db),
):
    interview = crud.delete_interview(db, interview_id)

    if interview is None:
        raise HTTPException(
            status_code=404,
            detail="Interview not found",
        )

    return {
        "message": "Interview deleted successfully"
    }