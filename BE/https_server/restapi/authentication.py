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


# Decode token and return respective user class instance.
def authenticate():
    auth_hdr = request.headers.get('authorization')
    if auth_hdr is None:
        return NonRegistered()

    auth_type, auth_creds = value.strip().split()
    if auth_type.lower() != 'bearer':
        abort(401, 'invalid authentication type')

    payload = jwt.decode(auth_creds, SECRET_KEY)
    return USER_CLASS_MAP[payload['type']](payload['id'])


# Base class for registered users,
class NonRegistered:
    # Constructor.
    def __init__(self, id=None):
        self.id = id

    # Can view tickets, pictures and comments.
    def can_view_tickets(self):
        return True

    # Can view products.
    def can_view_products(self):
        return True

    # Can view users.
    def can_view_users(self):
        return True

    # Can view tasks.
    def can_view_tasks(self):
        return False

    # Has a profile and can edit it.
    def is_registered(self):
        return False

    # Can report time spend on the task.
    def can_report_time(self):
        return False

    # Can update the state of the ticket.
    def can_update_ticket_state(self):
        return False

    # Can create and update tickets.
    def can_create_tickets(self):
        return False

    # Can create and update products.
    def can_create_products(self):
        return False

    # Can create and update tasks.
    def can_create_tasks(self):
        return False


class Customer(NonRegistered):
    def is_registered(self):
        return True
    def can_create_tickets(self):
        return True


class Employee(Customer):
    def can_view_tasks(self):
        return True
    def can_report_time(self):
        return True


class Manager(Employee):
    def can_update_ticket_state(self):
        return True
    def can_create_tasks(self):
        return True


class Executive(Manager):
    def can_create_products(self):
        return True


class Admin(Executive):
    pass


USER_CLASS_MAP = {
    'customer'  : Customer,
    'employee'  : Employee,
    'manager'   : Manager,
    'executive' : Executive,
    'admin'     : Admin
}
