from flask import request
from flask import Response
from flask import jsonify
from flask import abort

import dbhandler
import utility
from . import authentication as auth

USER_ID = 0
USER_NAME = 1
USER_MAIL = 2
USER_LOGIN = 3
USER_PASSWORD = 4
USER_TYPE = 5

@utility.add_required_headers
def users_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_users():
        abort(403)

    help_response = {}
    response = []

    rows = dbhandler.list_users()
    for item in rows:
        help_response['id'] = item[USER_ID]
        help_response['login'] = item[USER_LOGIN]
        help_response['type'] = item[USER_TYPE]
        response.append(help_response)
        help_response = {}

    return jsonify(response)

@utility.add_required_headers
def users_detail_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_users():
        abort(403)

    id = kwargs['id']
    user = dbhandler.get_specified_user(id)

    response = {}
    response['id'] = user[USER_ID]
    response['name'] = user[USER_NAME]
    response['mail'] = user[USER_MAIL]
    response['login'] = user[USER_LOGIN]
    response['password'] = user[USER_PASSWORD]
    response['type'] = user[USER_TYPE]

    return jsonify(response)
