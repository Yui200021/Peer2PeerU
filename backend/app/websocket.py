from fastapi import WebSocket, WebSocketDisconnect, APIRouter
from typing import Dict
from app.database import conn, cursor
import datetime

ws_router = APIRouter()
active_connections: Dict[str, WebSocket] = {}

def get_key(item_id: int, user_id: int) -> str:
    return f"{item_id}-{user_id}"

@ws_router.websocket("/ws/{item_id}/{user_id}")
async def websocket_endpoint(websocket: WebSocket, item_id: int, user_id: int):
    key = get_key(item_id, user_id)
    await websocket.accept()
    active_connections[key] = websocket
    print(f"Connected: {key}")

    try:
        while True:
            data = await websocket.receive_json()
            receiver_id = data["receiver_id"]
            content = data["content"]
            timestamp = datetime.datetime.now().isoformat()

            try:
                cursor.execute("""
                    INSERT INTO Messages (ItemID, SenderID, ReceiverID, Content, Timestamp)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING MessageID
                """, (item_id, user_id, receiver_id, content, timestamp))
                message_id = cursor.fetchone()[0]
                conn.commit()
            except Exception as e:
                print("DB insert failed:", e)
                continue

            message_payload = {
                "message_id": message_id,
                "sender_id": user_id,
                "receiver_id": receiver_id,
                "content": content,
                "timestamp": timestamp
            }

            receiver_key = get_key(item_id, receiver_id)
            if receiver_key in active_connections:
                await active_connections[receiver_key].send_json(message_payload)

            await websocket.send_json(message_payload)

    except WebSocketDisconnect:
        print(f"Disconnected: {key}")
        if key in active_connections:
            del active_connections[key]
