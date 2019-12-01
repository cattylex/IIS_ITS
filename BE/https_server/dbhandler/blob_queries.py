import sqlite3
from flask import abort
from . import safe_exec
from dbhandler.settings import *
import utility


def get_ticket_picture(id_ticket, id_pic):
    conn = sqlite3.connect(DATABASE)

    query = 'SELECT data,ext FROM picture WHERE ticket=? AND id=?'
    placeholders = (id_ticket, id_pic)

    cur = safe_exec.read(conn, query, placeholders)
    row = cur.fetchone()
    conn.close()
    if row is None:
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'picture')
    return row


def insert_ticket_picture(id_ticket, ext):
    conn = sqlite3.connect(DATABASE)

    # Check if ticket exists first.
    placeholders = (id_ticket,)
    query = 'SELECT NULL FROM ticket WHERE id=?'
    if safe_exec.read(conn, query, placeholders) is None:
        conn.close()
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'ticket')

    query = 'INSERT INTO picture (ticket,ext) VALUES (id_ticket,ext)'
    placeholders = (id_ticket, ext)
    safe_exec.write(conn, query, placeholders)
    conn.close()
