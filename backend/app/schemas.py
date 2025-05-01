
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
