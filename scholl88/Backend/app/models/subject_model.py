from sqlalchemy import Column, String, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base

class Subject(Base):
    __tablename__ = "subjects"

    SubjectId = Column(String(50), primary_key=True, index=True)
    SubjectName = Column(String(100), nullable=False)
    Department = Column(String(100), nullable=True)
    CreatedAt = Column(TIMESTAMP, server_default=func.now())
