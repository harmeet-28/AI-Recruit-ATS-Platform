from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/candidates",
    tags=["Candidates"]
)


@router.post("/")
def create_candidate(
    candidate: schemas.CandidateCreate,
    db: Session = Depends(get_db),
):
    return crud.create_candidate(db, candidate)


@router.get("/")
def get_candidates(
    db: Session = Depends(get_db),
):
    return crud.get_candidates(db)


@router.delete("/{candidate_id}")
def delete_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
):
    candidate = crud.delete_candidate(db, candidate_id)

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    return {
        "message": "Candidate deleted successfully"
    }

@router.get("/{candidate_id}")
def get_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
):
    candidate = crud.get_candidate(db, candidate_id)

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    return candidate