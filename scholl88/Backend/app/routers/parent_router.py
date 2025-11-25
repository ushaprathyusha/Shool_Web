from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.parent import Parent
from fastapi import APIRouter


router = APIRouter(prefix="/parents", tags=["Parents"])

@router.get("/")
def get_parents(db: Session = Depends(get_db)):
    return db.query(Parent).all()
