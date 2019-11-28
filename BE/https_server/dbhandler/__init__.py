import sqlite3

# TODO: z db sa vrati {} - poslem error code - treba nadefinovat v REST API

DATABASE = '../database.db'

def insert_helper():
    con = sqlite3.connect(DATABASE)

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
        print(resp)

    con.close()
    return resp
