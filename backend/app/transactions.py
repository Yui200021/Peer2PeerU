# backend/app/routes/transactions.py
from fastapi import APIRouter
from app.database import conn

router = APIRouter()


@router.get("/api/transactions")
def get_transactions():
    cursor = conn.cursor()
    cursor.execute("""
        SELECT 
            t.transactionId,
            i.ItemName,
            ub.FirstName AS BuyerFirstName,
            ub.LastName AS BuyerLastName,
            us.FirstName AS SellerFirstName,
            us.LastName AS SellerLastName,
            t.transactionAmount,
            t.transactionDate
        FROM Transactions t
        JOIN Items i ON t.itemId = i.itemId
        JOIN Users ub ON t.buyerId = ub.StudentID
        JOIN Users us ON t.sellerId = us.StudentID
        ORDER BY t.transactionDate DESC;
    """)
    rows = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    return [dict(zip(columns, row)) for row in rows]
