from pydantic import BaseModel
from datetime import date

class ExamCreate(BaseModel):
    UniqueExamCode: str
    AcademicYearId: int
    ExamTypeId: int
    ClassSubjectId: int
    StartDate: date
    EndDate: date


class ExamOut(ExamCreate):
    ExamId: int

    class Config:
        from_attributes = True  # ✅ Correct for Pydantic v2
