from sqlalchemy import Column, Integer, String
from app.database import Base

class Class(Base):
    __tablename__ = "classes"
    
    ClassId    = Column(Integer, primary_key=True, index=True)
    ClassName  = Column(String(100), nullable=False)
