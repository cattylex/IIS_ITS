import sqlite3
from flask import abort
from . import safe_exec, efk_connect as efk_sqlite3
from dbhandler.settings import *
import utility


def list_products(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT p.id AS id,p.name AS name,p.author AS author,p.manager AS manager,' \
          + 'm.login AS manager_nickname,a.login AS author_nickname\n' \
          + 'FROM product p JOIN user m ON p.manager=m.id JOIN user a ON p.author=a.id'
    placeholders = ()

    cur = safe_exec.read(conn, query, placeholders)
    rows = cur.fetchall()
    conn.close()
    return rows


def insert_product(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)

    query = 'INSERT INTO product (name,author,manager,descr) VALUES (?,?,?,?)'
    placeholders = (kwargs.get('name'),
                    kwargs.get('author'),
                    kwargs.get('manager'),
                    kwargs.get('descr'))

    safe_exec.write(conn, query, placeholders)
    conn.close()


def get_product(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT p.id AS id,p.name AS name,p.author AS author,p.manager AS manager,p.descr AS descr,' \
          + 'm.login AS manager_nickname,a.login AS author_nickname\n' \
          + 'FROM product p JOIN user m ON p.manager=m.id JOIN user a ON p.author=a.id WHERE p.id=?'

    placeholders = (kwargs.get('id_product'),)

    cur = safe_exec.read(conn, query, placeholders)
    row = cur.fetchone()
    conn.close()

    if row == None:
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'product')
    return row


def update_product(force, **kwargs):
    conn = efk_sqlite3.connect(DATABASE)

    updates = []
    for key in ['name', 'author', 'manager', 'descr']:
        if key in kwargs and kwargs[key] != None:
            updates.append(key)

    if len(updates) == 0:
        abort(400, utility.ERR_FMTS['EMPTY_UPDATE']%'product')

    placeholders = [*[kwargs[key] for key in updates], kwargs['id_product']]
    query = 'UPDATE product SET ' + ','.join(['%s=?'%key for key in updates]) + ' WHERE id=?'

    if not force:
        query += ' AND author=?'
        placeholders.append(kwargs['author'])

    cur = safe_exec.write(conn, query, tuple(placeholders))
    if cur.rowcount == 0:
        # Check if product exists.
        query = 'SELECT NULL FROM product WHERE id=?'
        product = safe_exec.write(conn, query, (kwargs['id_product'],)).fetchone()
        conn.close()
        if product is None:
            abort(404, utility.ERR_FMTS['NOT_FOUND']%'product')
        else:
            abort(403)

    conn.close()


def delete_product(force, **kwargs):
    conn = efk_sqlite3.connect(DATABASE)

    query = 'DELETE FROM product WHERE id=?'
    placeholders = [kwargs['id_product']]

    if not force:
        query += ' AND author=?'
        placeholders.append(kwargs['author'])

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        # Check if product exists.
        query = 'SELECT NULL FROM product WHERE id=?'
        product = safe_exec.write(conn, query, (kwargs['id_product'],)).fetchone()
        conn.close()
        if product is None:
            abort(404, utility.ERR_FMTS['NOT_FOUND']%'product')
        else:
            abort(403)

    conn.close()


def list_product_parts(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT pp.id AS id,pp.name AS name,pp.descr AS descr,pp.author AS author,pp.manager AS manager,' \
          + 'p.manager AS product_manager,p.id AS product_id,p.name AS product_name,' \
          + 'a.login AS author_nickname,m.login AS manager_nickname,pm.login AS product_manager_nickname\n' \
          + 'FROM product_part pp JOIN product p ON pp.product=p.id\n' \
          + 'JOIN user a ON pp.author=a.id JOIN user m ON pp.manager=m.id JOIN user pm ON p.manager=pm.id\n' \
          + 'WHERE p.id=?'
    placeholders = (kwargs.get('id_product'))

    cur = safe_exec.read(conn, query, placeholders)
    rows = cur.fetchall()
    conn.close()
    return rows


def insert_product_part(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)

    query = 'INSERT INTO product_part (name,author,manager,descr,product) VALUES (?,?,?,?,?)'
    placeholders = (kwargs.get('name'),
                    kwargs.get('author'),
                    kwargs.get('manager'),
                    kwargs.get('descr'),
                    kwargs.get('id_product'))

    safe_exec.write(conn, query, placeholders)
    conn.close()


def get_product_part(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT pp.id AS id,pp.name AS name,pp.descr AS descr,pp.author AS author,pp.manager AS manager,' \
          + 'p.manager AS product_manager,p.id AS product_id,p.name AS product_name,' \
          + 'a.login AS author_nickname,m.login AS manager_nickname,pm.login AS product_manager_nickname\n' \
          + 'FROM product_part pp JOIN product p ON pp.product=p.id\n' \
          + 'JOIN user a ON pp.author=a.id JOIN user m ON pp.manager=m.id JOIN user pm ON p.manager=pm.id\n' \
          + 'WHERE p.id=? AND pp.id=?'

    placeholders = (kwargs.get('id_product'),
                    kwargs.get('id_part'))

    cur = safe_exec.read(conn, query, placeholders)
    row = cur.fetchone()
    conn.close()

    if row == None:
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'product part')
    return row


def update_product_part(force, **kwargs):
    conn = efk_sqlite3.connect(DATABASE)

    updates = []
    for key in ['name', 'manager', 'descr']:
        if key in kwargs and kwargs[key] != None:
            updates.append(key)

    if len(updates) == 0:
        conn.close()
        abort(400, utility.ERR_FMTS['EMPTY_UPDATE']%'product part')

    placeholders = [*[kwargs[key] for key in updates], kwargs.get('id_product'), kwargs.get('id_part')]
    query = 'UPDATE product_part SET ' + ','.join(['%s=?'%key for key in updates]) + 'WHERE product=? AND id=?'

    if not force:
        query += ' AND author=?'
        placeholders.append(kwargs['author'])

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        # Check if product part exists.
        query = 'SELECT NULL FROM product_part WHERE product=? AND id=?'
        product = safe_exec.write(conn, query, (kwargs['id_product'], kwargs['id_part'])).fetchone()
        conn.close()
        if product is None:
            abort(404, utility.ERR_FMTS['NOT_FOUND']%'product part')
        else:
            abort(403)

    conn.close()


def delete_product_part(force, **kwargs):
    conn = efk_sqlite3.connect(DATABASE)

    query = 'DELETE FROM product_part WHERE product=? AND id=?'
    placeholders = [kwargs.get('id_product'), kwargs.get('id_part')]

    if not force:
        query += ' AND author=?'
        placeholders.append(kwargs['author'])

    cur = safe_exec.write(conn, query, placeholders)
    conn.close()

    if cur.rowcount == 0:
        # Check if product part exists.
        query = 'SELECT NULL FROM product_part WHERE product=? AND id=?'
        product = safe_exec.write(conn, query, (kwargs['id_product'], kwargs['id_part'])).fetchone()
        conn.close()
        if product is None:
            abort(404, utility.ERR_FMTS['NOT_FOUND']%'product part')
        else:
            abort(403)

    conn.close()


def list_product_tickets(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT t.id AS id,t.product AS product,t.product_part AS product_part,' \
          + 't.author AS author,t.name AS name,t.state AS state,t.created AS created,a.login AS author_nickname\n' \
          + 'FROM ticket t JOIN user a ON t.author=a.id WHERE product=?'

    placeholders = (kwargs.get('id_product'),)

    cur = safe_exec.read(conn, query, placeholders)
    rows = cur.fetchall()
    conn.close()
    return rows


def list_product_part_tickets(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT NULL FROM product_part WHERE product=? AND id=?'
    placeholders = (kwargs.get('id_product'),
                    kwargs.get('id_part'))

    cur = safe_exec.read(conn, query, placeholders)
    if cur.fetchone() == None:
        conn.close()
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'product part')

    query = 'SELECT t.id AS id,t.product AS product,t.product_part AS product_part,' \
          + 't.author AS author,t.name AS name,t.state AS state,t.created AS created,a.login AS author_nickname\n' \
          + 'FROM ticket t JOIN user a ON t.author=a.id WHERE product_part=?'

    placeholders = (kwargs.get('id_part'),)

    cur = safe_exec.read(conn, query, placeholders)
    rows = cur.fetchall()
    conn.close()
    return rows
