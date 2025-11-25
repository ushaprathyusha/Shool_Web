from sqlalchemy import Column, Integer, ForeignKey, Date, DECIMAL, Computed
from app.database import Base

class Invoice(Base):
    __tablename__ = "invoice"

    invoice_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    StudentId = Column(Integer, ForeignKey("students.StudentId", ondelete="CASCADE"), nullable=False)
    academic_year_id = Column(Integer, ForeignKey("academicyear.id"), nullable=False)
    total_fee = Column(DECIMAL(10, 2), default=0.00)
    paid_till_now = Column(DECIMAL(10, 2), default=0.00)
    balance_due = Column(DECIMAL(10, 2), Computed("total_fee - paid_till_now"), nullable=False)
    fee_status_id = Column(Integer, ForeignKey("feestatus.id"), nullable=False)
    invoice_date = Column(Date, nullable=False)
    due_date = Column(Date, nullable=True)
