from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.examtype import ExamType
from app.schemas.examtype_schema import ExamTypeCreate, ExamTypeOut

router = APIRouter(prefix="/examtype", tags=["Exam Type"])

@router.get("/", response_model=List[ExamTypeOut])
def get_all_exam_types(db: Session = Depends(get_db)):
    return db.query(ExamType).all()

@router.post("/", response_model=ExamTypeOut)
def create_exam_type(payload: ExamTypeCreate, db: Session = Depends(get_db)):
    existing = db.query(ExamType).filter(ExamType.ExamTypeName == payload.ExamTypeName).first()
    if existing:
        raise HTTPException(status_code=400, detail="Exam type already exists")
    exam_type = ExamType(**payload.dict())
    db.add(exam_type)
    db.commit()
    db.refresh(exam_type)
    return exam_type
