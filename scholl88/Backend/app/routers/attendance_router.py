# app/routers/attendance_router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.models.student_model import Student
from app.models.attendance import Attendance
# from app.models.attendance import Attendance



router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)

@router.get("/")
def get_all_attendance(db: Session = Depends(get_db)):
    attendance_records = db.query(Attendance).all()
    if not attendance_records:
        raise HTTPException(status_code=404, detail="No attendance records found")
    return attendance_records

@router.get("/{student_id}")
def get_attendance(student_id: int, db: Session = Depends(get_db)):
    # Check if student exists
    student = db.query(Student).filter(Student.StudentId == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail=f"Student with ID {student_id} not found")

    # Fetch all attendance records for this student
    attendance_records = db.query(Attendance).filter(Attendance.StudentId == student_id).all()

    if not attendance_records:
        raise HTTPException(status_code=404, detail=f"No attendance records found for StudentId {student_id}")

    # Build full response
    return {
        "StudentId": student.StudentId,
        "FullName": f"{student.FirstName} {student.LastName}",
        "DateOfBirth": str(student.DateOfBirth),
        "ClassId": student.ClassId,
        "SectionId": student.SectionId,
        "AcademicYearId": student.AcademicYearId,
        "RollNumber": student.RollNumber,
        "IsTransferStudent": student.IsTransferStudent,
        "Attendance": [
            {
                "AttendanceId": a.AttendanceId,
                "AttendanceDate": str(a.AttendanceDate),
                "Status": a.AttendanceStatus,
                "Remarks": a.Remarks,
            }
            for a in attendance_records
        ]
    }
