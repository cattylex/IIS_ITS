from flask import request
from flask import Response
import json

import restapi.tickets as tickets

# Register all url rules for the REST api.
def register_url_rules(app):
    app.add_url_rule('/tickets', view_func=tickets, methods=['GET'])
    app.add_url_rule('/tickets/<id>', view_func=tickets_detail, methods=['GET'])
    app.add_url_rule('/tickets/<id>/comments', view_func=tickets_comments, methods=['GET'])

    app.add_url_rule(
        rule='/products',
        view_func=products,
        methods=['GET'])

    app.add_url_rule(
        rule='/products/<id_product>',
        view_func=product_details,
        methods=['GET'])

    app.add_url_rule(
        rule='/products/<id_product>/parts',
        view_func=product_parts,
        methods=['GET'])

    app.add_url_rule(
        rule='/products/<id_product>/parts/<id_part>',
        view_func=product_part_details,
        methods=['GET'])

tickets_table = {'GET': tickets.tickets_GET}
tickets_detail_table = {'GET': tickets.tickets_detail_GET}
tickets_comments_table = {'GET': tickets.tickets_comment_GET}

def tickets():
    return tickets_table[request.method]()

def tickets_detail(id):
    return tickets_detail_table[request.method](id)

def tickets_comments(id):
    return tickets_comments_table[request.method](id)

def products():
    return Response('<h1>products</h1>', mimetype='text/html')


def product_details(id_product):
    return Response('<h1>product %s</h1>'%id_product, mimetype='text/html')


def product_parts(id_product):
    return Response('<h1>product %s parts</h1>'%id_product, mimetype='text/html')


def product_part_details(id_product, id_part):
    return Response('<h1>product %s part %s</h1>'%(id_product, id_part), mimetype='text/html')
