from flask import Response, request, abort
import json, dbhandler as db
import utility
from . import authentication as auth


@utility.add_required_headers
def tickets_pictures_GET(**kwargs):
    user = auth.authenticate()
    if not user.can_view_tickets():
        abort(403)

    pic,ext = db.get_ticket_picture(kwargs['id'], kwargs['id_pic'])
    return Response(pic, mimetype='image/'+ext)


@utility.add_required_headers
def tickets_pictures_POST(**kwargs):
    user = auth.authenticate()
    if not user.can_create_tickets():
        abort(403)

    if request.content_type is None:
        abort(400, 'empty upload')

    mime = request.content_type.lower().split('/')
    if len(mime) != 2 or mime[0] != 'image':
        abort(415, utility.ERR_FMTS['BAD_MIME']%'image/*')

    db.insert_ticket_picture(kwargs['id'], mime[1])
    return Response()
