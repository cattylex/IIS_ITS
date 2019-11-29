import sqlite3

DATABASE = '../database.db'


def list_products(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        query = 'SELECT id,name,descr,manager FROM product'
        placeholders = ()

        cur = conn.execute(query, placeholders)
        rows = cur.fetchall()
        conn.close()
        return rows

    except sqlite3.Error:
        conn.close()
        return None # TODO: notice about error


def insert_product(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        query = 'INSERT INTO product (name,manager,descr) VALUES (?,?,?)'
        placeholders = (kwargs.get('name'),
                        kwargs.get('manager'),
                        kwargs.get('descr'))

        conn.execute(query, placeholders)
        conn.commit()
        conn.close()

    except sqlite3.Error:
        conn.rollback()
        conn.close()
        return None # TODO: notice about error


def get_product(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        query = 'SELECT id,name,descr,manager FROM product WHERE id=?'
        placeholders = (kwargs.get('id_product'),)

        cur = conn.execute(query, placeholders)
        row = cur.fetchone()
        conn.close()
        return row

    except sqlite3.Error:
        conn.close()
        return None # TODO: notice about error


def list_product_parts(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        query = 'SELECT pp.id AS id,pp.name AS name,pp.manager AS manager,p.manager AS product_manager\n' \
              + 'FROM product_part pp JOIN product p ON pp.product=p.id WHERE p.id=?'
        placeholders = (kwargs.get('id_product'))

        cur = conn.execute(query, placeholders)
        rows = cur.fetchall()
        conn.close()
        return rows

    except sqlite3.Error:
        conn.close()
        return None # TODO: notice about error


def insert_product_part(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        query = 'INSERT INTO product_part (name,manager,descr,product) VALUES (?,?,?,?)'
        placeholders = (kwargs.get('name'),
                        kwargs.get('manager'),
                        kwargs.get('descr'),
                        kwargs.get('id_product'))

        conn.execute(query, placeholders)
        conn.commit()
        conn.close()

    except sqlite3.Error:
        conn.rollback()
        conn.close()
        return None # TODO: notice about error


def get_product_part(**kwargs):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        query = 'SELECT pp.id AS id,pp.name AS name,pp.manager AS manager,p.manager AS product_manager\n' \
              + 'FROM product_part pp JOIN product p ON pp.product=p.id WHERE p.id=? AND pp.id=?'
        placeholders = (kwargs.get('id_product'),
                        kwargs.get('id_part'))

        cur = conn.execute(query, placeholders)
        row = cur.fetchone()
        conn.close()
        return row

    except sqlite3.Error:
        conn.close()
        return None # TODO: notice about error

# ---------------------------------- DANIELA ---------------------------------- #

import os

def insert_helper():
    if os.path.exists(DATABASE):
        return # Don't re-insert

    con = sqlite3.connect(DATABASE)
    with open('../create.sql') as script:
        con.executescript(str(script.read()))

    with con:
        cur = con.cursor()
        params = [3, 56, None, 0, 'ticket3', 'nieco napisane', 'TODO', '1998-08-07 16:54:32']
        con.execute('INSERT INTO ticket VALUES (?, ?, ?, ?, ?, ?, ?, ?)', params)

        params = [1, 242, 0, 444, 'ticket1', 'lorum ipsem a neviem ako sa to pise', 'CREATED', '4444-44-44 16:44:44']
        con.execute('INSERT INTO ticket VALUES (?, ?, ?, ?, ?, ?, ?, ?)', params)

        params = [2, 56, 60, 69, 'ticket2', 'lorum ipsem dva a dva je asi styri.', 'IN PROGRESS', '5668-48-02 99:55:67']
        con.execute('INSERT INTO ticket VALUES (?, ?, ?, ?, ?, ?, ?, ?)', params)

        params = []
        params = [0, 3, 0, 'pipi dlha pancucha', '3333-33-33 33:33:33']
        con.execute('INSERT INTO comment VALUES (?, ?, ?, ?, ?)', params)

        params = []
        params = [0, 'Pipi Dlha Pancucha', 'pipi@home.com', 'pipi123', 'hash_passwd', 'admin']
        con.execute('INSERT INTO user VALUES (?, ?, ?, ?, ?, ?)', params)

        params = []
        params = [0, 2, 0, 'chodte spat', 'lorem ipsim ipsim lorem isssli mispi merol odzadu', 'TODO', 8, 4, '0000-00-00 55:55:55']
        con.execute('INSERT INTO task VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', params)

        params = []
        params = [0, 0]
        con.execute('INSERT INTO working_on_task VALUES (?, ?)', params)

        params = []
        params = [0, 0, "producKt", "gsnio etrvniserbs tr sgra afr uz nemam fantazii"]
        con.execute('INSERT INTO product VALUES (?, ?, ?, ?)', params)

    con.close()

def list_tickets():
    con = sqlite3.connect(DATABASE)

    with con:
        cur = con.cursor()
        cur.execute('SELECT * FROM ticket')

        resp = cur.fetchall()

    con.close()
    return resp

def get_specified_ticket(id):
    con = sqlite3.connect(DATABASE)

    with con:
        cur = con.cursor()
        cur.execute('SELECT * FROM ticket WHERE id=?', id)

        resp = cur.fetchall()

    con.close()
    return resp

def get_comments(id):
    con = sqlite3.connect(DATABASE)

    with con:
        cur = con.cursor()
        cur.execute('SELECT * FROM comment WHERE ticket=?', id)

        resp = cur.fetchall()

    con.close()
    return resp

def get_author_name(id):
    con = sqlite3.connect(DATABASE)

    with con:
        cur = con.cursor()
        cur.execute('SELECT login FROM user WHERE id=?', (id,))

        resp = cur.fetchone()
        if resp is not None:
            resp = resp[0]

    con.close()
    return resp

def get_ticket_tasks(id):
    con = sqlite3.connect(DATABASE)

    with con:
        cur = con.cursor()
        cur.execute('SELECT * FROM task WHERE ticket=?', id)

        resp = cur.fetchall()
        print(resp)

    con.close()
    return resp

def tickets_tasks_detail_GET(t_id, id):
    con = sqlite3.connect(DATABASE)

    with con:
        cur = con.cursor()
        params = [t_id, id]
        cur.execute('SELECT * FROM task WHERE id=? AND ticket=?', params)

        resp = cur.fetchall()

    con.close()
    return resp

def get_employee(t_id):
    con = sqlite3.connect(DATABASE)

    with con:
        cur = con.cursor()
        cur.execute('SELECT employee FROM working_on_task WHERE task=?', t_id)

        resp = cur.fetchone()
        if resp is not None:
            resp = resp[0]

    con.close()
    return resp

def get_product_name(id):
    con = sqlite3.connect(DATABASE)

    with con:
        cur = con.cursor()
        cur.execute('SELECT name FROM product WHERE id=?', (id,))

        resp = cur.fetchone()
        if resp is not None:
            resp = resp[0]

    con.close()
    return resp
