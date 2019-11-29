import sqlite3
from . import safe_exec
from dbhandler.settings import *
import restapi.errorhandler as errorhandler

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

def delete_ticket(id):
    con = sqlite3.connect(DATABASE)

    query = 'DELETE FROM ticket WHERE id=?'
    placeholders = (id,)

    cur = safe_exec.write(con, query, placeholders)

    if cur.rowcount == 0:
        errorhandler.send_error(404, 'ticket not found, can not delete')

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

def insert_comment(db_write):
    con = sqlite3.connect(DATABASE)

    placeholders = (db_write['ticket'],
                    db_write['author'],
                    db_write['content'],
                    db_write['created'])
    query = 'INSERT INTO comment (ticket, author, content, created) VALUES (?,?,?,?)'

    safe_exec.write(con, query, placeholders)
    con.close()

def delete_comment(id, c_id):
    con = sqlite3.connect(DATABASE)

    query = 'DELETE FROM comment WHERE id=? and ticket=?'
    placeholders = [c_id, id]

    cur = safe_exec.write(con, query, placeholders)

    if cur.rowcount == 0:
        errorhandler.send_error(404, 'ticket and comment does not match, can not delete')

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

def delete_task(id, t_id):
    con = sqlite3.connect(DATABASE)

    query = 'DELETE FROM task WHERE id=? and ticket=?'
    placeholders = [t_id, id]

    cur = safe_exec.write(con, query, placeholders)

    if cur.rowcount == 0:
        errorhandler.send_error(404, 'ticket and comment does not match, can not delete')

    con.close()

def tickets_tasks_get_detail(t_id, id):
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
