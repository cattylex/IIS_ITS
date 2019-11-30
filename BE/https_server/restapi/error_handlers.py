from flask import abort
from flask import Response
from flask import jsonify


# Register JSON error responses for the REST api.
def register_error_handlers(app):
    app.register_error_handler(400, bad_request_json)
    app.register_error_handler(404, not_found_json)
    app.register_error_handler(415, unsupported_media_type_json)
    app.register_error_handler(500, internal_error)


def bad_request_json(e):
    msg = str(e)
    return jsonify(error=msg), 400


def not_found_json(e):
    msg = '%s does not exist'%str(e)
    return jsonify(error=msg), 404


def unsupported_media_type_json(e):
    msg = '%s payload expected'%str(e)
    return jsonify(error=msg), 415


def internal_error(e):
    msg = str(e)
    return jsonify(error=msg), 500
