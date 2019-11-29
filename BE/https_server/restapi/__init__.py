from flask import request
from flask import Response

from . import mh_products
from . import mh_tickets

# Register all url rules for the REST api.
def register_url_rules(app):
    app.add_url_rule('/api/tickets', view_func=tickets, methods=['GET'])
    app.add_url_rule('/api/tickets/<id>', view_func=tickets_detail, methods=['GET'])
    app.add_url_rule('/api/tickets/<id>/comments', view_func=tickets_comments, methods=['GET'])
    app.add_url_rule('/api/tickets/<id>/tasks', view_func=tickets_tasks, methods=['GET'])
    app.add_url_rule('/api/tickets/<id>/tasks/<t_id>', view_func=tickets_task_detail, methods=['GET'])

    app.add_url_rule(
        rule='/api/products',
        view_func=products,
        methods=['GET', 'POST'])

    app.add_url_rule(
        rule='/api/products/<id_product>',
        view_func=product_details,
        methods=['GET'])

    app.add_url_rule(
        rule='/api/products/<id_product>/parts',
        view_func=product_parts,
        methods=['GET', 'POST'])

    app.add_url_rule(
        rule='/api/products/<id_product>/parts/<id_part>',
        view_func=product_part_details,
        methods=['GET'])

tickets_table = {'GET': mh_tickets.tickets_GET}
tickets_detail_table = {'GET': mh_tickets.tickets_detail_GET}
tickets_comments_table = {'GET': mh_tickets.tickets_comment_GET}
tickets_tasks_table = {'GET': mh_tickets.tickets_tasks_GET}
tickets_tasks_detail_table = {'GET': mh_tickets.tickets_tasks_detail_GET}

def tickets():
    return tickets_table[request.method]()


def tickets_detail(id):
    return tickets_detail_table[request.method](id)


def tickets_comments(id):
    return tickets_comments_table[request.method](id)


def tickets_tasks(id):
    return tickets_tasks_table[request.method](id)


def tickets_task_detail(id, t_id):
    return tickets_tasks_detail_table[request.method](id, t_id)


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
