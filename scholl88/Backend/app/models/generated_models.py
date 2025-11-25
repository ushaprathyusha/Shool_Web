from typing import Optional
import datetime
import decimal

from sqlalchemy import Computed, DECIMAL, Date, Float, ForeignKeyConstraint, Index, Integer, String, TIMESTAMP, Text, Time, text
from sqlalchemy.dialects.mysql import DATETIME, LONGTEXT, MEDIUMBLOB, TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass


class Academicyear(Base):
    __tablename__ = 'academicyear'
    __table_args__ = (
        Index('year_name', 'year_name', unique=True),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    year_name: Mapped[str] = mapped_column(String(20), nullable=False)

    students: Mapped[list['Students']] = relationship('Students', back_populates='academicyear')
    exams: Mapped[list['Exams']] = relationship('Exams', back_populates='academicyear')
    invoice: Mapped[list['Invoice']] = relationship('Invoice', back_populates='academic_year')


class Bloodgroups(Base):
    __tablename__ = 'bloodgroups'

    Id: Mapped[int] = mapped_column(Integer, primary_key=True)
    GroupName: Mapped[Optional[str]] = mapped_column(String(10))

    students: Mapped[list['Students']] = relationship('Students', back_populates='bloodgroups')


class Categories(Base):
    __tablename__ = 'categories'

    Id: Mapped[int] = mapped_column(Integer, primary_key=True)
    CategoryName: Mapped[Optional[str]] = mapped_column(String(50))

    students: Mapped[list['Students']] = relationship('Students', back_populates='categories')


class Classes(Base):
    __tablename__ = 'classes'
    __table_args__ = (
        Index('ClassName', 'ClassName', unique=True),
    )

    ClassId: Mapped[int] = mapped_column(Integer, primary_key=True)
    ClassName: Mapped[str] = mapped_column(String(50), nullable=False)

    feeplans: Mapped[list['Feeplans']] = relationship('Feeplans', back_populates='classes')
    sections: Mapped[list['Sections']] = relationship('Sections', back_populates='classes')
    class_subjects: Mapped[list['ClassSubjects']] = relationship('ClassSubjects', back_populates='classes')
    students: Mapped[list['Students']] = relationship('Students', back_populates='classes')
    timetable: Mapped[list['Timetable']] = relationship('Timetable', back_populates='classes')


class Examtypes(Base):
    __tablename__ = 'examtypes'

    ExamTypeId: Mapped[int] = mapped_column(Integer, primary_key=True)
    ExamTypeName: Mapped[str] = mapped_column(String(100), nullable=False)

    exams: Mapped[list['Exams']] = relationship('Exams', back_populates='examtypes')


class Fees(Base):
    __tablename__ = 'fees'
    __table_args__ = (
        Index('ix_fees_id', 'id'),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    student_name: Mapped[Optional[str]] = mapped_column(String(100))
    amount: Mapped[Optional[float]] = mapped_column(Float)
    status: Mapped[Optional[str]] = mapped_column(String(20))


class Feestatus(Base):
    __tablename__ = 'feestatus'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    status_name: Mapped[str] = mapped_column(String(50), nullable=False)

    invoice: Mapped[list['Invoice']] = relationship('Invoice', back_populates='fee_status')


class Genders(Base):
    __tablename__ = 'genders'

    Id: Mapped[int] = mapped_column(Integer, primary_key=True)
    GenderName: Mapped[Optional[str]] = mapped_column(String(10))

    students: Mapped[list['Students']] = relationship('Students', back_populates='genders')


class Parents(Base):
    __tablename__ = 'parents'
    __table_args__ = (
        Index('ix_parents_id', 'id'),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[Optional[str]] = mapped_column(String(100))
    phone: Mapped[Optional[str]] = mapped_column(String(15))
    email: Mapped[Optional[str]] = mapped_column(String(100))


class Paymenttype(Base):
    __tablename__ = 'paymenttype'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    type_name: Mapped[Optional[str]] = mapped_column(String(100))

    paymenthistory: Mapped[list['Paymenthistory']] = relationship('Paymenthistory', back_populates='payment_type')


class Religions(Base):
    __tablename__ = 'religions'

    Id: Mapped[int] = mapped_column(Integer, primary_key=True)
    ReligionName: Mapped[Optional[str]] = mapped_column(String(50))

    students: Mapped[list['Students']] = relationship('Students', back_populates='religions')


class Staffs(Base):
    __tablename__ = 'staffs'

    StaffId: Mapped[str] = mapped_column(String(50), primary_key=True)
    StaffName: Mapped[Optional[str]] = mapped_column(String(100))

    class_subjects: Mapped[list['ClassSubjects']] = relationship('ClassSubjects', back_populates='staffs')
    timetable: Mapped[list['Timetable']] = relationship('Timetable', back_populates='staffs')


class Statuses(Base):
    __tablename__ = 'statuses'
    __table_args__ = (
        Index('uq_status_name', 'StatusName', unique=True),
    )

    StatusId: Mapped[int] = mapped_column(Integer, primary_key=True)
    StatusName: Mapped[str] = mapped_column(String(100), nullable=False)

    students: Mapped[list['Students']] = relationship('Students', back_populates='statuses')


class SubjectTypes(Base):
    __tablename__ = 'subject_types'

    TypeId: Mapped[int] = mapped_column(Integer, primary_key=True)
    TypeName: Mapped[Optional[str]] = mapped_column(String(50))

    class_subjects: Mapped[list['ClassSubjects']] = relationship('ClassSubjects', back_populates='subject_types')


class Subjects(Base):
    __tablename__ = 'subjects'

    SubjectId: Mapped[str] = mapped_column(String(50), primary_key=True)
    SubjectName: Mapped[str] = mapped_column(String(100), nullable=False)
    Department: Mapped[Optional[str]] = mapped_column(String(100))
    CreatedAt: Mapped[Optional[datetime.datetime]] = mapped_column(TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))

    class_subjects: Mapped[list['ClassSubjects']] = relationship('ClassSubjects', back_populates='subjects')
    timetable: Mapped[list['Timetable']] = relationship('Timetable', back_populates='subjects')


class TimetableConfiguration(Base):
    __tablename__ = 'timetable_configuration'

    ConfigId: Mapped[str] = mapped_column(String(50), primary_key=True)
    InstitutionId: Mapped[str] = mapped_column(String(50), nullable=False)
    TotalPeriods: Mapped[int] = mapped_column(Integer, nullable=False)
    PeriodDurationMinutes: Mapped[int] = mapped_column(Integer, nullable=False)
    StartTime: Mapped[datetime.time] = mapped_column(Time, nullable=False)
    HasLunchBreak: Mapped[Optional[int]] = mapped_column(TINYINT(1), server_default=text("'1'"))
    LunchBreakAfterPeriod: Mapped[Optional[int]] = mapped_column(Integer, server_default=text("'4'"))

    period_structure: Mapped[list['PeriodStructure']] = relationship('PeriodStructure', back_populates='timetable_configuration')
    timetable: Mapped[list['Timetable']] = relationship('Timetable', back_populates='timetable_configuration')


class Feeplans(Base):
    __tablename__ = 'feeplans'
    __table_args__ = (
        ForeignKeyConstraint(['ClassId'], ['classes.ClassId'], ondelete='CASCADE', name='FK_FeePlans_Classes'),
        Index('FK_FeePlans_Classes', 'ClassId')
    )

    FeePlanId: Mapped[int] = mapped_column(Integer, primary_key=True)
    ClassId: Mapped[int] = mapped_column(Integer, nullable=False)
    FeeType: Mapped[Optional[str]] = mapped_column(String(50), server_default=text("'Annual'"))
    TuitionFee: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2), server_default=text("'0.00'"))
    AdmissionFee: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2), server_default=text("'0.00'"))
    BooksFee: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2), server_default=text("'0.00'"))
    UniformFee: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2), server_default=text("'0.00'"))
    TransportationFee: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2), server_default=text("'0.00'"))
    ExamFee: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2), server_default=text("'0.00'"))
    HallTicketFee: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2), server_default=text("'0.00'"))

    classes: Mapped['Classes'] = relationship('Classes', back_populates='feeplans')


class PeriodStructure(Base):
    __tablename__ = 'period_structure'
    __table_args__ = (
        ForeignKeyConstraint(['ConfigId'], ['timetable_configuration.ConfigId'], ondelete='CASCADE', name='fk_period_config'),
        Index('fk_period_config', 'ConfigId')
    )

    PeriodId: Mapped[int] = mapped_column(Integer, primary_key=True)
    ConfigId: Mapped[str] = mapped_column(String(50), nullable=False)
    PeriodNumber: Mapped[int] = mapped_column(Integer, nullable=False)
    StartTime: Mapped[datetime.time] = mapped_column(Time, nullable=False)
    EndTime: Mapped[datetime.time] = mapped_column(Time, nullable=False)
    IsBreak: Mapped[Optional[int]] = mapped_column(TINYINT(1), server_default=text("'0'"))

    timetable_configuration: Mapped['TimetableConfiguration'] = relationship('TimetableConfiguration', back_populates='period_structure')


class Sections(Base):
    __tablename__ = 'sections'
    __table_args__ = (
        ForeignKeyConstraint(['ClassId'], ['classes.ClassId'], ondelete='SET NULL', name='sections_ibfk_1'),
        Index('ClassId', 'ClassId')
    )

    SectionId: Mapped[int] = mapped_column(Integer, primary_key=True)
    SectionName: Mapped[str] = mapped_column(String(50), nullable=False)
    ClassId: Mapped[Optional[int]] = mapped_column(Integer)

    classes: Mapped[Optional['Classes']] = relationship('Classes', back_populates='sections')
    class_subjects: Mapped[list['ClassSubjects']] = relationship('ClassSubjects', back_populates='sections')
    students: Mapped[list['Students']] = relationship('Students', back_populates='sections')
    timetable: Mapped[list['Timetable']] = relationship('Timetable', back_populates='sections')


class ClassSubjects(Base):
    __tablename__ = 'class_subjects'
    __table_args__ = (
        ForeignKeyConstraint(['ClassId'], ['classes.ClassId'], ondelete='CASCADE', name='fk_classsubjects_class'),
        ForeignKeyConstraint(['SectionId'], ['sections.SectionId'], ondelete='CASCADE', name='fk_classsubjects_section'),
        ForeignKeyConstraint(['StaffId'], ['staffs.StaffId'], ondelete='SET NULL', name='fk_classsubjects_staff'),
        ForeignKeyConstraint(['SubjectId'], ['subjects.SubjectId'], ondelete='CASCADE', name='fk_classsubjects_subject'),
        ForeignKeyConstraint(['TypeId'], ['subject_types.TypeId'], ondelete='SET NULL', name='fk_classsubjects_type'),
        Index('fk_classsubjects_class', 'ClassId'),
        Index('fk_classsubjects_section', 'SectionId'),
        Index('fk_classsubjects_staff', 'StaffId'),
        Index('fk_classsubjects_subject', 'SubjectId'),
        Index('fk_classsubjects_type', 'TypeId')
    )

    ClassSubjectId: Mapped[int] = mapped_column(Integer, primary_key=True)
    ClassId: Mapped[int] = mapped_column(Integer, nullable=False)
    SectionId: Mapped[int] = mapped_column(Integer, nullable=False)
    SubjectId: Mapped[str] = mapped_column(String(50), nullable=False)
    TypeId: Mapped[Optional[int]] = mapped_column(Integer)
    StaffId: Mapped[Optional[str]] = mapped_column(String(50))

    classes: Mapped['Classes'] = relationship('Classes', back_populates='class_subjects')
    sections: Mapped['Sections'] = relationship('Sections', back_populates='class_subjects')
    staffs: Mapped[Optional['Staffs']] = relationship('Staffs', back_populates='class_subjects')
    subjects: Mapped['Subjects'] = relationship('Subjects', back_populates='class_subjects')
    subject_types: Mapped[Optional['SubjectTypes']] = relationship('SubjectTypes', back_populates='class_subjects')
    exams: Mapped[list['Exams']] = relationship('Exams', back_populates='class_subjects')


class Students(Base):
    __tablename__ = 'students'
    __table_args__ = (
        ForeignKeyConstraint(['AcademicYearId'], ['academicyear.id'], name='FK_Students_AcademicYear'),
        ForeignKeyConstraint(['AdmissionStatusId'], ['statuses.StatusId'], name='FK_Students_AdmissionStatus'),
        ForeignKeyConstraint(['BloodGroupId'], ['bloodgroups.Id'], name='FK_Students_BloodGroup'),
        ForeignKeyConstraint(['CasteCategoryId'], ['categories.Id'], name='FK_Students_CasteCategory'),
        ForeignKeyConstraint(['ClassId'], ['classes.ClassId'], ondelete='SET NULL', name='students_ibfk_1'),
        ForeignKeyConstraint(['GenderId'], ['genders.Id'], name='FK_Students_Gender'),
        ForeignKeyConstraint(['ReligionId'], ['religions.Id'], name='FK_Students_Religion'),
        ForeignKeyConstraint(['SectionId'], ['sections.SectionId'], ondelete='SET NULL', name='students_ibfk_2'),
        Index('AadhaarCardNumber', 'AadhaarCardNumber', unique=True),
        Index('FK_Students_AcademicYear', 'AcademicYearId'),
        Index('FK_Students_AdmissionStatus', 'AdmissionStatusId'),
        Index('FK_Students_BloodGroup', 'BloodGroupId'),
        Index('FK_Students_CasteCategory', 'CasteCategoryId'),
        Index('FK_Students_Gender', 'GenderId'),
        Index('FK_Students_Religion', 'ReligionId'),
        Index('students_ibfk_1', 'ClassId'),
        Index('students_ibfk_2', 'SectionId')
    )

    StudentId: Mapped[int] = mapped_column(Integer, primary_key=True)
    FirstName: Mapped[str] = mapped_column(String(100), nullable=False)
    LastName: Mapped[str] = mapped_column(String(100), nullable=False)
    DateOfBirth: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    DateOfAdmission: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    Nationality: Mapped[str] = mapped_column(String(50), nullable=False)
    AadhaarCardNumber: Mapped[str] = mapped_column(String(12), nullable=False)
    PermanentAddress: Mapped[str] = mapped_column(Text, nullable=False)
    IsTransferStudent: Mapped[int] = mapped_column(TINYINT(1), nullable=False, server_default=text("'0'"))
    RequiresBooks: Mapped[int] = mapped_column(TINYINT(1), nullable=False, server_default=text("'0'"))
    RequiresUniform: Mapped[int] = mapped_column(TINYINT(1), nullable=False, server_default=text("'0'"))
    RequiresTransport: Mapped[int] = mapped_column(TINYINT(1), nullable=False, server_default=text("'0'"))
    RollNumber: Mapped[Optional[str]] = mapped_column(String(20))
    PhotoData: Mapped[Optional[bytes]] = mapped_column(MEDIUMBLOB)
    ClassId: Mapped[Optional[int]] = mapped_column(Integer)
    SectionId: Mapped[Optional[int]] = mapped_column(Integer)
    AcademicYearId: Mapped[Optional[int]] = mapped_column(Integer)
    GenderId: Mapped[Optional[int]] = mapped_column(Integer)
    ReligionId: Mapped[Optional[int]] = mapped_column(Integer)
    CasteCategoryId: Mapped[Optional[int]] = mapped_column(Integer)
    BloodGroupId: Mapped[Optional[int]] = mapped_column(Integer)
    AdmissionStatusId: Mapped[Optional[int]] = mapped_column(Integer)

    academicyear: Mapped[Optional['Academicyear']] = relationship('Academicyear', back_populates='students')
    statuses: Mapped[Optional['Statuses']] = relationship('Statuses', back_populates='students')
    bloodgroups: Mapped[Optional['Bloodgroups']] = relationship('Bloodgroups', back_populates='students')
    categories: Mapped[Optional['Categories']] = relationship('Categories', back_populates='students')
    classes: Mapped[Optional['Classes']] = relationship('Classes', back_populates='students')
    genders: Mapped[Optional['Genders']] = relationship('Genders', back_populates='students')
    religions: Mapped[Optional['Religions']] = relationship('Religions', back_populates='students')
    sections: Mapped[Optional['Sections']] = relationship('Sections', back_populates='students')
    attendance: Mapped[list['Attendance']] = relationship('Attendance', back_populates='students')
    exam_reports: Mapped[list['ExamReports']] = relationship('ExamReports', back_populates='students')
    invoice: Mapped[list['Invoice']] = relationship('Invoice', back_populates='students')
    student_management: Mapped[list['StudentManagement']] = relationship('StudentManagement', back_populates='students')
    examresults: Mapped[list['Examresults']] = relationship('Examresults', back_populates='students')


class Timetable(Base):
    __tablename__ = 'timetable'
    __table_args__ = (
        ForeignKeyConstraint(['ClassId'], ['classes.ClassId'], ondelete='CASCADE', name='fk_timetable_class'),
        ForeignKeyConstraint(['ConfigId'], ['timetable_configuration.ConfigId'], ondelete='CASCADE', name='fk_timetable_config'),
        ForeignKeyConstraint(['SectionId'], ['sections.SectionId'], ondelete='CASCADE', name='FK_Timetable_Sections'),
        ForeignKeyConstraint(['StaffId'], ['staffs.StaffId'], ondelete='CASCADE', name='fk_timetable_staff'),
        ForeignKeyConstraint(['SubjectId'], ['subjects.SubjectId'], ondelete='CASCADE', name='fk_timetable_subject'),
        Index('FK_Timetable_Sections', 'SectionId'),
        Index('fk_timetable_class', 'ClassId'),
        Index('fk_timetable_config', 'ConfigId'),
        Index('fk_timetable_staff', 'StaffId'),
        Index('fk_timetable_subject', 'SubjectId')
    )

    TimetableId: Mapped[str] = mapped_column(String(50), primary_key=True)
    InstitutionId: Mapped[str] = mapped_column(String(50), nullable=False)
    ConfigId: Mapped[str] = mapped_column(String(50), nullable=False)
    ClassId: Mapped[int] = mapped_column(Integer, nullable=False)
    SubjectId: Mapped[str] = mapped_column(String(50), nullable=False)
    StaffId: Mapped[str] = mapped_column(String(50), nullable=False)
    DayOfWeek: Mapped[str] = mapped_column(String(20), nullable=False)
    PeriodNumber: Mapped[int] = mapped_column(Integer, nullable=False)
    SectionId: Mapped[Optional[int]] = mapped_column(Integer)
    RoomNo: Mapped[Optional[str]] = mapped_column(String(50))
    Notes: Mapped[Optional[str]] = mapped_column(String(255))

    classes: Mapped['Classes'] = relationship('Classes', back_populates='timetable')
    timetable_configuration: Mapped['TimetableConfiguration'] = relationship('TimetableConfiguration', back_populates='timetable')
    sections: Mapped[Optional['Sections']] = relationship('Sections', back_populates='timetable')
    staffs: Mapped['Staffs'] = relationship('Staffs', back_populates='timetable')
    subjects: Mapped['Subjects'] = relationship('Subjects', back_populates='timetable')


class Attendance(Base):
    __tablename__ = 'attendance'
    __table_args__ = (
        ForeignKeyConstraint(['StudentId'], ['students.StudentId'], ondelete='CASCADE', name='fk_attendance_student'),
        Index('uq_student_date', 'StudentId', 'AttendanceDate', unique=True)
    )

    AttendanceId: Mapped[int] = mapped_column(Integer, primary_key=True)
    StudentId: Mapped[int] = mapped_column(Integer, nullable=False)
    AttendanceDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    AttendanceStatus: Mapped[str] = mapped_column(String(20), nullable=False)
    Remarks: Mapped[Optional[str]] = mapped_column(Text)

    students: Mapped['Students'] = relationship('Students', back_populates='attendance')


class ExamReports(Base):
    __tablename__ = 'exam_reports'
    __table_args__ = (
        ForeignKeyConstraint(['StudentId'], ['students.StudentId'], name='exam_reports_ibfk_1'),
        Index('StudentId', 'StudentId'),
        Index('ix_exam_reports_Id', 'Id')
    )

    Id: Mapped[int] = mapped_column(Integer, primary_key=True)
    Subject: Mapped[str] = mapped_column(String(100), nullable=False)
    Marks: Mapped[float] = mapped_column(Float, nullable=False)
    StudentId: Mapped[Optional[int]] = mapped_column(Integer)
    Grade: Mapped[Optional[str]] = mapped_column(String(10))

    students: Mapped[Optional['Students']] = relationship('Students', back_populates='exam_reports')


class Exams(Base):
    __tablename__ = 'exams'
    __table_args__ = (
        ForeignKeyConstraint(['AcademicYearId'], ['academicyear.id'], ondelete='CASCADE', name='fk_exams_academicyear'),
        ForeignKeyConstraint(['ClassSubjectId'], ['class_subjects.ClassSubjectId'], ondelete='CASCADE', name='fk_exams_classsubject'),
        ForeignKeyConstraint(['ExamTypeId'], ['examtypes.ExamTypeId'], ondelete='CASCADE', name='fk_exams_examtype'),
        Index('fk_exams_academicyear', 'AcademicYearId'),
        Index('fk_exams_classsubject', 'ClassSubjectId'),
        Index('fk_exams_examtype', 'ExamTypeId')
    )

    ExamId: Mapped[int] = mapped_column(Integer, primary_key=True)
    UniqueExamCode: Mapped[str] = mapped_column(String(50), nullable=False)
    AcademicYearId: Mapped[int] = mapped_column(Integer, nullable=False)
    ExamTypeId: Mapped[int] = mapped_column(Integer, nullable=False)
    ClassSubjectId: Mapped[int] = mapped_column(Integer, nullable=False)
    StartDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    EndDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)

    academicyear: Mapped['Academicyear'] = relationship('Academicyear', back_populates='exams')
    class_subjects: Mapped['ClassSubjects'] = relationship('ClassSubjects', back_populates='exams')
    examtypes: Mapped['Examtypes'] = relationship('Examtypes', back_populates='exams')
    examresults: Mapped[list['Examresults']] = relationship('Examresults', back_populates='exams')


class Invoice(Base):
    __tablename__ = 'invoice'
    __table_args__ = (
        ForeignKeyConstraint(['StudentId'], ['students.StudentId'], ondelete='CASCADE', name='invoice_ibfk_1'),
        ForeignKeyConstraint(['academic_year_id'], ['academicyear.id'], name='invoice_ibfk_2'),
        ForeignKeyConstraint(['fee_status_id'], ['feestatus.id'], name='invoice_ibfk_3'),
        Index('invoice_ibfk_1', 'StudentId'),
        Index('invoice_ibfk_2', 'academic_year_id'),
        Index('invoice_ibfk_3', 'fee_status_id')
    )

    invoice_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    StudentId: Mapped[int] = mapped_column(Integer, nullable=False)
    academic_year_id: Mapped[int] = mapped_column(Integer, nullable=False)
    fee_status_id: Mapped[int] = mapped_column(Integer, nullable=False)
    invoice_date: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    total_fee: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2), server_default=text("'0.00'"))
    paid_till_now: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2), server_default=text("'0.00'"))
    balance_due: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(10, 2), Computed('((`total_fee` - `paid_till_now`))', persisted=True))
    due_date: Mapped[Optional[datetime.date]] = mapped_column(Date)

    students: Mapped['Students'] = relationship('Students', back_populates='invoice')
    academic_year: Mapped['Academicyear'] = relationship('Academicyear', back_populates='invoice')
    fee_status: Mapped['Feestatus'] = relationship('Feestatus', back_populates='invoice')
    paymenthistory: Mapped[list['Paymenthistory']] = relationship('Paymenthistory', back_populates='invoice')


class StudentManagement(Base):
    __tablename__ = 'student_management'
    __table_args__ = (
        ForeignKeyConstraint(['StudentId'], ['students.StudentId'], name='student_management_ibfk_1'),
        Index('StudentId', 'StudentId'),
        Index('ix_student_management_Id', 'Id')
    )

    Id: Mapped[int] = mapped_column(Integer, primary_key=True)
    StudentId: Mapped[Optional[int]] = mapped_column(Integer)
    Status: Mapped[Optional[str]] = mapped_column(String(50))
    Remarks: Mapped[Optional[str]] = mapped_column(String(255))

    students: Mapped[Optional['Students']] = relationship('Students', back_populates='student_management')


class Examresults(Base):
    __tablename__ = 'examresults'
    __table_args__ = (
        ForeignKeyConstraint(['ExamId'], ['exams.ExamId'], ondelete='CASCADE', name='fk_examresults_exam'),
        ForeignKeyConstraint(['StudentId'], ['students.StudentId'], ondelete='CASCADE', name='fk_examresults_student'),
        Index('fk_examresults_exam', 'ExamId'),
        Index('fk_examresults_student', 'StudentId')
    )

    ExamResultId: Mapped[int] = mapped_column(Integer, primary_key=True)
    ExamId: Mapped[int] = mapped_column(Integer, nullable=False)
    StudentId: Mapped[int] = mapped_column(Integer, nullable=False)
    Marks: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(5, 2))
    Grade: Mapped[Optional[str]] = mapped_column(String(5))

    exams: Mapped['Exams'] = relationship('Exams', back_populates='examresults')
    students: Mapped['Students'] = relationship('Students', back_populates='examresults')


class Paymenthistory(Base):
    __tablename__ = 'paymenthistory'
    __table_args__ = (
        ForeignKeyConstraint(['invoice_id'], ['invoice.invoice_id'], ondelete='CASCADE', name='FK_paymenthistory_invoice'),
        ForeignKeyConstraint(['payment_type_id'], ['paymenttype.id'], ondelete='CASCADE', name='FK_paymenthistory_paymenttype'),
        Index('FK_paymenthistory_invoice', 'invoice_id'),
        Index('FK_paymenthistory_paymenttype', 'payment_type_id')
    )

    payment_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    student_id: Mapped[int] = mapped_column(Integer, nullable=False)
    invoice_id: Mapped[int] = mapped_column(Integer, nullable=False)
    payment_date: Mapped[datetime.datetime] = mapped_column(DATETIME(fsp=6), nullable=False)
    amount_paid: Mapped[decimal.Decimal] = mapped_column(DECIMAL(10, 2), nullable=False)
    payment_type_id: Mapped[int] = mapped_column(Integer, nullable=False)
    notes: Mapped[Optional[str]] = mapped_column(LONGTEXT)

    invoice: Mapped['Invoice'] = relationship('Invoice', back_populates='paymenthistory')
    payment_type: Mapped['Paymenttype'] = relationship('Paymenttype', back_populates='paymenthistory')
