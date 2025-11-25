from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import classsubject_router 
from app.routers import class_router
from sqlalchemy import text
from app.routers import invoice_router  # ← important
from app.routers import attendance_router  # ✅ add this import
from app.utils.database import Base, engine
from app.routers import timetable_router
from app.routers import parent_router
from app.routers import exam_router  # 👈 import router
from app.routers import classsubject_router  # 👈 import router
from app.routers import academicyear_router
from app.routers import attendance_router
from app.routers import invoice_router  # 👈 must exist
from app.routers import examresult_router
from app.routers import student_router
from app.routers import teacher_router
from app.routers import subject_router
from app.routers import student_management_router









Base.metadata.create_all(bind=engine)

from app.routers import (
    student_router,
    teacher_router,
    subject_router,
    class_router,
    classsubject_router,
    invoice_router,
    examresult_router,
)

app = FastAPI()

# Allow your frontend origin
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # Allow requests from these URLs
    allow_credentials=True,
    allow_methods=["*"],            # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],            # Allow all headers
)

app.include_router(class_router)
app.include_router(student_router)
app.include_router(teacher_router)
app.include_router(subject_router)
app.include_router(invoice_router.router)
app.include_router(attendance_router.router)  # ✅ include the router
app.include_router(timetable_router.router)
app.include_router(parent_router.router)
app.include_router(exam_router.router)  # 👈 register router
app.include_router(classsubject_router.router)  # 👈 register route
app.include_router(academicyear_router.router)
app.include_router(attendance_router.router)
app.include_router(invoice_router.router)
app.include_router(examresult_router.router)
app.include_router(student_management_router.router)







@app.get("/")
def root():
    return {"message": "Welcome to School Management API"}


# ✅ Root endpoint
@app.get("/")
def root():
    return {"message": "School backend API running successfully and connected to MySQL!"}

# ✅ Test database connection endpoint
@app.get("/test-db")
def test_db():
    """Simple route to verify MySQL database connection."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "✅ Database connection successful!"}
    except Exception as e:
        return {"status": "❌ Database connection failed", "error": str(e)}
