from flask import request
from flask import Response
import json

import restapi.tickets as tickets

# Register all url rules for the REST api.
def register_rules(app):
    app.add_url_rule('/tickets', view_func=tickets, methods=['GET'])
    app.add_url_rule('/tickets/<id>', view_func=tickets_detail, methods=['GET'])
    app.add_url_rule('/tickets/<id>/comments', view_func=tickets_comments, methods=['GET'])

tickets_table = {'GET': tickets.tickets_GET}
tickets_detail_table = {'GET': tickets.tickets_detail_GET}
tickets_comments_table = {'GET': tickets.tickets_comment_GET}

def tickets():
    return tickets_table[request.method]()

def tickets_detail(id):
    return tickets_detail_table[request.method](id)

def tickets_comments(id):
    return tickets_comments_table[request.method](id)
