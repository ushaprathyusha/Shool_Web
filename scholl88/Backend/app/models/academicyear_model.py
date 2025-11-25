from sqlalchemy import Column, Integer, String
from app.database import Base

class AcademicYear(Base):
    __tablename__ = "academicyear"

    id = Column(Integer, primary_key=True, index=True)
    year_name = Column(String(20), nullable=False, unique=True)  # ✅ matches DB column

    def __repr__(self):
        return f"<AcademicYear(id={self.id}, year_name='{self.year_name}')>"
