# app/utils/database.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# --- MySQL Connection URL ---
# Format: mysql+pymysql://<username>:<password>@<host>/<database>
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:root@localhost:3306/school_db"


# --- Create Engine ---
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# --- Create SessionLocal ---
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# --- Base class for models ---
Base = declarative_base()

# --- Dependency to get DB session ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
