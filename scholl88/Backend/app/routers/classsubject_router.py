# app/routers/classsubject_router.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.class_subject import ClassSubject

router = APIRouter(prefix="/classsubject", tags=["ClassSubject"])

@router.get("/")
def get_class_subjects(db: Session = Depends(get_db)):
    subjects = db.query(ClassSubject).all()
    return subjects
