from pydantic import BaseModel

class AcademicYearBase(BaseModel):
    year_name: str

class AcademicYearCreate(AcademicYearBase):
    pass

class AcademicYearOut(AcademicYearBase):
    id: int

    class Config:
        from_attributes = True  # replaces orm_mode in Pydantic v2
