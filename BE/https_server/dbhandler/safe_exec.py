import sqlite3
from flask import abort


def read(conn, query, placeholders):
    try:
        return conn.execute(query, placeholders)

    except sqlite3.Error:
        conn.close()
        abort(500)


def write(conn, query, placeholders):
    try:
        try:
            cur = conn.execute(query, placeholders)
            conn.commit()
            return cur

        except sqlite3.IntegrityError:
            conn.rollback()
            conn.close()
            abort(400)

        except sqlite3.ProgrammingError:
            conn.rollback()
            conn.close()
            abort(500)

    except sqlite3.Error:
        conn.close()
        abort(500)
