from fastapi import APIRouter, HTTPException
from app.schemas import RegisterRequest, LoginRequest
from app.database import conn, cursor
from passlib.context import CryptContext
import traceback
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

auth_router = APIRouter()

@auth_router.post("/register")
def register_user(request: RegisterRequest):
    try:
       
        cursor.execute("SELECT 1 FROM Users WHERE Email = %s", (request.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")

        
        cursor.execute("""
            SELECT 1 FROM Users WHERE UniversityID = %s AND UniversityStudentID = %s
        """, (request.universityid, request.universitystudentid))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="University student ID already in use")

        hashed_password = pwd_context.hash(request.password)
        cursor.execute("""
            INSERT INTO Users (FirstName, LastName, Email, UniversityID, UniversityStudentID, Password)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            request.firstname,
            request.lastname,
            request.email,
            request.universityid,
            request.universitystudentid,
            hashed_password
        ))
        conn.commit()
        return {"message": "User registered successfully"}

    except HTTPException:
        raise  
    except Exception as e:
        conn.rollback()
        print("Error during registration:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


@auth_router.post("/")
def login_user(request: LoginRequest):
    try:
        cursor.execute("SELECT StudentID, Email, Password FROM Users WHERE Email = %s", (request.email,))
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid Email or Password")

        user_id, email, hashed_password = user

        if not pwd_context.verify(request.password, hashed_password):
            raise HTTPException(status_code=401, detail="Invalid Email or Password")

        return {"message": "Login successful", "student_id": user_id}

    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    @auth_router.get("/profile/{studentId}")
    def get_profile(studentId: int):
        cursor.execute("""
                       select studentId, firstName, lastName, Email, UniversityId, UniversityStudentId
                       from users
                       where StudentId= %S
                       """, (studentId,))
        user= cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code= 404, detail= "User not found")
        
        studentid, firstname, lastname,email, universityid, universitysudentid
        
        return{
        "name": f"{firstname} {lastname}",
        "email": email,
        "university" :'',
        "major": "", 
        "year": "",             
        "bio": "",
        "aboutMe": {
            "personalInfo": ".",
            "languages": ["English (Native)", "Spanish (Intermediate)"]
        },
        "avatar": f"https://ui-avatars.com/api/?name={firstname}+{lastname}&background=4CAF50&color=fff&size=150",
        "reviews": []  
        }