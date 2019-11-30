import jwt # pip3 install pyjwt

from flask import Response
from flask import request
import json, dbhandler as db
import utility

SECRET_KEY = 'Ja som fakt akože š-odbornik. - Project Andrej'

@utility.add_required_headers
def login():
    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    if set(request.json.keys()) != {'login', 'password'}:
        abort(400, 'login failed due to malformed payload')

    res = db.get_user_password(username)
    print(res)
    return Response()

# token = jwt.encode({'user': 'login', 'role': 'admin'}, secret_key)
# print(token)
#
# data = jwt.decode(token, secret_key)
# print(data)
