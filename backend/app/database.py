import psycopg2

conn = psycopg2.connect(
    database="phpUandU2",
    user="postgres",
    password="postgres",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()
