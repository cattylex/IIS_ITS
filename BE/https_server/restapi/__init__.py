from flask import request
from flask import Response
from . import mh_products

# Register all url rules for the REST api.
def register_url_rules(app):

    app.add_url_rule(
        rule='/products',
        view_func=products,
        methods=['GET'],
        origin='*')

    app.add_url_rule(
        rule='/products/<id_product>',
        view_func=product_details,
        methods=['GET'],
        origin='*')

    app.add_url_rule(
        rule='/products/<id_product>/parts',
        view_func=product_parts,
        methods=['GET'],
        origin='*')

    app.add_url_rule(
        rule='/products/<id_product>/parts/<id_part>',
        view_func=product_part_details,
        methods=['GET'],
        origin='*')


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
