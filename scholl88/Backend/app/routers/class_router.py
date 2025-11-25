from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.class_model import Class  # ✅ FIX: import your Class model


router = APIRouter(
    prefix="/class",
    tags=["Class"]
)

@router.get("/")
def get_all_classes(db: Session = Depends(get_db)):
    return db.query(Class).all()

