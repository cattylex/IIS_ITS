import sqlite3
from flask import abort
from . import safe_exec
from dbhandler.settings import *


def list_products(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT id,name,descr,manager FROM product'
    placeholders = ()

    cur = safe_exec.read(conn, query, placeholders)
    rows = cur.fetchall()
    conn.close()
    return rows


def insert_product(**kwargs):
    conn = sqlite3.connect(DATABASE)

    query = 'INSERT INTO product (name,manager,descr) VALUES (?,?,?)'
    placeholders = (kwargs.get('name'),
                    kwargs.get('manager'),
                    kwargs.get('descr'))

    safe_exec.write(conn, query, placeholders)
    conn.close()


def get_product(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT id,name,descr,manager FROM product WHERE id=?'
    placeholders = (kwargs.get('id_product'),)

    cur = safe_exec.read(conn, query, placeholders)
    row = cur.fetchone()
    if row == None:
        abort(404)
    conn.close()
    return row


def update_product(**kwargs):
    conn = sqlite3.connect(DATABASE)

    updates = []
    for key in ['name', 'manager', 'descr']:
        if key in kwargs:
            updates.append(key)

    if len(updates) == 0:
        abort(400) # Empty update.

    placeholders = (*['%s=?'%kwargs[key] for key in updates], kwargs['id_product'])
    query = 'UPDATE product SET ' + ','.join(['%s=?'%key for key in updates]) + ' WHERE id=?'

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        abort(404) # Not found, cannot update.
    conn.close()


def delete_product(**kwargs):
    conn = sqlite3.connect(DATABASE)

    query = 'DELETE FROM product WHERE id=?'
    placeholders = (kwargs['id_product'],)

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        abort(404) # Not found, cannot delete.
    conn.close()


def list_product_parts(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT pp.id AS id,pp.name AS name,pp.manager AS manager,p.manager AS product_manager\n' \
          + 'FROM product_part pp JOIN product p ON pp.product=p.id WHERE p.id=?'
    placeholders = (kwargs.get('id_product'))

    cur = safe_exec.read(conn, query, placeholders)
    rows = cur.fetchall()
    conn.close()
    return rows


def insert_product_part(**kwargs):
    conn = sqlite3.connect(DATABASE)

    query = 'INSERT INTO product_part (name,manager,descr,product) VALUES (?,?,?,?)'
    placeholders = (kwargs.get('name'),
                    kwargs.get('manager'),
                    kwargs.get('descr'),
                    kwargs.get('id_product'))

    safe_exec.write(conn, query, placeholders)
    conn.close()


def get_product_part(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT pp.id AS id,pp.name AS name,pp.descr AS descr,pp.manager AS manager,' \
          + 'p.manager AS product_manager,p.id AS product_id\n' \
          + 'FROM product_part pp JOIN product p ON pp.product=p.id WHERE p.id=? AND pp.id=?'

    placeholders = (kwargs.get('id_product'),
                    kwargs.get('id_part'))

    cur = safe_exec.read(conn, query, placeholders)
    row = cur.fetchone()
    if row == None:
        abort(404)
    conn.close()
    return row


def update_product_part(**kwargs):
    conn = sqlite3.connect(DATABASE)

    updates = []
    for key in ['name', 'manager', 'descr']:
        if key in kwargs:
            updates.append(key)

    if len(updates) == 0:
        abort(400) # Empty update.

    placeholders = (*['%s=?'%kwargs[key] for key in updates], kwargs['id_part'])
    query = 'UPDATE product_part SET ' + ','.join(['%s=?'%key for key in updates]) + ' WHERE id=?'

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        abort(404) # Not found, cannot update.
    conn.close()


def delete_product_part(**kwargs):
    conn = sqlite3.connect(DATABASE)

    query = 'DELETE FROM product_part WHERE product=? AND id=?'
    placeholders = (kwargs.get('id_product'),
                    kwargs.get('id_part'))

    cur = safe_exec.write(conn, query, placeholders)
    if cur.rowcount == 0:
        abort(404) # Not found, cannot delete.
    conn.close()


def list_product_tickets(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT id,product,product_part,author,name,descr,state,created FROM ticket WHERE product=?'
    placeholders = (kwargs.get('id_product'),)

    cur = safe_exec.read(conn, query, placeholders)
    rows = cur.fetchall()
    conn.close()
    return rows


def list_product_part_tickets(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    query = 'SELECT NULL FROM product_part WHERE product=? AND id=?'
    placeholders = (kwargs.get('id_product'),
                    kwargs.get('id_part'))

    cur = safe_exec.read(conn, query, placeholders)
    if cur.fetchone() == None:
        abort(404)

    query = 'SELECT id,product,product_part,author,name,descr,state,created FROM ticket WHERE product_part=?'
    placeholders = (kwargs.get('id_part'),)

    cur = safe_exec.read(conn, query, placeholders)
    rows = cur.fetchall()
    conn.close()
    return rows
