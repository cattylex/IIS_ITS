import sqlite3
from flask import abort
from . import safe_exec
from dbhandler.settings import *
import utility


def list_tickets():
    conn = sqlite3.connect(DATABASE)

    query = 'SELECT * FROM ticket'
    placeholders = ()

    cur = safe_exec.read(conn, query, placeholders)
    resp = cur.fetchall()
    conn.close()
    return resp


def insert_ticket(db_write):
    conn = sqlite3.connect(DATABASE)

    placeholders = (db_write['product'],
                    db_write['product_part'],
                    db_write['author'],
                    db_write['name'],
                    db_write['descr'],
                    db_write['state'],
                    db_write['created'])
    query = 'INSERT INTO ticket (product, product_part, author, name, descr, state, created) VALUES (?,?,?,?,?,?,?)'

    safe_exec.write(conn, query, placeholders)
    conn.close()


def update_ticket(id, author, **kwargs):
    conn = sqlite3.connect(DATABASE)

    updates = []
    for key in ['product', 'product_part', 'name', 'descr']:
        if key in kwargs and kwargs[key] != None:
            updates.append(key)

    if len(updates) == 0:
        abort(400, utility.ERR_FMTS['EMPTY_UPDATE']%'ticket')

    placeholders = (*[kwargs[key] for key in updates], id, author)
    query = 'UPDATE ticket SET ' + ','.join(['%s=?'%key for key in updates]) + ' WHERE id=? AND author=?'

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        # Check if ticket exists.
        query = 'SELECT NULL FROM ticket WHERE id=?'
        product = safe_exec.write(conn, query, (kwargs['id'],)).fetchone()
        conn.close()
        if product is None:
            abort(404, utility.ERR_FMTS['NOT_FOUND']%'ticket')
        else:
            abort(403)

    conn.close()


def delete_ticket(id, author):
    conn = sqlite3.connect(DATABASE)

    query = 'DELETE FROM ticket WHERE id=? AND author=?'
    placeholders = (id, author)

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        # Check if ticket exists.
        query = 'SELECT NULL FROM ticket WHERE id=?'
        product = safe_exec.write(conn, query, (kwargs['id'],)).fetchone()
        conn.close()
        if product is None:
            abort(404, utility.ERR_FMTS['NOT_FOUND']%'ticket')
        else:
            abort(403)

    conn.close()


def get_specified_ticket(id):
    conn = sqlite3.connect(DATABASE)

    query = 'SELECT * FROM ticket WHERE id=?'
    placeholders = (id,)

    cur = safe_exec.read(conn, query, placeholders)
    resp = cur.fetchone()
    conn.close()

    if resp is None:
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'ticket')
    return resp


def get_comments(id):
    conn = sqlite3.connect(DATABASE)

    # Check if ticket exists first.
    placeholders = (id,)
    query = 'SELECT NULL FROM ticket WHERE id=?'
    if safe_exec.read(conn, query, placeholders) is None:
        conn.close()
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'ticket')

    query = 'SELECT * FROM comment WHERE ticket=?'
    cur = safe_exec.read(conn, query, placeholders)
    resp = cur.fetchall()

    conn.close()
    return resp


def insert_comment(db_write):
    conn = sqlite3.connect(DATABASE)

    placeholders = (db_write['ticket'],
                    db_write['author'],
                    db_write['content'],
                    db_write['created'])
    query = 'INSERT INTO comment (ticket, author, content, created) VALUES (?,?,?,?)'

    safe_exec.write(conn, query, placeholders)
    conn.close()


def update_comment(id, c_id, author, **kwargs):
    conn = sqlite3.connect(DATABASE)

    updates = []
    for key in ['text']:
        if key in kwargs and kwargs[key] != None:
            updates.append(key)

    if len(updates) == 0:
        abort(400, utility.ERR_FMTS['EMPTY_UPDATE']%'comment')

    placeholders = (*[kwargs[key] for key in updates], id, c_id, author)
    query = 'UPDATE comment SET ' + ','.join(['%s=?'%key for key in updates]) + ' WHERE ticket=? AND id=? AND author=?'

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        # Check if comment exists.
        query = 'SELECT NULL FROM comment WHERE id=?'
        product = safe_exec.write(conn, query, (kwargs['id'],)).fetchone()
        conn.close()
        if product is None:
            abort(404, utility.ERR_FMTS['NOT_FOUND']%'comment')
        else:
            abort(403)

    conn.close()


def delete_comment(id, c_id, author):
    conn = sqlite3.connect(DATABASE)

    query = 'DELETE FROM comment WHERE id=? and ticket=? AND author=?'
    placeholders = (c_id, id, author)

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        # Check if comment exists.
        query = 'SELECT NULL FROM comment WHERE id=?'
        product = safe_exec.write(conn, query, (kwargs['id'],)).fetchone()
        conn.close()
        if product is None:
            abort(404, utility.ERR_FMTS['NOT_FOUND']%'comment')
        else:
            abort(403)

    conn.close()


def get_ticket_tasks(id):
    conn = sqlite3.connect(DATABASE)

    # Check if ticket exists first.
    placeholders = (id,)
    query = 'SELECT NULL FROM ticket WHERE id=?'
    if safe_exec.read(conn, query, placeholders) is None:
        conn.close()
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'ticket')

    query = 'SELECT * FROM task WHERE ticket=?'
    cur = safe_exec.read(conn, query, placeholders)
    resp = cur.fetchall()

    conn.close()
    return resp


def insert_task(db_write):
    conn = sqlite3.connect(DATABASE)

    placeholders = (db_write['ticket'],
                    db_write['author'],
                    db_write['name'],
                    db_write['descr'],
                    db_write['state'],
                    db_write['ewt'],
                    db_write['ats'],
                    db_write['created'])
    query = 'INSERT INTO task (ticket, author, name, descr, state, ewt, ats, created) VALUES (?,?,?,?,?,?,?,?)'

    safe_exec.write(conn, query, placeholders)
    conn.close()


def update_task(id, t_id, author, **kwargs):
    conn = sqlite3.connect(DATABASE)

    updates = []
    for key in ['ticket', 'name', 'descr', 'ewt', 'ats']:
        if key in kwargs and kwargs[key] != None:
            updates.append(key)

    if len(updates) == 0:
        abort(400, utility.ERR_FMTS['EMPTY_UPDATE']%'task')

    placeholders = (*[kwargs[key] for key in updates], id, t_id, author)
    query = 'UPDATE task SET ' + ','.join(['%s=?'%key for key in updates]) + ' WHERE ticket=? AND id=? AND author=?'

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        # Check if task exists.
        query = 'SELECT NULL FROM task WHERE id=?'
        product = safe_exec.write(conn, query, (kwargs['id'],)).fetchone()
        conn.close()
        if product is None:
            abort(404, utility.ERR_FMTS['NOT_FOUND']%'task')
        else:
            abort(403)

    conn.close()


def delete_task(id, t_id, author):
    conn = sqlite3.connect(DATABASE)

    query = 'DELETE FROM task WHERE id=? AND ticket=? AND author=?'
    placeholders = (t_id, id, author)

    cur = safe_exec.write(conn, query, placeholders)
    conn.close()

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        # Check if task exists.
        query = 'SELECT NULL FROM task WHERE id=?'
        product = safe_exec.write(conn, query, (kwargs['id'],)).fetchone()
        conn.close()
        if product is None:
            abort(404, utility.ERR_FMTS['NOT_FOUND']%'task')
        else:
            abort(403)

    conn.close()


def tickets_tasks_get_detail(t_id, id):
    conn = sqlite3.connect(DATABASE)

    query = 'SELECT * FROM task WHERE id=? AND ticket=?'
    placeholders = (t_id, id)

    cur = safe_exec.read(conn, query, placeholders)
    resp = cur.fetchone()
    conn.close()

    if resp is None:
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'task')
    return resp


def get_user_name(id):
    return get_attr_helper('SELECT login FROM user WHERE id=?', (id,))


def get_employee(t_id):
    return get_attr_helper('SELECT employee FROM working_on_task WHERE task=?', (t_id,))


def get_product_name(id):
    return get_attr_helper('SELECT name FROM product WHERE id=?', (id,))


def get_product_part_name(id):
    return get_attr_helper('SELECT name FROM product_part WHERE id=?', (id,))


def get_ticket_name(id):
    return get_attr_helper('SELECT name FROM ticket WHERE id=?', (id,))


def get_attr_helper(query, placeholders):
    conn = sqlite3.connect(DATABASE)
    cur = safe_exec.read(conn, query, placeholders)
    resp = cur.fetchone()

    if resp is not None:
        resp = resp[0]

    conn.close()
    return resp


def get_ticket_images(id):
    conn = sqlite3.connect(DATABASE)
    query = 'SELECT id FROM picture WHERE ticket=?'
    imlist = safe_exec.read(conn, query, (id,)).fetchall()
    conn.close()
    return imlist
