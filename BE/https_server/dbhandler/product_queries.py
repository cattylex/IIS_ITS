import sqlite3
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
    conn.row_factory = sqlite3.Row

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
    conn.close()
    return row


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
    conn.row_factory = sqlite3.Row

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

    query = 'SELECT pp.id AS id,pp.name AS name,pp.manager AS manager,p.manager AS product_manager\n' \
          + 'FROM product_part pp JOIN product p ON pp.product=p.id WHERE p.id=? AND pp.id=?'
    placeholders = (kwargs.get('id_product'),
                    kwargs.get('id_part'))

    cur = safe_exec.read(conn, query, placeholders)
    row = cur.fetchone()
    conn.close()
    return row
