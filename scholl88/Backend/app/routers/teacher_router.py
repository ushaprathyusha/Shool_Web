# app/routers/teacher_router.py
from fastapi import APIRouter

router = APIRouter(prefix="/teacher", tags=["Teacher"])

@router.get("/")
def get_teachers():
    return {"message": "List of teachers"}
