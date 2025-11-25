from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.examresult import ExamResult

router = APIRouter(prefix="/examresult", tags=["Exam Results"])

@router.get("/")
def get_all_exam_results(db: Session = Depends(get_db)):
    return db.query(ExamResult).all()
