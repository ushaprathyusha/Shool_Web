# app/models/classsubject_model.py
from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class ClassSubject(Base):
    __tablename__ = "class_subjects"

    ClassSubjectId = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ClassId = Column(Integer, ForeignKey("classes.ClassId", ondelete="CASCADE"), nullable=False)
    SectionId = Column(Integer, ForeignKey("sections.SectionId", ondelete="CASCADE"), nullable=False)
    SubjectId = Column(String(50), ForeignKey("subjects.SubjectId", ondelete="CASCADE"), nullable=False)
    TypeId = Column(Integer, ForeignKey("subject_types.TypeId", ondelete="SET NULL"))
    StaffId = Column(String(50), ForeignKey("staffs.StaffId", ondelete="SET NULL"))

    def __repr__(self):
        return (
            f"<ClassSubject(ClassSubjectId={self.ClassSubjectId}, "
            f"ClassId={self.ClassId}, SectionId={self.SectionId}, "
            f"SubjectId='{self.SubjectId}', TypeId={self.TypeId}, StaffId='{self.StaffId}')>"
        )
