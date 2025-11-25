from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class StudentModel(Base):
    __tablename__ = "student_management"

    Id = Column(Integer, primary_key=True, index=True)
    StudentId = Column(Integer, ForeignKey("students.StudentId"))
    Status = Column(String(50))
    Remarks = Column(String(255))
