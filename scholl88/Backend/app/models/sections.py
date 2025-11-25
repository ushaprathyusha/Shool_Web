from sqlalchemy import Column, Integer, String
from app.database import Base

class Section(Base):
    __tablename__ = "sections"

    SectionId = Column(Integer, primary_key=True, index=True)
    SectionName = Column(String(50), nullable=False)
