from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.academicyear_model import AcademicYear
from app.schemas.academicyear_schema import AcademicYearCreate, AcademicYearOut

router = APIRouter(prefix="/academicyear", tags=["Academic Year"])

@router.get("/", response_model=List[AcademicYearOut])
def get_all_years(db: Session = Depends(get_db)):
    return db.query(AcademicYear).all()

@router.post("/", response_model=AcademicYearOut)
def create_year(payload: AcademicYearCreate, db: Session = Depends(get_db)):
    existing = db.query(AcademicYear).filter(AcademicYear.YearName == payload.YearName).first()
    if existing:
        raise HTTPException(status_code=400, detail="Academic year already exists")
    year = AcademicYear(**payload.dict())
    db.add(year)
    db.commit()
    db.refresh(year)
    return year
