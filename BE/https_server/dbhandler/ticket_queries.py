import sqlite3
from flask import abort
from . import safe_exec
from dbhandler.settings import *

def list_tickets():
    con = sqlite3.connect(DATABASE)

    query = 'SELECT * FROM ticket'
    placeholders = ()

    cur = safe_exec.read(con, query, placeholders)
    resp = cur.fetchall()
    con.close()
    return resp

def insert_ticket(db_write):
    con = sqlite3.connect(DATABASE)

    placeholders = (db_write['product'],
                    db_write['product_part'],
                    db_write['author'],
                    db_write['name'],
                    db_write['descr'],
                    db_write['state'],
                    db_write['created'])
    query = 'INSERT INTO ticket (product, product_part, author, name, descr, state, created) VALUES (?,?,?,?,?,?,?)'

    safe_exec.write(con, query, placeholders)
    con.close()

def update_ticket(**kwargs):
    conn = sqlite3.connect(DATABASE)

    updates = []
    for key in ['product', 'product_part', 'name', 'descr']:
        if key in kwargs:
            updates.append(key)

    if len(updates) == 0:
        abort(400, 'empty update of ticket')

    placeholders = (*['%s=?'%kwargs[key] for key in updates], kwargs['id'])
    query = 'UPDATE ticket SET ' + ','.join(['%s=?'%key for key in updates]) + ' WHERE id=?'

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        abort(404, 'ticket')
    conn.close()

def delete_ticket(id):
    con = sqlite3.connect(DATABASE)

    query = 'DELETE FROM ticket WHERE id=?'
    placeholders = (id,)

    cur = safe_exec.write(con, query, placeholders)

    if cur.rowcount == 0:
        abort(404, 'ticket')

    con.close()

def get_specified_ticket(id):
    con = sqlite3.connect(DATABASE)

    query = 'SELECT * FROM ticket WHERE id=?'
    placeholders = (id,)

    cur = safe_exec.read(con, query, placeholders)
    resp = cur.fetchone()
    con.close()
    return resp

def get_comments(id):
    con = sqlite3.connect(DATABASE)

    query = 'SELECT * FROM comment WHERE ticket=?'
    placeholders = (id,)

    cur = safe_exec.read(con, query, placeholders)
    resp = cur.fetchall()
    con.close()
    return resp

def insert_comment(db_write):
    con = sqlite3.connect(DATABASE)

    placeholders = (db_write['ticket'],
                    db_write['author'],
                    db_write['content'],
                    db_write['created'])
    query = 'INSERT INTO comment (ticket, author, content, created) VALUES (?,?,?,?)'

    safe_exec.write(con, query, placeholders)
    con.close()

def update_comment(**kwargs):
    conn = sqlite3.connect(DATABASE)

    updates = []
    for key in ['text']:
        if key in kwargs:
            updates.append(key)

    if len(updates) == 0:
        abort(400, 'empty update of comment')

    placeholders = (*['%s=?'%kwargs[key] for key in updates], kwargs['id'], kwargs['c_id'])
    query = 'UPDATE comment SET ' + ','.join(['%s=?'%key for key in updates]) + ' WHERE ticket=? AND id=?'

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        abort(404, 'comment')
    conn.close()

def delete_comment(id, c_id):
    con = sqlite3.connect(DATABASE)

    query = 'DELETE FROM comment WHERE id=? and ticket=?'
    placeholders = [c_id, id]

    cur = safe_exec.write(con, query, placeholders)

    if cur.rowcount == 0:
        abort(404, 'comment')

    con.close()

def get_author_name(id):
    con = sqlite3.connect(DATABASE)

    query = 'SELECT login FROM user WHERE id=?'
    placeholders = (id,)

    cur = safe_exec.read(con, query, placeholders)

    resp = cur.fetchone()
    if resp is not None:
        resp = resp[0]

    con.close()
    return resp

def get_ticket_tasks(id):
    con = sqlite3.connect(DATABASE)

    query = 'SELECT * FROM task WHERE ticket=?'
    placeholders = (id,)

    cur = safe_exec.read(con, query, placeholders)
    resp = cur.fetchall()
    con.close()
    return resp

def insert_task(db_write):
    con = sqlite3.connect(DATABASE)

    placeholders = (db_write['ticket'],
                    db_write['author'],
                    db_write['name'],
                    db_write['descr'],
                    db_write['state'],
                    db_write['ewt'],
                    db_write['ats'],
                    db_write['created'])
    query = 'INSERT INTO task (ticket, author, name, descr, state, ewt, ats, created) VALUES (?,?,?,?,?,?,?,?)'

    safe_exec.write(con, query, placeholders)
    con.close()

def update_task(**kwargs):
    conn = sqlite3.connect(DATABASE)

    updates = []
    for key in ['ticket', 'name', 'descr', 'ewt', 'ats']:
        if key in kwargs:
            updates.append(key)

    if len(updates) == 0:
        abort(400, 'empty update of task')

    placeholders = (*['%s=?'%kwargs[key] for key in updates], kwargs['id'], kwargs['t_id'])
    query = 'UPDATE comment SET ' + ','.join(['%s=?'%key for key in updates]) + ' WHERE ticket=? AND id=?'

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        abort(404, 'task')
    conn.close()

def delete_task(id, t_id):
    con = sqlite3.connect(DATABASE)

    query = 'DELETE FROM task WHERE id=? and ticket=?'
    placeholders = [t_id, id]

    cur = safe_exec.write(con, query, placeholders)

    if cur.rowcount == 0:
        abort(404, 'task')

    con.close()

def tickets_tasks_get_detail(t_id, id):
    con = sqlite3.connect(DATABASE)

    query = 'SELECT * FROM task WHERE id=? AND ticket=?'
    placeholders = [t_id,id]

    cur = safe_exec.read(con, query, placeholders)
    resp = cur.fetchone()
    con.close()
    return resp

def get_employee(t_id):
    con = sqlite3.connect(DATABASE)

    query = 'SELECT employee FROM working_on_task WHERE task=?'
    placeholders = (t_id,)

    cur = safe_exec.read(con, query, placeholders)

    resp = cur.fetchone()
    if resp is not None:
        resp = resp[0]

    con.close()
    return resp

def get_product_name(id):
    con = sqlite3.connect(DATABASE)

    query = 'SELECT name FROM product WHERE id=?'
    placeholders = (id,)

    cur = safe_exec.read(con, query, placeholders)

    resp = cur.fetchone()
    if resp is not None:
        resp = resp[0]

    con.close()
    return resp
