from flask import Response
from flask import request
import json

import dbhandler
from . import utility


@utility.add_required_headers
def products_GET(**kwargs):
    rows = dbhandler.list_products(**kwargs);
    list = [utility.row_to_json(row) for row in rows] if rows != None else []

    return Response(json.dumps(list), mimetype='application/json')


@utility.add_required_headers
def products_POST(**kwargs):
    if request.content_type != 'application/json':
        return Response() # TODO handle bad content-type

    rows = dbhandler.insert_product(**{**kwargs, **request.json});
    return Response()


@utility.add_required_headers
def product_details_GET(**kwargs):
    row = dbhandler.get_product(**kwargs);
    object = utility.row_to_json(row)

    return Response(json.dumps(object), mimetype='application/json')


@utility.add_required_headers
def product_parts_GET(**kwargs):
    rows = dbhandler.list_product_parts(**kwargs);

    if rows != None:
        list = [utility.row_to_json(row) for row in rows]
        for object in list:
            if object['manager'] == None:
                object['manager'] = object['product_manager']

            del object['product_manager']
    else:
        list = []

    return Response(json.dumps(list), mimetype='application/json')


@utility.add_required_headers
def product_parts_POST(**kwargs):
    if request.content_type != 'application/json':
        return Response() # TODO handle bad content-type

    rows = dbhandler.insert_product_part(**{**kwargs, **request.json});
    return Response()


@utility.add_required_headers
def product_part_details_GET(**kwargs):
    row = dbhandler.get_product_part(**kwargs);
    object = utility.row_to_json(row)

    if object['manager'] == None:
        object['manager'] = object['product_manager']
    del object['product_manager']

    return Response(json.dumps(object), mimetype='application/json')
