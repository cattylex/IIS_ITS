from flask import request
from flask import Response
import json

# Register all url rules for the REST api.
def register_url_rules(app):

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


def products():
    return Response('<h1>products</h1>', mimetype='text/html')


def product_details(id_product):
    return Response('<h1>product %s</h1>'%id_product, mimetype='text/html')


def product_parts(id_product):
    return Response('<h1>product %s parts</h1>'%id_product, mimetype='text/html')


def product_part_details(id_product, id_part):
    return Response('<h1>product %s part %s</h1>'%(id_product, id_part), mimetype='text/html')
