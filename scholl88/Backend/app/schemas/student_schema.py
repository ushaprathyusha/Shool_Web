from pydantic import BaseModel
from datetime import date

class StudentResponse(BaseModel):
    StudentId: int
    FirstName: str
    LastName: str
    DateOfBirth: date | None
    DateOfAdmission: date | None
    Nationality: str | None
    AadhaarCardNumber: str | None
    PermanentAddress: str | None
    RollNumber: str | None
    IsTransferStudent: bool
    RequiresBooks: bool
    RequiresUniform: bool
    RequiresTransport: bool

    class Config:
        orm_mode = True
