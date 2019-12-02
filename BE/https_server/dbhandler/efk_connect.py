import sqlite3

# Establish the database connection and enable foreign keys,
# which are disabled in sqlite3 by defualt due to backward compability.
def connect(db_name: str):
    try:
        conn = sqlite3.connect(db_name)
        conn.execute("PRAGMA foreign_keys = ON")
    except sqlite3.Error:
        conn.close()
        abort(500)
    return conn
