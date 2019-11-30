from flask import Response, abort, jsonify


# Register JSON error responses for the REST api.
def register_error_handlers(app):
    app.register_error_handler(400, bad_request_json)
    app.register_error_handler(401, unauthorized_json)
    app.register_error_handler(403, forbidden_json)
    app.register_error_handler(404, not_found_json)
    app.register_error_handler(415, unsupported_media_type_json)
    app.register_error_handler(500, internal_error)


def bad_request_json(e):
    e = str(e).partition(':')[2].strip()
    return jsonify({'error': e}), 400

def unauthorized_json(e):
    e = str(e).partition(':')[2].strip()
    return jsonify({'error': e}), 401

def forbidden_json(e):
    e = 'you do not have the permission for the operation'
    return jsonify({'error': e}), 403

def not_found_json(e):
    e = str(e).partition(':')[2].strip()
    return jsonify({'error': e}), 404

def unsupported_media_type_json(e):
    e = str(e).partition(':')[2].strip()
    return jsonify({'error': e}), 415

def internal_error(e):
    e = str(e).partition(':')[2].strip()
    return jsonify({'error': e}), 500
