import sys, os, sqlite3
from dbhandler.settings        import *
from dbhandler.product_queries import *
from dbhandler.ticket_queries  import *
from dbhandler.user_queries    import *
from dbhandler.blob_queries    import *
from dbhandler.special_queries import *

# Initialize database if doesn't exist already.
def init_database():
    if os.path.exists(DATABASE):
        return

    conn = sqlite3.connect(DATABASE)
    with open(INIT_SCRIPT) as script:
        conn.executescript(str(script.read()))

    # params = []
    # params = ['Pipi Dlha Pancucha', 'pipi@home.com', 'pipi123', 'hash_passwd', 'admin']
    # conn.execute('INSERT INTO user (name, mail,login, password, type) VALUES (?, ?, ?, ?, ?)', params)
    #
    # params = []
    # params = ['Santa Claus', 'santa@christmas.com', 'Santa', 'iamclaus', 'executive']
    # conn.execute('INSERT INTO user (name, mail,login, password, type) VALUES (?, ?, ?, ?, ?)', params)
    #
    # params = []
    # params = ['Big Boss', 'boss@supercool.com', 'biggie', 'world_0wner', 'manager']
    # conn.execute('INSERT INTO user (name, mail,login, password, type) VALUES (?, ?, ?, ?, ?)', params)
    #
    # params = []
    # params = ['Hippie John', 'john.hippie42@nature.nocountry', 'love_and_be_loved', 'iL0ve_nature', 'employee']
    # conn.execute('INSERT INTO user (name, mail,login, password, type) VALUES (?, ?, ?, ?, ?)', params)
    #
    # params = []
    # params = ['Lara Croft', 'sexyteen@home.com', 'sexyteen', 'lArA666', 'customer']
    # conn.execute('INSERT INTO user (name, mail,login, password, type) VALUES (?, ?, ?, ?, ?)', params)
    conn.close()
