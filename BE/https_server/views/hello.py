from flask import request
from flask import Response

import json
import sqlite3

def hello_world():
    return Response('<h1>hello world</h1>', mimetype='text/html')
    
def hello_name(name):
    return Response('<h1>hello %s</h1>'%name, mimetype='text/html')
