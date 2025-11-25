from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.student_management import StudentModel
from app.models.student_model import Student
from app.schemas.student_management_schema import StudentManagementCreate, StudentManagementOut

router = APIRouter(prefix="/student_management", tags=["Student Management"])

@router.get("/", response_model=List[StudentManagementOut])
def get_all(db: Session = Depends(get_db)):
    """Fetch all student management entries."""
    return db.query(StudentModel).all()


@router.post("/", response_model=StudentManagementOut)
def create_entry(payload: StudentManagementCreate, db: Session = Depends(get_db)):
    """Create a new student management record with StudentId validation."""

    # ✅ Check if the StudentId exists in the students table
    student_exists = db.query(Student).filter(Student.StudentId == payload.StudentId).first()
    if not student_exists:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid StudentId ({payload.StudentId}): No such student found."
        )

    # ✅ Create and insert new record
    entry = StudentModel(**payload.dict())
    db.add(entry)
    db.commit()
    db.refresh(entry)

    return entry
