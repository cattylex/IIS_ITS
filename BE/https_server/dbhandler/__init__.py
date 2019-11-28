import sqlite3

DATABASE = '../database.db'

def list_products():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        query = 'SELECT * FROM product'
        placeholders = ()

        cur = conn.execute(query, placeholders)
        rows = cur.fetchall()
        conn.close()
        return rows

    except sqlite3.Error:
        conn.close()
        return None # TODO: notice about error


def get_product(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        query = 'SELECT * FROM product WHERE id=?'
        placeholders = (kwargs['id_product'],)

        cur = conn.execute(query, placeholders)
        row = cur.fetchone()
        conn.close()
        return row

    except sqlite3.Error:
        conn.close()
        return None # TODO: notice about error


def get_product_parts(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        query = 'SELECT * FROM product_part WHERE product=?'
        placeholders = (kwargs['id_product'])

        cur = conn.execute(query, placeholders)
        rows = cur.fetchall()
        conn.close()
        return rows

    except sqlite3.Error:
        conn.close()
        return None # TODO: notice about error


def get_product_part(id_product, id_part):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        query = 'SELECT * FROM product_part WHERE product=? AND id=?'
        placeholders = (kwargs['id_product'],
                        kwargs['id_part'])

        cur = conn.execute(query, placeholders)
        row = cur.fetchone()
        conn.close()
        return row

    except sqlite3.Error:
        conn.close()
        return None # TODO: notice about error
