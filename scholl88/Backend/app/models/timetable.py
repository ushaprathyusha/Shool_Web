from sqlalchemy import Column, Integer, String
from app.utils.database import Base  # adjust import if needed

class Timetable(Base):
    __tablename__ = "timetable"

    TimetableId = Column(String(50), primary_key=True, index=True)
    InstitutionId = Column(String(50), nullable=False)
    ConfigId = Column(String(50), nullable=False)
    ClassId = Column(Integer, nullable=False)
    SectionId = Column(Integer, nullable=True)
    SubjectId = Column(String(50), nullable=False)
    StaffId = Column(String(50), nullable=False)
    DayOfWeek = Column(String(20), nullable=False)
    PeriodNumber = Column(Integer, nullable=False)
    RoomNo = Column(String(50), nullable=True)
    Notes = Column(String(255), nullable=True)
