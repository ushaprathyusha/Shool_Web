from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from app.database import engine

# --- Reflect existing tables from the database ---
Base = automap_base()
Base.prepare(engine, reflect=True)

# --- Access your tables as ORM models ---
Student = Base.classes.students
Attendance = Base.classes.attendance

# --- Example: fetch data ---
if __name__ == "__main__":
    session = Session(engine)
    for student in session.query(Student).limit(5):
        print(student.StudentId, student.FirstName, student.LastName)
    session.close()
