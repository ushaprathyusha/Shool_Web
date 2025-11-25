from sqlalchemy import Column, Integer, String
from app.database import Base

class ExamType(Base):
    __tablename__ = "examtype"

    ExamTypeId = Column(Integer, primary_key=True, index=True)
    ExamTypeName = Column(String(100), nullable=False)

    def __repr__(self):
        return f"<ExamType(id={self.id}, ExamTypeName='{self.ExamTypeName}')>"
