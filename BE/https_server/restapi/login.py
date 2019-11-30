import jwt # pip3 install pyjwt

from flask import Response
from flask import request
import json, dbhandler as db

SECRET_KEY = 'Ja som fakt akože š-odbornik. - Project Andrej'

@utility.add_required_headers
def login(username, password):
    res = db.get_user_password(username)
    print(res)
    return Response()

# token = jwt.encode({'user': 'login', 'role': 'admin'}, secret_key)
# print(token)
#
# data = jwt.decode(token, secret_key)
# print(data)
