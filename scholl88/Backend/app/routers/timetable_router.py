from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
from app.models.timetable import Timetable

router = APIRouter(
    prefix="/timetable",
    tags=["Timetable"]
)

@router.get("/")
def get_all_timetables(db: Session = Depends(get_db)):
    timetables = db.query(Timetable).all()
    if not timetables:
        raise HTTPException(status_code=404, detail="No timetable records found")
    return timetables
