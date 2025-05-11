from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.database import conn, cursor
from app.auth import auth_router
from app.transactions import transactions

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/featured")
def get_featured_items():
    return {
        "items": [
            "MacBook Pro",
            "IKEA Desk",
            "Textbooks",
            "Jackets",
            "Phone",
            "Laptop",
            "Headphones",
            "Mouse",
            "Keyboard",
            "Monitor",
            "Speaker",
            "Webcam",
            "Microphone",
            "Camera"
        ]
    }
# @app.get("/users")
# def get_users():
#     cursor.execute("SELECT * FROM Users;")
#     users = cursor.fetchall()
#     return {"users": users}


app.include_router(auth_router)

app.include_router(transactions.router)
