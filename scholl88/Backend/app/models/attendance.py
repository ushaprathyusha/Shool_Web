from sqlalchemy import Column, Integer, Date, ForeignKey, String, Text
from app.database import Base

class Attendance(Base):
    __tablename__ = "attendance"

    AttendanceId = Column(Integer, primary_key=True, index=True, autoincrement=True)
    StudentId = Column(Integer, ForeignKey("students.StudentId", ondelete="CASCADE"), nullable=False)
    AttendanceDate = Column(Date, nullable=False)
    AttendanceStatus = Column(String(20), nullable=False)  # e.g., "Present" or "Absent"
    Remarks = Column(Text, nullable=True)
