import sqlite3
db_file = "database.db"


def get_name(id):
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    cursor.execute("SELECT NAME FROM speakers WHERE ID = ?", (id,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None


    