
from pydantic import BaseModel

class RegisterRequest(BaseModel):
    firstname: str
    lastname: str
    email: str
    universityid: int
    universitystudentid: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str
from pydantic import BaseModel

class ProfileUpdate(BaseModel):
    contact: str
    primaryMajor: str
    secondaryMajor: str
    bio: str
