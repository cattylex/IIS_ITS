from flask import request
from flask import Response
from flask import jsonify
# import json

import dbhandler.dbhandler as dbhandler

TICKET_ID = 0
TICKET_PRODUCT = 1
TICKET_PRODUCT_PART = 2
TICKET_AUTHOR = 3
TICKET_NAME = 4
TICKET_DESCR = 5
TICKET_STATE = 6
TICKET_CREATED = 7

def tickets_GET():
    help_response = {}
    response = []

    rows = dbhandler.list_tickets()
    for item in rows:
        help_response['ticket_id'] = item[TICKET_ID]
        help_response['author_nickname'] = item[TICKET_AUTHOR]
        help_response['name'] = item[TICKET_NAME]
        help_response['state'] = item[TICKET_STATE]
        response.append(help_response)
        help_response = {}

    # return Response(json.dumps(response), mimetype='application/json')
    return jsonify(response)

def tickets_detail_GET(id):
    response = {}

    ticket = dbhandler.get_specified_ticket(id)
    for item in ticket:
        response['ticket_id'] = item[TICKET_ID]
        response['author_nickname'] = item[TICKET_AUTHOR]
        response['name'] = item[TICKET_NAME]
        response['state'] = item[TICKET_STATE]
        response['creation_date'] = item[TICKET_CREATED]

        if item[TICKET_PRODUCT_PART] is None:
            response['product_id'] = item[TICKET_PRODUCT]
        else:
            response['product_id'] = item[TICKET_PRODUCT_PART]

        response['description'] = item[TICKET_DESCR]

    # return Response('<h1>tickets_detail_GET ' + id + '</h1>', mimetype='text/html')
    return jsonify(response)

def tickets_comment_GET(id):
    response = {}

    comments = dbhandler.get_comments(id)

    return Response('<h1>tickets_comment_GET ' + id + '</h1>', mimetype='text/html')
