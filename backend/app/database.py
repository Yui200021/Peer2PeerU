import psycopg2

conn = psycopg2.connect(
    database="peer2peeru",
    user="postgres",
    password="Peer@123",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()
