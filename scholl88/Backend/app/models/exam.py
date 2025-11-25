from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Exam(Base):
    __tablename__ = "exams"

    ExamId = Column(Integer, primary_key=True, index=True, autoincrement=True)
    UniqueExamCode = Column(String(50), nullable=False)
    AcademicYearId = Column(Integer, nullable=False)
    ExamTypeId = Column(Integer, nullable=False)
    ClassSubjectId = Column(Integer, nullable=False)
    StartDate = Column(Date, nullable=False)
    EndDate = Column(Date, nullable=False)

    # ✅ Optional: Add this only if a StudentId column exists in the future
    # StudentId = Column(Integer, ForeignKey("students.StudentId"), nullable=True)
    # student = relationship("Student", back_populates="exams")

