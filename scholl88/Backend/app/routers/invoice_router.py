# app/routers/invoice_router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.schemas import invoice_schema
from app.models.student_model import Student
from app.models.invoice import Invoice
from app.database import get_db


router = APIRouter(
    prefix="/invoice",
    tags=["Invoice"]
)

# ✅ Create invoice
@router.post("/", response_model=schemas.invoice_schema.InvoiceResponse)
def create_invoice(invoice: schemas.invoice_schema.InvoiceCreate, db: Session = Depends(get_db)):
    new_invoice = models.invoice.Invoice(**invoice.model_dump())
    db.add(new_invoice)
    db.commit()
    db.refresh(new_invoice)
    return new_invoice

# ✅ Get all invoices
@router.get("/", response_model=list[schemas.invoice_schema.InvoiceResponse])
def get_invoices(db: Session = Depends(get_db)):
    invoices = db.query(models.invoice.Invoice).all()
    return invoices

@router.get("/{student_id}")
def get_invoice(student_id: int, db: Session = Depends(get_db)):
    # Step 1: Check if student exists
    student = db.query(Student).filter(Student.StudentId == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # Step 2: Fetch invoices for that student
    invoices = db.query(Invoice).filter(Invoice.StudentId == student_id).all()
    if not invoices:
        raise HTTPException(status_code=404, detail="Invoice not found")

    # Step 3: Return combined data
    return {
        "StudentId": student.StudentId,
        "FullName": f"{student.FirstName} {student.LastName}",
        "ClassId": student.ClassId,
        "SectionId": student.SectionId,
        "Invoices": [
            {
                "InvoiceId": inv.invoice_id,
                "AcademicYearId": inv.academic_year_id,
                "TotalFee": float(inv.total_fee),
                "PaidTillNow": float(inv.paid_till_now),
                "BalanceDue": float(inv.balance_due),
                "FeeStatusId": inv.fee_status_id,
                "InvoiceDate": str(inv.invoice_date),
                "DueDate": str(inv.due_date) if inv.due_date else None,
            }
            for inv in invoices
        ],
    }