from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database import Base

class ExamResult(Base):
    __tablename__ = "examresults"

    ExamResultId = Column(Integer, primary_key=True, index=True)
    ExamId = Column(Integer, ForeignKey("exams.ExamId"))
    StudentId = Column(Integer, ForeignKey("students.StudentId"))
    Marks = Column(Float)
    Grade = Column(String(10))
