import traceback
from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import Response
from passlib.context import CryptContext
from app.schemas import RegisterRequest, LoginRequest, ProfileUpdate
from app.database import conn, cursor  # Ensure connection setup is correct
import psycopg2
import base64
auth_router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# -------------------- Register Endpoint --------------------


@auth_router.post("/register")
def register_user(request: RegisterRequest):
    try:
        cursor.execute("SELECT 1 FROM Users WHERE Email = %s",
                       (request.email,))
        if cursor.fetchone():
            raise HTTPException(
                status_code=400, detail="Email already registered")

        cursor.execute("""
            SELECT 1 FROM Users WHERE UniversityID = %s AND UniversityStudentID = %s
        """, (request.universityid, request.universitystudentid))
        if cursor.fetchone():
            raise HTTPException(
                status_code=400, detail="University student ID already in use")

        hashed_password = pwd_context.hash(request.password)
        cursor.execute("""
            INSERT INTO Users (firstName, lastName, email, universityID, universityStudentID, password)
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
        traceback.print_exc()

        raise HTTPException(status_code=500, detail="Internal Server Error")


# -------------------- Login Endpoint --------------------
@auth_router.post("/")
def login_user(request: LoginRequest):
    try:
        cursor.execute(
            "SELECT StudentID, Email, Password FROM Users WHERE Email = %s", (request.email,))
        user = cursor.fetchone()

        if not user:
            raise HTTPException(
                status_code=401, detail="Invalid Email or Password")

        user_id, email, hashed_password = user

        if not pwd_context.verify(request.password, hashed_password):
            raise HTTPException(
                status_code=401, detail="Invalid Email or Password")

        return {"message": "Login successful", "student_id": user_id}

    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


# -------------------- Get Profile Endpoint --------------------
@auth_router.get("/profile/{studentId}")
def get_profile(studentId: int):
    cursor.execute("""
        SELECT StudentID, FirstName, LastName, Email, UniversityId, UniversityStudentId,
               ContactNumber, PrimaryMajor, SecondaryMajor, Bio, ProfilePicture
        FROM Users
        WHERE StudentID = %s
    """, (studentId,))
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Convert image binary to base64 string if it exists
    image_base64 = base64.b64encode(user[10]).decode(
        'utf-8') if user[10] else None

    return {
        "name": f"{user[1]} {user[2]}",
        "email": user[3],
        "universityId": user[4],
        "universityStudentId": user[5],
        "contact": user[6],
        "primaryMajor": user[7],
        "secondaryMajor": user[8],
        "bio": user[9],
        "profileImage": f"data:image/jpeg;base64,{image_base64}" if image_base64 else None,
    }


@auth_router.put("/profile/{studentId}")
def update_profile(studentId: int, request: ProfileUpdate):
    try:
        cursor.execute("""
            UPDATE Users
            SET ContactNumber = %s,
                PrimaryMajor = %s,
                SecondaryMajor = %s,
                Bio = %s
            WHERE StudentID = %s
        """, (
            request.contact,
            request.primaryMajor,
            request.secondaryMajor,
            request.bio,
            studentId
        ))
        conn.commit()
        return {"message": "Profile updated successfully ✅"}
    except Exception as e:
        conn.rollback()
        print("Error during profile update:", e)
        raise HTTPException(status_code=500, detail="Failed to update profile")

# -------------------- Profile Picture Upload --------------------


@auth_router.post("/upload-profile-image/{student_id}")
async def upload_profile_image(student_id: int, file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(
            status_code=400, detail="Only JPEG and PNG images are allowed")
    try:
        content = await file.read()
        cursor.execute("UPDATE users SET profilepicture = %s WHERE studentid = %s",
                       (psycopg2.Binary(content), student_id))
        conn.commit()
        return {"message": "Profile image uploaded successfully ✅"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail="Failed to upload profile image")


# -------------------- Get Profile Image --------------------
@auth_router.get("/profile-image/{student_id}")
def get_profile_image(student_id: int):
    cursor.execute(
        "SELECT profilepicture FROM users WHERE studentid = %s", (student_id,))
    row = cursor.fetchone()
    if row and row[0]:
        return Response(content=row[0], media_type="image/jpeg")
    raise HTTPException(status_code=404, detail="Profile image not found")


# -------------------- Item Image Upload --------------------
@auth_router.post("/upload-item-image/{item_id}")
async def upload_item_image(item_id: int, file: UploadFile = File(...)):
    try:
        content = await file.read()
        cursor.execute("UPDATE items SET item_image = %s WHERE itemid = %s",
                       (psycopg2.Binary(content), item_id))
        conn.commit()
        return {"message": "Item image uploaded successfully ✅"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail="Failed to upload item image")


# -------------------- Get Item Image --------------------
@auth_router.get("/item-image/{item_id}")
def get_item_image(item_id: int):
    cursor.execute(
        "SELECT item_image FROM items WHERE itemid = %s", (item_id,))
    row = cursor.fetchone()
    if row and row[0]:
        return Response(content=row[0], media_type="image/jpeg")
    raise HTTPException(status_code=404, detail="Item image not found")
