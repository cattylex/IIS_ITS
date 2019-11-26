from flask import request
from flask import Response
import json

# Register all url rules for the REST api.
def register_rules(app):
    app.add_url_rule('/tickets', view_func=tickets, methods=['GET'])

def tickets_GET():
    return Response('<h1>Hello World</h1>', mimetype='text/html')

table = {'GET': tickets_GET}

def tickets():
    return table[request.method]();
