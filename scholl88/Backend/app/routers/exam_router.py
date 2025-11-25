from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.exam import Exam
from app.models.academicyear_model import AcademicYear
from app.models.examtype import ExamType
from app.models.class_subject import ClassSubject
from app.schemas.exam_schema import ExamCreate, ExamOut

router = APIRouter(prefix="/exams", tags=["Exam"])

# @router.post("/", response_model=ExamOut)
# def create_exam(exam: ExamCreate, db: Session = Depends(get_db)):
#     """
#     Create a new exam entry after validating all foreign keys.
#     """
#     try:
#         # ✅ Validate AcademicYearId
#         academic_year = db.query(AcademicYear).filter(AcademicYear.id == exam.AcademicYearId).first()
#         if not academic_year:
#             raise HTTPException(status_code=400, detail="Invalid AcademicYearId")

#         # ✅ Validate ExamTypeId
#         exam_type = db.query(ExamType).filter(ExamType.id == exam.ExamTypeId).first()
#         if not exam_type:
#             raise HTTPException(status_code=400, detail="Invalid ExamTypeId")

#         # ✅ Validate ClassSubjectId
#         class_subject = db.query(ClassSubject).filter(ClassSubject.id == exam.ClassSubjectId).first()
#         if not class_subject:
#             raise HTTPException(status_code=400, detail="Invalid ClassSubjectId")

#         # ✅ Create new exam record
#         db_exam = Exam(**exam.dict())
#         db.add(db_exam)
#         db.commit()
#         db.refresh(db_exam)
#         return db_exam

#     except HTTPException:
#         # Re-raise validation errors without swallowing them
#         raise
#     except Exception as e:
#         db.rollback()
#         print("❌ ERROR creating exam:", str(e))
#         raise HTTPException(status_code=500, detail=f"Failed to create exam: {str(e)}")


@router.get("/", response_model=List[ExamOut])
def get_exams(db: Session = Depends(get_db)):
    """
    Fetch all exams from the database.
    """
    try:
        exams = db.query(Exam).all()
        if not exams:
            raise HTTPException(status_code=404, detail="No exams found")
        return exams
    except Exception as e:
        print("❌ ERROR fetching exams:", str(e))
        raise HTTPException(status_code=500, detail=f"Failed to fetch exams: {str(e)}")

@router.get("/{exam_id}", response_model=ExamOut)
def get_exam(exam_id: int, db: Session = Depends(get_db)):
    """
    Fetch a specific exam by its ID.
    """
    try:
        exam = db.query(Exam).filter(Exam.ExamId == exam_id).first()
        if not exam:
            raise HTTPException(status_code=404, detail="Exam not found")
        return exam
    except Exception as e:
        print("❌ ERROR fetching exam:", str(e))
        raise HTTPException(status_code=500, detail=f"Failed to fetch exam: {str(e)}")