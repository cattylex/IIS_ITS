from flask import request
from flask import Response
import json

def tickets_GET():
    return Response('<h1>tickets_GET</h1>', mimetype='text/html')

def tickets_detail_GET(id):
    return Response('<h1>tickets_detail_GET ' + id + '</h1>', mimetype='text/html')

def tickets_comment_GET(id):
    return Response('<h1>tickets_comment_GET ' + id + '</h1>', mimetype='text/html')
