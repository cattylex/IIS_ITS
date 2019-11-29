import sqlite3
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

def insert_tictet(db_write):
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


def get_specified_ticket(id):
    con = sqlite3.connect(DATABASE)

    query = 'SELECT * FROM ticket WHERE id=?'
    placeholders = (id,)

    cur = safe_exec.read(con, query, placeholders)
    resp = cur.fetchall()
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

def tickets_tasks_detail_GET(t_id, id):
    con = sqlite3.connect(DATABASE)

    query = 'SELECT * FROM task WHERE id=? AND ticket=?'
    placeholders = [t_id,id]

    cur = safe_exec.read(con, query, placeholders)
    resp = cur.fetchall()
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
