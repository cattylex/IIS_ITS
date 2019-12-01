from flask import request
from flask import Response
from flask import jsonify
from flask import abort

from datetime import datetime

import dbhandler
import utility
from . import authentication as auth

TICKET_ID = 0
TICKET_PRODUCT = 1
TICKET_PRODUCT_PART = 2
TICKET_AUTHOR = 3
TICKET_NAME = 4
TICKET_DESCR = 5
TICKET_STATE = 6
TICKET_CREATED = 7

COMMENT_ID = 0
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
def tickets_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_tickets():
        abort(403)

    help_response = {}
    response = []

    rows = dbhandler.list_tickets()
    for item in rows:
        help_response['ticket_id'] = item[TICKET_ID]
        help_response['author_nickname'] = dbhandler.get_user_name(item[TICKET_AUTHOR])
        help_response['author_id'] = item[TICKET_AUTHOR]
        help_response['name'] = item[TICKET_NAME]
        help_response['state'] = item[TICKET_STATE]
        response.append(help_response)
        help_response = {}

    return jsonify(response)

@utility.add_required_headers
def tickets_POST(**kwargs):
    user = auth.authenticate()
    if not user.can_create_tickets():
        abort(403)

    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    db_write = {}
    db_write['author'] = request.json.get('author_id')
    db_write['product'] = request.json.get('product')
    db_write['product_part'] = request.json.get('product_part')
    db_write['name'] = request.json.get('name')
    db_write['descr'] = request.json.get('descr')

    db_write['state'] = 'OPEN'
    db_write['created'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    dbhandler.insert_ticket(db_write)
    return Response()

@utility.add_required_headers
def tickets_detail_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_tickets():
        abort(403)

    id = kwargs['id']
    ticket = dbhandler.get_specified_ticket(id)

    response = {}
    response['ticket_id'] = ticket[TICKET_ID]
    response['author_nickname'] = dbhandler.get_user_name(ticket[TICKET_AUTHOR])
    response['author_id'] = ticket[TICKET_AUTHOR]
    response['name'] = ticket[TICKET_NAME]
    response['state'] = ticket[TICKET_STATE]
    response['creation_date'] = ticket[TICKET_CREATED]

    response['product_id'] = ticket[TICKET_PRODUCT]
    response['product_name'] = dbhandler.get_product_name(ticket[TICKET_PRODUCT])

    response['part_id'] = ticket[TICKET_PRODUCT_PART]
    response['part_name'] = dbhandler.get_product_part_name(ticket[TICKET_PRODUCT_PART])

    response['description'] = ticket[TICKET_DESCR]
    response['images'] = []
    # TODO response images

    return jsonify(response)

@utility.add_required_headers
def tickets_detail_PATCH(**kwargs):
    user = auth.authenticate()
    if not user.can_create_tickets():
        abort(403)

    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    dbhandler.update_ticket(**{**kwargs, **request.json})
    return Response()

@utility.add_required_headers
def tickets_detail_DELETE(**kwargs):
    user = auth.authenticate()
    if not user.can_create_tickets():
        abort(403)

    dbhandler.delete_ticket(kwargs['id'])
    return Response()

@utility.add_required_headers
def tickets_comment_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_tickets():
        abort(403)

    help_response = {}
    response = []

    id = kwargs['id']
    comments = dbhandler.get_comments(id)

    for item in comments:
        help_response['id'] = item[COMMENT_ID]
        help_response['author'] = dbhandler.get_user_name(item[COMMENT_AUTHOR])
        help_response['author_id'] = item[COMMENT_AUTHOR]
        help_response['creation_date'] = item[COMMENT_DATE]
        help_response['text'] = item[COMMENT_TEXT]
        response.append(help_response)
        help_response = {}

    return jsonify(response)

@utility.add_required_headers
def tickets_comment_POST(**kwargs):
    user = auth.authenticate()
    if not user.can_create_tickets():
        abort(403)

    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    db_write = {}

    db_write['author'] = request.json.get('author')
    db_write['content'] = request.json.get('text')

    db_write['created'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    db_write['ticket'] = kwargs['id']

    dbhandler.insert_comment(db_write)
    return Response()

@utility.add_required_headers
def tickets_comment_detail_PATCH(**kwargs):
    user = auth.authenticate()
    if not user.can_create_tickets():
        abort(403)

    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    dbhandler.update_comment(**{**kwargs, **request.json})
    return Response()

@utility.add_required_headers
def tickets_comment_detail_DELETE(**kwargs):
    user = auth.authenticate()
    if not user.can_create_tickets():
        abort(403)

    dbhandler.delete_comment(kwargs['id'], kwargs['c_id'])
    return Response()

@utility.add_required_headers
def tickets_tasks_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_tasks():
        abort(403)

    help_response = {}
    response = []

    id = kwargs['id']
    tasks = dbhandler.get_ticket_tasks(id)

    for row in tasks:
        help_response['id'] = row[TASK_ID]
        help_response['author_id'] = row[TASK_AUTHOR]
        help_response['author_nickname'] = dbhandler.get_user_name(row[TASK_AUTHOR])
        help_response['name'] = row[TASK_NAME]
        help_response['state'] = row[TASK_STATE]
        response.append(help_response)
        help_response = {}

    return jsonify(response)

@utility.add_required_headers
def tickets_tasks_POST(**kwargs):
    user = auth.authenticate()
    if not user.can_create_tasks():
        abort(403)

    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    db_write = {}

    db_write['author'] = request.json.get('author')
    db_write['name'] = request.json.get('name')
    db_write['descr'] = request.json.get('descr')
    db_write['ewt'] = request.json.get('ewt')

    db_write['ticket'] = kwargs['id']
    db_write['state'] = 'OPEN'
    db_write['created'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    db_write['ats'] = 0

    dbhandler.insert_task(db_write)
    return Response()

@utility.add_required_headers
def tickets_tasks_detail_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_tasks():
        abort(403)

    id = kwargs['id']
    t_id = kwargs['t_id']
    task = dbhandler.tickets_tasks_get_detail(t_id, id)

    response = {}
    response['id'] = task[TASK_ID]
    response['ticket'] = task[TASK_TICKET]
    response['ticket_name'] = dbhandler.get_ticket_name(task[TASK_TICKET])
    response['author_id'] = task[TASK_AUTHOR]
    response['author_nickname'] = dbhandler.get_user_name(task[TASK_AUTHOR])
    response['name'] = task[TASK_NAME]
    response['descr'] = task[TASK_DESCR]
    response['state'] = task[TASK_STATE]
    response['ewt'] = task[TASK_EWT]
    response['ats'] = task[TASK_ATS]
    response['created'] = task[TASK_CREATED]
    response['employee_id'] = dbhandler.get_employee(t_id)
    response['employee_name'] = dbhandler.get_user_name(response['employee_id'])

    return jsonify(response)

@utility.add_required_headers
def tickets_tasks_detail_PATCH(**kwargs):
    user = auth.authenticate()
    if not user.can_create_tasks():
        abort(403)

    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    dbhandler.update_task(**{**kwargs, **request.json})
    return Response()

@utility.add_required_headers
def tickets_tasks_detail_DELETE(**kwargs):
    user = auth.authenticate()
    if not user.can_create_tasks():
        abort(403)
        
    dbhandler.delete_task(kwargs['id'], kwargs['t_id'])
    return Response()
