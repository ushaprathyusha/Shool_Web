from pydantic import BaseModel

class ExamTypeBase(BaseModel):
    ExamTypeName: str

class ExamTypeCreate(ExamTypeBase):
    pass

class ExamTypeOut(ExamTypeBase):
    id: int

    class Config:
        from_attributes = True  # replaces orm_mode in Pydantic v2
