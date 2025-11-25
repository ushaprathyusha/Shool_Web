from pydantic import BaseModel

class StudentManagementBase(BaseModel):
    StudentId: int
    Status: str
    Remarks: str | None = None

class StudentManagementCreate(StudentManagementBase):
    pass

class StudentManagementOut(StudentManagementBase):
    Id: int
    class Config:
        orm_mode = True
