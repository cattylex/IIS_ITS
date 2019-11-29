from flask import request
from flask import Response
from flask import jsonify
# import json

import dbhandler
import restapi.errorhandler as errorhandler
from . import utility

TICKET_ID = 0
TICKET_PRODUCT = 1
TICKET_PRODUCT_PART = 2
TICKET_AUTHOR = 3
TICKET_NAME = 4
TICKET_DESCR = 5
TICKET_STATE = 6
TICKET_CREATED = 7

COMMENT_AUTHOR = 2
COMMENT_DATE = 4
COMMENT_TEXT = 3

TASK_ID = 0
TASK_TICKET = 1
TASK_AUTHOR = 2
TASK_NAME = 3
TASK_DESCR = 4
TASK_STATE = 5
TASK_EWT = 6
TASK_ATS = 7
TASK_CREATED = 8

@utility.add_required_headers
def tickets_GET():
    help_response = {}
    response = []

    error_code = 200
    detail = ''

    rows = dbhandler.list_tickets()
    for item in rows:
        help_response['ticket_id'] = item[TICKET_ID]
        help_response['author_nickname'] = dbhandler.get_author_name(item[TICKET_AUTHOR])
        help_response['author_id'] = item[TICKET_AUTHOR]
        help_response['name'] = item[TICKET_NAME]
        help_response['state'] = item[TICKET_STATE]
        response.append(help_response)
        help_response = {}

    if response == []:
        error_code = 404
        detail = 'tickets not created yet'

    if error_code is not 200:
        errorhandler.send_error(error_code)

    # return Response(json.dumps(response), mimetype='application/json')
    return jsonify(response)

@utility.add_required_headers
def tickets_detail_GET(id):
    response = {}

    error_code = 200
    detail = ''

    ticket = dbhandler.get_specified_ticket(id)
    for item in ticket:
        response['ticket_id'] = item[TICKET_ID]
        response['author_nickname'] = dbhandler.get_author_name(item[TICKET_AUTHOR])
        response['author_id'] = item[TICKET_AUTHOR]
        response['name'] = item[TICKET_NAME]
        response['state'] = item[TICKET_STATE]
        response['creation_date'] = item[TICKET_CREATED]

        if item[TICKET_PRODUCT_PART] is None:
            response['product_id'] = item[TICKET_PRODUCT]
            response['product_name'] = dbhandler.get_product_name(item[TICKET_PRODUCT])
        else:
            response['product_id'] = item[TICKET_PRODUCT_PART]
            response['product_name'] = dbhandler.get_product_name(item[TICKET_PRODUCT_PART])

        response['description'] = item[TICKET_DESCR]
        response['images'] = []
        # TODO response images

    if response == {}:
        error_code = 404
        detail = 'ticket does not exist'

    if error_code is not 200:
        errorhandler.send_error(error_code, detail)

    # return Response('<h1>tickets_detail_GET ' + id + '</h1>', mimetype='text/html')
    return jsonify(response)

@utility.add_required_headers
def tickets_comment_GET(id):
    help_response = {}
    response = []

    error_code = 200
    detail = ''

    comments = dbhandler.get_comments(id)
    for item in comments:
        help_response['author'] = dbhandler.get_author_name(item[COMMENT_AUTHOR])
        help_response['author_id'] = item[COMMENT_AUTHOR]
        help_response['creation_date'] = item[COMMENT_DATE]
        help_response['text'] = item[COMMENT_TEXT]
        response.append(help_response)
        help_response = {}

    if response == []:
        error_code = 404
        detail = 'this ticket is not commented yet'

    if error_code is not 200:
        errorhandler.send_error(error_code, detail)

    # return Response('<h1>tickets_comment_GET ' + id + '</h1>', mimetype='text/html')
    return jsonify(response)

@utility.add_required_headers
def tickets_tasks_GET(id):
    help_response = {}
    response = []

    error_code = 200
    detail = ''

    tasks = dbhandler.get_ticket_tasks(id)

    for row in tasks:
        help_response['id'] = row[TICKET_ID]
        help_response['author_id'] = row[TICKET_AUTHOR]
        help_response['author_nickname'] = dbhandler.get_author_name(row[TICKET_AUTHOR])
        help_response['name'] = row[TICKET_NAME]
        help_response['state'] = row[TICKET_STATE]
        response.append(help_response)
        help_response = {}

    if response == []:
        error_code = 404
        detail = 'no tasks to this ticket'

    if error_code is not 200:
        errorhandler.send_error(error_code, detail)

    # return Response('<h1>tickets_tasks_GET ' + id + '</h1>', mimetype='text/html')
    return jsonify(response)

@utility.add_required_headers
def tickets_tasks_detail_GET(id, t_id):
    response = {}

    error_code = 200
    detail = ''

    task = dbhandler.tickets_tasks_detail_GET(t_id, id)
    for item in task:
        response['id'] = item[TASK_ID]
        response['ticket'] = item[TASK_TICKET]
        response['author_id'] = item[TASK_AUTHOR]
        response['author_nickname'] = dbhandler.get_author_name(item[TASK_AUTHOR])
        response['name'] = item[TASK_NAME]
        response['descr'] = item[TASK_DESCR]
        response['state'] = item[TASK_STATE]
        response['ewt'] = item[TASK_EWT]
        response['ats'] = item[TASK_ATS]
        response['created'] = item[TASK_CREATED]
        response['employee_id'] = dbhandler.get_employee(t_id)
        response['employee_name'] = dbhandler.get_author_name(response['employee_id'])

    if response == {}:
        error_code = 404
        detail = 'task does not exist'

    if error_code is not 200:
        errorhandler.send_error(error_code, detail)
    # return Response('<h1>tickets_tasks_detail_GET ' + id + ' ' + t_id + '</h1>', mimetype='text/html')
    return jsonify(response)
