from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app= FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://localhost:5176"],  # only allow your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

class LoginRequest(BaseModel):
    email: str
    password: str
    
fake_use= {
    "email":"rock.willson@washburn.edu",
    "password":"Rock@123"
}

@app.post("/login")
async def login(request: LoginRequest):
    if request.email== fake_use["email"] and request.password==fake_use["password"]:
        return {"message":"Login Sucessful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid Email or Password")