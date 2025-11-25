# app/schemas/invoice_schema.py
from pydantic import BaseModel
from datetime import date
from typing import Optional
from app.schemas import invoice_schema


class InvoiceBase(BaseModel):
    StudentId: int
    academic_year_id: int
    total_fee: float
    paid_till_now: float
    fee_status_id: int
    invoice_date: date
    due_date: Optional[date] = None

class InvoiceCreate(InvoiceBase):
    pass

class InvoiceResponse(InvoiceBase):
    invoice_id: int
    balance_due: float

    class Config:
        from_attributes = True  # replaces orm_mode in Pydantic v2
