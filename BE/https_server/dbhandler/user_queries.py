import sqlite3
from flask import abort
from . import safe_exec
from dbhandler.settings import *
import utility


def get_user_password(id):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT password FROM user WHERE id=?'
    cur = safe_exec.read(conn, query, (id,))
    password = cur.fetchone()
    conn.close()
    return password
