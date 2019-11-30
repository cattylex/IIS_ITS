import os, sqlite3
from dbhandler.settings        import *
from dbhandler.product_queries import *
from dbhandler.ticket_queries  import *
from dbhandler.user_queries    import *

# Initialize database if doesn't exist already.
def init_database():
    if os.path.exists(DATABASE):
        return

    con = sqlite3.connect(DATABASE)
    with open(INIT_SCRIPT) as script:
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
