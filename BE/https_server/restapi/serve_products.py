from flask import Response, request, abort
import json, dbhandler as db
import utility
from . import authentication as auth


@utility.add_required_headers
def products_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_products():
        abort(403)

    rows = db.list_products(**kwargs);
    list = [utility.row_to_json(row) for row in rows]

    return Response(json.dumps(list), mimetype='application/json')


@utility.add_required_headers
def products_POST(**kwargs):
    user = auth.authenticate()
    if not user.can_create_products():
        abort(403)

    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    kwargs['author'] = user.id
    db.insert_product(**{**kwargs, **request.json});
    return Response()


@utility.add_required_headers
def product_details_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_products():
        abort(403)

    row = db.get_product(**kwargs);
    object = utility.row_to_json(row)

    return Response(json.dumps(object), mimetype='application/json')


@utility.add_required_headers
def product_details_PATCH(**kwargs):
    user = auth.authenticate()
    if not user.can_create_products():
        abort(403)

    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    kwargs['author'] = user.id
    db.update_product(**{**kwargs, **request.json})
    return Response()


@utility.add_required_headers
def product_details_DELETE(**kwargs):
    user = auth.authenticate()
    if not user.can_create_products():
        abort(403)

    kwargs['author'] = user.id
    db.delete_product(**kwargs)
    return Response()


@utility.add_required_headers
def product_parts_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_products():
        abort(403)

    rows = db.list_product_parts(**kwargs);
    list = [utility.row_to_json(row) for row in rows]

    for object in list:
        if object['manager'] == None:
            object['manager'] = object['product_manager']
        del object['product_manager']

    return Response(json.dumps(list), mimetype='application/json')


@utility.add_required_headers
def product_parts_POST(**kwargs):
    user = auth.authenticate()
    if not user.can_create_products():
        abort(403)

    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    kwargs['author'] = user.id
    db.insert_product_part(**{**kwargs, **request.json});
    return Response()


@utility.add_required_headers
def product_part_details_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_products():
        abort(403)

    row = db.get_product_part(**kwargs);
    object = utility.row_to_json(row)

    if object['manager'] == None:
        object['manager'] = object['product_manager']
    del object['product_manager']

    return Response(json.dumps(object), mimetype='application/json')


@utility.add_required_headers
def product_part_details_PATCH(**kwargs):
    user = auth.authenticate()
    if not user.can_create_products():
        abort(403)

    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    kwargs['author'] = user.id
    db.update_product_part(**{**kwargs, **request.json})
    return Response()


@utility.add_required_headers
def product_part_details_DELETE(**kwargs):
    user = auth.authenticate()
    if not user.can_create_products():
        abort(403)

    kwargs['author'] = user.id
    db.delete_product_part(**kwargs)
    return Response()


@utility.add_required_headers
def product_tickets_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_products() or not user.can_view_tickets():
        abort(403)

    rows = db.list_product_tickets(**kwargs);
    list = [utility.row_to_json(row) for row in rows]

    return Response(json.dumps(list), mimetype='application/json')


@utility.add_required_headers
def product_part_tickets_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_products() or not user.can_view_tickets():
        abort(403)

    rows = db.list_product_part_tickets(**kwargs);
    list = [utility.row_to_json(row) for row in rows]

    return Response(json.dumps(list), mimetype='application/json')
