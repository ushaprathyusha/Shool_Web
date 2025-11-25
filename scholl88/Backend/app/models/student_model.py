from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey, LargeBinary, Boolean
from app.database import Base

class Student(Base):
    __tablename__ = "students"

    StudentId = Column(Integer, primary_key=True, autoincrement=True, index=True)
    FirstName = Column(String(100), nullable=False)
    LastName = Column(String(100), nullable=False)
    DateOfBirth = Column(Date, nullable=False)
    DateOfAdmission = Column(Date, nullable=False)
    Nationality = Column(String(50), nullable=False)
    AadhaarCardNumber = Column(String(12), unique=True, nullable=False)
    PermanentAddress = Column(Text, nullable=False)
    RollNumber = Column(String(20))
    PhotoData = Column(LargeBinary)
    IsTransferStudent = Column(Boolean, nullable=False, default=False)
    RequiresBooks = Column(Boolean, nullable=False, default=False)
    RequiresUniform = Column(Boolean, nullable=False, default=False)
    RequiresTransport = Column(Boolean, nullable=False, default=False)
    ClassId = Column(Integer, ForeignKey("classes.ClassId"))
    SectionId = Column(Integer, ForeignKey("sections.SectionId"))
    AcademicYearId = Column(Integer, ForeignKey("academicyear.id"))
    GenderId = Column(Integer, ForeignKey("genders.Id"))
    ReligionId = Column(Integer, ForeignKey("religions.Id"))
    CasteCategoryId = Column(Integer, ForeignKey("categories.Id"))
    BloodGroupId = Column(Integer, ForeignKey("bloodgroups.Id"))
    AdmissionStatusId = Column(Integer, ForeignKey("statuses.StatusId"))
