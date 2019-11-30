from flask import request
from flask import Response

from restapi.error_handlers import *
from . import mh_products
from . import mh_tickets
from . import login

# Register all url rules for the REST api.
def register_url_rules(app):

    # User related requests:
    app.add_url_rule(
        rule='/api/login',
        view_func=login.login,
        methods=['POST', 'GET'])

    # Tickets related requests:
    app.add_url_rule(
        rule='/api/tickets',
        view_func=tickets,
        methods=['GET', 'POST'])

    app.add_url_rule(
        rule='/api/tickets/<id>',
        view_func=tickets_detail,
        methods=['GET', 'PATCH', 'DELETE'])

    app.add_url_rule(
        rule='/api/tickets/<id>/comments',
        view_func=tickets_comments,
        methods=['GET', 'POST'])

    app.add_url_rule(
        rule='/api/tickets/<id>/comments/<c_id>',
        view_func=tickets_comment_detail,
        methods=['PATCH', 'DELETE'])

    app.add_url_rule(
        rule='/api/tickets/<id>/tasks',
        view_func=tickets_tasks,
        methods=['GET', 'POST'])

    app.add_url_rule(
        rule='/api/tickets/<id>/tasks/<t_id>',
        view_func=tickets_task_detail,
        methods=['GET', 'PATCH', 'DELETE'])

    # Products related requests:
    app.add_url_rule(
        rule='/api/products',
        view_func=products,
        methods=['GET', 'POST'])

    app.add_url_rule(
        rule='/api/products/<id_product>',
        view_func=product_details,
        methods=['GET', 'PATCH', 'DELETE'])

    app.add_url_rule(
        rule='/api/products/<id_product>/parts',
        view_func=product_parts,
        methods=['GET', 'POST'])

    app.add_url_rule(
        rule='/api/products/<id_product>/parts/<id_part>',
        view_func=product_part_details,
        methods=['GET', 'PATCH', 'DELETE'])

    app.add_url_rule(
        rule='/api/products/<id_product>/tickets',
        view_func=product_tickets,
        methods=['GET'])

    app.add_url_rule(
        rule='/api/products/<id_product>/parts/<id_part>/tickets',
        view_func=product_part_tickets,
        methods=['GET'])

def tickets(**kwargs):
    return getattr(mh_tickets, 'tickets_'
        + request.method)(**kwargs)

def tickets_detail(**kwargs):
    return getattr(mh_tickets, 'tickets_detail_'
        + request.method)(**kwargs)

def tickets_comments(**kwargs):
    return getattr(mh_tickets, 'tickets_comment_'
        + request.method)(**kwargs)

def tickets_comment_detail(**kwargs):
    return getattr(mh_tickets, 'tickets_comment_detail_'
        + request.method)(**kwargs)

def tickets_tasks(**kwargs):
    return getattr(mh_tickets, 'tickets_tasks_'
        + request.method)(**kwargs)

def tickets_task_detail(**kwargs):
    return getattr(mh_tickets, 'tickets_tasks_detail_'
        + request.method)(**kwargs)

def products(**kwargs):
    return getattr(mh_products, 'products_'
        + request.method)(**kwargs)

def product_details(**kwargs):
    return getattr(mh_products, 'product_details_'
        + request.method)(**kwargs)

def product_parts(**kwargs):
    return getattr(mh_products, 'product_parts_'
        + request.method)(**kwargs)

def product_part_details(**kwargs):
    return getattr(mh_products, 'product_part_details_'
        + request.method)(**kwargs)

def product_tickets(**kwargs):
    return getattr(mh_products, 'product_tickets_'
        + request.method)(**kwargs)

def product_part_tickets(**kwargs):
    return getattr(mh_products, 'product_part_tickets_'
        + request.method)(**kwargs)
