import sys, os
SWD = os.path.dirname(sys.argv[0])+'/'
if SWD == '/':
    SWD = ''

DATABASE    = SWD+'../database.db' # Database file.
INIT_SCRIPT = SWD+'../create.sql'  # Database initialisation script.
