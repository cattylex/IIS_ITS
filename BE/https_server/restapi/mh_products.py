from flask import Response
import dbhandler
from . import utility


@utility.add_required_headers
def products_GET():
    return Response('<h1>products</h1>', mimetype='text/html')


@utility.add_required_headers
def product_details_GET(**kwargs):
    row = dbhandler.list_products(**kwargs);
    return Response('<h1>product</h1>', mimetype='text/html')


@utility.add_required_headers
def product_parts_GET(**kwargs):
    rows = dbhandler.list_products(**kwargs);
    return Response('<h1>product parts</h1>', mimetype='text/html')


@utility.add_required_headers
def product_part_details_GET(**kwargs):
    rows = dbhandler.list_products(**kwargs);
    return Response('<h1>product part</h1>', mimetype='text/html')
