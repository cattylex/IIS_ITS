import jwt # pip3 install pyjwt
from flask import Response, request, abort
import json, dbhandler as db
import utility

SECRET_KEY = 'Ja som fakt akože š-odbornik. - Project Andrej'


# Serve login request.
@utility.add_required_headers
def login():
    if request.content_type != 'application/json' or set(request.json.keys()) != {'login', 'password'}:
        abort(401, 'login failed - bad format')

    res = db.get_user_password(request.json['login'])
    if res is None:
        abort(401, 'login failed - non-existent user')

    id,pw,type = res # Unpack.
    if pw != request.json['password']:
        abort(401, 'login failed - invalid password')

    payload = {
        'id'   : id,
        'type' : type
    }
    token = jwt.encode(payload, SECRET_KEY).decode('ascii')
    return Response(json.dumps({'token': token, 'logged_as': type}), mimetype='application/json')


# Decode token back into json.
def decode_token(token):
    return jwt.decode(token, SECRET_KEY)


# Base class for registered users,
class NonRegistered:
    # Can view tickets, pictures and comments.
    def can_view_tickets():
        return True

    # Can view products.
    def can_view_products():
        return True

    # Can view users.
    def can_view_users():
        return True

    # Can view tasks.
    def can_view_tasks():
        return False

    # Has a profile and can edit it.
    def is_registered():
        return False

    # Can report time spend on the task.
    def can_report_time():
        return False

    # Can update the state of the ticket.
    def can_update_ticket_state():
        return False

    # Can create and update tickets.
    def can_create_tickets():
        return False

    # Can create and update products.
    def can_create_products():
        return False

    # Can create and update tasks.
    def can_create_tasks():
        return False


class Customer(NonRegistered):
    def is_registered():
        return True
    def can_create_tickets():
        return True


class Employee(Customer):
    def can_view_tasks():
        return True
    def can_report_time():
        return True


class Manager(Employee):
    def can_update_ticket_state():
        return True
    def can_create_tasks():
        return True


class Executive(Manager):
    def can_create_products():
        return True


class Admin(Executive):
    pass
