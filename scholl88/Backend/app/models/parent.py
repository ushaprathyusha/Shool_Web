from sqlalchemy import Column, Integer, String
from app.database import Base

class Parent(Base):
    __tablename__ = "parents"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    phone = Column(String(15))
    email = Column(String(100))
