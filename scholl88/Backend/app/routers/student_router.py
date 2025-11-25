from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.student_model import Student
from app.models.timetable import Timetable   # <-- Fix this based on your actual file name
from app import models
from app import models, schemas
from app.models.examresult import ExamResult


router = APIRouter()

@router.get("/students/{student_id}")
def get_student(student_id: int, db: Session = Depends(get_db)):
    student_data = db.query(Student).filter(Student.StudentId == student_id).first()
    if not student_data:
        raise HTTPException(status_code=404, detail="Student not found")
    return student_data
@router.get("/students/")
def get_all_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    return students
@router.get("/students/{student_id}/{classid}/{sectionid}/timetable")
def get_student_timetable(student_id: int, classid: int, sectionid: int, db: Session = Depends(get_db)):
    # Verify if the student exists
    student = db.query(Student).filter(Student.StudentId == student_id,
                                       Student.ClassId == classid,
                                       Student.SectionId == sectionid).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found with the provided ClassId and SectionId")

    # Fetch the timetable for the given ClassId and SectionId
    timetable = db.query(Timetable).filter(Timetable.ClassId == classid,
                                           Timetable.SectionId == sectionid).all()
    return timetable

@router.get("/students/{student_id}/{examid}/marks")
def get_student_marks(student_id: int, examid: int, db: Session = Depends(get_db)):
    # Verify if the student exists
    student = db.query(Student).filter(Student.StudentId == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # Fetch the exam results for the given StudentId and ExamId
    exam_results = db.query(ExamResult).filter(ExamResult.StudentId == student_id,
                                               ExamResult.ExamId == examid).all()
    if not exam_results:
        raise HTTPException(status_code=404, detail="No exam results found for the given StudentId and ExamId")

    return exam_results

@router.get("/students/{student_id}/{classid}/{sectionid}/{invoice_id}/invoice")
def get_student_invoice(student_id: int, classid: int, sectionid: int, invoice_id: int, db: Session = Depends(get_db)):
    # Verify if the student exists
    student = db.query(Student).filter(Student.StudentId == student_id,
                                       Student.ClassId == classid,
                                       Student.SectionId == sectionid).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found with the provided ClassId and SectionId")

    # Fetch the invoice for the given StudentId and InvoiceId
    invoice = db.query(models.invoice.Invoice).filter(models.invoice.Invoice.StudentId == student_id,
                                                      models.invoice.Invoice.invoice_id == invoice_id).first()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found for the given StudentId and InvoiceId")

    return invoice

@router.get("/students/{student_id}/{classid}/{sectionid}/{attendanceid}/attendance")
def get_student_attendance(student_id: int, classid: int, sectionid: int, attendanceid: int, db: Session = Depends(get_db)):
    # Verify if the student exists
    student = db.query(Student).filter(Student.StudentId == student_id,
                                       Student.ClassId == classid,
                                       Student.SectionId == sectionid).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found with the provided ClassId and SectionId")

    # Fetch the attendance record for the given StudentId and AttendanceId
    attendance = db.query(models.Attendance).filter(models.Attendance.StudentId == student_id,
                                                    models.Attendance.AttendanceId == attendanceid).first()
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance record not found for the given StudentId and AttendanceId")

    return attendance

@router.get("/students/{student_id}/marks")
def get_all_student_marks(student_id: int, db: Session = Depends(get_db)):
    # Verify if the student exists
    student = db.query(Student).filter(Student.StudentId == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # Fetch all exam results for the given StudentId
    exam_results = db.query(ExamResult).filter(ExamResult.StudentId == student_id).all()
    if not exam_results:
        raise HTTPException(status_code=404, detail="No exam results found for the given StudentId")

    return exam_results