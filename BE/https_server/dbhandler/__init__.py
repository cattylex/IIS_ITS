import sqlite3

# TODO: z db sa vrati {} - poslem error code - treba nadefinovat v REST API

DATABASE = '../database.db'

def insert_helper():
    con = sqlite3.connect(DATABASE)

    with con:
        cur = con.cursor()
        params = [3, 56, None, 7, 'ticket3', 'nieco napisane', 'TODO', '1998-08-07 16:54:32']
        con.execute('INSERT INTO ticket VALUES (?, ?, ?, ?, ?, ?, ?, ?)', params)

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
