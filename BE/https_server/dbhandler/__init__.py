import os, sqlite3
from dbhandler.settings        import *
from dbhandler.product_queries import *
from dbhandler.ticket_queries  import *
from dbhandler.user_queries    import *
from dbhandler.blob_queries    import *

# Initialize database if doesn't exist already.
def init_database():
    if os.path.exists(DATABASE):
        return

    con = sqlite3.connect(DATABASE)
    with open(INIT_SCRIPT) as script:
        con.executescript(str(script.read()))

    with con:
        cur = con.cursor()
        # params = [56, None, 0, 'ticket3', 'nieco napisane', 'TODO', '1998-08-07 16:54:32']
        # con.execute('INSERT INTO ticket (product, product_part, author, name, descr, state, created) VALUES (?, ?, ?, ?, ?, ?, ?)', params)
        #
        # print('ticket3 created')
        #
        # params = [242, 0, 444, 'ticket1', 'lorum ipsem a neviem ako sa to pise', 'OPEN', '4444-44-44 16:44:44']
        # con.execute('INSERT INTO ticket (product, product_part, author, name, descr, state, created) VALUES (?, ?, ?, ?, ?, ?, ?)', params)
        #
        # params = [56, 60, 69, 'ticket2', 'lorum ipsem dva a dva je asi styri.', 'IN PROGRESS', '5668-48-02 99:55:67']
        # con.execute('INSERT INTO ticket (product, product_part, author, name, descr, state, created) VALUES (?, ?, ?, ?, ?, ?, ?)', params)

        # params = []
        # params = [3, 0, 'pipi dlha pancucha', '3333-33-33 33:33:33']
        # con.execute('INSERT INTO comment (ticket, author, content, created) VALUES (?, ?, ?, ?)', params)

        params = []
        params = ['Pipi Dlha Pancucha', 'pipi@home.com', 'pipi123', 'hash_passwd', 'admin']
        con.execute('INSERT INTO user (name, mail,login, password, type) VALUES (?, ?, ?, ?, ?)', params)

        params = []
        params = ['Santa Claus', 'santa@christmas.com', 'Santa', 'iamclaus', 'executive']
        con.execute('INSERT INTO user (name, mail,login, password, type) VALUES (?, ?, ?, ?, ?)', params)

        params = []
        params = ['Big Boss', 'boss@supercool.com', 'biggie', 'world_0wner', 'manager']
        con.execute('INSERT INTO user (name, mail,login, password, type) VALUES (?, ?, ?, ?, ?)', params)

        params = []
        params = ['Hippie John', 'john.hippie42@nature.nocountry', 'love_and_be_loved', 'iL0ve_nature', 'employee']
        con.execute('INSERT INTO user (name, mail,login, password, type) VALUES (?, ?, ?, ?, ?)', params)

        params = []
        params = ['Lara Croft', 'sexyteen@home.com', 'sexyteen', 'lArA666', 'customer']
        con.execute('INSERT INTO user (name, mail,login, password, type) VALUES (?, ?, ?, ?, ?)', params)

        # params = []
        # params = [2, 0, 'chodte spat', 'lorem ipsim ipsim lorem isssli mispi merol odzadu', 'TODO', 8, 4, '0000-00-00 55:55:55']
        # con.execute('INSERT INTO task (ticket, author, name, descr, state, ewt, ats, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', params)
        #
        # params = []
        # params = [0, 0]
        # con.execute('INSERT INTO working_on_task VALUES (?, ?)', params)
        #
        # params = []
        # params = [0, "producKt", "gsnio etrvniserbs tr sgra afr uz nemam fantazii"]
        # con.execute('INSERT INTO product (manager, name, descr) VALUES (?, ?, ?)', params)

    con.close()
