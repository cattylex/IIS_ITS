from flask import Response
from flask import request
import json, dbhandler as db
import utility


@utility.add_required_headers
def products_GET(**kwargs):
    rows = db.list_products(**kwargs);
    list = [utility.row_to_json(row) for row in rows]

    return Response(json.dumps(list), mimetype='application/json')


@utility.add_required_headers
def products_POST(**kwargs):
    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    db.insert_product(**{**kwargs, **request.json});
    return Response()


@utility.add_required_headers
def product_details_GET(**kwargs):
    row = db.get_product(**kwargs);
    object = utility.row_to_json(row)

    return Response(json.dumps(object), mimetype='application/json')


@utility.add_required_headers
def product_details_PATCH(**kwargs):
    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    db.update_product(**{**kwargs, **request.json})
    return Response()


@utility.add_required_headers
def product_details_DELETE(**kwargs):
    db.delete_product(**kwargs)
    return Response()


@utility.add_required_headers
def product_parts_GET(**kwargs):
    rows = db.list_product_parts(**kwargs);

    list = [utility.row_to_json(row) for row in rows]
    for object in list:
        if object['manager'] == None:
            object['manager'] = object['product_manager']
        del object['product_manager']

    return Response(json.dumps(list), mimetype='application/json')


@utility.add_required_headers
def product_parts_POST(**kwargs):
    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    db.insert_product_part(**{**kwargs, **request.json});
    return Response()


@utility.add_required_headers
def product_part_details_GET(**kwargs):
    row = db.get_product_part(**kwargs);
    object = utility.row_to_json(row)

    if object['manager'] == None:
        object['manager'] = object['product_manager']
    del object['product_manager']

    return Response(json.dumps(object), mimetype='application/json')


@utility.add_required_headers
def product_part_details_PATCH(**kwargs):
    if request.content_type != 'application/json':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'application/json')

    db.update_product_part(**{**kwargs, **request.json})
    return Response()


@utility.add_required_headers
def product_part_details_DELETE(**kwargs):
    db.delete_product_part(**kwargs)
    return Response()


@utility.add_required_headers
def product_tickets_GET(**kwargs):
    rows = db.list_product_tickets(**kwargs);
    list = [utility.row_to_json(row) for row in rows]

    return Response(json.dumps(list), mimetype='application/json')


@utility.add_required_headers
def product_part_tickets_GET(**kwargs):
    rows = db.list_product_part_tickets(**kwargs);
    list = [utility.row_to_json(row) for row in rows]

    return Response(json.dumps(list), mimetype='application/json')
