from pydantic import BaseModel

class ClassSubjectBase(BaseModel):
    ClassName: str
    SubjectName: str

class ClassSubjectCreate(ClassSubjectBase):
    pass

class ClassSubjectOut(ClassSubjectBase):
    id: int

    class Config:
        from_attributes = True  # replaces orm_mode in Pydantic v2
