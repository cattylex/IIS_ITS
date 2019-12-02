import sqlite3
from flask import abort
from . import safe_exec, efk_connect as efk_sqlite3
from dbhandler.settings import *
import utility


def get_user_password(login):
    conn = efk_sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT id,password,type FROM user WHERE login=?'
    cur = safe_exec.read(conn, query, (login,))
    password = cur.fetchone()
    conn.close()
    return password


def list_users():
    conn = efk_sqlite3.connect(DATABASE)

    query = 'SELECT * FROM user'
    placeholders = ()

    cur = safe_exec.read(conn, query, placeholders)
    resp = cur.fetchall()
    conn.close()
    return resp


def insert_user(db_write):
    conn = efk_sqlite3.connect(DATABASE)

    placeholders = (db_write.get('name'),
                    db_write.get('mail'),
                    db_write.get('login'),
                    db_write.get('password'),
                    db_write.get('type'))
    query = 'INSERT INTO user (name, mail, login, password, type) VALUES (?, ?, ?, ?, ?)'

    safe_exec.write(conn, query, placeholders)
    conn.close()


def get_specified_user(id):
    conn = efk_sqlite3.connect(DATABASE)

    query = 'SELECT * FROM user WHERE id=?'
    placeholders = (id,)

    cur = safe_exec.read(conn, query, placeholders)
    resp = cur.fetchone()
    conn.close()

    if resp is None:
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'user')
    return resp


def delete_user(id):
    conn = efk_sqlite3.connect(DATABASE)

    query = 'DELETE FROM user WHERE id=?'
    placeholders = (id,)

    cur = safe_exec.write(conn, query, placeholders)
    conn.close()

    if cur.rowcount == 0:
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'user')


def update_users(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)

    updates = []
    for key in ['name', 'mail', 'login', 'password', 'type']:
        if key in kwargs and kwargs[key] != None:
            updates.append(key)

    if len(updates) == 0:
        abort(400, utility.ERR_FMTS['EMPTY_UPDATE']%'user')

    placeholders = (*[kwargs[key] for key in updates], kwargs['id'])
    query = 'UPDATE user SET ' + ','.join(['%s=?'%key for key in updates]) + ' WHERE id=?'

    cur = safe_exec.write(conn, query, placeholders)
    conn.close()

    if cur.rowcount == 0:
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'user')
